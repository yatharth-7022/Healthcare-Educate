import { useAuth } from "@/hooks/use-auth";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Calendar,
  TrendingUp,
  FileText,
  ArrowRight,
  LogOut,
  User,
  Settings,
  Target,
  Zap,
  MessageSquare,
  CheckCircle2,
  Timer,
  Flame,
  Trophy,
  LayoutDashboard,
  Moon,
  Sun,
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
import { useTheme } from "@/components/theme-provider";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { theme, setTheme } = useTheme();

  const sections = [
    { code: "S1", name: "Humanities & Social Sciences", progress: 60, done: 8, total: 12 },
    { code: "S2", name: "Written Communication", progress: 45, done: 2, total: 5 },
    { code: "S3", name: "Biological & Physical Sciences", progress: 30, done: 2, total: 7 },
  ];

  const recentActivity = [
    { icon: FileText, title: "Section II Essay submitted", meta: "Pending review", time: "2h ago" },
    { icon: TrendingUp, title: "Biology Mock Test completed", meta: "Score: 78%", time: "Yesterday" },
    { icon: CheckCircle2, title: "Chemistry module finished", meta: "Unit complete", time: "2 days ago" },
    { icon: MessageSquare, title: "Tutor feedback received", meta: "4 new comments", time: "3 days ago" },
  ];

  const upcomingSessions = [
    { title: "S3 Physics Workshop", day: "12", month: "Feb", time: "7:00 PM AEDT" },
    { title: "S2 Critical Thinking", day: "15", month: "Feb", time: "6:30 PM AEDT" },
    { title: "S1 Essay Techniques", day: "18", month: "Feb", time: "8:00 PM AEDT" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center">
              <img
                src={logoImg}
                alt="SmashMed"
                className="h-14 w-auto object-contain dark:brightness-110"
              />
            </Link>
            <nav className="hidden md:flex items-center gap-0.5">
              <Button variant="ghost" size="sm" className="text-sm font-medium h-8">
                <LayoutDashboard className="mr-1.5 h-3.5 w-3.5" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium text-muted-foreground h-8"
                onClick={() => setLocation("/dashboard/practice")}
              >
                <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                Practice
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium text-muted-foreground h-8"
              >
                <Calendar className="mr-1.5 h-3.5 w-3.5" />
                Schedule
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 gap-2 px-2 ml-1">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                      {user?.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium hidden sm:inline">
                    {user?.username}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="text-sm font-medium">{user?.username}</p>
                  <p className="text-xs text-muted-foreground font-normal">{user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
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
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page title */}
        <div className="flex items-end justify-between mb-7">
          <div>
            <p className="text-sm text-muted-foreground mb-0.5">Welcome back</p>
            <h1 className="text-2xl font-bold">{user?.username || "Scholar"}</h1>
          </div>
          <Badge variant="outline" className="text-xs gap-1.5 h-7 px-3">
            <CheckCircle2 className="w-3 h-3 text-primary" />
            GAMSAT — 45% complete
          </Badge>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-border rounded-xl mb-7 divide-y lg:divide-y-0 lg:divide-x divide-border overflow-hidden">
          {[
            { label: "Study streak", value: "12 days", icon: Flame, sub: "Personal best: 18 days" },
            { label: "Hours studied", value: "48.5 hrs", icon: Timer, sub: "+12% this month" },
            { label: "Questions done", value: "840", icon: Target, sub: "of 2,400 total" },
            { label: "Average score", value: "78%", icon: Trophy, sub: "+5% from last month" },
          ].map((stat, i) => (
            <div key={i} className="px-6 py-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </p>
                <stat.icon className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold tracking-tight mb-0.5">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course progress */}
            <Card className="border-border shadow-none">
              <CardHeader className="pb-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">
                    GAMSAT Preparation Course
                  </CardTitle>
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 h-7 text-xs font-semibold px-3"
                    onClick={() => setLocation("/dashboard/practice")}
                  >
                    Continue studying
                    <ArrowRight className="ml-1.5 w-3 h-3" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-5 space-y-5">
                {/* Overall */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground font-medium">Overall progress</span>
                    <span className="text-xs font-bold text-primary">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>

                {/* Per section */}
                <div className="space-y-4 pt-1">
                  {sections.map((s) => (
                    <div key={s.code}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded shrink-0">
                            {s.code}
                          </span>
                          <span className="text-sm font-medium">{s.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0 ml-3">
                          {s.done}/{s.total}
                        </span>
                      </div>
                      <Progress value={s.progress} className="h-1.5" />
                    </div>
                  ))}
                </div>

                {/* Footer stats */}
                <div className="flex items-center gap-6 pt-4 border-t border-border text-xs text-muted-foreground">
                  <span>
                    <span className="font-semibold text-foreground">11</span> of 24 modules done
                  </span>
                  <span>
                    <span className="font-semibold text-foreground">840</span> questions answered
                  </span>
                  <span className="ml-auto">Next: Physics II</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent activity */}
            <Card className="border-border shadow-none">
              <CardHeader className="pb-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm" className="text-xs text-primary h-7 px-2">
                    View all
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {recentActivity.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 px-6 py-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-lg border border-border flex items-center justify-center shrink-0 group-hover:border-primary/40 transition-colors">
                      <item.icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.meta}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">{item.time}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right — 1 col */}
          <div className="space-y-6">
            {/* Upcoming sessions */}
            <Card className="border-border shadow-none">
              <CardHeader className="pb-4 border-b border-border">
                <CardTitle className="text-sm font-semibold">Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {upcomingSessions.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer group"
                  >
                    <div className="text-center w-9 shrink-0">
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase leading-none mb-1">
                        {s.month}
                      </p>
                      <p className="text-xl font-bold leading-none">{s.day}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium group-hover:text-primary transition-colors">
                        {s.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{s.time}</p>
                    </div>
                  </div>
                ))}
                <div className="p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-xs text-muted-foreground border border-border h-8 hover:text-foreground"
                  >
                    View full schedule
                    <Calendar className="ml-1.5 w-3.5 h-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Community */}
            <Card className="border-border shadow-none">
              <CardHeader className="pb-4 border-b border-border">
                <CardTitle className="text-sm font-semibold">Study Community</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  500+ students and expert tutors ready to help you prepare for GAMSAT.
                </p>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-8 text-xs font-semibold">
                  <MessageSquare className="mr-1.5 w-3.5 h-3.5" />
                  Join Discord
                </Button>
                <Button variant="outline" className="w-full h-8 text-xs font-semibold border-border">
                  <Zap className="mr-1.5 w-3.5 h-3.5" />
                  Book 1-on-1 session
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
