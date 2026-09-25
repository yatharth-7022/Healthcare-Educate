export const PRACTICE_HISTORY_PATH = "/dashboard/history";

export function getPracticeSessionPath(
  categoryId: string,
  subcategoryId: string,
  sets: number,
  attemptId?: number,
) {
  const query = new URLSearchParams({ sets: String(sets) });
  if (attemptId !== undefined) query.set("attempt", String(attemptId));

  return `/dashboard/practice/${categoryId}/${subcategoryId}/session?${query}`;
}
