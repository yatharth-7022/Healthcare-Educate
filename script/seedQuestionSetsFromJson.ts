import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { Prisma } from "@prisma/client";
import type { CreatePracticeQuestionSetInput } from "@shared/models/practice";
import { prisma } from "../server/db";

/**
 * Seeds every question set JSON in script/data/questionSets (or the files passed as args).
 * Each file is a CreatePracticeQuestionSetInput. Upserts by (categoryId, subcategoryId, title).
 *
 *   npx tsx script/seedQuestionSetsFromJson.ts [--dry-run] [file.json ...]
 */
const DIR = path.resolve(process.cwd(), "script", "data", "questionSets");

function validate(file: string, input: CreatePracticeQuestionSetInput) {
  const problems: string[] = [];
  if (!input.stem?.length) problems.push("empty stem");
  if (!input.questions?.length) problems.push("no questions");
  input.questions?.forEach((q) => {
    if (!q.options?.length) problems.push(`${q.id}: no options`);
    if (q.correctOptionIndex < 0 || q.correctOptionIndex >= (q.options?.length ?? 0)) {
      problems.push(`${q.id}: correctOptionIndex out of range`);
    }
    if (!q.workedSolution?.steps?.length) problems.push(`${q.id}: no worked solution steps`);
  });
  if (problems.length) throw new Error(`${file}: ${problems.join("; ")}`);
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const files = args.filter((a) => !a.startsWith("--"));
  const targets = files.length
    ? files.map((f) => path.resolve(f))
    : fs.readdirSync(DIR).filter((f) => f.endsWith(".json")).map((f) => path.join(DIR, f));

  for (const file of targets) {
    const input = JSON.parse(fs.readFileSync(file, "utf8")) as CreatePracticeQuestionSetInput;
    validate(path.basename(file), input);
    if (dryRun) {
      console.log(`OK ${path.basename(file)}: ${input.questions.length} questions, ${input.stem.length} stem blocks`);
      continue;
    }

    const category = await prisma.practiceCategory.findUnique({ where: { id: input.categoryId } });
    const subcategory = await prisma.practiceSubcategory.findUnique({ where: { id: input.subcategoryId } });
    if (!category || !subcategory) {
      throw new Error(`${input.categoryId}/${input.subcategoryId} not found. Run npm run db:seed:practice first.`);
    }

    const data = {
      stem: input.stem as unknown as Prisma.InputJsonValue,
      questions: input.questions as unknown as Prisma.InputJsonValue,
      isPublished: input.isPublished ?? true,
    };
    const existing = await prisma.practiceQuestionSet.findFirst({
      where: { categoryId: input.categoryId, subcategoryId: input.subcategoryId, title: input.title },
    });
    if (existing) {
      await prisma.practiceQuestionSet.update({ where: { id: existing.id }, data });
      console.log(`Updated #${existing.id}: ${input.title}`);
    } else {
      const created = await prisma.practiceQuestionSet.create({
        data: { categoryId: input.categoryId, subcategoryId: input.subcategoryId, title: input.title, ...data },
      });
      console.log(`Created #${created.id}: ${input.title}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
