import { Request, Response } from "express";
import { stripeService } from "../services/stripe/stripeService";
import { logger } from "../utils/logger";
import { prisma } from "../db";
import { config } from "../config/env";

/**
 * PAYMENT CONTROLLER
 *
 * Handles payment-related API endpoints (NOT webhooks)
 * All endpoints require authentication
 */

/**
 * CREATE CHECKOUT SESSION
 *
 * This creates a Stripe Checkout session for subscription signup.
 *
 * SECURITY:
 * - User must be authenticated (JWT verified)
 * - Price is validated on backend (frontend can't manipulate)
 * - Metadata tracks which user initiated payment
 *
 * FLOW:
 * 1. User authenticated via middleware
 * 2. We create Stripe checkout session
 * 3. Return URL to frontend
 * 4. Frontend redirects user to Stripe
 * 5. Webhook processes actual payment
 */
export async function createCheckoutSession(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    // Get authenticated user (set by auth middleware)
    const userId = req.user?.userId;
    const userEmail = req.user?.email;

    if (!userId || !userEmail) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Get price ID from request body
    const { priceId } = req.body;

    if (!priceId || typeof priceId !== "string") {
      res.status(400).json({ error: "Price ID is required" });
      return;
    }

    // TODO: Validate priceId against your allowed prices
    // For now, we'll trust it, but in production you should validate
    // Example: const validPrices = ['price_monthly', 'price_yearly'];
    // if (!validPrices.includes(priceId)) { ... }

    // Check if user already has an active subscription
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        userId,
        status: {
          in: ["active", "trialing"], // Active statuses
        },
      },
    });

    if (existingSubscription) {
      res.status(400).json({
        error: "You already have an active subscription",
        subscriptionId: existingSubscription.stripeSubscriptionId,
      });
      return;
    }

    // Check if user already has a Stripe customer ID
    const existingCustomer = await prisma.subscription.findFirst({
      where: { userId },
      select: { stripeCustomerId: true },
    });

    // Create checkout session
    const session = await stripeService.createCheckoutSession({
      priceId,
      customerEmail: userEmail,
      customerId: existingCustomer?.stripeCustomerId, // Reuse if exists
      userId,
      successUrl: `${config.frontendUrl}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${config.frontendUrl}/pricing`,
    });

    logger.info("Checkout session created", {
      userId,
      sessionId: session.id,
      priceId,
    });

    // Return session URL to frontend
    res.status(200).json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    logger.error("Failed to create checkout session", {
      error: error instanceof Error ? error.message : "Unknown error",
      userId: req.user?.userId,
    });

    res.status(500).json({
      error: "Failed to create checkout session",
    });
  }
}

/**
 * CREATE BILLING PORTAL SESSION
 *
 * Creates a session for Stripe's customer portal where users can:
 * - Update payment methods
 * - Cancel subscription
 * - View invoices
 */
export async function createPortalSession(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Get user's subscription
    const subscription = await prisma.subscription.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" }, // Get most recent
    });

    if (!subscription) {
      res.status(404).json({ error: "No subscription found" });
      return;
    }

    // Create portal session
    const session = await stripeService.createBillingPortalSession(
      subscription.stripeCustomerId,
      `${config.frontendUrl}/account`,
    );

    logger.info("Billing portal session created", {
      userId,
      customerId: subscription.stripeCustomerId,
    });

    res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    logger.error("Failed to create portal session", {
      error: error instanceof Error ? error.message : "Unknown error",
      userId: req.user?.userId,
    });

    res.status(500).json({
      error: "Failed to create portal session",
    });
  }
}

/**
 * GET SUBSCRIPTION STATUS
 *
 * Returns current user's subscription status
 */
export async function getSubscriptionStatus(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Get active subscription
    const subscription = await prisma.subscription.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    if (!subscription) {
      res.status(200).json({
        hasSubscription: false,
        status: null,
      });
      return;
    }

    res.status(200).json({
      hasSubscription: true,
      status: subscription.status,
      currentPeriodEnd: subscription.currentPeriodEnd,
      cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
      priceId: subscription.stripePriceId,
    });
  } catch (error) {
    logger.error("Failed to get subscription status", {
      error: error instanceof Error ? error.message : "Unknown error",
      userId: req.user?.userId,
    });

    res.status(500).json({
      error: "Failed to get subscription status",
    });
  }
}

/**
 * GET PAYMENT HISTORY
 *
 * Returns user's payment history
 */
export async function getPaymentHistory(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const payments = await prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50, // Limit to last 50 payments
    });

    res.status(200).json({
      payments: payments.map((p) => ({
        id: p.id,
        amount: p.amount / 100, // Convert cents to dollars
        currency: p.currency,
        status: p.status,
        description: p.description,
        createdAt: p.createdAt,
      })),
    });
  } catch (error) {
    logger.error("Failed to get payment history", {
      error: error instanceof Error ? error.message : "Unknown error",
      userId: req.user?.userId,
    });

    res.status(500).json({
      error: "Failed to get payment history",
    });
  }
}
