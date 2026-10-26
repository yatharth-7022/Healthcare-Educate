import type { KeyboardEvent } from "react";
import { CircleCheck, CircleX } from "lucide-react";
import type { PracticeMcqQuestion } from "@shared/models/practice";
import { MathText } from "@/components/practice/MathText";
import { StemBlockRenderer } from "@/components/practice/StemBlockRenderer";

/**
 * Options that are more than a line of text: a table whose rows are the options
 * (`optionTable`), or options that carry their own tables / images (`optionBlocks`).
 * In both layouts the selection radio sits next to the content it selects.
 */

type QuestionOptionsProps = {
  question: PracticeMcqQuestion;
  optionLabels: string[];
} & (
  | {
      mode: "answer";
      selectedIndex?: number;
      onSelect: (optionIndex: number) => void;
    }
  | {
      mode: "review";
      selectedIndex?: number;
      correctIndex: number;
    }
);

export function hasRichOptions(question: PracticeMcqQuestion): boolean {
  return Boolean(question.optionTable) || Boolean(question.optionBlocks?.length);
}

function Marker({
  mode,
  isSelected,
  isCorrect,
  isWrong,
}: {
  mode: "answer" | "review";
  isSelected: boolean;
  isCorrect: boolean;
  isWrong: boolean;
}) {
  if (mode === "review") {
    if (isCorrect) return <CircleCheck className="w-5 h-5 text-green-500 flex-shrink-0" />;
    if (isWrong) return <CircleX className="w-5 h-5 text-red-600 flex-shrink-0" />;
    return (
      <span className="block w-5 h-5 rounded-full border-2 border-muted-foreground/40 flex-shrink-0" />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`h-5 w-5 flex-shrink-0 aspect-square rounded-full border-2 flex items-center justify-center transition-colors ${
        isSelected ? "border-primary" : "border-muted-foreground/50"
      }`}
    >
      {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
    </span>
  );
}

export function QuestionOptions(props: QuestionOptionsProps) {
  const { question, optionLabels, mode, selectedIndex } = props;

  const stateFor = (optionIndex: number) => {
    const isSelected = selectedIndex === optionIndex;
    const correctIndex = props.mode === "review" ? props.correctIndex : -1;
    const isCorrect = mode === "review" && optionIndex === correctIndex;
    const isWrong = mode === "review" && isSelected && !isCorrect;
    return { isSelected, isCorrect, isWrong };
  };

  const select = (optionIndex: number) => {
    if (props.mode === "answer") props.onSelect(optionIndex);
  };

  const interactive = (optionIndex: number) =>
    mode === "answer"
      ? {
          role: "radio" as const,
          tabIndex: 0,
          "aria-checked": selectedIndex === optionIndex,
          onClick: () => select(optionIndex),
          onKeyDown: (event: KeyboardEvent) => {
            if (event.key === " " || event.key === "Enter") {
              event.preventDefault();
              select(optionIndex);
            }
          },
        }
      : {};

  const textTone = (isCorrect: boolean, isWrong: boolean) =>
    mode === "review" && isCorrect
      ? "text-green-600 font-medium"
      : mode === "review" && isWrong
        ? "text-red-600"
        : "text-foreground";

  if (question.optionTable) {
    const { columns, rows } = question.optionTable;

    return (
      <div
        role={mode === "answer" ? "radiogroup" : undefined}
        className="overflow-x-auto border border-border/60 rounded-lg"
      >
        <table className="w-full text-sm border-collapse">
          <thead className="bg-muted/40">
            <tr>
              {columns.map((column, columnIndex) => (
                <th
                  key={columnIndex}
                  className="text-left px-3 py-2 border-b border-border/60 font-semibold"
                >
                  <MathText text={column} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => {
              const { isSelected, isCorrect, isWrong } = stateFor(rowIndex);
              return (
                <tr
                  key={rowIndex}
                  {...interactive(rowIndex)}
                  className={`${mode === "answer" ? "cursor-pointer" : ""} transition-colors ${
                    isSelected && mode === "answer"
                      ? "bg-primary/10"
                      : mode === "answer"
                        ? "hover:bg-muted/40"
                        : ""
                  }`}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className={`px-3 py-2 border-b border-border/40 align-top ${textTone(isCorrect, isWrong)}`}
                    >
                      {cellIndex === 0 ? (
                        <span className="flex items-center gap-3">
                          <Marker
                            mode={mode}
                            isSelected={isSelected}
                            isCorrect={isCorrect}
                            isWrong={isWrong}
                          />
                          <span>
                            <MathText text={cell} />
                          </span>
                        </span>
                      ) : (
                        <MathText text={cell} />
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  const blocks = question.optionBlocks ?? [];
  const twoColumns = question.optionColumns === 2;

  return (
    <div
      role={mode === "answer" ? "radiogroup" : undefined}
      className={`grid gap-3 ${twoColumns ? "md:grid-cols-2" : ""}`}
    >
      {question.options.map((option, optionIndex) => {
        const { isSelected, isCorrect, isWrong } = stateFor(optionIndex);
        return (
          <div
            key={`${question.id}-option-${optionIndex}`}
            {...interactive(optionIndex)}
            className={`border rounded-lg px-3 py-3 transition-colors ${
              mode === "answer" ? "cursor-pointer" : ""
            } ${
              isSelected && mode === "answer"
                ? "border-primary bg-primary/10"
                : isCorrect
                  ? "border-green-500/60"
                  : isWrong
                    ? "border-red-600/60"
                    : "border-border/60 hover:border-primary/40"
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="pt-0.5">
                <Marker
                  mode={mode}
                  isSelected={isSelected}
                  isCorrect={isCorrect}
                  isWrong={isWrong}
                />
              </span>
              <div className="min-w-0 flex-1 space-y-2">
                <span className={`block text-sm ${textTone(isCorrect, isWrong)}`}>
                  {mode === "review" ? `${optionLabels[optionIndex]}. ` : ""}
                  <MathText text={option} />
                </span>
                {blocks[optionIndex] && blocks[optionIndex].length > 0 && (
                  <StemBlockRenderer blocks={blocks[optionIndex]} />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
