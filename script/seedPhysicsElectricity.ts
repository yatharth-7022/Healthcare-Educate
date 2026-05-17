import { Prisma } from "@prisma/client";
import type { CreatePracticeQuestionSetInput } from "@shared/models/practice";
import { prisma } from "../server/db";

const CATEGORY_ID = "physics";
const SUBCATEGORY_ID = "physics-electricity-electrostatics-and-electric-circuits";
const TITLE = "Electrostatics of a Conducting Spherical Cap - Stem 1";

const input: CreatePracticeQuestionSetInput = {
  categoryId: CATEGORY_ID,
  subcategoryId: SUBCATEGORY_ID,
  title: TITLE,
  isPublished: true,
  stem: [
    {
      type: "text",
      value:
        "When a metal object is held at a fixed voltage, electric charge redistributes across its surface, producing electric forces in the surrounding space. While these effects can be calculated exactly for simple shapes, complex geometries require approximate methods.",
    },
    {
      type: "text",
      value:
        "This study examines how electric potential and surface charge distribute on a conducting spherical cap — a metal surface shaped like part of a hollow sphere and held at a constant voltage. To analyse this system, the cap was treated as a conducting surface connected to a voltage source, with no free charge in the surrounding space. The surface was divided into small angular segments, and the electric potential was determined numerically by enforcing the fixed-voltage condition. By varying the aperture angle, the study explored how electric potential and surface charge depend on position along the cap's surface.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004905/question-bank/image8.png",
      alt: "Diagram of spherical cap geometry and aperture angle",
      caption: "The left diagram shows how a spherical cap is formed by cutting a sphere; the right diagram illustrates the corresponding three-dimensional hollow metal cap",
    },
    {
      type: "text",
      value:
        "Figure 1: Surface charge density plotted against angular position (radians) along the spherical cap.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004907/question-bank/image2.png",
      alt: "Surface charge density vs angular position along the spherical cap",
      caption: "Figure 1: Surface charge density σ vs angular position θ (radians)",
    },
    {
      type: "text",
      value:
        "Table I: Capacitance values compared against aperture angle for numerical and exact solutions.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004909/question-bank/image14.png",
      alt: "Table I: Capacitance vs aperture angle",
      caption: "Table I: Capacitance values (numerical vs exact) for different aperture angles",
    },
    {
      type: "text",
      value:
        "Additionally, here are relevant equations. Electric potential expansion: V(r,θ) = Σ Aₙ·Pₙ(cosθ)/rⁿ, where V is the electric potential (V), r is the radial distance from the centre (m), θ is the angular position (rad), Aₙ are constants determined by the geometry and applied voltage, and Pₙ are angular functions (dimensionless).",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004909/question-bank/image7.png",
      alt: "Electric potential expansion equation",
      caption: "Electric potential expansion equation",
    },
    {
      type: "text",
      value:
        "Surface charge density: σ(θ) = −ε₀·(∂V/∂r)|_surface, where σ(θ) is the surface charge density at angular position θ, ε₀ is vacuum permittivity (8.85 × 10⁻¹² C²·N⁻¹·m⁻²), V is the electric potential (V), and the derivative is taken outward from the conductor surface. Capacitance: C = Q/V, where C is the capacitance (F), Q is the total charge on the conductor (C), and V is the applied voltage (V).",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1779004910/question-bank/image17.png",
      alt: "Surface charge density equation",
      caption: "Surface charge density equation",
    },
  ],
  questions: [
    {
      id: "q1",
      prompt:
        "A conducting spherical cap is held at a fixed electrical potential. The cap is connected to a voltage source of [Formula pending]. For an aperture angle of [Formula pending], determine the total charge on the spherical cap.",
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
        "At a fixed angular position θ, the electric potential is V(r) = A₀ + A₁/r + A₂/r². Measurements show that at r = r₀ the electric potential is V₀, and at r = 2r₀ the electric potential is 0.6V₀. If the constant term A₀ = 20 V, what is the value of V₀ at r₀?",
      options: ["28 V", "30 V", "34 V", "40 V"],
      correctOptionIndex: 0,
    },
    {
      id: "q3",
      prompt:
        "At a fixed angular position θ, the electric potential is given by V(r) = A₀ + A₁/r + A₂/r². Assume A₀ and A₁ are constant at this angle. Measurements show that at a particular radial distance r: the linear term contributes twice as much to the potential as the constant term, and the quadratic term contributes the same amount as the constant term. If the radial distance is increased from r to 2r, what is the factor change in the electric potential V?",
      options: [
        "doubles",
        "triples",
        "increases by a factor of four",
        "increases by a factor of five",
      ],
      correctOptionIndex: 0,
    },
    {
      id: "q4",
      prompt:
        "At an angular position θ₁, the magnitude of the surface charge density is twice that at another angular position θ₂. Assuming the radial distance over which the potential is measured is the same at both angles, which of the following statements is most consistent with the data?",
      options: [
        "The change in electric potential with distance at θ₁ is twice that at θ₂",
        "The electric potential at θ₁ is twice that at θ₂",
        "The angular variation of electric potential is greater at θ₁",
        "The electric field is zero at θ₂",
      ],
      correctOptionIndex: 0,
    },
    {
      id: "q5",
      prompt:
        "Based on both Figure 1 and Table I, which of the following explanations is most consistent with the data?",
      options: [
        "Increasing the aperture angle concentrates charge near the rim, increasing the total stored charge and hence the capacitance",
        "Increasing the aperture angle reduces the electric field near the rim, lowering the surface charge density",
        "The capacitance depends only on the applied voltage and is independent of the charge distribution",
        "The increase in capacitance with aperture angle occurs despite a uniform surface charge density",
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
