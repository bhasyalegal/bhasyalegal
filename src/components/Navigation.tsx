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
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleLogoRefresh = useCallback(() => {
    window.location.href = "/";
  }, []);

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
    setIsNavVisible(true);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isNavVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      } ${
        isScrolled
          ? "backdrop-blur-xl bg-white dark:bg-[#1b0738] shadow-elegant-lg border-b border-slate-200 dark:border-white/5"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="flex items-center justify-between lg:justify-center h-24 md:h-28 relative w-full">
          
          {/* LOGO LAYER */}
          <div className="flex-shrink-0 flex items-center lg:absolute lg:left-0 max-w-[70%] sm:max-w-none">
            {isHomePage && (
              <button
                onClick={handleLogoRefresh}
                type="button"
                className="relative p-0 m-0 border-0 bg-transparent cursor-pointer focus:outline-none group select-none flex items-center rounded-xl"
                aria-label="Bhasya Legal - Reset and Go Home"
              >
                {/* Expanded width here to ensure single-line text fits beautifully without clipping */}
                <div className="relative h-20 md:h-24 w-60 sm:w-80 md:w-96 flex items-center justify-start overflow-hidden rounded-lg">
                  <img
                    src={Logo}
                    alt="Bhasya Legal Logo"
                    loading="eager"
                    className={`absolute max-w-none h-[165%] w-full object-contain top-1/2 left-1/2 -translate-x-1/2 transition-all duration-300 group-hover:scale-102
                      ${isScrolled 
                        ? "opacity-0 -translate-y-[75%] pointer-events-none scale-95" 
                        : "opacity-100 -translate-y-[46%] scale-100"
                      }`}
                  />
                  <div
                    className={`absolute left-0 right-0 flex items-center justify-start transition-all duration-300 md:pl-2
                      ${isScrolled 
                        ? "opacity-100 translate-y-0 scale-100" 
                        : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                      }`}
                  >
                    {/* Added whitespace-nowrap to guarantee single-line structural execution */}
                    <div className="flex items-center gap-2 sm:gap-3 whitespace-nowrap">
                      <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-[#B38F1D] dark:text-[#D4AF37] drop-shadow-sm">
                        B<span className="text-slate-950 dark:text-neutral-200">L</span>
                      </span>
                      
                      <span className="h-6 w-[1px] bg-slate-300 dark:bg-white/20 self-center" />
                      
                      {/* Removed font-serif to match BL exact sizing type metric, golden 'B' retained */}
                      <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-slate-950 dark:text-neutral-200">
                        <span className="text-[#B38F1D] dark:text-[#D4AF37]">B</span>hasya
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            )}
          </div>

          {/* DESKTOP MATRIX */}
          <div className="hidden lg:flex items-center space-x-2 mx-auto justify-center">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive(item.path) ? "page" : undefined}
                className={`relative text-[15px] transition-all duration-200 rounded-md focus:outline-none px-4 py-2 text-slate-950 dark:text-neutral-200
                  ${
                    isActive(item.path)
                      ? "text-[#B38F1D] dark:text-[#D4AF37] underline underline-offset-8 decoration-2 decoration-[#B38F1D] dark:decoration-[#D4AF37]"
                      : "hover:text-[#B38F1D] dark:hover:text-[#D4AF37]"
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* DESKTOP CONTROLS */}
          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0 lg:absolute lg:right-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-slate-100 dark:hover:bg-white/5 text-slate-950 dark:text-neutral-200 h-9 w-9 rounded-lg"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-[#D4AF37]" />
              ) : (
                <Moon className="w-4 h-4 text-slate-950" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="hover:bg-slate-100 dark:hover:bg-white/5 text-slate-950 dark:text-neutral-200 h-9 w-14 rounded-lg"
              aria-label="Switch Language"
            >
              <Globe className="w-4 h-4 text-[#B38F1D]" />
              <span className="ml-1 text-[11px] uppercase text-slate-950 dark:text-neutral-200">{language}</span>
            </Button>
          </div>

          {/* MOBILE TRIGGER BUTTON CONTAINER */}
          <div className="flex lg:hidden items-center justify-end pr-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-950 dark:text-neutral-200 hover:bg-slate-100 dark:hover:bg-white/5 h-10 w-10 justify-center items-center flex rounded-xl border border-slate-200/50 dark:border-white/10"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER WINDOW */}
      <div
        className={`lg:hidden fixed inset-x-0 bg-white dark:bg-[#1b0738] transition-all duration-300 transform origin-top border-b border-slate-200 dark:border-white/10 ${
          isScrolled ? "top-24" : "top-24 md:top-28"
        } ${
          isMobileMenuOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-90 pointer-events-none"
        }`}
      >
        <div className="px-6 py-5 space-y-2 flex flex-col items-start w-full">
          {navItems.map((item) => (
            <React.Fragment key={item.path}>
              <Link
                to={item.path}
                className={`w-full text-base p-2.5 rounded-xl transition-all duration-200 text-slate-950 dark:text-white ${
                  isActive(item.path)
                    ? "bg-[#B38F1D]/10 text-[#B38F1D] dark:text-[#D4AF37] underline decoration-2"
                    : "hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                {item.name}
              </Link>
            </React.Fragment>
          ))}
          
          <div className="w-full h-[1px] bg-slate-200 dark:bg-white/10 my-3" />
          
          {/* CONTROL RENDER AREA INSIDE MOBILE TOGGLE SELECTION */}
          <div className="flex items-center justify-start gap-4 w-full pt-1 px-1">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleTheme} 
              className="text-slate-950 dark:text-white bg-transparent border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/5 h-9 px-3 gap-2 flex items-center rounded-lg"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-4 h-4 text-[#D4AF37]" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-950" />
                  <span>Dark Mode</span>
                </>
              )}
            </Button>

            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleLanguage} 
              className="text-slate-950 dark:text-white bg-transparent border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/5 h-9 px-3 gap-2 flex items-center rounded-lg"
            >
              <Globe className="w-4 h-4 text-[#B38F1D]" />
              <span className="uppercase text-xs">{language === "en" ? "नेपाली (NP)" : "English (EN)"}</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;