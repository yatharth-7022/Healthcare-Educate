import "dotenv/config";
import * as mammoth from "mammoth";
import { v2 as cloudinary } from "cloudinary";
import * as fs from "fs";
import * as path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type StemBlock =
  | { type: "text"; value: string; variant?: "additional-info" }
  | { type: "image"; url: string; alt: string; caption: string };

// Skip tiny placeholder/spacer images (< 400 bytes decoded ≈ < 550 chars base64)
const MIN_IMAGE_B64_LEN = 550;

async function uploadBase64(b64: string, contentType: string, idx: number): Promise<string> {
  // octet-stream = unknown binary, treat as png
  const mime = contentType === "application/octet-stream" ? "image/png" : contentType;
  const ext = mime.split("/")[1]?.replace("jpeg", "jpg") || "png";
  const dataUri = `data:${mime};base64,${b64}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    public_id: `question-bank/qb_img_${Date.now()}_${idx}`,
    resource_type: "image",
    format: ext,
  });
  return result.secure_url;
}

function stripHtmlTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#\d+;/g, "")
    .trim();
}

async function main() {
  const docxPath = process.argv[2];
  if (!docxPath) {
    console.error("Usage: npx tsx script/extractDocx.ts <path/to/doc.docx>");
    process.exit(1);
  }

  const resolvedPath = path.resolve(docxPath);
  if (!fs.existsSync(resolvedPath)) {
    console.error(`File not found: ${resolvedPath}`);
    process.exit(1);
  }

  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.error(
      "Missing Cloudinary env vars. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET"
    );
    process.exit(1);
  }

  console.log(`Extracting: ${resolvedPath}\n`);

  let imgIdx = 0;
  let uploadedCount = 0;
  let skippedCount = 0;

  const result = await mammoth.convertToHtml(
    { path: resolvedPath },
    {
      convertImage: mammoth.images.imgElement(async (image) => {
        const idx = imgIdx++;
        const b64: string = await image.read("base64");

        if (b64.length < MIN_IMAGE_B64_LEN) {
          skippedCount++;
          console.log(`  skip image ${idx} (tiny placeholder, ${b64.length} chars)`);
          return { src: `SKIP_${idx}` };
        }

        console.log(`  uploading image ${idx} (${image.contentType}, ${b64.length} b64 chars)...`);
        try {
          const url = await uploadBase64(b64, image.contentType || "image/png", idx);
          uploadedCount++;
          console.log(`  ✓ image ${idx} → ${url}`);
          return { src: url };
        } catch (e) {
          console.error(`  ✗ image ${idx} upload failed:`, e);
          return { src: `UPLOAD_FAILED_${idx}` };
        }
      }),
    }
  );

  console.log(
    `\nImages: ${uploadedCount} uploaded, ${skippedCount} skipped (tiny), ${imgIdx - uploadedCount - skippedCount} failed\n`
  );

  // Parse HTML into ordered StemBlock[]
  const blocks: StemBlock[] = [];

  // mammoth emits flat HTML — split on block boundaries
  const html = result.value;
  const tokenRegex = /<img[^>]*src="([^"]*)"[^>]*\/?>/gi;
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;

  // Process all tokens in document order by scanning the HTML
  let pos = 0;
  const allMatches: Array<{ index: number; end: number; raw: string }> = [];

  for (const re of [
    /<p[^>]*>[\s\S]*?<\/p>/gi,
    /<img[^>]*src="[^"]*"[^>]*\/?>/gi,
    /<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi,
    /<table[\s\S]*?<\/table>/gi,
  ]) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) {
      allMatches.push({ index: m.index, end: m.index + m[0].length, raw: m[0] });
    }
  }

  allMatches.sort((a, b) => a.index - b.index);

  for (const match of allMatches) {
    const raw = match.raw;

    if (/^<img/i.test(raw)) {
      const srcMatch = raw.match(/src="([^"]*)"/i);
      const url = srcMatch ? srcMatch[1] : "";
      if (url.startsWith("SKIP_") || !url) continue;
      blocks.push({ type: "image", url, alt: "", caption: "" });
      continue;
    }

    // paragraph / heading / table — extract text
    const inner = stripHtmlTags(raw);
    if (!inner) continue;

    const variant =
      inner.toUpperCase().startsWith("ADDITIONAL INFORMATION") ||
      inner.toUpperCase().startsWith("ADDITIONAL INFO")
        ? "additional-info"
        : undefined;

    const block: StemBlock = variant
      ? { type: "text", value: inner, variant }
      : { type: "text", value: inner };

    blocks.push(block);
  }

  const outDir = path.resolve(process.cwd(), "script", "extracted");
  fs.mkdirSync(outDir, { recursive: true });
  const baseName = path.basename(resolvedPath, ".docx");
  const outPath = path.join(outDir, `${baseName}.json`);
  fs.writeFileSync(outPath, JSON.stringify(blocks, null, 2));

  console.log(`Output: ${outPath}`);
  console.log(`  Total blocks: ${blocks.length}`);
  console.log(
    `  Text blocks:  ${blocks.filter((b) => b.type === "text").length}`
  );
  console.log(
    `  Image blocks: ${blocks.filter((b) => b.type === "image").length}`
  );
  console.log(
    "\nShare the JSON — I'll split it into question sets and write the seed scripts."
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
