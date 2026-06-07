import type { StemBlock, StemImageBlock } from "@shared/models/practice";
import { BlockMath, InlineMath } from "react-katex";
import { MathText } from "./MathText";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ZoomIn } from "lucide-react";

type StemBlockRendererProps = {
  blocks: StemBlock[];
  compact?: boolean;
};

const COMMON_LATEX_COMMANDS = [
  "frac",
  "sqrt",
  "cdot",
  "times",
  "leq",
  "geq",
  "neq",
  "approx",
  "pm",
  "mp",
  "left",
  "right",
  "sum",
  "int",
  "lim",
  "sin",
  "cos",
  "tan",
  "log",
  "ln",
  "alpha",
  "beta",
  "gamma",
  "delta",
  "theta",
  "lambda",
  "mu",
  "pi",
  "sigma",
  "omega",
  "text",
  "mathrm",
  "operatorname",
].join("|");

function normalizeMathExpression(value: string): string {
  let normalized = value.trim();

  normalized = normalized.replace(/^\$\$?\s*/, "").replace(/\s*\$\$?$/, "");

  // Convert over-escaped commands from persisted JSON strings (e.g. \\frac -> \frac).
  normalized = normalized.replace(/\\\\([a-zA-Z]+)/g, "\\$1");

  // Repair common LaTeX commands when the leading slash is missing (e.g. frac -> \frac).
  normalized = normalized.replace(
    new RegExp(
      `(^|[^\\\\a-zA-Z])(${COMMON_LATEX_COMMANDS})(?=[^a-zA-Z]|$)`,
      "g",
    ),
    "$1\\$2",
  );

  return normalized;
}

function optimizeCloudinaryImageUrl(url: string): string {
  return url;
}

function ImageBlock({ block, compact }: { block: StemImageBlock; compact: boolean }) {
  const [open, setOpen] = useState(false);
  const optimizedUrl = optimizeCloudinaryImageUrl(block.url);
  return (
    <>
      <figure
        className="rounded-lg border border-border/60 bg-muted/20 p-3 cursor-zoom-in group relative"
        onClick={() => setOpen(true)}
      >
        <img
          src={optimizedUrl}
          alt={block.alt || "Stem figure"}
          className={`w-full ${compact ? "max-h-[180px]" : "max-h-[300px]"} object-contain rounded-md mx-auto`}
          loading="lazy"
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 rounded p-1">
          <ZoomIn className="w-4 h-4 text-muted-foreground" />
        </div>
        {block.caption && (
          <figcaption className="text-xs text-muted-foreground mt-2">
            <MathText text={block.caption} />
          </figcaption>
        )}
      </figure>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl w-full p-4">
          <img
            src={optimizedUrl}
            alt={block.alt || "Stem figure"}
            className="w-full max-h-[80vh] object-contain"
          />
          {block.caption && (
            <p className="text-sm text-muted-foreground text-center mt-2">
              <MathText text={block.caption} />
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export function StemBlockRenderer({
  blocks,
  compact = false,
}: StemBlockRendererProps) {
  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === "text") {
          if (block.variant === "additional-info") {
            return (
              <div
                key={key}
                className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3"
              >
                <p className="text-base font-semibold leading-7 text-foreground whitespace-pre-line">
                  <MathText text={block.value} />
                </p>
              </div>
            );
          }

          return (
            <p
              key={key}
              className="text-sm leading-7 text-foreground/90 whitespace-pre-line"
            >
              <MathText text={block.value} />
            </p>
          );
        }

        if (block.type === "equation") {
          const normalizedMath = normalizeMathExpression(block.value);

          return (
            <div key={key} className="overflow-x-auto py-1">
              {block.mode === "inline" ? (
                <InlineMath math={normalizedMath} />
              ) : (
                <BlockMath math={normalizedMath} />
              )}
            </div>
          );
        }

        if (block.type === "image") {
          return <ImageBlock key={key} block={block} compact={compact} />;
        }

        if (block.type === "table") {
          return (
            <div
              key={key}
              className="overflow-auto border border-border/60 rounded-lg"
            >
              <table className="w-full text-sm border-collapse">
                <thead className="bg-muted/40">
                  <tr>
                    {block.columns.map((column, columnIndex) => (
                      <th
                        key={`${key}-col-${columnIndex}`}
                        className="text-left px-3 py-2 border-b border-border/60 font-semibold"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={`${key}-row-${rowIndex}`}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={`${key}-cell-${rowIndex}-${cellIndex}`}
                          className="px-3 py-2 border-b border-border/40"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {block.caption && (
                <p className="text-xs text-muted-foreground px-3 py-2">
                  {block.caption}
                </p>
              )}
            </div>
          );
        }

        if (block.type === "code") {
          return (
            <pre
              key={key}
              className="rounded-lg border border-border/60 bg-black text-white text-xs p-3 overflow-auto"
            >
              <code>{block.value}</code>
            </pre>
          );
        }

        if (block.type === "video") {
          return (
            <div
              key={key}
              className="rounded-lg border border-border/60 bg-muted/20 p-3"
            >
              <a
                href={block.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-primary underline underline-offset-2"
              >
                {block.title || "Open video"}
              </a>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
