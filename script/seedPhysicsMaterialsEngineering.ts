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
      explanation:
        "Capillary force $F_c \\propto r^1$ and gravitational force $F_g \\propto r^3$. The ratio $F_c/F_g \\propto r/r^3 = 1/r^2$. As $r$ decreases, cohesion becomes relatively more dominant, allowing the pile to sit at a steeper angle. Option B states capillary force increases FASTER as r decreases — wrong in absolute terms; both decrease, but gravity decreases faster (key distinction). Option C claims proportional scaling — wrong, r vs r³ are not proportional. Option D invokes shear stresses with no connection to the cohesion model.",
    },
    {
      id: "q2",
      prompt:
        "Consider two experiments performed using the same liquid, same drum width $W$, and same packing fraction $\\phi$, but with particle radii $r_1$ and $r_2$ ($r_1 < r_2$). Assuming all parameters except particle radius remain constant, what is the approximate ratio $\\theta_m(r_1)/\\theta_m(r_2)$?",
      options: ["$1.1$", "$1.4$", "$2.0$", "$2.8$"],
      correctOptionIndex: 1,
      explanation:
        "With all variables fixed except $r$, the stability equation gives $\\theta_m - \\theta_e \\propto 1/\\sqrt{r}$. For $r_1 = 0.5$ mm and $r_2 = 1.0$ mm: ratio $= \\sqrt{r_2/r_1} = \\sqrt{1.0/0.5} = \\sqrt{2} \\approx 1.41 \\approx 1.4$. A common error is forgetting the square root and using $r_2/r_1 = 2$ directly (option C), or using the wrong ratio direction giving 0.7.",
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
      explanation:
        "Reading Figure 2 at $r = 0.5$ mm for silicone oil gives $\\theta_m \\approx 38°$. Cross-referencing with Figure 1 (or the $\\theta_m$ vs $W$ exponential fit), a value of $\\theta_m \\approx 38°$ corresponds to $W \\approx 3$ cm — the steep part of the decay curve. At $W \\approx 5$ cm, $\\theta_m \\approx 35$–36°. At $W \\approx 8$ cm, $\\theta_m \\approx 31$–32°. At $W \\approx 12$ cm, $\\theta_m \\approx 30°$ (near the asymptote).",
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
      explanation:
        "If $W$ is systematically overestimated, each data point is plotted at an x-coordinate larger than its true value. The y-coordinate ($\\theta_m$) is unaffected. Every point shifts horizontally to the right. The data still trace out a decay, but now a given $\\Delta\\theta_m$ spans a larger apparent $\\Delta W$ — the curve looks like it decays more slowly. Option B would require a y-axis error. Option C is the wrong direction (that would be underestimation of $W$). Option D requires a different kind of systematic error.",
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
      correctOptionIndex: 2,
      explanation:
        "The fit form in Figure 2 is $\\theta_m = a_0 \\exp(-b_0 W) + c_0$. This decays exponentially toward a plateau value $c_0 \\approx 30°$. By $W \\approx 13$–15 cm, $\\theta_m$ is already essentially at the asymptote. Increasing $W$ beyond the range shown produces little further change — $\\theta_m$ stays at approximately 30°. Option A (20°) and B (25°) would require $\\theta_m$ to keep dropping past the plateau. Option D (38°) corresponds to small $W$ values, not large ones.",
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
      explanation:
        "The fit is $\\theta_m = a_0 \\exp(-b_0 W) + c_0$. Subtracting $c_0$: $\\theta_m - c_0 = a_0 \\exp(-b_0 W)$. Taking $\\ln$: $\\ln(\\theta_m - c_0) = \\ln(a_0) - b_0 W$ — a straight line with negative slope. When replotted against $1/W$ instead, the result is still a straight line with positive slope (since $1/W$ decreases as $W$ increases). Option A correctly shows a straight-line relationship. Option B (positive correlation) corresponds to an increasing function. Option C (horizontal) would require $\\theta_m - c_0$ to be constant. Option D (curve with plateau) is what you get if you plot $\\ln(\\theta_m)$ WITHOUT subtracting $c_0$.",
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
