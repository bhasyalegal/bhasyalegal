import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import Logo from "../img/logo.webp";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  
  const lastScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isHomePage = location.pathname === "/";

  const navItems = React.useMemo(
    () => [
      { name: t("home"), path: "/" },
      { name: t("about"), path: "/about" },
      { name: t("services"), path: "/services" },
      { name: t("attorneys"), path: "/attorneys" },
      { name: t("blog"), path: "/blog" },
      { name: t("contact"), path: "/contact" },
    ],
    [t]
  );

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "np" : "en");
  }, [language, setLanguage]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollYRef.current);
      setIsScrolled(currentScrollY > 50);
      
      if (scrollDelta > 10) {
        if (currentScrollY > lastScrollYRef.current && currentScrollY > 80) {
          setIsMobileMenuOpen(false);
          setIsNavVisible(false);
        } else {
          setIsNavVisible(true);
        }
        lastScrollYRef.current = currentScrollY;
      }
    };

    const debouncedScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(handleScroll, 10);
    };

    window.addEventListener("scroll", debouncedScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", debouncedScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isNavVisible ? "translate-y-0 text-opacity-100" : "-translate-y-full text-opacity-0"
      } ${
        isScrolled
          ? "backdrop-blur-xl bg-white/80 dark:bg-[#1b0738]/80 shadow-elegant-lg border-b border-gray-200/40 dark:border-white/5"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-24 md:h-28">
          
          {/* TOP-LEFT BRANDING LAYER (Home Page Only) */}
          <div className={`flex-shrink-0 transition-all duration-300 ${isHomePage ? "w-[140px] md:w-[160px] lg:w-[180px] opacity-100" : "w-0 opacity-0 pointer-events-none"}`}>
            {isHomePage && (
              <Link
                to="/"
                aria-label="Bhasya Legal Home"
                className="block hover:scale-102 active:scale-98 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 rounded-xl"
              >
                <img
                  src={Logo}
                  alt="Bhasya Legal Logo"
                  loading="lazy"
                  className="w-full object-contain drop-shadow-md"
                />
              </Link>
            )}
          </div>

          {/* DESKTOP LINKS FRAMEWORK */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-3 mx-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive(item.path) ? "page" : undefined}
                className={`relative text-[15px] font-medium tracking-wide transition-all duration-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]
                  ${
                    isActive(item.path)
                      ? "text-[#D4AF37]"
                      : "text-gray-800 dark:text-gray-100 hover:text-[#D4AF37] dark:hover:text-[#D4AF37]"
                  }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#D4AF37] rounded-full animate-scale-in" />
                )}
              </Link>
            ))}
          </div>

          {/* DESKTOP CONTROLS (Shifted left via lg:mr-12) */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0 lg:mr-12">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200"
              aria-label="Switch Language"
            >
              <Globe className="w-5 h-5 text-[#D4AF37]" />
              <span className="ml-1 text-xs uppercase font-bold">{language}</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5 text-[#D4AF37]" /> : <Moon className="w-5 h-5 text-[#1b0738]" />}
            </Button>
          </div>

          {/* MOBILE RESPONSIVE ACTION BAR */}
          <div className="flex lg:hidden items-center justify-end w-full space-x-2 sm:mr-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleLanguage} 
              className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"
              aria-label="Switch Language Mobile"
            >
              <Globe className="w-5 h-5 text-[#D4AF37]" />
              <span className="ml-0.5 text-[10px] uppercase font-bold">{language}</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"
              aria-label="Toggle Theme Mobile"
            >
              {theme === "dark" ? <Sun className="w-5 h-5 text-[#D4AF37]" /> : <Moon className="w-5 h-5 text-[#1b0738]" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-[#D4AF37] hover:bg-gray-100 dark:hover:bg-white/5"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

        </div>
      </div>

      {/* MOBILE EXPANDABLE LINK DRAWER */}
      <div
        className={`lg:hidden fixed inset-x-0 top-24 bg-white/95 dark:bg-[#1b0738]/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 transition-all duration-300 transform origin-top ${
          isMobileMenuOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-90 pointer-events-none"
        }`}
      >
        <div className="px-6 py-6 space-y-2 flex flex-col">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-lg font-medium p-3 rounded-xl transition-all duration-200 ${
                isActive(item.path)
                  ? "bg-[#D4AF37]/10 text-[#D4AF37] font-semibold"
                  : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;