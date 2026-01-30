import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import errorHero from "@/assets/404-hero.jpg";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#FAF8F4] font-['IBM_Plex_Sans'] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#674EA7]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#B4A7D6]/5 rounded-full blur-[100px]" />
      
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#674EA7]/10 border border-[#674EA7]/20 text-[#674EA7] font-bold text-sm mb-6 uppercase tracking-widest"
            >
              Error 404
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-['Source_Sans_3'] font-bold text-[#2D2D2D] mb-6 leading-tight tracking-tight">
              Lost in <span className="text-[#674EA7]">translation?</span>
            </h1>
            
            <p className="text-xl text-[#4A4A4A] mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track to your medical journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/">
                <Button className="h-14 px-8 bg-[#674EA7] hover:bg-[#674EA7]/90 text-white rounded-xl shadow-xl shadow-[#674EA7]/20 transition-all hover:scale-105 active:scale-95 font-bold flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" className="h-14 px-8 border-2 border-gray-200 hover:border-[#674EA7]/50 hover:bg-[#674EA7]/5 text-gray-700 hover:text-[#674EA7] rounded-xl font-bold transition-all flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Browse Courses
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div 
            className="flex-1 order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-[#B4A7D6]/20 rounded-[2rem] -z-10 transform rotate-3" />
              <div className="absolute -inset-4 bg-[#674EA7]/10 rounded-[2rem] -z-10 transform -rotate-2" />
              <img 
                src={errorHero} 
                alt="Medical education 404" 
                className="w-full max-w-md lg:max-w-full rounded-3xl shadow-2xl border-8 border-white object-cover aspect-square lg:aspect-video"
              />
            </div>
          </motion.div>
          
        </div>
      </div>

      {/* Footer-like status */}
      <motion.div 
        className="absolute bottom-10 left-0 right-0 text-center text-gray-400 text-sm font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        SmashMed — Specialist GAMSAT Preparation
      </motion.div>
    </div>
  );
}
