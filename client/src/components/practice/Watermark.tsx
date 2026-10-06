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

function buildTile(lines: string[]) {
  const width = 460;
  const height = 240;
  const text = lines
    .map(
      (line, i) =>
        `<text x="0" y="${i * 20}" font-size="${i === 0 ? 15 : 13}" font-weight="${
          i === 0 ? 700 : 500
        }" letter-spacing="${i === 0 ? 2 : 0.3}">${escapeXml(line)}</text>`,
    )
    .join("");
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">` +
    `<g transform="translate(${width / 2} ${height / 2}) rotate(-25)" text-anchor="middle" ` +
    `font-family="Inter, Arial, sans-serif" fill="rgb(120,120,120)" fill-opacity="0.2">` +
    `<g transform="translate(0 -${((lines.length - 1) * 20) / 2})">${text}</g></g></svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

/**
 * Wraps protected content with a tiled, non-interactive watermark showing the
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
    return buildTile([
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
        className="pointer-events-none select-none absolute inset-0 z-40 overflow-hidden"
        style={{ backgroundImage, backgroundRepeat: "repeat" }}
      />
    </div>
  );
}
