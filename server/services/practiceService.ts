import type {
  PracticeCategoryProgress,
  RecordPracticeAnswerInput,
} from "@shared/models/practice";
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

export class PracticeService {
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

    await prisma.practiceQuestionProgress.upsert({
      where: {
        userId_subcategoryId_questionKey: {
          userId,
          subcategoryId,
          questionKey,
        },
      },
      update: {
        isCorrect: input.isCorrect,
        attemptCount: {
          increment: 1,
        },
      },
      create: {
        userId,
        subcategoryId,
        questionKey,
        isCorrect: input.isCorrect,
      },
    });

    return this.getCategoryProgress(userId, categoryId);
  }
}

export const practiceService = new PracticeService();
