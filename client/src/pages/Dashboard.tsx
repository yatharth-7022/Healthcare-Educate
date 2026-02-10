import { useAuth } from "@/hooks/use-auth";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Clock,
  TrendingUp,
  PlayCircle,
  FileText,
  Users,
  ChevronRight,
  ArrowRight,
  LogOut,
  User,
  Settings,
  Award,
  Target,
  Zap,
  BarChart3,
  MessageSquare,
  Video,
  CheckCircle2,
  Timer,
  Flame,
  Trophy,
  LayoutDashboard,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import logoImg from "@assets/final_logo.png";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const stats = [
    {
      label: "Study Streak",
      value: "12 days",
      icon: Flame,
      trend: "+3 from last week",
    },
    {
      label: "Total Hours",
      value: "48.5",
      icon: Timer,
      trend: "+12% this month",
    },
    {
      label: "Mock Tests",
      value: "8/12",
      icon: Target,
      trend: "4 remaining",
    },
    {
      label: "Avg Score",
      value: "78%",
      icon: Trophy,
      trend: "+5% improvement",
    },
  ];

  const quickActions = [
    { icon: PlayCircle, label: "Continue Course" },
    { icon: Video, label: "Live Classes" },
    { icon: FileText, label: "Practice Tests" },
    { icon: BarChart3, label: "My Progress" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Enhanced Dashboard Header */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-xl border-b border-border/40 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/dashboard"
              className="cursor-pointer flex items-center"
            >
              <img
                src={logoImg}
                alt="SmashMed Logo"
                className="h-16 w-auto object-contain dark:brightness-110"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              <Button variant="ghost" size="sm" className="text-sm font-medium">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Courses
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full ring-2 ring-primary/10 hover:ring-primary/30 transition-all"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary text-white font-bold text-sm">
                      {user?.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex items-center gap-3 py-2">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-white font-bold">
                        {user?.username?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold leading-none">
                        {user?.username}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                      <Badge
                        variant="secondary"
                        className="w-fit text-[10px] mt-1"
                      >
                        Premium Student
                      </Badge>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Preferences</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Award className="mr-2 h-4 w-4" />
                  <span>Achievements</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={async () => {
                    await logout();
                    setLocation("/auth");
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section with Stats */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
                Welcome back, {user?.username || "Scholar"}!
              </h1>
              <p className="text-muted-foreground text-lg">
                Let's continue your GAMSAT journey today 🚀
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-3 py-1">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                45% Complete
              </Badge>
            </div>
          </div>

          {/* Stats Cards */}
          {/* <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="border-border/50 hover:border-border transition-all hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-primary/10">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="text-xs text-primary font-medium">
                        {stat.trend}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div> */}
        </motion.div>

        {/* Quick Actions */}
        {/* <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {quickActions.map((action, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <Button
                className="w-full h-24 bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all group"
                variant="default"
              >
                <div className="flex flex-col items-center gap-2">
                  <action.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-semibold">{action.label}</span>
                </div>
              </Button>
            </motion.div>
          ))}
        </motion.div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Primary Course Card */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <Card className="overflow-hidden border-border/50 shadow-xl bg-gradient-to-br from-card to-card/50">
                <div className="h-1.5 bg-primary w-full" />
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-bold">
                          GAMSAT Preparation Course
                        </CardTitle>
                      </div>
                      <CardDescription className="text-base">
                        Comprehensive curriculum covering all sections with
                        expert guidance
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">
                        Overall Progress
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        45%
                      </span>
                    </div>
                    <Progress value={45} className="h-3" />
                    <p className="text-xs text-muted-foreground">
                      11 of 24 modules completed
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-xl">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <BookOpen className="w-4 h-4 text-primary mr-1" />
                      </div>
                      <p className="text-2xl font-bold">12/24</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Modules
                      </p>
                    </div>
                    <div className="text-center border-x border-border/50">
                      <div className="flex items-center justify-center mb-1">
                        <CheckCircle2 className="w-4 h-4 text-primary mr-1" />
                      </div>
                      <p className="text-2xl font-bold">840</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Questions
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Target className="w-4 h-4 text-primary mr-1" />
                      </div>
                      <p className="text-2xl font-bold text-primary">
                        Physics II
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Next Goal
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1 h-12 bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all group">
                      Continue Learning
                      <PlayCircle className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 h-12 border-border hover:bg-accent font-semibold"
                    >
                      View Syllabus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Recent Activity</h2>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    icon: FileText,
                    title: "Section II Essay Submitted",
                    time: "2 hours ago",
                    status: "Pending Review",
                  },
                  {
                    icon: TrendingUp,
                    title: "Biology Mock Completed",
                    time: "Yesterday",
                    status: "Score: 78%",
                  },
                  {
                    icon: Award,
                    title: "Chemistry Module Finished",
                    time: "2 days ago",
                    status: "Achievement Unlocked",
                  },
                  {
                    icon: MessageSquare,
                    title: "Tutor Feedback Received",
                    time: "3 days ago",
                    status: "4 new comments",
                  },
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeInUp}>
                    <Card className="hover:shadow-lg transition-all border-border/40 group cursor-pointer">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-xl bg-primary/10">
                            <item.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                              {item.title}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{item.time}</span>
                              <span>•</span>
                              <span className="font-medium">{item.status}</span>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            {/* Upcoming Live Classes */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <Card className="border-border/50 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Calendar className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Live Classes</CardTitle>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      Upcoming
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    {
                      title: "S3 Physics Workshop",
                      date: "FEB",
                      day: "12",
                      time: "7:00 PM AEDT",
                    },
                    {
                      title: "S2 Critical Thinking",
                      date: "FEB",
                      day: "15",
                      time: "6:30 PM AEDT",
                    },
                    {
                      title: "S1 Essay Techniques",
                      date: "FEB",
                      day: "18",
                      time: "8:00 PM AEDT",
                    },
                  ].map((session, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 hover:bg-accent/50 rounded-xl transition-all group cursor-pointer"
                    >
                      <div className="bg-primary text-white p-3 rounded-lg min-w-[60px] text-center shadow-md">
                        <p className="text-[10px] font-bold opacity-90">
                          {session.date}
                        </p>
                        <p className="text-xl font-bold">{session.day}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold mb-1 group-hover:text-primary transition-colors">
                          {session.title}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {session.time}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    className="w-full text-primary font-semibold mt-2 hover:bg-primary/10"
                  >
                    View Full Schedule
                    <Calendar className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Study Support */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <Card className="bg-primary/5 border-primary/20 shadow-lg">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Study Support</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Join our community of 500+ students and expert tutors
                  </p>
                  <div className="space-y-2">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold shadow-md hover:shadow-lg transition-all">
                      <MessageSquare className="mr-2 w-4 h-4" />
                      Join Discord
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-border hover:bg-accent font-semibold"
                    >
                      <Zap className="mr-2 w-4 h-4" />
                      Book 1-on-1 Session
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
