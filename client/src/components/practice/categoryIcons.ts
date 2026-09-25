import { Atom, BookOpen, Dna, FlaskConical, Zap } from "lucide-react";

export const categoryIcons: Record<string, React.ElementType> = {
  humanities: BookOpen,
  "general-chemistry": FlaskConical,
  "organic-chemistry": Atom,
  biology: Dna,
  physics: Zap,
};
