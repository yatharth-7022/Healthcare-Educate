import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "@shared/models/auth";
import {
  login as apiLogin,
  register as apiRegister,
  logout as apiLogout,
  getCurrentUser,
  refreshToken as apiRefreshToken,
  type LoginData,
  type RegisterData,
} from "@/lib/api";
import { useState, useEffect } from "react";

// Store access token in memory (not localStorage for security purposes)
let accessToken: string | null = null;

export function setAccessToken(token: string | null) {
  accessToken = token;
}
//hooks

export function getAccessToken() {
  return accessToken;
}

async function fetchUser(): Promise<User | null> {
  if (!accessToken) {
    // Try to refresh token on mount
    try {
      const response = await apiRefreshToken();
      accessToken = response.data.accessToken;
    } catch (error) {
      return null;
    }
  }

  if (!accessToken) {
    return null;
  }

  try {
    return await getCurrentUser(accessToken);
  } catch (error) {
    // Try to refresh token if request fails
    try {
      const response = await apiRefreshToken();
      accessToken = response.data.accessToken;
      return await getCurrentUser(accessToken);
    } catch (refreshError) {
      accessToken = null;
      return null;
    }
  }
}
//auth hook

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["/api/auth/user"],
    queryFn: fetchUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await apiLogin(data);
      accessToken = response.data.accessToken;
      return response.data.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/auth/user"], user);
    },
  });

  // Register mutation full
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await apiRegister(data);
      accessToken = response.data.accessToken;
      return response.data.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/auth/user"], user);
    },
  });

  // Logout mutation full
  const logoutMutation = useMutation({
    mutationFn: async () => {
      if (accessToken) {
        await apiLogout(accessToken);
      }
    },
    onSuccess: () => {
      accessToken = null;
      queryClient.setQueryData(["/api/auth/user"], null);
    },
  });

  // Auto-refresh token
  useEffect(() => {
    if (!accessToken) return;

    // Refresh token every 10 minutes (access token expires in 15 minutes)
    const interval = setInterval(
      async () => {
        try {
          const response = await apiRefreshToken();
          accessToken = response.data.accessToken;
        } catch (error) {
          console.error("Failed to refresh token:", error);
          accessToken = null;
          queryClient.setQueryData(["/api/auth/user"], null);
        }
      },
      10 * 60 * 1000,
    ); // 10 minutes

    return () => clearInterval(interval);
  }, [queryClient]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
}
