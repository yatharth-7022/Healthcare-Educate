import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  usePracticeCategoryProgress,
  useRecordPracticeAnswer,
} from "@/hooks/use-practice-progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen,
  FlaskConical,
  Atom,
  Dna,
  Zap,
  ChevronRight,
  ArrowLeft,
  Lock,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  humanities: BookOpen,
  "general-chemistry": FlaskConical,
  "organic-chemistry": Atom,
  biology: Dna,
  physics: Zap,
};

function ProgressBar({
  value,
  disabled,
}: {
  value: number;
  disabled?: boolean;
}) {
  return (
    <div className="w-full h-1.5 bg-border/60 rounded-full overflow-hidden">
      {!disabled && (
        <motion.div
          className="h-full bg-primary/60 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      )}
    </div>
  );
}

export default function PracticeCategory() {
  const { category: categoryId } = useParams<{ category: string }>();
  const [, setLocation] = useLocation();
  const { data, isLoading, error } = usePracticeCategoryProgress(categoryId);
  const recordAnswerMutation = useRecordPracticeAnswer(categoryId);
  const { toast } = useToast();
  const showManualRecordButton = import.meta.env.DEV;

  const category = data?.category;

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-muted-foreground">Loading category progress...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!category) {
    return (
      <DashboardLayout>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-muted-foreground">
            {error
              ? "We could not load this category right now."
              : "Category not found."}
          </p>
          <Button
            variant="ghost"
            className="mt-4"
            onClick={() => setLocation("/dashboard/practice")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Practice
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const Icon = categoryIcons[category.id] ?? BookOpen;

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb + Back */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <nav
            className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4"
            data-testid="breadcrumb"
          >
            <button
              onClick={() => setLocation("/dashboard/practice")}
              className="hover:text-foreground transition-colors"
            >
              Practice
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">{category.name}</span>
          </nav>

          <button
            onClick={() => setLocation("/dashboard/practice")}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-5 group"
            data-testid="back-button"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Practice
          </button>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-lg">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {category.name}
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                {category.answeredQuestions} of {category.totalQuestions}{" "}
                questions answered
              </p>
            </div>
          </div>
        </motion.div>

        {/* Subcategory list */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
          className="flex flex-col gap-1"
        >
          {category.subcategories.map((sub, i) => {
            const pct =
              sub.totalQuestions > 0
                ? Math.round((sub.answeredQuestions / sub.totalQuestions) * 100)
                : 0;
            const isComingSoon = !!sub.comingSoon;

            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.3 },
                  },
                }}
              >
                <div
                  data-testid={`subcategory-row-${i}`}
                  className={`w-full text-left flex items-center gap-5 px-5 py-4 rounded-xl border border-transparent transition-colors duration-150 ${
                    isComingSoon
                      ? "opacity-50 cursor-not-allowed"
                      : "group cursor-pointer hover:bg-accent/60 hover:border-border/50"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-medium ${
                            isComingSoon
                              ? "text-muted-foreground"
                              : "text-foreground group-hover:text-primary transition-colors"
                          }`}
                        >
                          {sub.name}
                        </span>
                        {isComingSoon && (
                          <Badge
                            variant="secondary"
                            className="text-[10px] px-1.5 py-0"
                          >
                            Coming soon
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                        {!isComingSoon && (
                          <span className="text-xs text-muted-foreground">
                            {sub.answeredQuestions} / {sub.totalQuestions}{" "}
                            answered
                          </span>
                        )}
                        {!isComingSoon && showManualRecordButton && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={recordAnswerMutation.isPending}
                            onClick={async () => {
                              try {
                                await recordAnswerMutation.mutateAsync({
                                  categoryId: category.id,
                                  subcategoryId: sub.id,
                                  questionKey: `${sub.id}-${Date.now()}`,
                                  isCorrect: true,
                                });
                              } catch (recordError) {
                                toast({
                                  title: "Could not record answer",
                                  description:
                                    recordError instanceof Error
                                      ? recordError.message
                                      : "Please try again.",
                                  variant: "destructive",
                                });
                              }
                            }}
                            className="h-7 px-2 text-[11px]"
                          >
                            {recordAnswerMutation.isPending
                              ? "Saving..."
                              : "+1 answer"}
                          </Button>
                        )}
                      </div>
                    </div>
                    <ProgressBar value={pct} disabled={isComingSoon} />
                  </div>

                  <div className="flex-shrink-0">
                    {isComingSoon ? (
                      <Lock className="w-4 h-4 text-muted-foreground/40" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-muted-foreground/60 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
