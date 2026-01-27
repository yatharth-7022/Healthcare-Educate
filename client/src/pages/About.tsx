import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Facebook, CheckCircle2, Quote } from "lucide-react";
import founderImage from "@assets/image_1769511869056.png";
import uniMelbourneImage from "@assets/image_1769511903260.png";
import s1Image from "@assets/image_1769511915336.png";
import s2Image from "@assets/image_1769511925906.png";
import s3Image from "@assets/image_1769511935575.png";
import socialProofImage from "@assets/image_1769511849141.png";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function About() {
  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1A1A1A] font-['IBM_Plex_Sans']">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-['Source_Sans_3'] font-bold tracking-tight text-[#2D2D2D] mb-6">
              Getting you into <span className="text-[#674EA7]">med.</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#4A4A4A] leading-relaxed">
              How? By offering the highest quality tutoring <span className="font-semibold text-[#674EA7]">AND</span> resources.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-['Source_Sans_3'] font-bold mb-12 text-center">The Problem With Existing Tutoring Models</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-none shadow-sm bg-lavender-50/30">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-4 text-[#674EA7]">Large Companies</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-[#4A4A4A]">
                      <span className="text-red-500 mt-1">✕</span>
                      <span>Low quality resources at scale</span>
                    </li>
                    <li className="flex items-start gap-2 text-[#4A4A4A]">
                      <span className="text-red-500 mt-1">✕</span>
                      <span>Little to no individualized support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-lavender-50/30">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-4 text-[#674EA7]">Individual Tutors</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-[#4A4A4A]">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>High levels of personal support</span>
                    </li>
                    <li className="flex items-start gap-2 text-[#4A4A4A]">
                      <span className="text-red-500 mt-1">✕</span>
                      <span>Poor quantity and scalability of resources</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Solution Section */}
      <section className="py-20 bg-[#674EA7] text-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-['Source_Sans_3'] font-bold mb-8">SmashMed bridges this gap.</h2>
            <p className="text-lg md:text-xl leading-relaxed opacity-90">
              We are the first tutoring company for GAMSAT to offer highly individualised tutoring in small groups, while also providing the highest quality resources available — including 80+ sample essays for Section 2, Section 3 concepts that actually come up, and Section 1 strategies to tackle even the most obscure passages.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <motion.div {...fadeIn} className="flex-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-[#B4A7D6]/20 rounded-2xl -z-10 transform rotate-3"></div>
                <img 
                  src={founderImage} 
                  alt="SmashMed Founder" 
                  className="rounded-xl shadow-xl w-full max-w-md mx-auto"
                />
              </div>
            </motion.div>
            <motion.div {...fadeIn} className="flex-1 space-y-6">
              <Badge variant="outline" className="border-[#674EA7] text-[#674EA7] uppercase tracking-wider">About Me :)</Badge>
              <h2 className="text-4xl font-['Source_Sans_3'] font-bold text-[#2D2D2D]">Hey, I'm your lead tutor.</h2>
              <p className="text-lg text-[#4A4A4A] leading-relaxed">
                I founded SmashMed to solve the very problems I faced during my own GAMSAT journey. My approach combines rigorous academic structure with the personalized mentorship that makes the difference between a good score and a medical school offer.
              </p>
              <div className="grid grid-cols-1 gap-4 pt-4">
                {[
                  "University of Melbourne CSP unbonded entry — one of the most competitive medical programs in Australia",
                  "100+ students tutored",
                  "1000+ hours of tutoring experience"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                    <CheckCircle2 className="w-6 h-6 text-[#674EA7] shrink-0" />
                    <span className="text-[#4A4A4A] font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-24 bg-white/50 space-y-32">
        <div className="container mx-auto px-4">
          {/* S1 */}
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <motion.div {...fadeIn} className="flex-1 space-y-6">
              <h3 className="text-3xl font-['Source_Sans_3'] font-bold text-[#2D2D2D]">Section 1: Reasoning</h3>
              <p className="text-lg text-[#4A4A4A] leading-relaxed">
                Learn the key strategies needed to tackle each and every different text format GAMSAT presents. You’ll learn the unique strategies required to handle the nuances baked into Section 1 questions — turning a confusing section into something logical, structured, and easy to follow.
              </p>
            </motion.div>
            <motion.div {...fadeIn} className="flex-1">
              <img src={s1Image} alt="Section 1 Strategies" className="rounded-xl shadow-lg border-4 border-white" />
            </motion.div>
          </div>

          {/* S2 */}
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16 mt-32">
            <motion.div {...fadeIn} className="flex-1 space-y-6">
              <h3 className="text-3xl font-['Source_Sans_3'] font-bold text-[#2D2D2D]">Section 2: Writing</h3>
              <p className="text-lg text-[#4A4A4A] leading-relaxed">
                Learn EXACTLY what you need to write to score an 80+. You’ll receive my own 80+ scoring sample essays and refined contentions so that you can consistently stand out from the rest of the cohort.
              </p>
            </motion.div>
            <motion.div {...fadeIn} className="flex-1">
              <img src={s2Image} alt="Section 2 Essays" className="rounded-xl shadow-lg border-4 border-white" />
            </motion.div>
          </div>

          {/* S3 */}
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 mt-32">
            <motion.div {...fadeIn} className="flex-1 space-y-6">
              <h3 className="text-3xl font-['Source_Sans_3'] font-bold text-[#2D2D2D]">Section 3: Science</h3>
              <p className="text-lg text-[#4A4A4A] leading-relaxed">
                Learn ONLY relevant theory and gain exclusive access to handcrafted practice questions that accurately predicted elements of real GAMSAT questions in 2023 and 2024.
              </p>
            </motion.div>
            <motion.div {...fadeIn} className="flex-1">
              <img src={s3Image} alt="Section 3 Science" className="rounded-xl shadow-lg border-4 border-white" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-[#FAF8F4]">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl font-['Source_Sans_3'] font-bold text-[#2D2D2D]">See what past students have to say!</h2>
          </motion.div>
          <motion.div {...fadeIn} className="max-w-5xl mx-auto">
            <img src={socialProofImage} alt="Student Testimonials" className="w-full rounded-2xl shadow-xl border-8 border-white" />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            {...fadeIn} 
            className="max-w-4xl mx-auto bg-lavender-50 rounded-3xl p-8 md:p-16 text-center shadow-sm border border-[#B4A7D6]/20"
          >
            <h2 className="text-3xl md:text-4xl font-['Source_Sans_3'] font-bold mb-6 text-[#2D2D2D]">
              Interested in joining? Or have some more questions?
            </h2>
            <p className="text-lg text-[#4A4A4A] mb-12 max-w-2xl mx-auto">
              Our community is built on open communication and support. We typically respond within 24 hours to all inquiries.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <a 
                href="mailto:smashmedproductions@gmail.com" 
                className="flex items-center justify-center gap-3 p-6 bg-white rounded-2xl hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-[#674EA7]/10 rounded-full flex items-center justify-center text-[#674EA7] group-hover:bg-[#674EA7] group-hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-[#4A4A4A]">Email us at</div>
                  <div className="font-bold text-[#2D2D2D]">smashmedproductions@gmail.com</div>
                </div>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-3 p-6 bg-white rounded-2xl hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-[#674EA7]/10 rounded-full flex items-center justify-center text-[#674EA7] group-hover:bg-[#674EA7] group-hover:text-white transition-colors">
                  <Facebook className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-sm text-[#4A4A4A]">Join the community</div>
                  <div className="font-bold text-[#2D2D2D]">GAMSAT AUS STUDY GROUP</div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
