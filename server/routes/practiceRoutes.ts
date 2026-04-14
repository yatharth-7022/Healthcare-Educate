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

const stemBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text"),
    value: z.string().min(1),
    variant: z.enum(["default", "additional-info"]).optional(),
  }),
  z.object({
    type: z.literal("equation"),
    value: z.string().min(1),
    mode: z.enum(["inline", "block"]).optional(),
  }),
  z.object({
    type: z.literal("image"),
    url: z.string().url(),
    alt: z.string().optional(),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal("table"),
    columns: z.array(z.string()).min(1),
    rows: z.array(z.array(z.string())).min(1),
    caption: z.string().optional(),
  }),
  z.object({
    type: z.literal("code"),
    value: z.string().min(1),
    language: z.string().optional(),
  }),
  z.object({
    type: z.literal("video"),
    url: z.string().url(),
    title: z.string().optional(),
  }),
]);

const mcqQuestionSchema = z
  .object({
    id: z.string().min(1),
    prompt: z.string().min(1),
    contentBlocks: z.array(stemBlockSchema).optional(),
    options: z.array(z.string().min(1)).min(2),
    correctOptionIndex: z.number().int().nonnegative(),
    explanation: z.string().optional(),
  })
  .refine((question) => question.correctOptionIndex < question.options.length, {
    message: "correctOptionIndex must be within options bounds",
    path: ["correctOptionIndex"],
  });

const createQuestionSetSchema = z.object({
  categoryId: z.string().min(1),
  subcategoryId: z.string().min(1),
  title: z.string().min(1),
  stem: z.array(stemBlockSchema).min(1),
  questions: z.array(mcqQuestionSchema).min(1),
  isPublished: z.boolean().optional(),
});

function readRequiredQueryParam(
  value: string | string[] | undefined,
  name: string,
): string {
  const normalized = Array.isArray(value) ? value[0] : value;

  if (!normalized || normalized.trim().length === 0) {
    throw new ValidationError(`${name} is required`);
  }

  return normalized;
}

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
  "/content",
  authenticate,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const parseResult = createQuestionSetSchema.safeParse(req.body);

    if (!parseResult.success) {
      throw new ValidationError(
        parseResult.error.errors[0]?.message || "Invalid payload",
      );
    }

    const questionSet = await practiceService.createQuestionSet(
      parseResult.data,
    );

    return res.status(201).json({
      status: "success",
      data: {
        questionSet,
      },
    });
  }),
);

router.get(
  "/content",
  authenticate,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const categoryId = readRequiredQueryParam(
      req.query.categoryId as string | string[] | undefined,
      "categoryId",
    );
    const subcategoryId = readRequiredQueryParam(
      req.query.subcategoryId as string | string[] | undefined,
      "subcategoryId",
    );

    const questionSets = await practiceService.listQuestionSets(
      categoryId,
      subcategoryId,
    );

    return res.status(200).json({
      status: "success",
      data: {
        questionSets,
      },
    });
  }),
);

router.get(
  "/content/:questionSetId",
  authenticate,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const questionSetId = Number.parseInt(String(req.params.questionSetId), 10);

    if (!Number.isFinite(questionSetId)) {
      throw new ValidationError("questionSetId must be a number");
    }

    const questionSet = await practiceService.getQuestionSetById(questionSetId);

    return res.status(200).json({
      status: "success",
      data: {
        questionSet,
      },
    });
  }),
);

router.get(
  "/session",
  authenticate,
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized",
      });
    }

    const categoryId = readRequiredQueryParam(
      req.query.categoryId as string | string[] | undefined,
      "categoryId",
    );
    const subcategoryId = readRequiredQueryParam(
      req.query.subcategoryId as string | string[] | undefined,
      "subcategoryId",
    );

    const questionSet = await practiceService.getSessionQuestionSet(
      categoryId,
      subcategoryId,
    );

    return res.status(200).json({
      status: "success",
      data: {
        questionSet,
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
