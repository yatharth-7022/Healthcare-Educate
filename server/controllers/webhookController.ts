import { Request, Response } from "express";
import { stripeService } from "../services/stripe/stripeService";
import { logger } from "../utils/logger";
import {
  handleCheckoutSessionCompleted,
  handleSubscriptionUpdated,
  handleSubscriptionDeleted,
  handleInvoicePaymentSucceeded,
  handleInvoicePaymentFailed,
} from "../services/stripe/webhookHandlers";
import Stripe from "stripe";

/**
 * STRIPE WEBHOOK CONTROLLER
 *
 * CRITICAL SECURITY ENDPOINT
 *
 * This endpoint receives events from Stripe when payments occur.
 * It is THE ONLY trusted source for payment confirmations.
 *
 * SECURITY FLOW:
 * 1. Stripe sends POST request with event data
 * 2. We verify cryptographic signature (proves it's from Stripe)
 * 3. If valid, we process the event (update database, grant access)
 * 4. If invalid, we reject and log potential attack
 *
 * IMPORTANT: This endpoint must:
 * - NOT require authentication (Stripe doesn't have your JWT tokens)
 * - Receive RAW body (not JSON parsed - needed for signature verification)
 * - Respond quickly (Stripe times out after ~30 seconds)
 * - Be idempotent (same event can be sent multiple times)
 */

export async function handleStripeWebhook(
  req: Request,
  res: Response,
): Promise<void> {
  // Get raw body (Express must be configured to provide this)
  const rawBody = req.body;

  // Get signature from header
  const signature = req.headers["stripe-signature"];

  if (!signature) {
    logger.error("No stripe-signature header found in webhook request");
    res.status(400).json({ error: "No signature header" });
    return;
  }

  const signatureString = Array.isArray(signature) ? signature[0] : signature;

  let event: Stripe.Event;

  try {
    // ⚡ CRITICAL SECURITY STEP
    // This verifies the webhook actually came from Stripe
    // If signature doesn't match, throws error (prevents fraud)
    event = stripeService.constructWebhookEvent(rawBody, signatureString);
  } catch (err) {
    logger.error("Webhook signature verification failed", {
      error: err instanceof Error ? err.message : "Unknown error",
      signature: signatureString.substring(0, 20) + "...", // Log partial signature for debugging
    });

    // Return 400 to Stripe (tells them signature was invalid)
    res.status(400).json({
      error: "Webhook signature verification failed",
    });
    return;
  }

  // Signature valid! Event is authentic from Stripe
  logger.info("Webhook event received", {
    eventType: event.type,
    eventId: event.id,
  });

  try {
    // Route to appropriate handler based on event type
    switch (event.type) {
      // Payment completed on checkout page
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;

      // Subscription created (alternative to checkout.session.completed)
      case "customer.subscription.created":
        // Usually handled by checkout.session.completed
        // But you can handle separately if needed
        logger.info("Subscription created event received", {
          subscriptionId: (event.data.object as Stripe.Subscription).id,
        });
        break;

      // Subscription updated (plan change, renewal, status change)
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription,
        );
        break;

      // Subscription canceled
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription,
        );
        break;

      // Recurring payment succeeded
      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(
          event.data.object as Stripe.Invoice,
        );
        break;

      // Recurring payment failed
      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
        break;

      // Log unhandled events (for debugging)
      default:
        logger.info("Unhandled webhook event type", {
          eventType: event.type,
          eventId: event.id,
        });
    }

    // IMPORTANT: Always return 200 to acknowledge receipt
    // If you return error, Stripe will retry (can cause duplicates)
    res.status(200).json({ received: true });
  } catch (error) {
    // Log error but still return 200 to prevent retries
    // You'll handle the issue by checking logs
    logger.error("Error processing webhook event", {
      eventType: event.type,
      eventId: event.id,
      error: error instanceof Error ? error.message : "Unknown error",
    });

    // Return 200 anyway to prevent Stripe from retrying
    // (If you return 500, Stripe retries which can cause duplicate processing)
    res.status(200).json({ received: true });
  }
}
