import { Prisma } from "@prisma/client";
import type { CreatePracticeQuestionSetInput } from "@shared/models/practice";
import { prisma } from "../server/db";

const CATEGORY_ID = "physics";
const SUBCATEGORY_ID = "physics-materials-engineering";
const TITLE = "Maximum Angle of Stability of a Wet Granular Pile - Stem 1";

const input: CreatePracticeQuestionSetInput = {
  categoryId: CATEGORY_ID,
  subcategoryId: SUBCATEGORY_ID,
  title: TITLE,
  isPublished: true,
  stem: [
    {
      type: "text",
      value:
        "Everyday experiences, such as building sandcastles, suggest that adding small amounts of liquid can enhance the stability of granular materials. Granular materials such as sand, grains, and powders are common in both natural environments and industrial processes, where their stability can determine whether systems remain intact or fail. These materials can form piles whose stability depends on particle interactions and external constraints. This study investigated how liquid-induced cohesion, particle size, and system size influence the maximum angle of stability ($\\theta_m$) of a pile formed from granular particles.",
    },
    {
      type: "text",
      value:
        "Glass spheres (idealised sand grains) partially mixed with a small volume fraction of liquid were placed inside a cylindrical drum that rotated slowly about a horizontal axis. As the drum rotated, the inclination angle of the pile's free surface was measured at the moment just before avalanching occurred, while particle radius ($r$), liquid surface tension ($\\gamma$), and drum width ($W$) were systematically varied.",
    },
    {
      type: "text",
      value:
        "At sufficiently slow rotation rates, the pile undergoes intermittent avalanches once a maximum surface angle is reached. Liquid bridges between neighbouring particles generate cohesive forces that can oppose gravitational motion. The relevant figures below demonstrate the results of the experiment:",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554175/question-bank/qb_img_1780554174677_25.jpg",
      alt: "Figure 1: Maximum angle of stability θₘ plotted against particle radius r (mm)",
      caption: "Figure 1",
    },
    {
      type: "text",
      value:
        "Figure 1: Maximum angle of stability $\\theta_m$ plotted against particle radius $r$ (mm) for glass spheres partially wetted with liquid.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554175/question-bank/qb_img_1780554175418_26.jpg",
      alt: "Figure 2: Maximum angle of stability θₘ plotted against drum width W",
      caption: "Figure 2",
    },
    {
      type: "text",
      value:
        "Figure 2: Maximum angle of stability $\\theta_m$ plotted against drum width $W$ for fixed particle radius and liquid surface tension.",
    },
    {
      type: "text",
      value:
        "Additionally, here are relevant equations that pertain to wet granular pile stability.",
    },
    {
      type: "text",
      value:
        "The capillary force arising from a liquid bridge between two particles: $F_\\text{cap} = c \\gamma r$, where $\\gamma$ is the liquid surface tension, $r$ is the particle radius, and $c$ is a dimensionless constant related to liquid bridge geometry.",
    },
    {
      type: "text",
      value:
        "The downslope gravitational force: $F_\\text{grav} \\propto m g \\sin(\\theta - \\theta_0)$, where $m$ is the mass of material above the slip plane, $g$ is gravitational acceleration, $\\theta$ is the surface angle, and $\\theta_0$ is the geometric stability angle for dry particles.",
    },
    {
      type: "text",
      value:
        "Balancing cohesive and gravitational effects yields: $\\tan\\theta_m = \\tan\\theta_0 + \\frac{A \\gamma}{\\phi \\rho g r^2 L}$, where $\\phi$ is the packing fraction, $\\rho$ is the particle density, $L$ is the length of the pile surface, and $A$ is a dimensionless fitting parameter.",
    },
  ],
  questions: [
    {
      id: "q1",
      prompt:
        "Based on Figure 1, which conclusion is most strongly supported regarding the effect of particle radius on the maximum angle of stability $\\theta_m$ when all other variables are held constant?",
      options: [
        "Smaller particles exhibit higher $\\theta_m$ because the ratio of capillary force to gravitational force increases as particle radius decreases.",
        "Smaller particles exhibit higher $\\theta_m$ because capillary force increases more rapidly than gravitational force as particle radius decreases.",
        "Smaller particles exhibit higher $\\theta_m$ because both capillary and gravitational forces decrease proportionally with particle radius.",
        "Smaller particles exhibit higher $\\theta_m$ because reduced particle mass suppresses internal shear stresses independently of cohesion.",
      ],
      correctOptionIndex: 0,
    },
    {
      id: "q2",
      prompt:
        "Consider two experiments performed using the same liquid, same drum width $W$, and same packing fraction $\\phi$, but with particle radii $r_1$ and $r_2$ ($r_1 < r_2$). Assuming all parameters except particle radius remain constant, what is the approximate ratio $\\theta_m(r_1)/\\theta_m(r_2)$?",
      options: ["$1.1$", "$1.4$", "$2.0$", "$2.8$"],
      correctOptionIndex: 0,
    },
    {
      id: "q3",
      prompt:
        "Determine which of the following values is the drum width $W$ used in an experiment when the particle radius is given and silicone oil is used as the liquid. (Use the scaling relation and data from Figure 2.)",
      options: [
        "$W \\approx 3$ cm",
        "$W \\approx 5$ cm",
        "$W \\approx 8$ cm",
        "$W \\approx 12$ cm",
      ],
      correctOptionIndex: 0,
    },
    {
      id: "q4",
      prompt:
        "Suppose that during one set of experiments, the drum width $W$ was systematically overestimated due to an error in measuring the internal width of the drum. Which of the following changes would this error most likely produce in the experimental data shown in Figure 2?",
      options: [
        "The data points would shift to the right, causing the curve to appear to decay more slowly with increasing $W$.",
        "The data points would shift upward, increasing $\\theta_m$ at all values of $W$.",
        "The data points would shift to the left, causing the curve to decay more rapidly with increasing $W$.",
        "The data points would collapse onto a horizontal line at large $W$.",
      ],
      correctOptionIndex: 0,
    },
    {
      id: "q5",
      prompt:
        "Based on the trend shown in Figure 2, which of the following values is most consistent with the expected maximum angle of stability if the drum width $W$ were increased beyond the range shown?",
      options: [
        "$\\theta_m \\approx 20°$",
        "$\\theta_m \\approx 25°$",
        "$\\theta_m \\approx 30°$",
        "$\\theta_m \\approx 38°$",
      ],
      correctOptionIndex: 0,
    },
    {
      id: "q6",
      prompt:
        "Suppose the same data in Figure 2 were replotted as a graph of $(\\theta_m - \\theta_{m\\infty})$ vs. $1/W$, where $\\theta_{m\\infty}$ is the asymptotic value of $\\theta_m$ at large $W$. Which of the following best describes the expected appearance of the transformed graph?",
      contentBlocks: [
        {
          type: "image",
          url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554176/question-bank/qb_img_1780554176177_27.png",
          alt: "Option A: transformed graph shape",
          caption: "Option A",
        },
        {
          type: "image",
          url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554177/question-bank/qb_img_1780554177167_28.png",
          alt: "Option B: transformed graph shape",
          caption: "Option B",
        },
        {
          type: "image",
          url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554178/question-bank/qb_img_1780554178044_29.png",
          alt: "Option C: transformed graph shape",
          caption: "Option C",
        },
        {
          type: "image",
          url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554179/question-bank/qb_img_1780554178723_30.png",
          alt: "Option D: transformed graph shape",
          caption: "Option D",
        },
      ],
      options: [
        "Option A (see graph above)",
        "Option B (see graph above)",
        "Option C (see graph above)",
        "Option D (see graph above)",
      ],
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
