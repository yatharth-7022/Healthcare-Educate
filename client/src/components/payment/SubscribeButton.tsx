import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useSubscription } from "@/hooks/use-subscription";
import { useToast } from "@/hooks/use-toast";

interface SubscribeButtonProps {
  plan: "weekly" | "monthly" | "yearly";
  priceIds: {
    weekly: string;
    monthly: string;
    yearly: string;
  };
  disabled?: boolean;
  variant?: "default" | "outline";
  className?: string;
  children?: React.ReactNode;
}

export function SubscribeButton({
  plan,
  priceIds,
  disabled,
  variant = "default",
  className,
  children = "Continue",
}: SubscribeButtonProps) {
  const { isAuthenticated } = useAuth();
  const { startCheckout, isCreatingCheckout } = useSubscription();
  const { toast } = useToast();

  const handleSubscribe = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to subscribe to a plan.",
        variant: "destructive",
      });
      // Redirect to auth page
      window.location.href = "/auth?redirect=/pricing";
      return;
    }

    try {
      const priceId = priceIds[plan];
      await startCheckout(priceId);
      // User will be redirected to Stripe checkout
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Failed",
        description:
          error instanceof Error
            ? error.message
            : "Failed to start checkout. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleSubscribe}
      disabled={disabled || isCreatingCheckout}
      variant={variant}
      className={className}
    >
      {isCreatingCheckout ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
