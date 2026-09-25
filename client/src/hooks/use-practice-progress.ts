import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  CreatePracticeAttemptInput,
  CreatePracticeQuestionSetInput,
  UpdatePracticeAttemptInput,
  RecordPracticeAnswerInput,
  ReportPracticeQuestionInput,
} from "@shared/models/practice";
import {
  createPracticeAttempt,
  createPracticeQuestionSet,
  getPracticeAttempt,
  listPracticeAttempts,
  updatePracticeAttempt,
  getPracticeCategoryProgress,
  getPracticeProgressSummary,
  getPracticeSessionQuestionSet,
  listPracticeQuestionSets,
  recordPracticeAnswer,
  reportPracticeQuestion,
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

export function useReportPracticeQuestion() {
  return useMutation({
    mutationFn: (input: ReportPracticeQuestionInput) =>
      reportPracticeQuestion(input),
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
  sets: number = 1,
) {
  return useQuery({
    queryKey: ["/api/practice/session", categoryId, subcategoryId, sets],
    queryFn: () =>
      getPracticeSessionQuestionSet(
        categoryId as string,
        subcategoryId as string,
        sets,
      ),
    enabled: Boolean(categoryId && subcategoryId),
    staleTime: 1000 * 10,
    retry: false,
  });
}

const ATTEMPTS_QUERY_KEY = ["/api/practice/attempts"];

export function usePracticeAttempts() {
  return useQuery({
    queryKey: ATTEMPTS_QUERY_KEY,
    queryFn: () => listPracticeAttempts(),
    // History must reflect the latest Save & Exit: never show a cached list.
    staleTime: 0,
    gcTime: 0,
  });
}

export function usePracticeAttempt(attemptId?: number) {
  return useQuery({
    queryKey: ["/api/practice/attempt", attemptId],
    queryFn: () => getPracticeAttempt(attemptId as number),
    enabled: attemptId !== undefined && Number.isFinite(attemptId),
    // The session hydrates from this once per mount, so never serve a cached copy.
    staleTime: 0,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export function useCreatePracticeAttempt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePracticeAttemptInput) =>
      createPracticeAttempt(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ATTEMPTS_QUERY_KEY });
    },
  });
}

export function useUpdatePracticeAttempt(attemptId?: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdatePracticeAttemptInput) =>
      updatePracticeAttempt(attemptId as number, input),
    onSuccess: (_data, variables) => {
      // Only status changes affect the history list.
      if (variables.action) {
        queryClient.invalidateQueries({ queryKey: ATTEMPTS_QUERY_KEY });
      }
    },
  });
}
