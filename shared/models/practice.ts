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
  selectedOptionIndex: number;
  /** When set, the answer is also stored against this attempt. */
  attemptId?: number;
  /** Position to restore when the attempt is resumed. */
  currentQuestionIndex?: number;
};

export type PracticeSavedAnswer = {
  selectedOptionIndex: number;
  isCorrect: boolean;
};

export type StemTextBlock = {
  type: "text";
  value: string;
  variant?: "default" | "additional-info";
  revealAtQuestion?: number;
};

export type StemEquationBlock = {
  type: "equation";
  value: string;
  mode?: "inline" | "block";
  revealAtQuestion?: number;
};

export type StemImageBlock = {
  type: "image";
  url: string;
  alt?: string;
  caption?: string;
  revealAtQuestion?: number;
};

export type StemTableBlock = {
  type: "table";
  columns: string[];
  rows: string[][];
  caption?: string;
  revealAtQuestion?: number;
};

export type StemCodeBlock = {
  type: "code";
  value: string;
  language?: string;
  revealAtQuestion?: number;
};

export type StemVideoBlock = {
  type: "video";
  url: string;
  title?: string;
  revealAtQuestion?: number;
};

export type StemBlock =
  | StemTextBlock
  | StemEquationBlock
  | StemImageBlock
  | StemTableBlock
  | StemCodeBlock
  | StemVideoBlock;

export type WorkedSolutionStep = {
  heading: string;
  body: string;
};

export type WorkedSolutionElimination = {
  option: string;
  reason: string;
};

export type WorkedSolution = {
  strategy?: string;
  steps: WorkedSolutionStep[];
  eliminations?: WorkedSolutionElimination[];
  answer: string;
  /** Render the answer callout before steps[answerIndex]; defaults to after the last step. */
  answerIndex?: number;
};

export type PracticeMcqQuestion = {
  id: string;
  prompt: string;
  contentBlocks?: StemBlock[];
  options: string[];
  correctOptionIndex: number;
  explanation?: string;
  workedSolution?: WorkedSolution;
};

export type ReportPracticeQuestionInput = {
  categoryId: string;
  subcategoryId: string;
  questionSetId: number;
  questionId: string;
  message: string;
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
  questionSets: PracticeQuestionSet[];
  savedAnswers: Record<string, PracticeSavedAnswer>;
};

export type PracticeAttemptStatus = "IN_PROGRESS" | "COMPLETED";

export type PracticeAttemptSummary = {
  id: number;
  categoryId: string;
  categoryName: string;
  subcategoryId: string;
  subcategoryName: string;
  status: PracticeAttemptStatus;
  setsCount: number;
  totalQuestions: number;
  answeredQuestions: number;
  correctQuestions: number;
  currentQuestionIndex: number;
  startedAt: string;
  updatedAt: string;
  completedAt: string | null;
};

export type PracticeAttemptDetail = {
  attempt: PracticeAttemptSummary;
  questionSets: PracticeQuestionSet[];
  /** Keyed by `${questionSetId}:${questionId}`. */
  savedAnswers: Record<string, PracticeSavedAnswer>;
  bookmarkedKeys: string[];
};

export type PracticeAttemptListResponse = {
  attempts: PracticeAttemptSummary[];
};

export type PracticeAttemptResponse = {
  attempt: PracticeAttemptSummary;
};

export type CreatePracticeAttemptInput = {
  categoryId: string;
  subcategoryId: string;
  sets: number;
  /** Reuse the newest in-progress attempt for this topic instead of starting a new one. */
  resumeExisting?: boolean;
};

export type UpdatePracticeAttemptInput = {
  currentQuestionIndex?: number;
  bookmarkedKeys?: string[];
  /**
   * "save": Save & Exit — completes the attempt only if every question is answered.
   * "finish": the user finished the session — always completes it.
   * Omitted: progress snapshot only (index / bookmarks).
   */
  action?: "save" | "finish";
};
