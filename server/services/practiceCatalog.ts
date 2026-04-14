type PracticeCatalogSeedSubcategory = {
  name: string;
  totalQuestions: number;
  comingSoon?: boolean;
};

type PracticeCatalogSeedCategory = {
  id: string;
  name: string;
  subcategories: PracticeCatalogSeedSubcategory[];
};

export const PRACTICE_CATALOG_SEED: PracticeCatalogSeedCategory[] = [
  {
    id: "humanities",
    name: "Humanities",
    subcategories: [
      { name: "Academic Texts", totalQuestions: 96 },
      { name: "Populist Social Science", totalQuestions: 88 },
      { name: "Classical/Antiquated texts", totalQuestions: 72 },
      { name: "Fiction", totalQuestions: 104 },
      { name: "Cartoons", totalQuestions: 48 },
      { name: "Diagrams and Data", totalQuestions: 64 },
      { name: "Journalism", totalQuestions: 80 },
      { name: "Miscellaneous", totalQuestions: 112 },
      { name: "Poetry", totalQuestions: 170 },
    ],
  },
  {
    id: "general-chemistry",
    name: "General Chemistry",
    subcategories: [
      { name: "Acids and Bases", totalQuestions: 56 },
      { name: "Emulsions and Phase Equilibria", totalQuestions: 48 },
      { name: "Equilibrium", totalQuestions: 64 },
      { name: "Kinetics", totalQuestions: 52 },
      { name: "Methods of Analysis and Detection", totalQuestions: 60 },
      { name: "Mole Calculations and Gases", totalQuestions: 56 },
      { name: "Redox and Electrochemistry", totalQuestions: 72 },
      { name: "Thermodynamics", totalQuestions: 64 },
      { name: "Structure and Bonding", totalQuestions: 56 },
      { name: "The Periodic Table", totalQuestions: 48 },
      { name: "Atoms and Reactions", totalQuestions: 52 },
      { name: "Materials Chemistry", totalQuestions: 44 },
      { name: "Medicinal Chemistry", totalQuestions: 36 },
      { name: "Organometallic Chemistry", totalQuestions: 20 },
    ],
  },
  {
    id: "organic-chemistry",
    name: "Organic Chemistry",
    subcategories: [
      {
        name: "Structure and Bonding in Organic Chemistry",
        totalQuestions: 48,
      },
      { name: "Organic Nomenclature", totalQuestions: 40 },
      { name: "The Alkanes", totalQuestions: 36 },
      { name: "Alkenes", totalQuestions: 44 },
      { name: "Alkynes", totalQuestions: 36 },
      { name: "Stereochemistry and Stereoisomers", totalQuestions: 52 },
      { name: "The Haloalkanes", totalQuestions: 40 },
      { name: "The Oxygen Family", totalQuestions: 48 },
      { name: "Aromatic Chemistry", totalQuestions: 56 },
      { name: "Nitrogen Heterogroups", totalQuestions: 44 },
      {
        name: "Electrocyclic Reactions and Sigmatropic Rearrangements",
        totalQuestions: 48,
      },
      { name: "Spectroscopy", totalQuestions: 60 },
      {
        name: "Intermolecular Forces in Organic Chemistry",
        totalQuestions: 36,
      },
      { name: "Modern research based organic chemistry", totalQuestions: 44 },
      { name: "Polymer Chemistry", totalQuestions: 30 },
    ],
  },
  {
    id: "biology",
    name: "Biology",
    subcategories: [
      { name: "Bioenergetics", totalQuestions: 80 },
      { name: "Cellular Biology and Enzymes", totalQuestions: 96 },
      { name: "Digestive System and Renal System", totalQuestions: 80 },
      { name: "Embryology", totalQuestions: 64 },
      { name: "Exchange Surfaces", totalQuestions: 72 },
      { name: "Genetics and Evolution", totalQuestions: 88 },
      { name: "Homeostasis and Endocrinology", totalQuestions: 80 },
      { name: "Immunology", totalQuestions: 72 },
      { name: "Musculoskeletal System", totalQuestions: 64 },
      { name: "Nervous System", totalQuestions: 80 },
      { name: "Thermoregulation", totalQuestions: 48 },
      { name: "Transport in Animals", totalQuestions: 56 },
    ],
  },
  {
    id: "physics",
    name: "Physics",
    subcategories: [
      { name: "Acoustics", totalQuestions: 40 },
      { name: "Astrophysics", totalQuestions: 36 },
      { name: "Classical Mechanics", totalQuestions: 64 },
      {
        name: "Electricity: Electrostatics and Electric circuits",
        totalQuestions: 72,
      },
      { name: "Magnetism", totalQuestions: 48 },
      { name: "Fluid Mechanics", totalQuestions: 56 },
      { name: "Medical Physics", totalQuestions: 48 },
      { name: "Nuclear Physics", totalQuestions: 44 },
      { name: "Optics", totalQuestions: 52 },
      { name: "Thermal Physics", totalQuestions: 52 },
      { name: "Wave Properties", totalQuestions: 44, comingSoon: true },
      { name: "Modern research based physics", totalQuestions: 0 },
      { name: "Materials engineering", totalQuestions: 0 },
    ],
  },
];
