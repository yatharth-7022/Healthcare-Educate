import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams, useSearch } from "wouter";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  usePracticeSessionQuestionSet,
  useRecordPracticeAnswer,
  useReportPracticeQuestion,
} from "@/hooks/use-practice-progress";
import { StemBlockRenderer } from "@/components/practice/StemBlockRenderer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Bookmark, ChevronDown, ChevronLeft, ChevronRight, CircleCheck, CircleX, Flag, FlaskConical, Lock, LogOut, Navigation, ThumbsDown, ThumbsUp, X } from "lucide-react";
import { MathText } from "@/components/practice/MathText";

function answerKey(setId: number, questionId: string) {
  return `${setId}:${questionId}`;
}

export default function PracticeSession() {
  const { category: categoryId, subcategory: subcategoryId } = useParams<{
    category: string;
    subcategory: string;
  }>();
  const [, setLocation] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const requestedSets = Number.parseInt(params.get("sets") || "1", 10);

  const { data, isLoading, error } = usePracticeSessionQuestionSet(
    categoryId,
    subcategoryId,
    requestedSets,
  );
  const recordAnswerMutation = useRecordPracticeAnswer(categoryId);
  const reportQuestionMutation = useReportPracticeQuestion();
  const { toast } = useToast();
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportMessage, setReportMessage] = useState("");

  const questionSets = useMemo(() => data?.questionSets ?? [], [data]);
  const savedAnswers = useMemo(() => data?.savedAnswers ?? {}, [data]);

  const sessionQuestions = useMemo(
    () =>
      questionSets.flatMap((set, setIndex) =>
        set.questions.map((question, localIndex) => ({
          setIndex,
          localNumber: localIndex + 1,
          question,
        })),
      ),
    [questionSets],
  );

  const questions = useMemo(
    () => sessionQuestions.map((entry) => entry.question),
    [sessionQuestions],
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedByQuestionId, setSelectedByQuestionId] = useState<
    Record<string, number>
  >({});
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [showNavigator, setShowNavigator] = useState(false);
  const [activeStemTab, setActiveStemTab] = useState<"passage" | "additional">("passage");
  const [seenAdditionalInfoSetIds, setSeenAdditionalInfoSetIds] = useState<Set<number>>(new Set());
  const [showPreFinish, setShowPreFinish] = useState(false);
  const [completedAt, setCompletedAt] = useState<Date | null>(null);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);
  const [showFullStem, setShowFullStem] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  const currentEntry = sessionQuestions[currentQuestionIndex];
  const currentQuestion = currentEntry?.question;
  const questionSet = currentEntry
    ? questionSets[currentEntry.setIndex]
    : undefined;
  const currentLocalQuestionNumber = currentEntry?.localNumber ?? 1;
  const currentQuestionNumber = currentQuestionIndex + 1;

  // Restore any previously saved answers and resume at the first unanswered
  // question ("Save & Exit" resume behaviour).
  useEffect(() => {
    if (hasHydrated || sessionQuestions.length === 0) return;

    const restored: Record<string, number> = {};
    let resumeIndex = 0;
    let foundUnanswered = false;

    sessionQuestions.forEach((entry, idx) => {
      const set = questionSets[entry.setIndex];
      const key = answerKey(set.id, entry.question.id);
      const saved = savedAnswers[key];

      if (saved) {
        restored[key] = saved.selectedOptionIndex;
      } else if (!foundUnanswered) {
        resumeIndex = idx;
        foundUnanswered = true;
      }
    });

    setSelectedByQuestionId(restored);
    setCurrentQuestionIndex(foundUnanswered ? resumeIndex : 0);
    setHasHydrated(true);
  }, [hasHydrated, sessionQuestions, questionSets, savedAnswers]);

  // Additional information is authored as the tail of the stem array,
  // starting at the block marked variant "additional-info" (Medify-style:
  // shown in its own tab rather than inline in the passage).
  const additionalInfoStartIndex = useMemo(() => {
    if (!questionSet) return -1;
    return questionSet.stem.findIndex(
      (block) => block.type === "text" && block.variant === "additional-info",
    );
  }, [questionSet]);

  const hasAdditionalInfo = additionalInfoStartIndex !== -1;

  const additionalInfoUnlockQuestion = useMemo(() => {
    if (!questionSet || !hasAdditionalInfo) return 1;
    return questionSet.stem[additionalInfoStartIndex].revealAtQuestion ?? 1;
  }, [questionSet, hasAdditionalInfo, additionalInfoStartIndex]);

  const isAdditionalInfoUnlocked =
    hasAdditionalInfo && currentLocalQuestionNumber >= additionalInfoUnlockQuestion;

  const visiblePassageBlocks = useMemo(() => {
    if (!questionSet) return [];
    const blocks = hasAdditionalInfo
      ? questionSet.stem.slice(0, additionalInfoStartIndex)
      : questionSet.stem;
    return blocks.filter(
      (block) =>
        !block.revealAtQuestion ||
        block.revealAtQuestion <= currentLocalQuestionNumber,
    );
  }, [questionSet, hasAdditionalInfo, additionalInfoStartIndex, currentLocalQuestionNumber]);

  const visibleAdditionalInfoBlocks = useMemo(() => {
    if (!questionSet || !hasAdditionalInfo) return [];
    return questionSet.stem
      .slice(additionalInfoStartIndex)
      .filter(
        (block) =>
          !block.revealAtQuestion ||
          block.revealAtQuestion <= currentLocalQuestionNumber,
      );
  }, [questionSet, hasAdditionalInfo, additionalInfoStartIndex, currentLocalQuestionNumber]);

  const visibleStemBlocks =
    activeStemTab === "additional" ? visibleAdditionalInfoBlocks : visiblePassageBlocks;

  // Reset to the passage tab whenever a new question set comes into view.
  useEffect(() => {
    setActiveStemTab("passage");
  }, [questionSet?.id]);

  function handleSelectAdditionalInfoTab() {
    if (!isAdditionalInfoUnlocked || !questionSet) return;
    setActiveStemTab("additional");
    setSeenAdditionalInfoSetIds((prev) => new Set(prev).add(questionSet.id));
  }

  function toggleBookmark(questionId: string) {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      next.has(questionId) ? next.delete(questionId) : next.add(questionId);
      return next;
    });
  }

  const selectedOptionIndex = useMemo(() => {
    if (!currentQuestion || !questionSet) {
      return undefined;
    }

    return selectedByQuestionId[answerKey(questionSet.id, currentQuestion.id)];
  }, [currentQuestion, questionSet, selectedByQuestionId]);

  const isComplete =
    questions.length > 0 && currentQuestionIndex >= questions.length;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-muted-foreground">Loading practice session...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (questionSets.length === 0) {
    return (
      <DashboardLayout>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-2xl font-semibold text-foreground mb-3">
            No question set is available for this topic yet
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            {error instanceof Error
              ? error.message
              : "Add one question set using POST /api/practice/content, then start practice again."}
          </p>
          <Button
            variant="outline"
            onClick={() => setLocation(`/dashboard/practice/${categoryId}`)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Topic
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  function handleSelectOption(optionIndex: number) {
    if (!currentQuestion || !questionSet) return;

    setSelectedByQuestionId((prev) => ({
      ...prev,
      [answerKey(questionSet.id, currentQuestion.id)]: optionIndex,
    }));

    recordAnswerMutation.mutate({
      categoryId: String(categoryId),
      subcategoryId: String(subcategoryId),
      questionKey: `${questionSet.id}:${currentQuestion.id}`,
      isCorrect: optionIndex === currentQuestion.correctOptionIndex,
      selectedOptionIndex: optionIndex,
    });
  }

  function handleNext() {
    if (currentQuestionIndex >= questions.length - 1) {
      setShowPreFinish(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }

  function handlePrevious() {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  }

  function handleSaveAndExit() {
    setLocation(`/dashboard/practice/${categoryId}`);
  }

  function handleSubmitReport(
    targetSet: { id: number } | undefined,
    targetQuestionId: string | undefined,
  ) {
    if (!targetSet || !targetQuestionId || !reportMessage.trim()) return;

    reportQuestionMutation.mutate(
      {
        categoryId: String(categoryId),
        subcategoryId: String(subcategoryId),
        questionSetId: targetSet.id,
        questionId: targetQuestionId,
        message: reportMessage.trim(),
      },
      {
        onSuccess: () => {
          toast({ title: "Thanks — we'll review this question." });
          setReportDialogOpen(false);
          setReportMessage("");
        },
        onError: (err) => {
          toast({
            title: "Could not submit report",
            description: err instanceof Error ? err.message : "Please try again.",
            variant: "destructive",
          });
        },
      },
    );
  }

  if (showPreFinish) {
    const answeredCount = Object.keys(selectedByQuestionId).length;
    return (
      <DashboardLayout>
        <div className="min-h-[calc(100vh-4rem)] flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
            <div className="w-full max-w-2xl">
              <h1 className="text-2xl font-bold text-primary text-center mb-8 tracking-wide uppercase">
                Healthcare Educate
              </h1>
              <p className="text-xl font-semibold text-primary mb-6">
                You are about to complete your practice session.
              </p>
              <div className="rounded border border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-700 px-5 py-4 mb-6 text-foreground">
                You have answered {answeredCount} out of {questions.length} question{questions.length !== 1 ? "s" : ""}.
              </div>
              <p className="text-sm text-foreground/80 mb-4">
                If you would like to go back to answer any questions you may have missed, or to change any of your selected answers, please click &apos;Go Back&apos;.
              </p>
              <p className="text-sm text-foreground/80">
                Click &quot;Finish&quot; to mark your work.
              </p>
            </div>
          </div>
          <div className="sticky bottom-0 border-t border-border bg-muted/60 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
            <Button
              onClick={() => setShowPreFinish(false)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Go Back
            </Button>
            <Button
              onClick={() => {
                setCompletedAt(new Date());
                setShowPreFinish(false);
                setCurrentQuestionIndex(questions.length);
              }}
              className="bg-green-700 hover:bg-green-800 text-white"
            >
              Finish
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isComplete) {
    const answeredCount = Object.keys(selectedByQuestionId).length;
    const correctCount = sessionQuestions.filter((entry) => {
      const set = questionSets[entry.setIndex];
      return (
        selectedByQuestionId[answerKey(set.id, entry.question.id)] ===
        entry.question.correctOptionIndex
      );
    }).length;
    const categoryLabel = (categoryId ?? "")
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const completedLabel = completedAt
      ? completedAt.toLocaleDateString("en-AU", {
          weekday: "short",
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    return (
      <DashboardLayout>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-8 items-start">
            {/* Main */}
            <div>
              <button
                onClick={() => setLocation(`/dashboard/practice/${categoryId}`)}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-3"
              >
                <ArrowLeft className="w-4 h-4" />
                Practice history
              </button>
              <h1 className="text-3xl font-bold text-foreground mb-1">
                Untimed Practice Results
              </h1>
              {completedLabel && (
                <p className="text-sm text-muted-foreground mb-5">
                  Completed {completedLabel}
                </p>
              )}
              <Button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setShowFullStem(false);
                  setShowExplanation(true);
                  setIsReviewMode(true);
                }}
                className="mb-8"
              >
                Review All Questions
              </Button>

              <div className="flex flex-wrap gap-2">
                {sessionQuestions.map((entry, idx) => {
                  const set = questionSets[entry.setIndex];
                  const sel = selectedByQuestionId[answerKey(set.id, entry.question.id)];
                  const isCorrect = sel === entry.question.correctOptionIndex;
                  const isWrong = sel !== undefined && !isCorrect;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentQuestionIndex(idx);
                        setShowFullStem(false);
                        setShowExplanation(true);
                        setIsReviewMode(true);
                      }}
                      className={`w-11 h-11 rounded text-sm font-medium border transition-colors flex items-center justify-center text-white ${
                        isCorrect
                          ? "bg-green-600 border-green-600"
                          : isWrong
                          ? "bg-red-600 border-red-600"
                          : "bg-muted border-border text-foreground"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className="rounded-lg border border-border bg-card p-5">
              <h3 className="text-base font-semibold text-foreground mb-4">
                Practice results
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <FlaskConical className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">
                  {categoryLabel}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground mb-2">
                {correctCount}
                <span className="text-base font-normal text-muted-foreground">
                  /{questions.length} correct
                </span>
              </p>
              <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{
                    width: `${questions.length > 0 ? (correctCount / questions.length) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (isReviewMode) {
    const reviewEntry = sessionQuestions[currentQuestionIndex];
    const reviewSet = reviewEntry ? questionSets[reviewEntry.setIndex] : undefined;
    const reviewQuestion = reviewEntry?.question;
    const reviewKey =
      reviewSet && reviewQuestion
        ? answerKey(reviewSet.id, reviewQuestion.id)
        : undefined;
    const reviewSelected = reviewKey ? selectedByQuestionId[reviewKey] : undefined;
    const reviewCorrect = reviewQuestion ? reviewQuestion.correctOptionIndex : -1;
    const optionLabels = ["A", "B", "C", "D", "E"];
    const isCurrentCorrect = reviewSelected === reviewCorrect;
    const isCurrentWrong = reviewSelected !== undefined && !isCurrentCorrect;
    const categoryLabel = (categoryId ?? "")
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

    return (
      <DashboardLayout>
        <div
          className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3 practice-protected"
          onContextMenu={(event) => event.preventDefault()}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => {
                  setIsReviewMode(false);
                  setCurrentQuestionIndex(questions.length);
                }}
                className="p-1 hover:bg-muted rounded transition-colors"
                aria-label="Exit review"
              >
                <X className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium text-foreground">Untimed Practice</span>
            </div>
            <button className="flex items-center gap-1.5 text-sm text-foreground border border-border rounded px-3 py-1.5 hover:bg-muted transition-colors">
              <Navigation className="w-4 h-4" />
              Navigator
            </button>
          </div>

          {/* Question navigator row */}
          <div className="flex flex-wrap gap-1.5 pb-1 border-b border-border">
            {sessionQuestions.map((entry, idx) => {
              const set = questionSets[entry.setIndex];
              const sel = selectedByQuestionId[answerKey(set.id, entry.question.id)];
              const correct = sel === entry.question.correctOptionIndex;
              const wrong = sel !== undefined && !correct;
              const isCurrent = idx === currentQuestionIndex;
              return (
                <button
                  key={idx}
                  onClick={() => { setCurrentQuestionIndex(idx); setShowFullStem(false); }}
                  className={`w-10 h-10 rounded text-sm font-medium transition-colors flex items-center justify-center outline-none ${
                    isCurrent ? "ring-2 ring-offset-1 ring-primary ring-offset-background" : ""
                  } ${
                    correct
                      ? "bg-green-600 text-white"
                      : wrong
                      ? "bg-red-700 text-white"
                      : "bg-muted text-foreground border border-border"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Main two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
            {/* Left column */}
            <div className="space-y-4">
              {/* Question header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-foreground">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <button
                    onClick={() => reviewKey && toggleBookmark(reviewKey)}
                    className="p-0.5 rounded hover:bg-muted transition-colors"
                    aria-label="Bookmark"
                  >
                    <Bookmark
                      className={`w-4 h-4 transition-colors ${
                        reviewKey && bookmarkedIds.has(reviewKey)
                          ? "fill-amber-500 text-amber-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  </button>
                  {isCurrentCorrect && (
                    <span className="flex items-center gap-1 text-xs font-medium text-green-600 border border-green-600/40 bg-green-600/10 rounded px-2 py-0.5">
                      <CircleCheck className="w-3.5 h-3.5" /> Correct
                    </span>
                  )}
                  {isCurrentWrong && (
                    <span className="flex items-center gap-1 text-xs font-medium text-red-600 border border-red-600/40 bg-red-600/10 rounded px-2 py-0.5">
                      <CircleX className="w-3.5 h-3.5" /> Incorrect
                    </span>
                  )}
                  {reviewSelected === undefined && (
                    <span className="text-xs font-medium text-muted-foreground border border-border rounded px-2 py-0.5">
                      Not answered
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))}
                    disabled={currentQuestionIndex === 0}
                    className="p-1.5 rounded border border-border hover:bg-muted disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentQuestionIndex((prev) => Math.min(prev + 1, questions.length - 1))}
                    disabled={currentQuestionIndex >= questions.length - 1}
                    className="p-1.5 rounded border border-border hover:bg-muted disabled:opacity-30 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Stem (collapsible) */}
              {reviewSet && (
                <div className="text-sm text-foreground/90 leading-relaxed">
                  <div className={`${showFullStem ? "" : "max-h-72 overflow-hidden relative"}`}>
                    <StemBlockRenderer blocks={reviewSet.stem} />
                    {!showFullStem && (
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                    )}
                  </div>
                  <button
                    onClick={() => setShowFullStem((prev) => !prev)}
                    className="mt-1 text-sm text-primary hover:underline"
                  >
                    {showFullStem ? "Show less" : "Show more"}
                  </button>
                </div>
              )}

              {/* Question prompt */}
              {reviewQuestion && (
                <div className="rounded border border-border/50 bg-muted/30 px-4 py-3 text-sm text-foreground">
                  <MathText text={reviewQuestion.prompt} />
                </div>
              )}

              {/* Per-question content blocks */}
              {reviewQuestion?.contentBlocks && reviewQuestion.contentBlocks.length > 0 && (
                <StemBlockRenderer blocks={reviewQuestion.contentBlocks} compact />
              )}

              {/* Options */}
              {reviewQuestion && (
                <div className="space-y-1.5">
                  {reviewQuestion.options.map((option, optionIndex) => {
                    const isCorrectOpt = optionIndex === reviewCorrect;
                    const isStudentWrong = optionIndex === reviewSelected && !isCorrectOpt;
                    const isStudentCorrect = optionIndex === reviewSelected && isCorrectOpt;
                    return (
                      <div key={optionIndex} className="flex items-center gap-3 py-1">
                        {/* Icon */}
                        {isCorrectOpt ? (
                          <CircleCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : isStudentWrong ? (
                          <CircleX className="w-5 h-5 text-red-600 flex-shrink-0" />
                        ) : (
                          <span className="w-5 h-5 rounded-full border-2 border-muted-foreground/40 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${isStudentCorrect || isCorrectOpt ? "text-green-600 font-medium" : isStudentWrong ? "text-red-600" : "text-foreground"}`}>
                          {optionLabels[optionIndex]}. <MathText text={option} />
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right sidebar */}
            <aside className="space-y-4 sticky top-6 self-start">
              {/* Explanation card */}
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">Explanation</h3>
                  <div className="flex items-center gap-2">
                    <button className="p-1 rounded hover:bg-muted transition-colors" aria-label="Helpful">
                      <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="p-1 rounded hover:bg-muted transition-colors" aria-label="Not helpful">
                      <ThumbsDown className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => setReportDialogOpen(true)}
                      className="flex items-center gap-1 text-xs text-muted-foreground border border-border rounded px-2 py-1 hover:bg-muted transition-colors"
                    >
                      <Flag className="w-3.5 h-3.5" />
                      Report problem
                    </button>
                  </div>
                </div>
                {showExplanation && (
                  reviewQuestion?.workedSolution ? (
                    <div className="space-y-4 mb-4">
                      {reviewQuestion.workedSolution.strategy && (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                            Strategy
                          </p>
                          <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line">
                            <MathText text={reviewQuestion.workedSolution.strategy} />
                          </p>
                        </div>
                      )}
                      {reviewQuestion.workedSolution.steps.map((step, stepIndex) => (
                        <div key={stepIndex}>
                          <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">
                            {step.heading}
                          </p>
                          <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line">
                            <MathText text={step.body} />
                          </p>
                        </div>
                      ))}
                      {reviewQuestion.workedSolution.eliminations &&
                        reviewQuestion.workedSolution.eliminations.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                              Eliminations
                            </p>
                            <ul className="space-y-1.5">
                              {reviewQuestion.workedSolution.eliminations.map(
                                (elimination, elimIndex) => (
                                  <li
                                    key={elimIndex}
                                    className="text-sm text-foreground/85 leading-relaxed"
                                  >
                                    <span className="font-medium">{elimination.option}</span>
                                    {" — "}
                                    <MathText text={elimination.reason} />
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}
                      <div className="rounded-md bg-primary/5 border border-primary/20 px-3 py-2">
                        <p className="text-sm font-semibold text-foreground">
                          <MathText text={`Answer: ${reviewQuestion.workedSolution.answer}`} />
                        </p>
                      </div>
                    </div>
                  ) : reviewQuestion?.explanation ? (
                    <p className="text-sm text-foreground/85 leading-relaxed mb-4">
                      <MathText text={reviewQuestion.explanation} />
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground italic mb-4">No explanation available.</p>
                  )
                )}
                <button
                  onClick={() => setShowExplanation((prev) => !prev)}
                  className="w-full border border-border rounded py-2 text-sm text-foreground hover:bg-muted transition-colors"
                >
                  {showExplanation ? "Hide" : "Show"} answers &amp; explanations
                </button>
              </div>

              {/* Question details */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="text-sm font-semibold text-foreground mb-3">Question details</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subject</span>
                  <span className="text-foreground font-medium">{categoryLabel}</span>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report a problem with this question</DialogTitle>
            </DialogHeader>
            <Textarea
              value={reportMessage}
              onChange={(event) => setReportMessage(event.target.value)}
              placeholder="What's wrong with this question? (e.g. wrong answer, unclear stem, broken image)"
              rows={4}
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setReportDialogOpen(false)}
                disabled={reportQuestionMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleSubmitReport(reviewSet, reviewQuestion?.id)}
                disabled={!reportMessage.trim() || reportQuestionMutation.isPending}
              >
                {reportQuestionMutation.isPending ? "Submitting..." : "Submit report"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
    );
  }

  if (!questionSet || !currentQuestion) {
    return null;
  }

  return (
    <DashboardLayout>
      <div
        className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4 practice-protected"
        onContextMenu={(event) => event.preventDefault()}
      >
        <div className="bg-green-600 text-white rounded-md px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm font-medium">
            <button
              onClick={() => setLocation(`/dashboard/practice/${categoryId}`)}
              className="rounded-sm bg-white/20 p-1 hover:bg-white/30 transition-colors"
              aria-label="Close session"
            >
              <X className="w-4 h-4" />
            </button>
            <span>Practice Session - {questionSet.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs opacity-90">
              Question set {(currentEntry?.setIndex ?? 0) + 1} of {questionSets.length}
            </span>
            <button
              onClick={handleSaveAndExit}
              className="flex items-center gap-1.5 text-xs font-medium bg-white/20 hover:bg-white/30 rounded px-2.5 py-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Save &amp; Exit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
          <section className="bg-card border border-border/60 rounded-lg p-5 min-h-[70vh]">
            <div className="relative mb-4">
              <button
                onClick={() => setShowNavigator((prev) => !prev)}
                className="flex items-center gap-1.5 text-2xl font-semibold hover:text-primary/80 transition-colors"
              >
                Question {currentQuestionIndex + 1}
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${showNavigator ? "rotate-180" : ""}`}
                />
              </button>
              {showNavigator && (
                <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded-lg shadow-lg p-3 z-20 min-w-fit">
                  <p className="text-xs text-muted-foreground mb-2 font-medium">
                    {questionSet.title}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {sessionQuestions.map((entry, idx) => {
                      const set = questionSets[entry.setIndex];
                      const key = answerKey(set.id, entry.question.id);
                      const isCurrent = idx === currentQuestionIndex;
                      const isAnswered = selectedByQuestionId[key] !== undefined;
                      const isBookmarked = bookmarkedIds.has(key);
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setCurrentQuestionIndex(idx);
                            setShowNavigator(false);
                          }}
                          className={`relative flex-shrink-0 w-11 h-11 rounded text-sm font-medium border transition-colors flex items-center justify-center ${
                            isCurrent
                              ? "bg-primary border-primary text-white"
                              : isAnswered
                              ? "border-primary/40 bg-primary/10 text-primary"
                              : "border-border text-foreground hover:border-primary/40"
                          }`}
                        >
                          {idx + 1}
                          {isBookmarked && (
                            <span className="absolute -top-1 -right-1">
                              <Bookmark className="w-3 h-3 fill-amber-500 text-amber-500" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => {
                        setCurrentQuestionIndex(questions.length - 1);
                        setShowNavigator(false);
                      }}
                      className="flex-shrink-0 h-11 px-4 rounded text-sm font-medium border border-border text-foreground hover:border-primary/40 transition-colors flex items-center justify-center"
                    >
                      End
                    </button>
                  </div>
                </div>
              )}
            </div>
            {hasAdditionalInfo && (
              <div className="flex items-center gap-1 mb-4 border-b border-border">
                <button
                  onClick={() => setActiveStemTab("passage")}
                  className={`px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                    activeStemTab === "passage"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Passage
                </button>
                <button
                  onClick={handleSelectAdditionalInfoTab}
                  disabled={!isAdditionalInfoUnlocked}
                  className={`relative flex items-center gap-1.5 px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                    !isAdditionalInfoUnlocked
                      ? "border-transparent text-muted-foreground/40 cursor-not-allowed"
                      : activeStemTab === "additional"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {!isAdditionalInfoUnlocked && <Lock className="w-3 h-3" />}
                  Additional Information
                  {!isAdditionalInfoUnlocked ? (
                    <span className="text-[10px] text-muted-foreground/70">
                      (unlocks at Q{additionalInfoUnlockQuestion})
                    </span>
                  ) : (
                    questionSet &&
                    !seenAdditionalInfoSetIds.has(questionSet.id) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    )
                  )}
                </button>
              </div>
            )}
            <StemBlockRenderer blocks={visibleStemBlocks} />
          </section>

          <aside className="bg-card border border-border/60 rounded-lg p-4 sticky top-6 self-start">
            <div className="flex items-start justify-between gap-2 rounded-lg border border-border/50 bg-muted/40 px-3 py-3">
              <p className="text-base font-medium leading-6 text-foreground/95">
                <MathText text={currentQuestion.prompt} />
              </p>
              <button
                onClick={() =>
                  toggleBookmark(answerKey(questionSet.id, currentQuestion.id))
                }
                className="flex-shrink-0 p-0.5 rounded hover:bg-muted/60 transition-colors"
                aria-label={
                  bookmarkedIds.has(answerKey(questionSet.id, currentQuestion.id))
                    ? "Remove bookmark"
                    : "Bookmark question"
                }
              >
                <Bookmark
                  className={`w-5 h-5 transition-colors ${
                    bookmarkedIds.has(answerKey(questionSet.id, currentQuestion.id))
                      ? "fill-amber-500 text-amber-500"
                      : "text-primary/70"
                  }`}
                />
              </button>
            </div>

            {currentQuestion.contentBlocks &&
              currentQuestion.contentBlocks.length > 0 && (
                <div className="mt-4">
                  <StemBlockRenderer
                    blocks={currentQuestion.contentBlocks}
                    compact
                  />
                </div>
              )}

            <div className="mt-4 lg:sticky lg:top-4 bg-card/95 backdrop-blur-sm">
              <div className="space-y-2">
                {currentQuestion.options.map((option, optionIndex) => {
                  const isSelected = selectedOptionIndex === optionIndex;

                  return (
                    <button
                      key={`${currentQuestion.id}-option-${optionIndex}`}
                      onClick={() => handleSelectOption(optionIndex)}
                      className={`w-full text-left border rounded-lg px-3 py-2 transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border/60 hover:border-primary/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className={`h-5 w-5 flex-shrink-0 aspect-square rounded-full border-2 flex items-center justify-center transition-colors ${
                            isSelected
                              ? "border-primary"
                              : "border-muted-foreground/50"
                          }`}
                        >
                          {isSelected && (
                            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                          )}
                        </span>
                        <span className="text-sm"><MathText text={option} /></span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex justify-end">
                <Button
                  variant="outline"
                  disabled={currentQuestionIndex === 0}
                  onClick={handlePrevious}
                  className="mr-2"
                >
                  Previous
                </Button>
                <Button
                  disabled={selectedOptionIndex === undefined}
                  onClick={handleNext}
                  className="bg-primary hover:bg-primary/90"
                >
                  Next
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}
