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

  const refreshPage = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollYRef.current);
      setIsScrolled(currentScrollY > 50);
      if (scrollDelta > 10) {
        if (currentScrollY > lastScrollYRef.current && currentScrollY > 80) {
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
      scrollTimeoutRef.current = setTimeout(handleScroll, 50);
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
    <>
      {/* LOGO - Only on homepage */}
      {location.pathname === "/" && (
        <button
          onClick={refreshPage}
          aria-label="Home - Refresh page"
          className={`fixed z-50 transition-all duration-300 ${
            isNavVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full"
          } hover:scale-105 focus:outline-none focus:ring-2 focus:ring-law-gold focus:ring-offset-2`}
          style={{ top: "12px", left: "24px" }}
        >
          <img
            src={Logo}
            alt="Company Logo"
            loading="lazy"
            className="w-[140px] md:w-[180px] lg:w-[200px] object-contain
                       drop-shadow-sm
                       dark:brightness-100
                       dark:drop-shadow-none"
          />
        </button>
      )}

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isNavVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "backdrop-blur-2xl bg-white/10 dark:bg-black/20 shadow-lg"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-32 md:h-36 relative">
            {/* DESKTOP NAVIGATION - moved up by 2cm (added -mt-5) */}
            <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2 -mt-5">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={isActive(item.path) ? "page" : undefined}
                  className={`text-sm font-semibold tracking-wide transition-all duration-200 
                    focus:outline-none focus:ring-2 focus:ring-law-gold focus:ring-offset-2 rounded px-2 py-1
                    ${
                      isActive(item.path)
                        ? "text-law-gold border-b-2 border-law-gold pb-1"
                        : "text-gray-900 dark:text-white hover:text-law-gold"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* DESKTOP THEME + LANGUAGE CONTROLS - TOP RIGHT CORNER */}
            <div className="hidden lg:flex items-center space-x-3 absolute top-4 right-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="h-10 w-10 rounded-xl
                           bg-white/15 dark:bg-black/25
                           backdrop-blur-md
                           border border-white/20 dark:border-white/10
                           hover:bg-white/25 dark:hover:bg-black/35
                           transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-law-gold"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-white" />
                ) : (
                  <Moon className="h-5 w-5 text-black" />
                )}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                aria-label={`Switch to ${language === "en" ? "Nepali" : "English"}`}
                className="h-10 px-3 rounded-xl
                           bg-white/15 dark:bg-black/25
                           text-gray-900 dark:text-white
                           border border-white/20 dark:border-white/10
                           backdrop-blur-md
                           hover:bg-white/25 dark:hover:bg-black/35
                           transition-all duration-300
                           focus:outline-none focus:ring-2 focus:ring-law-gold
                           text-xs font-medium"
              >
                <Globe className="h-4 w-4 mr-1.5" />
                <span>{language === "en" ? "नेपाली" : "English"}</span>
              </Button>
            </div>

            {/* MOBILE MENU BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="lg:hidden absolute right-3
                         h-24 w-24
                         rounded-[2rem]
                         bg-white/25 dark:bg-black/35
                         backdrop-blur-2xl
                         border-2 border-white/30 dark:border-white/15
                         shadow-2xl
                         hover:scale-105
                         hover:bg-white/35 dark:hover:bg-black/45
                         transition-all duration-300
                         focus:outline-none focus:ring-2 focus:ring-law-gold"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X
                  size={60}
                  strokeWidth={2.5}
                  className="text-black dark:text-white"
                  aria-hidden="true"
                />
              ) : (
                <Menu
                  size={60}
                  strokeWidth={2.5}
                  className="text-black dark:text-white"
                  aria-hidden="true"
                />
              )}
            </Button>
          </div>

          {/* MOBILE DROPDOWN MENU */}
          {isMobileMenuOpen && (
            <div
              id="mobile-menu"
              className="lg:hidden mt-6 pb-8 rounded-[2rem]
                         bg-white/20 dark:bg-black/30
                         backdrop-blur-3xl
                         border-2 border-white/20 dark:border-white/10
                         shadow-[0_20px_80px_rgba(0,0,0,0.25)]
                         animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <div className="flex flex-col items-end space-y-8 pt-8 px-8">

                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-right w-full
                               text-3xl font-bold tracking-wide
                               transition-all duration-200 ${
                                 isActive(item.path)
                                   ? "text-law-gold"
                                   : "text-gray-900 dark:text-white hover:text-law-gold"
                               }`}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="w-full border-t-2 border-gray-300/30 dark:border-white/10 pt-6" />

                <div className="flex justify-end items-center gap-6 w-full">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="h-20 w-20 rounded-[1.5rem]
                               bg-white/15 dark:bg-black/20
                               text-gray-900 dark:text-white
                               border border-white/20 dark:border-white/10
                               hover:bg-white/25 dark:hover:bg-black/35"
                  >
                    {theme === "dark" ? (
                      <Sun size={38} />
                    ) : (
                      <Moon size={38} />
                    )}
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={toggleLanguage}
                    className="h-20 px-8
                               text-2xl font-semibold
                               rounded-[1.5rem]
                               bg-white/15 dark:bg-black/20
                               text-gray-900 dark:text-white
                               border-2 border-white/20 dark:border-white/10
                               backdrop-blur-xl"
                  >
                    <Globe className="h-8 w-8 mr-3" />
                    {language === "en" ? "नेपाली" : "English"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;