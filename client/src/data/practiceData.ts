export type Subcategory = {
  id: string;
  name: string;
  completed: number;
  total: number;
  comingSoon?: boolean;
};

export type Category = {
  id: string;
  name: string;
  completed: number;
  total: number;
  subcategories: Subcategory[];
};

export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function sub(
  name: string,
  completed: number,
  total: number,
  comingSoon?: boolean
): Subcategory {
  return { id: toSlug(name), name, completed, total, comingSoon };
}

export const categories: Category[] = [
  {
    id: "humanities",
    name: "Humanities",
    completed: 65,
    total: 834,
    subcategories: [
      sub("Academic Texts", 18, 96),
      sub("Populist Social Science", 12, 88),
      sub("Classical/Antiquated Texts", 8, 72),
      sub("Fiction", 15, 104),
      sub("Cartoons", 5, 48),
      sub("Diagrams and Data", 4, 64),
      sub("Journalism", 3, 80),
      sub("Miscellaneous", 0, 112),
      sub("Poetry", 0, 170),
    ],
  },
  {
    id: "general-chemistry",
    name: "General Chemistry",
    completed: 42,
    total: 728,
    subcategories: [
      sub("Acids and Bases", 10, 56),
      sub("Emulsions and Phase Equilibria", 8, 48),
      sub("Equilibrium", 6, 64),
      sub("Kinetics", 5, 52),
      sub("Methods of Analysis and Detection", 4, 60),
      sub("Mole Calculations and Gases", 9, 56),
      sub("Redox and Electrochemistry", 0, 72),
      sub("Thermodynamics", 0, 64),
      sub("Structure and Bonding", 0, 56),
      sub("The Periodic Table", 0, 48),
      sub("Atoms and Reactions", 0, 52),
      sub("Materials Chemistry", 0, 44),
      sub("Medicinal Chemistry", 0, 36),
      sub("Organometallic Chemistry", 0, 20),
    ],
  },
  {
    id: "organic-chemistry",
    name: "Organic Chemistry",
    completed: 28,
    total: 612,
    subcategories: [
      sub("Structure and Bonding in Organic Chemistry", 8, 48),
      sub("Organic Nomenclature", 6, 40),
      sub("The Alkanes", 5, 36),
      sub("Alkenes", 4, 44),
      sub("Alkynes", 5, 36),
      sub("Stereochemistry and Stereoisomers", 0, 52),
      sub("The Haloalkanes", 0, 40),
      sub("The Oxygen Family", 0, 48),
      sub("Aromatic Chemistry", 0, 56),
      sub("Nitrogen Heterogroups", 0, 44),
      sub("Electrocyclic Reactions and Sigmatropic Rearrangements", 0, 48),
      sub("Spectroscopy", 0, 60),
      sub("Intermolecular Forces in Organic Chemistry", 0, 36),
      sub("Modern Research Based Organic Chemistry", 0, 44),
      sub("Polymer Chemistry", 0, 30),
    ],
  },
  {
    id: "biology",
    name: "Biology",
    completed: 55,
    total: 880,
    subcategories: [
      sub("Bioenergetics", 12, 80),
      sub("Cellular Biology and Enzymes", 14, 96),
      sub("Digestive System and Renal System", 10, 80),
      sub("Embryology", 8, 64),
      sub("Exchange Surfaces", 6, 72),
      sub("Genetics and Evolution", 5, 88),
      sub("Homeostasis and Endocrinology", 0, 80),
      sub("Immunology", 0, 72),
      sub("Musculoskeletal System", 0, 64),
      sub("Nervous System", 0, 80),
      sub("Thermoregulation", 0, 48),
      sub("Transport in Animals", 0, 56),
    ],
  },
  {
    id: "physics",
    name: "Physics",
    completed: 18,
    total: 556,
    subcategories: [
      sub("Acoustics", 5, 40),
      sub("Astrophysics", 4, 36),
      sub("Classical Mechanics", 9, 64),
      sub("Electricity: Electrostatics and Electric Circuits", 0, 72),
      sub("Magnetism", 0, 48),
      sub("Fluid Mechanics", 0, 56),
      sub("Medical Physics", 0, 48),
      sub("Nuclear Physics", 0, 44),
      sub("Optics", 0, 52),
      sub("Thermal Physics", 0, 52),
      sub("Wave Properties", 0, 44, true),
      sub("Modern Research Based Physics", 0, 0, true),
      sub("Materials Engineering", 0, 0, true),
    ],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getSubcategoryById(
  categoryId: string,
  subcategoryId: string
): Subcategory | undefined {
  return getCategoryById(categoryId)?.subcategories.find(
    (s) => s.id === subcategoryId
  );
}
