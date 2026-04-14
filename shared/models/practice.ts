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

export type StemTextBlock = {
  type: "text";
  value: string;
  variant?: "default" | "additional-info";
};

export type StemEquationBlock = {
  type: "equation";
  value: string;
  mode?: "inline" | "block";
};

export type StemImageBlock = {
  type: "image";
  url: string;
  alt?: string;
  caption?: string;
};

export type StemTableBlock = {
  type: "table";
  columns: string[];
  rows: string[][];
  caption?: string;
};

export type StemCodeBlock = {
  type: "code";
  value: string;
  language?: string;
};

export type StemVideoBlock = {
  type: "video";
  url: string;
  title?: string;
};

export type StemBlock =
  | StemTextBlock
  | StemEquationBlock
  | StemImageBlock
  | StemTableBlock
  | StemCodeBlock
  | StemVideoBlock;

export type PracticeMcqQuestion = {
  id: string;
  prompt: string;
  contentBlocks?: StemBlock[];
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
};

export type CreatePracticeQuestionSetInput = {
  categoryId: string;
  subcategoryId: string;
  title: string;
  stem: StemBlock[];
  questions: PracticeMcqQuestion[];
  isPublished?: boolean;
};

export type PracticeQuestionSet = {
  id: number;
  categoryId: string;
  subcategoryId: string;
  title: string;
  stem: StemBlock[];
  questions: PracticeMcqQuestion[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PracticeQuestionSetResponse = {
  questionSet: PracticeQuestionSet;
};

export type PracticeQuestionSetListResponse = {
  questionSets: PracticeQuestionSet[];
};

export type PracticeSessionResponse = {
  questionSet: PracticeQuestionSet;
};
