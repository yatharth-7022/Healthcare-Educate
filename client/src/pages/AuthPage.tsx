import { useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logoImg from "@assets/smashmed-logo-tight.png";
import paintingImg from "@assets/hero_image.png";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import {
  useForm,
  type FieldError,
  type UseFormRegisterReturn,
} from "react-hook-form";
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
type Mode = "login" | "register";

const inputClass =
  "h-12 rounded-md border-input bg-background px-3.5 text-[15px] shadow-none " +
  "placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 " +
  "focus-visible:ring-primary/25 focus-visible:ring-offset-0 aria-[invalid=true]:border-destructive " +
  "aria-[invalid=true]:focus-visible:ring-destructive/25";

function FieldMessage({ id, error }: { id: string; error?: FieldError }) {
  if (!error?.message) return null;

  return (
    <p
      id={id}
      role="alert"
      className="mt-1.5 flex items-center gap-1.5 text-[13px] text-destructive"
    >
      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
      {error.message}
    </p>
  );
}

type TextFieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  hint?: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
};

function TextField({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  autoFocus,
  hint,
  error,
  registration,
}: TextFieldProps) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div>
      <Label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={isPassword && visible ? "text" : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          spellCheck={false}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${inputClass} ${isPassword ? "pr-11" : ""}`}
          {...registration}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((prev) => !prev)}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            {visible ? (
              <EyeOff className="h-[18px] w-[18px]" />
            ) : (
              <Eye className="h-[18px] w-[18px]" />
            )}
          </button>
        )}
      </div>
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[13px] text-muted-foreground">
          {hint}
        </p>
      )}
      <FieldMessage id={`${id}-error`} error={error} />
    </div>
  );
}

function SubmitButton({
  pending,
  idleLabel,
  pendingLabel,
}: {
  pending: boolean;
  idleLabel: string;
  pendingLabel: string;
}) {
  return (
    <Button
      type="submit"
      disabled={pending}
      className="mt-2 h-12 w-full rounded-md text-[15px] font-semibold shadow-none"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
          {pendingLabel}
        </>
      ) : (
        idleLabel
      )}
    </Button>
  );
}

function BrandLogo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="SmashMed home" className="inline-block">
      <img
        src={logoImg}
        alt="SmashMed"
        width={455}
        height={125}
        className={className}
      />
    </Link>
  );
}

export default function AuthPage() {
  const { login, register, isLoggingIn, isRegistering } = useAuth();
  const [, setLocation] = useLocation();
  const search = useSearch();
  const { toast } = useToast();
  const reduceMotion = useReducedMotion();
  const [mode, setMode] = useState<Mode>(
    new URLSearchParams(search).get("mode") === "register"
      ? "register"
      : "login",
  );

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

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

  const isLogin = mode === "login";

  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-foreground lg:flex-row">
      {/* Painting + caption plate (desktop) */}
      <aside className="hidden flex-col bg-[#FAF8F4] lg:flex lg:w-[56%] xl:w-[58%]">
        <div className="relative min-h-0 flex-1 overflow-hidden bg-[#DCD5EC]">
          <motion.img
            src={paintingImg}
            alt="Four medical students in scrubs reviewing notes together at a table"
            className="absolute inset-0 h-full w-full object-cover object-[42%_center]"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="border-t-[3px] border-[#674EA7] bg-[#FAF8F4] px-12 py-9 xl:px-16">
          <BrandLogo className="h-11 w-auto" />
          <h2 className="mt-6 font-heading text-[32px] font-bold leading-[1.15] tracking-tight text-[#2B2540]">
            Prepare with clarity.
            <br />
            Perform with confidence.
          </h2>
          <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-[#5D5675]">
            GAMSAT practice questions with step-by-step worked solutions, and a
            record of every attempt you make.
          </p>
        </div>
      </aside>

      {/* Painting strip (mobile / tablet) */}
      <div className="relative h-44 flex-shrink-0 overflow-hidden bg-[#DCD5EC] sm:h-56 lg:hidden">
        <img
          src={paintingImg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-[50%_18%]"
        />
        <div className="absolute bottom-0 left-0 rounded-tr-md bg-[#FAF8F4] px-5 pb-3 pt-3.5 sm:px-8">
          <BrandLogo className="h-8 w-auto" />
        </div>
      </div>

      {/* Form */}
      <div className="flex flex-1 flex-col px-6 py-10 sm:px-12 lg:px-14 xl:px-20">
        <div className="mx-auto my-auto w-full max-w-[400px]">
          <AnimatePresence mode="wait" initial={false}>
            {isLogin ? (
              <motion.section
                key="login"
                aria-labelledby="auth-title"
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <h1
                  id="auth-title"
                  className="font-heading text-[34px] font-bold leading-[1.1] tracking-tight"
                >
                  Welcome back
                </h1>
                <p className="mt-2.5 text-[15px] text-muted-foreground">
                  Log in to pick up your practice where you left off.
                </p>

                <form
                  className="mt-9 space-y-5"
                  onSubmit={loginForm.handleSubmit(handleLogin)}
                  noValidate
                >
                  <TextField
                    id="email"
                    label="Email address"
                    type="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                    autoFocus
                    error={loginForm.formState.errors.email}
                    registration={loginForm.register("email")}
                  />
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    error={loginForm.formState.errors.password}
                    registration={loginForm.register("password")}
                  />
                  <SubmitButton
                    pending={isLoggingIn}
                    idleLabel="Log in"
                    pendingLabel="Logging in"
                  />
                </form>
              </motion.section>
            ) : (
              <motion.section
                key="register"
                aria-labelledby="auth-title"
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <h1
                  id="auth-title"
                  className="font-heading text-[34px] font-bold leading-[1.1] tracking-tight"
                >
                  Create your account
                </h1>
                <p className="mt-2.5 text-[15px] text-muted-foreground">
                  Set up your details to start practising.
                </p>

                <form
                  className="mt-9 space-y-5"
                  onSubmit={registerForm.handleSubmit(handleRegister)}
                  noValidate
                >
                  <TextField
                    id="reg-name"
                    label="Username"
                    placeholder="Choose a username"
                    autoComplete="username"
                    autoFocus
                    error={registerForm.formState.errors.username}
                    registration={registerForm.register("username")}
                  />
                  <TextField
                    id="reg-email"
                    label="Email address"
                    type="email"
                    placeholder="name@example.com"
                    autoComplete="email"
                    error={registerForm.formState.errors.email}
                    registration={registerForm.register("email")}
                  />
                  <TextField
                    id="reg-password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    hint="At least 6 characters."
                    error={registerForm.formState.errors.password}
                    registration={registerForm.register("password")}
                  />
                  <TextField
                    id="confirm-password"
                    label="Confirm password"
                    type="password"
                    autoComplete="new-password"
                    error={registerForm.formState.errors.confirmPassword}
                    registration={registerForm.register("confirmPassword")}
                  />
                  <SubmitButton
                    pending={isRegistering}
                    idleLabel="Create account"
                    pendingLabel="Creating account"
                  />
                </form>

                <p className="mt-5 text-[13px] leading-relaxed text-muted-foreground">
                  By creating an account you agree to our Terms of Service and
                  Privacy Policy.
                </p>
              </motion.section>
            )}
          </AnimatePresence>

          <p className="mt-9 border-t border-border pt-6 text-[15px] text-muted-foreground">
            {isLogin ? "New to SmashMed?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setMode(isLogin ? "register" : "login")}
              className="rounded font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {isLogin ? "Create an account" : "Log in"}
            </button>
          </p>
        </div>

        <p className="mx-auto mt-10 w-full max-w-[400px] text-xs text-muted-foreground/80">
          © {new Date().getFullYear()} SmashMed Education. All rights reserved.
        </p>
      </div>
    </div>
  );
}
