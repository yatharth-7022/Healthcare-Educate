import { logger } from "../../utils/logger";
import { prisma } from "../../db";
import Stripe from "stripe";

/**
 * WEBHOOK EVENT HANDLERS
 *
 * Each function handles a specific Stripe event type.
 * These are called AFTER signature verification.
 *
 * CRITICAL RULE: These functions are the ONLY place where
 * you grant/revoke access based on payment status.
 */

/**
 * Handle successful checkout completion
 * Fired when customer completes payment on checkout page
 *
 * SECURITY: Only called after webhook signature verification
 */
export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
): Promise<void> {
  logger.info("Processing checkout.session.completed", {
    sessionId: session.id,
    customerId: session.customer,
    subscriptionId: session.subscription,
  });

  try {
    // Extract metadata (we attached userId when creating session)
    const userId = session.metadata?.userId;

    if (!userId) {
      logger.error("No userId in session metadata", { sessionId: session.id });
      return;
    }

    const userIdNum = parseInt(userId, 10);

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: userIdNum },
    });

    if (!user) {
      logger.error("User not found", { userId: userIdNum });
      return;
    }

    // Extract Stripe IDs (these can be strings or null)
    const stripeCustomerId = session.customer as string;
    const stripeSubscriptionId = session.subscription as string;

    if (!stripeCustomerId || !stripeSubscriptionId) {
      logger.error("Missing Stripe customer or subscription ID", {
        sessionId: session.id,
        customerId: stripeCustomerId,
        subscriptionId: stripeSubscriptionId,
      });
      return;
    }

    // Check if subscription already exists (idempotency)
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        OR: [{ stripeSubscriptionId }, { userId: userIdNum }],
      },
    });

    if (existingSubscription) {
      logger.warn("Subscription already exists, skipping duplicate", {
        subscriptionId: stripeSubscriptionId,
        userId: userIdNum,
      });
      return;
    }

    // Get price ID from line items
    const priceId = session.line_items?.data?.[0]?.price?.id || "unknown_price";

    // Create subscription record in your database
    await prisma.subscription.create({
      data: {
        userId: userIdNum,
        stripeCustomerId,
        stripeSubscriptionId,
        stripePriceId: priceId,
        status: "active",
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Placeholder, will be updated
      },
    });

    // Create payment record
    const paymentIntentId = session.payment_intent as string;
    if (paymentIntentId) {
      await prisma.payment.create({
        data: {
          userId: userIdNum,
          stripePaymentId: paymentIntentId || session.id,
          amount: session.amount_total || 0,
          currency: session.currency || "usd",
          status: "succeeded",
          description: "Subscription payment",
        },
      });
    }

    logger.info("Subscription created successfully", {
      userId: userIdNum,
      subscriptionId: stripeSubscriptionId,
    });
  } catch (error) {
    logger.error("Failed to process checkout.session.completed", {
      error: error instanceof Error ? error.message : "Unknown error",
      sessionId: session.id,
    });
    throw error;
  }
}

/**
 * Handle subscription updates
 * Fired when subscription changes (plan change, renewal, etc.)
 */
export async function handleSubscriptionUpdated(
  subscription: any,
): Promise<void> {
  logger.info("Processing customer.subscription.updated", {
    subscriptionId: subscription.id,
    status: subscription.status,
  });

  try {
    // Find subscription in your database
    const dbSubscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscription.id },
    });

    if (!dbSubscription) {
      logger.warn("Subscription not found in database", {
        subscriptionId: subscription.id,
      });
      return;
    }

    // Update subscription details
    await prisma.subscription.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        status: subscription.status,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });

    logger.info("Subscription updated successfully", {
      subscriptionId: subscription.id,
      status: subscription.status,
    });
  } catch (error) {
    logger.error("Failed to process customer.subscription.updated", {
      error: error instanceof Error ? error.message : "Unknown error",
      subscriptionId: subscription.id,
    });
    throw error;
  }
}

/**
 * Handle subscription deletion/cancellation
 * Fired when subscription is canceled
 */
export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
): Promise<void> {
  logger.info("Processing customer.subscription.deleted", {
    subscriptionId: subscription.id,
  });

  try {
    await prisma.subscription.update({
      where: { stripeSubscriptionId: subscription.id },
      data: {
        status: "canceled",
        cancelAtPeriodEnd: false,
      },
    });

    logger.info("Subscription canceled successfully", {
      subscriptionId: subscription.id,
    });
  } catch (error) {
    logger.error("Failed to process customer.subscription.deleted", {
      error: error instanceof Error ? error.message : "Unknown error",
      subscriptionId: subscription.id,
    });
    throw error;
  }
}

/**
 * Handle successful invoice payment
 * Fired when recurring subscription payment succeeds
 */
export async function handleInvoicePaymentSucceeded(
  invoice: any,
): Promise<void> {
  logger.info("Processing invoice.payment_succeeded", {
    invoiceId: invoice.id,
    subscriptionId:
      typeof invoice.subscription === "string"
        ? invoice.subscription
        : invoice.subscription?.id,
  });

  try {
    // Extract subscription ID (can be string or object)
    const subscriptionId =
      typeof invoice.subscription === "string"
        ? invoice.subscription
        : invoice.subscription?.id;

    if (!subscriptionId) {
      logger.warn("No subscription ID in invoice", { invoiceId: invoice.id });
      return;
    }

    // Find subscription
    const dbSubscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
    });

    if (!dbSubscription) {
      logger.warn("Subscription not found for invoice", {
        invoiceId: invoice.id,
        subscriptionId,
      });
      return;
    }

    // Extract payment intent ID (can be string or object)
    const paymentIntentId =
      typeof invoice.payment_intent === "string"
        ? invoice.payment_intent
        : invoice.payment_intent?.id;

    if (!paymentIntentId) {
      logger.warn("No payment intent in invoice", { invoiceId: invoice.id });
      return;
    }

    // Check if payment already recorded (idempotency)
    const existingPayment = await prisma.payment.findFirst({
      where: { stripePaymentId: paymentIntentId },
    });

    if (existingPayment) {
      logger.warn("Payment already recorded, skipping duplicate", {
        paymentId: paymentIntentId,
      });
      return;
    }

    // Record payment
    await prisma.payment.create({
      data: {
        userId: dbSubscription.userId,
        stripePaymentId: paymentIntentId || invoice.id,
        amount: invoice.amount_paid,
        currency: invoice.currency,
        status: "succeeded",
        description: `Subscription renewal - Invoice ${invoice.number || invoice.id}`,
      },
    });

    logger.info("Invoice payment recorded successfully", {
      invoiceId: invoice.id,
      userId: dbSubscription.userId,
    });
  } catch (error) {
    logger.error("Failed to process invoice.payment_succeeded", {
      error: error instanceof Error ? error.message : "Unknown error",
      invoiceId: invoice.id,
    });
    throw error;
  }
}

/**
 * Handle failed invoice payment
 * Fired when recurring payment fails (expired card, insufficient funds, etc.)
 */
export async function handleInvoicePaymentFailed(invoice: any): Promise<void> {
  logger.error("Processing invoice.payment_failed", {
    invoiceId: invoice.id,
    subscriptionId:
      typeof invoice.subscription === "string"
        ? invoice.subscription
        : invoice.subscription?.id,
  });

  try {
    // Extract subscription ID (can be string or object)
    const subscriptionId =
      typeof invoice.subscription === "string"
        ? invoice.subscription
        : invoice.subscription?.id;

    if (!subscriptionId) {
      return;
    }

    // Update subscription status
    await prisma.subscription.update({
      where: { stripeSubscriptionId: subscriptionId },
      data: {
        status: "past_due",
      },
    });

    // Record failed payment
    const dbSubscription = await prisma.subscription.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
    });

    if (dbSubscription) {
      // Extract payment intent ID (can be string or object)
      const paymentIntentId =
        typeof invoice.payment_intent === "string"
          ? invoice.payment_intent
          : invoice.payment_intent?.id;

      await prisma.payment.create({
        data: {
          userId: dbSubscription.userId,
          stripePaymentId: paymentIntentId || invoice.id,
          amount: invoice.amount_due,
          currency: invoice.currency,
          status: "failed",
          description: `Failed subscription payment - Invoice ${invoice.number || invoice.id}`,
        },
      });
    }

    logger.info("Failed payment recorded", {
      invoiceId: invoice.id,
      subscriptionId,
    });

    // TODO: Send email to user about failed payment
  } catch (error) {
    logger.error("Failed to process invoice.payment_failed", {
      error: error instanceof Error ? error.message : "Unknown error",
      invoiceId: invoice.id,
    });
    throw error;
  }
}
