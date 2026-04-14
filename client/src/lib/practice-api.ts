import type {
  CreatePracticeQuestionSetInput,
  PracticeCategoryProgressResponse,
  PracticeProgressSummaryResponse,
  PracticeQuestionSetListResponse,
  PracticeQuestionSetResponse,
  PracticeSessionResponse,
  RecordPracticeAnswerInput,
} from "@shared/models/practice";
import { refreshToken } from "@/lib/api";
import { getAccessToken, setAccessToken } from "@/hooks/use-auth";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

type ApiSuccessResponse<T> = {
  status: "success";
  message?: string;
  data: T;
};

async function getValidAccessToken(): Promise<string> {
  let token = getAccessToken();

  if (!token) {
    const refreshed = await refreshToken();
    token = refreshed.data.accessToken;
    setAccessToken(token);
  }

  return token;
}

async function parseJsonSafely(response: Response): Promise<any> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function authenticatedRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  let token = await getValidAccessToken();

  const execute = async (bearerToken: string) => {
    const headers = new Headers(init?.headers ?? {});
    headers.set("Authorization", `Bearer ${bearerToken}`);

    if (init?.body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    return fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers,
      credentials: "include",
    });
  };

  let response = await execute(token);

  if (response.status === 401) {
    const refreshed = await refreshToken();
    token = refreshed.data.accessToken;
    setAccessToken(token);
    response = await execute(token);
  }

  if (!response.ok) {
    const payload = await parseJsonSafely(response);
    throw new Error(
      payload?.message || `Request failed with ${response.status}`,
    );
  }

  const payload = (await response.json()) as ApiSuccessResponse<T>;
  return payload.data;
}

export async function getPracticeProgressSummary() {
  return authenticatedRequest<PracticeProgressSummaryResponse>(
    "/api/practice/progress",
    {
      method: "GET",
    },
  );
}

export async function getPracticeCategoryProgress(categoryId: string) {
  return authenticatedRequest<PracticeCategoryProgressResponse>(
    `/api/practice/progress/${categoryId}`,
    {
      method: "GET",
    },
  );
}

export async function recordPracticeAnswer(input: RecordPracticeAnswerInput) {
  return authenticatedRequest<PracticeCategoryProgressResponse>(
    "/api/practice/answers",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}

export async function createPracticeQuestionSet(
  input: CreatePracticeQuestionSetInput,
) {
  return authenticatedRequest<PracticeQuestionSetResponse>(
    "/api/practice/content",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
  );
}

export async function listPracticeQuestionSets(
  categoryId: string,
  subcategoryId: string,
) {
  const query = new URLSearchParams({ categoryId, subcategoryId }).toString();

  return authenticatedRequest<PracticeQuestionSetListResponse>(
    `/api/practice/content?${query}`,
    {
      method: "GET",
    },
  );
}

export async function getPracticeQuestionSetById(questionSetId: number) {
  return authenticatedRequest<PracticeQuestionSetResponse>(
    `/api/practice/content/${questionSetId}`,
    {
      method: "GET",
    },
  );
}

export async function getPracticeSessionQuestionSet(
  categoryId: string,
  subcategoryId: string,
) {
  const query = new URLSearchParams({ categoryId, subcategoryId }).toString();

  return authenticatedRequest<PracticeSessionResponse>(
    `/api/practice/session?${query}`,
    {
      method: "GET",
    },
  );
}
