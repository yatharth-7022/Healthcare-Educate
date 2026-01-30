import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import type { InsertSubscriber } from "@shared/schema";

// Get API base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export function useCreateSubscriber() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertSubscriber) => {
      // Validate first using shared schema
      const validated = api.subscribers.create.input.parse(data);

      const res = await fetch(`${API_BASE_URL}${api.subscribers.create.path}`, {
        method: api.subscribers.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.subscribers.create.responses[400].parse(
            await res.json(),
          );
          throw new Error(error.message);
        }
        throw new Error("Failed to subscribe");
      }

      return api.subscribers.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Subscribed successfully!",
        description: "You've been added to our newsletter.",
      });
    },
    onError: (error) => {
      toast({
        title: "Subscription failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
