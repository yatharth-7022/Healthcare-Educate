import { Prisma } from "@prisma/client";
import type { CreatePracticeQuestionSetInput } from "@shared/models/practice";
import { prisma } from "../server/db";

const CATEGORY_ID = "general-chemistry";
const SUBCATEGORY_ID = "general-chemistry-materials-chemistry";
const TITLE = "Glass Transition in Conjugated Polymers - Stem 1";

const input: CreatePracticeQuestionSetInput = {
  categoryId: CATEGORY_ID,
  subcategoryId: SUBCATEGORY_ID,
  title: TITLE,
  isPublished: true,
  stem: [
    {
      type: "text",
      value:
        "In polymer science, the glass transition temperature (Tg) is a critical thermal property that marks the transition of a polymer from a hard, glassy state to a soft, rubbery state. Tg is influenced by both the polymer backbone and the flexible alkyl side chains attached to it. A study of conjugated polymers categorized them into two main groups: Group 1 (thiophene-rich) and Group 2 (phenyl-rich). These backbones differ in rigidity, affecting thermal behavior. The study showed that polymers with longer or higher-mass side chains tend to have lower Tg, due to a phenomenon called internal plasticization, where the flexible side chains increase segmental mobility.",
    },
    {
      type: "text",
      value:
        "Tg can be identified using rheological techniques, specifically by analyzing the loss modulus (G'') curve, where the peak of G'' corresponds to the glass transition temperature. In another analysis, Tg was plotted against side chain mass fraction (w), with the trend modeled using the Fox equation given below:",
    },
    {
      type: "equation",
      value:
        "\\\\frac{1}{T_g} = \\\\frac{w}{T_{g,sc}} + \\\\frac{1 - w}{T_{g,bb}}",
      mode: "block",
    },
    {
      type: "text",
      value:
        "Here, Tg,sc and Tg,bb represent the glass transition temperatures of the side chain and backbone components, respectively. Group 1 polymers had values of Tg,sc = -69C and Tg,bb = 218C, while Group 2 polymers had Tg,sc = -14C and Tg,bb = 287C. These values illustrate the impact of both the chemical structure and the proportion of flexible side chains on thermal properties. Figure 2(a) and (b) represent the rheological curves and Storage (G') and loss (G'') moduli for various group 1 and 2 molecules with varying side chain lengths.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1775294155/image008_zdjfme.png",
      alt: "Rheological curves and storage/loss moduli for conjugated polymers",
      caption: "Figure 2(a) and (b)",
    },
    {
      type: "text",
      value:
        "The following questions are based on figures and calculations related to the graphs, including rheological curves, Tg trends, and the Fox equation.",
    },
    {
      type: "text",
      value:
        "ADDITIONAL INFORMATION: Figure 3 depicts the correlation between side chain mass fraction (w) and glass transition temperature (Tg) for conjugated polymers in this work.",
      variant: "additional-info",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1775294255/image013_qczz83.png",
      alt: "Correlation between side chain mass fraction and glass transition temperature",
      caption: "Figure 3",
    },
  ],
  questions: [
    {
      id: "q1",
      prompt:
        "Which polymer group generally exhibits a higher glass transition temperature (Tg), and why?",
      options: [
        "Group 1, due to their thiophene-rich backbones which are more flexible",
        "Group 2, due to their phenyl-rich backbones which are more rigid",
        "Group 1, because they have longer alkyl side chains",
        "Group 2, because their side chains contain aromatic rings",
      ],
      correctOptionIndex: 1,
    },
    {
      id: "q2",
      prompt:
        "Using the Fox equation and the values for Group 1 polymers (Tg,sc = -69C, Tg,bb = 218C), what is the approximate Tg (in C) when the side chain mass fraction w = 0.3?",
      options: ["-5C", "35C", "72C", "160C"],
      correctOptionIndex: 2,
    },
    {
      id: "q3",
      prompt:
        "A phenyl-rich (Group 2) polymer has a measured glass transition temperature of 150C. Using the Fox equation, which of the following is the closest estimate for its side chain mass fraction w? (Use: Tg,sc = -14C = 259K, Tg,bb = 287C = 560K, Tg = 150C = 423K)",
      options: ["0.12", "0.28", "0.55", "0.80"],
      correctOptionIndex: 1,
    },
    {
      id: "q4",
      prompt:
        "You are designing a polymer that must remain flexible but not soften below 80C. Which of the following design strategies is most appropriate?",
      options: [
        "Use a Group 2 (phenyl-rich) backbone with no side chains",
        "Use a Group 1 (thiophene-rich) backbone with moderate side chain mass fraction",
        "Use a Group 2 backbone with long alkyl side chains",
        "Use a Group 1 backbone with very high side chain mass fraction",
      ],
      correctOptionIndex: 1,
    },
    {
      id: "q5",
      prompt:
        "Which of the following best describes the trend shown in Figure 2 (modulus vs. temperature)?",
      options: [
        "Tg increases as side chain mass fraction increases",
        "Tg decreases as side chain mass fraction increases",
        "Tg is independent of side chain length or structure",
        "Tg increases with increasing molecular weight only",
      ],
      correctOptionIndex: 1,
    },
    {
      id: "q6",
      prompt:
        "What is the observed effect of increasing the side chain length in regiorandom P3AT polymers on their glass transition temperature (Tg)?",
      options: [
        "Tg increases because longer chains restrict movement",
        "Tg decreases because longer side chains increase internal flexibility",
        "Tg stays the same because side chains do not affect backbone properties",
        "Tg decreases because side chains chemically degrade the backbone",
      ],
      correctOptionIndex: 1,
    },
    {
      id: "q7",
      prompt:
        "Which of the following polymers has the highest glass transition temperature based on the G'' (loss modulus) peak observed in Figure 2a?",
      options: ["P3HT", "P3OT", "P3DDT", "P3BT"],
      correctOptionIndex: 3,
    },
    {
      id: "q8",
      prompt:
        "If the chain mass fraction of a compound is 0.52 which compound could it be?",
      options: ["P3HT", "PCT6BT", "P3DDT", "PCDTBT"],
      correctOptionIndex: 0,
    },
    {
      id: "q9",
      prompt:
        "Below are three parent chains of polymers. Which correctly represents the mathematical relationship for the compounds respective Tg values?",
      contentBlocks: [
        {
          type: "image",
          url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1775294345/image015_jndh8e.jpg",
          alt: "Parent chain A",
          caption: "Parent chain A",
        },
        {
          type: "image",
          url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1775294343/image016_fs9gsp.jpg",
          alt: "Parent chain B",
          caption: "Parent chain B",
        },
        {
          type: "image",
          url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1775294344/image014_vqel9h.jpg",
          alt: "Parent chain C",
          caption: "Parent chain C",
        },
      ],
      options: ["A > B > C", "B > A > C", "C > A > B", "A = B > C"],
      correctOptionIndex: 0,
      explanation:
        "Tentative key set for first pass. Confirm against your source answer key and adjust if needed.",
    },
  ],
};

async function main() {
  const category = await prisma.practiceCategory.findUnique({
    where: { id: CATEGORY_ID },
  });
  const subcategory = await prisma.practiceSubcategory.findUnique({
    where: { id: SUBCATEGORY_ID },
  });

  if (!category || !subcategory) {
    throw new Error(
      "Category/Subcategory not found. Run npm run db:setup:practice first.",
    );
  }

  const existing = await prisma.practiceQuestionSet.findFirst({
    where: {
      categoryId: CATEGORY_ID,
      subcategoryId: SUBCATEGORY_ID,
      title: TITLE,
    },
    orderBy: { createdAt: "asc" },
  });

  if (existing) {
    const updated = await prisma.practiceQuestionSet.update({
      where: { id: existing.id },
      data: {
        stem: input.stem as unknown as Prisma.InputJsonValue,
        questions: input.questions as unknown as Prisma.InputJsonValue,
        isPublished: true,
      },
    });

    console.log(`Updated question set #${updated.id}`);
    return;
  }

  const created = await prisma.practiceQuestionSet.create({
    data: {
      categoryId: input.categoryId,
      subcategoryId: input.subcategoryId,
      title: input.title,
      stem: input.stem as unknown as Prisma.InputJsonValue,
      questions: input.questions as unknown as Prisma.InputJsonValue,
      isPublished: true,
    },
  });

  console.log(`Created question set #${created.id}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
