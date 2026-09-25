import { Fragment, type ReactNode } from "react";
import { BlockMath } from "react-katex";
import type { WorkedSolution } from "@shared/models/practice";
import { MathText } from "@/components/practice/MathText";

/**
 * Renders worked-solution text written in a light markup:
 *   blank line   -> new paragraph        "- item"   -> bullet list
 *   $$ ... $$    -> display equation     $ ... $    -> inline math
 *   **bold** / *italic*                  | a | b |  -> table (2nd row is the separator)
 * Single newlines inside a paragraph are kept as line breaks.
 */

const EMPHASIS_RE = /(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*\n]+\*)/g;
const DISPLAY_MATH_RE = /^\$\$([\s\S]+)\$\$$/;

function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(EMPHASIS_RE).map((part, i) => {
        if (!part) return null;
        if (part.startsWith("***") && part.endsWith("***") && part.length > 6) {
          return (
            <strong key={i}>
              <em>
                <MathText text={part.slice(3, -3)} />
              </em>
            </strong>
          );
        }
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              <MathText text={part.slice(2, -2)} />
            </strong>
          );
        }
        if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
          return (
            <em key={i}>
              <MathText text={part.slice(1, -1)} />
            </em>
          );
        }
        return <MathText key={i} text={part} />;
      })}
    </>
  );
}

function splitTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split(/(?<!\\)\|/)
    .map((cell) => cell.replace(/\\\|/g, "|").trim());
}

function Table({ lines }: { lines: string[] }) {
  const [header, , ...rows] = lines.map(splitTableRow);
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {header.map((cell, i) => (
              <th key={i} className="border border-border bg-muted/60 px-3 py-1.5 text-left font-semibold">
                <Inline text={cell.replace(/^\*\*(.*)\*\*$/, "$1")} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => (
                <td key={c} className="border border-border px-3 py-1.5 align-top">
                  <Inline text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SolutionText({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/).filter((block) => block.trim());

  return (
    <div className="space-y-3 text-sm leading-relaxed text-foreground/90">
      {blocks.map((block, i): ReactNode => {
        const lines = block.split("\n");

        if (lines.length >= 2 && lines.every((line) => line.trim().startsWith("|"))) {
          return <Table key={i} lines={lines} />;
        }

        if (lines.every((line) => line.startsWith("- "))) {
          return (
            <ul key={i} className="list-disc space-y-1.5 pl-6 marker:text-muted-foreground">
              {lines.map((line, j) => (
                <li key={j} className="pl-1">
                  <Inline text={line.slice(2)} />
                </li>
              ))}
            </ul>
          );
        }

        const display = block.trim().match(DISPLAY_MATH_RE);
        if (display) {
          return (
            <div key={i} className="overflow-x-auto overflow-y-hidden [&_.katex-display]:my-1">
              <BlockMath math={display[1].trim()} />
            </div>
          );
        }

        return (
          <p key={i} className="whitespace-pre-wrap">
            <Inline text={block} />
          </p>
        );
      })}
    </div>
  );
}

function Section({ heading, body }: { heading: string; body: string }) {
  return (
    <section className="space-y-2">
      {heading && (
        <h4 className="text-[0.95rem] font-semibold leading-snug text-foreground">
          <Inline text={heading} />
        </h4>
      )}
      <SolutionText text={body} />
    </section>
  );
}

function AnswerCallout({ answer }: { answer: string }) {
  const [first, ...rest] = answer.split(/\n{2,}/);
  return (
    <div className="space-y-2 rounded-md border border-primary/20 bg-primary/5 px-4 py-3">
      <p className="text-sm font-semibold text-foreground">
        <Inline text={`Answer: ${first}`} />
      </p>
      {rest.length > 0 && <SolutionText text={rest.join("\n\n")} />}
    </div>
  );
}

export function WorkedSolutionView({ solution }: { solution: WorkedSolution }) {
  const answerIndex = Math.min(solution.answerIndex ?? solution.steps.length, solution.steps.length);
  const answer = <AnswerCallout answer={solution.answer} />;

  return (
    <div className="space-y-5">
      {solution.strategy && <Section heading="Strategy" body={solution.strategy} />}
      {solution.steps.map((step, i) => (
        <Fragment key={i}>
          {i === answerIndex && answer}
          <Section heading={step.heading} body={step.body} />
        </Fragment>
      ))}
      {solution.eliminations && solution.eliminations.length > 0 && (
        <Section
          heading="Eliminations"
          body={solution.eliminations.map((e) => `- **${e.option}** — ${e.reason}`).join("\n")}
        />
      )}
      {answerIndex >= solution.steps.length && answer}
    </div>
  );
}
