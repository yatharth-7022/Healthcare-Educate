import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  CreditCard,
  Calendar,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useSubscription } from "@/hooks/use-subscription";
import { useToast } from "@/hooks/use-toast";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Account() {
  const { user, logout } = useAuth();
  const { subscription, isLoading, openBillingPortal, isOpeningPortal } =
    useSubscription();
  const { toast } = useToast();

  const handleManageBilling = async () => {
    try {
      await openBillingPortal();
      // User will be redirected to Stripe billing portal
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open billing portal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string | null) => {
    if (!status) return null;

    const variants: Record<string, { label: string; className: string }> = {
      active: {
        label: "Active",
        className: "bg-green-100 text-green-700 hover:bg-green-100",
      },
      trialing: {
        label: "Trial",
        className: "bg-blue-100 text-blue-700 hover:bg-blue-100",
      },
      past_due: {
        label: "Past Due",
        className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
      },
      canceled: {
        label: "Canceled",
        className: "bg-gray-100 text-gray-700 hover:bg-gray-100",
      },
    };

    const variant = variants[status] || {
      label: status,
      className: "bg-gray-100 text-gray-700 hover:bg-gray-100",
    };

    return (
      <Badge className={variant.className + " font-bold"}>
        {variant.label}
      </Badge>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center">
        <p>Please log in to view your account.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1A1A1A] font-['IBM_Plex_Sans'] pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div {...fadeIn} className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-['Source_Sans_3'] font-bold text-[#2D2D2D] mb-8">
            Account Settings
          </h1>

          {/* User  Info Card */}
          <Card className="mb-6 border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Username</label>
                <p className="text-lg font-medium">{user.username}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="text-lg font-medium">{user.email}</p>
              </div>
            </CardContent>
          </Card>

          {/* Subscription Card */}
          <Card className="mb-6 border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Subscription
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin text-[#674EA7]" />
                </div>
              ) : subscription?.hasSubscription ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <div className="mt-1">
                        {getStatusBadge(subscription.status)}
                      </div>
                    </div>
                    {subscription.status === "active" &&
                      subscription.currentPeriodEnd && (
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {subscription.cancelAtPeriodEnd
                              ? "Expires on"
                              : "Next billing date"}
                          </p>
                          <p className="text-lg font-medium flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(
                              subscription.currentPeriodEnd,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                  </div>

                  {subscription.cancelAtPeriodEnd && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        Your subscription will not renew. You'll have access
                        until the end of your billing period.
                      </p>
                    </div>
                  )}

                  <Button
                    onClick={handleManageBilling}
                    disabled={isOpeningPortal}
                    className="w-full bg-[#674EA7] hover:bg-[#674EA7]/90 text-white rounded-full font-bold h-12"
                  >
                    {isOpeningPortal ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Opening...
                      </>
                    ) : (
                      <>
                        Manage Subscription
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Update payment methods, view invoices, or cancel your
                    subscription
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No active subscription</p>
                  <Button
                    onClick={() => (window.location.href = "/pricing")}
                    className="bg-[#674EA7] hover:bg-[#674EA7]/90 text-white rounded-full font-bold h-12 px-8"
                  >
                    View Plans
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => logout()}
              variant="outline"
              className="rounded-full font-bold h-12"
            >
              Log Out
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
