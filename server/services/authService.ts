import bcrypt from "bcryptjs";
import { prisma } from "../db";
import {
  generateTokenPair,
  verifyRefreshToken,
  JwtPayload,
} from "../utils/jwt";
import {
  BadRequestError,
  UnauthorizedError,
  ConflictError,
} from "../utils/AppError";
import { logger } from "../utils/logger";

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: number;
    username: string;
    email: string;
    isAdmin: boolean;
  };
  accessToken: string;
  refreshToken: string;
}

/**
 * Authentication Service
 * Handles all authentication-related business logic
 */
export class AuthService {
  /**
   * Register a new user
   */
  async register(input: RegisterInput): Promise<AuthResponse> {
    const { username, email, password } = input;

    // Validate input
    if (!username || !email || !password) {
      throw new BadRequestError("Username, email, and password are required");
    }

    if (password.length < 6) {
      throw new BadRequestError("Password must be at least 6 characters long");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestError("Invalid email format");
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new ConflictError("Email already registered");
      }
      if (existingUser.username === username) {
        throw new ConflictError("Username already taken");
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    logger.info("New user registered:", { userId: user.id, email: user.email });

    // Generate tokens
    const tokenPayload: JwtPayload = {
      userId: user.id,
      email: user.email,
      username: user.username,
    };

    const { accessToken, refreshToken } = generateTokenPair(tokenPayload);

    // Save refresh token to database
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * Login an existing user
   */
  async login(input: LoginInput): Promise<AuthResponse> {
    const { email, password } = input;

    // Validate input
    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    logger.info("User logged in:", { userId: user.id, email: user.email });

    // Generate tokens
    const tokenPayload: JwtPayload = {
      userId: user.id,
      email: user.email,
      username: user.username,
    };

    const { accessToken, refreshToken } = generateTokenPair(tokenPayload);

    // Save refresh token to database
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      accessToken,
      refreshToken,
    };
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!refreshToken) {
      throw new UnauthorizedError("Refresh token required");
    }

    // Verify refresh token
    let payload: JwtPayload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch (error) {
      throw new UnauthorizedError("Invalid or expired refresh token");
    }

    // Find user and verify refresh token matches
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    logger.debug("Refreshing tokens for user:", { userId: user.id });

    // Generate new tokens
    const tokenPayload: JwtPayload = {
      userId: user.id,
      email: user.email,
      username: user.username,
    };

    const tokens = generateTokenPair(tokenPayload);

    // Update refresh token in database
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return tokens;
  }

  /**
   * Logout user
   */
  async logout(userId: number): Promise<void> {
    // Clear refresh token from database
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });

    logger.info("User logged out:", { userId });
  }

  /**
   * Get user profile by ID
   */
  async getProfile(userId: number) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    return user;
  }
}

export const authService = new AuthService();
