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
  LayoutDashboard
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
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/dashboard" className="cursor-pointer flex items-center">
            <img
              src={logoImg}
              alt="SmashMed Logo"
              className="h-20 w-auto object-contain mix-blend-multiply"
            />
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {user?.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.username}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={() => logout()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-bold font-heading text-foreground mb-1">
            Welcome back, {user?.username || "Scholar"}
          </h1>
          <p className="text-muted-foreground font-body">
            Your GAMSAT preparation, all in one place.
          </p>
        </motion.div>
        
        {/* ... existing dashboard content ... */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Primary Course Card */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <Card className="overflow-hidden border-primary/10 shadow-lg shadow-primary/5 hover:shadow-xl transition-shadow">
                <div className="h-2 bg-primary w-full" />
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold font-heading mb-2">GAMSAT Preparation Course</CardTitle>
                      <CardDescription className="text-base max-w-md">
                        The ultimate comprehensive curriculum for Section I, II, and III success.
                      </CardDescription>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-xl">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Overall Progress</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>

                  <div className="grid grid-cols-3 gap-4 py-4 border-y border-border/50">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Modules</p>
                      <p className="font-bold text-lg">12/24</p>
                    </div>
                    <div className="text-center border-x border-border/50">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Questions</p>
                      <p className="font-bold text-lg">840</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Next Goal</p>
                      <p className="font-bold text-lg">Physics II</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button className="flex-1 h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all group">
                      Continue learning
                      <PlayCircle className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                    </Button>
                    <Button variant="outline" className="flex-1 h-11 border-border/50 hover:bg-accent rounded-xl font-semibold">
                      View syllabus
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-4">
              <h2 className="text-xl font-bold font-heading">Recent Activity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: FileText, title: "Section II Essay Submitted", time: "2 hours ago", status: "Pending Review" },
                  { icon: TrendingUp, title: "Biology Mock Completed", time: "Yesterday", status: "Score: 78%" },
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeInUp}>
                    <Card className="hover:bg-accent/50 transition-colors border-border/40">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 bg-muted rounded-lg">
                          <item.icon className="w-5 h-5 text-primary/70" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.time} • {item.status}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            {/* Upcoming Live Classes */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <Card className="border-border/40">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Upcoming Live Classes</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "S3 Physics Workshop", date: "Feb 12", time: "7:00 PM AEDT" },
                    { title: "S2 Critical Thinking", date: "Feb 15", time: "6:30 PM AEDT" },
                  ].map((session, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-muted/50 p-2 -mx-2 rounded-lg transition-colors">
                      <div className="flex gap-3 items-center">
                        <div className="text-center bg-primary/5 p-2 rounded-lg min-w-[50px]">
                          <p className="text-[10px] uppercase font-bold text-primary/60">{session.date.split(' ')[0]}</p>
                          <p className="text-sm font-bold">{session.date.split(' ')[1]}</p>
                        </div>
                        <div>
                          <p className="text-sm font-bold group-hover:text-primary transition-colors">{session.title}</p>
                          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {session.time}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full text-xs text-primary font-bold mt-2">
                    View Full Schedule
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Resources */}
            <motion.div variants={fadeInUp} initial="initial" animate="animate">
              <Card className="bg-primary/5 border-primary/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Study Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Join our discord community to discuss questions with tutors and peers.
                  </p>
                  <Button className="w-full bg-primary/10 hover:bg-primary/20 text-primary border-none font-bold">
                    Join Discord
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
