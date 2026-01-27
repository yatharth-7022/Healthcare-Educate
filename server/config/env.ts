import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",

  // JWT Configuration
  jwt: {
    accessTokenSecret:
      process.env.JWT_ACCESS_SECRET ||
      "your-access-token-secret-change-in-production",
    refreshTokenSecret:
      process.env.JWT_REFRESH_SECRET ||
      "your-refresh-token-secret-change-in-production",
    accessTokenExpiry: "15m" as const, // 15 minutes
    refreshTokenExpiry: "7d" as const, // 7 days
  },

  // Cookie Configuration
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
    sameSite: "strict" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
};
