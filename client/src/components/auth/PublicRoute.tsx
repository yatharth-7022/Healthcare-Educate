import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";

interface PublicRouteProps {
  children: React.ReactNode;
  redirectIfAuthenticated?: boolean;
  redirectTo?: string;
}

/**
 * PublicRoute Component
 *
 * Used for public pages (like auth/login page) that should redirect
 * authenticated users away.
 */
export function PublicRoute({
  children,
  redirectIfAuthenticated = true,
  redirectTo = "/dashboard",
}: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect authenticated users away from public-only pages
    if (!isLoading && isAuthenticated && redirectIfAuthenticated) {
      setLocation(redirectTo);
    }
  }, [
    isLoading,
    isAuthenticated,
    redirectIfAuthenticated,
    redirectTo,
    setLocation,
  ]);

  // Don't render anything while loading to prevent flash
  if (isLoading) {
    return null;
  }

  // Don't render if redirecting
  if (isAuthenticated && redirectIfAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
