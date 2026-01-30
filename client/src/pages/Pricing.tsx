import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

type Currency = "AUD" | "GBP" | "NZD";

const pricingData = {
  AUD: { symbol: "$", free: "0", weekly: "15", monthly: "6.90", monthlyTotal: "30", yearly: "4.03", yearlyTotal: "210" },
  GBP: { symbol: "£", free: "0", weekly: "15", monthly: "6.90", monthlyTotal: "30", yearly: "4.03", yearlyTotal: "210" },
  NZD: { symbol: "$", free: "0", weekly: "16", monthly: "7.50", monthlyTotal: "32", yearly: "4.50", yearlyTotal: "230" },
};

export default function Pricing() {
  const [currency, setCurrency] = useState<Currency>("GBP");

  const cur = pricingData[currency];

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1A1A1A] font-['IBM_Plex_Sans'] pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <motion.div {...fadeIn} className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-['Source_Sans_3'] font-bold text-[#2D2D2D] mb-4 tracking-tight leading-tight">
              One subscription
            </h1>
            <p className="text-4xl md:text-5xl font-['Source_Sans_3'] font-light text-[#4A4A4A] tracking-tight">
              Everything you need to get into medical school
            </p>
          </motion.div>

          {/* Currency Toggle */}
          <motion.div {...fadeIn} className="flex bg-white/50 border border-gray-200 p-1 rounded-full shadow-sm">
            {(["GBP", "AUD", "NZD"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-bold transition-all",
                  currency === c ? "bg-white text-[#674EA7] shadow-sm" : "text-gray-400 hover:text-gray-600"
                )}
              >
                {c}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Pricing Cards Section */}
        <div className="max-w-6xl mx-auto relative">
          {/* Decorative Stars */}
          <Star className="absolute -top-8 left-[45%] w-6 h-6 text-[#B4A7D6] opacity-30 animate-pulse" fill="currentColor" />
          <Star className="absolute top-4 left-[48%] w-4 h-4 text-[#B4A7D6] opacity-20" fill="currentColor" />
          <Star className="absolute -bottom-12 right-[5%] w-8 h-8 text-[#B4A7D6] opacity-30 rotate-12" fill="currentColor" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Free Card */}
            <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
              <Card className="h-full border-none shadow-sm bg-gray-100/50 flex flex-col hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-8 flex flex-col h-full">
                  <h3 className="text-lg font-bold text-gray-500 mb-6">Free</h3>
                  <div className="mb-auto">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{cur.symbol}{cur.free}</span>
                      <span className="text-gray-400">/week</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-8 rounded-full border-2 text-gray-400 cursor-not-allowed" disabled>
                    Continue
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weekly Card */}
            <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
              <Card className="h-full border-none shadow-sm bg-white flex flex-col hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 flex flex-col h-full">
                  <h3 className="text-lg font-bold text-[#2D2D2D] mb-6">Weekly</h3>
                  <div className="mb-auto">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{cur.symbol}{cur.weekly}</span>
                      <span className="text-gray-400">/week</span>
                    </div>
                  </div>
                  <Button className="w-full mt-8 bg-[#674EA7] hover:bg-[#674EA7]/90 text-white rounded-full font-bold h-12 shadow-lg shadow-[#674EA7]/20">
                    Continue
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Monthly Card */}
            <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
              <Card className="h-full border-none shadow-sm bg-white flex flex-col border-t-4 border-t-[#B4A7D6]/20 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 flex flex-col h-full">
                  <h3 className="text-lg font-bold text-[#2D2D2D] mb-6">Monthly</h3>
                  <div className="mb-auto">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{cur.symbol}{cur.monthly}</span>
                      <span className="text-gray-400">/week</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Billed at {cur.symbol}{cur.monthlyTotal}/month</p>
                  </div>
                  <Button className="w-full mt-8 bg-[#674EA7] hover:bg-[#674EA7]/90 text-white rounded-full font-bold h-12 shadow-lg shadow-[#674EA7]/20">
                    Continue
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Yearly Card */}
            <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
              <Card className="h-full border-none shadow-xl bg-white flex flex-col relative ring-2 ring-[#674EA7]/10 hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-lg font-bold text-[#2D2D2D]">Yearly</h3>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-bold text-[10px] uppercase px-2 py-0">Best value!</Badge>
                  </div>
                  <div className="mb-auto">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-[#674EA7]">{cur.symbol}{cur.yearly}</span>
                      <span className="text-gray-400">/week</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Billed at {cur.symbol}{cur.yearlyTotal}/year</p>
                  </div>
                  <Button className="w-full mt-8 bg-[#674EA7] hover:bg-[#674EA7]/90 text-white rounded-full font-bold h-12 shadow-lg shadow-[#674EA7]/20">
                    Continue
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Feature Comparison Section */}
        <motion.div {...fadeIn} className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 pt-12 border-t border-gray-100">
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Includes:</h4>
            <ul className="space-y-4">
              {["Study notes", "Guidebook", "Work experience map"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-600 font-medium">
                  <Check className="w-5 h-5 text-gray-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">All plans contain everything in Free, plus:</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Full GAMSAT courses",
                "Live & recorded classes",
                "Practice questions with explanations",
                "Mock exams",
                "Performance tracking",
                "Ongoing updates"
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-700 font-medium text-sm">
                  <Check className="w-4 h-4 text-green-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
