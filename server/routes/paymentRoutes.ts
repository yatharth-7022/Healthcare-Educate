import { Router } from "express";
import {
  createCheckoutSession,
  createPortalSession,
  getSubscriptionStatus,
  getPaymentHistory,
} from "../controllers/paymentController";
import { authenticate } from "../middleware/authMiddleware";

/**
 * PAYMENT ROUTES
 *
 * All routes require authentication (except webhook, which is separate)
 */

const router = Router();

// Create checkout session (start subscription)
router.post("/checkout/session", authenticate, createCheckoutSession);

// Create billing portal session (manage subscription)
router.post("/portal/session", authenticate, createPortalSession);

// Get subscription status
router.get("/subscription/status", authenticate, getSubscriptionStatus);

// Get payment history
router.get("/payments/history", authenticate, getPaymentHistory);

export default router;
