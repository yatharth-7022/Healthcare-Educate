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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const { user, isAuthenticated, login, register, isLoggingIn, isRegistering } =
    useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Redirect if already authenticated
  if (isAuthenticated) {
    setLocation("/dashboard");
    return null;
  }

  const handleLogin = async (data: LoginFormData) => {
    try {
      await login(data);
      toast({
        title: "Success!",
        description: "You have been logged in successfully.",
      });
      setLocation("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to log in. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await register({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      toast({
        title: "Success!",
        description: "Your account has been created successfully.",
      });
      setLocation("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white font-body selection:bg-primary/20">
      {/* Left Column: Branding & Visuals */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#FAF8F4] relative flex-col items-center justify-center p-12 overflow-hidden">
        {/* Topographic Background */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url(${heroTexture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 flex flex-col items-center max-w-md text-center">
          <Link href="/">
            <img
              src={logoImg}
              alt="SmashMed Logo"
              className="h-20 w-auto mb-12 mix-blend-multiply hover:opacity-80 transition-opacity"
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
            <img
              src={logoImg}
              alt="SmashMed"
              className="h-8 w-auto mix-blend-multiply"
            />
          </Link>
        </div>

        <Link
          href="/"
          className="absolute top-8 right-8 text-sm font-medium text-gray-500 hover:text-primary flex items-center gap-2 transition-colors"
        >
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
                      <h3 className="text-2xl font-heading font-bold text-gray-900">
                        Welcome back
                      </h3>
                      <p className="text-sm text-gray-500">
                        Enter your credentials to access your dashboard
                      </p>
                    </div>

                    <form
                      className="space-y-4"
                      onSubmit={loginForm.handleSubmit(handleLogin)}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          className="h-11 rounded-xl border-gray-200 focus:ring-primary/20"
                          {...loginForm.register("email")}
                        />
                        {loginForm.formState.errors.email && (
                          <p className="text-xs text-red-500">
                            {loginForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="password">Password</Label>
                          <button
                            type="button"
                            className="text-xs font-semibold text-primary hover:underline"
                          >
                            Forgot password?
                          </button>
                        </div>
                        <Input
                          id="password"
                          type="password"
                          className="h-11 rounded-xl border-gray-200 focus:ring-primary/20"
                          {...loginForm.register("password")}
                        />
                        {loginForm.formState.errors.password && (
                          <p className="text-xs text-red-500">
                            {loginForm.formState.errors.password.message}
                          </p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all mt-4"
                        disabled={isLoggingIn}
                      >
                        {isLoggingIn ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Log in"
                        )}
                      </Button>
                    </form>

                    {/* <div className="relative pt-4">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-100"></span>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-400 font-medium tracking-wider">Social login</span>
                      </div>
                    </div> */}

                    {/* <Button 
                      variant="outline" 
                      className="w-full h-11 rounded-xl border-gray-200 font-semibold text-gray-600 hover:bg-gray-50"
                      onClick={() => window.location.href = "/api/login"}
                    >
                      Continue with Replit
                    </Button> */}
                  </TabsContent>

                  <TabsContent value="register" className="mt-0 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-heading font-bold text-gray-900">
                        Get started
                      </h3>
                      <p className="text-sm text-gray-500">
                        Create your account to begin your journey
                      </p>
                    </div>

                    <form
                      className="space-y-4"
                      onSubmit={registerForm.handleSubmit(handleRegister)}
                    >
                      <div className="space-y-2">
                        <Label htmlFor="reg-name">Username</Label>
                        <Input
                          id="reg-name"
                          placeholder="johndoe"
                          className="h-11 rounded-xl border-gray-200 focus:ring-primary/20"
                          {...registerForm.register("username")}
                        />
                        {registerForm.formState.errors.username && (
                          <p className="text-xs text-red-500">
                            {registerForm.formState.errors.username.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reg-email">Email address</Label>
                        <Input
                          id="reg-email"
                          type="email"
                          placeholder="name@example.com"
                          className="h-11 rounded-xl border-gray-200 focus:ring-primary/20"
                          {...registerForm.register("email")}
                        />
                        {registerForm.formState.errors.email && (
                          <p className="text-xs text-red-500">
                            {registerForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="reg-password">Password</Label>
                          <Input
                            id="reg-password"
                            type="password"
                            className="h-11 rounded-xl border-gray-200 focus:ring-primary/20"
                            {...registerForm.register("password")}
                          />
                          {registerForm.formState.errors.password && (
                            <p className="text-xs text-red-500">
                              {registerForm.formState.errors.password.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm</Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            className="h-11 rounded-xl border-gray-200 focus:ring-primary/20"
                            {...registerForm.register("confirmPassword")}
                          />
                          {registerForm.formState.errors.confirmPassword && (
                            <p className="text-xs text-red-500">
                              {
                                registerForm.formState.errors.confirmPassword
                                  .message
                              }
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        type="submit"
                        className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all mt-4"
                        disabled={isRegistering}
                      >
                        {isRegistering ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Create account"
                        )}
                      </Button>
                    </form>

                    <p className="text-center text-xs text-gray-400 leading-relaxed px-4">
                      By creating an account, you agree to our Terms of Service
                      and Privacy Policy.
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
