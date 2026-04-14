import { useMemo, useState } from "react";
import { useLocation, useParams, useSearch } from "wouter";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  usePracticeSessionQuestionSet,
  useRecordPracticeAnswer,
} from "@/hooks/use-practice-progress";
import { StemBlockRenderer } from "@/components/practice/StemBlockRenderer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bookmark, X } from "lucide-react";

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
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }

  function handlePrevious() {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
  }

  if (isComplete) {
    return (
      <DashboardLayout>
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-semibold text-foreground mb-3">
            Session complete
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            You have completed {questions.length} questions from this set.
          </p>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setLocation(`/dashboard/practice/${categoryId}`)}
              className="bg-primary hover:bg-primary/90"
            >
              Back to Topic
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentQuestionIndex(Math.max(questions.length - 1, 0))}
            >
              Review Questions
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setCurrentQuestionIndex(0);
                setSelectedByQuestionId({});
              }}
            >
              Restart
            </Button>
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
            <h2 className="text-2xl font-semibold mb-4">
              Question {currentQuestionIndex + 1}
            </h2>
            <StemBlockRenderer blocks={questionSet.stem} />
          </section>

          <aside className="bg-card border border-border/60 rounded-lg p-4 sticky top-6">
            <div className="flex items-start justify-between gap-2">
              <p className="text-base font-medium leading-6">
                {currentQuestion.prompt}
              </p>
              <Bookmark className="w-5 h-5 text-primary/70" />
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

            <div className="mt-4 space-y-2">
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
                    <span className="text-sm">{option}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-5 flex justify-end">
              <Button
                variant="outline"
                disabled={currentQuestionIndex === 0 || recordAnswerMutation.isPending}
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
          </aside>
        </div>
      </div>
    </DashboardLayout>
  );
}
