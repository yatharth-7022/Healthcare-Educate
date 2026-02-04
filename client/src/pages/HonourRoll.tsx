import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  Award,
  Calendar,
  Trophy,
  Star,
  Medal,
} from "lucide-react";
import { useRef } from "react";

const honourRollData = [
  {
    name: "Neesha Gopi",
    university: "University of Sydney",
    year: "2026",
    rank: "Gold",
  },
  {
    name: "Diya Dasgupta",
    university: "University of Melbourne",
    year: "2026",
    rank: "Gold",
  },
  {
    name: "Neesha Gopi",
    university: "University of Sydney",
    year: "2026",
    rank: "Gold",
  },
  {
    name: "Madeline Windura",
    university: "University of Notre Dame",
    year: "2026",
    rank: "Silver",
  },
  {
    name: "Liam Shirley",
    university: "Macquarie University",
    year: "2026",
    rank: "Silver",
  },
  {
    name: "Rewaj Raut Chhetri",
    university: "Griffith University",
    year: "2025",
    rank: "Silver",
  },
  {
    name: "Lini Millar",
    university: "Griffith University",
    year: "2025",
    rank: "Bronze",
  },
  {
    name: "Miranda Green",
    university: "University of Wollongong",
    year: "2025",
    rank: "Bronze",
  },
  {
    name: "Rosie Lee",
    university: "University of Queensland (DMD)",
    year: "2025",
    rank: "Bronze",
  },
  {
    name: "Maayra Taneja",
    university: "University of Notre Dame",
    year: "2025",
    rank: "Silver",
  },
  {
    name: "Harriet Cummins",
    university: "Macquarie University",
    year: "2024",
    rank: "Gold",
  },
  {
    name: "Hanna Mazurkiewicz",
    university: "Macquarie University",
    year: "2024",
    rank: "Gold",
  },
];

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Achievement badge component
const AchievementBadge = ({ rank }: { rank: string }) => {
  const colors = {
    Gold: "from-yellow-400 to-amber-600",
    Silver: "from-gray-300 to-gray-500",
    Bronze: "from-orange-400 to-orange-700",
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
      className={`absolute -top-3 -right-3 w-12 h-12 rounded-full bg-gradient-to-br ${colors[rank as keyof typeof colors]} shadow-lg flex items-center justify-center z-20`}
    >
      <Trophy className="w-6 h-6 text-white" />
    </motion.div>
  );
};

export default function HonourRoll() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 50, rotateX: -15 },
    animate: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background font-body text-gray-900 selection:bg-secondary/30 pb-20 overflow-hidden">
      <Navbar />

      {/* Hero Section with Animated Background */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10">
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                "radial-gradient(circle at 20% 50%, rgba(var(--primary-rgb), 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, rgba(var(--primary-rgb), 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 80%, rgba(var(--primary-rgb), 0.15) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, rgba(var(--primary-rgb), 0.15) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <FloatingParticles />
        </div>

        {/* Decorative stars */}
        <motion.div
          className="absolute top-20 left-10 text-primary/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-12 h-12" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-20 text-secondary/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-40 text-primary/20"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Trophy className="w-10 h-10" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary font-semibold text-sm mb-6 backdrop-blur-sm"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Award className="w-5 h-5" />
              </motion.div>
              Academic Excellence
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 font-heading leading-[1.1]"
            >
              <motion.span
                className="inline-block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "200% auto" }}
              >
                Honour Roll
              </motion.span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto"
            >
              Celebrating the outstanding achievements of our Medicine &
              Dentistry students. We recognize their dedication, hard work, and
              commitment to excellence.
            </motion.p>

            {/* Animated achievement stats */}
            <motion.div
              variants={fadeInUp}
              className="flex justify-center gap-8 flex-wrap"
            >
              {[
                { icon: Trophy, label: "Top Performers", value: "12+" },
                { icon: Star, label: "Universities", value: "8+" },
                { icon: Medal, label: "Success Rate", value: "100%" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="flex flex-col items-center gap-2"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(var(--primary-rgb), 0.4)",
                        "0 0 0 10px rgba(var(--primary-rgb), 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <stat.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 relative" ref={containerRef}>
        {/* Parallax background elements */}
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {honourRollData.map((student, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 20 },
                }}
              >
                <Card className="h-full border-gray-100 hover:border-primary/30 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 group overflow-hidden relative backdrop-blur-sm bg-white/80">
                  {/* Achievement Badge */}
                  <AchievementBadge rank={student.rank} />

                  {/* Animated gradient border */}
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(45deg, transparent, rgba(var(--primary-rgb), 0.1), transparent)",
                      backgroundSize: "200% 200%",
                    }}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  <CardContent className="p-8 relative">
                    {/* Background decorative element */}
                    <motion.div
                      className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <GraduationCap className="w-24 h-24 text-primary" />
                    </motion.div>

                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                      style={{ skewX: -20 }}
                    />

                    <div className="relative z-10">
                      <motion.h3
                        className="text-2xl font-bold text-gray-900 mb-4 font-heading group-hover:text-primary transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {student.name}
                      </motion.h3>

                      <div className="space-y-3">
                        <motion.div
                          className="flex items-center gap-3 text-gray-600 bg-gray-50/80 rounded-lg p-3 group-hover:bg-primary/5 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <GraduationCap className="w-4 h-4 text-primary" />
                          </div>
                          <span className="text-[15px] font-medium">
                            {student.university}
                          </span>
                        </motion.div>

                        <motion.div
                          className="flex items-center gap-3 text-gray-600 bg-gray-50/80 rounded-lg p-3 group-hover:bg-secondary/5 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-4 h-4 text-secondary" />
                          </div>
                          <span className="text-sm font-medium">
                            Class of {student.year}
                          </span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Animated bottom accent */}
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.5 }}
                    />

                    {/* Corner sparkle */}
                    <motion.div
                      className="absolute top-2 right-2 text-yellow-400"
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: idx * 0.2,
                      }}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </motion.div>
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
