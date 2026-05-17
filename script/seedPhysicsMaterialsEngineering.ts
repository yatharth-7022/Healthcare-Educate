import { Prisma } from "@prisma/client";
import type { CreatePracticeQuestionSetInput } from "@shared/models/practice";
import { prisma } from "../server/db";

const CATEGORY_ID = "physics";
const SUBCATEGORY_ID = "physics-materials-engineering";
const TITLE = "Stability of Wet Granular Piles - Stem 1";

const input: CreatePracticeQuestionSetInput = {
  categoryId: CATEGORY_ID,
  subcategoryId: SUBCATEGORY_ID,
  title: TITLE,
  isPublished: true,
  stem: [
    {
      type: "text",
      value:
        "Everyday experiences, such as building sandcastles, suggest that adding small amounts of liquid can enhance the stability of granular materials. Granular materials such as sand, grains, and powders are common in both natural environments and industrial processes, where their stability can determine whether systems remain intact or fail. These materials can form piles whose stability depends on particle interactions and external constraints. This study investigated how liquid-induced cohesion, particle size, and system size influence the maximum angle of stability of a pile formed from granular particles.",
    },
    {
      type: "text",
      value:
        "Glass spheres (idealised sand grains) partially mixed with a small volume fraction of liquid were placed inside a cylindrical drum that rotated slowly about a horizontal axis. As the drum rotated, the inclination angle of the pile's free surface was measured at the moment just before avalanching occurred, while particle radius, liquid surface tension, and drum width were systematically varied. At sufficiently slow rotation rates, the pile undergoes intermittent avalanches once a maximum surface angle is reached. Liquid bridges between neighbouring particles generate cohesive forces that can oppose gravitational motion. The relevant figures below demonstrate the results of the experiment.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004889/question-bank/image21.png",
      alt: "Maximum angle of stability plotted against drum width W",
      caption: "Figure 1: Maximum angle of stability θₘ plotted against drum width W",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004889/question-bank/image13.png",
      alt: "Maximum angle of stability plotted against particle radius",
      caption: "Figure 2: Maximum angle of stability θₘ plotted against particle radius R",
    },
    {
      type: "text",
      value:
        "Additionally, here are relevant equations that pertain to wet granular pile stability. The capillary force arising from a liquid bridge between two particles is: F_cap = C·γ·R, where F_cap is the capillary force (N), γ is the surface tension of the liquid (N·m⁻¹), R is the particle radius (m), and C is a dimensionless constant related to liquid bridge geometry. The downslope gravitational force acting on material within the pile is: F_grav = M·g·sin(θ − θ_dry), where M is the mass above the slip plane (kg), g is acceleration due to gravity (m·s⁻²), θ is the surface angle (degrees), and θ_dry is the geometric stability angle for dry particles (degrees). Balancing cohesive and gravitational effects yields: θ_max = θ_dry + A·(γ / (ρ·g·R·L)), where θ_max is the maximum angle of stability (degrees), ρ is the particle density (kg·m⁻³), L is the length of the pile surface (m), and A is a dimensionless fitting parameter.",
    },
  ],
  questions: [
    {
      id: "q1",
      prompt:
        "Based on Figure 2, which conclusion is most strongly supported regarding the effect of particle radius on the maximum angle of stability when all other variables are held constant?",
      options: [
        "Smaller particles exhibit higher θₘ because the ratio of capillary force to gravitational force increases as particle radius decreases",
        "Smaller particles exhibit higher θₘ because capillary force increases more rapidly than gravitational force as particle radius decreases",
        "Smaller particles exhibit higher θₘ because both capillary and gravitational forces decrease proportionally with particle radius",
        "Smaller particles exhibit higher θₘ because reduced particle mass suppresses internal shear stresses independently of cohesion",
      ],
      correctOptionIndex: 0,
    },
    {
      id: "q2",
      prompt:
        "Consider two experiments performed using the same liquid, same drum width, and same packing fraction, but with particle radii of R₁ and R₂ = 2R₁. Assuming all parameters except particle radius remain constant, what is the approximate ratio θ_max(R₁) / θ_max(R₂)?",
      options: ["1.1", "1.4", "2.0", "2.8"],
      correctOptionIndex: 0,
    },
    {
      id: "q3",
      prompt:
        "Determine which of the following values is the drum width used in an experiment when the particle radius is [Formula pending] and silicone oil is used as the liquid.",
      options: [
        "[Formula pending]",
        "[Formula pending]",
        "[Formula pending]",
        "[Formula pending]",
      ],
      correctOptionIndex: 0,
    },
    {
      id: "q4",
      prompt:
        "Suppose that during one set of experiments, the drum width was systematically overestimated due to an error in measuring the internal width of the drum. Which of the following changes would this error most likely produce in the experimental data shown in Figure 1?",
      options: [
        "The data points would shift to the right, causing the curve to appear to decay more slowly with increasing W",
        "The data points would shift upward, increasing θₘ at all values of W",
        "The data points would shift to the left, causing the curve to decay more rapidly with increasing W",
        "The data points would collapse onto a horizontal line at large W",
      ],
      correctOptionIndex: 0,
    },
    {
      id: "q5",
      prompt:
        "Based on the trend shown in Figure 1, which of the following values is most consistent with the expected maximum angle of stability if the drum width were increased beyond the range shown to [Formula pending]?",
      options: [
        "[Formula pending]",
        "[Formula pending]",
        "[Formula pending]",
        "[Formula pending]",
      ],
      correctOptionIndex: 0,
    },
    {
      id: "q6",
      prompt:
        "Suppose the same data in Figure 1 were replotted as a transformed graph. Which of the following best describes the expected appearance of the transformed graph?",
      contentBlocks: [
        {
          type: "image",
          url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004891/question-bank/image18.png",
          alt: "Graph option A",
          caption: "Graph A",
        },
        {
          type: "image",
          url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004894/question-bank/image12.png",
          alt: "Graph option B",
          caption: "Graph B",
        },
        {
          type: "image",
          url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004896/question-bank/image25.png",
          alt: "Graph option C",
          caption: "Graph C",
        },
        {
          type: "image",
          url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004898/question-bank/image5.png",
          alt: "Graph option D",
          caption: "Graph D",
        },
      ],
      options: ["Graph A", "Graph B", "Graph C", "Graph D"],
      correctOptionIndex: 0,
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
