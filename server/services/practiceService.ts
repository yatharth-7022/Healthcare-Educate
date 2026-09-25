import type {
  CreatePracticeAttemptInput,
  CreatePracticeQuestionSetInput,
  PracticeAttemptDetail,
  PracticeAttemptSummary,
  PracticeCategoryProgress,
  PracticeQuestionSet,
  PracticeSavedAnswer,
  RecordPracticeAnswerInput,
  ReportPracticeQuestionInput,
  UpdatePracticeAttemptInput,
} from "@shared/models/practice";
import { Prisma } from "@prisma/client";
import { prisma } from "../db";
import { BadRequestError, NotFoundError } from "../utils/AppError";
import { logger } from "../utils/logger";
import { PRACTICE_CATALOG_SEED } from "./practiceCatalog";

let seedPromise: Promise<void> | null = null;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function syncPracticeCatalog(): Promise<void> {
  await prisma.$transaction(async (tx) => {
    for (
      let categoryIndex = 0;
      categoryIndex < PRACTICE_CATALOG_SEED.length;
      categoryIndex += 1
    ) {
      const category = PRACTICE_CATALOG_SEED[categoryIndex];
      const normalizedSubcategories = category.subcategories.map(
        (sub, subIndex) => ({
          id: `${category.id}-${slugify(sub.name)}`,
          categoryId: category.id,
          name: sub.name,
          displayOrder: subIndex,
          totalQuestions: sub.totalQuestions,
          comingSoon: Boolean(sub.comingSoon),
        }),
      );

      const categoryTotalQuestions = normalizedSubcategories.reduce(
        (sum, sub) => sum + sub.totalQuestions,
        0,
      );

      await tx.practiceCategory.upsert({
        where: { id: category.id },
        update: {
          name: category.name,
          displayOrder: categoryIndex,
          totalQuestions: categoryTotalQuestions,
        },
        create: {
          id: category.id,
          name: category.name,
          displayOrder: categoryIndex,
          totalQuestions: categoryTotalQuestions,
        },
      });

      for (const subcategory of normalizedSubcategories) {
        await tx.practiceSubcategory.upsert({
          where: { id: subcategory.id },
          update: {
            name: subcategory.name,
            categoryId: subcategory.categoryId,
            displayOrder: subcategory.displayOrder,
            totalQuestions: subcategory.totalQuestions,
            comingSoon: subcategory.comingSoon,
          },
          create: subcategory,
        });
      }
    }
  });

  logger.info("Practice catalog synced successfully");
}

async function ensurePracticeCatalogSeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = syncPracticeCatalog().catch((error) => {
      seedPromise = null;
      throw error;
    });
  }

  await seedPromise;
}

async function getAnsweredCountsBySubcategory(
  userId: number,
  subcategoryIds: string[],
): Promise<Map<string, number>> {
  if (subcategoryIds.length === 0) {
    return new Map<string, number>();
  }

  const grouped = await prisma.practiceQuestionProgress.groupBy({
    by: ["subcategoryId"],
    where: {
      userId,
      subcategoryId: { in: subcategoryIds },
    },
    _count: {
      _all: true,
    },
  });

  return new Map(grouped.map((item) => [item.subcategoryId, item._count._all]));
}

function mapCategoryProgress(
  categories: Array<{
    id: string;
    name: string;
    totalQuestions: number;
    subcategories: Array<{
      id: string;
      name: string;
      totalQuestions: number;
      comingSoon: boolean;
    }>;
  }>,
  answeredCountMap: Map<string, number>,
): PracticeCategoryProgress[] {
  return categories.map((category) => {
    const subcategories = category.subcategories.map((sub) => ({
      id: sub.id,
      name: sub.name,
      totalQuestions: sub.totalQuestions,
      answeredQuestions: answeredCountMap.get(sub.id) ?? 0,
      comingSoon: sub.comingSoon,
    }));

    const answeredQuestions = subcategories.reduce(
      (sum, sub) => sum + sub.answeredQuestions,
      0,
    );

    return {
      id: category.id,
      name: category.name,
      totalQuestions: category.totalQuestions,
      answeredQuestions,
      subcategories,
    };
  });
}

function mapQuestionSet(questionSet: {
  id: number;
  categoryId: string;
  subcategoryId: string;
  title: string;
  stem: Prisma.JsonValue;
  questions: Prisma.JsonValue;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}): PracticeQuestionSet {
  return {
    id: questionSet.id,
    categoryId: questionSet.categoryId,
    subcategoryId: questionSet.subcategoryId,
    title: questionSet.title,
    stem: (questionSet.stem ?? []) as PracticeQuestionSet["stem"],
    questions: (questionSet.questions ??
      []) as PracticeQuestionSet["questions"],
    isPublished: questionSet.isPublished,
    createdAt: questionSet.createdAt.toISOString(),
    updatedAt: questionSet.updatedAt.toISOString(),
  };
}


const attemptSummaryInclude = {
  subcategory: {
    select: { name: true, category: { select: { name: true } } },
  },
  answers: { select: { isCorrect: true } },
} satisfies Prisma.PracticeAttemptInclude;

type AttemptWithSummaryRelations = Prisma.PracticeAttemptGetPayload<{
  include: typeof attemptSummaryInclude;
}>;

function mapAttemptSummary(
  attempt: AttemptWithSummaryRelations,
): PracticeAttemptSummary {
  return {
    id: attempt.id,
    categoryId: attempt.categoryId,
    categoryName: attempt.subcategory.category.name,
    subcategoryId: attempt.subcategoryId,
    subcategoryName: attempt.subcategory.name,
    status: attempt.status,
    setsCount: attempt.questionSetIds.length,
    totalQuestions: attempt.totalQuestions,
    answeredQuestions: attempt.answers.length,
    correctQuestions: attempt.answers.filter((answer) => answer.isCorrect)
      .length,
    currentQuestionIndex: attempt.currentQuestionIndex,
    startedAt: attempt.startedAt.toISOString(),
    updatedAt: attempt.updatedAt.toISOString(),
    completedAt: attempt.completedAt?.toISOString() ?? null,
  };
}

function clampQuestionIndex(index: number, totalQuestions: number): number {
  return Math.min(Math.max(index, 0), Math.max(totalQuestions - 1, 0));
}

export class PracticeService {
  async createQuestionSet(
    input: CreatePracticeQuestionSetInput,
  ): Promise<PracticeQuestionSet> {
    await ensurePracticeCatalogSeeded();

    const categoryId = input.categoryId.trim();
    const subcategoryId = input.subcategoryId.trim();

    const subcategory = await prisma.practiceSubcategory.findUnique({
      where: { id: subcategoryId },
      select: {
        categoryId: true,
      },
    });

    if (!subcategory) {
      throw new NotFoundError("Subcategory not found");
    }

    if (subcategory.categoryId !== categoryId) {
      throw new BadRequestError("Subcategory does not belong to category");
    }

    const created = await prisma.practiceQuestionSet.create({
      data: {
        categoryId,
        subcategoryId,
        title: input.title.trim(),
        stem: input.stem as unknown as Prisma.InputJsonValue,
        questions: input.questions as unknown as Prisma.InputJsonValue,
        isPublished: input.isPublished ?? true,
      },
    });

    return mapQuestionSet(created);
  }

  async getQuestionSetById(
    questionSetId: number,
  ): Promise<PracticeQuestionSet> {
    const questionSet = await prisma.practiceQuestionSet.findUnique({
      where: { id: questionSetId },
    });

    if (!questionSet) {
      throw new NotFoundError("Question set not found");
    }

    return mapQuestionSet(questionSet);
  }

  async listQuestionSets(
    categoryId: string,
    subcategoryId: string,
  ): Promise<PracticeQuestionSet[]> {
    await ensurePracticeCatalogSeeded();

    const questionSets = await prisma.practiceQuestionSet.findMany({
      where: {
        categoryId,
        subcategoryId,
        isPublished: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return questionSets.map(mapQuestionSet);
  }

  async getSessionQuestionSets(
    categoryId: string,
    subcategoryId: string,
    count: number,
  ): Promise<PracticeQuestionSet[]> {
    await ensurePracticeCatalogSeeded();

    const questionSets = await prisma.practiceQuestionSet.findMany({
      where: {
        categoryId,
        subcategoryId,
        isPublished: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      take: count,
    });

    if (questionSets.length === 0) {
      throw new NotFoundError("No published question set found for this topic");
    }

    return questionSets.map(mapQuestionSet);
  }

  async getSavedAnswers(
    userId: number,
    subcategoryId: string,
  ): Promise<Record<string, { selectedOptionIndex: number; isCorrect: boolean }>> {
    const rows = await prisma.practiceQuestionProgress.findMany({
      where: { userId, subcategoryId },
      select: { questionKey: true, selectedOptionIndex: true, isCorrect: true },
    });

    const savedAnswers: Record<
      string,
      { selectedOptionIndex: number; isCorrect: boolean }
    > = {};

    for (const row of rows) {
      if (row.selectedOptionIndex !== null) {
        savedAnswers[row.questionKey] = {
          selectedOptionIndex: row.selectedOptionIndex,
          isCorrect: row.isCorrect,
        };
      }
    }

    return savedAnswers;
  }

  async getProgressSummary(
    userId: number,
  ): Promise<PracticeCategoryProgress[]> {
    await ensurePracticeCatalogSeeded();

    const categories = await prisma.practiceCategory.findMany({
      orderBy: { displayOrder: "asc" },
      include: {
        subcategories: {
          orderBy: { displayOrder: "asc" },
          select: {
            id: true,
            name: true,
            totalQuestions: true,
            comingSoon: true,
          },
        },
      },
    });

    const allSubcategoryIds = categories.flatMap((category) =>
      category.subcategories.map((sub) => sub.id),
    );

    const answeredCountMap = await getAnsweredCountsBySubcategory(
      userId,
      allSubcategoryIds,
    );

    return mapCategoryProgress(categories, answeredCountMap);
  }

  async getCategoryProgress(
    userId: number,
    categoryId: string,
  ): Promise<PracticeCategoryProgress> {
    await ensurePracticeCatalogSeeded();

    const category = await prisma.practiceCategory.findUnique({
      where: { id: categoryId },
      include: {
        subcategories: {
          orderBy: { displayOrder: "asc" },
          select: {
            id: true,
            name: true,
            totalQuestions: true,
            comingSoon: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundError("Category not found");
    }

    const subcategoryIds = category.subcategories.map((sub) => sub.id);
    const answeredCountMap = await getAnsweredCountsBySubcategory(
      userId,
      subcategoryIds,
    );

    return mapCategoryProgress([category], answeredCountMap)[0];
  }

  async recordAnswer(userId: number, input: RecordPracticeAnswerInput) {
    const categoryId = input.categoryId?.trim();
    const subcategoryId = input.subcategoryId?.trim();
    const questionKey = input.questionKey?.trim();

    if (!categoryId || !subcategoryId || !questionKey) {
      throw new BadRequestError(
        "categoryId, subcategoryId, and questionKey are required",
      );
    }

    await ensurePracticeCatalogSeeded();

    const subcategory = await prisma.practiceSubcategory.findUnique({
      where: { id: subcategoryId },
      select: {
        id: true,
        categoryId: true,
        comingSoon: true,
      },
    });

    if (!subcategory) {
      throw new NotFoundError("Subcategory not found");
    }

    if (subcategory.categoryId !== categoryId) {
      throw new BadRequestError("Subcategory does not belong to category");
    }

    if (subcategory.comingSoon) {
      throw new BadRequestError(
        "Cannot record answers for a coming soon subcategory",
      );
    }

    let isCorrect = input.isCorrect;

    if (input.attemptId === undefined) {
      await this.upsertQuestionProgress(userId, subcategoryId, questionKey, {
        isCorrect,
        selectedOptionIndex: input.selectedOptionIndex,
      });

      return this.getCategoryProgress(userId, categoryId);
    }

    const attempt = await this.getOwnedAttempt(userId, input.attemptId);

    if (attempt.status === "COMPLETED") {
      throw new BadRequestError("This attempt is already completed");
    }

    if (
      attempt.subcategoryId !== subcategoryId ||
      attempt.categoryId !== categoryId
    ) {
      throw new BadRequestError("Attempt does not belong to this topic");
    }

    // Correctness for attempts is decided server-side from the stored question.
    isCorrect = await this.resolveAnswerCorrectness(
      attempt.questionSetIds,
      questionKey,
      input.selectedOptionIndex,
    );

    await prisma.$transaction([
      this.buildQuestionProgressUpsert(userId, subcategoryId, questionKey, {
        isCorrect,
        selectedOptionIndex: input.selectedOptionIndex,
      }),
      prisma.practiceAttemptAnswer.upsert({
        where: {
          attemptId_questionKey: { attemptId: attempt.id, questionKey },
        },
        update: {
          selectedOptionIndex: input.selectedOptionIndex,
          isCorrect,
        },
        create: {
          attemptId: attempt.id,
          questionKey,
          selectedOptionIndex: input.selectedOptionIndex,
          isCorrect,
        },
      }),
      prisma.practiceAttempt.update({
        where: { id: attempt.id },
        data: {
          updatedAt: new Date(),
          ...(input.currentQuestionIndex !== undefined && {
            currentQuestionIndex: clampQuestionIndex(
              input.currentQuestionIndex,
              attempt.totalQuestions,
            ),
          }),
        },
      }),
    ]);

    return this.getCategoryProgress(userId, categoryId);
  }

  private buildQuestionProgressUpsert(
    userId: number,
    subcategoryId: string,
    questionKey: string,
    answer: { isCorrect: boolean; selectedOptionIndex: number },
  ) {
    return prisma.practiceQuestionProgress.upsert({
      where: {
        userId_subcategoryId_questionKey: {
          userId,
          subcategoryId,
          questionKey,
        },
      },
      update: {
        isCorrect: answer.isCorrect,
        selectedOptionIndex: answer.selectedOptionIndex,
        attemptCount: {
          increment: 1,
        },
      },
      create: {
        userId,
        subcategoryId,
        questionKey,
        isCorrect: answer.isCorrect,
        selectedOptionIndex: answer.selectedOptionIndex,
      },
    });
  }

  private async upsertQuestionProgress(
    userId: number,
    subcategoryId: string,
    questionKey: string,
    answer: { isCorrect: boolean; selectedOptionIndex: number },
  ) {
    await this.buildQuestionProgressUpsert(
      userId,
      subcategoryId,
      questionKey,
      answer,
    );
  }

  private async getOwnedAttempt(userId: number, attemptId: number) {
    // Not found (rather than forbidden) so attempt ids of other users are not revealed.
    const attempt = await prisma.practiceAttempt.findFirst({
      where: { id: attemptId, userId },
    });

    if (!attempt) {
      throw new NotFoundError("Attempt not found");
    }

    return attempt;
  }

  private async resolveAnswerCorrectness(
    questionSetIds: number[],
    questionKey: string,
    selectedOptionIndex: number,
  ): Promise<boolean> {
    const separatorIndex = questionKey.indexOf(":");
    const setId = Number.parseInt(questionKey.slice(0, separatorIndex), 10);
    const questionId = questionKey.slice(separatorIndex + 1);

    if (
      separatorIndex === -1 ||
      !Number.isFinite(setId) ||
      !questionSetIds.includes(setId)
    ) {
      throw new BadRequestError("Question does not belong to this attempt");
    }

    const questionSet = await prisma.practiceQuestionSet.findUnique({
      where: { id: setId },
      select: { questions: true },
    });
    const questions = (questionSet?.questions ??
      []) as PracticeQuestionSet["questions"];
    const question = questions.find((item) => item.id === questionId);

    if (!question) {
      throw new BadRequestError("Question does not belong to this attempt");
    }

    if (selectedOptionIndex >= question.options.length) {
      throw new BadRequestError("selectedOptionIndex is out of range");
    }

    return selectedOptionIndex === question.correctOptionIndex;
  }

  async createAttempt(
    userId: number,
    input: CreatePracticeAttemptInput,
  ): Promise<PracticeAttemptSummary> {
    await ensurePracticeCatalogSeeded();

    const categoryId = input.categoryId.trim();
    const subcategoryId = input.subcategoryId.trim();

    const subcategory = await prisma.practiceSubcategory.findUnique({
      where: { id: subcategoryId },
      select: { categoryId: true, comingSoon: true },
    });

    if (!subcategory) {
      throw new NotFoundError("Subcategory not found");
    }

    if (subcategory.categoryId !== categoryId) {
      throw new BadRequestError("Subcategory does not belong to category");
    }

    if (subcategory.comingSoon) {
      throw new BadRequestError(
        "Cannot start practice for a coming soon subcategory",
      );
    }

    if (input.resumeExisting) {
      const existing = await prisma.practiceAttempt.findFirst({
        where: {
          userId,
          subcategoryId,
          status: "IN_PROGRESS",
        },
        orderBy: { updatedAt: "desc" },
        include: attemptSummaryInclude,
      });

      if (existing && existing.questionSetIds.length === input.sets) {
        return mapAttemptSummary(existing);
      }
    }

    const questionSets = await this.getSessionQuestionSets(
      categoryId,
      subcategoryId,
      input.sets,
    );

    const created = await prisma.practiceAttempt.create({
      data: {
        userId,
        categoryId,
        subcategoryId,
        questionSetIds: questionSets.map((set) => set.id),
        totalQuestions: questionSets.reduce(
          (sum, set) => sum + set.questions.length,
          0,
        ),
      },
      include: attemptSummaryInclude,
    });

    return mapAttemptSummary(created);
  }

  async listAttempts(
    userId: number,
    options: { status?: "IN_PROGRESS" | "COMPLETED"; limit?: number } = {},
  ): Promise<PracticeAttemptSummary[]> {
    const attempts = await prisma.practiceAttempt.findMany({
      where: { userId, ...(options.status && { status: options.status }) },
      orderBy: { updatedAt: "desc" },
      take: options.limit ?? 100,
      include: attemptSummaryInclude,
    });

    return attempts.map(mapAttemptSummary);
  }

  async getAttempt(
    userId: number,
    attemptId: number,
  ): Promise<PracticeAttemptDetail> {
    const attempt = await prisma.practiceAttempt.findFirst({
      where: { id: attemptId, userId },
      include: {
        ...attemptSummaryInclude,
        answers: {
          select: {
            questionKey: true,
            selectedOptionIndex: true,
            isCorrect: true,
          },
        },
      },
    });

    if (!attempt) {
      throw new NotFoundError("Attempt not found");
    }

    const questionSetRows = await prisma.practiceQuestionSet.findMany({
      where: { id: { in: attempt.questionSetIds } },
    });
    const questionSets = attempt.questionSetIds
      .map((id) => questionSetRows.find((row) => row.id === id))
      .filter((row): row is NonNullable<typeof row> => Boolean(row))
      .map(mapQuestionSet);

    const savedAnswers: Record<string, PracticeSavedAnswer> = {};
    for (const answer of attempt.answers) {
      savedAnswers[answer.questionKey] = {
        selectedOptionIndex: answer.selectedOptionIndex,
        isCorrect: answer.isCorrect,
      };
    }

    return {
      attempt: mapAttemptSummary(attempt),
      questionSets,
      savedAnswers,
      bookmarkedKeys: attempt.bookmarkedKeys,
    };
  }

  async updateAttempt(
    userId: number,
    attemptId: number,
    input: UpdatePracticeAttemptInput,
  ): Promise<PracticeAttemptSummary> {
    const attempt = await prisma.practiceAttempt.findFirst({
      where: { id: attemptId, userId },
      include: attemptSummaryInclude,
    });

    if (!attempt) {
      throw new NotFoundError("Attempt not found");
    }

    // Completed attempts are read-only; leaving a review is a no-op.
    if (attempt.status === "COMPLETED") {
      return mapAttemptSummary(attempt);
    }

    const shouldComplete =
      input.action === "finish" ||
      (input.action === "save" &&
        attempt.totalQuestions > 0 &&
        attempt.answers.length >= attempt.totalQuestions);

    const updated = await prisma.practiceAttempt.update({
      where: { id: attempt.id },
      data: {
        ...(input.currentQuestionIndex !== undefined && {
          currentQuestionIndex: clampQuestionIndex(
            input.currentQuestionIndex,
            attempt.totalQuestions,
          ),
        }),
        ...(input.bookmarkedKeys !== undefined && {
          bookmarkedKeys: input.bookmarkedKeys,
        }),
        ...(shouldComplete && {
          status: "COMPLETED" as const,
          completedAt: new Date(),
        }),
      },
      include: attemptSummaryInclude,
    });

    return mapAttemptSummary(updated);
  }

  async reportQuestion(userId: number, input: ReportPracticeQuestionInput) {
    const questionSet = await prisma.practiceQuestionSet.findUnique({
      where: { id: input.questionSetId },
      select: { id: true },
    });

    if (!questionSet) {
      throw new NotFoundError("Question set not found");
    }

    await prisma.practiceQuestionReport.create({
      data: {
        userId,
        categoryId: input.categoryId.trim(),
        subcategoryId: input.subcategoryId.trim(),
        questionSetId: input.questionSetId,
        questionId: input.questionId.trim(),
        message: input.message.trim(),
      },
    });
  }
}

export const practiceService = new PracticeService();
