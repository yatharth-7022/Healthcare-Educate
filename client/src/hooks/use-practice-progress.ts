import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CreatePracticeQuestionSetInput,
  RecordPracticeAnswerInput,
} from "@shared/models/practice";
import {
  createPracticeQuestionSet,
  getPracticeCategoryProgress,
  getPracticeProgressSummary,
  getPracticeSessionQuestionSet,
  listPracticeQuestionSets,
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

export function usePracticeQuestionSets(
  categoryId?: string,
  subcategoryId?: string,
) {
  return useQuery({
    queryKey: ["/api/practice/content", categoryId, subcategoryId],
    queryFn: () =>
      listPracticeQuestionSets(categoryId as string, subcategoryId as string),
    enabled: Boolean(categoryId && subcategoryId),
    staleTime: 1000 * 30,
  });
}

export function useCreatePracticeQuestionSet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePracticeQuestionSetInput) =>
      createPracticeQuestionSet(input),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "/api/practice/content",
          variables.categoryId,
          variables.subcategoryId,
        ],
      });
    },
  });
}

export function usePracticeSessionQuestionSet(
  categoryId?: string,
  subcategoryId?: string,
) {
  return useQuery({
    queryKey: ["/api/practice/session", categoryId, subcategoryId],
    queryFn: () =>
      getPracticeSessionQuestionSet(
        categoryId as string,
        subcategoryId as string,
      ),
    enabled: Boolean(categoryId && subcategoryId),
    staleTime: 1000 * 10,
    retry: false,
  });
}
