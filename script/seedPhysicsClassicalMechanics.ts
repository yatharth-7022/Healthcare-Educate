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
        "This study tested whether the well-known static capstan relationship also describes a cord sliding at constant speed around a fixed cylinder, and how this behaviour depends on cord material, surface treatment, wrap angle, and applied load. A flexible cord was draped over a stationary horizontal cylinder, with masses suspended from each free end producing tensions T₁ and T₂. The wrap angle θ (the angular extent of cord–cylinder contact) was varied by repositioning an auxiliary pulley. For each configuration, mass was added to the heavier side until the cord slid at constant speed, at which point T₁, T₂, and θ were recorded. The experiments were repeated for different cord materials (braided nylon, polyethylene medical tubing) and different cylinder surfaces (bare brass, brass covered with masking tape, paper label).",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004911/question-bank/image1.png",
      alt: "Capstan experimental setup with cord and suspended masses",
      caption: "Figure 1: Experimental setup showing a cord wrapped around a fixed cylinder with suspended masses producing tensions T₁ and T₂",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004912/question-bank/image3.png",
      alt: "Pulley configurations for different wrap angles",
      caption: "Figure 2: Pulley configurations used to produce different wrap angles θ",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004913/question-bank/image19.png",
      alt: "Coefficient of kinetic friction vs wrap angle for nylon cord on different surfaces",
      caption: "Figure 3(a): Coefficient of kinetic friction μₖ plotted against wrap angle θ on (A) paper label, (B) masking tape over brass, (C) bare brass",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004913/question-bank/image9.png",
      alt: "Coefficient of kinetic friction vs total applied tension at 180 degrees",
      caption: "Figure 3(b): Coefficient of kinetic friction μₖ plotted against total applied tension at θ = 180°: (A) nylon cord on masking tape, (B) nylon cord on brass",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004914/question-bank/image6.png",
      alt: "Coefficient of kinetic friction vs wrap angle for polyethylene tubing",
      caption: "Figure 4: Coefficient of kinetic friction μₖ vs wrap angle for polyethylene medical tubing on (A) masking tape over brass, (B) bare brass",
    },
    {
      type: "text",
      value:
        "Relevant equations. Static capstan equation: T₂/T₁ = e^(μₛθ), where T₁ is the lower cord tension (N), T₂ is the higher cord tension (N), μₛ is the coefficient of static friction (dimensionless), and θ is the wrap angle (rad). For kinetic (sliding) friction: T₂/T₁ = e^(μₖθ). Converting degrees to radians: θ_rad = θ_deg × (π/180).",
    },
    {
      type: "text",
      value:
        "Useful exponential values: e^0.1 ≈ 1.11, e^0.2 ≈ 1.22, e^0.3 ≈ 1.35, e^0.4 ≈ 1.49, e^0.5 ≈ 1.65, e^0.6 ≈ 1.82, e^0.7 ≈ 2.01, e^0.8 ≈ 2.23, e^1.0 ≈ 2.72.",
    },
  ],
  questions: [
    {
      id: "q1",
      prompt:
        "In the capstan experiment, a nylon cord is tested on a brass cylinder covered with masking tape. At a wrap angle of 55°, the cord is observed to be slipping at constant speed. In this scenario, what is the closest value of the tension ratio T₂/T₁?",
      options: [
        "[Formula pending]",
        "[Formula pending]",
        "[Formula pending]",
        "[Formula pending]",
      ],
      correctOptionIndex: 0,
    },
    {
      id: "q2",
      prompt:
        "A nylon cord wraps in a half-turn around a bare brass cylinder, with masses suspended from each free end. The cord slides at constant speed, and the combined weight of the two suspended masses is 200 N. What is the closest value of the tension in the lighter mass, T₁?",
      options: ["50 N", "80 N", "100 N", "120 N"],
      correctOptionIndex: 0,
    },
    {
      id: "q3",
      prompt:
        "In the capstan experiment, the maximum tension ratio that can be supported without slipping is modelled by the capstan equation: T₂/T₁ = e^(μₛθ). Suppose for a particular cord–surface combination, a wrap angle θ allows a maximum tension ratio R without slipping. If the wrap angle is doubled (from θ to 2θ) while μₛ remains unchanged, what is the new maximum tension ratio in terms of R?",
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
        "Which statement is best supported by Figure 4?",
      options: [
        "For polyethylene tubing, μₖ decreases as θ increases for both curve A and curve B over the full range shown.",
        "At θ = 90°, polyethylene tubing on bare brass has a lower μₖ than on masking tape over brass.",
        "For wrap angles where both curves are shown, masking tape over brass produces a higher μₖ than bare brass, and μₖ tends to decrease as θ increases.",
        "Above θ = 180°, μₖ becomes independent of θ for both surface conditions.",
      ],
      correctOptionIndex: 0,
    },
    {
      id: "q5",
      prompt:
        "Figure 4 shows how the coefficient of kinetic friction μₖ varies with wrap angle for polyethylene medical tubing. Suppose the sliding cord is modelled using T₂/T₁ = e^(μₖθ) and a single value of μₖ is chosen by averaging the values of μₖ over the range shown in Figure 4. Based on Figure 4, which prediction is most likely when this averaged value of μₖ is used to estimate T₂/T₁ at large wrap angles?",
      options: [
        "The predicted tension ratio will be approximately correct across all θ.",
        "The predicted tension ratio will be overestimated at large θ.",
        "The predicted tension ratio will be underestimated at large θ.",
        "The prediction error will be independent of θ.",
      ],
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
