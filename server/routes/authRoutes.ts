import { Router } from "express";
import { authController } from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

/**
 * Authentication Routes
 * Base path: /api/auth
 */

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);

// Protected routes
router.post("/logout", authenticate, authController.logout);
router.get("/me", authenticate, authController.getProfile);

export default router;
