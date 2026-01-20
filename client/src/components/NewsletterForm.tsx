import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateSubscriber } from "@/hooks/use-subscribers";
import { Loader2, Mail } from "lucide-react";
import { motion } from "framer-motion";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const { mutate, isPending } = useCreateSubscriber();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    mutate({ email }, { onSuccess: () => setEmail("") });
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit} 
      className="flex flex-col sm:flex-row gap-3 max-w-md w-full"
    >
      <div className="relative flex-grow">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="pl-10 h-12 bg-white border-gray-200 focus:border-primary focus:ring-primary/20 rounded-xl transition-all"
        />
      </div>
      <Button 
        type="submit" 
        disabled={isPending}
        className="h-12 px-8 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 font-semibold shrink-0"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Subscribe"}
      </Button>
    </motion.form>
  );
}
