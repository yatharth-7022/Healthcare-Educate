import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { RecordPracticeAnswerInput } from "@shared/models/practice";
import {
  getPracticeCategoryProgress,
  getPracticeProgressSummary,
  recordPracticeAnswer,
} from "@/lib/practice-api";

export function usePracticeProgressSummary() {
  return useQuery({
    queryKey: ["/api/practice/progress"],
    queryFn: getPracticeProgressSummary,
    staleTime: 1000 * 30,
  });
}

export function usePracticeCategoryProgress(categoryId?: string) {
  return useQuery({
    queryKey: ["/api/practice/progress", categoryId],
    queryFn: () => getPracticeCategoryProgress(categoryId as string),
    enabled: Boolean(categoryId),
    staleTime: 1000 * 30,
  });
}

export function useRecordPracticeAnswer(categoryId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: RecordPracticeAnswerInput) =>
      recordPracticeAnswer(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/practice/progress"] });

      if (categoryId) {
        queryClient.invalidateQueries({
          queryKey: ["/api/practice/progress", categoryId],
        });
      }
    },
  });
}
