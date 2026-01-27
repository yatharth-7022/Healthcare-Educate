import type { Express } from "express";
import type { Server } from "http";
import { prisma } from "./db";
import { insertSubscriberSchema } from "@shared/schema";
import { z } from "zod";
import { setupAuth } from "./auth";
import authRoutes from "./routes/authRoutes";
import { logger } from "./utils/logger";

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  // Setup Auth
  setupAuth(app);

  // Authentication routes
  app.use("/api/auth", authRoutes);

  // App Routes
  app.post("/api/subscribers", async (req, res) => {
    try {
      const input = insertSubscriberSchema.parse(req.body);

      const existing = await prisma.subscriber.findUnique({
        where: { email: input.email },
      });

      if (existing) {
        return res.status(400).json({ message: "Email already subscribed" });
      }

      const subscriber = await prisma.subscriber.create({
        data: input,
      });

      res.status(201).json(subscriber);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      throw err;
    }
  });

  return httpServer;
}
