import { Prisma } from "@prisma/client";
import type { CreatePracticeQuestionSetInput } from "@shared/models/practice";
import { prisma } from "../server/db";

const CATEGORY_ID = "biology";
const SUBCATEGORY_ID = "biology-homeostasis-and-endocrinology";

const stems: CreatePracticeQuestionSetInput[] = [
  // ── Stem 1: PPARα ────────────────────────────────────────────────────────
  {
    categoryId: CATEGORY_ID,
    subcategoryId: SUBCATEGORY_ID,
    title: "Cardiac PPARα Knockout and Lipid Accumulation - Stem 1",
    isPublished: true,
    stem: [
      {
        type: "text",
        value:
          "During fasting, adipose tissue releases free fatty acids (FFAs) into the circulation. These may be oxidised for energy or stored as triglycerides (TG) within lipid droplets in the heart. The transcription factor peroxisome proliferator-activated receptor-alpha ($\\text{PPAR}\\alpha$) regulates cardiac fatty acid metabolism.",
      },
      {
        type: "text",
        value:
          "Plin2 is a lipid droplet–associated protein that coats lipid droplets and stabilises triglyceride storage. Changes in Plin2 expression are thought to influence how the heart stores fatty acids as TG.",
      },
      {
        type: "text",
        value:
          "Researchers compared Control and cardiac-specific $\\text{PPAR}\\alpha$ knockout ($\\text{cPPAR}\\alpha^{-/-}$) mice. They measured:\n• Graph A: Cardiac TG levels (fed vs fasted, Control vs $\\text{cPPAR}\\alpha^{-/-}$)\n• Graph B: Plin2 protein levels (fed vs fasted, Control vs $\\text{cPPAR}\\alpha^{-/-}$)",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554169/question-bank/qb_img_1780554169455_19.png",
        alt: "Graph A: Cardiac TG levels and Graph B: Plin2 protein levels in Control and cPPARα knockout mice",
        caption: "Graphs A and B",
      },
      {
        type: "text",
        value:
          "Graph A: Cardiac triglyceride (TG) levels in fed vs. fasted Control and $\\text{cPPAR}\\alpha^{-/-}$ mice. Graph B: Plin2 protein levels in fed vs. fasted Control and $\\text{cPPAR}\\alpha^{-/-}$ mice.",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554171/question-bank/qb_img_1780554170724_20.png",
        alt: "Additional experimental data from Control and cPPARα knockout mice",
        caption: "Figure 2",
      },
      {
        type: "text",
        value:
          "Figure 2: Additional experimental data comparing Control and cardiac-specific $\\text{PPAR}\\alpha$ knockout ($\\text{cPPAR}\\alpha^{-/-}$) mice.",
      },
    ],
    questions: [
      {
        id: "q1",
        prompt:
          "Which best describes the relationship between Plin2 and TG accumulation across the two graphs?",
        options: [
          "Fasting causes a large increase in Plin2 in Controls, which explains the parallel rise in cardiac TG; knockouts fail to increase Plin2 during fasting, so no TG accumulates.",
          "Plin2 levels rise with fasting in knockouts but not in Controls, redirecting cardiac fatty acids away from storage into oxidation.",
          "Plin2 is consistently lower in $\\text{cPPAR}\\alpha^{-/-}$ mice than in Controls in both fed and fasted states, and this reduced Plin2 tracks with the failure of knockouts to accumulate cardiac TG on fasting.",
          "Plin2 and cardiac TG rise independently of each other, driven by separate signalling pathways downstream of $\\text{PPAR}\\alpha$.",
        ],
        correctOptionIndex: 2,
        explanation:
          "Plin2 is ~0.92 (fed) to ~1.00 (fasted) in Controls — a small change within error bars — but only ~0.45 in knockouts in BOTH fed and fasted states, roughly half the Control level. So the dominant signal is genotype-based (Control vs knockout), not fasting-based. Cardiac TG doubles with fasting in Controls (~2.0 → ~4.2) but fails to accumulate in knockouts (~1.9 → ~1.3) despite normal FFA mobilisation. Plin2's chronically low baseline in knockouts is a permissive factor that gates whether fasting-induced TG storage can occur at all.",
        workedSolution: {
          strategy:
            "Look at both graphs side by side and identify the dominant signal in each. Then check whether Plin2 and TG behave in a coupled or uncoupled way across the four experimental conditions (Control vs knockout × fed vs fasted).",
          steps: [
            {
              heading: "Reasoning",
              body:
                "Look at the four Plin2 bars carefully. In Controls, Plin2 is ~0.92 when fed and ~1.00 when fasted — a very small change, well within the error bars. In knockouts, Plin2 is ~0.45 in both states. The significance markers point to the difference between genotypes (Controls vs knockouts), not between fed and fasted. So the dominant signal in the Plin2 graph is: cPPARα knockout roughly halves Plin2 across both feeding states — fasting barely moves Plin2 in either genotype. Now compare that to the TG graph. In Controls, cardiac TG doubles with fasting (~2.0 → ~4.2), a clear fasting-induced storage response. In knockouts, TG doesn't accumulate on fasting — it stays low or even drops slightly (~1.9 → ~1.3), despite serum FFAs rising normally. Putting these together: TG accumulation during fasting requires the fatty acid supply and the storage machinery. Controls have both — FFAs arrive from adipose lipolysis, and adequate Plin2 stabilises the lipid droplets. Knockouts have the fatty acid supply (FFA rises normally) but lack sufficient Plin2 to coat the droplets, so the arriving lipid can't be stored as TG. So the honest reading is: Plin2 acts as a permissive factor for TG storage in the heart — its baseline level (set by PPARα) determines whether fasting-induced TG accumulation can occur.",
            },
          ],
          eliminations: [
            {
              option: "A",
              reason:
                "Overstates the Plin2 response to fasting in Controls. The Plin2 bar rises only from ~0.92 to ~1.00 with fasting — a small change within the error bars, not the \"large increase\" this option claims. The real Plin2 signal is genotype-based (Control ~2× knockout), not fasting-based.",
            },
            {
              option: "B",
              reason:
                "Inverts the pattern. Plin2 doesn't rise with fasting in knockouts — it stays flat at ~0.45 in both fed and fasted states. And Plin2 in Controls is higher, not lower, than in knockouts.",
            },
            {
              option: "D",
              reason:
                "Contradicted by the coupling seen across genotypes. Knockouts show both reduced Plin2 and failure to accumulate TG. If the two were independent, you'd expect to see cases where one moves without the other — but they don't. The two figures point in the same direction, driven by the shared upstream regulator PPARα.",
            },
          ],
          answer:
            "C — Plin2 is consistently lower in cPPARα⁻/⁻ mice than in Controls in both fed and fasted states, and this reduced Plin2 tracks with the failure of knockouts to accumulate cardiac TG on fasting.",
        },
      },
      {
        id: "q2",
        prompt:
          "What could be a reasonable explanation for why fasted $\\text{cPPAR}\\alpha^{-/-}$ mice fail to accumulate cardiac triglycerides despite having elevated circulating FFAs?",
        options: [
          "Reduced Plin2 expression prevents stable storage of triglycerides in lipid droplets.",
          "Knockout mice cannot mobilise fatty acids from adipose tissue.",
          "Knockout mice increase Plin5 levels to divert lipids into alternate pathways.",
          "$\\text{PPAR}\\alpha$ deficiency blocks fatty acid release into the blood.",
        ],
        correctOptionIndex: 0,
        explanation:
          "Serum FFAs rise normally in knockouts during fasting — adipose mobilisation is intact. However, knockouts have low Plin2 even when fasted. Without Plin2 to coat and stabilise lipid droplets, fatty acids that reach the heart cannot be packaged into stable TG stores. Option B is directly contradicted by the elevated serum FFAs. Option C invents a Plin5 rise the data do not show. Option D is contradicted by the FFA graph.",
        workedSolution: {
          steps: [
            {
              heading: "Reasoning",
              body:
                "Anchor the question around what the data actually exclude: serum FFAs rise in BOTH genotypes with fasting → adipose mobilisation works in knockouts. Knockouts have low Plin2, even when fasted → lipid droplets can't be properly coated/stabilised. Plin5 is not elevated in knockouts → no compensatory pathway. Without Plin2, fatty acids that reach the heart can't be packaged into stable droplets. The lipid simply doesn't accumulate as TG.",
            },
          ],
          eliminations: [
            { option: "B", reason: "Directly contradicted by the elevated serum FFAs in knockouts." },
            { option: "C", reason: "Invents a Plin5 rise that the data don't show." },
            { option: "D", reason: "Contradicted by the FFA graph — release is normal." },
          ],
          answer: "A — Reduced Plin2 expression prevents stable storage of triglycerides in lipid droplets",
        },
      },
      {
        id: "q3",
        prompt:
          "If a pharmacological agent were developed that increased Plin2 expression specifically in $\\text{cPPAR}\\alpha^{-/-}$ mice, which outcome would be most likely during fasting?",
        options: [
          "Cardiac TG accumulation would increase in knockouts.",
          "Serum FFAs would remain low in knockouts.",
          "Cardiac TG levels would decrease further in knockouts.",
          "Plin5 levels would rise to compensate for low Plin2.",
        ],
        correctOptionIndex: 0,
        explanation:
          "The bottleneck in knockouts is low Plin2 — PPARα normally induces Plin2, and without PPARα the droplets cannot be stabilised. FFAs already arrive at the heart normally (shown in the data). If Plin2 is pharmacologically restored, the storage machinery is repaired and cardiac TG accumulation should be rescued. Option B is about serum FFAs, which are regulated upstream by adipose and are unaffected by cardiac Plin2. Options C and D are opposite or irrelevant.",
        workedSolution: {
          strategy:
            "This is a \"what if we fixed the broken piece?\" question. To predict what happens when Plin2 is artificially restored in knockouts, we need to figure out exactly why knockouts currently fail to accumulate TG. If the answer is \"not enough Plin2\", then restoring Plin2 should rescue the phenotype. If the answer is something else — no fatty acid supply, alternate lipid handling, etc. — then restoring Plin2 wouldn't help. Work through the causal chain step by step, checking each link against text and graph evidence.",
          steps: [
            {
              heading: "Step 1 — Is the fatty acid supply intact in knockouts?",
              body:
                "From the text: \"During fasting, adipose tissue releases free fatty acids (FFAs) into the circulation.\" This describes the upstream lipolysis step — happens in adipose tissue, not the heart. From Figure A (serum FFAs): both Controls and knockouts show FFA rising from ~0.35 mmol/L (fed) to ~0.7–0.9 mmol/L (fasted), both marked significant. Conclusion: adipose mobilisation of FFA is intact in knockouts, so the fatty acid supply arriving at the heart during fasting is not the problem — the bottleneck must be downstream, inside the heart.",
            },
            {
              heading: "Step 2 — What normally happens to the FFA arriving at the heart?",
              body:
                "From the text: FFAs \"may be oxidised for energy or stored as triglycerides (TG) within lipid droplets in the heart.\" This question is specifically about storage. From the text: \"Plin2 is a lipid droplet–associated protein that coats lipid droplets and stabilises triglyceride storage.\" So the storage pathway explicitly depends on Plin2 — without adequate Plin2, lipid droplets can't be properly coated, so TG storage should fail.",
            },
            {
              heading: "Step 3 — Why is Plin2 low in knockouts? The PPARα link.",
              body:
                "PPARα is a transcription factor that controls which genes get expressed in the heart, including genes involved in fatty acid metabolism. Cardiac-specific knockout removes PPARα specifically from cardiomyocytes. From the Plin2 graph: knockouts sit at ~0.45 in both fed and fasted states — roughly half the Control level (~0.92–1.00), a significant, chronic deficit present in both feeding states — the pattern you'd expect from losing an upstream transcription factor that keeps Plin2 baseline elevated. Chain so far: PPARα (transcription factor) → drives Plin2 expression → Plin2 (droplet coat) → enables TG storage. The Plin2 deficit is a downstream consequence of the PPARα knockout, not a coincidence.",
            },
            {
              heading: "Step 4 — Does the TG graph confirm the prediction?",
              body:
                "Controls double their cardiac TG on fasting (~2.0 → ~4.2 µg/g). Knockouts fail to accumulate — they stay flat or drop slightly (~1.9 → ~1.3 µg/g), despite FFA arriving normally. The TG data is consistent with the PPARα → Plin2 → TG chain being broken at the PPARα step: FFA arrives, but the storage machinery downstream is missing because its transcriptional driver has been knocked out.",
            },
            {
              heading: "Step 5 — What if we artificially restore Plin2 in knockouts?",
              body:
                "The drug doesn't try to restore PPARα (impossible in a knockout — the gene is gone). Instead, it bypasses the PPARα → Plin2 step entirely by directly raising Plin2 through some independent route. After the intervention: FFA supply — still intact (never needed PPARα in the heart, adipose lipolysis is regulated elsewhere); Plin2 — now restored (drug bypasses the missing PPARα); storage machinery — functional again. Both prerequisites for TG storage — fatty acid substrate AND droplet-stabilising protein — are now present, so cardiac TG accumulation would increase in knockouts.",
            },
          ],
          eliminations: [
            {
              option: "B",
              reason:
                "(Serum FFAs would remain low) — Serum FFAs are regulated upstream by adipose lipolysis, not by cardiac Plin2 or cardiac PPARα. The Plin2 fix acts inside the heart and has no reason to affect FFA release from adipose. From Figure A we already know FFA rises normally in knockouts, so \"remain low\" is contradicted by the existing data.",
            },
            {
              option: "C",
              reason:
                "(Cardiac TG would decrease further) — Gets the direction wrong. Adding storage capacity to a system that has fatty acid supply should increase storage, not decrease it. There's no mechanism given in the stem by which more Plin2 would suppress TG.",
            },
            {
              option: "D",
              reason:
                "(Plin5 would rise to compensate) — Plin5 already looks essentially flat across all four conditions in the current data. Nothing in the stem suggests Plin5 responds to Plin2 changes, so predicting a compensatory rise is unsupported. Also, the question asks about the direct effect of the Plin2 drug, not hypothetical downstream compensations.",
            },
          ],
          answer: "A — Cardiac TG accumulation would increase in knockouts.",
        },
      },
      {
        id: "q4",
        prompt:
          "Given these results, which of the following is a reasonable generalisation about the role of $\\text{PPAR}\\alpha$ in cardiac lipid metabolism?",
        options: [
          "$\\text{PPAR}\\alpha$ is required for FFA mobilisation from adipose tissue.",
          "$\\text{PPAR}\\alpha$ controls Plin2 expression, which is linked to TG storage in the heart.",
          "$\\text{PPAR}\\alpha$ decreases Plin5 expression to reduce TG accumulation.",
          "$\\text{PPAR}\\alpha$ directly regulates serum FFA concentration.",
        ],
        correctOptionIndex: 1,
        explanation:
          "The chain of evidence: FFA mobilisation is intact without cardiac PPARα → PPARα doesn't control adipose release. Plin2 expression tracks PPARα status → PPARα controls cardiac Plin2. Plin2 expression tracks cardiac TG → Plin2 enables storage. Therefore: PPARα → Plin2 → TG storage. Option A is contradicted by normal serum FFAs in knockouts. Option C invents an inverse Plin5 relationship not in the data. Option D is also contradicted by the FFA data.",
        workedSolution: {
          steps: [
            {
              heading: "Reasoning",
              body:
                "Synthesise the dataset into one statement: FFA mobilisation is intact without cardiac PPARα → PPARα doesn't control adipose release. Plin2 expression tracks PPARα status → PPARα controls cardiac Plin2. Plin2 expression tracks cardiac TG → Plin2 enables storage. So the chain is: PPARα → Plin2 → TG storage.",
            },
          ],
          eliminations: [
            { option: "A", reason: "Confuses cardiac PPARα with adipose lipolysis — FFAs rise normally in knockouts." },
            { option: "C", reason: "Invents an inverse relationship with Plin5 not present in the data." },
            { option: "D", reason: "Overreaches — knockouts had normal serum FFA mobilisation, so cardiac PPARα doesn't set serum levels." },
          ],
          answer: "B — PPARα controls Plin2 expression, which is linked to TG storage in the heart",
        },
      },
      {
        id: "q5",
        prompt:
          "Suppose Plin2 protein levels were normalised to the housekeeping protein GAPDH. Imagine that in one population (e.g., Chinese participants) GAPDH expression is naturally lower than in another population (e.g., Eurasian/European participants). What implication would this have for the reported Plin2 expression values?",
        options: [
          "Plin2 would appear artificially higher in the Chinese population compared to Europeans, even if actual Plin2 levels were the same.",
          "Plin2 would appear artificially lower in the Chinese population compared to Europeans, even if actual Plin2 levels were the same.",
          "There would be no effect on the reported Plin2 values because housekeeping proteins always control for variability.",
          "GAPDH would increase Plin2 expression in Chinese participants.",
        ],
        correctOptionIndex: 0,
        explanation:
          "Reported Plin2 = Plin2 signal / GAPDH signal. If GAPDH is genuinely lower in the Chinese population (smaller denominator), the same absolute Plin2 protein content (same numerator) produces a LARGER ratio — so Plin2 appears artificially elevated. Option B reverses the algebra. Option C is the assumption being challenged — GAPDH only controls for variability if it is actually constant across groups. Option D nonsensically suggests GAPDH regulates Plin2 expression.",
        workedSolution: {
          steps: [
            {
              heading: "Step 1 — Extract the formula from the additional information",
              body:
                "The additional information tells us that when Western blot results are reported, the raw signal is divided by a housekeeping protein signal: Reported Plin2 = Raw Plin2 signal ÷ Raw GAPDH signal. The reason for dividing: the raw signal is confounded by how much sample was loaded onto the gel. Dividing by GAPDH — assumed to be constant across cells — corrects for that, so the ratio isolates the \"true\" Plin2 amount. This assumption is what makes the technique work.",
            },
            {
              heading: "Step 2 — Identify what the question tells us",
              body:
                "The question anchors two facts: raw Plin2 signal is identical across all lanes — so the numerator of the ratio is the same in both populations; GAPDH is lower in the Chinese population than in the European population — so the denominator differs. If the numerator is fixed and the denominator differs, the ratio must differ. The question is: in which direction?",
            },
            {
              heading: "Step 3 — Work it out with sample numbers",
              body:
                "Assign arbitrary units: raw Plin2 signal = 100 units in both populations. Let GAPDH be 100 units in the European group and 50 units in the Chinese group (naturally lower). European: reported Plin2 = 100/100 = 1.0. Chinese: reported Plin2 = 100/50 = 2.0. Even though the actual raw Plin2 is identical, the reported values differ by 2× — a mathematical artefact of the smaller denominator, not a biological difference.",
            },
            {
              heading: "Step 4 — Why smaller denominator inflates the ratio",
              body:
                "Basic arithmetic: 100/100 = 1.0, 100/50 = 2.0, 100/25 = 4.0. The numerator (raw Plin2) hasn't changed. The denominator (raw GAPDH) has shrunk. So the reported value grows — even though the underlying Plin2 hasn't. That inflation looks like a biological signal when it's actually a normalisation artefact.",
            },
            {
              heading: "Step 5 — Apply to the question",
              body:
                "Raw Plin2 is identical across populations (numerator fixed); GAPDH is smaller in the Chinese group (smaller denominator); smaller denominator → larger reported value. So reported Plin2 will look artificially higher in the Chinese population — even though the actual Plin2 levels are the same.",
            },
          ],
          eliminations: [
            { option: "B", reason: "Reverses the trend explained above." },
            { option: "C", reason: "This is wrong — see above; housekeeping proteins only control for variability if they're actually constant across groups." },
            { option: "D", reason: "Nowhere does it suggest GAPDH affects Plin2 levels." },
          ],
          answer:
            "A — Plin2 would appear artificially higher in the Chinese population compared to Europeans, even if actual Plin2 levels were the same.",
        },
      },
    ],
  },

  // ── Stem 2: Sardine Metabolism ───────────────────────────────────────────
  {
    categoryId: CATEGORY_ID,
    subcategoryId: SUBCATEGORY_ID,
    title: "Temperature and Fasting in European Sardines - Stem 2",
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
          "Groups of sardines were maintained for 60 days under one of four experimental conditions combining feeding status (fed or food-deprived) with temperature (12 °C or 20 °C). Throughout the experiment, survival was monitored daily. The figures below demonstrate various outcomes measured by the experiment:",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554171/question-bank/qb_img_1780554171464_21.png",
        alt: "Figure 1: Survival probability of sardines over 60 days",
        caption: "Figure 1",
      },
      {
        type: "text",
        value:
          "Figure 1: Survival probability of sardines over 60 days under fed or food-deprived conditions at 12 °C and 20 °C.",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554172/question-bank/qb_img_1780554172363_22.png",
        alt: "Figure 2: Median sardine oxygen consumption",
        caption: "Figure 2",
      },
      {
        type: "text",
        value:
          "Figure 2: Median sardine oxygen consumption ($\\text{mg O}_2 \\cdot \\text{g}^{-1} \\cdot \\text{h}^{-1}$) measured under different temperatures, feeding conditions, and experimental periods.",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554173/question-bank/qb_img_1780554173125_23.png",
        alt: "Figure 3: Relative daily body mass change",
        caption: "Figure 3",
      },
      {
        type: "text",
        value:
          "Figure 3: Relative daily body mass change ($\\text{g} \\cdot \\text{g}^{-1} \\cdot \\text{day}^{-1}$) in sardines under different feeding and temperature conditions.",
      },
      {
        type: "text",
        value: "ADDITIONAL INFORMATION:",
        variant: "additional-info",
      },
      {
        type: "text",
        value:
          "Mitochondrial respiration comprises ATP-linked and non-ATP-linked components. OXPHOS reflects ATP-producing respiration, whereas LEAK represents uncoupled oxygen consumption. Both were measured in red muscle tissue under different experimental conditions.",
      },
      {
        type: "image",
        url: "https://res.cloudinary.com/dn2hfglba/image/upload/v1780554174/question-bank/qb_img_1780554173764_24.png",
        alt: "Figure 4: LEAK and OXPHOS mitochondrial respiration in sardine red muscle",
        caption: "Figure 4",
      },
      {
        type: "text",
        value:
          "Figure 4: LEAK and OXPHOS mitochondrial respiration in sardine red muscle across temperatures, feeding conditions, and time.",
      },
    ],
    questions: [
      {
        id: "q1",
        prompt:
          "Which explanation best accounts for why food-deprived sardines at 20 °C show substantially lower survival over 60 days than food-deprived sardines at 12 °C?",
        options: [
          "Food-deprived sardines at 20 °C reduce oxygen consumption so strongly that aerobic ATP production becomes insufficient to sustain life.",
          "Higher temperature increases the baseline rate of oxygen consumption, so during food deprivation energy expenditure remains high relative to energy intake, accelerating exhaustion of internal reserves.",
          "At 12 °C, sardines maintain a higher oxygen consumption rate, which protects survival by sustaining ATP synthesis.",
          "The lower survival at 20 °C must be due to reduced dissolved oxygen in water at higher temperatures, independently of metabolic rate.",
        ],
        correctOptionIndex: 1,
        explanation:
          "Sardines are ectotherms — metabolic rate rises with temperature. At 20 °C, even food-deprived sardines maintain a high oxygen consumption rate (Figure 2). With no food intake, this elevated expenditure burns through internal lipid reserves faster. Figure 1 shows FAS20 survival dropping steeply while FAS12 stays high. Option A gets the direction wrong (O2 consumption stays high at 20 °C, not reduced). Option C is backwards — 12 °C fish have LOWER O2 consumption. Option D invokes dissolved O2 which was not measured or mentioned.",
        workedSolution: {
          strategy: "Pair Figure 1 (survival) with Figure 2 (oxygen consumption) and explain the gap using ectotherm thermal physiology.",
          steps: [
            {
              heading: "Step 1 — Read Figure 1",
              body: "FAS20 survival drops steeply across 60 days, ending near ~0.5–0.6. FAS12 stays high (~0.85–0.95) throughout — a big survival gap.",
            },
            {
              heading: "Step 2 — Read Figure 2",
              body: "At both time-windows, 20 °C groups sit ABOVE the 12 °C groups in oxygen consumption. Even when fasted, FAS20 consumes more O2 than FAS12.",
            },
            {
              heading: "Step 3 — Apply ectotherm physiology",
              body:
                "Higher temperature → faster enzymatic rates → higher baseline energy demand. With zero intake during fasting, energy must come from internal reserves. Higher expenditure at 20 °C means reserves deplete faster → starvation arrives sooner → mortality rises.",
            },
          ],
          eliminations: [
            { option: "A", reason: "Claims O2 consumption is suppressed; Figure 2 shows the opposite." },
            { option: "C", reason: "Inverts the temperature direction (12 °C is lower, not higher)." },
            { option: "D", reason: "Blames dissolved-oxygen solubility; the figures point to metabolic demand, not hypoxia." },
          ],
          answer:
            "B — Higher temperature raises baseline O2 consumption, so fasted reserves deplete faster, accelerating mortality",
        },
      },
      {
        id: "q2",
        prompt:
          "Which conclusion is best supported about the relationship between metabolic rate and body mass change across treatments?",
        options: [
          "The group with the highest oxygen consumption necessarily gains body mass over time due to higher ATP production.",
          "Food deprivation causes similar rates of body mass loss at 12 °C and 20 °C because intake is zero in both conditions.",
          "Higher oxygen consumption at 20 °C is associated with a more negative daily change in body mass during food deprivation.",
          "Differences in body mass change are independent of temperature and are explained only by feeding status.",
        ],
        correctOptionIndex: 2,
        explanation:
          "Figure 2 shows food-deprived sardines at 20 °C have higher O2 consumption than at 12 °C. Figure 3 shows food-deprived sardines at 20 °C have a more negative relative body mass change (greater mass loss). Higher metabolic expenditure with zero food intake leads to faster depletion of internal reserves and greater mass loss. Option A confuses cause and effect — higher O2 consumption during starvation means burning MORE reserves, not gaining mass. Option B is wrong because temperature affects the rate of mass loss significantly. Option D is contradicted by the 20 vs 12 °C difference in fasted groups.",
        workedSolution: {
          strategy:
            "Look at Figure 3 (relative daily body mass change) across all four treatment groups and identify the dominant pattern. Then cross-check with Figure 2 (oxygen consumption) to make sure the answer is consistent with the metabolic picture.",
          steps: [
            {
              heading: "Reasoning",
              body:
                "Read Figure 3 across all four groups in the 0–30 day window: FED12 ≈ −0.05 %/day (essentially maintaining mass); FED20 ≈ −0.10 %/day (slightly below zero but small); FAS12 ≈ −0.30 %/day; FAS20 ≈ −0.55 %/day. So the primary driver of substantial mass loss is feeding status — no intake means the sardine has to burn internal reserves, which shows up as strongly negative daily mass change. Temperature is a secondary modifier that becomes visible mainly within the fasted category, where higher metabolic rate at 20 °C accelerates the loss. Note the qualifier \"predominantly\": it correctly acknowledges that fed sardines aren't perfectly flat (there's a small negative drift, especially at 20 °C), but the substantial mass loss is confined to the fasted groups.",
            },
          ],
          eliminations: [
            {
              option: "A",
              reason:
                "Wrong direction. Fasted sardines at 20 °C have the highest oxygen consumption (Figure 2) but lose the most mass, not gain it. Higher ATP production doesn't build body mass; food intake does. Without intake, higher metabolic rate accelerates loss, not gain.",
            },
            {
              option: "B",
              reason:
                "Directly contradicted by Figure 3. Fasted sardines lose mass roughly twice as fast at 20 °C (≈ −0.55 %/day) as at 12 °C (≈ −0.30 %/day). Temperature clearly matters even when intake is zero, because ectotherm metabolic rate rises with temperature, and higher expenditure with zero intake means faster depletion of reserves.",
            },
            {
              option: "D",
              reason:
                "Overstates the point. Temperature does affect mass change — FAS20 loses mass much faster than FAS12, and there's also a small dip in FED20 vs FED12. Feeding status is the dominant driver, but temperature is not irrelevant.",
            },
          ],
          answer:
            "C — Across all four treatments, predominantly the fasted sardines show substantial body mass loss, while fed sardines maintain their mass roughly constant regardless of whether they are held at 12 °C or 20 °C.",
        },
      },
      {
        id: "q3",
        prompt:
          "Which conclusion is most strongly supported regarding energy regulation in food-deprived sardines maintained at 20 °C between days 30 and 60?",
        options: [
          "Reduced mitochondrial ATP-producing capacity directly lowers whole-animal oxygen consumption.",
          "Decreased LEAK respiration fully compensates for increased metabolic demand at higher temperature.",
          "Whole-animal metabolic demand remains elevated despite a reduction in mitochondrial ATP-producing capacity.",
          "Increased mitochondrial coupling efficiency results in improved survival during prolonged starvation.",
        ],
        correctOptionIndex: 2,
        explanation:
          "Figure 4 (additional information) shows OXPHOS (mitochondrial ATP-producing capacity) falls in food-deprived sardines at 20 °C between days 30–60. However, Figure 2 shows whole-animal O2 consumption remains elevated throughout. These two observations together indicate that whole-animal metabolic demand stays high even as cellular ATP-producing capacity is reduced — the fish are burning reserves unsustainably. Option A incorrectly infers that reduced OXPHOS lowers whole-animal O2. Option B is unsupported — LEAK does not compensate sufficiently. Option D is contradicted by the continued poor survival.",
        workedSolution: {
          strategy: "Cross-reference WHOLE-ANIMAL metabolism (Figure 2) with CELLULAR/MITOCHONDRIAL respiration (Figure 4).",
          steps: [
            {
              heading: "Step 1 — Whole animal (Figure 2)",
              body: "In the 30–60 day window, FAS20 still shows elevated oxygen consumption relative to FAS12 → systemic metabolic demand stays high.",
            },
            {
              heading: "Step 2 — Mitochondrial (Figure 4)",
              body:
                "At day 60, FAS20 red muscle shows OXPHOS (Panel B) markedly reduced compared with earlier and with other groups; LEAK (Panel A) also reduced. So the mitochondria are NOT just tightening coupling — they're downshifting overall capacity, including ATP-producing capacity.",
            },
            {
              heading: "Step 3 — Synthesise",
              body:
                "We have a mismatch: whole-animal demand stays HIGH (Fig 2), while cellular ATP-producing capacity falls (Fig 4). That mismatch is precisely the correct option's wording.",
            },
          ],
          eliminations: [
            { option: "A", reason: "Asserts mitochondria DRIVE whole-animal O2 down — Fig 2 shows the opposite (whole-animal O2 stays high)." },
            { option: "B", reason: "Claims LEAK compensates fully — OXPHOS also drops and survival still collapses, so this option is incorrect." },
            { option: "D", reason: "Claims survival improves with coupling efficiency — survival actually worsens at 20 °C (Fig 1)." },
          ],
          answer: "C — Whole-animal metabolic demand remains elevated despite a reduction in mitochondrial ATP-producing capacity",
        },
      },
      {
        id: "q4",
        prompt:
          "During the 30–60 day period, food-deprived sardines at 20 °C have an average oxygen consumption of approximately $0.30\\ \\text{mg O}_2 \\cdot \\text{g}^{-1} \\cdot \\text{h}^{-1}$, whereas food-deprived sardines at 12 °C have approximately $0.20\\ \\text{mg O}_2 \\cdot \\text{g}^{-1} \\cdot \\text{h}^{-1}$. Using an oxycalorific coefficient of $14.1\\ \\text{J} \\cdot \\text{mg O}_2^{-1}$ and a lipid energy density of $23\\ \\text{kJ} \\cdot \\text{g}^{-1}$, what is the approximate difference in daily body mass loss between food-deprived sardines at 20 °C and those at 12 °C?",
        options: [
          "$0.0005\\ \\text{g} \\cdot \\text{g}^{-1} \\cdot \\text{day}^{-1}$",
          "$0.002\\ \\text{g} \\cdot \\text{g}^{-1} \\cdot \\text{day}^{-1}$",
          "$0.006\\ \\text{g} \\cdot \\text{g}^{-1} \\cdot \\text{day}^{-1}$",
          "$0.020\\ \\text{g} \\cdot \\text{g}^{-1} \\cdot \\text{day}^{-1}$",
        ],
        correctOptionIndex: 1,
        explanation:
          "Difference in O2 consumption = 0.30 − 0.20 = 0.10 mg O2 · g⁻¹ · h⁻¹. Daily: 0.10 × 24 = 2.4 mg O2 · g⁻¹ · day⁻¹. Energy difference: 2.4 × 14.1 J/mg = 33.84 J/g/day ≈ 0.0338 kJ/g/day. Mass loss difference = 0.0338 / 23 ≈ 0.00147 g · g⁻¹ · day⁻¹ ≈ 0.002. Option A (0.0005) is off by a factor of ~3. Option C (0.006) would require 4× the actual energy difference. Option D (0.020) is an order of magnitude too large.",
        workedSolution: {
          steps: [
            {
              heading: "Step 1 — Set up the daily energy expenditure",
              body:
                "$E = \\dot{M}O_2 \\times \\varepsilon \\times 24$, with $\\varepsilon = 0.014$ kJ per mg O2 (i.e. 14.1 J per mg O2). Per fish, per day, per gram: $E_{20} = 0.30 \\times 0.014 \\times 24 = 0.1008$ kJ·g⁻¹·day⁻¹; $E_{12} = 0.20 \\times 0.014 \\times 24 = 0.0672$ kJ·g⁻¹·day⁻¹.",
            },
            {
              heading: "Step 2 — Convert energy to mass loss using lipid energy density",
              body:
                "Food intake is zero, so all expenditure comes from internal lipid ($\\rho = 23$ kJ·g⁻¹): $\\Delta m = (E_{in} - E_{out})/\\rho = -E_{out}/23$. $\\Delta m_{20} = 0.1008/23 \\approx 0.00438$ g·g⁻¹·day⁻¹. $\\Delta m_{12} = 0.0672/23 \\approx 0.00292$ g·g⁻¹·day⁻¹.",
            },
            {
              heading: "Step 3 — Take the difference",
              body:
                "$\\Delta m_{20} - \\Delta m_{12} = 0.00438 - 0.00292 \\approx 0.00146$ g·g⁻¹·day⁻¹. Closest option: A. 0.0005 — too small (factor of 3 off). B. 0.002 — closest match (within 30%). ✓ C. 0.006 — too large. D. 0.020 — wildly too large.",
            },
            {
              heading: "Special note",
              body:
                "Why don't the two \"grams\" cancel? They measure different things: one g is the total sardine mass (from the oxygen-consumption normalisation), while the other g is the mass of lipid being burned (from $\\rho$). Same SI unit, but different physical quantities — so they stay separate. The final answer means \"grams of lipid burned, per gram of body mass, per day\" — i.e. the fraction of body mass lost daily.",
            },
          ],
          answer: "B — 0.002 g g⁻¹ day⁻¹",
        },
      },
    ],
  },
];

async function seedQuestionSet(input: CreatePracticeQuestionSetInput) {
  const existing = await prisma.practiceQuestionSet.findFirst({
    where: { categoryId: input.categoryId, subcategoryId: input.subcategoryId, title: input.title },
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

async function main() {
  const category = await prisma.practiceCategory.findUnique({ where: { id: CATEGORY_ID } });
  const subcategory = await prisma.practiceSubcategory.findUnique({ where: { id: SUBCATEGORY_ID } });
  if (!category || !subcategory) {
    throw new Error("Category/Subcategory not found. Run npm run db:seed:practice first.");
  }
  for (const stem of stems) {
    await seedQuestionSet(stem);
  }
}

main()
  .catch((e) => { console.error(e); process.exitCode = 1; })
  .finally(() => prisma.$disconnect());
