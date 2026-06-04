import { BlockMath, InlineMath } from "react-katex";

const MATH_SEGMENT_RE = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g;

function normalizeMath(raw: string): string {
  return raw
    .replace(/^\$\$?\s*/, "")
    .replace(/\s*\$\$?$/, "")
    .replace(/\\\\([a-zA-Z]+)/g, "\\$1");
}

type MathTextProps = {
  text: string;
  className?: string;
};

export function MathText({ text, className }: MathTextProps) {
  const segments = text.split(MATH_SEGMENT_RE);

  return (
    <span className={className}>
      {segments.map((seg, i) => {
        if (seg.startsWith("$$") && seg.endsWith("$$") && seg.length > 4) {
          return <BlockMath key={i} math={normalizeMath(seg)} />;
        }
        if (seg.startsWith("$") && seg.endsWith("$") && seg.length > 2) {
          return <InlineMath key={i} math={normalizeMath(seg)} />;
        }
        return seg ? <span key={i}>{seg}</span> : null;
      })}
    </span>
  );
}
