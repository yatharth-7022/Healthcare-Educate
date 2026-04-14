import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { usePracticeProgressSummary } from "@/hooks/use-practice-progress";
import {
  BookOpen,
  FlaskConical,
  Atom,
  Dna,
  Zap,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  humanities: BookOpen,
  "general-chemistry": FlaskConical,
  "organic-chemistry": Atom,
  biology: Dna,
  physics: Zap,
};

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-1.5 bg-border/60 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-primary/60 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}

export default function Practice() {
  const [, setLocation] = useLocation();
  const { data, isLoading, error } = usePracticeProgressSummary();

  const categories = data?.categories ?? [];

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <button
            onClick={() => setLocation("/dashboard")}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-5 group"
            data-testid="back-to-dashboard"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back to Dashboard
          </button>

          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
            GAMSAT Preparation
          </p>
          <h1 className="text-3xl font-bold text-foreground">Practice</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Work through question sets across all major GAMSAT subjects.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
          className="flex flex-col gap-1"
        >
          {isLoading && (
            <p className="text-sm text-muted-foreground px-2 py-4">
              Loading your progress...
            </p>
          )}

          {!!error && (
            <p className="text-sm text-red-500 px-2 py-4">
              We could not load your practice progress right now.
            </p>
          )}

          {!isLoading && !error && categories.length === 0 && (
            <p className="text-sm text-muted-foreground px-2 py-4">
              No categories available yet.
            </p>
          )}

          {categories.map((category) => {
            const Icon = categoryIcons[category.id] ?? BookOpen;
            const pct =
              category.totalQuestions > 0
                ? Math.round(
                    (category.answeredQuestions / category.totalQuestions) *
                      100,
                  )
                : 0;

            return (
              <motion.div
                key={category.id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                }}
              >
                <button
                  data-testid={`category-row-${category.id}`}
                  onClick={() =>
                    setLocation(`/dashboard/practice/${category.id}`)
                  }
                  className="w-full text-left group flex items-center gap-5 px-5 py-4 rounded-xl hover:bg-accent/60 transition-colors duration-150 border border-transparent hover:border-border/50"
                >
                  <div className="flex-shrink-0 p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-5 h-5 text-primary/80" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </span>
                      <span className="text-xs text-muted-foreground ml-4 flex-shrink-0">
                        {category.answeredQuestions} / {category.totalQuestions}{" "}
                        questions answered
                      </span>
                    </div>
                    <ProgressBar value={pct} />
                  </div>

                  <ChevronRight className="w-4 h-4 text-muted-foreground/60 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
