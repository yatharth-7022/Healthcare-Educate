import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAccessToken } from "./use-auth";
import {
  createCheckoutSession,
  createBillingPortalSession,
  getSubscriptionStatus,
  getPaymentHistory,
  type SubscriptionStatus,
  type PaymentHistoryResponse,
} from "@/lib/payment-api";

/**
 * Hook for managing subscription
 */
export function useSubscription() {
  const queryClient = useQueryClient();
  const accessToken = getAccessToken();

  // Fetch subscription status
  const {
    data: subscription,
    isLoading,
    error,
  } = useQuery<SubscriptionStatus>({
    queryKey: ["/api/subscription/status"],
    queryFn: () => {
      if (!accessToken) throw new Error("Not authenticated");
      return getSubscriptionStatus(accessToken);
    },
    enabled: !!accessToken,
    retry: false,
  });

  // Create checkout session mutation
  const checkoutMutation = useMutation({
    mutationFn: async (priceId: string) => {
      if (!accessToken) throw new Error("Not authenticated");
      return createCheckoutSession(priceId, accessToken);
    },
    onSuccess: (data) => {
      // Redirect to Stripe checkout
      window.location.href = data.url;
    },
  });

  // Create billing portal session mutation
  const portalMutation = useMutation({
    mutationFn: async () => {
      if (!accessToken) throw new Error("Not authenticated");
      return createBillingPortalSession(accessToken);
    },
    onSuccess: (data) => {
      // Redirect to Stripe billing portal
      window.location.href = data.url;
    },
  });

  return {
    subscription,
    isLoading,
    error,
    hasActiveSubscription:
      subscription?.hasSubscription && subscription?.status === "active",
    startCheckout: checkoutMutation.mutateAsync,
    openBillingPortal: portalMutation.mutateAsync,
    isCreatingCheckout: checkoutMutation.isPending,
    isOpeningPortal: portalMutation.isPending,
    checkoutError: checkoutMutation.error,
    portalError: portalMutation.error,
  };
}

/**
 * Hook for payment history
 */
export function usePaymentHistory() {
  const accessToken = getAccessToken();

  return useQuery<PaymentHistoryResponse>({
    queryKey: ["/api/payments/history"],
    queryFn: () => {
      if (!accessToken) throw new Error("Not authenticated");
      return getPaymentHistory(accessToken);
    },
    enabled: !!accessToken,
    retry: false,
  });
}
