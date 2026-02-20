import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function SubscriptionSuccess() {
  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1A1A1A] font-['IBM_Plex_Sans'] pt-32 pb-20">
      <div className="container mx-auto px-4">
        <motion.div {...fadeIn} className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-16 h-16 text-green-600" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-['Source_Sans_3'] font-bold text-[#2D2D2D] mb-4">
            Welcome to Pro!
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Your subscription is now active. Payment confirmed!
          </p>

          <Card className="bg-white border-none shadow-lg mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-[#2D2D2D] mb-4">
                What's Next?
              </h2>
              <ul className="text-left space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <span>Access all premium courses and study materials</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <span>Join live classes and recorded sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <span>Track your progress with performance analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <span>Practice with hundreds of exam-style questions</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => (window.location.href = "/dashboard")}
              className="bg-[#674EA7] hover:bg-[#674EA7]/90 text-white rounded-full font-bold h-12 px-8 shadow-lg shadow-[#674EA7]/20"
            >
              Go to Dashboard
            </Button>
            <Button
              onClick={() => (window.location.href = "/courses")}
              variant="outline"
              className="rounded-full font-bold h-12 px-8"
            >
              Browse Courses
            </Button>
          </div>

          <p className="text-sm text-gray-500 mt-12">
            You'll receive a confirmation email with your receipt shortly.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
