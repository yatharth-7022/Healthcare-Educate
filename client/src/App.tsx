import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PublicRoute } from "@/components/auth/PublicRoute";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AuthPage from "@/pages/AuthPage";
import Dashboard from "@/pages/Dashboard";
import About from "@/pages/About";
import Courses from "@/pages/Courses";
import Pricing from "@/pages/Pricing";
import HonourRoll from "@/pages/HonourRoll";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth">
        <PublicRoute>
          <AuthPage />
        </PublicRoute>
      </Route>
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/about" component={About} />
      <Route path="/courses" component={Courses} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/honour-roll" component={HonourRoll} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isDashboard = location === "/dashboard";

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          {!isDashboard && <Navbar />}
          <main className="flex-grow">
            <Router />
          </main>
          {!isDashboard && <Footer />}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
