import { Link } from "wouter";
import { Lock } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { hasPracticeAccess } from "@/lib/practiceAccess";

/** Renders its children only for users who can open practice questions. */
export function PracticeAccessGate({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;
  if (hasPracticeAccess(user)) return <>{children}</>;

  return (
    <DashboardLayout>
      <div className="max-w-md mx-auto py-24 text-center space-y-5">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <Lock className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-foreground">Practice questions are locked</h1>
          <p className="text-sm text-muted-foreground">
            Subscribe to unlock the full question bank, worked solutions and your progress history.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button asChild>
            <Link href="/pricing">View pricing</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
