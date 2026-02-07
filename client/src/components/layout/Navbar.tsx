import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/hooks/use-theme";
import logoImg from "@assets/final_logo.png";
import { Button } from "@/components/ui/button";
import { 
  Menu, X, ChevronDown, LogOut, Globe, ArrowLeft, 
  Sun, Moon, User, Settings, LayoutDashboard 
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [location, setLocation] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isHomePage = location === "/";
  const isDashboard = location === "/dashboard";

  const navLinks = [
    {
      label: "Courses",
      dropdown: [
        { label: "Live Courses", href: "/courses" },
        { label: "GAMSAT", href: "#gamsat" },
      ],
    },
    { label: "Pricing", href: "/pricing" },
    { label: "Honour Roll", href: "/honour-roll" },
    {
      label: "Resources",
      dropdown: [
        {
          label: "Blog",
          href: "https://medium.com/@smashmedproductions/how-to-prepare-for-gamsat-section-3-what-you-actually-need-to-know-45a8ace04204",
        },
        { label: "Free Guide", href: "#guide" },
      ],
    },
    {
      label: "Company",
      dropdown: [{ label: "About Us", href: "/about" }],
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveDropdown(null);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-[100] border-b transition-all duration-300",
      "bg-background/80 backdrop-blur-md border-border"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center gap-4">
          {/* Left Section: Back Button and Logo */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {!isHomePage && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.history.back()}
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group px-2"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                <span className="hidden sm:inline font-medium">Back</span>
              </Button>
            )}

            <Link href="/" className="cursor-pointer flex items-center">
              <img
                src={logoImg}
                alt="SmashMed Logo"
                className={cn(
                  "h-24 w-auto mt-2 object-contain",
                  theme === "dark" && "brightness-0 invert"
                )}
              />
            </Link>
          </div>

          {/* Center: Desktop Nav */}
          <div
            className="hidden lg:flex items-center space-x-1"
            ref={dropdownRef}
          >
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative group px-3 py-2"
                onMouseEnter={() =>
                  link.dropdown && setActiveDropdown(link.label)
                }
                onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
              >
                {link.dropdown ? (
                  <button
                    className={cn(
                      "flex items-center gap-1 text-[15px] font-medium text-muted-foreground hover:text-primary transition-colors focus:outline-none",
                      activeDropdown === link.label && "text-primary",
                    )}
                    aria-expanded={activeDropdown === link.label}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        activeDropdown === link.label && "rotate-180",
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href || "#"}
                    className="text-[15px] font-medium text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-48 bg-background border border-border shadow-xl rounded-xl mt-1 py-2 z-50"
                    >
                      {link.dropdown.map((subItem) => {
                        const isExternal = subItem.href.startsWith("http");
                        return (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
                            className="block px-4 py-2.5 text-sm text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors first:rounded-t-lg last:rounded-b-lg"
                          >
                            {subItem.label}
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="text-muted-foreground hover:text-primary transition-colors rounded-full"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>

            <div className="flex items-center space-x-2 text-sm font-medium text-muted-foreground cursor-default">
              <Globe className="w-4 h-4 text-muted-foreground/50" />
              <span>AU</span>
            </div>

            <div className="h-6 w-px bg-border" />

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
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
                    <Link href="/dashboard">
                      <DropdownMenuItem className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                    </Link>
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

                {!isDashboard && (
                  <Link href="/dashboard">
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 rounded-full font-semibold">
                      Open SmashMed
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/auth">
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full px-5"
                  >
                    Login
                  </Button>
                </Link>

                <Link to="/auth">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 rounded-full font-semibold">
                    Open SmashMed
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="text-muted-foreground"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-muted-foreground hover:text-primary p-2 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 top-20 bg-background z-[90] overflow-y-auto"
          >
            <div className="px-6 py-8 space-y-6">
              {navLinks.map((link) => (
                <div key={link.label} className="space-y-4">
                  <div className="text-lg font-bold text-foreground">
                    {link.label}
                  </div>
                  {link.dropdown ? (
                    <div className="pl-4 space-y-3 border-l-2 border-border">
                      {link.dropdown.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          className="block text-[15px] font-medium text-muted-foreground hover:text-primary"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <Link 
                      href={link.href || "#"} 
                      className="block text-[15px] font-medium text-muted-foreground hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-8 border-t border-border space-y-4">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full h-12 bg-primary text-primary-foreground rounded-full font-bold">
                        Go to Dashboard
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      variant="outline"
                      className="w-full h-12 rounded-full border-2"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full h-12 bg-primary text-primary-foreground rounded-full font-bold">
                        Open SmashMed
                      </Button>
                    </Link>
                    <Link href="/auth" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="outline"
                        className="w-full h-12 rounded-full border-2"
                      >
                        Login
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
