import { Link } from "wouter";
import { Facebook, Instagram, PenSquare, Mail, MapPin, Phone } from "lucide-react";
import logoImg from "@assets/final_logo.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Live Courses", href: "/courses" },
      { label: "Pricing", href: "/pricing" },
    ],
    resources: [
      { label: "GAMSAT Free Guide", href: "#guide" },
      { label: "Study Blog", href: "#blog" },
      { label: "Success Stories", href: "/about#testimonials" },
      { label: "FAQ", href: "/courses#faq" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Cookie Policy", href: "#cookies" },
    ],
  };

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden bg-gradient-to-b from-[#FAF8F4] via-[#FAF8F4] to-[#F3F0E9] border-t border-[#E5E1D8]">
      {/* Subtle Grain/Noise Effect */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <img src={logoImg} alt="SmashMed" className="h-10 w-auto" />
            </Link>
            <p className="text-gray-500 leading-relaxed">
              Specialist GAMSAT preparation for the next generation of medical
              professionals. Join over 1,500 successful students.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/groups/952897526541226/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary/10 hover:text-primary transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary/10 hover:text-primary transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://medium.com/@smashmedproductions" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary/10 hover:text-primary transition-all">
                <PenSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 font-heading">Platform</h4>
            <ul className="space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-500 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-6 font-heading">Resources</h4>
            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-500 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 font-heading">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>support@smashmed.com.au</span>
              </li>
              <li className="flex items-start gap-3 text-gray-500">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Melbourne, Australia</span>
              </li>
              <li className="flex items-start gap-3 text-gray-500">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>Mon-Fri, 9am - 5pm AEST</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm">
            © {currentYear} SmashMed Productions. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-6">
            {footerLinks.legal.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-gray-400 hover:text-primary text-sm transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
