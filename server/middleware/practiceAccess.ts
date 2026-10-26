import { Request, Response, NextFunction } from "express";
import { prisma } from "../db";
import { ForbiddenError, UnauthorizedError } from "../utils/AppError";

/**
 * Practice questions are locked behind an entitlement. For now only admin accounts have it;
 * paying subscribers will be unlocked here later (check the user's active `Subscription`).
 *
 * The status is read from the database on every request (not from the JWT) so that
 * granting or revoking access takes effect immediately.
 */
async function isAdminUser(userId: number): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { isAdmin: true },
  });

  return Boolean(user?.isAdmin);
}

export async function userHasPracticeAccess(userId: number): Promise<boolean> {
  return isAdminUser(userId);
}

/** Must run after `authenticate`. Rejects users without practice access with a 403. */
export const requirePracticeAccess = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new UnauthorizedError("Unauthorized");

    if (!(await userHasPracticeAccess(userId))) {
      throw new ForbiddenError(
        "Practice questions are locked. Subscribe to unlock access.",
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

/** Must run after `authenticate`. Admin-only actions (e.g. creating question sets). */
export const requireAdmin = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw new UnauthorizedError("Unauthorized");

    if (!(await isAdminUser(userId))) {
      throw new ForbiddenError("Admin access required");
    }

    next();
  } catch (error) {
    next(error);
  }
};
