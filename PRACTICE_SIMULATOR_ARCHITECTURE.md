# Practice Simulator Architecture

This document describes the new storage + rendering system for complex question stems and attached MCQs.

## What is implemented

## 1) Database design (PostgreSQL via Prisma)

Added model: `PracticeQuestionSet`

- `id` (Int, PK)
- `categoryId` (String)
- `subcategoryId` (String)
- `title` (String)
- `stem` (Json) -> stored as JSONB in PostgreSQL
- `questions` (Json) -> stored as JSONB in PostgreSQL
- `isPublished` (Boolean)
- timestamps

Relations:

- `PracticeCategory` -> many `PracticeQuestionSet`
- `PracticeSubcategory` -> many `PracticeQuestionSet`

File: `prisma/schema.prisma`

## 2) Block-based stem format with ordered content

The stem is an ordered array of blocks and is rendered in exact sequence.

Supported block types:

- `text`
- `equation`
- `image`
- `table`
- `code`
- `video`

Example:

```json
[
  { "type": "text", "value": "In polymer science, Tg is important..." },
  {
    "type": "equation",
    "value": "\\frac{1}{T_g}=\\frac{w}{T_{g,sc}}+\\frac{1-w}{T_{g,bb}}",
    "mode": "block"
  },
  {
    "type": "image",
    "url": "https://res.cloudinary.com/.../graph.png",
    "caption": "Rheological curves"
  },
  { "type": "text", "value": "Figure 2(a) and (b) show..." }
]
```

## 3) MCQ structure

Each question set stores a `questions` array:

```json
[
  {
    "id": "q1",
    "prompt": "Which polymer group generally exhibits higher Tg, and why?",
    "options": [
      "Group 1, due to flexible thiophene backbone",
      "Group 2, due to rigid phenyl-rich backbone",
      "Group 1, due to longer side chains",
      "Group 2, because side chains are aromatic"
    ],
    "correctOptionIndex": 1,
    "explanation": "Phenyl-rich backbones are generally more rigid."
  }
]
```

## 4) Backend APIs (Express)

All endpoints are under `/api/practice` and authenticated with JWT.

### Create question set

- `POST /api/practice/content`

Body:

- `categoryId`
- `subcategoryId`
- `title`
- `stem` (array of stem blocks)
- `questions` (array of MCQs)
- `isPublished` (optional)

### List question sets by topic

- `GET /api/practice/content?categoryId=...&subcategoryId=...`

### Get one question set by id

- `GET /api/practice/content/:questionSetId`

### Get active session set for simulator

- `GET /api/practice/session?categoryId=...&subcategoryId=...`

Current selection strategy:

- returns first published question set for the chosen topic.

Files:

- `server/routes/practiceRoutes.ts`
- `server/services/practiceService.ts`

## 5) Frontend rendering

## Reusable stem renderer

- `client/src/components/practice/StemBlockRenderer.tsx`

Render behavior:

- `text` -> paragraph
- `equation` -> KaTeX (`react-katex`)
- `image` -> responsive `<img>` with optional caption
- `table` -> HTML table
- `code` -> code block
- `video` -> URL link block

## Session page

- `client/src/pages/PracticeSession.tsx`

Flow:

1. User chooses count in setup
2. User confirms settings
3. `Start practice` opens simulator route:
   `/dashboard/practice/:category/:subcategory/session?sets=:n`
4. Page fetches session data from backend
5. Stem is rendered in-order
6. MCQ panel handles selection + Next
7. On Next, answer is recorded to progress endpoint

## 6) Image handling

Images are URL-based and not stored as binary in DB.

Recommended source:

- Cloudinary (or S3)

Only URL/caption metadata is persisted inside `stem` JSON.

## 7) Equation rendering

Installed and wired:

- `react-katex`
- `katex`

Global CSS loaded in:

- `client/src/main.tsx`

## 8) Scalability notes

Current design is already extensible through discriminated `type` blocks.

To add new content kinds later:

1. Add new block type in shared model and route validation
2. Add renderer branch in `StemBlockRenderer`
3. Existing DB schema remains unchanged (still JSONB)

This supports future additions like:

- advanced tables
- code execution blocks
- embedded video players
- drag/drop answer widgets

## Files touched for this architecture

- `prisma/schema.prisma`
- `server/routes/practiceRoutes.ts`
- `server/services/practiceService.ts`
- `shared/models/practice.ts`
- `client/src/lib/practice-api.ts`
- `client/src/hooks/use-practice-progress.ts`
- `client/src/components/practice/StemBlockRenderer.tsx`
- `client/src/pages/PracticeSession.tsx`
- `client/src/pages/PracticeConfirm.tsx`
- `client/src/App.tsx`
- `client/src/main.tsx`
