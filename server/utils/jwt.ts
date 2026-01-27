import jwt, { SignOptions } from "jsonwebtoken";
import { config } from "../config/env";
import { logger } from "./logger";

export interface JwtPayload {
  userId: number;
  email: string;
  username: string;
}

/**
 * Generate an access token
 */
export const generateAccessToken = (payload: JwtPayload): string => {
  try {
    const options: SignOptions = {
      expiresIn: config.jwt.accessTokenExpiry,
    };
    return jwt.sign(payload, config.jwt.accessTokenSecret, options);
  } catch (error) {
    logger.error("Error generating access token:", error);
    throw new Error("Failed to generate access token");
  }
};

/**
 * Generate a refresh token
 */
export const generateRefreshToken = (payload: JwtPayload): string => {
  try {
    const options: SignOptions = {
      expiresIn: config.jwt.refreshTokenExpiry,
    };
    return jwt.sign(payload, config.jwt.refreshTokenSecret, options);
  } catch (error) {
    logger.error("Error generating refresh token:", error);
    throw new Error("Failed to generate refresh token");
  }
};

/**
 * Verify an access token
 */
export const verifyAccessToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, config.jwt.accessTokenSecret) as JwtPayload;
  } catch (error) {
    logger.error("Error verifying access token:", error);
    throw new Error("Invalid or expired access token");
  }
};

/**
 * Verify a refresh token
 */
export const verifyRefreshToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, config.jwt.refreshTokenSecret) as JwtPayload;
  } catch (error) {
    logger.error("Error verifying refresh token:", error);
    throw new Error("Invalid or expired refresh token");
  }
};

/**
 * Generate both access and refresh tokens
 */
export const generateTokenPair = (payload: JwtPayload) => {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};
