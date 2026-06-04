import { Prisma } from "@prisma/client";
import type { CreatePracticeQuestionSetInput } from "@shared/models/practice";
import { prisma } from "../server/db";

const CATEGORY_ID = "biology";
const SUBCATEGORY_ID = "biology-homeostasis-and-endocrinology";

const stems: CreatePracticeQuestionSetInput[] = [
  // ── Stem 1: PPARα ────────────────────────────────────────────────────────
  {
    categoryId: CATEGORY_ID,
    subcategoryId: SUBCATEGORY_ID,
    title: "Cardiac PPARα Knockout and Lipid Accumulation - Stem 1",
    isPublished: true,
    stem: [
      {
        type: "text",
        value:
          "During fasting, adipose tissue releases free fatty acids (FFAs) into the circulation. These may be oxidised for energy or stored as triglycerides (TG) within lipid droplets in the heart. The transcription factor peroxisome proliferator-activated receptor-alpha ($\\text{PPAR}\\alpha$) regulates cardiac fatty acid metabolism.",
      },
      {
        type: "text",
        value:
          "Plin2 is a lipid droplet–associated protein that coats lipid droplets and stabilises triglyceride storage. Changes in Plin2 expression are thought to influence how the heart stores fatty acids as TG.",
      },
      {
        type: "text",
        value:
          "Researchers compared Control and cardiac-specific $\\text{PPAR}\\alpha$ knockout ($\\text{cPPAR}\\alpha^{-/-}$) mice. They measured:\n• Graph A: Cardiac TG levels (fed vs fasted, Control vs $\\text{cPPAR}\\alpha^{-/-}$)\n• Graph B: Plin2 protein levels (fed vs fasted, Control vs $\\text{cPPAR}\\alpha^{-/-}$)",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554169/question-bank/qb_img_1780554169455_19.png",
        alt: "Graph A: Cardiac TG levels and Graph B: Plin2 protein levels in Control and cPPARα knockout mice",
        caption: "Graphs A and B",
      },
      {
        type: "text",
        value:
          "Graph A: Cardiac triglyceride (TG) levels in fed vs. fasted Control and $\\text{cPPAR}\\alpha^{-/-}$ mice. Graph B: Plin2 protein levels in fed vs. fasted Control and $\\text{cPPAR}\\alpha^{-/-}$ mice.",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554171/question-bank/qb_img_1780554170724_20.png",
        alt: "Additional experimental data from Control and cPPARα knockout mice",
        caption: "Figure 2",
      },
      {
        type: "text",
        value:
          "Figure 2: Additional experimental data comparing Control and cardiac-specific $\\text{PPAR}\\alpha$ knockout ($\\text{cPPAR}\\alpha^{-/-}$) mice.",
      },
    ],
    questions: [
      {
        id: "q1",
        prompt:
          "Which best describes the relationship between Plin2 and TG accumulation across the two graphs?",
        options: [
          "Fasting increases both Plin2 and TG in Controls, but not in knockouts.",
          "Fasting decreases Plin2 but increases TG in Controls.",
          "Knockouts show higher Plin2 but lower TG during fasting.",
          "TG accumulation occurs independently of Plin2 in all groups.",
        ],
        correctOptionIndex: 0,
      },
      {
        id: "q2",
        prompt:
          "What could be a reasonable explanation for why fasted $\\text{cPPAR}\\alpha^{-/-}$ mice fail to accumulate cardiac triglycerides despite having elevated circulating FFAs?",
        options: [
          "Reduced Plin2 expression prevents stable storage of triglycerides in lipid droplets.",
          "Knockout mice cannot mobilise fatty acids from adipose tissue.",
          "Knockout mice increase Plin5 levels to divert lipids into alternate pathways.",
          "$\\text{PPAR}\\alpha$ deficiency blocks fatty acid release into the blood.",
        ],
        correctOptionIndex: 0,
      },
      {
        id: "q3",
        prompt:
          "If a pharmacological agent were developed that increased Plin2 expression specifically in $\\text{cPPAR}\\alpha^{-/-}$ mice, which outcome would be most likely during fasting?",
        options: [
          "Cardiac TG accumulation would increase in knockouts.",
          "Serum FFAs would remain low in knockouts.",
          "Cardiac TG levels would decrease further in knockouts.",
          "Plin5 levels would rise to compensate for low Plin2.",
        ],
        correctOptionIndex: 0,
      },
      {
        id: "q4",
        prompt:
          "Given these results, which of the following is a reasonable generalisation about the role of $\\text{PPAR}\\alpha$ in cardiac lipid metabolism?",
        options: [
          "$\\text{PPAR}\\alpha$ is required for FFA mobilisation from adipose tissue.",
          "$\\text{PPAR}\\alpha$ controls Plin2 expression, which is linked to TG storage in the heart.",
          "$\\text{PPAR}\\alpha$ decreases Plin5 expression to reduce TG accumulation.",
          "$\\text{PPAR}\\alpha$ directly regulates serum FFA concentration.",
        ],
        correctOptionIndex: 1,
      },
      {
        id: "q5",
        prompt:
          "Suppose Plin2 protein levels were normalised to the housekeeping protein GAPDH. Imagine that in one population (e.g., Chinese participants) GAPDH expression is naturally lower than in another population (e.g., Eurasian/European participants). What implication would this have for the reported Plin2 expression values?",
        options: [
          "Plin2 would appear artificially higher in the Chinese population compared to Europeans, even if actual Plin2 levels were the same.",
          "Plin2 would appear artificially lower in the Chinese population compared to Europeans, even if actual Plin2 levels were the same.",
          "There would be no effect on the reported Plin2 values because housekeeping proteins always control for variability.",
          "GAPDH would increase Plin2 expression in Chinese participants.",
        ],
        correctOptionIndex: 0,
      },
    ],
  },

  // ── Stem 2: Sardine Metabolism ───────────────────────────────────────────
  {
    categoryId: CATEGORY_ID,
    subcategoryId: SUBCATEGORY_ID,
    title: "Temperature and Fasting in European Sardines - Stem 2",
    isPublished: true,
    stem: [
      {
        type: "text",
        value:
          "Small pelagic fish experience natural fluctuations in both food availability and environmental temperature. In temperate marine ecosystems, winter is typically associated with reduced plankton abundance and lower water temperatures, whereas summer conditions are characterised by higher temperatures and greater metabolic demands. To investigate how temperature and food availability interact to influence energy balance and survival, researchers conducted a controlled laboratory experiment using European sardines (Sardina pilchardus).",
      },
      {
        type: "text",
        value:
          "Groups of sardines were maintained for 60 days under one of four experimental conditions combining feeding status (fed or food-deprived) with temperature (12 °C or 20 °C). Throughout the experiment, survival was monitored daily. The figures below demonstrate various outcomes measured by the experiment:",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554171/question-bank/qb_img_1780554171464_21.png",
        alt: "Figure 1: Survival probability of sardines over 60 days",
        caption: "Figure 1",
      },
      {
        type: "text",
        value:
          "Figure 1: Survival probability of sardines over 60 days under fed or food-deprived conditions at 12 °C and 20 °C.",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554172/question-bank/qb_img_1780554172363_22.png",
        alt: "Figure 2: Median sardine oxygen consumption",
        caption: "Figure 2",
      },
      {
        type: "text",
        value:
          "Figure 2: Median sardine oxygen consumption ($\\text{mg O}_2 \\cdot \\text{g}^{-1} \\cdot \\text{h}^{-1}$) measured under different temperatures, feeding conditions, and experimental periods.",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554173/question-bank/qb_img_1780554173125_23.png",
        alt: "Figure 3: Relative daily body mass change",
        caption: "Figure 3",
      },
      {
        type: "text",
        value:
          "Figure 3: Relative daily body mass change ($\\text{g} \\cdot \\text{g}^{-1} \\cdot \\text{day}^{-1}$) in sardines under different feeding and temperature conditions.",
      },
      {
        type: "text",
        value: "ADDITIONAL INFORMATION:",
        variant: "additional-info",
      },
      {
        type: "text",
        value:
          "Mitochondrial respiration comprises ATP-linked and non-ATP-linked components. OXPHOS reflects ATP-producing respiration, whereas LEAK represents uncoupled oxygen consumption. Both were measured in red muscle tissue under different experimental conditions.",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554174/question-bank/qb_img_1780554173764_24.png",
        alt: "Figure 4: LEAK and OXPHOS mitochondrial respiration in sardine red muscle",
        caption: "Figure 4",
      },
      {
        type: "text",
        value:
          "Figure 4: LEAK and OXPHOS mitochondrial respiration in sardine red muscle across temperatures, feeding conditions, and time.",
      },
    ],
    questions: [
      {
        id: "q1",
        prompt:
          "Which explanation best accounts for why food-deprived sardines at 20 °C show substantially lower survival over 60 days than food-deprived sardines at 12 °C?",
        options: [
          "Food-deprived sardines at 20 °C reduce oxygen consumption so strongly that aerobic ATP production becomes insufficient to sustain life.",
          "Higher temperature increases the baseline rate of oxygen consumption, so during food deprivation energy expenditure remains high relative to energy intake, accelerating exhaustion of internal reserves.",
          "At 12 °C, sardines maintain a higher oxygen consumption rate, which protects survival by sustaining ATP synthesis.",
          "The lower survival at 20 °C must be due to reduced dissolved oxygen in water at higher temperatures, independently of metabolic rate.",
        ],
        correctOptionIndex: 0,
      },
      {
        id: "q2",
        prompt:
          "Which conclusion is best supported about the relationship between metabolic rate and body mass change across treatments?",
        options: [
          "The group with the highest oxygen consumption necessarily gains body mass over time due to higher ATP production.",
          "Food deprivation causes similar rates of body mass loss at 12 °C and 20 °C because intake is zero in both conditions.",
          "Higher oxygen consumption at 20 °C is associated with a more negative daily change in body mass during food deprivation.",
          "Differences in body mass change are independent of temperature and are explained only by feeding status.",
        ],
        correctOptionIndex: 0,
      },
      {
        id: "q3",
        prompt:
          "Which conclusion is most strongly supported regarding energy regulation in food-deprived sardines maintained at 20 °C between days 30 and 60?",
        options: [
          "Reduced mitochondrial ATP-producing capacity directly lowers whole-animal oxygen consumption.",
          "Decreased LEAK respiration fully compensates for increased metabolic demand at higher temperature.",
          "Whole-animal metabolic demand remains elevated despite a reduction in mitochondrial ATP-producing capacity.",
          "Increased mitochondrial coupling efficiency results in improved survival during prolonged starvation.",
        ],
        correctOptionIndex: 0,
      },
      {
        id: "q4",
        prompt:
          "During the 30–60 day period, food-deprived sardines at 20 °C have an average oxygen consumption of approximately $0.30\\ \\text{mg O}_2 \\cdot \\text{g}^{-1} \\cdot \\text{h}^{-1}$, whereas food-deprived sardines at 12 °C have approximately $0.20\\ \\text{mg O}_2 \\cdot \\text{g}^{-1} \\cdot \\text{h}^{-1}$. Using an oxycalorific coefficient of $14.1\\ \\text{J} \\cdot \\text{mg O}_2^{-1}$ and a lipid energy density of $23\\ \\text{kJ} \\cdot \\text{g}^{-1}$, what is the approximate difference in daily body mass loss between food-deprived sardines at 20 °C and those at 12 °C?",
        options: [
          "$0.0005\\ \\text{g} \\cdot \\text{g}^{-1} \\cdot \\text{day}^{-1}$",
          "$0.002\\ \\text{g} \\cdot \\text{g}^{-1} \\cdot \\text{day}^{-1}$",
          "$0.006\\ \\text{g} \\cdot \\text{g}^{-1} \\cdot \\text{day}^{-1}$",
          "$0.020\\ \\text{g} \\cdot \\text{g}^{-1} \\cdot \\text{day}^{-1}$",
        ],
        correctOptionIndex: 0,
      },
    ],
  },
];

async function seedQuestionSet(input: CreatePracticeQuestionSetInput) {
  const existing = await prisma.practiceQuestionSet.findFirst({
    where: { categoryId: input.categoryId, subcategoryId: input.subcategoryId, title: input.title },
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

async function main() {
  const category = await prisma.practiceCategory.findUnique({ where: { id: CATEGORY_ID } });
  const subcategory = await prisma.practiceSubcategory.findUnique({ where: { id: SUBCATEGORY_ID } });
  if (!category || !subcategory) {
    throw new Error("Category/Subcategory not found. Run npm run db:seed:practice first.");
  }
  for (const stem of stems) {
    await seedQuestionSet(stem);
  }
}

main()
  .catch((e) => { console.error(e); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
