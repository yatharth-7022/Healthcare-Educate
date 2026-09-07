import { Prisma } from "@prisma/client";
import type { CreatePracticeQuestionSetInput } from "@shared/models/practice";
import { prisma } from "../server/db";

const CATEGORY_ID = "general-chemistry";
const SUBCATEGORY_ID = "general-chemistry-materials-chemistry";
const TITLE = "Glass Transition in Conjugated Polymers - Stem 1";

const input: CreatePracticeQuestionSetInput = {
  categoryId: CATEGORY_ID,
  subcategoryId: SUBCATEGORY_ID,
  title: TITLE,
  isPublished: true,
  stem: [
    {
      type: "text",
      value:
        "In polymer science, the glass transition temperature ($T_g$) is a critical thermal property that marks the transition of a polymer from a hard, glassy state to a soft, rubbery state. $T_g$ is influenced by both the polymer backbone and the flexible alkyl side chains attached to it. A study of conjugated polymers categorized them into two main groups: Group 1 (thiophene-rich) and Group 2 (phenyl-rich). These backbones differ in rigidity, affecting thermal behavior. The study showed that polymers with longer or higher-mass side chains tend to have lower $T_g$, due to a phenomenon called internal plasticization, where the flexible side chains increase segmental mobility.",
    },
    {
      type: "text",
      value:
        "$T_g$ can be identified using rheological techniques, specifically by analyzing the loss modulus ($G''$) curve, where the peak of $G''$ corresponds to the glass transition temperature. In another analysis, $T_g$ was plotted against side chain mass fraction ($w$), with the trend modeled using the Fox equation given below:",
    },
    {
      type: "equation",
      value: "\\frac{1}{T_g} = \\frac{w}{T_{g,\\text{sc}}} + \\frac{1-w}{T_{g,\\text{bb}}}",
      mode: "block",
    },
    {
      type: "text",
      value:
        "Here, $T_{g,sc}$ and $T_{g,bb}$ represent the glass transition temperatures of the side chain and backbone components, respectively. Group 1 polymers had values of $T_{g,sc} = -69$ °C and $T_{g,bb} = 218$ °C, while Group 2 polymers had $T_{g,sc} = -14$ °C and $T_{g,bb} = 287$ °C. These values illustrate the impact of both the chemical structure and the proportion of flexible side chains on thermal properties.",
    },
    {
      type: "text",
      value:
        "Figure 2(a) and (b) represent the rheological curves and Storage ($G'$) and loss ($G''$) moduli for various Group 1 and Group 2 molecules with varying side chain lengths.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1778912465/02_figure_2a_structures_P3DDT_P3OT_P3HT_P3BT_r9nvgm.png",
      alt: "Figure 2a: Rheological curves for Group 1 (thiophene-rich) conjugated polymers",
      caption: "Figure 2a (i)",
    },
    {
      type: "text",
      value:
        "Figure 2a (i): Rheological curves ($G'$ and $G''$ vs. temperature) for Group 1 (thiophene-rich) conjugated polymers with varying side chain lengths.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554160/question-bank/qb_img_1780554159789_8.png",
      alt: "Figure 2a: Rheological curves for Group 2 (phenyl-rich) conjugated polymers",
      caption: "Figure 2a (ii)",
    },
    {
      type: "text",
      value:
        "Figure 2a (ii): Rheological curves ($G'$ and $G''$ vs. temperature) for Group 2 (phenyl-rich) conjugated polymers with varying side chain lengths.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554161/question-bank/qb_img_1780554160601_9.png",
      alt: "Figure 2b: Storage and loss moduli for Group 1 conjugated polymers",
      caption: "Figure 2b (i)",
    },
    {
      type: "text",
      value:
        "Figure 2b (i): Storage modulus $G'$ and loss modulus $G''$ vs. temperature for Group 1 (thiophene-rich) polymers.",
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554163/question-bank/qb_img_1780554161769_10.png",
      alt: "Figure 2b: Storage and loss moduli for Group 2 conjugated polymers",
      caption: "Figure 2b (ii)",
    },
    {
      type: "text",
      value:
        "Figure 2b (ii): Storage modulus $G'$ and loss modulus $G''$ vs. temperature for Group 2 (phenyl-rich) polymers.",
    },
    {
      type: "text",
      value:
        "The following questions are based on figures and calculations related to the graphs, including rheological curves, $T_g$ trends, and the Fox equation.",
    },
    {
      type: "text",
      value: "ADDITIONAL INFORMATION:",
      variant: "additional-info",
      revealAtQuestion: 8,
    },
    {
      type: "text",
      value:
        "Figure 3 depicts the correlation between the side chain mass fraction ($w$) and the glass transition temperature ($T_g$) for conjugated polymers in this work.",
      revealAtQuestion: 8,
    },
    {
      type: "image",
      url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554166/question-bank/qb_img_1780554166207_15.png",
      alt: "Figure 3: Correlation between side chain mass fraction w and glass transition temperature Tg",
      caption: "Figure 3",
      revealAtQuestion: 8,
    },
    {
      type: "text",
      value:
        "Figure 3: Correlation between side chain mass fraction ($w$) and glass transition temperature ($T_g$) for conjugated polymers. Group 1 (thiophene-rich) and Group 2 (phenyl-rich) trendlines are fitted using the Fox equation.",
      revealAtQuestion: 8,
    },
  ],
  questions: [
    {
      id: "q1",
      prompt:
        "Which polymer group generally exhibits a higher glass transition temperature ($T_g$), and why?",
      options: [
        "Group 1, due to their thiophene-rich backbones which are more flexible",
        "Group 2, due to their phenyl-rich backbones which are more rigid",
        "Group 1, because they have longer alkyl side chains",
        "Group 2, because their side chains contain aromatic rings",
      ],
      correctOptionIndex: 1,
      explanation:
        "Group 2 has the higher $T_g$ because phenyl rings are stiffer rotational units than thiophene rings, giving Group 2 backbone greater resistance to segmental motion (Group 1 $T_{g,bb}$ = 218 °C vs Group 2 $T_{g,bb}$ = 287 °C). Option A is backwards — thiophene is less rigid. Option C confuses cause and effect: longer side chains lower $T_g$ via internal plasticization. Option D is wrong because Group 2 side chains are alkyl (C8H17, C6H13), not aromatic.",
      workedSolution: {
        strategy:
          "The stem gives us numbers, structural diagrams, and a direct explanation of the mechanism. We can answer this by starting with the numerical values, confirming with what we see in the physical structures, and closing with the stem's own words.",
        steps: [
          {
            heading: "Step 1 — Read the numbers from the stem",
            body:
              "The stem gives explicit backbone $T_g$ values: Group 1 backbone $T_{g,bb} = 218$ °C; Group 2 backbone $T_{g,bb} = 287$ °C. Group 2's backbone $T_g$ is ~70 °C higher. That directly answers the \"which group\" part of the question — Group 2. Now we need the \"why\".",
          },
          {
            heading: "Step 2 — Look at the physical structures",
            body:
              "Compare the polymer backbones drawn in Figure 2a and the additional structures for Group 2. Group 1 polymers (P3DDT, P3OT, P3HT, P3BT): each repeat unit contains a single thiophene ring with a flexible alkyl side chain attached. Group 2 polymers (PCT6BT, PCDTBT): each repeat unit contains multiple aromatic ring systems — a carbazole unit (three fused rings), a benzothiadiazole ring, and one or two thiophenes — four to five aromatic ring systems per repeat unit. So Group 2 is packed with aromatic rings; Group 1 has just one aromatic ring per repeat unit.",
          },
          {
            heading: "Step 3 — Connect to the stem's own explanation",
            body:
              "The stem tells us directly: \"These backbones differ in rigidity, affecting thermal behavior. The study showed that polymers with longer or higher-mass side chains tend to have lower $T_g$, due to a phenomenon called internal plasticization, where the flexible side chains increase segmental mobility.\" Two things follow: backbone rigidity is what sets the difference in $T_g$ — more aromatic rings → stiffer backbone → less segmental mobility → higher $T_g$; and flexible side chains lower $T_g$ by increasing segmental mobility, working in the opposite direction to backbone rigidity. Applying this: Group 2 has far more aromatic rings (Step 2), which makes it more rigid, which sets its backbone $T_g$ above Group 1's (Step 1) — consistent with the stem's stated mechanism.",
          },
        ],
        eliminations: [
          {
            option: "A and C",
            reason:
              "Both claim Group 1 has the higher $T_g$. The stem's numbers directly disprove this: Group 1 backbone $T_g$ = 218 °C vs Group 2 backbone $T_g$ = 287 °C. Group 2 wins.",
          },
          {
            option: "D",
            reason:
              "(Group 2, because their side chains contain aromatic rings) — Right group, wrong reason. The side chains drawn in the structures — C8H17 and C6H13 — are alkyl (single-bonded carbon chains), not aromatic. The aromatic content in Group 2 is in the backbone, not the side chains. Picking D means missing where the rigidity actually comes from.",
          },
        ],
        answer: "B — Group 2, due to their phenyl-rich backbones which are more rigid.",
      },
    },
    {
      id: "q2",
      prompt:
        "Using the Fox equation and the values for Group 1 polymers ($T_{g,sc} = -69$ °C, $T_{g,bb} = 218$ °C), what is the approximate $T_g$ (in °C) when the side chain mass fraction $w = 0.3$?",
      options: ["$-5$ °C", "$35$ °C", "$72$ °C", "$160$ °C"],
      correctOptionIndex: 2,
      explanation:
        "Convert to Kelvin: $T_{g,sc}$ = 204 K, $T_{g,bb}$ = 491 K. Substituting: $1/T_g = 0.3/204 + 0.7/491 = 0.001471 + 0.001426 = 0.002897$. Then $T_g = 1/0.002897 \\approx 345$ K $= 72$ °C. The critical trap is forgetting to convert to Kelvin first — using °C directly gives a nonsensical result (option A).",
      workedSolution: {
        steps: [
          {
            heading: "Step 1 — Identify what we know and what we need",
            body:
              "The polymer is a Group 1 polymer. From the stem: $T_{g,sc} = -69$ °C, $T_{g,bb} = 218$ °C, $w = 0.30$. We need to find $T_g$. Fox equation from the stem: $1/T_g = w/T_{g,sc} + (1-w)/T_{g,bb}$.",
          },
          {
            heading: "Step 2 — Convert all temperatures to Kelvin",
            body:
              "The Fox equation involves reciprocals of temperatures, so the zero point of the scale matters — Celsius won't work, we need Kelvin. Add 273 to each °C value: $T_{g,sc} = -69 + 273 = 204$ K; $T_{g,bb} = 218 + 273 = 491$ K.",
          },
          {
            heading: "Step 3 — Substitute the Kelvin values and w into the Fox equation",
            body: "$1/T_g = 0.30/204 + 0.70/491$.",
          },
          {
            heading: "Step 4 — Solving without a calculator",
            body:
              "Once the equation is set up, a calculator-free path is much faster than computing each decimal reciprocal separately. Trick 1: multiply top and bottom by 100 to clear the decimals — $0.30/204 = 30/20{,}400$, $0.70/491 = 70/49{,}100$. Trick 2: cancel a factor of 10 in each fraction — $30/20{,}400 = 3/2{,}040$, $70/49{,}100 = 7/4{,}910$. Trick 3: simplify each fraction to $1/\\text{something}$ — for the first term, $3/2{,}040 = 1/680$ (since $2{,}040 = 3 \\times 680$); for the second, round $4{,}910 \\approx 4{,}900$, so $7/4{,}900 = 1/700$. So the equation becomes $1/T_g \\approx 1/680 + 1/700$. Trick 4: approximate both denominators as equal — since 680 and 700 are close, treat both as 700: $1/T_g \\approx 1/700 + 1/700 = 2/700$. Trick 5: invert to get $T_g$ — $T_g \\approx 700/2 = 350$ K. Subtract 273 to convert to °C: $T_g \\approx 350 - 273 = 77$ °C — close enough to option C (72 °C).",
          },
        ],
        answer: "C — 72 °C",
      },
    },
    {
      id: "q3",
      prompt:
        "A phenyl-rich (Group 2) polymer has a measured glass transition temperature of 150 °C. Using the Fox equation, which of the following is the closest estimate for its side chain mass fraction $w$? (Use: $T_{g,sc} = -14$ °C $= 259$ K, $T_{g,bb} = 287$ °C $= 560$ K, $T_g = 150$ °C $= 423$ K)",
      options: ["$0.12$", "$0.28$", "$0.55$", "$0.80$"],
      correctOptionIndex: 1,
      explanation:
        "Rearranging the Fox equation: $1/T_g - 1/T_{g,bb} = w \\times (1/T_{g,sc} - 1/T_{g,bb})$. Computing: $1/423 = 0.002364$, $1/259 = 0.003861$, $1/560 = 0.001786$. So $w = (0.002364 - 0.001786)/(0.003861 - 0.001786) = 0.000578/0.002075 \\approx 0.28$. This can be confirmed on Figure 3 — the Group 2 trendline at $w \\approx 0.28$ sits around 150 °C.",
      workedSolution: {
        steps: [
          {
            heading: "Step 1 — Identify what we know and what we need",
            body:
              "The polymer is phenyl-rich, so it belongs to Group 2. From the stem, Group 2 values are: $T_{g,sc} = -14$ °C, $T_{g,bb} = 287$ °C, $T_g = 150$ °C. We need to find $w$. Fox equation from the stem: $1/T_g = w/T_{g,sc} + (1-w)/T_{g,bb}$.",
          },
          {
            heading: "Step 2 — Convert all three temperatures to Kelvin",
            body:
              "Celsius won't work in the Fox equation — add 273 to each: $T_{g,sc} = -14 + 273 = 259$ K; $T_{g,bb} = 287 + 273 = 560$ K; $T_g = 150 + 273 = 423$ K.",
          },
          {
            heading: "Step 3 — Substitute the Kelvin values into the Fox equation",
            body: "$1/423 = w/259 + (1-w)/560$.",
          },
          {
            heading: "Step 4 — Solving for w without a calculator",
            body:
              "Rather than converting each term to a decimal reciprocal, keep everything as whole-number fractions by finding a common denominator upfront — this avoids awkward 0.00xxx-range decimals entirely. Trick 1: get a common denominator on the right — multiply the first term by $560/560$ and the second by $259/259$: $1/423 = (560w + 259(1-w))/(259 \\times 560)$. Trick 2: cross-multiply to eliminate all denominators — multiply both sides by $259 \\times 560$: $(259 \\times 560)/423 = 560w + 259(1-w)$. Trick 3: expand the bracket — $(259 \\times 560)/423 = 560w + 259 - 259w$. Group the $w$ terms: $(259 \\times 560)/423 = (560-259)w + 259 = 301w + 259$. Approximate $301 \\approx 300$ for easier arithmetic: $(259 \\times 560)/423 \\approx 300w + 259$. Trick 4: approximate the left-hand side with round numbers — round $259 \\approx 260$, $423 \\approx 420$, keep $560$: $(260 \\times 560)/420$. Cancel a factor of 10 from 260 and 420: $(26 \\times 560)/42$. Both 26 and 42 divide by 2: $(13 \\times 560)/21$. Since $21 \\times 26 = 546$ and $21 \\times 27 = 567$, $560/21 \\approx 26.7$, so $13 \\times 26.7 \\approx 347$. Trick 5: substitute back and solve for $w$ — $347 \\approx 300w + 259$, so $347 - 259 \\approx 300w$, giving $88 \\approx 300w$, so $w \\approx 88/300$. Round the numerator: $88/300 \\approx 90/300 = 0.30$; more precisely, $88/300 \\approx 0.29$. Either estimate lands on option B (0.28).",
          },
        ],
        answer: "B — 0.28",
      },
    },
    {
      id: "q4",
      prompt:
        "You are designing a polymer that must remain flexible but not soften below 80 °C. Which of the following design strategies is most appropriate?",
      options: [
        "Use a Group 2 (phenyl-rich) backbone with no side chains",
        "Use a Group 1 (thiophene-rich) backbone with moderate side chain mass fraction",
        "Use a Group 2 backbone with long alkyl side chains",
        "Use a Group 1 backbone with very high side chain mass fraction",
      ],
      correctOptionIndex: 2,
      explanation:
        "Two requirements must be met: flexibility (needs side chains) and $T_g \\geq 80$ °C (needs a stiff backbone). Option A has no side chains so it is not flexible. Option B (Group 1, moderate $w \\approx 0.3$) gives $T_g \\approx 72$ °C — below 80 °C. Option C (Group 2, long side chains, $w \\approx 0.5$) gives $T_g \\approx 354$ K $= 81$ °C — meets both constraints. Option D (Group 1, very high $w$) drives $T_g$ toward $T_{g,sc} = -69$ °C.",
      workedSolution: {
        strategy:
          "The question asks us to design a polymer that meets two constraints: it must remain flexible, and its $T_g$ must be at least 80 °C. We can answer this entirely by reading the $G''$ (dashed) curves in Figures 2a and 2b — the $G''$ peak marks the $T_g$ of each polymer — and applying the two constraints in sequence to eliminate options.",
        steps: [
          {
            heading: "Step 1 — Identify the two constraints",
            body:
              "Constraint 1: flexibility. From the stem, flexibility comes from side chains — longer side chains give more segmental mobility. So we need a polymer with meaningful side-chain content, not bare backbone. Constraint 2: $T_g \\geq 80$ °C. The polymer must not soften below 80 °C, so its glass transition has to occur at or above that temperature.",
          },
          {
            heading: "Step 2 — Read Tg for each candidate group off the G″ peaks (Figures 2a and 2b)",
            body:
              "Group 1 polymers (Figure 2a): all four $G''$ peaks sit below room temperature — P3DDT ≈ −30 °C, P3OT ≈ −20 °C, P3HT ≈ +10 °C, P3BT ≈ +45 °C (highest in the group). Even the best Group 1 polymer (P3BT) has $T_g \\approx 45$ °C — well below 80 °C, so no Group 1 polymer can satisfy constraint 2. Group 2 polymers (Figure 2b): PCT6BT ≈ 75 °C (borderline, just below 80 °C); PCDTBT ≈ 120 °C (comfortably above 80 °C). Only Group 2 has polymers with $T_g$ near or above 80 °C.",
          },
          {
            heading: "Step 3 — Constraint 2 forces us to pick a Group 2 backbone",
            body:
              "Since all Group 1 polymers fail the $T_g \\geq 80$ °C requirement, the correct answer must involve a Group 2 backbone. That immediately eliminates the two options with a Group 1 backbone.",
          },
          {
            heading: "Step 4 — Choose between the two remaining Group 2 options using constraint 1",
            body:
              "The two Group 2 options are: a Group 2 backbone with no side chains, or a Group 2 backbone with long alkyl side chains. Take PCDTBT as a concrete reference point — its $G''$ peak gives $T_g \\approx 120$ °C, comfortably above the 80 °C threshold, so a Group 2 polymer with its existing alkyl side chains already satisfies constraint 2 with headroom to spare. Adding longer or more side chains reduces $T_g$ (internal plasticization) — say from 120 °C down to around 100 °C, still comfortably above 80 °C, but now with significantly more segmental flexibility. Both constraints satisfied. Removing side chains entirely (no side chains) loses the source of segmental mobility, and the polymer becomes rigid rather than flexible — violating constraint 1.",
          },
        ],
        eliminations: [
          {
            option: "Group 2 backbone, no side chains",
            reason: "Right group, wrong side-chain choice. No side chains means no flexibility, which violates constraint 1.",
          },
          {
            option: "Both Group 1 backbone options",
            reason:
              "Reading Figure 2a, even the highest $T_g$ in Group 1 (P3BT at ~45 °C) falls well below the 80 °C requirement. Group 1 fails constraint 2 regardless of side-chain length.",
          },
        ],
        answer: "C — Use a Group 2 backbone with long alkyl side chains",
      },
    },
    {
      id: "q5",
      prompt:
        "Which of the following best describes the trend shown in both Figure 2a and 2b (modulus vs. temperature)?",
      options: [
        "$T_g$ increases as side chain mass fraction increases",
        "$T_g$ decreases as side chain mass fraction increases",
        "$T_g$ is independent of side chain length or structure",
        "$T_g$ increases with increasing molecular weight only",
      ],
      correctOptionIndex: 1,
      explanation:
        "Longer side chain → larger $w$ → lower $T_g$ via internal plasticization. In Figure 2a the $G''$ peak (which marks $T_g$) shifts from ≈+45 °C for P3BT (shortest side chain, C4H9) to ≈−30 °C for P3DDT (longest, C12H25) — a ~75 °C shift. Option A is backwards; option C contradicts the clear trend; option D invents a molecular weight explanation not present in the data.",
      workedSolution: {
        steps: [
          {
            heading: "Step 1 — Read Tg from Figure 2a",
            body:
              "$T_g$ = peak of the $G''$ (loss modulus) dashed curve. Ordering by side-chain length: P3DDT (C12H25, longest) $G''$ peak ≈ −30 °C; P3OT (C8H17) ≈ −20 °C; P3HT (C6H13) ≈ +10 °C; P3BT (C4H9, shortest) ≈ +45 °C. Longer side chain → larger $w$ → lower $T_g$. The stem names the mechanism: internal plasticization — flexible alkyl chains increase segmental mobility.",
          },
        ],
        eliminations: [
          { option: "A", reason: "Is backwards." },
          { option: "C", reason: "Contradicts the clear ~75 °C shift across the series." },
          {
            option: "D",
            reason:
              "Wrong — these polymers were compared at controlled molecular weight; the variable is side-chain mass fraction, not MW.",
          },
        ],
        answer: "B — Tg decreases as side chain mass fraction increases",
      },
    },
    {
      id: "q6",
      prompt:
        "What is the observed effect of increasing the side chain length in regiorandom P3AT polymers on their glass transition temperature ($T_g$)?",
      options: [
        "$T_g$ increases because longer chains restrict movement",
        "$T_g$ decreases because longer side chains increase internal flexibility",
        "$T_g$ stays the same because side chains do not affect backbone properties",
        "$T_g$ decreases because side chains chemically degrade the backbone",
      ],
      correctOptionIndex: 1,
      explanation:
        "The stem states directly that polymers with longer or higher-mass side chains tend to have lower $T_g$ due to internal plasticization — flexible alkyl chains increase segmental mobility, making it easier for the backbone to move. Option A inverts the mechanism; option C contradicts the entire stem and Figure 2 data; option D invents chemical degradation that is not mentioned anywhere.",
      workedSolution: {
        strategy:
          "Same physical principle as the previous question, asked as a mechanism question. The stem states the answer directly: \"polymers with longer or higher-mass side chains tend to have lower $T_g$, due to … internal plasticization, where the flexible side chains increase segmental mobility.\"",
        steps: [],
        eliminations: [
          { option: "A", reason: "Inverts the mechanism." },
          { option: "C", reason: "Contradicts the entire stem." },
          { option: "D", reason: "Invents chemical degradation that is not described anywhere." },
        ],
        answer: "B — Tg decreases because longer side chains increase internal flexibility",
      },
    },
    {
      id: "q7",
      prompt:
        "Which of the following polymers has the highest glass transition temperature based on the $G''$ (loss modulus) peak observed in Figure 2a?",
      options: ["P3HT", "P3OT", "P3DDT", "P3BT"],
      correctOptionIndex: 3,
      explanation:
        "$T_g$ is identified by the peak of the $G''$ (loss modulus) dashed curve in Figure 2a. P3BT has the shortest side chain (C4H9) and therefore the smallest side-chain mass fraction $w$, leading to the least internal plasticization. Its $G''$ peak sits at approximately +45 °C — the highest of the series. P3DDT has the lowest $T_g$ (≈−30 °C) because of its long C12H25 side chain.",
      workedSolution: {
        strategy:
          "$T_g$ corresponds to the peak of the $G''$ (loss modulus) curve — the dashed lines in Figure 2a. Read off the peak temperature for each polymer.",
        steps: [
          {
            heading: "Reading the G″ peaks",
            body:
              "P3DDT $G''$ (purple dashed): peak ≈ −30 °C. P3OT $G''$ (teal dashed): peak ≈ −20 °C. P3HT $G''$ (orange dashed): peak ≈ +10 °C. P3BT $G''$ (yellow dashed): peak ≈ +45 °C ← highest. P3BT has the shortest side chain (C4H9) of the set, so by the trend established in the previous two questions we expect it to have the highest $T_g$ — and it does.",
          },
        ],
        answer: "D — P3BT",
      },
    },
    {
      id: "q8",
      prompt:
        "If the side chain mass fraction of a compound is $0.52$, which compound could it be?",
      options: ["P3HT", "P3OT", "P3DDT", "P3BT"],
      correctOptionIndex: 0,
      explanation:
        "Calculate $w = $ (side chain mass) / (repeat unit mass), using the shared thiophene backbone (C4H2S ≈ 82 g/mol) for all four P3AT polymers. For P3HT (C6H13 side chain, 85 g/mol): $w = 85/167 \\approx 0.51 \\approx 0.52$. P3OT (C8H17, 113 g/mol) gives $w \\approx 0.58$ — too high. P3DDT (C12H25, 169 g/mol) gives $w \\approx 0.67$ — way too high. P3BT (C4H9, 57 g/mol) gives $w \\approx 0.41$ — too low. Only P3HT gives $w \\approx 0.52$.",
      workedSolution: {
        strategy:
          "We need to work out which polymer has $w = 0.52$. To do that, we first need a working definition of $w$ from the stem, then compute $w$ for each of the four candidate polymers using their molecular structures.",
        steps: [
          {
            heading: "Step 0 — Recognise the assumption you need to make",
            body:
              "The stem calls $w$ the \"side chain mass fraction\" but never writes an equation for it. Students need to translate the term into a working definition. By convention, a mass fraction is $w = \\text{mass of the part} / \\text{mass of the whole}$. For a polymer, this means $w = \\text{mass of side chain (per repeat unit)} / \\text{mass of full repeat unit}$. That's the assumption we'll use throughout — a fair GAMSAT-style deduction from the word \"fraction\" plus knowing what \"mass fraction\" means in physical chemistry.",
          },
          {
            heading: "Step 1 — Set up atomic masses",
            body: "Using standard atomic masses: C = 12, H = 1, S = 32.",
          },
          {
            heading: "Step 2 — All four polymers share the same backbone",
            body:
              "All four P3AT polymers (P3HT, P3OT, P3DDT, P3BT) have identical thiophene backbones — they differ only in the length of the alkyl side chain. So we can calculate the backbone mass once and reuse it for all four. Backbone (thiophene ring, C4H2S per repeat unit): $4(12) + 2(1) + 32 = 48 + 2 + 32 = 82$ g/mol.",
          },
          {
            heading: "Step 3 — Compute w for P3HT (C6H13 side chain)",
            body:
              "Side chain mass $= 6(12) + 13(1) = 72 + 13 = 85$ g/mol. Total repeat unit $= 82 + 85 = 167$ g/mol. $w_{P3HT} = 85/167 \\approx 0.51$ — rounds cleanly to 0.52. ✓",
          },
          {
            heading: "Step 4 — Compute w for P3OT (C8H17 side chain)",
            body:
              "Side chain mass $= 8(12) + 17(1) = 96 + 17 = 113$ g/mol. Total repeat unit $= 82 + 113 = 195$ g/mol. $w_{P3OT} = 113/195 \\approx 0.58$ — too high; the C8 side chain is heavier relative to the small thiophene backbone.",
          },
          {
            heading: "Step 5 — Compute w for P3DDT (C12H25 side chain)",
            body:
              "Side chain mass $= 12(12) + 25(1) = 144 + 25 = 169$ g/mol. Total repeat unit $= 82 + 169 = 251$ g/mol. $w_{P3DDT} = 169/251 \\approx 0.67$ — way too high; the long C12 side chain dominates the small thiophene backbone.",
          },
          {
            heading: "Step 6 — Compute w for P3BT (C4H9 side chain)",
            body:
              "Side chain mass $= 4(12) + 9(1) = 48 + 9 = 57$ g/mol. Total repeat unit $= 82 + 57 = 139$ g/mol. $w_{P3BT} = 57/139 \\approx 0.41$ — too low; the short C4 side chain isn't heavy enough relative to the backbone.",
          },
          {
            heading: "Step 7 — Compare all four",
            body:
              "P3HT (C6H13): $w \\approx 0.51$ ✓. P3OT (C8H17): $w \\approx 0.58$ ✗. P3DDT (C12H25): $w \\approx 0.67$ ✗. P3BT (C4H9): $w \\approx 0.41$ ✗. Only P3HT gives $w \\approx 0.52$.",
          },
        ],
        answer: "A — P3HT",
      },
    },
    {
      id: "q9",
      prompt:
        "Below are three parent chains of polymers. Which correctly represents the mathematical relationship for the compounds' respective $T_g$ values?",
      contentBlocks: [
        {
          type: "image",
          url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554167/question-bank/qb_img_1780554167171_16.png",
          alt: "Molecule 1 parent chain structure",
          caption: "Molecule 1",
        },
        {
          type: "image",
          url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554168/question-bank/qb_img_1780554167849_17.png",
          alt: "Molecule 2 parent chain structure",
          caption: "Molecule 2",
        },
        {
          type: "image",
          url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554168/question-bank/qb_img_1780554168456_18.png",
          alt: "Molecule 3 parent chain structure",
          caption: "Molecule 3",
        },
      ],
      options: [
        "$T_{g,A} > T_{g,B} > T_{g,C}$",
        "$T_{g,B} > T_{g,A} > T_{g,C}$",
        "$T_{g,C} > T_{g,A} > T_{g,B}$",
        "$T_{g,A} = T_{g,B} > T_{g,C}$",
      ],
      correctOptionIndex: 1,
      explanation:
        "$T_g$ is governed by backbone rigidity and H-bonding. Molecule C (polyethylene, –CH2–CH2–) is fully aliphatic with no H-bonding: $T_g \\approx -80$ to $-125$ °C. Molecule A (poly(p-phenyleneamine)) has aromatic rings + moderate N–H H-bonding: $T_g \\approx 150$–$180$ °C. Molecule B (poly(bibenzimidazole)) has maximum aromatic content plus strong H-bonding networks: $T_g \\approx 425$ °C — one of the highest among commercial polymers. Therefore $T_{g,B} > T_{g,A} > T_{g,C}$.",
      workedSolution: {
        strategy:
          "Apply the same principle used throughout this stem: backbone rigidity sets $T_g$, and rigidity comes from aromatic rings in the backbone. The more aromatic rings packed into the backbone, the stiffer the polymer, and the higher its $T_g$. Rank the three molecules by counting aromatic rings in their backbones.",
        steps: [
          {
            heading: "Step 1 — Recall the principle from the stem",
            body:
              "The stem tells us: \"These backbones differ in rigidity, affecting thermal behavior.\" We've already seen this play out in the Group 1 vs Group 2 comparison: Group 2 polymers with dense aromatic backbones sit at $T_g \\approx 75$–$120$ °C, while Group 1 polymers with a single thiophene ring per repeat unit sit at $T_g \\approx -30$ to $+45$ °C. The structural difference between the two groups is the number of aromatic rings per repeat unit. So we can rank the three molecules by applying the same reasoning.",
          },
          {
            heading: "Step 2 — Rank the three molecules by aromatic ring content",
            body:
              "Molecule B — backbone packed with multiple aromatic rings (fused ring systems). Structurally similar to Group 2 polymers. Most rings → highest $T_g$. Molecule A — backbone contains a single aromatic ring per repeat unit. Some rigidity, but far less than Molecule B. Intermediate $T_g$. Molecule C — backbone is entirely aliphatic (–CH2–CH2–), no aromatic rings at all. No ring-based rigidity → lowest $T_g$. Ranking: Molecule B > Molecule A > Molecule C.",
          },
        ],
        answer: "B — B > A > C",
      },
    },
    {
      id: "q10",
      prompt:
        "From Figure 3, read the Group 2 (phenyl-rich) trendline at $w = 0.55$. Using this graph-derived $T_g$ value, predict what side-chain mass fraction would be required for a Group 1 (thiophene-rich) polymer to achieve the same $T_g$. (Use Group 1 parameters: $T_{g,sc} = 204$ K, $T_{g,bb} = 491$ K.)",
      options: ["$0.10$", "$0.30$", "$0.50$", "$0.70$"],
      correctOptionIndex: 1,
      explanation:
        "Step 1 — Read Figure 3 at $w = 0.55$ on the Group 2 trendline: $T_g \\approx 75$ °C $= 348$ K. Step 2 — Rearrange Fox for Group 1: $w = (1/T_g - 1/T_{g,bb})/(1/T_{g,sc} - 1/T_{g,bb}) = (0.002874 - 0.002037)/(0.004902 - 0.002037) = 0.000837/0.002865 \\approx 0.29 \\approx 0.30$. The Group 1 polymer needs only $w \\approx 0.30$ to match Group 2 at $w = 0.55$ because Group 1 has a less stiff backbone and side chains have a larger relative effect.",
      workedSolution: {
        strategy:
          "The question gives us a Group 2 polymer at $w = 0.55$ and asks us to find the Group 1 mass fraction that would give the same $T_g$. This is a two-part problem: read $T_g$ off Figure 3 for the Group 2 polymer at $w = 0.55$, then substitute that $T_g$ into the Fox equation with Group 1 parameters and solve algebraically for $w$.",
        steps: [
          {
            heading: "Step 1 — Read Tg from Figure 3",
            body:
              "Locate $w = 0.55$ on the x-axis and trace up to the upper (Group 2) trendline. Reading off the y-axis: $T_g \\approx 75$ °C. Reading tolerance: anywhere between 70 °C and 80 °C is acceptable — all give the same multiple-choice answer.",
          },
          {
            heading: "Step 2 — Convert all temperatures to Kelvin",
            body:
              "The Fox equation only works in Kelvin, so convert every temperature before substituting. From the stem, Group 1 backbone and side-chain values are $T_{g,sc} = -69$ °C, $T_{g,bb} = 218$ °C. Adding 273 to each: $T_{g,sc} = -69 + 273 = 204$ K; $T_{g,bb} = 218 + 273 = 491$ K; $T_g = 75 + 273 = 348$ K.",
          },
          {
            heading: "Step 3 — Set up the Fox equation for Group 1",
            body: "Substitute the Group 1 Kelvin values into the Fox equation: $1/348 = w/204 + (1-w)/491$.",
          },
          {
            heading: "Step 4 — Solving for w without a calculator",
            body:
              "Instead of computing each awkward decimal reciprocal, keep everything as whole-number fractions by cross-multiplying at the start. Trick 1: get a common denominator on the right — multiply the first term by $491/491$ and the second by $204/204$: $1/348 = (491w + 204(1-w))/(204 \\times 491)$. Trick 2: cross-multiply — multiply both sides by $204 \\times 491$: $(204 \\times 491)/348 = 491w + 204(1-w)$. Trick 3: expand the bracket — $(204 \\times 491)/348 = 491w + 204 - 204w$. Group the $w$ terms: $(204 \\times 491)/348 = (491-204)w + 204 = 287w + 204$. Round $287 \\approx 290$ for easier arithmetic: $(204 \\times 491)/348 \\approx 290w + 204$. Trick 4: approximate the left-hand side with round numbers — round $204 \\approx 200$, $491 \\approx 490$, $348 \\approx 350$: $(200 \\times 490)/350$. Cancel a factor of 10 from 200 and 350: $200/350 = 20/35 = 4/7$. So $(200 \\times 490)/350 = 4 \\times 490/7 = 4 \\times 70 = 280$. Trick 5: substitute back and solve for $w$ — $280 \\approx 290w + 204$, so $280 - 204 \\approx 290w$, giving $76 \\approx 290w$, so $w \\approx 76/290$. Round: $76/290 \\approx 75/300 = 1/4 = 0.25$; or slightly more precisely, $76/290 \\approx 0.26$. Answer is closest to option B.",
          },
        ],
        answer: "B — 0.30",
      },
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
