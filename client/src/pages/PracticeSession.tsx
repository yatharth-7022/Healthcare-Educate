import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams, useSearch } from "wouter";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  usePracticeSessionQuestionSet,
  useRecordPracticeAnswer,
} from "@/hooks/use-practice-progress";
import { StemBlockRenderer } from "@/components/practice/StemBlockRenderer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bookmark, ChevronDown, ChevronLeft, ChevronRight, CircleCheck, CircleX, Flag, FlaskConical, Info, Navigation, ThumbsDown, ThumbsUp, X } from "lucide-react";
import { MathText } from "@/components/practice/MathText";

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
  );
  const recordAnswerMutation = useRecordPracticeAnswer(categoryId);

  const questionSet = data?.questionSet;
  const questions = questionSet?.questions ?? [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedByQuestionId, setSelectedByQuestionId] = useState<
    Record<string, number>
  >({});
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [showNavigator, setShowNavigator] = useState(false);
  const [additionalInfoBanner, setAdditionalInfoBanner] = useState(false);
  const [showPreFinish, setShowPreFinish] = useState(false);
  const [completedAt, setCompletedAt] = useState<Date | null>(null);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);
  const [showFullStem, setShowFullStem] = useState(false);

  const currentQuestionNumber = currentQuestionIndex + 1;

  const visibleStemBlocks = useMemo(() => {
    if (!questionSet) return [];
    return questionSet.stem.filter(
      (block) => !block.revealAtQuestion || block.revealAtQuestion <= currentQuestionNumber,
    );
  }, [questionSet, currentQuestionNumber]);

  useEffect(() => {
    if (!questionSet) return;
    const unlocks = questionSet.stem.some(
      (block) => block.revealAtQuestion === currentQuestionNumber,
    );
    if (unlocks) setAdditionalInfoBanner(true);
  }, [currentQuestionIndex, questionSet, currentQuestionNumber]);

  function toggleBookmark(questionId: string) {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      next.has(questionId) ? next.delete(questionId) : next.add(questionId);
      return next;
    });
  }

  const currentQuestion = questions[currentQuestionIndex];

  const selectedOptionIndex = useMemo(() => {
    if (!currentQuestion) {
      return undefined;
    }

    return selectedByQuestionId[currentQuestion.id];
  }, [currentQuestion, selectedByQuestionId]);

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

  if (!questionSet) {
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

  async function handleNext() {
    if (!questionSet || !currentQuestion || selectedOptionIndex === undefined) {
      return;
    }

    try {
      await recordAnswerMutation.mutateAsync({
        categoryId: String(categoryId),
        subcategoryId: String(subcategoryId),
        questionKey: `${questionSet.id}:${currentQuestion.id}`,
        isCorrect: selectedOptionIndex === currentQuestion.correctOptionIndex,
      });
    } finally {
      if (currentQuestionIndex >= questions.length - 1) {
        setShowPreFinish(true);
      } else {
        setCurrentQuestionIndex((prev) => prev + 1);
      }
    }
  }

  function handlePrevious() {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
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
    const correctCount = questions.filter(
      (q) => selectedByQuestionId[q.id] === q.correctOptionIndex,
    ).length;
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
                {questions.map((q, idx) => {
                  const sel = selectedByQuestionId[q.id];
                  const isCorrect = sel === q.correctOptionIndex;
                  const isWrong = sel !== undefined && !isCorrect;
                  return (
                    <button
                      key={q.id}
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
    const reviewQuestion = questions[currentQuestionIndex];
    const reviewSelected = reviewQuestion ? selectedByQuestionId[reviewQuestion.id] : undefined;
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
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
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
            {questions.map((q, idx) => {
              const sel = selectedByQuestionId[q.id];
              const correct = sel === q.correctOptionIndex;
              const wrong = sel !== undefined && !correct;
              const isCurrent = idx === currentQuestionIndex;
              return (
                <button
                  key={q.id}
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
                    onClick={() => reviewQuestion && toggleBookmark(reviewQuestion.id)}
                    className="p-0.5 rounded hover:bg-muted transition-colors"
                    aria-label="Bookmark"
                  >
                    <Bookmark
                      className={`w-4 h-4 transition-colors ${
                        reviewQuestion && bookmarkedIds.has(reviewQuestion.id)
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
              <div className="text-sm text-foreground/90 leading-relaxed">
                <div className={`${showFullStem ? "" : "max-h-72 overflow-hidden relative"}`}>
                  <StemBlockRenderer blocks={questionSet.stem} />
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
                    <button className="flex items-center gap-1 text-xs text-muted-foreground border border-border rounded px-2 py-1 hover:bg-muted transition-colors">
                      <Flag className="w-3.5 h-3.5" />
                      Report problem
                    </button>
                  </div>
                </div>
                {showExplanation && (
                  reviewQuestion?.explanation ? (
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
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
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
          <span className="text-xs opacity-90">
            Requested sets: {requestedSets}
          </span>
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
                    {questions.map((q, idx) => {
                      const isCurrent = idx === currentQuestionIndex;
                      const isAnswered = selectedByQuestionId[q.id] !== undefined;
                      const isBookmarked = bookmarkedIds.has(q.id);
                      return (
                        <button
                          key={q.id}
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
            {additionalInfoBanner && (
              <div className="flex items-center gap-2 rounded-lg border border-blue-400/50 bg-blue-50 dark:bg-blue-950/30 px-3 py-2 mb-4 text-sm text-blue-700 dark:text-blue-300">
                <Info className="w-4 h-4 flex-shrink-0" />
                <span className="flex-1">Additional information is now available in the passage below.</span>
                <button
                  onClick={() => setAdditionalInfoBanner(false)}
                  className="flex-shrink-0 hover:opacity-70 transition-opacity"
                  aria-label="Dismiss"
                >
                  <X className="w-3.5 h-3.5" />
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
                onClick={() => toggleBookmark(currentQuestion.id)}
                className="flex-shrink-0 p-0.5 rounded hover:bg-muted/60 transition-colors"
                aria-label={bookmarkedIds.has(currentQuestion.id) ? "Remove bookmark" : "Bookmark question"}
              >
                <Bookmark
                  className={`w-5 h-5 transition-colors ${
                    bookmarkedIds.has(currentQuestion.id)
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
                      onClick={() =>
                        setSelectedByQuestionId((prev) => ({
                          ...prev,
                          [currentQuestion.id]: optionIndex,
                        }))
                      }
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
                  disabled={
                    currentQuestionIndex === 0 || recordAnswerMutation.isPending
                  }
                  onClick={handlePrevious}
                  className="mr-2"
                >
                  Previous
                </Button>
                <Button
                  disabled={
                    selectedOptionIndex === undefined ||
                    recordAnswerMutation.isPending
                  }
                  onClick={handleNext}
                  className="bg-primary hover:bg-primary/90"
                >
                  {recordAnswerMutation.isPending ? "Saving..." : "Next"}
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}
