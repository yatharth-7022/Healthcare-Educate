import { Prisma } from "@prisma/client";
import type { CreatePracticeQuestionSetInput } from "@shared/models/practice";
import { prisma } from "../server/db";
import { applyWorkedSolutions } from "./data/applyWorkedSolutions";

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
        "type": "text",
        "value": "When a metal object is held at a fixed voltage, electric charge redistributes across its surface, producing electric forces in the surrounding space. While these effects can be calculated exactly for simple shapes, complex geometries require approximate methods."
      },
      {
        "type": "text",
        "value": "This study examines how electric potential and surface charge distribute on a conducting spherical cap, a metal surface shaped like part of a hollow sphere and held at a constant voltage (shown below)."
      },
      {
        "type": "image",
        "url": "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554179/question-bank/qb_img_1780554179420_31.png",
        "alt": "Diagram of a conducting spherical cap showing cross-section and aperture angle",
        "caption": "Spherical cap geometry"
      },
      {
        "type": "text",
        "value": "The left diagram shows how a spherical cap is formed by cutting a sphere; the aperture angle $\\theta$ determines the size of the opening and hence the shape of the cap. The right diagram illustrates the corresponding three-dimensional hollow metal cap."
      },
      {
        "type": "text",
        "value": "To analyse this system, the cap was treated as a conducting surface connected to a voltage source, with no free charge in the surrounding space. The surface was divided into small angular segments, and the electric potential was determined numerically by enforcing the fixed-voltage condition. By varying the aperture angle, the study explored how electric potential and surface charge depend on position along the cap’s surface."
      },
      {
        "type": "text",
        "value": "The relevant figures below demonstrate the results of the experiment."
      },
      {
        "type": "image",
        "url": "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554180/question-bank/qb_img_1780554180304_32.png",
        "alt": "Figure 1: Surface charge density plotted against angular position along the spherical cap",
        "caption": "Figure 1"
      },
      {
        "type": "text",
        "value": "Figure 1: Surface charge density $\\sigma(\\theta)$ plotted against angular position (radians) along the spherical cap."
      },
      {
        "type": "image",
        "url": "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554181/question-bank/qb_img_1780554181224_33.png",
        "alt": "Table I: Capacitance values compared against aperture angle for numerical and exact solutions",
        "caption": "Table I"
      },
      {
        "type": "text",
        "value": "Table I: Capacitance values compared against aperture angle for numerical $C_{ap}$ and exact $C_{ex}$ solutions."
      },
      {
        "type": "text",
        "value": "Additionally, here are relevant equations that pertain to electrostatic systems involving conductors."
      },
      {
        "type": "text",
        "value": "Electric potential expansion"
      },
      {
        "type": "equation",
        "value": "\\Phi(r,\\theta) = A_0 + A_1 r P_1(\\cos\\theta) + A_2 r^2 P_2(\\cos\\theta)",
        "mode": "block"
      },
      {
        "type": "text",
        "value": "• $\\Phi(r,\\theta)$: electric potential at a point in space (V)\n• $r$: radial distance from the centre of the spherical conductor (m)\n• $\\theta$: angular position around the conductor (rad)\n• $A_0, A_1, A_2$: constants determined by the geometry of the conductor and applied voltage (units chosen so each term is in volts)\n• $P_1(\\cos\\theta), P_2(\\cos\\theta)$: angular functions describing how the potential varies with direction; dimensionless"
      },
      {
        "type": "text",
        "value": "Surface charge density"
      },
      {
        "type": "equation",
        "value": "\\sigma(\\theta) = -\\varepsilon_0 \\frac{\\Delta\\Phi}{\\Delta r}",
        "mode": "block"
      },
      {
        "type": "text",
        "value": "• $\\sigma(\\theta)$: surface charge density on the conductor at angular position $\\theta$ ($\\mathrm{C \\cdot m^{-2}}$)\n• $\\varepsilon_0$: vacuum permittivity, a constant relating electric fields to charge ($\\mathrm{C^2 \\cdot N^{-1} \\cdot m^{-2}}$)\n• $\\Phi$: electric potential (V)\n• $\\Delta\\Phi$: change in electric potential over a small radial distance (V)\n• $\\Delta r$: change in radial distance measured outward from the conductor surface (m)"
      },
      {
        "type": "text",
        "value": "Capacitance"
      },
      {
        "type": "equation",
        "value": "C = \\frac{Q}{V}",
        "mode": "block"
      },
      {
        "type": "text",
        "value": "• $C$: capacitance (F)\n• $Q$: total charge on the conductor (C)\n• $V$: applied voltage (V)"
      }
    ],
  questions: [
    {
      id: "q1",
      prompt:
        "A conducting spherical cap is held at a fixed electrical potential. The cap is connected to a voltage source of $10$ V. For an aperture angle of $\\theta = 1.439$, determine the total charge on the spherical cap.",
      options: [
        "$7.68$ C",
        "$7.88$ C",
        "$8.08$ C",
        "$8.28$ C"
      ],
      correctOptionIndex: 1,
      explanation:
        "Use $Q = CV$: at $\\alpha = 1.439$, Table I gives $C_{\\text{ap}} = 0.788$. Therefore $Q = 0.788 \\times 10 = 7.88$ C. Option A (7.68 C) corresponds to $C \\approx 0.768$, which does not appear in the table for this row. Options C and D use values from different rows of the table.",
      workedSolution: {
        steps: [
          {
            heading: "Step 1 — Identify what we know and what we need",
            body:
              "Known: applied voltage $V_0 = 10$ V; aperture angle $\\alpha = 1.439$. Unknown: capacitance $C$. Target: total charge $Q$. The capacitance equation from the stem links all three quantities: $C = Q/V \\Rightarrow Q = C \\cdot V$. So if we can find $C$, the problem is essentially done — we just multiply by $V$.",
          },
          {
            heading: "Step 2 — Get C from Table I",
            body:
              "Table I gives the capacitance for each aperture angle in two columns: $C_{\\text{ap}}$ — the value from the paper's numerical (approximate) method, and $C_{\\text{ex}}$ — the value from the exact analytical solution. Reading across the row where $\\alpha = 1.439$: $C_{\\text{ap}} = 0.788$, $C_{\\text{ex}} = 0.774$. Since the paper presents the numerical method as its main result (and tests its accuracy against the exact solution), we use $C_{\\text{ap}} = 0.788$ as the value the question is pointing at.",
          },
          {
            heading: "Step 3 — Multiply C by V to get Q",
            body: "$Q = C_{\\text{ap}} \\times V = 0.788 \\times 10 = 7.88$ C.",
          },
        ],
        answer: "B — 7.88 C",
      },
    },
    {
      id: "q2",
      prompt:
        "At a fixed angular position $\\theta$, the electric potential is: $$\\Phi(r) = A_0 + A_1 r + A_2 r^2$$ Measurements show that: at $r = r_1$, the electric potential is $\\Phi = 10$ V; at $r = 2r_1$, the electric potential is $\\Phi = 20$ V. If the constant term $A_0 = 4$ V, what is the value of $\\Phi$ at $r = 3r_1$?",
      options: [
        "28 V",
        "30 V",
        "34 V",
        "40 V"
      ],
      correctOptionIndex: 2,
      explanation:
        "Let $X = A_1 r_1$ and $Y = A_2 r_1^2$. From $V(r_1) = 10$: $4 + X + Y = 10 \\Rightarrow X + Y = 6$. From $V(2r_1) = 20$: $4 + 2X + 4Y = 20 \\Rightarrow X + 2Y = 8$. Subtracting: $Y = 2$, $X = 4$. Then $V(3r_1) = 4 + 3(4) + 9(2) = 4 + 12 + 18 = 34$ V. The critical trap is forgetting the quadratic term scales as $r^2$ — it contributes 18 V at $3r_1$, more than half the answer.",
      workedSolution: {
        strategy:
          "At fixed $\\theta$, drop the angular factors so we work with effective coefficients only: $V(r) = A_0 + A_1 r + A_2 r^2 = 4 + A_1 r + A_2 r^2$. Let $X = A_1 r_1$ and $Y = A_2 r_1^2$ — these substitutions remove explicit $r_1$ from the algebra and make scaling at $2r_1$ and $3r_1$ trivial.",
        steps: [
          {
            heading: "Step 1 — Write the two known equations",
            body:
              "At $r = r_1$, the potential is 10 V: $4 + X + Y = 10 \\Rightarrow X + Y = 6$. At $r = 2r_1$, the potential is 20 V, and each term scales by the appropriate power of 2: $4 + A_1(2r_1) + A_2(2r_1)^2 = 4 + 2X + 4Y = 20 \\Rightarrow 2X + 4Y = 16 \\Rightarrow X + 2Y = 8$.",
          },
          {
            heading: "Step 2 — Solve the simultaneous equations",
            body: "$(X + 2Y) - (X + Y) = 8 - 6 \\Rightarrow Y = 2$. $X = 6 - Y = 4$. So $A_1 r_1 = 4$ V and $A_2 r_1^2 = 2$ V.",
          },
          {
            heading: "Step 3 — Evaluate at r = 3r1",
            body:
              "Each term scales by the appropriate power of 3: $V(3r_1) = 4 + A_1(3r_1) + A_2(3r_1)^2 = 4 + 3X + 9Y = 4 + 3(4) + 9(2) = 4 + 12 + 18 = 34$ V.",
          },
          {
            heading: "Sanity check",
            body:
              "Verify against both given measurements: at $r_1$: $4 + 4 + 2 = 10$ ✓. At $2r_1$: $4 + 8 + 8 = 20$ ✓. Both anchor measurements are satisfied, so $V(3r_1) = 34$ V is consistent with the data.",
          },
        ],
        answer: "C — 34 V",
      },
    },
    {
      id: "q3",
      prompt:
        "At a fixed angular position $\\theta$, the electric potential is given by: $$\\Phi(r) = A_0 + A_1 r + A_2 r^2$$ (Assume $P_1(\\cos\\theta)$ and $P_2(\\cos\\theta)$ are constant at this angle.) Measurements show that at a particular radial distance $r = r_0$: the linear term contributes twice as much to the potential as the constant term, and the quadratic term contributes the same amount as the constant term. If the radial distance is increased from $r_0$ to $2r_0$, what is the factor change in the electric potential $\\Phi$?",
      options: [
        "$\\Phi$ increases by a factor of 2.25",
        "$\\Phi$ increases by a factor of 3",
        "$\\Phi$ increases by a factor of 4",
        "$\\Phi$ increases by a factor of 5"
      ],
      correctOptionIndex: 0,
      explanation:
        "Let $A_0 = K$. Then $A_1 r_0 = 2K$ and $A_2 r_0^2 = K$. So $V(r_0) = K + 2K + K = 4K$. At $2r_0$: constant stays $K$, linear term doubles to $4K$, quadratic term quadruples to $4K$. Thus $V(2r_0) = K + 4K + 4K = 9K$. Factor change $= 9K/4K = 9/4 = 2.25$. When $r$ doubles, each term scales differently: $r^0$ by 1, $r^1$ by 2, $r^2$ by 4 — the overall factor depends on the relative weights.",
      workedSolution: {
        strategy:
          "Express each term as a multiple of $A_0$, then track how each power of $r$ scales when $r$ doubles. The constant stays put, the linear term doubles, and the quadratic term quadruples.",
        steps: [
          {
            heading: "Step 1 — Translate the question into algebra",
            body:
              "Let $A_0 = K$ (the constant term). Linear term contributes twice as much as $A_0$: $A_1 r_0 = 2K$. Quadratic term contributes the same as $A_0$: $A_2 r_0^2 = K$.",
          },
          {
            heading: "Step 2 — Compute V(r0)",
            body: "$V(r_0) = A_0 + A_1 r_0 + A_2 r_0^2 = K + 2K + K = 4K$.",
          },
          {
            heading: "Step 3 — Compute V(2r0)",
            body:
              "Scale each term by the appropriate power of 2: constant $A_0 = K$ (unchanged); linear $A_1(2r_0) = 2 \\times (A_1 r_0) = 2(2K) = 4K$; quadratic $A_2(2r_0)^2 = 4 \\times (A_2 r_0^2) = 4(K) = 4K$. So $V(2r_0) = K + 4K + 4K = 9K$.",
          },
          {
            heading: "Step 4 — Form the ratio",
            body: "$V(2r_0)/V(r_0) = 9K/4K = 9/4 = 2.25$. Exactly matches option A.",
          },
        ],
        answer: "A — V increases by a factor of 2.25",
      },
    },
    {
      id: "q4",
      prompt:
        "At an angular position $\\theta_1$, the magnitude of the surface charge density is twice that at another angular position $\\theta_2$. Assuming the radial distance over which the potential is measured is the same at both angles, which of the following statements is most consistent with the data?",
      options: [
        "The change in electric potential with distance at $\\theta_1$ is twice that at $\\theta_2$",
        "The electric potential at $\\theta_1$ is twice that at $\\theta_2$",
        "The angular variation of electric potential is greater at $\\theta_1$",
        "The electric field is zero at $\\theta_2$"
      ],
      correctOptionIndex: 0,
      explanation:
        "From the stem, $\\sigma(\\theta) = -\\varepsilon_0 \\Delta\\Phi/\\Delta r$. With the same $\\Delta r$ at both angles, $\\sigma \\propto \\Delta\\Phi/\\Delta r$ (the radial gradient). If $|\\sigma(\\theta_1)| = 2|\\sigma(\\theta_2)|$, then $(\\Delta\\Phi/\\Delta r)_{\\theta_1} = 2(\\Delta\\Phi/\\Delta r)_{\\theta_2}$. Option B confuses the VALUE of $\\Phi$ with its radial rate of change. Option C invokes angular variation, but $\\sigma$ depends on the RADIAL derivative only. Option D would mean $\\sigma = 0$ at $\\theta_2$, contradicting the premise.",
      workedSolution: {
        strategy:
          "From the stem, $\\sigma(\\theta) = -\\varepsilon_0 \\Delta V/\\Delta r$. Assuming $\\Delta r$ is the same at both angles, $\\sigma$ is proportional to $\\Delta V/\\Delta r$ — the radial gradient of the potential at that angular position.",
        steps: [
          {
            heading: "Reasoning",
            body:
              "If $\\sigma(\\theta_1) = 2\\sigma(\\theta_2)$, then $(\\Delta V/\\Delta r)_{\\theta_1} = 2(\\Delta V/\\Delta r)_{\\theta_2}$. That is exactly what option A asserts.",
          },
        ],
        eliminations: [
          { option: "B", reason: "Confuses the VALUE of $V$ with the RATE of change of $V$ — $\\sigma$ depends on the gradient, not the absolute potential." },
          { option: "C", reason: "Invokes angular variation, but the surface charge equation contains only the RADIAL derivative — there is no angular variation mentioned in the stem." },
          { option: "D", reason: "Asserts the electric field is zero at $\\theta_2$, which would mean $\\sigma = 0$ there — contradicting \"twice that of a non-zero quantity\"." },
        ],
        answer: "A — The change in electric potential with distance at θ1 is twice that at θ2",
      },
    },
    {
      id: "q5",
      prompt:
        "Based on both Figure 1 and Table I, which of the following explanations is most consistent with the data?",
      options: [
        "Increasing the aperture angle raises the surface charge density on the cap, so at fixed voltage the conductor holds more charge.",
        "Capacitance depends only on the applied voltage; the surface charge density in Figure 1 is a separate quantity and has no bearing on C.",
        "Because $\\sigma$ rises with $\\theta$, Table I would show capacitance decreasing with $\\theta$, since higher charge density means less voltage is needed to store the same charge.",
        "Both figures suggest capacitance is roughly constant across the range of $\\theta$, with only small variations that reflect measurement noise in the numerical method."
      ],
      correctOptionIndex: 0,
      explanation:
        "Figure 1 shows $\\sigma(\\theta)$ spikes sharply near the rim of the aperture. Table I shows $C$ grows monotonically with $\\alpha$. A larger cap has more total surface area plus a longer rim where high $\\sigma$ accumulates — both effects add more stored charge $Q$ for the same applied voltage, raising $C = Q/V$. Option B contradicts Figure 1 (the rim spike shows the electric field is HIGHER near the rim, not lower). Option C is directly contradicted by Table I. Option D contradicts Figure 1 which clearly shows non-uniform $\\sigma$.",
      workedSolution: {
        steps: [
          {
            heading: "Step 1 — What Figure 1 shows (and how to read the aperture angle)",
            body:
              "Figure 1 plots the surface charge density $\\sigma$ against the aperture angle $\\alpha$. The aperture angle is measured from the vertical axis outward to the edge of the cut in the sphere: a small $\\alpha$ means only a tiny piece of the sphere sits above the cut (a shallow bowl); $\\alpha = \\pi/2$ gives exactly a hemisphere; as $\\alpha$ approaches $\\pi$, nearly the entire sphere is present, closing to a complete sphere at $\\alpha = \\pi$. So as $\\alpha$ increases, MORE of the sphere is present, not less — larger $\\alpha$ = bigger conducting cap. Reading Figure 1: for small $\\alpha$ (up to about 1.8 rad), $\\sigma$ is essentially flat around ~10; between $\\alpha \\approx 1.8$ and $2.3$ rad, $\\sigma$ rises gradually to ~12; as $\\alpha$ approaches ~2.5 rad (nearing a fully closed sphere), $\\sigma$ shoots up sharply, reaching over 22. Combined with the geometry: as the cap grows (larger $\\alpha$), more charge sits on each unit of its surface.",
          },
          {
            heading: "Step 2 — What Table I shows",
            body:
              "Table I lists the capacitance $C$ at increasing aperture angles: at $\\alpha = 0.785$ (small cap), $C \\approx 0.50$; at $\\alpha = 1.571$ (hemisphere), $C \\approx 0.83$; at $\\alpha \\approx \\pi$ (nearly full sphere), $C \\approx 1.0$. Capacitance grows monotonically with $\\alpha$ — roughly doubling across the range shown, with no plateaus or reversals.",
          },
          {
            heading: "Step 3 — Tie the two figures together with C = Q/V",
            body:
              "From the stem, $C = Q/V$. Since $V$ is held fixed (the cap is connected to a constant-voltage source), any change in $C$ must come from a change in $Q$, the total charge on the conductor. Tracing the logic: Figure 1 shows $\\sigma$ (charge per unit area) rising as $\\alpha$ grows; geometrically, the cap's surface area also grows as $\\alpha$ grows; combined, more $\\sigma$ over more area means more total $Q$ on the conductor; with $V$ fixed, more $Q$ means higher $C = Q/V$. That matches Table I exactly — Figure 1 shows the charge density rising, Table I shows the resulting capacitance rising. Option A captures this directly.",
          },
        ],
        eliminations: [
          {
            option: "B",
            reason:
              "\"Capacitance depends only on the applied voltage; σ has no bearing on C\" gets the physics backwards. Capacitance is a geometric property of a conductor, set by its shape and size, not by V — in fact $C = Q/V$ is defined precisely so that when V changes, Q scales with it and the ratio C stays the same. Since total charge $Q = \\int \\sigma \\, dA$ (surface charge summed over area) and $C = Q/V$, σ absolutely bears on C.",
          },
          {
            option: "C",
            reason:
              "\"σ rises with α, so capacitance decreases with α, since higher charge density means less voltage is needed\" inverts the direction of the trend. Table I plainly shows C rising with α, not falling — this confuses σ (charge per unit area) with a voltage-to-charge relationship, but since C = Q/V and V is fixed, if Q rises (as higher σ implies), C must rise too.",
          },
          {
            option: "D",
            reason:
              "\"Both figures suggest capacitance is roughly constant, with small variations reflecting numerical noise\" is wrong: Table I runs C from 0.50 to 1.00 (a factor of 2), and Figure 1 shows σ running from ~10 to over 22 (more than doubling) — large, monotonic, systematic changes with clear physical meaning, not measurement scatter. The gap between $C_{\\text{ap}}$ and $C_{\\text{ex}}$ in each row (the numerical method's error) is only about 1–3%, far smaller than the actual signal.",
          },
        ],
        answer:
          "A — As the aperture angle increases, the surface charge density rises (Figure 1); more σ across a growing conducting surface means more total Q, and with V fixed, more Q means higher C = Q/V, exactly the trend shown in Table I.",
      },
    },
  ],
};

async function main() {
  applyWorkedSolutions(input.questions, "physics-electricity");
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
