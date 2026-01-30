import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Facebook,
  CheckCircle2,
  Quote,
  UserSearch,
  FileText,
  Tag,
  TrendingUp,
} from "lucide-react";
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
  transition: { duration: 0.6 },
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
              How? By offering the highest quality tutoring{" "}
              <span className="font-semibold text-[#674EA7]">AND</span>{" "}
              resources.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-['Source_Sans_3'] font-bold mb-12 text-center text-[#2D2D2D]">
              The Problem With Existing Tutoring Models
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-none shadow-sm bg-lavender-50/30">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-4 text-[#674EA7]">
                    Large Companies
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-[#4A4A4A]">
                      <span className="text-red-500 mt-1">✕</span>
                      <span>Low quality resources at scale</span>
                    </li>
                    <li className="flex items-start gap-2 text-[#4A4A4A]">
                      <span className="text-red-500 mt-1">✕</span>
                      <span>Little to no individualized support</span>
                    </li>
                    <li className="flex items-start gap-2 text-[#4A4A4A]">
                      <span className="text-red-500 mt-1">✕</span>
                      <span>High cost with poor value for money</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-lavender-50/30">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-4 text-[#674EA7]">
                    Individual Tutors
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-[#4A4A4A]">
                      <span className="text-green-600 mt-1">✓</span>
                      <span>High levels of personal support</span>
                    </li>
                    <li className="flex items-start gap-2 text-[#4A4A4A]">
                      <span className="text-red-500 mt-1">✕</span>
                      <span>Poor quantity and scalability of resources</span>
                    </li>
                    <li className="flex items-start gap-2 text-[#4A4A4A]">
                      <span className="text-red-500 mt-1">✕</span>
                      <span>
                        High hourly costs which do not scale with preparation
                        needs
                      </span>
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
          <motion.div {...fadeIn} className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-['Source_Sans_3'] font-bold mb-8 tracking-tight">
              SmashMed bridges this gap.
            </h2>
            <div className="space-y-6 text-lg md:text-xl leading-relaxed opacity-95">
              <p>
                SmashMed is the first GAMSAT tutoring company to combine highly
                individualised teaching with genuinely high-quality, bona fide
                preparation resources. Our materials are built around what the
                exam actually tests—not generic content or inflated question
                banks—and are delivered at a genuinely affordable price, making
                high-quality GAMSAT preparation accessible without compromise.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Icons Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { icon: UserSearch, title: "Individualised" },
              { icon: FileText, title: "Premium Quality" },
              { icon: Tag, title: "Affordable" },
              { icon: TrendingUp, title: "Proven Results" },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-lavender-50 rounded-2xl flex items-center justify-center text-[#674EA7] mb-4 border border-[#B4A7D6]/20 shadow-sm hover-elevate transition-all">
                  <feature.icon className="w-10 h-10 md:w-12 md:h-12" />
                </div>
                <h3 className="font-bold text-lg text-[#2D2D2D]">
                  {feature.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-24 bg-[#FAF8F4]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <motion.div {...fadeIn} className="flex-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-[#B4A7D6]/20 rounded-2xl -z-10 transform rotate-3"></div>
                <img
                  src={founderImage}
                  alt="SmashMed Founder"
                  className="rounded-xl shadow-xl w-full max-w-md mx-auto object-cover aspect-[4/5]"
                />
              </div>
            </motion.div>
            <motion.div {...fadeIn} className="flex-1 space-y-6">
              <Badge
                variant="outline"
                className="border-[#674EA7] text-[#674EA7] uppercase tracking-wider font-bold"
              >
                About Me :)
              </Badge>
              <h2 className="text-4xl font-['Source_Sans_3'] font-bold text-[#2D2D2D] tracking-tight">
                Hey, I'm your lead tutor.
              </h2>
              <div className="space-y-4 text-lg text-[#4A4A4A] leading-relaxed">
                <p>
                  I studied Biomedical Science at Monash University, where I
                  developed a strong foundation in scientific reasoning and
                  problem-solving. I also completed a minor in Arts and
                  Humanities, which enabled me to develop skills in critical
                  reading, interpretation, and written expression.
                </p>
                <p>
                  After sitting the GAMSAT and gaining entry into medicine at
                  the University of Melbourne, I became acutely aware of how
                  fragmented and hit-and-miss much of the existing GAMSAT
                  preparation is—often relying on questions that are poorly
                  aligned with what the exam actually tests. SmashMed was built
                  to fix that. Our question bank and live classes are built
                  around highly representative stems and topics that are
                  frequently tested on the exam, providing students with a true
                  one-stop system grounded in the skills and reasoning required
                  to succeed.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4 pt-4">
                {[
                  "University of Melbourne CSP unbonded entry — one of the most competitive medical programs in Australia",
                  "1000+ students tutored",
                  "10000+ hours of tutoring experience",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                  >
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
      {/* <section className="py-24 bg-white space-y-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <motion.div {...fadeIn} className="flex-1 space-y-6">
              <h3 className="text-3xl font-['Source_Sans_3'] font-bold text-[#2D2D2D] tracking-tight">
                Section 1: Reasoning
              </h3>
              <p className="text-lg text-[#4A4A4A] leading-relaxed">
                Learn the key strategies needed to tackle each and every
                different text format GAMSAT presents. You’ll learn the unique
                strategies required to handle the nuances baked into Section 1
                questions — turning a confusing section into something logical,
                structured, and easy to follow.
              </p>
            </motion.div>
            <motion.div {...fadeIn} className="flex-1">
              <img
                src={s1Image}
                alt="Section 1 Strategies"
                className="rounded-xl shadow-lg border-4 border-white"
              />
            </motion.div>
          </div>

          <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-16 mt-32">
            <motion.div {...fadeIn} className="flex-1 space-y-6">
              <h3 className="text-3xl font-['Source_Sans_3'] font-bold text-[#2D2D2D] tracking-tight">
                Section 2: Writing
              </h3>
              <p className="text-lg text-[#4A4A4A] leading-relaxed">
                Learn EXACTLY what you need to write to score an 80+. You’ll
                receive my own 80+ scoring sample essays and refined contentions
                so that you can consistently stand out from the rest of the
                cohort.
              </p>
            </motion.div>
            <motion.div {...fadeIn} className="flex-1">
              <img
                src={s2Image}
                alt="Section 2 Essays"
                className="rounded-xl shadow-lg border-4 border-white"
              />
            </motion.div>
          </div>

          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 mt-32">
            <motion.div {...fadeIn} className="flex-1 space-y-6">
              <h3 className="text-3xl font-['Source_Sans_3'] font-bold text-[#2D2D2D] tracking-tight">
                Section 3: Science
              </h3>
              <p className="text-lg text-[#4A4A4A] leading-relaxed">
                Learn ONLY relevant theory and gain exclusive access to
                handcrafted practice questions that accurately predicted
                elements of real GAMSAT questions in 2023 and 2024.
              </p>
            </motion.div>
            <motion.div {...fadeIn} className="flex-1">
              <img
                src={s3Image}
                alt="Section 3 Science"
                className="rounded-xl shadow-lg border-4 border-white"
              />
            </motion.div>
          </div>
        </div>
      </section> */}

      {/* Social Proof Section */}
      <section className="py-24 bg-[#FAF8F4]">
        <div className="container mx-auto px-4">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl font-['Source_Sans_3'] font-bold text-[#2D2D2D] tracking-tight">
              See what past students have to say!
            </h2>
          </motion.div>
          <motion.div {...fadeIn} className="max-w-5xl mx-auto">
            <img
              src={socialProofImage}
              alt="Student Testimonials"
              className="w-full rounded-2xl shadow-xl border-8 border-white"
            />
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
            <h2 className="text-3xl md:text-4xl font-['Source_Sans_3'] font-bold mb-6 text-[#2D2D2D] tracking-tight">
              Interested in joining? Or have some more questions?
            </h2>
            <p className="text-lg text-[#4A4A4A] mb-12 max-w-2xl mx-auto">
              Our community is built on open communication and support. We
              typically respond within 24 hours to all inquiries.
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
                  <div className="font-bold text-[#2D2D2D]">
                    smashmedproductions@gmail.com
                  </div>
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
                  <div className="text-sm text-[#4A4A4A]">
                    Join the community
                  </div>
                  <div className="font-bold text-[#2D2D2D]">
                    GAMSAT AUS STUDY GROUP
                  </div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
