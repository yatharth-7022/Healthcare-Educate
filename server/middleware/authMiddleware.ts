import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, JwtPayload } from "../utils/jwt";
import { UnauthorizedError } from "../utils/AppError";
import { logger } from "../utils/logger";

// Extend Express Request type to include user
declare module "express-serve-static-core" {
  interface Request {
    user?: JwtPayload;
  }
}

/**
 * Middleware to authenticate requests using JWT
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("No token provided");
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const payload = verifyAccessToken(token);

    // Attach user to request
    req.user = payload;

    logger.debug("User authenticated:", { userId: payload.userId });

    next();
  } catch (error) {
    logger.error("Authentication error:", error);
    next(new UnauthorizedError("Invalid or expired token"));
  }
};

/**
 * Optional authentication - doesn't throw error if no token
 */
export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split(" ")[1];
      const payload = verifyAccessToken(token);
      req.user = payload;
    }

    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};
