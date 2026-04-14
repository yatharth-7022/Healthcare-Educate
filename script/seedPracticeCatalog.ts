import { prisma } from "../server/db";
import { PRACTICE_CATALOG_SEED } from "../server/services/practiceCatalog";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function seedPracticeCatalog() {
  await prisma.$transaction(async (tx) => {
    for (
      let categoryIndex = 0;
      categoryIndex < PRACTICE_CATALOG_SEED.length;
      categoryIndex += 1
    ) {
      const category = PRACTICE_CATALOG_SEED[categoryIndex];
      const subcategories = category.subcategories.map((sub, subIndex) => ({
        id: `${category.id}-${slugify(sub.name)}`,
        categoryId: category.id,
        name: sub.name,
        displayOrder: subIndex,
        totalQuestions: sub.totalQuestions,
        comingSoon: Boolean(sub.comingSoon),
      }));

      const totalQuestions = subcategories.reduce(
        (sum, sub) => sum + sub.totalQuestions,
        0,
      );

      await tx.practiceCategory.upsert({
        where: { id: category.id },
        update: {
          name: category.name,
          displayOrder: categoryIndex,
          totalQuestions,
        },
        create: {
          id: category.id,
          name: category.name,
          displayOrder: categoryIndex,
          totalQuestions,
        },
      });

      for (const subcategory of subcategories) {
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

  const categoryCount = await prisma.practiceCategory.count();
  const subcategoryCount = await prisma.practiceSubcategory.count();

  console.log(
    `Practice catalog seeded: ${categoryCount} categories, ${subcategoryCount} subcategories.`,
  );
}

seedPracticeCatalog()
  .catch((error) => {
    console.error("Failed to seed practice catalog:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
