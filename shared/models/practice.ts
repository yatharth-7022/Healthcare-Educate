export type PracticeSubcategoryProgress = {
  id: string;
  name: string;
  totalQuestions: number;
  answeredQuestions: number;
  comingSoon: boolean;
};

export type PracticeCategoryProgress = {
  id: string;
  name: string;
  totalQuestions: number;
  answeredQuestions: number;
  subcategories: PracticeSubcategoryProgress[];
};

export type PracticeProgressSummaryResponse = {
  categories: PracticeCategoryProgress[];
};

export type PracticeCategoryProgressResponse = {
  category: PracticeCategoryProgress;
};

export type RecordPracticeAnswerInput = {
  categoryId: string;
  subcategoryId: string;
  questionKey: string;
  isCorrect: boolean;
};
