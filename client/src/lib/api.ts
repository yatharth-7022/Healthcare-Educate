// API utility functions for authentication

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    user: {
      id: number;
      username: string;
      email: string;
      isAdmin: boolean;
    };
    accessToken: string;
  };
}

export interface RefreshResponse {
  status: string;
  message: string;
  data: {
    accessToken: string;
  };
}

/**
 * Register a new user
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Registration failed");
  }

  return responseData;
}

/**
 * Login user
 */
export async function login(data: LoginData): Promise<AuthResponse> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Login failed");
  }

  return responseData;
}

/**
 * Logout user
 */
export async function logout(accessToken: string): Promise<void> {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Logout failed");
  }
}

/**
 * Refresh access token
 */
export async function refreshToken(): Promise<RefreshResponse> {
  const response = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || "Token refresh failed");
  }

  return responseData;
}

/**
 * Get current user profile
 */
export async function getCurrentUser(accessToken: string) {
  const response = await fetch("/api/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const data = await response.json();
  return data.data.user;
}
