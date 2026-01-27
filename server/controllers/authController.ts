import { Request, Response, NextFunction } from "express";
import { authService } from "../services/authService";
import { asyncHandler } from "../middleware/errorHandler";
import { config } from "../config/env";
import { logger } from "../utils/logger";
import { z } from "zod";
import { ValidationError } from "../utils/AppError";

// Validation schemas
const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

/**
 * Authentication Controller
 * Handles HTTP requests and responses for authentication
 */
export class AuthController {
  /**
   * Register a new user
   * POST /api/auth/register
   */
  register = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Validate request body
      const validationResult = registerSchema.safeParse(req.body);

      if (!validationResult.success) {
        const errors = validationResult.error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        throw new ValidationError(errors[0].message);
      }

      const { user, accessToken, refreshToken } = await authService.register(
        validationResult.data,
      );

      // Set refresh token as HTTP-only cookie
      res.cookie("refreshToken", refreshToken, config.cookie);

      logger.info("User registered successfully:", { userId: user.id });

      res.status(201).json({
        status: "success",
        message: "User registered successfully",
        data: {
          user,
          accessToken,
        },
      });
    },
  );

  /**
   * Login user
   * POST /api/auth/login
   */
  login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Validate request body
      const validationResult = loginSchema.safeParse(req.body);

      if (!validationResult.success) {
        const errors = validationResult.error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));
        throw new ValidationError(errors[0].message);
      }

      const { user, accessToken, refreshToken } = await authService.login(
        validationResult.data,
      );

      // Set refresh token as HTTP-only cookie
      res.cookie("refreshToken", refreshToken, config.cookie);

      logger.info("User logged in successfully:", { userId: user.id });

      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: {
          user,
          accessToken,
        },
      });
    },
  );

  /**
   * Refresh access token
   * POST /api/auth/refresh
   */
  refreshToken = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Get refresh token from cookie or body
      const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

      const tokens = await authService.refreshToken(refreshToken);

      // Set new refresh token as HTTP-only cookie
      res.cookie("refreshToken", tokens.refreshToken, config.cookie);

      logger.debug("Tokens refreshed successfully");

      res.status(200).json({
        status: "success",
        message: "Token refreshed successfully",
        data: {
          accessToken: tokens.accessToken,
        },
      });
    },
  );

  /**
   * Logout user
   * POST /api/auth/logout
   */
  logout = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user?.userId;

      if (userId) {
        await authService.logout(userId);
      }

      // Clear refresh token cookie
      res.clearCookie("refreshToken");

      logger.info("User logged out successfully:", { userId });

      res.status(200).json({
        status: "success",
        message: "Logout successful",
      });
    },
  );

  /**
   * Get current user profile
   * GET /api/auth/me
   */
  getProfile = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const userId = req.user?.userId;

      if (!userId) {
        return res.status(401).json({
          status: "error",
          message: "Unauthorized",
        });
      }

      const user = await authService.getProfile(userId);

      res.status(200).json({
        status: "success",
        data: { user },
      });
    },
  );
}

export const authController = new AuthController();
