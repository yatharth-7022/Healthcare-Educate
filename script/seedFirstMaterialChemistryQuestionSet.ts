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
        "In polymer science, the glass transition temperature ($T_g$) is a critical thermal property that marks the transition of a polymer from a hard, glassy state to a soft, rubbery state. $T_g$ is influenced by both the polymer backbone and the flexible alkyl side chains attached to it. A study of conjugated polymers categorized them into two main groups: Group 1 (thiophene-rich) and Group 2 (phenyl-rich). These backbones differ in rigidity, affecting thermal behavior. The study showed that polymers with longer or higher-mass side chains tend to have lower $T_g$, due to a phenomenon called internal plasticization, where the flexible side chains increase segmental mobility.",
    },
    {
      type: "text",
      value:
        "$T_g$ can be identified using rheological techniques, specifically by analyzing the loss modulus ($G''$) curve, where the peak of $G''$ corresponds to the glass transition temperature. In another analysis, $T_g$ was plotted against side chain mass fraction ($w$), with the trend modeled using the Fox equation given below:",
    },
    {
      type: "equation",
      value: "\\frac{1}{T_g} = \\frac{w}{T_{g,\\text{sc}}} + \\frac{1-w}{T_{g,\\text{bb}}}",
      mode: "block",
    },
    {
      type: "text",
      value:
        "Here, $T_{g,sc}$ and $T_{g,bb}$ represent the glass transition temperatures of the side chain and backbone components, respectively. Group 1 polymers had values of $T_{g,sc} = -69$ °C and $T_{g,bb} = 218$ °C, while Group 2 polymers had $T_{g,sc} = -14$ °C and $T_{g,bb} = 287$ °C. These values illustrate the impact of both the chemical structure and the proportion of flexible side chains on thermal properties.",
    },
    {
      type: "text",
      value:
        "Figure 2(a) and (b) represent the rheological curves and Storage ($G'$) and loss ($G''$) moduli for various Group 1 and Group 2 molecules with varying side chain lengths.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1778912465/02_figure_2a_structures_P3DDT_P3OT_P3HT_P3BT_r9nvgm.png",
      alt: "Figure 2a: Rheological curves for Group 1 (thiophene-rich) conjugated polymers",
      caption: "Figure 2a (i)",
    },
    {
      type: "text",
      value:
        "Figure 2a (i): Rheological curves ($G'$ and $G''$ vs. temperature) for Group 1 (thiophene-rich) conjugated polymers with varying side chain lengths.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554160/question-bank/qb_img_1780554159789_8.png",
      alt: "Figure 2a: Rheological curves for Group 2 (phenyl-rich) conjugated polymers",
      caption: "Figure 2a (ii)",
    },
    {
      type: "text",
      value:
        "Figure 2a (ii): Rheological curves ($G'$ and $G''$ vs. temperature) for Group 2 (phenyl-rich) conjugated polymers with varying side chain lengths.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554161/question-bank/qb_img_1780554160601_9.png",
      alt: "Figure 2b: Storage and loss moduli for Group 1 conjugated polymers",
      caption: "Figure 2b (i)",
    },
    {
      type: "text",
      value:
        "Figure 2b (i): Storage modulus $G'$ and loss modulus $G''$ vs. temperature for Group 1 (thiophene-rich) polymers.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554163/question-bank/qb_img_1780554161769_10.png",
      alt: "Figure 2b: Storage and loss moduli for Group 2 conjugated polymers",
      caption: "Figure 2b (ii)",
    },
    {
      type: "text",
      value:
        "Figure 2b (ii): Storage modulus $G'$ and loss modulus $G''$ vs. temperature for Group 2 (phenyl-rich) polymers.",
    },
    {
      type: "text",
      value:
        "The following questions are based on figures and calculations related to the graphs, including rheological curves, $T_g$ trends, and the Fox equation.",
    },
    {
      type: "text",
      value: "ADDITIONAL INFORMATION:",
      variant: "additional-info",
      revealAtQuestion: 8,
    },
    {
      type: "text",
      value:
        "Figure 3 depicts the correlation between the side chain mass fraction ($w$) and the glass transition temperature ($T_g$) for conjugated polymers in this work.",
      revealAtQuestion: 8,
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554166/question-bank/qb_img_1780554166207_15.png",
      alt: "Figure 3: Correlation between side chain mass fraction w and glass transition temperature Tg",
      caption: "Figure 3",
      revealAtQuestion: 8,
    },
    {
      type: "text",
      value:
        "Figure 3: Correlation between side chain mass fraction ($w$) and glass transition temperature ($T_g$) for conjugated polymers. Group 1 (thiophene-rich) and Group 2 (phenyl-rich) trendlines are fitted using the Fox equation.",
      revealAtQuestion: 8,
    },
  ],
  questions: [
    {
      id: "q1",
      prompt:
        "Which polymer group generally exhibits a higher glass transition temperature ($T_g$), and why?",
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
        "Using the Fox equation and the values for Group 1 polymers ($T_{g,sc} = -69$ °C, $T_{g,bb} = 218$ °C), what is the approximate $T_g$ (in °C) when the side chain mass fraction $w = 0.3$?",
      options: ["$-5$ °C", "$35$ °C", "$72$ °C", "$160$ °C"],
      correctOptionIndex: 2,
    },
    {
      id: "q3",
      prompt:
        "A phenyl-rich (Group 2) polymer has a measured glass transition temperature of 150 °C. Using the Fox equation, which of the following is the closest estimate for its side chain mass fraction $w$? (Use: $T_{g,sc} = -14$ °C $= 259$ K, $T_{g,bb} = 287$ °C $= 560$ K, $T_g = 150$ °C $= 423$ K)",
      options: ["$0.12$", "$0.28$", "$0.55$", "$0.80$"],
      correctOptionIndex: 1,
    },
    {
      id: "q4",
      prompt:
        "You are designing a polymer that must remain flexible but not soften below 80 °C. Which of the following design strategies is most appropriate?",
      options: [
        "Use a Group 2 (phenyl-rich) backbone with no side chains",
        "Use a Group 1 (thiophene-rich) backbone with moderate side chain mass fraction",
        "Use a Group 2 backbone with long alkyl side chains",
        "Use a Group 1 backbone with very high side chain mass fraction",
      ],
      correctOptionIndex: 0,
    },
    {
      id: "q5",
      prompt:
        "Which of the following best describes the trend shown in both Figure 2a and 2b (modulus vs. temperature)?",
      options: [
        "$T_g$ increases as side chain mass fraction increases",
        "$T_g$ decreases as side chain mass fraction increases",
        "$T_g$ is independent of side chain length or structure",
        "$T_g$ increases with increasing molecular weight only",
      ],
      correctOptionIndex: 1,
    },
    {
      id: "q6",
      prompt:
        "What is the observed effect of increasing the side chain length in regiorandom P3AT polymers on their glass transition temperature ($T_g$)?",
      options: [
        "$T_g$ increases because longer chains restrict movement",
        "$T_g$ decreases because longer side chains increase internal flexibility",
        "$T_g$ stays the same because side chains do not affect backbone properties",
        "$T_g$ decreases because side chains chemically degrade the backbone",
      ],
      correctOptionIndex: 1,
    },
    {
      id: "q7",
      prompt:
        "Which of the following polymers has the highest glass transition temperature based on the $G''$ (loss modulus) peak observed in Figure 2a?",
      options: ["P3HT", "P3OT", "P3DDT", "P3BT"],
      correctOptionIndex: 3,
    },
    {
      id: "q8",
      prompt:
        "If the side chain mass fraction of a compound is $0.52$, which compound could it be?",
      options: ["P3HT", "PCT6BT", "P3DDT", "PCDTBT"],
      correctOptionIndex: 0,
    },
    {
      id: "q9",
      prompt:
        "Below are three parent chains of polymers. Which correctly represents the mathematical relationship for the compounds' respective $T_g$ values?",
      contentBlocks: [
        {
          type: "image",
          url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554167/question-bank/qb_img_1780554167171_16.png",
          alt: "Molecule 1 parent chain structure",
          caption: "Molecule 1",
        },
        {
          type: "image",
          url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554168/question-bank/qb_img_1780554167849_17.png",
          alt: "Molecule 2 parent chain structure",
          caption: "Molecule 2",
        },
        {
          type: "image",
          url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554168/question-bank/qb_img_1780554168456_18.png",
          alt: "Molecule 3 parent chain structure",
          caption: "Molecule 3",
        },
      ],
      options: [
        "$T_{g,A} > T_{g,B} > T_{g,C}$",
        "$T_{g,B} > T_{g,A} > T_{g,C}$",
        "$T_{g,C} > T_{g,A} > T_{g,B}$",
        "$T_{g,A} = T_{g,B} > T_{g,C}$",
      ],
      correctOptionIndex: 0,
    },
    {
      id: "q10",
      prompt:
        "From Figure 3, read the Group 2 (phenyl-rich) trendline at $w = 0.55$. Using this graph-derived $T_g$ value, predict what side-chain mass fraction would be required for a Group 1 (thiophene-rich) polymer to achieve the same $T_g$. (Use Group 1 parameters: $T_{g,sc} = 204$ K, $T_{g,bb} = 491$ K.)",
      options: ["$0.10$", "$0.30$", "$0.50$", "$0.70$"],
      correctOptionIndex: 0,
    },
  ],
};

async function main() {
  const category = await prisma.practiceCategory.findUnique({ where: { id: CATEGORY_ID } });
  const subcategory = await prisma.practiceSubcategory.findUnique({ where: { id: SUBCATEGORY_ID } });
  if (!category || !subcategory) {
    throw new Error("Category/Subcategory not found. Run npm run db:seed:practice first.");
  }
  const existing = await prisma.practiceQuestionSet.findFirst({
    where: { categoryId: CATEGORY_ID, subcategoryId: SUBCATEGORY_ID, title: TITLE },
  });
  if (existing) {
    const updated = await prisma.practiceQuestionSet.update({
      where: { id: existing.id },
      data: {
        stem: input.stem as unknown as Prisma.InputJsonValue,
        questions: input.questions as unknown as Prisma.InputJsonValue,
        isPublished: input.isPublished,
      },
    });
    console.log(`Updated #${updated.id}: ${input.title}`);
  } else {
    const created = await prisma.practiceQuestionSet.create({
      data: {
        categoryId: input.categoryId,
        subcategoryId: input.subcategoryId,
        title: input.title,
        isPublished: input.isPublished,
        stem: input.stem as unknown as Prisma.InputJsonValue,
        questions: input.questions as unknown as Prisma.InputJsonValue,
      },
    });
    console.log(`Created #${created.id}: ${input.title}`);
  }
}

main()
  .catch((e) => { console.error(e); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
