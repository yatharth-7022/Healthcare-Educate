import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { getCategoryById, getSubcategoryById } from "@/data/practiceData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight, Layers } from "lucide-react";

export default function PracticeSetup() {
  const { category: categoryId, subcategory: subcategoryId } = useParams<{
    category: string;
    subcategory: string;
  }>();
  const [, setLocation] = useLocation();
  const [selected, setSelected] = useState<number | null>(null);

  const category = getCategoryById(categoryId ?? "");
  const subcategory = getSubcategoryById(categoryId ?? "", subcategoryId ?? "");

  if (!category || !subcategory) {
    return (
      <DashboardLayout>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-muted-foreground">Topic not found.</p>
          <Button
            variant="ghost"
            className="mt-4"
            onClick={() => setLocation(`/dashboard/practice/${categoryId}`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const counts = Array.from({ length: 10 }, (_, i) => i + 1);

  function handleContinue() {
    if (!selected) return;
    setLocation(
      `/dashboard/practice/${categoryId}/${subcategoryId}/confirm?sets=${selected}`
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back + breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
            <button
              onClick={() => setLocation("/dashboard/practice")}
              className="hover:text-foreground transition-colors"
            >
              Practice
            </button>
            <ChevronRight className="w-3 h-3" />
            <button
              onClick={() =>
                setLocation(`/dashboard/practice/${categoryId}`)
              }
              className="hover:text-foreground transition-colors"
            >
              {category.name}
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">
              {subcategory.name}
            </span>
          </nav>

          <button
            onClick={() =>
              setLocation(`/dashboard/practice/${categoryId}`)
            }
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group"
            data-testid="back-button"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-foreground">
            Untimed practice
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Question numbers per set will vary by section and topic.
          </p>
        </motion.div>

        {/* Question set list */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.04 } },
          }}
          className="flex flex-col gap-1 mb-8"
        >
          {counts.map((count) => {
            const isSelected = selected === count;
            return (
              <motion.div
                key={count}
                variants={{
                  hidden: { opacity: 0, y: 6 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
                }}
              >
                <button
                  data-testid={`set-option-${count}`}
                  onClick={() => setSelected(count)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border transition-all duration-150 text-left group ${
                    isSelected
                      ? "bg-primary/10 border-primary/30 shadow-sm"
                      : "border-transparent hover:bg-accent/60 hover:border-border/50"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                      isSelected ? "bg-primary/15" : "bg-muted/60 group-hover:bg-muted"
                    }`}
                  >
                    <Layers
                      className={`w-4 h-4 transition-colors ${
                        isSelected
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium transition-colors ${
                      isSelected
                        ? "text-primary"
                        : "text-foreground group-hover:text-foreground"
                    }`}
                  >
                    {count} {count === 1 ? "question set" : "question sets"}
                  </span>
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Continue button */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: selected ? 1 : 0.4, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            onClick={handleContinue}
            disabled={!selected}
            className="h-11 px-8 bg-primary hover:bg-primary/90 text-white font-semibold shadow-md hover:shadow-lg transition-all"
            data-testid="button-continue"
          >
            Continue
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
