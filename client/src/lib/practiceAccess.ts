import type { User } from "@shared/models/auth";

/**
 * Whether the user can open practice questions. Mirrors the server check
 * (`requirePracticeAccess`), which is the real lock; this only drives the UI.
 * For now only admin accounts are entitled; paying subscribers will be added later.
 */
export function hasPracticeAccess(user: User | null | undefined): boolean {
  return Boolean(user?.isAdmin);
}
