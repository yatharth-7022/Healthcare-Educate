import type { StemBlock } from "@shared/models/practice";
import { BlockMath, InlineMath } from "react-katex";

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
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }

  return url.replace("/upload/", "/upload/f_auto,q_auto:best,dpr_auto/");
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
                  {block.value}
                </p>
              </div>
            );
          }

          return (
            <p
              key={key}
              className="text-sm leading-7 text-foreground/90 whitespace-pre-line"
            >
              {block.value}
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
          const optimizedUrl = optimizeCloudinaryImageUrl(block.url);

          return (
            <figure
              key={key}
              className="rounded-lg border border-border/60 bg-muted/20 p-3"
            >
              <img
                src={optimizedUrl}
                srcSet={`${optimizedUrl} 1x, ${optimizedUrl} 2x`}
                alt={block.alt || "Stem figure"}
                className={`w-full ${compact ? "max-h-[180px]" : "max-h-[300px]"} object-contain rounded-md mx-auto`}
                loading="lazy"
              />
              {block.caption && (
                <figcaption className="text-xs text-muted-foreground mt-2">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
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
