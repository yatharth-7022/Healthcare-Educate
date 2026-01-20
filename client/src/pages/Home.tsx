import { Navbar } from "@/components/layout/Navbar";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Button } from "@/components/ui/button";
import heroTexture from "@assets/image_1768894056469.png";
import student1 from "@assets/student1_1768894056469.png";
import student2 from "@assets/student2_1768894056469.png";
import student3 from "@assets/student3_1768894056470.png";
import logoImg from "@assets/logo_1768894056469.jpg";
import { ArrowRight, CheckCircle2, PlayCircle, Star, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
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
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center text-center lg:text-left">
            
            {/* Hero Text Content */}
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="max-w-2xl mx-auto lg:mx-0"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary font-semibold text-sm mb-6">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                Enrollment for 2025 Now Open
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6 font-heading leading-[1.1]">
                Begin your journey <br className="hidden lg:block"/>
                into <span className="text-primary relative inline-block">
                  medicine
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary opacity-50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>.
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
                From mastering the GAMSAT to securing Graduate-Entry Medicine offers, SmashMed supports you through every stage of preparation.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white rounded-xl shadow-xl shadow-primary/25 transition-all hover:scale-105 active:scale-95 font-semibold">
                  Explore GAMSAT courses
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" className="h-14 px-8 text-lg border-2 border-gray-200 hover:border-primary/50 hover:bg-primary/5 text-gray-700 hover:text-primary rounded-xl font-semibold transition-all">
                  View expert guidance
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 font-medium">
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

            {/* Hero Image / Illustration */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <img 
                  src={student1} 
                  alt="Medical Student Studying" 
                  className="rounded-3xl shadow-2xl object-cover h-64 w-full transform translate-y-12 premium-shadow hover:-translate-y-1 transition-transform duration-500"
                />
                <img 
                  src={student2} 
                  alt="Student in Lab" 
                  className="rounded-3xl shadow-2xl object-cover h-64 w-full premium-shadow hover:-translate-y-1 transition-transform duration-500"
                />
                <div className="col-span-2 relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-3xl -rotate-1 transform scale-[1.02] -z-10" />
                  <img 
                    src={student3} 
                    alt="Group Study Session" 
                    className="rounded-3xl shadow-2xl object-cover h-72 w-full premium-shadow hover:-translate-y-1 transition-transform duration-500"
                  />
                  {/* Floating badge */}
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-3 animate-bounce-slow">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">98% Success</p>
                      <p className="text-xs text-gray-500">Student Pass Rate</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative blobs */}
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-secondary/30 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Student Reviews Section */}
      <section className="py-24 bg-[#FAF8F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
              Trusted by future doctors across Australia
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-body">
              Prepare with clarity. Perform with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "“SmashMed was my main method of preparation for the GAMSAT. The resources were structured, high-yield, and forced me to think the way the exam actually tests. It helped me reach a score I was genuinely proud of and confident applying with to multiple Graduate Entry Medicine programs.”",
                author: "Daniel P.",
                sub: "GAMSAT candidate"
              },
              {
                text: "“SmashMed didn’t just give me practice questions — it gave me a clear strategy. The explanations and tutor guidance helped me target my weaknesses efficiently, and ultimately secure multiple interview offers for Graduate Entry Medicine.”",
                author: "Aisha M.",
                sub: "Multiple interview offers"
              },
              {
                text: "“SmashMed played a major role in helping me perform in the top percentile of the GAMSAT. The depth of reasoning in the questions and feedback was unlike anything else I used, and it translated directly into exam-day confidence.”",
                author: "Aditya M.",
                sub: "Top-percentile GAMSAT score"
              }
            ].map((review, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-8 italic flex-grow">
                  {review.text}
                </p>
                <div className="pt-6 border-t border-gray-50">
                  <p className="font-bold text-gray-900">{review.author}</p>
                  <p className="text-sm text-gray-500 font-medium">{review.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* University Outcomes Carousel */}
      <section className="py-20 bg-white border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-12 text-center">
          <h3 className="text-xl font-bold text-gray-400 font-heading uppercase tracking-widest">
            Our students receive offers from leading medical schools
          </h3>
        </div>
        
        <div className="relative flex">
          <motion.div 
            className="flex gap-12 md:gap-24 items-center whitespace-nowrap px-12"
            animate={{ x: [0, -1920] }}
            transition={{ 
              duration: 40, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            {[
              "University of Melbourne",
              "Monash University",
              "University of Sydney",
              "University of Queensland",
              "Australian National University",
              "Deakin University",
              "Flinders University"
            ].map((uni, i) => (
              <span key={i} className="text-2xl md:text-3xl font-bold text-gray-200 font-heading hover:text-gray-300 transition-colors cursor-default">
                {uni}
              </span>
            ))}
            {/* Duplicate for seamless loop */}
            {[
              "University of Melbourne",
              "Monash University",
              "University of Sydney",
              "University of Queensland",
              "Australian National University",
              "Deakin University",
              "Flinders University"
            ].map((uni, i) => (
              <span key={`dup-${i}`} className="text-2xl md:text-3xl font-bold text-gray-200 font-heading hover:text-gray-300 transition-colors cursor-default">
                {uni}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Authority Statement Banner */}
      <section className="bg-primary py-12 text-white overflow-hidden relative">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-2xl md:text-3xl font-heading font-semibold tracking-wide opacity-90">
              SmashMed is the leading specialist GAMSAT preparation platform
            </h2>
         </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold font-heading text-gray-900 mb-4">Everything you need to succeed</h2>
            <p className="text-lg text-gray-600">Our comprehensive curriculum covers all three sections of the GAMSAT with depth and precision.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Section I Reasoning",
                desc: "Master humanities and social sciences with our critical reasoning framework.",
                icon: "📚"
              },
              {
                title: "Section II Writing",
                desc: "Develop a sophisticated writing style with expert feedback on your essays.",
                icon: "✍️"
              },
              {
                title: "Section III Science",
                desc: "Deep dive into biology, chemistry and physics with university-level depth.",
                icon: "🔬"
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
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
            Get exclusive study tips, early access to new courses, and expert guidance delivered straight to your inbox.
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
              <img src={logoImg} alt="SmashMed" className="h-8 w-auto mb-6 opacity-80 mix-blend-multiply" />
              <p className="text-gray-500 max-w-xs leading-relaxed">
                Empowering the next generation of medical professionals with world-class education technology.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Platform</h4>
              <ul className="space-y-3 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-primary">Courses</a></li>
                <li><a href="#" className="hover:text-primary">Live Classes</a></li>
                <li><a href="#" className="hover:text-primary">Question Bank</a></li>
                <li><a href="#" className="hover:text-primary">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-3 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Free Guide</a></li>
                <li><a href="#" className="hover:text-primary">Webinars</a></li>
                <li><a href="#" className="hover:text-primary">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-3 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2025 SmashMed Education. All rights reserved.</p>
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
