import { Prisma } from "@prisma/client";
import type { CreatePracticeQuestionSetInput } from "@shared/models/practice";
import { prisma } from "../server/db";

const CATEGORY_ID = "physics";
const SUBCATEGORY_ID = "physics-classical-mechanics";
const TITLE = "Capstan Friction and Cord Tension - Stem 1";

const input: CreatePracticeQuestionSetInput = {
  categoryId: CATEGORY_ID,
  subcategoryId: SUBCATEGORY_ID,
  title: TITLE,
  isPublished: true,
  stem: [
    {
      type: "text",
      value:
        "Friction between flexible cords and curved surfaces underpins how anchors are held by mooring lines, how belt drives transmit power, and how braking systems convert motion into heat. The capstan effect — where a small applied tension can resist a much larger opposing load thanks to friction built up over a wrapped contact arc — is a long-established principle, but its quantitative behaviour for sliding (kinetic) friction had been less thoroughly characterised than the static case.",
    },
    {
      type: "text",
      value:
        "This study tested whether the well-known static capstan relationship also describes a cord sliding at constant speed around a fixed cylinder, and how this behaviour depends on cord material, surface treatment, wrap angle $\\theta$, and applied load.",
    },
    {
      type: "text",
      value:
        "A flexible cord was draped over a stationary horizontal cylinder, with masses suspended from each free end producing tensions $T_1$ and $T_2$. The wrap angle $\\theta$ (the angular extent of cord–cylinder contact) was varied by repositioning an auxiliary pulley. For each configuration, mass was added to the heavier side until the cord slid at constant speed, at which point $T_1$, $T_2$, and $\\theta$ were recorded. The experiments were repeated for different cord materials (braided nylon, polyethylene medical tubing) and different cylinder surfaces (bare brass, brass covered with masking tape, paper label).",
    },
    {
      type: "text",
      value: "The relevant figures below demonstrate the results of the experiment.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554183/question-bank/qb_img_1780554183622_36.png",
      alt: "Figure 1: Experimental setup showing a cord wrapped around a fixed cylinder with suspended masses producing tensions T1 and T2",
      caption: "Figure 1",
    },
    {
      type: "text",
      value:
        "Figure 1: Experimental setup showing a cord wrapped around a fixed cylinder with suspended masses producing tensions $T_1$ and $T_2$.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554184/question-bank/qb_img_1780554184330_37.png",
      alt: "Figure 2: Pulley configurations used to produce different wrap angles",
      caption: "Figure 2",
    },
    {
      type: "text",
      value: "Figure 2: Pulley configurations used to produce different wrap angles.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554185/question-bank/qb_img_1780554185272_38.png",
      alt: "Figure 3a: Coefficient of kinetic friction μk vs wrap angle θ on different surfaces",
      caption: "Figure 3(a)",
    },
    {
      type: "text",
      value:
        "Figure 3(a): Coefficient of kinetic friction $\\mu_k$ plotted against wrap angle $\\theta$ on (A) paper label of \"Liquid Paper\" container; (B) masking tape over brass cylinder; (C) bare brass cylinder.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554186/question-bank/qb_img_1780554186538_39.png",
      alt: "Figure 3b: Coefficient of kinetic friction vs total applied tension at 180 degrees",
      caption: "Figure 3(b)",
    },
    {
      type: "text",
      value:
        "Figure 3(b): Coefficient of kinetic friction $\\mu_k$ plotted against total applied tension $T_1 + T_2$ at $\\theta = 180°$: (A) nylon cord on brass covered with masking tape; (B) nylon cord on brass.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554187/question-bank/qb_img_1780554187248_40.png",
      alt: "Figure 4: Coefficient of kinetic friction μk vs wrap angle for polyethylene medical tubing",
      caption: "Figure 4",
    },
    {
      type: "text",
      value:
        "Figure 4: Coefficient of kinetic friction $\\mu_k$ plotted against wrap angle $\\theta$ for polyethylene medical tubing on: (A) masking tape over brass cylinder; (B) bare brass cylinder.",
    },
    {
      type: "text",
      value:
        "The capstan equation for kinetic (sliding) friction is: $T_2 / T_1 = e^{\\mu_k \\theta}$, where $T_2 > T_1$ are the cord tensions, $\\mu_k$ is the coefficient of kinetic friction, and $\\theta$ is the wrap angle in radians.",
    },
    {
      type: "text",
      value:
        "The static capstan equation is: $T_2 / T_1 = e^{\\mu_s \\theta}$. Converting degrees to radians: $\\theta_{\\text{rad}} = \\theta_{\\text{deg}} \\times \\pi / 180$.",
    },
    {
      type: "text",
      value:
        "Useful exponential values: $e^{0.1} = 1.11$, $e^{0.2} = 1.22$, $e^{0.3} = 1.35$, $e^{0.4} = 1.49$, $e^{0.5} = 1.65$, $e^{0.6} = 1.82$, $e^{0.7} = 2.01$, $e^{0.8} = 2.23$, $e^{1.0} = 2.72$.",
    },
  ],
  questions: [
    {
      id: "q1",
      prompt:
        "In the capstan experiment, a nylon cord is tested on a brass cylinder covered with masking tape. At a wrap angle of 55°, the cord is observed to be slipping at constant speed. What is the closest value of the tension ratio $T_2/T_1$? (Use Figure 3a and the capstan equation.)",
      options: [
        "$e^{0.10}$",
        "$e^{0.25}$",
        "$e^{0.50}$",
        "$e^{0.75}$",
      ],
      correctOptionIndex: 1,
    },
    {
      id: "q2",
      prompt:
        "A nylon cord wraps in a half-turn ($\\theta = \\pi$ rad) around a bare brass cylinder, with masses suspended from each free end. The cord slides at constant speed, and the combined weight of the two suspended masses is 200 N. What is the closest value of the tension in the lighter side, $T_1$?",
      options: ["$50$ N", "$80$ N", "$100$ N", "$120$ N"],
      correctOptionIndex: 0,
    },
    {
      id: "q3",
      prompt:
        "The maximum tension ratio without slipping is modelled by the static capstan equation $T_2/T_1 = e^{\\mu_s \\theta}$. Suppose for a particular cord–surface combination, a wrap angle $\\theta_0$ allows a maximum tension ratio $R$ without slipping. If the wrap angle is doubled (from $\\theta_0$ to $2\\theta_0$) while $\\mu_s$ remains unchanged, what is the new maximum tension ratio in terms of $R$?",
      options: [
        "$R^2$",
        "$2R$",
        "$\\sqrt{R}$",
        "$R + 1$",
      ],
      correctOptionIndex: 0,
    },
    {
      id: "q4",
      prompt:
        "Which statement is best supported by Figure 4?",
      options: [
        "For polyethylene tubing, $\\mu_k$ decreases as $\\theta$ increases for both curve A and curve B over the full range shown.",
        "At $\\theta = \\pi$, polyethylene tubing on bare brass has a lower $\\mu_k$ than on masking tape over brass.",
        "For wrap angles where both curves are shown, masking tape over brass produces a higher $\\mu_k$ than bare brass, and $\\mu_k$ tends to decrease as $\\theta$ increases.",
        "Above $\\theta = 3\\pi$, $\\mu_k$ becomes independent of $\\theta$ for both surface conditions.",
      ],
      correctOptionIndex: 0,
    },
    {
      id: "q5",
      prompt:
        "Figure 4 shows how $\\mu_k$ varies with wrap angle $\\theta$ for polyethylene medical tubing. Suppose the sliding cord is modelled using $T_2/T_1 = e^{\\bar{\\mu}_k \\theta}$ and a single averaged value $\\bar{\\mu}_k$ is chosen by averaging $\\mu_k$ over the range $\\theta_\\text{min}$ to $\\theta_\\text{max}$. Based on Figure 4, which prediction is most likely when this averaged $\\bar{\\mu}_k$ is used to estimate $T_2/T_1$ at large wrap angles?",
      options: [
        "The predicted tension ratio will be approximately correct across all $\\theta$.",
        "The predicted tension ratio will be overestimated at large $\\theta$.",
        "The predicted tension ratio will be underestimated at large $\\theta$.",
        "The prediction error will be independent of $\\theta$.",
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
