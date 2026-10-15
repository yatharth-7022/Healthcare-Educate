import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth";

const BRAND = "SmashMed";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildMark(lines: string[]) {
  const width = 1000;
  const height = 700;
  const sizes = [96, 44, 36, 28];
  const weights = [800, 600, 500, 500];
  const gap = [0, 70, 50, 56];
  let y = 0;
  const text = lines
    .map((line, i) => {
      y += gap[i] ?? 50;
      return `<text x="0" y="${y}" font-size="${sizes[i] ?? 28}" font-weight="${
        weights[i] ?? 500
      }" letter-spacing="${i === 0 ? 14 : 1}">${escapeXml(line)}</text>`;
    })
    .join("");
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
    `<g transform="translate(${width / 2} ${height / 2}) rotate(-30)" text-anchor="middle" ` +
    `font-family="Inter, Arial, sans-serif" fill="rgb(120,120,120)" fill-opacity="0.22">` +
    `<g transform="translate(0 -${y / 2})">${text}</g></g></svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

/**
 * Wraps protected content with one large diagonal, non-interactive watermark showing the
 * company name plus the signed-in student's name, email and date, so any
 * screenshot or photo of a question is traceable to the account.
 */
export function Watermark({
  children,
  className,
  onContextMenu,
}: {
  children: ReactNode;
  className?: string;
  onContextMenu?: (event: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const { user } = useAuth();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [nonce, setNonce] = useState(0);

  const backgroundImage = useMemo(() => {
    const date = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return buildMark([
      BRAND.toUpperCase(),
      user?.username ?? "Student",
      user?.email ?? "",
      `${date} · Do not share`,
    ].filter(Boolean));
  }, [user?.username, user?.email]);

  // Re-create the overlay if someone removes it or strips its styling via devtools.
  useEffect(() => {
    const overlay = overlayRef.current;
    const host = overlay?.parentElement;
    if (!overlay || !host) return;
    const observer = new MutationObserver(() => {
      const el = overlayRef.current;
      const hidden =
        !el ||
        !host.contains(el) ||
        getComputedStyle(el).display === "none" ||
        getComputedStyle(el).visibility === "hidden" ||
        Number(getComputedStyle(el).opacity) < 0.5;
      if (hidden) setNonce((n) => n + 1);
    });
    observer.observe(host, { childList: true, attributes: true, subtree: false });
    observer.observe(overlay, { attributes: true });
    return () => observer.disconnect();
  }, [nonce]);

  return (
    <div className={`relative ${className ?? ""}`} onContextMenu={onContextMenu}>
      {children}
      <div
        key={nonce}
        ref={overlayRef}
        aria-hidden="true"
        data-watermark=""
        className="pointer-events-none select-none fixed inset-0 z-40 overflow-hidden"
        style={{
          backgroundImage,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "min(92vw, 1100px) auto",
        }}
      />
    </div>
  );
}
