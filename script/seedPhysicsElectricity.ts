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
        "This study examines how electric potential $V$ and surface charge density $\\sigma$ distribute on a conducting spherical cap — a metal surface shaped like part of a hollow sphere held at a constant voltage.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554179/question-bank/qb_img_1780554179420_31.png",
      alt: "Diagram of a conducting spherical cap showing cross-section and aperture angle",
      caption: "Spherical cap geometry",
    },
    {
      type: "text",
      value:
        "The left diagram shows how a spherical cap is formed by cutting a sphere; the aperture angle $\\alpha$ determines the size of the opening and hence the shape of the cap. The right diagram illustrates the corresponding three-dimensional hollow metal cap.",
    },
    {
      type: "text",
      value:
        "To analyse this system, the cap was treated as a conducting surface connected to a voltage source, with no free charge in the surrounding space. The surface was divided into small angular segments, and the electric potential was determined numerically by enforcing the fixed-voltage condition. By varying the aperture angle $\\alpha$, the study explored how $V$ and $\\sigma$ depend on position along the cap's surface.",
    },
    {
      type: "text",
      value: "The relevant figures below demonstrate the results of the experiment.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554180/question-bank/qb_img_1780554180304_32.png",
      alt: "Figure 1: Surface charge density plotted against angular position along the spherical cap",
      caption: "Figure 1",
    },
    {
      type: "text",
      value:
        "Figure 1: Surface charge density $\\sigma(\\theta)$ plotted against angular position (radians) along the spherical cap.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554181/question-bank/qb_img_1780554181224_33.png",
      alt: "Table I: Capacitance values compared against aperture angle for numerical and exact solutions",
      caption: "Table I",
    },
    {
      type: "text",
      value:
        "Table I: Capacitance $C$ (F) compared against aperture angle $\\alpha$ for numerical and exact analytical solutions.",
    },
    {
      type: "text",
      value:
        "Additionally, here are relevant equations. Electric potential expansion: $V(r,\\theta) = \\sum_n A_n r^n P_n(\\cos\\theta)$, where $r$ is radial distance (m), $\\theta$ is angular position (rad), $A_n$ are constants determined by geometry and applied voltage, and $P_n$ are Legendre polynomials.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554182/question-bank/qb_img_1780554181992_34.png",
      alt: "Electric potential expansion equation",
      caption: "Electric potential expansion",
    },
    {
      type: "text",
      value:
        "Surface charge density: $\\sigma(\\theta) = -\\varepsilon_0 \\left.\\frac{\\partial V}{\\partial r}\\right|_{\\text{surface}}$, where $\\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{F m}^{-1}$ is the vacuum permittivity and $\\partial V / \\partial r$ is the radial gradient of potential at the surface.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554183/question-bank/qb_img_1780554182719_35.png",
      alt: "Surface charge density equation",
      caption: "Surface charge density",
    },
    {
      type: "text",
      value:
        "Capacitance: $C = Q/V$, where $Q$ is the total charge on the conductor (C) and $V$ is the applied voltage (V).",
    },
  ],
  questions: [
    {
      id: "q1",
      prompt:
        "A conducting spherical cap is held at a fixed electrical potential $V_0$. The cap is connected to a voltage source of $V_0$. For a given aperture angle $\\alpha$, determine the total charge $Q$ on the spherical cap.",
      options: [
        "$7.68\\ C$",
        "$7.88\\ C$",
        "$8.08\\ C$",
        "$8.28\\ C$",
      ],
      correctOptionIndex: 0,
    },
    {
      id: "q2",
      prompt:
        "At a fixed angular position $\\theta$, the electric potential is $V(r) = A_0 + A_1 r + A_2 r^2$. Measurements show that at $r = r_0$, $V = 20$ V and at $r = 2r_0$, $V = 50$ V. If the constant term $A_0 = 10$ V, what is the value of $V$ at $r = 3r_0$?",
      options: ["$28$ V", "$30$ V", "$34$ V", "$40$ V"],
      correctOptionIndex: 0,
    },
    {
      id: "q3",
      prompt:
        "At a fixed angular position $\\theta$, the electric potential is $V(r) = A_0 + A_1 r + A_2 r^2$ ($A_0$, $A_1$, $A_2$ constant at this angle). Measurements at a particular radial distance $r_0$ show that the linear term $A_1 r_0$ contributes twice as much as the constant term $A_0$, and the quadratic term $A_2 r_0^2$ contributes the same amount as the constant term $A_0$. If the radial distance is increased from $r_0$ to $2r_0$, what is the factor change in $V$?",
      options: [
        "$V$ increases by a factor of $2.25$",
        "$V$ increases by a factor of $3$",
        "$V$ increases by a factor of $4$",
        "$V$ increases by a factor of $5$",
      ],
      correctOptionIndex: 0,
    },
    {
      id: "q4",
      prompt:
        "At an angular position $\\theta_1$, the magnitude of the surface charge density $|\\sigma(\\theta_1)|$ is twice that at another angular position $\\theta_2$. Assuming the radial distance over which the potential is measured is the same at both angles, which of the following statements is most consistent with the data?",
      options: [
        "The change in electric potential with distance at $\\theta_1$ is twice that at $\\theta_2$.",
        "The electric potential at $\\theta_1$ is twice that at $\\theta_2$.",
        "The angular variation of electric potential is greater at $\\theta_1$.",
        "The electric field is zero at $\\theta_2$.",
      ],
      correctOptionIndex: 0,
    },
    {
      id: "q5",
      prompt:
        "Based on both Figure 1 and Table I, which of the following explanations is most consistent with the data?",
      options: [
        "Increasing the aperture angle $\\alpha$ concentrates charge near the rim, increasing the total stored charge $Q$ and hence the capacitance $C$.",
        "Increasing $\\alpha$ reduces the electric field near the rim, lowering the surface charge density $\\sigma$.",
        "The capacitance $C$ depends only on the applied voltage $V_0$ and is independent of the charge distribution.",
        "The increase in $C$ with $\\alpha$ occurs despite a uniform surface charge density $\\sigma$.",
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
