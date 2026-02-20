// Payment API utility functions

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export interface BillingPortalResponse {
  url: string;
}

export interface SubscriptionStatus {
  hasSubscription: boolean;
  status: string | null;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
  priceId?: string;
}

export interface Payment {
  id: number;
  amount: number;
  currency: string;
  status: string;
  description: string | null;
  createdAt: string;
}

export interface PaymentHistoryResponse {
  payments: Payment[];
}

/**
 * Create a Stripe checkout session
 */
export async function createCheckoutSession(
  priceId: string,
  accessToken: string,
): Promise<CheckoutSessionResponse> {
  const response = await fetch(`${API_BASE_URL}/api/checkout/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
    body: JSON.stringify({ priceId }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Failed to create checkout session");
  }

  return response.json();
}

/**
 * Create a billing portal session
 */
export async function createBillingPortalSession(
  accessToken: string,
): Promise<BillingPortalResponse> {
  const response = await fetch(`${API_BASE_URL}/api/portal/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || "Failed to create billing portal session");
  }

  return response.json();
}

/**
 * Get subscription status
 */
export async function getSubscriptionStatus(
  accessToken: string,
): Promise<SubscriptionStatus> {
  const response = await fetch(`${API_BASE_URL}/api/subscription/status`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch subscription status");
  }

  return response.json();
}

/**
 * Get payment history
 */
export async function getPaymentHistory(
  accessToken: string,
): Promise<PaymentHistoryResponse> {
  const response = await fetch(`${API_BASE_URL}/api/payments/history`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch payment history");
  }

  return response.json();
}
