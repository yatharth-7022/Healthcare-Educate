import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import logoImg from "@assets/logo_1768894056469.jpg";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Courses", href: "#courses" },
    { label: "GAMSAT", href: "#gamsat" },
    { label: "Live Courses", href: "#live" },
    { label: "Pricing", href: "#pricing" },
    { label: "Resources", href: "#resources" },
    { label: "Company", href: "#company" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="cursor-pointer">
              <img 
                src={logoImg} 
                alt="SmashMed Logo" 
                className="h-10 w-auto object-contain mix-blend-multiply" 
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium text-gray-600 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
              <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px]">🇦🇺</span>
              <span>AU</span>
            </div>
            
            <div className="h-6 w-px bg-gray-200" />

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Hi, {user?.firstName || 'User'}</span>
                <Button 
                  onClick={() => logout()}
                  variant="ghost" 
                  size="sm"
                  className="text-gray-600 hover:text-primary hover:bg-primary/5"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <a href="/api/login">
                <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 px-6 rounded-full font-semibold">
                  Login
                </Button>
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-500 hover:text-primary p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-100">
                {isAuthenticated ? (
                  <Button onClick={() => logout()} variant="outline" className="w-full justify-start">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <a href="/api/login" className="block">
                    <Button className="w-full bg-primary text-white">Login</Button>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
