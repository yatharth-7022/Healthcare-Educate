import { z } from "zod";

export const insertSubscriberSchema = z.object({
  email: z.string().email(),
});

export const insertUserSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;

