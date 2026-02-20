import Stripe from "stripe";
import { config } from "../../config/env";
import { logger } from "../../utils/logger";

class StripeService {
  private stripe: Stripe;

  constructor() {
    // Validate secret key exists
    if (!config.stripe.secretKey) {
      const error =
        "STRIPE_SECRET_KEY is not configured in environment variables";
      logger.error(error);
      throw new Error(error);
    }

    // Validate key format (must start with sk_)
    if (!config.stripe.secretKey.startsWith("sk_")) {
      const error = "Invalid STRIPE_SECRET_KEY format. Must start with 'sk_'";
      logger.error(error);
      throw new Error(error);
    }

    // Initialize Stripe client
    this.stripe = new Stripe(config.stripe.secretKey, {
      // Pin API version for consistency across deployments
      // Prevents breaking changes when Stripe updates their API
      apiVersion: "2026-01-28.clover",

      // Add metadata to help Stripe support identify your requests
      appInfo: {
        name: "Healthcare-Educate",
        version: "1.0.0",
      },

      // Timeout configuration (prevent hanging requests)
      timeout: 30000, // 30 seconds
      maxNetworkRetries: 2, // Retry failed requests twice
    });

    logger.info("Stripe service initialized successfully", {
      mode: config.stripe.secretKey.includes("test") ? "TEST" : "LIVE",
    });
  }

  /**
   * Get the Stripe client instance
   * Use this for operations not yet wrapped by service methods
   */
  getClient(): Stripe {
    return this.stripe;
  }

  /**
   * Verify Webhook Signature
   *
   * CRITICAL SECURITY FUNCTION
   * This prevents attackers from sending fake webhook events to your server.
   *
   * HOW IT WORKS:
   * 1. Stripe signs each webhook with your webhook secret
   * 2. Signature is sent in 'stripe-signature' header
   * 3. We verify the signature matches the payload
   * 4. If invalid, request is rejected (prevents fraud)
   *
   * @param payload - Raw request body (MUST be raw, not parsed JSON)
   * @param signature - Value from 'stripe-signature' header
   * @returns Verified Stripe event object
   * @throws Error if signature is invalid
   */
  constructWebhookEvent(
    payload: string | Buffer,
    signature: string,
  ): Stripe.Event {
    if (!config.stripe.webhookSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
    }

    try {
      // This cryptographically verifies the webhook came from Stripe
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        config.stripe.webhookSecret,
      );

      logger.info("Webhook signature verified", {
        eventType: event.type,
        eventId: event.id,
      });

      return event;
    } catch (err) {
      logger.error("Webhook signature verification failed", {
        error: err instanceof Error ? err.message : "Unknown error",
      });
      throw new Error("Webhook signature verification failed");
    }
  }

  /**
   * Create a Checkout Session
   *
   * This creates a Stripe-hosted payment page for your customer.
   *
   * SECURITY FLOW:
   * 1. Frontend requests checkout session from YOUR backend
   * 2. Backend creates session with YOUR pricing (frontend can't tamper)
   * 3. Backend returns session ID to frontend
   * 4. Frontend redirects to Stripe checkout page
   * 5. Customer pays on Stripe's secure page
   * 6. Stripe sends webhook to YOUR server (verified)
   * 7. YOUR backend grants access after verification
   *
   * @param params - Checkout session parameters
   * @returns Stripe checkout session object
   */
  async createCheckoutSession(params: {
    priceId: string;
    customerEmail: string;
    customerId?: string;
    userId: number;
    successUrl: string;
    cancelUrl: string;
  }): Promise<Stripe.Checkout.Session> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        // Payment settings
        mode: "subscription", // or "payment" for one-time
        payment_method_types: ["card"], // Accept cards only (add more as needed)

        // Line items (what they're paying for)
        line_items: [
          {
            price: params.priceId, // Stripe Price ID (created in dashboard)
            quantity: 1,
          },
        ],

        // Customer information
        customer: params.customerId, // Existing customer ID (if any)
        customer_email: params.customerId ? undefined : params.customerEmail, // Only if no customer ID

        // Redirect URLs (where to send user after payment)
        success_url: params.successUrl,
        cancel_url: params.cancelUrl,

        // Metadata (attach your app's data to track this session)
        // This will be sent back in webhooks
        metadata: {
          userId: params.userId.toString(),
        },

        // Billing settings
        billing_address_collection: "auto", // Collect billing address
        allow_promotion_codes: true, // Enable discount codes

        // Session expiration (link expires after 24 hours)
        expires_at: Math.floor(Date.now() / 1000) + 86400, // 24 hours from now
      });

      logger.info("Checkout session created", {
        sessionId: session.id,
        userId: params.userId,
        priceId: params.priceId,
      });

      return session;
    } catch (err) {
      logger.error("Failed to create checkout session", {
        error: err instanceof Error ? err.message : "Unknown error",
        userId: params.userId,
      });
      throw err;
    }
  }

  /**
   * Create a Billing Portal Session
   *
   * This creates a link to Stripe's hosted customer portal where users can:
   * - Update payment methods
   * - Cancel subscriptions
   * - View invoices
   * - Download receipts
   *
   * @param customerId - Stripe customer ID
   * @param returnUrl - Where to redirect after portal session
   * @returns Portal session with URL
   */
  async createBillingPortalSession(
    customerId: string,
    returnUrl: string,
  ): Promise<Stripe.BillingPortal.Session> {
    try {
      const session = await this.stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
      });

      logger.info("Billing portal session created", {
        customerId,
        sessionId: session.id,
      });

      return session;
    } catch (err) {
      logger.error("Failed to create billing portal session", {
        error: err instanceof Error ? err.message : "Unknown error",
        customerId,
      });
      throw err;
    }
  }

  /**
   * Retrieve a customer by ID
   * Useful for checking subscription status, payment methods, etc.
   */
  async getCustomer(
    customerId: string,
  ): Promise<Stripe.Customer | Stripe.DeletedCustomer> {
    try {
      return await this.stripe.customers.retrieve(customerId);
    } catch (err) {
      logger.error("Failed to retrieve customer", {
        error: err instanceof Error ? err.message : "Unknown error",
        customerId,
      });
      throw err;
    }
  }

  /**
   * Retrieve a subscription by ID
   * Check status, current period, etc.
   */
  async getSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    try {
      return await this.stripe.subscriptions.retrieve(subscriptionId);
    } catch (err) {
      logger.error("Failed to retrieve subscription", {
        error: err instanceof Error ? err.message : "Unknown error",
        subscriptionId,
      });
      throw err;
    }
  }

  /**
   * Cancel a subscription
   *
   * @param subscriptionId - Stripe subscription ID
   * @param cancelAtPeriodEnd - If true, cancel at end of billing period. If false, cancel immediately.
   * @returns Updated subscription object
   */
  async cancelSubscription(
    subscriptionId: string,
    cancelAtPeriodEnd: boolean = true,
  ): Promise<Stripe.Subscription> {
    try {
      const subscription = await this.stripe.subscriptions.update(
        subscriptionId,
        {
          cancel_at_period_end: cancelAtPeriodEnd,
        },
      );

      logger.info("Subscription canceled", {
        subscriptionId,
        cancelAtPeriodEnd,
      });

      return subscription;
    } catch (err) {
      logger.error("Failed to cancel subscription", {
        error: err instanceof Error ? err.message : "Unknown error",
        subscriptionId,
      });
      throw err;
    }
  }
}

// Export singleton instance
export const stripeService = new StripeService();
