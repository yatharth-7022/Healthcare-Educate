import { Request, Response, Router } from "express";
import { z } from "zod";
import { authenticate } from "../middleware/authMiddleware";
import { asyncHandler } from "../middleware/errorHandler";
import { ValidationError } from "../utils/AppError";
import { practiceService } from "../services/practiceService";

const router = Router();

const recordAnswerSchema = z.object({
  categoryId: z.string().min(1),
  subcategoryId: z.string().min(1),
  questionKey: z.string().min(1),
  isCorrect: z.boolean(),
});

router.get(
  "/progress",
  authenticate,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const categories = await practiceService.getProgressSummary(userId);

    return res.status(200).json({
      status: "success",
      data: {
        categories,
      },
    });
  }),
);

router.get(
  "/progress/:categoryId",
  authenticate,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const category = await practiceService.getCategoryProgress(
      userId,
      String(req.params.categoryId),
    );

    return res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  }),
);

router.post(
  "/answers",
  authenticate,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const parseResult = recordAnswerSchema.safeParse(req.body);

    if (!parseResult.success) {
      throw new ValidationError(
        parseResult.error.errors[0]?.message || "Invalid payload",
      );
    }

    const category = await practiceService.recordAnswer(
      userId,
      parseResult.data,
    );

    return res.status(200).json({
      status: "success",
      message: "Answer recorded successfully",
      data: {
        category,
      },
    });
  }),
);

export default router;
