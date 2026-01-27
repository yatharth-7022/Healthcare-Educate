// This file was for Drizzle ORM and Replit Auth  
// Now using Prisma for database and custom JWT auth
// Keeping this for backward compatibility with shared types

// Simple User type for frontend
export type User = {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
};

export type UpsertUser = {
  email: string;
  username: string;
  password?: string;
};
