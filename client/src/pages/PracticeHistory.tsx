import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CircleCheck,
  History as HistoryIcon,
  PlayCircle,
  RefreshCw,
} from "lucide-react";
import type { PracticeAttemptSummary } from "@shared/models/practice";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePracticeAttempts } from "@/hooks/use-practice-progress";
import { categoryIcons } from "@/components/practice/categoryIcons";
import { getPracticeSessionPath } from "@/lib/practice-routes";

type Filter = "all" | "IN_PROGRESS" | "COMPLETED";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "COMPLETED", label: "Completed" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AttemptCard({
  attempt,
  onOpen,
}: {
  attempt: PracticeAttemptSummary;
  onOpen: () => void;
}) {
  const Icon = categoryIcons[attempt.categoryId] ?? BookOpen;
  const isCompleted = attempt.status === "COMPLETED";
  const progressPct =
    attempt.totalQuestions > 0
      ? Math.round((attempt.answeredQuestions / attempt.totalQuestions) * 100)
      : 0;
  const scorePct =
    attempt.totalQuestions > 0
      ? Math.round((attempt.correctQuestions / attempt.totalQuestions) * 100)
      : 0;

  return (
    <button
      type="button"
      onClick={onOpen}
      data-testid={`attempt-card-${attempt.id}`}
      className="group w-full text-left rounded-xl border border-border/60 bg-card px-5 py-4 shadow-sm transition-all hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
        <div className="flex items-center gap-4 min-w-0 sm:flex-1">
          <div className="flex-shrink-0 rounded-lg bg-primary/10 p-2.5 transition-colors group-hover:bg-primary/15">
            <Icon className="h-5 w-5 text-primary/80" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <h3 className="truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {attempt.subcategoryName}
              </h3>
              {isCompleted ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-green-600/30 bg-green-600/10 px-2 py-0.5 text-[11px] font-medium text-green-600">
                  <CircleCheck className="h-3 w-3" />
                  Completed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  In progress
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {attempt.categoryName} · Untimed ·{" "}
              {attempt.setsCount}{" "}
              {attempt.setsCount === 1 ? "question set" : "question sets"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground/80">
              {isCompleted && attempt.completedAt
                ? `Completed ${formatDate(attempt.completedAt)}`
                : `Last active ${formatDate(attempt.updatedAt)}`}
            </p>
          </div>
        </div>

        <div className="sm:w-56 flex-shrink-0">
          {isCompleted ? (
            <>
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="text-lg font-bold text-foreground">
                  {attempt.correctQuestions}
                  <span className="text-sm font-normal text-muted-foreground">
                    /{attempt.totalQuestions} correct
                  </span>
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  {scorePct}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/60">
                <div
                  className="h-full rounded-full bg-green-600"
                  style={{ width: `${scorePct}%` }}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-muted-foreground">
                {attempt.answeredQuestions} of {attempt.totalQuestions} attempted
              </p>
            </>
          ) : (
            <>
              <div className="mb-1.5 flex items-baseline justify-between">
                <span className="text-sm font-semibold text-foreground">
                  {attempt.answeredQuestions}
                  <span className="font-normal text-muted-foreground">
                    /{attempt.totalQuestions} answered
                  </span>
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  {progressPct}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-border/60">
                <div
                  className="h-full rounded-full bg-primary/70"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <p className="mt-1.5 text-[11px] text-muted-foreground">
                {attempt.totalQuestions - attempt.answeredQuestions} remaining
              </p>
            </>
          )}
        </div>

        <span
          className={`inline-flex flex-shrink-0 items-center justify-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
            isCompleted
              ? "border border-border text-foreground group-hover:bg-muted"
              : "bg-primary text-white group-hover:bg-primary/90"
          }`}
        >
          {isCompleted ? (
            <>
              Review attempt
              <ArrowRight className="h-4 w-4" />
            </>
          ) : (
            <>
              <PlayCircle className="h-4 w-4" />
              Continue attempt
            </>
          )}
        </span>
      </div>
    </button>
  );
}

function AttemptSkeleton() {
  return (
    <div className="rounded-xl border border-border/60 bg-card px-5 py-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-64 max-w-full" />
        </div>
        <Skeleton className="hidden h-9 w-36 sm:block" />
      </div>
    </div>
  );
}

export default function PracticeHistory() {
  const [, setLocation] = useLocation();
  const { data, isLoading, error, refetch, isFetching } = usePracticeAttempts();
  const [filter, setFilter] = useState<Filter>("all");

  const attempts = useMemo(() => data?.attempts ?? [], [data]);
  const inProgressCount = attempts.filter(
    (attempt) => attempt.status === "IN_PROGRESS",
  ).length;
  const completedCount = attempts.length - inProgressCount;

  const visibleAttempts = useMemo(
    () =>
      filter === "all"
        ? attempts
        : attempts.filter((attempt) => attempt.status === filter),
    [attempts, filter],
  );

  const counts: Record<Filter, number> = {
    all: attempts.length,
    IN_PROGRESS: inProgressCount,
    COMPLETED: completedCount,
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1000px] px-4 py-10 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <button
            onClick={() => setLocation("/dashboard")}
            className="group mb-6 flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            Back to Dashboard
          </button>
          <p className="mb-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            GAMSAT Preparation
          </p>
          <h1 className="text-3xl font-bold text-foreground">
            Practice history
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pick up unfinished attempts or review the ones you have completed.
          </p>
        </motion.div>

        {!isLoading && !error && attempts.length > 0 && (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div
              role="tablist"
              aria-label="Filter attempts"
              className="inline-flex rounded-lg border border-border/60 bg-muted/40 p-1"
            >
              {FILTERS.map((item) => (
                <button
                  key={item.value}
                  role="tab"
                  aria-selected={filter === item.value}
                  onClick={() => setFilter(item.value)}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    filter === item.value
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <span className="ml-1.5 text-xs text-muted-foreground">
                    {counts[item.value]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="space-y-3" aria-label="Loading attempts">
            <AttemptSkeleton />
            <AttemptSkeleton />
            <AttemptSkeleton />
          </div>
        )}

        {!isLoading && error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-10 text-center">
            <p className="text-sm font-medium text-foreground">
              We could not load your practice history.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {error instanceof Error ? error.message : "Please try again."}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try again
            </Button>
          </div>
        )}

        {!isLoading && !error && attempts.length === 0 && (
          <div className="rounded-xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <HistoryIcon className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              No attempts yet
            </h2>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
              Start a practice session and it will show up here so you can
              resume it or review your answers later.
            </p>
            <Button
              className="mt-6"
              onClick={() => setLocation("/dashboard/practice")}
            >
              Start practising
            </Button>
          </div>
        )}

        {!isLoading &&
          !error &&
          attempts.length > 0 &&
          visibleAttempts.length === 0 && (
            <p className="rounded-xl border border-dashed border-border px-6 py-12 text-center text-sm text-muted-foreground">
              No {filter === "IN_PROGRESS" ? "in-progress" : "completed"}{" "}
              attempts.
            </p>
          )}

        {!isLoading && !error && visibleAttempts.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } },
            }}
            className="space-y-3"
          >
            {visibleAttempts.map((attempt) => (
              <motion.div
                key={attempt.id}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                }}
              >
                <AttemptCard
                  attempt={attempt}
                  onOpen={() =>
                    setLocation(
                      getPracticeSessionPath(
                        attempt.categoryId,
                        attempt.subcategoryId,
                        attempt.setsCount,
                        attempt.id,
                      ),
                    )
                  }
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
