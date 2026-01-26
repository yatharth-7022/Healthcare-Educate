import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import logoImg from "@assets/logo_1768894056469.jpg";
import heroTexture from "@assets/image_1768894056469.png";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowLeft } from "lucide-react";

export default function AuthPage() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    setLocation("/");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-body selection:bg-primary/20">
      {/* Left Column: Branding & Visuals */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#FAF8F4] relative flex-col items-center justify-center p-12 overflow-hidden">
        {/* Topographic Background */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{ 
            backgroundImage: `url(${heroTexture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="relative z-10 flex flex-col items-center max-w-md text-center">
          <Link href="/">
            <img 
              src={logoImg} 
              alt="SmashMed Logo" 
              className="h-12 w-auto mb-12 mix-blend-multiply hover:opacity-80 transition-opacity" 
            />
          </Link>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-heading font-bold text-gray-900 leading-tight mb-4"
          >
            Prepare with clarity. <br />
            Perform with confidence.
          </motion.h2>
          <p className="text-gray-500 font-medium">
            Join the community of future doctors preparing with SmashMed.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Right Column: Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative">
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-8 left-8">
          <Link href="/">
            <img src={logoImg} alt="SmashMed" className="h-8 w-auto mix-blend-multiply" />
          </Link>
        </div>

        <Link href="/" className="absolute top-8 right-8 text-sm font-medium text-gray-500 hover:text-primary flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-[440px]"
        >
          <Card className="border-gray-100 shadow-xl shadow-gray-200/50 rounded-2xl overflow-hidden">
            <CardContent className="p-0">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="w-full h-14 bg-gray-50/50 rounded-none border-b border-gray-100 p-0">
                  <TabsTrigger 
                    value="login" 
                    className="flex-1 h-full rounded-none data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-none border-r border-gray-100 font-bold text-gray-500 transition-all"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger 
                    value="register" 
                    className="flex-1 h-full rounded-none data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-none font-bold text-gray-500 transition-all"
                  >
                    Create account
                  </TabsTrigger>
                </TabsList>

                <div className="p-8">
                  <TabsContent value="login" className="mt-0 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-heading font-bold text-gray-900">Welcome back</h3>
                      <p className="text-sm text-gray-500">Enter your credentials to access your dashboard</p>
                    </div>

                    <form className="space-y-4" action="/api/login" method="GET">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email" 
                          placeholder="name@example.com" 
                          className="h-11 rounded-xl border-gray-200 focus:ring-primary/20"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="password">Password</Label>
                          <button type="button" className="text-xs font-semibold text-primary hover:underline">
                            Forgot password?
                          </button>
                        </div>
                        <Input 
                          id="password" 
                          name="password"
                          type="password" 
                          className="h-11 rounded-xl border-gray-200 focus:ring-primary/20"
                          required 
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all mt-4"
                        disabled={isLoading}
                      >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Log in"}
                      </Button>
                    </form>
                    
                    <div className="relative pt-4">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-100"></span>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-400 font-medium tracking-wider">Social login</span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full h-11 rounded-xl border-gray-200 font-semibold text-gray-600 hover:bg-gray-50"
                      onClick={() => window.location.href = "/api/login"}
                    >
                      Continue with Replit
                    </Button>
                  </TabsContent>

                  <TabsContent value="register" className="mt-0 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-heading font-bold text-gray-900">Get started</h3>
                      <p className="text-sm text-gray-500">Create your account to begin your journey</p>
                    </div>

                    <form className="space-y-4" action="/api/login" method="GET">
                      <div className="space-y-2">
                        <Label htmlFor="reg-name">Full name</Label>
                        <Input 
                          id="reg-name" 
                          placeholder="Dr. Jane Smith" 
                          className="h-11 rounded-xl border-gray-200 focus:ring-primary/20"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-email">Email address</Label>
                        <Input 
                          id="reg-email" 
                          type="email" 
                          placeholder="name@example.com" 
                          className="h-11 rounded-xl border-gray-200 focus:ring-primary/20"
                          required 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="reg-password">Password</Label>
                          <Input 
                            id="reg-password" 
                            type="password" 
                            className="h-11 rounded-xl border-gray-200 focus:ring-primary/20"
                            required 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm</Label>
                          <Input 
                            id="confirm-password" 
                            type="password" 
                            className="h-11 rounded-xl border-gray-200 focus:ring-primary/20"
                            required 
                          />
                        </div>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all mt-4"
                        disabled={isLoading}
                      >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create account"}
                      </Button>
                    </form>
                    
                    <p className="text-center text-xs text-gray-400 leading-relaxed px-4">
                      By creating an account, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
          
          <p className="text-center mt-8 text-sm text-gray-400">
            © 2025 SmashMed Education. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
