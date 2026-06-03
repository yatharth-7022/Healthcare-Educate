import { prisma } from "../server/db";

async function main() {
  const { count } = await prisma.practiceQuestionSet.deleteMany({});
  console.log(`Deleted ${count} question set(s).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
