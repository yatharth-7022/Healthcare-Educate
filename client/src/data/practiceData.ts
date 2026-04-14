export type Subcategory = {
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

export const categories: Category[] = [
  {
    id: "humanities",
    name: "Humanities",
    completed: 65,
    total: 834,
    subcategories: [
      { name: "Academic Texts", completed: 18, total: 96 },
      { name: "Populist Social Science", completed: 12, total: 88 },
      { name: "Classical/Antiquated Texts", completed: 8, total: 72 },
      { name: "Fiction", completed: 15, total: 104 },
      { name: "Cartoons", completed: 5, total: 48 },
      { name: "Diagrams and Data", completed: 4, total: 64 },
      { name: "Journalism", completed: 3, total: 80 },
      { name: "Miscellaneous", completed: 0, total: 112 },
      { name: "Poetry", completed: 0, total: 170 },
    ],
  },
  {
    id: "general-chemistry",
    name: "General Chemistry",
    completed: 42,
    total: 728,
    subcategories: [
      { name: "Acids and Bases", completed: 10, total: 56 },
      { name: "Emulsions and Phase Equilibria", completed: 8, total: 48 },
      { name: "Equilibrium", completed: 6, total: 64 },
      { name: "Kinetics", completed: 5, total: 52 },
      { name: "Methods of Analysis and Detection", completed: 4, total: 60 },
      { name: "Mole Calculations and Gases", completed: 9, total: 56 },
      { name: "Redox and Electrochemistry", completed: 0, total: 72 },
      { name: "Thermodynamics", completed: 0, total: 64 },
      { name: "Structure and Bonding", completed: 0, total: 56 },
      { name: "The Periodic Table", completed: 0, total: 48 },
      { name: "Atoms and Reactions", completed: 0, total: 52 },
      { name: "Materials Chemistry", completed: 0, total: 44 },
      { name: "Medicinal Chemistry", completed: 0, total: 36 },
      { name: "Organometallic Chemistry", completed: 0, total: 20 },
    ],
  },
  {
    id: "organic-chemistry",
    name: "Organic Chemistry",
    completed: 28,
    total: 612,
    subcategories: [
      { name: "Structure and Bonding in Organic Chemistry", completed: 8, total: 48 },
      { name: "Organic Nomenclature", completed: 6, total: 40 },
      { name: "The Alkanes", completed: 5, total: 36 },
      { name: "Alkenes", completed: 4, total: 44 },
      { name: "Alkynes", completed: 5, total: 36 },
      { name: "Stereochemistry and Stereoisomers", completed: 0, total: 52 },
      { name: "The Haloalkanes", completed: 0, total: 40 },
      { name: "The Oxygen Family", completed: 0, total: 48 },
      { name: "Aromatic Chemistry", completed: 0, total: 56 },
      { name: "Nitrogen Heterogroups", completed: 0, total: 44 },
      { name: "Electrocyclic Reactions and Sigmatropic Rearrangements", completed: 0, total: 48 },
      { name: "Spectroscopy", completed: 0, total: 60 },
      { name: "Intermolecular Forces in Organic Chemistry", completed: 0, total: 36 },
      { name: "Modern Research Based Organic Chemistry", completed: 0, total: 44 },
      { name: "Polymer Chemistry", completed: 0, total: 30 },
    ],
  },
  {
    id: "biology",
    name: "Biology",
    completed: 55,
    total: 880,
    subcategories: [
      { name: "Bioenergetics", completed: 12, total: 80 },
      { name: "Cellular Biology and Enzymes", completed: 14, total: 96 },
      { name: "Digestive System and Renal System", completed: 10, total: 80 },
      { name: "Embryology", completed: 8, total: 64 },
      { name: "Exchange Surfaces", completed: 6, total: 72 },
      { name: "Genetics and Evolution", completed: 5, total: 88 },
      { name: "Homeostasis and Endocrinology", completed: 0, total: 80 },
      { name: "Immunology", completed: 0, total: 72 },
      { name: "Musculoskeletal System", completed: 0, total: 64 },
      { name: "Nervous System", completed: 0, total: 80 },
      { name: "Thermoregulation", completed: 0, total: 48 },
      { name: "Transport in Animals", completed: 0, total: 56 },
    ],
  },
  {
    id: "physics",
    name: "Physics",
    completed: 18,
    total: 556,
    subcategories: [
      { name: "Acoustics", completed: 5, total: 40 },
      { name: "Astrophysics", completed: 4, total: 36 },
      { name: "Classical Mechanics", completed: 9, total: 64 },
      { name: "Electricity: Electrostatics and Electric Circuits", completed: 0, total: 72 },
      { name: "Magnetism", completed: 0, total: 48 },
      { name: "Fluid Mechanics", completed: 0, total: 56 },
      { name: "Medical Physics", completed: 0, total: 48 },
      { name: "Nuclear Physics", completed: 0, total: 44 },
      { name: "Optics", completed: 0, total: 52 },
      { name: "Thermal Physics", completed: 0, total: 52 },
      { name: "Wave Properties", completed: 0, total: 44, comingSoon: true },
      { name: "Modern Research Based Physics", completed: 0, total: 0, comingSoon: true },
      { name: "Materials Engineering", completed: 0, total: 0, comingSoon: true },
    ],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
