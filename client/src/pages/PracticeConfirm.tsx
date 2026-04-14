import { useParams, useLocation, useSearch } from "wouter";
import { motion } from "framer-motion";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { getCategoryById, getSubcategoryById } from "@/data/practiceData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";

function EditableRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-border/50 last:border-0">
      <span className="w-20 text-sm text-muted-foreground flex-shrink-0">
        {label}
      </span>
      <span className="flex-1 text-sm font-medium text-foreground">{value}</span>
      <button
        onClick={onEdit}
        className="text-sm text-primary hover:text-primary/80 font-medium transition-colors flex-shrink-0"
        data-testid={`edit-${label.toLowerCase()}`}
      >
        Edit
      </button>
    </div>
  );
}

export default function PracticeConfirm() {
  const { category: categoryId, subcategory: subcategoryId } = useParams<{
    category: string;
    subcategory: string;
  }>();
  const [, setLocation] = useLocation();
  const search = useSearch();
  const params = new URLSearchParams(search);
  const sets = parseInt(params.get("sets") ?? "1", 10);

  const category = getCategoryById(categoryId ?? "");
  const subcategory = getSubcategoryById(categoryId ?? "", subcategoryId ?? "");

  if (!category || !subcategory) {
    return (
      <DashboardLayout>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-muted-foreground">Settings could not be loaded.</p>
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

  const timingLabel = `Untimed (${sets} ${sets === 1 ? "question set" : "question sets"})`;

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
              onClick={() => setLocation(`/dashboard/practice/${categoryId}`)}
              className="hover:text-foreground transition-colors"
            >
              {category.name}
            </button>
            <ChevronRight className="w-3 h-3" />
            <button
              onClick={() =>
                setLocation(
                  `/dashboard/practice/${categoryId}/${subcategoryId}/setup`
                )
              }
              className="hover:text-foreground transition-colors"
            >
              {subcategory.name}
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Confirm</span>
          </nav>

          <button
            onClick={() =>
              setLocation(
                `/dashboard/practice/${categoryId}/${subcategoryId}/setup`
              )
            }
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors group"
            data-testid="back-button"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-foreground">
            Confirm practice settings
          </h1>
        </motion.div>

        {/* Summary card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-card border border-border/60 rounded-xl px-6 py-1 mb-6 shadow-sm"
        >
          <EditableRow
            label="Subject"
            value={`Section III: ${category.name}`}
            onEdit={() => setLocation(`/dashboard/practice/${categoryId}`)}
          />
          <EditableRow
            label="Topic"
            value={subcategory.name}
            onEdit={() =>
              setLocation(`/dashboard/practice/${categoryId}`)
            }
          />
          <EditableRow
            label="Timing"
            value={timingLabel}
            onEdit={() =>
              setLocation(
                `/dashboard/practice/${categoryId}/${subcategoryId}/setup`
              )
            }
          />
        </motion.div>

        {/* Start practice */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.18 }}
        >
          <Button
            className="h-11 px-8 bg-primary hover:bg-primary/90 text-white font-semibold shadow-md hover:shadow-lg transition-all"
            data-testid="button-start-practice"
            onClick={() => {
              // TODO: navigate to active practice session
            }}
          >
            Start practice
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
