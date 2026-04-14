# Practice Progress Dynamic Flow - Implementation Summary

## What was implemented

The practice categories/subcategories and progress bars are now backend-driven and persisted per user.

### Backend

1. Added new Prisma models for dynamic practice data and user progress:

- `PracticeCategory`
- `PracticeSubcategory`
- `PracticeQuestionProgress`

2. Added seed/sync service for category catalog:

- `server/services/practiceCatalog.ts`
- `server/services/practiceService.ts`

The catalog is auto-synced from seed data the first time practice APIs are called.

3. Added JWT-protected practice routes:

- `GET /api/practice/progress`
- `GET /api/practice/progress/:categoryId`
- `POST /api/practice/answers`

4. Registered routes in server bootstrap:

- `server/routes.ts`

### Frontend

1. Added shared practice response/input types:

- `shared/models/practice.ts`

2. Added frontend authenticated API client for practice endpoints with token refresh retry:

- `client/src/lib/practice-api.ts`

3. Added React Query hooks:

- `client/src/hooks/use-practice-progress.ts`

4. Replaced hardcoded practice data usage with backend data:

- `client/src/pages/Practice.tsx`
- `client/src/pages/PracticeCategory.tsx`

5. Added a direct category-page action to test write flow end-to-end:

- `+1 answer` button on each non-coming-soon subcategory calls `POST /api/practice/answers` and refreshes progress bars.

## API contract

### GET /api/practice/progress

Returns all categories with per-user answered counts.

Response shape:

```json
{
  "status": "success",
  "data": {
    "categories": [
      {
        "id": "biology",
        "name": "Biology",
        "totalQuestions": 880,
        "answeredQuestions": 12,
        "subcategories": [
          {
            "id": "biology-bioenergetics",
            "name": "Bioenergetics",
            "totalQuestions": 80,
            "answeredQuestions": 3,
            "comingSoon": false
          }
        ]
      }
    ]
  }
}
```

### GET /api/practice/progress/:categoryId

Returns one category with its subcategories and user progress.

### POST /api/practice/answers

Records one answered question for the authenticated user.

Request body:

```json
{
  "categoryId": "biology",
  "subcategoryId": "biology-bioenergetics",
  "questionKey": "biology-bioenergetics-q-001",
  "isCorrect": true
}
```

Notes:

- `questionKey` is the stable unique id of the question in your question bank.
- If the same `(userId, subcategoryId, questionKey)` is posted again, attempts are incremented and correctness is updated.
- Coming-soon subcategories reject writes.

## Database and generation steps

Already run during implementation:

- `npm run db:generate`
- `npm run check`

Required for environments where tables are not created yet:

- `npm run db:push`
- `npm run db:seed:practice`

Convenience setup command:

- `npm run db:setup:practice`

Expected seed result:

- 5 categories
- 63 subcategories

## Files changed

- `prisma/schema.prisma`
- `server/routes.ts`
- `server/routes/practiceRoutes.ts`
- `server/services/practiceCatalog.ts`
- `server/services/practiceService.ts`
- `shared/models/practice.ts`
- `client/src/lib/practice-api.ts`
- `client/src/hooks/use-practice-progress.ts`
- `client/src/pages/Practice.tsx`
- `client/src/pages/PracticeCategory.tsx`

## Behavior after this change

- Practice categories/subcategories are no longer read from hardcoded frontend progress values.
- Progress bars are now computed from persisted backend answer data for each authenticated user.
- Users can leave and return later and still see their answered counts.
