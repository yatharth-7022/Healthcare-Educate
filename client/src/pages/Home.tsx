import { Navbar } from "@/components/layout/Navbar";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Button } from "@/components/ui/button";
import heroTexture from "@assets/image_1768894056469.png";
import student1 from "@assets/student1_1768894056469.png";
import student2 from "@assets/student2_1768894056469.png";
import student3 from "@assets/student3_1768894056470.png";
import logoImg from "@assets/logo_1768894056469.jpg";
import heroImage from "/Users/yatharthagarwal/Healthcare-Educate/attached_assets/hero_image.png";
import uni1 from "/Users/yatharthagarwal/Healthcare-Educate/attached_assets/uni1.png";
import uni2 from "/Users/yatharthagarwal/Healthcare-Educate/attached_assets/uni2.png";
import uni3 from "/Users/yatharthagarwal/Healthcare-Educate/attached_assets/uni3.png";
import uni4 from "/Users/yatharthagarwal/Healthcare-Educate/attached_assets/uni4.png";
import uni5 from "/Users/yatharthagarwal/Healthcare-Educate/attached_assets/uni5.png";
import uni6 from "/Users/yatharthagarwal/Healthcare-Educate/attached_assets/uni6.png";
import uni7 from "/Users/yatharthagarwal/Healthcare-Educate/attached_assets/uni7.png";
import uni8 from "/Users/yatharthagarwal/Healthcare-Educate/attached_assets/uni8.png";
import uni10 from "/Users/yatharthagarwal/Healthcare-Educate/attached_assets/uni10.png";
import uni11 from "/Users/yatharthagarwal/Healthcare-Educate/attached_assets/uni11.png";
import uni12 from "/Users/yatharthagarwal/Healthcare-Educate/attached_assets/uni12.png";
import uni13 from "/Users/yatharthagarwal/Healthcare-Educate/attached_assets/uni13.png";
import uni14 from "/Users/yatharthagarwal/Healthcare-Educate/attached_assets/uni14.png";
import {
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  Star,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background font-body text-gray-900 selection:bg-secondary/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden hero-gradient">
        {/* Background Texture Overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url(${heroTexture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-center text-center">
            {/* Hero Text Content - Centered */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="max-w-4xl mx-auto"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary font-semibold text-sm mb-6"
              >
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                Enrollment for 2025 Now Open
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 font-heading leading-[1.1]"
              >
                Begin your journey <br className="hidden lg:block" />
                into{" "}
                <span className="text-primary relative inline-block">
                  medicine
                  <svg
                    className="absolute w-full h-3 -bottom-1 left-0 text-secondary opacity-50 -z-10"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 50 10 100 5"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                    />
                  </svg>
                </span>
                .
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto"
              >
                From mastering the GAMSAT to securing Graduate-Entry Medicine
                offers, SmashMed supports you through every stage of
                preparation.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white rounded-xl shadow-xl shadow-primary/25 transition-all hover:scale-105 active:scale-95 font-semibold">
                  Explore GAMSAT courses
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  className="h-14 px-8 text-lg border-2 border-gray-200 hover:border-primary/50 hover:bg-primary/5 text-gray-700 hover:text-primary rounded-xl font-semibold transition-all"
                >
                  View expert guidance
                </Button>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-10 flex items-center justify-center gap-6 text-sm text-gray-500 font-medium"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <span>Expert-verified Content</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  <span>4.9/5 Student Rating</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Image Section */}
      <section className="py-16  bg-white">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="w-[90%]">
            <img
              src={heroImage}
              alt="Medical education"
              className="w-full h-[450px] rounded-2xl shadow-xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* Platform Showcase Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-gray-900 mb-4 leading-tight">
              SmashMed is the leading healthcare admissions platform.
            </h2>
            <p className="text-3xl md:text-4xl lg:text-5xl font-heading text-gray-400">
              One subscription is all you need.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Device Mockups */}
            <div className="relative flex items-center justify-center scale-75">
              {/* Desktop mockup */}
              <div className="relative z-10 bg-gray-100 rounded-2xl shadow-2xl p-3 w-full max-w-md border-4 border-gray-800">
                <div className="bg-white rounded-lg p-6 h-48 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="text-4xl">📚</div>
                    <h3 className="text-xl font-bold text-gray-900">
                      GAMSAT Practice
                    </h3>
                    <p className="text-sm text-gray-600">
                      Comprehensive study materials and practice questions
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile mockup */}
              <div className="absolute -right-8 bottom-0 z-20 bg-gray-900 rounded-[2rem] shadow-2xl p-1 w-40 border-2 border-gray-900">
                <div className="bg-white rounded-[1.5rem] overflow-hidden h-80">
                  <div className="bg-primary text-white p-3 text-xs font-semibold">
                    Practice
                  </div>
                  <div className="p-3 space-y-2">
                    {[
                      {
                        icon: "📖",
                        name: "Section I Reasoning",
                        progress: "75%",
                      },
                      {
                        icon: "✍️",
                        name: "Section II Writing",
                        progress: "60%",
                      },
                      {
                        icon: "🔬",
                        name: "Section III Science",
                        progress: "85%",
                      },
                      { icon: "📊", name: "Mock Exams", progress: "45%" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-lg">{item.icon}</span>
                        <div className="flex-1">
                          <p className="text-[10px] font-medium text-gray-900">
                            {item.name}
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                            <div
                              className="bg-primary h-1 rounded-full"
                              style={{ width: item.progress }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -left-12 top-20 w-20 h-20 bg-blue-100 rounded-2xl transform rotate-12 z-0" />
              <div className="absolute -left-6 top-32 w-12 h-12 bg-red-200 rounded-full z-0" />
            </div>

            {/* Right side - GAMSAT Card */}
            <div className="flex justify-center md:justify-end">
              <div className="space-y-6">
                <h3 className="text-5xl font-bold text-gray-900 font-heading">
                  GAMSAT
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                  Prepare with the world's most trusted GAMSAT practice
                  platform.
                </p>
                <Button className="h-12 px-8 text-base bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-semibold transition-all border border-gray-300">
                  View GAMSAT course
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Reviews Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4">
              Trusted by over 220,000 students since 2009
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-body">
              Including the highest UCAT scorer ever who achieved 3590/3600.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: '"Medify was my ',
                highlight: "main method of preparation for the UCAT",
                text2:
                  ', helping me to achieve a score high enough to apply to, and secure interviews at, all my desired medical schools."',
                author: "Simon P.",
                sub: "Scored 3300 in UCAT",
                image: student1,
              },
              {
                text: '"Medify provided not only an easily accessible and cheap programme... allowing me to ',
                highlight:
                  "secure two offers from two Russell Group Universities",
                text2: '."',
                author: "Aiat M.",
                sub: "2 offers",
                image: student2,
              },
              {
                text: '"Medify helped me score in the ',
                highlight: "top 1% in GAMSAT",
                text2:
                  ', and ultimately secure places on several Graduate Entry Medicine courses."',
                author: "Jonny W.",
                sub: "Scored top 1% in GAMSAT",
                image: student3,
              },
            ].map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-8 flex-grow text-base">
                  {review.text}
                  <span className="bg-yellow-200/60 px-1 font-medium">
                    {review.highlight}
                  </span>
                  {review.text2}
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <img
                    src={review.image}
                    alt={review.author}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{review.author}</p>
                    <p className="text-sm text-gray-500">{review.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* University Outcomes Carousel */}
          <div className="mt-20">
            <div className="mb-12 text-center">
              <h3 className="text-xl font-bold text-gray-400 font-heading uppercase tracking-widest">
                Our students receive offers from leading medical schools
              </h3>
            </div>

            <div className="relative w-[90%] mx-auto overflow-hidden">
              {/* Left fade overlay */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
              {/* Right fade overlay */}
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

              <div className="flex">
                <motion.div
                  className="flex gap-8 items-center px-12"
                  animate={{ x: [0, -2400] }}
                  transition={{
                    duration: 50,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {[
                    { name: "University of Dundee", logo: uni1 },
                    { name: "University of Melbourne", logo: uni2 },
                    { name: "Monash University", logo: uni3 },
                    { name: "Deakin University", logo: uni4 },
                    { name: "University of Wollongong", logo: uni5 },
                    { name: "University of Sydney", logo: uni6 },
                    { name: "Notre Dame Australia", logo: uni7 },
                    { name: "University of Queensland", logo: uni8 },
                    { name: "Griffith University", logo: uni10 },
                    { name: "Macquarie University", logo: uni11 },
                    { name: "University of Western Australia", logo: uni12 },
                    { name: "University of Auckland", logo: uni13 },
                    { name: "University of Liverpool", logo: uni14 },
                  ].map((uni, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-3 min-w-[140px]"
                    >
                      <div className="w-20 h-20 flex items-center justify-center p-2">
                        <img
                          src={uni.logo}
                          alt={uni.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-600 text-center whitespace-normal max-w-[140px]">
                        {uni.name}
                      </p>
                    </div>
                  ))}
                  {/* Duplicate for seamless loop */}
                  {[
                    { name: "University of Dundee", logo: uni1 },
                    { name: "University of Melbourne", logo: uni2 },
                    { name: "Monash University", logo: uni3 },
                    { name: "Deakin University", logo: uni4 },
                    { name: "University of Wollongong", logo: uni5 },
                    { name: "University of Sydney", logo: uni6 },
                    { name: "Notre Dame Australia", logo: uni7 },
                    { name: "University of Queensland", logo: uni8 },
                    { name: "Griffith University", logo: uni10 },
                    { name: "Macquarie University", logo: uni11 },
                    { name: "University of Western Australia", logo: uni12 },
                    { name: "University of Auckland", logo: uni13 },
                    { name: "University of Liverpool", logo: uni14 },
                  ].map((uni, i) => (
                    <div
                      key={`dup-${i}`}
                      className="flex flex-col items-center gap-3 min-w-[140px]"
                    >
                      <div className="w-20 h-20 flex items-center justify-center p-2">
                        <img
                          src={uni.logo}
                          alt={uni.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-600 text-center whitespace-normal max-w-[180px]">
                        {uni.name}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authority Statement Banner */}

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold font-heading text-gray-900 mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-gray-600">
              Our comprehensive curriculum covers all three sections of the
              GAMSAT with depth and precision.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Section I Reasoning",
                desc: "Master humanities and social sciences with our critical reasoning framework.",
                icon: "📚",
              },
              {
                title: "Section II Writing",
                desc: "Develop a sophisticated writing style with expert feedback on your essays.",
                icon: "✍️",
              },
              {
                title: "Section III Science",
                desc: "Deep dive into biology, chemistry and physics with university-level depth.",
                icon: "🔬",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-heading">
            Join the waitlist for our next intake
          </h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg">
            Get exclusive study tips, early access to new courses, and expert
            guidance delivered straight to your inbox.
          </p>
          <div className="flex justify-center">
            <NewsletterForm />
          </div>
          <p className="text-sm text-gray-400 mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <img
                src={logoImg}
                alt="SmashMed"
                className="h-8 w-auto mb-6 opacity-80 mix-blend-multiply"
              />
              <p className="text-gray-500 max-w-xs leading-relaxed">
                Empowering the next generation of medical professionals with
                world-class education technology.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
              <ul className="space-y-3 text-gray-500 text-sm">
                <li>
                  <a href="#" className="hover:text-primary">
                    Courses
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Live Classes
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Question Bank
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-3 text-gray-500 text-sm">
                <li>
                  <a href="#" className="hover:text-primary">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Free Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Webinars
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Success Stories
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3 text-gray-500 text-sm">
                <li>
                  <a href="#" className="hover:text-primary">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 SmashMed Education. All rights reserved.
            </p>
            <div className="flex gap-6">
              {/* Social icons placeholder */}
              <div className="w-5 h-5 bg-gray-200 rounded-full hover:bg-primary/50 transition-colors cursor-pointer" />
              <div className="w-5 h-5 bg-gray-200 rounded-full hover:bg-primary/50 transition-colors cursor-pointer" />
              <div className="w-5 h-5 bg-gray-200 rounded-full hover:bg-primary/50 transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
