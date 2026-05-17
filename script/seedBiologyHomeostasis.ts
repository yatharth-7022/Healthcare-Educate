import { Prisma } from "@prisma/client";
import type { CreatePracticeQuestionSetInput } from "@shared/models/practice";
import { prisma } from "../server/db";

const CATEGORY_ID = "biology";
const SUBCATEGORY_ID = "biology-homeostasis-and-endocrinology";

const stems: CreatePracticeQuestionSetInput[] = [
  {
    categoryId: CATEGORY_ID,
    subcategoryId: SUBCATEGORY_ID,
    title: "PPARα and Cardiac Lipid Accumulation - Stem 1",
    isPublished: true,
    stem: [
      {
        type: "text",
        value:
          "During fasting, adipose tissue releases free fatty acids (FFAs) into the circulation. These may be oxidised for energy or stored as triglycerides (TG) within lipid droplets in the heart. The transcription factor peroxisome proliferator-activated receptor-alpha (PPARα) regulates cardiac fatty acid metabolism.",
      },
      {
        type: "text",
        value:
          "Plin2 is a lipid droplet–associated protein that coats lipid droplets and stabilises triglyceride storage. Changes in Plin2 expression are thought to influence how the heart stores fatty acids as TG.",
      },
      {
        type: "text",
        value:
          "Researchers compared Control and cardiac-specific PPARα knockout (cPPARα⁻/⁻) mice. They measured: Graph A — Cardiac TG levels (fed vs fasted, Control vs cPPARα⁻/⁻); Graph B — Plin2 protein levels (fed vs fasted, Control vs cPPARα⁻/⁻).",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004875/question-bank/image39.png",
        alt: "Graph A: Cardiac TG levels in Control and cPPARα knockout mice",
        caption: "Graph A: Cardiac TG levels (fed vs fasted)",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004876/question-bank/image4.png",
        alt: "Graph B: Plin2 protein levels in Control and cPPARα knockout mice",
        caption: "Graph B: Plin2 protein levels (fed vs fasted)",
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
          "What could be a reasonable explanation for why fasted cPPARα⁻/⁻ mice fail to accumulate cardiac triglycerides despite having elevated circulating FFAs?",
        options: [
          "Reduced Plin2 expression prevents stable storage of triglycerides in lipid droplets.",
          "Knockout mice cannot mobilise fatty acids from adipose tissue.",
          "Knockout mice increase Plin5 levels to divert lipids into alternate pathways.",
          "PPARα deficiency blocks fatty acid release into the blood.",
        ],
        correctOptionIndex: 0,
      },
      {
        id: "q3",
        prompt:
          "If a pharmacological agent were developed that increased Plin2 expression specifically in cPPARα⁻/⁻ mice, which outcome would be most likely during fasting?",
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
          "Given these results, which of the following is a reasonable generalisation about the role of PPARα in cardiac lipid metabolism?",
        options: [
          "PPARα is required for FFA mobilisation from adipose tissue.",
          "PPARα controls Plin2 expression, which is linked to TG storage in the heart.",
          "PPARα decreases Plin5 expression to reduce TG accumulation.",
          "PPARα directly regulates serum FFA concentration.",
        ],
        correctOptionIndex: 0,
      },
      {
        id: "q5",
        prompt:
          "In biochemical assays such as Western blotting, researchers often measure a reference (housekeeping) protein that is expected to remain relatively constant across samples. The amount of the target protein is then interpreted relative to this reference. For example, if a given sample typically contains a certain amount of GAPDH, then other proteins within the same sample are expected to appear in a consistent proportion to that amount. Suppose Plin2 protein levels were normalised to the housekeeping protein GAPDH. Imagine that in one population (e.g., Chinese participants) GAPDH expression is naturally lower than in another population (e.g., Eurasian/European participants). What implication would this have for the reported Plin2 expression values?",
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
  {
    categoryId: CATEGORY_ID,
    subcategoryId: SUBCATEGORY_ID,
    title: "Temperature-Dependent Metabolic Consequences in European Sardine - Stem 2",
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
          "Groups of sardines were maintained for 60 days under one of four experimental conditions that combined feeding status (fed or food-deprived) with temperature (12 °C or 20 °C). Throughout the experiment, survival was monitored daily. The figures below demonstrate various outcomes measured by the experiment.",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004879/question-bank/image10.png",
        alt: "Survival probability of sardines over 60 days",
        caption: "Figure 1: Survival probability of sardines over 60 days under fed or food-deprived conditions at 12°C and 20°C",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004884/question-bank/image11.png",
        alt: "Median sardine oxygen consumption under different conditions",
        caption: "Figure 2: Median sardine oxygen consumption measured under different temperatures, feeding conditions, and experimental periods",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004887/question-bank/image15.png",
        alt: "Relative daily body mass change in sardines",
        caption: "Figure 3: Relative daily body mass change in sardines under different feeding and temperature conditions",
      },
      {
        type: "text",
        value:
          "ADDITIONAL INFORMATION: Mitochondrial respiration comprises ATP-linked and non-ATP-linked components. OXPHOS reflects ATP-producing respiration, whereas LEAK represents uncoupled oxygen consumption. Both were measured in red muscle tissue under different experimental conditions.",
        variant: "additional-info",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004888/question-bank/image16.png",
        alt: "LEAK and OXPHOS mitochondrial respiration in sardine red muscle",
        caption: "Figure 4: LEAK and OXPHOS mitochondrial respiration in sardine red muscle across temperatures, feeding conditions, and time",
      },
    ],
    questions: [
      {
        id: "q1",
        prompt:
          "Which explanation best accounts for why food-deprived sardines at 20°C show substantially lower survival over 60 days than food-deprived sardines at 12°C?",
        options: [
          "Food-deprived sardines at 20°C reduce oxygen consumption so strongly that aerobic ATP production becomes insufficient to sustain life",
          "Higher temperature increases the baseline rate of oxygen consumption, so during food deprivation energy expenditure remains high relative to energy intake, accelerating exhaustion of internal reserves",
          "At 12°C, sardines maintain a higher oxygen consumption rate, which protects survival by sustaining ATP synthesis",
          "The lower survival at 20°C must be due to reduced dissolved oxygen in water at higher temperatures, independently of metabolic rate",
        ],
        correctOptionIndex: 0,
      },
      {
        id: "q2",
        prompt:
          "Which conclusion is best supported about the relationship between metabolic rate and body mass change across treatments?",
        options: [
          "The group with the highest oxygen consumption necessarily gains body mass over time due to higher ATP production",
          "Food deprivation causes similar rates of body mass loss at 12°C and 20°C because intake is zero in both conditions",
          "Higher oxygen consumption at 20°C is associated with a more negative daily change in body mass during food deprivation",
          "Differences in body mass change are independent of temperature and are explained only by feeding status",
        ],
        correctOptionIndex: 0,
      },
      {
        id: "q3",
        prompt:
          "Which conclusion is most strongly supported regarding energy regulation in food-deprived sardines maintained at 20°C between days 30 and 60?",
        options: [
          "Reduced mitochondrial ATP-producing capacity directly lowers whole-animal oxygen consumption",
          "Decreased LEAK respiration fully compensates for increased metabolic demand at higher temperature",
          "Whole-animal metabolic demand remains elevated despite a reduction in mitochondrial ATP-producing capacity",
          "Increased mitochondrial coupling efficiency results in improved survival during prolonged starvation",
        ],
        correctOptionIndex: 0,
      },
      {
        id: "q4",
        prompt:
          "During the 30–60 day period, Figure 3 shows that food-deprived sardines at 20°C have an average oxygen consumption of approximately 0.30 mg O₂·g⁻¹·h⁻¹, whereas food-deprived sardines at 12°C have an average oxygen consumption of approximately 0.20 mg O₂·g⁻¹·h⁻¹. Energy expenditure is related to oxygen consumption by [Formula pending], where [Formula pending]. Assume that food-deprived sardines have no energy intake, and that body mass loss during this period is primarily due to lipid catabolism, with an energy density of 23 kJ·g⁻¹. Body mass change can be estimated by [Formula pending]. What is the approximate difference in daily body mass loss between food-deprived sardines at 20°C and those at 12°C?",
        options: [
          "0.0005 g g⁻¹ day⁻¹",
          "0.002 g g⁻¹ day⁻¹",
          "0.006 g g⁻¹ day⁻¹",
          "0.020 g g⁻¹ day⁻¹",
        ],
        correctOptionIndex: 0,
      },
    ],
  },
];

async function seedQuestionSet(input: CreatePracticeQuestionSetInput) {
  const existing = await prisma.practiceQuestionSet.findFirst({
    where: {
      categoryId: input.categoryId,
      subcategoryId: input.subcategoryId,
      title: input.title,
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
    console.log(`Updated question set #${updated.id}: ${input.title}`);
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
  console.log(`Created question set #${created.id}: ${input.title}`);
}

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

  for (const stem of stems) {
    await seedQuestionSet(stem);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
