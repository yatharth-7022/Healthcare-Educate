import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, Calendar } from "lucide-react";

const honourRollData = [
  { name: "Neesha Gopi", university: "University of Sydney", year: "2026" },
  { name: "Diya Dasgupta", university: "University of Melbourne", year: "2026" },
  { name: "Neesha Gopi", university: "University of Sydney", year: "2026" },
  { name: "Madeline Windura", university: "University of Notre Dame", year: "2026" },
  { name: "Liam Shirley", university: "Macquarie University", year: "2026" },
  { name: "Rewaj Raut Chhetri", university: "Griffith University", year: "2025" },
  { name: "Lini Millar", university: "Griffith University", year: "2025" },
  { name: "Miranda Green", university: "University of Wollongong", year: "2025" },
  { name: "Rosie Lee", university: "University of Queensland (DMD)", year: "2025" },
  { name: "Maayra Taneja", university: "University of Notre Dame", year: "2025" },
  { name: "Harriet Cummins", university: "Macquarie University", year: "2024" },
  { name: "Hanna Mazurkiewicz", university: "Macquarie University", year: "2024" },
];

export default function HonourRoll() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background font-body text-gray-900 selection:bg-secondary/30 pb-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary font-semibold text-sm mb-6"
            >
              <Award className="w-4 h-4" />
              Academic Excellence
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 font-heading leading-[1.1]"
            >
              Honour Roll
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto"
            >
              Celebrating the outstanding achievements of our Medicine & Dentistry students.
              We recognize their dedication, hard work, and commitment to excellence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {honourRollData.map((student, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <Card className="h-full border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group overflow-hidden">
                  <CardContent className="p-8 relative">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                       <GraduationCap className="w-16 h-16 text-primary" />
                    </div>
                    
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 font-heading group-hover:text-primary transition-colors">
                        {student.name}
                      </h3>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-600">
                          <GraduationCap className="w-4 h-4 text-primary/60" />
                          <span className="text-[15px] font-medium">{student.university}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar className="w-4 h-4 text-primary/40" />
                          <span className="text-sm">{student.year}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Subtle bottom accent */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
