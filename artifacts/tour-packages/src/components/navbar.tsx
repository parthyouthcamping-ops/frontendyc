import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Search, Phone, Menu, X, Globe, User } from "lucide-react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location === path;

  return (
    <nav 
      className={`sticky top-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-white/20 dark:border-white/5 py-2 shadow-sm" 
          : "bg-white dark:bg-black py-4 border-b border-gray-100 dark:border-zinc-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-1.5 shrink-0 group">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:rotate-12 transition-transform duration-300">
               <Globe className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tight text-gray-900 dark:text-white flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Youth<span className="text-primary group-hover:translate-x-0.5 transition-transform">Camping</span>
              <span className="hidden sm:inline-block text-[10px] font-bold text-gray-400 dark:text-zinc-600 ml-1 mt-1.5 px-1.5 py-0.5 border border-gray-200 dark:border-zinc-800 rounded-md">PRO</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center px-4 py-2 bg-gray-50/50 dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 rounded-full gap-1">
            {[
              { label: "Tour Packages", href: "/" },
              { label: "Group Trips", href: "/trips" },
              { label: "Destinations", href: "/destinations" },
              { label: "About Us", href: "/about" },
            ].map((link) => (
              <Link 
                key={link.label}
                href={link.href} 
                className={`px-5 py-2 text-xs font-bold tracking-wide uppercase transition-all rounded-full ${
                  isActive(link.href) 
                    ? "bg-primary text-white shadow-lg shadow-red-500/20" 
                    : "text-gray-500 dark:text-zinc-400 hover:text-primary dark:hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Functional Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="hidden sm:flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-zinc-400 hover:text-primary transition-all px-4 py-2 rounded-full border border-gray-100 dark:border-zinc-800 hover:border-primary/30">
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>+91 99242 46267</span>
            </button>
            <div className="flex items-center gap-1.5">
              <button className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all text-gray-900 dark:text-white border border-transparent hover:border-gray-200 dark:hover:border-zinc-700 active:scale-90">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all text-gray-900 dark:text-white border border-transparent hover:border-gray-200 dark:hover:border-zinc-700 active:scale-90">
                <User className="w-5 h-5" />
              </button>
              <button
                className="lg:hidden p-2.5 rounded-full bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-800 active:scale-90"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar/Menu */}
      <div 
        className={`fixed inset-0 top-[64px] z-40 bg-white dark:bg-black lg:hidden transition-all duration-300 transform ${
          menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="p-6 space-y-6">
          <div className="flex flex-col gap-2">
            {["Tour Packages", "Group Trips", "Destinations", "About Us", "Contact Us"].map((item) => (
              <Link 
                key={item}
                href="#" 
                className="flex items-center justify-between px-4 py-4 text-lg font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-zinc-900 group"
                onClick={() => setMenuOpen(false)}
              >
                {item}
                <X className="w-4 h-4 text-gray-300 dark:text-zinc-700 group-hover:text-primary transition-colors rotate-45" />
              </Link>
            ))}
          </div>
          <div className="pt-6">
            <a 
              href="tel:+919924246267" 
              className="flex items-center justify-center gap-3 w-full py-5 bg-gray-50 dark:bg-zinc-900 rounded-3xl text-gray-900 dark:text-white font-bold"
            >
              <Phone className="w-5 h-5 text-primary" />
              +91 99242 46267
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
