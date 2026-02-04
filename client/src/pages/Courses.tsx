import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle2,
  Clock,
  Calendar,
  Mail,
  Facebook,
  ArrowRight,
  BookOpen,
  Edit3,
  FlaskConical,
  MessageSquare,
  Zap,
  Star,
} from "lucide-react";

// Section 1 Images
import s1Analysis from "@assets/image_1769592399325.png";
import s1Strategies from "@assets/image_1769592417130.png";
import s1Passage from "@assets/image_1769592427866.png";

// Section 2 Images
import s2Essays from "@assets/image_1769592437670.png";
import s2Antiquated from "@assets/image_1769592447676.png";
import s2Media from "@assets/image_1769592473958.png";
import s2Vietnam from "@assets/image_1769592483878.png";
import s2Sample from "@assets/image_1769592494869.png";

// Section 3 Images
import s3Formula from "@assets/image_1769592532639.png";
import s3Table from "@assets/image_1769592541831.png";
import s3Reaction from "@assets/image_1769592553851.png";
import s3Force from "@assets/image_1769592561729.png";
import s3Support from "@assets/image_1769592571077.png";

// Testimonials
import testimonialsImg from "@assets/image_1769511849141.png";

// Student Reviews
import stud1Review from "@assets/stud_1_review.png";
import stud2Review from "@assets/stud_2_review.png";
import stud3Review from "@assets/stud_3_review.png";
import stud4Review from "@assets/stud_4_review.png";
import stud5Review from "@assets/stud_5_review.png";
import stud6Review from "@assets/stud_6_review.png";
import stud7Review from "@assets/stud_7_review.png";
import stud8Review from "@assets/stud_8_review.png";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4 },
};

const reviews = [
  {
    name: "Student 1",
    text: "",
    highlight: "I got 83 in S3! In my previous sitting I got 65.",
    text2: " Thank you so much once again 😊❤️",
    result: "83 in Section 3",
    image: stud1Review,
  },
  {
    name: "Student 2",
    text: "Hey Vab! Great mate — ",
    highlight: "ended with a 69 overall, with a 74 in S3",
    text2: " ❤️",
    result: "74 in Section 3",
    image: stud2Review,
  },
  {
    name: "Student 3",
    text: "Vab is a ",
    highlight: "fantastic tutor",
    text2:
      " who clearly knows what GAMSAT wants. His teaching method is clear and easy to follow. Would highly recommend!",
    result: "Highly Recommended",
    image: stud3Review,
  },
  {
    name: "Student 4",
    text: "I really liked your teaching style. It was ",
    highlight: "focused and paced according to students' understanding.",
    text2:
      " Working on the skills is most important, even if it means not going at a fast pace.",
    result: "Improved Understanding",
    image: stud4Review,
  },
  {
    name: "Student 5",
    text: "I just got my GAMSAT score back and really improved! ",
    highlight:
      "In my previous sitting I had little science knowledge and got 46. For this sitting I got a 57!",
    text2: "",
    result: "46 → 57 in Section 3",
    image: stud5Review,
  },
  {
    name: "Student 6",
    text: "I'm grateful for your help with my GAMSAT S3 prep, Vab. Your lessons were always ",
    highlight: "informative and engaging,",
    text2:
      " and the homework assignments really helped me focus on my weak spots.",
    result: "Engaged Learning",
    image: stud6Review,
  },
  {
    name: "Student 7",
    text: "",
    highlight:
      "I wrote my first S3 in 2022 and got only 45. This time I got a 60.",
    text2: " Thanks for all of your support.",
    result: "45 → 60 in Section 3",
    image: stud7Review,
  },
  {
    name: "Student 8",
    text: "I'm working with Vab now. ",
    highlight: "I'm really enjoying the content",
    text2: " we are working through ❤️",
    result: "Current Student",
    image: stud8Review,
  },
];

export default function Courses() {
  const [activeTab, setActiveTab] = useState("s1");

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-[#1A1A1A] font-['IBM_Plex_Sans'] pt-24 pb-20">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-280px * ${reviews.length})); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `,
        }}
      />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-['Source_Sans_3'] font-bold text-[#2D2D2D] mb-6 tracking-tight">
              Live Course <span className="text-[#674EA7]">Offerings</span>
            </h1>
            <p className="text-lg md:text-xl text-[#4A4A4A] leading-relaxed max-w-2xl mx-auto">
              Highly individualised tutoring in small groups, paired with the
              most comprehensive resources available for GAMSAT success.
            </p>
          </motion.div>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {[
            {
              icon: MessageSquare,
              title: "Small Group Learning",
              desc: "Interactive classes with limited students for maximum individual support.",
            },
            {
              icon: Zap,
              title: "Live Feedback",
              desc: "Real-time responses to your questions and immediate essay critiques.",
            },
            {
              icon: Star,
              title: "ACER-Aligned",
              desc: "Handcrafted content that accurately predicts real GAMSAT concepts.",
            },
          ].map((item, idx) => (
            <Card
              key={idx}
              className="bg-white border-none shadow-sm hover-elevate transition-all"
            >
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-[#674EA7]/10 rounded-xl flex items-center justify-center text-[#674EA7] mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#2D2D2D] mb-2">{item.title}</h3>
                <p className="text-sm text-[#4A4A4A] leading-relaxed">
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs Interface */}
        <Tabs
          defaultValue="s1"
          className="max-w-6xl mx-auto"
          onValueChange={setActiveTab}
        >
          <div className="flex justify-center mb-12">
            <TabsList className="bg-white border border-[#B4A7D6]/20 p-1 h-14 rounded-full shadow-sm">
              <TabsTrigger
                value="s1"
                className="rounded-full px-8 font-bold data-[state=active]:bg-[#674EA7] data-[state=active]:text-white transition-all"
              >
                Section 1
              </TabsTrigger>
              <TabsTrigger
                value="s2"
                className="rounded-full px-8 font-bold data-[state=active]:bg-[#674EA7] data-[state=active]:text-white transition-all"
              >
                Section 2
              </TabsTrigger>
              <TabsTrigger
                value="s3"
                className="rounded-full px-8 font-bold data-[state=active]:bg-[#674EA7] data-[state=active]:text-white transition-all"
              >
                Section 3
              </TabsTrigger>
            </TabsList>
          </div>

          <AnimatePresence mode="wait">
            <TabsContent value="s1" key="s1" className="mt-0 outline-none">
              <motion.div {...fadeIn}>
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                  <div className="space-y-8">
                    <div>
                      <Badge className="bg-[#674EA7]/10 text-[#674EA7] hover:bg-[#674EA7]/20 border-none mb-4 font-bold uppercase tracking-wider">
                        Reasoning & Humanities
                      </Badge>
                      <h2 className="text-4xl font-['Source_Sans_3'] font-bold text-[#2D2D2D] mb-4">
                        Section 1 Live Classes
                      </h2>
                      <p className="text-lg text-[#4A4A4A]">What's on Offer?</p>
                    </div>

                    <ul className="space-y-4">
                      {[
                        "Weekly 1-hour LIVE small group classes covering everything required to ace Section 1",
                        "Covers academic articles, social science, antiquated writings, cartoons, schematics, fiction, and poetry",
                        "Step-by-step approach to answer any S1 question",
                        "Weekly handcrafted questions with fully worked solutions",
                        "Line-by-line analysis of complex and obscure texts",
                        "Focus on using the text correctly to reach answers with 100% accuracy",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#674EA7] shrink-0 mt-1" />
                          <span className="text-[#4A4A4A] leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {/* 
                    <Card className="bg-[#674EA7] text-white border-none shadow-lg">
                      <CardContent className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <Clock className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-sm opacity-80 uppercase tracking-widest font-bold">
                              Class Schedule
                            </p>
                            <p className="text-xl font-bold">
                              Every Monday • 7:30 – 8:30 pm
                            </p>
                            <p className="text-sm opacity-80">
                              (Melbourne Time)
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card> */}
                  </div>

                  <div className="grid gap-6">
                    <img
                      src={s1Analysis}
                      alt="Text Analysis"
                      className="rounded-2xl shadow-md border-4 border-white"
                    />
                    <div className="grid grid-cols-2 gap-6">
                      <img
                        src={s1Strategies}
                        alt="Strategies"
                        className="rounded-xl shadow-sm border-2 border-white"
                      />
                      <img
                        src={s1Passage}
                        alt="Annotated Passage"
                        className="rounded-xl shadow-sm border-2 border-white"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="s2" key="s2" className="mt-0 outline-none">
              <motion.div {...fadeIn}>
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                  <div className="space-y-8">
                    <div>
                      <Badge className="bg-[#674EA7]/10 text-[#674EA7] hover:bg-[#674EA7]/20 border-none mb-4 font-bold uppercase tracking-wider">
                        Written Communication
                      </Badge>
                      <h2 className="text-4xl font-['Source_Sans_3'] font-bold text-[#2D2D2D] mb-4">
                        Section 2 Live Classes
                      </h2>
                      <p className="text-lg text-[#4A4A4A]">What's on Offer?</p>
                    </div>

                    <ul className="space-y-4">
                      {[
                        "Weekly 1-hour LIVE small group classes focusing on 80+ scoring strategies",
                        "BONUS 1-hour LIVE workshop for 1-on-1 personalised essay feedback",
                        "Access to 80+ scoring sample essays across variety of themes",
                        "Live planning walkthroughs to answer ANY topic the exam gives you",
                        "Unlimited detailed essay feedback outside class at no extra cost",
                        "Provision of content examples, key analytical points, and research summaries",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#674EA7] shrink-0 mt-1" />
                          <span className="text-[#4A4A4A] leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-lavender-50 p-6 rounded-2xl border border-[#B4A7D6]/20">
                      <p className="text-[#674EA7] font-bold flex items-center gap-2 mb-2">
                        <BookOpen className="w-5 h-5" />
                        Save Research Time
                      </p>
                      <p className="text-sm text-[#4A4A4A]">
                        We provide the analysis, research summaries, and
                        examples so you can focus on writing, not scrolling
                        through podcasts and journals.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    <img
                      src={s2Essays}
                      alt="Sample Essays"
                      className="rounded-2xl shadow-md border-4 border-white"
                    />
                    <div className="grid grid-cols-2 gap-6">
                      <img
                        src={s2Vietnam}
                        alt="Argument Depth"
                        className="rounded-xl shadow-sm border-2 border-white"
                      />
                      <img
                        src={s2Sample}
                        alt="Real-world Relevance"
                        className="rounded-xl shadow-sm border-2 border-white"
                      />
                    </div>
                    <img
                      src={s2Media}
                      alt="Analytical Points"
                      className="rounded-xl shadow-sm border-2 border-white"
                    />
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="s3" key="s3" className="mt-0 outline-none">
              <motion.div {...fadeIn}>
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                  <div className="space-y-8">
                    <div>
                      <Badge className="bg-[#674EA7]/10 text-[#674EA7] hover:bg-[#674EA7]/20 border-none mb-4 font-bold uppercase tracking-wider">
                        Physical Sciences
                      </Badge>
                      <h2 className="text-4xl font-['Source_Sans_3'] font-bold text-[#2D2D2D] mb-4">
                        Section 3 Live Classes
                      </h2>
                      <p className="text-lg text-[#4A4A4A]">What's on Offer?</p>
                    </div>

                    <ul className="space-y-4">
                      {[
                        "Weekly 2-hour LIVE small group classes covering theory and APPLICATION",
                        "Live walkthroughs of difficult ACER-style S3 questions",
                        "Weekly progress tests to track performance and receive regular feedback",
                        "BONUS 1-hour LIVE workshop: Bring any question for 1-on-1 support",
                        "High-quality questions predicting EXACT concepts assessed by ACER",
                        "Workbooks covering Basics, Advanced topics, and Separator lessons",
                        "Ongoing support outside of class !!",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#674EA7] shrink-0 mt-1" />
                          <span className="text-[#4A4A4A] leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-lavender-50 p-6 rounded-2xl border border-[#B4A7D6]/20">
                      <p className="text-[#674EA7] font-bold flex items-center gap-2 mb-2">
                        <BookOpen className="w-5 h-5" />
                        Save Research Time
                      </p>
                      <p className="text-sm text-[#4A4A4A]">
                        🧠 Think Beyond Content. We train you to handle
                        unfamiliar equations, graphs, and experiments with
                        confidence—exactly what high-scoring Section 3 demands.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-6">
                    <img
                      src={s3Formula}
                      alt="Equation Mastery"
                      className="rounded-2xl shadow-md border-4 border-white"
                    />
                    <div className="grid grid-cols-2 gap-6">
                      <img
                        src={s3Table}
                        alt="Data Interpretation"
                        className="rounded-xl shadow-sm border-2 border-white"
                      />
                      <img
                        src={s3Reaction}
                        alt="Organic Chemistry"
                        className="rounded-xl shadow-sm border-2 border-white"
                      />
                    </div>
                    <img
                      src={s3Force}
                      alt="Physics Concepts"
                      className="rounded-xl shadow-sm border-2 border-white"
                    />
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>

        {/* Comparison Summary */}
        <section className="mt-32 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-['Source_Sans_3'] font-bold text-[#2D2D2D]">
              Course Comparison
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Section 1",
                focus: "Critical thinking, strategy, obscure texts",
                duration: "1 hour weekly",
              },
              {
                title: "Section 2",
                focus: "80+ essay models, personalized feedback",
                duration: "1h + 1h workshop",
              },
              {
                title: "Section 3",
                focus: "Concept application, ACER prediction",
                duration: "2h + 1h workshop",
              },
            ].map((col, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
              >
                <h3 className="font-bold text-[#674EA7] mb-3">{col.title}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-[#A1A1A1] uppercase tracking-widest mb-1">
                      Primary Focus
                    </p>
                    <p className="text-[#4A4A4A] font-medium">{col.focus}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#A1A1A1] uppercase tracking-widest mb-1">
                      Live Contact
                    </p>
                    <p className="text-[#4A4A4A] font-medium">{col.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-['Source_Sans_3'] font-bold text-[#2D2D2D]">
              See what past students have to say!
            </h2>
          </div>
          <div className="relative overflow-hidden w-full py-4">
            <div className="flex animate-scroll w-max gap-8">
              {[...reviews, ...reviews, ...reviews].map((review, idx) => (
                <div
                  key={idx}
                  className="w-[280px] bg-white rounded-2xl p-6 shadow-sm border border-gray-50 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-[#4A4A4A] text-sm leading-relaxed mb-6 font-medium">
                      "{review.text}
                      <span className="bg-yellow-200/60 px-1 font-medium">
                        {review.highlight}
                      </span>
                      {review.text2}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm text-[#2D2D2D]">
                        {review.name}
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-widest font-bold">
                        {review.result}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-32 max-w-3xl mx-auto bg-white rounded-3xl p-12 border border-gray-100 shadow-sm">
          <h2 className="text-3xl font-['Source_Sans_3'] font-bold text-[#2D2D2D] mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div>
              <h4 className="font-bold text-[#2D2D2D] mb-2 text-lg">
                Are the classes recorded?
              </h4>
              <p className="text-[#4A4A4A] leading-relaxed">
                Yes, all live sessions are recorded and made available to
                students immediately after the class concludes, ensuring you
                never miss a lesson.
              </p>
            </div>
            <div className="h-px bg-gray-100"></div>
            <div>
              <h4 className="font-bold text-[#2D2D2D] mb-2 text-lg">
                How small are the groups?
              </h4>
              <p className="text-[#4A4A4A] leading-relaxed">
                We strictly limit our group sizes to ensure every student can
                interact directly with the tutor and receive personalized
                attention during live walkthroughs.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-[#674EA7] rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(180,167,214,0.3),transparent)] pointer-events-none"></div>
            <h2 className="text-3xl md:text-5xl font-['Source_Sans_3'] font-bold mb-8 relative z-10">
              Interested in joining? Or have some more questions?
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative z-10">
              <a
                href="mailto:smashmedproductions@gmail.com"
                className="w-full md:w-auto"
              >
                <Button className="w-full md:w-auto bg-white text-[#674EA7] hover:bg-white/90 h-14 px-8 rounded-full font-bold text-lg flex items-center gap-3 shadow-lg">
                  <Mail className="w-5 h-5" />
                  Email Us
                </Button>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto"
              >
                <Button className="w-full md:w-auto bg-[#B4A7D6] hover:bg-[#B4A7D6]/90 text-white h-14 px-8 rounded-full font-bold text-lg flex items-center gap-3 shadow-lg border border-white/20">
                  <Facebook className="w-5 h-5" />
                  Join Facebook Group
                </Button>
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
