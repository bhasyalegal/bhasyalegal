import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun, Globe, ChevronDown, Phone, Scale, Building2, Gavel, Users, ArrowRight } from "lucide-react";
import Logo from "../img/logo.webp";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";

// The 4 headline practice groups shown in the Services dropdown.
const SERVICE_DROPDOWN_ITEMS = [
  { anchor: "group-civil", icon: Scale, nameEn: "Civil Litigation", nameNp: "दिवानी मुद्दा" },
  { anchor: "group-corporate", icon: Building2, nameEn: "Corporate & Commercial", nameNp: "कर्पोरेट र व्यावसायिक" },
  { anchor: "group-criminal", icon: Gavel, nameEn: "Criminal Defense", nameNp: "आपराधिक प्रतिरक्षा" },
  { anchor: "group-family", icon: Users, nameEn: "Family & Matrimonial", nameNp: "पारिवारिक र वैवाहिक" },
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const lastScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesWrapperRef = useRef<HTMLDivElement | null>(null);

  const isHome = location.pathname === "/";
  const effectiveScrolled = isScrolled || !isHome;
  const navButtonColorClass = effectiveScrolled ? "text-[#1B365D] dark:text-white" : "text-white";

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

  const openServicesMenu = useCallback(() => {
    if (servicesCloseTimeoutRef.current) clearTimeout(servicesCloseTimeoutRef.current);
    setIsServicesOpen(true);
  }, []);

  const scheduleCloseServicesMenu = useCallback(() => {
    servicesCloseTimeoutRef.current = setTimeout(() => setIsServicesOpen(false), 150);
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
    setIsMobileServicesOpen(false);
    setIsServicesOpen(false);
    setIsNavVisible(true);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesWrapperRef.current && !servicesWrapperRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsServicesOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Precomputed class strings
  const navClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isNavVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
  } ${
    effectiveScrolled
      ? "backdrop-blur-xl bg-white/95 dark:bg-[#0A1931]/95 shadow-elegant-lg border-b border-slate-200 dark:border-white/10"
      : "bg-transparent"
  }`;

  const logoPlateClass = `relative h-16 md:h-20 w-40 sm:w-64 md:w-80 flex items-center justify-start overflow-visible transition-all duration-300`;

  const logoImgClass = `absolute max-w-none h-[150%] w-full object-contain object-left top-1/2 left-0 transition-all duration-300 group-hover:scale-102 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] ${
    effectiveScrolled ? "opacity-0 -translate-y-[75%] pointer-events-none scale-95" : "opacity-100 -translate-y-[46%] scale-100"
  }`;

  const logoTextWrapClass = `absolute left-0 right-0 flex items-center justify-start transition-all duration-300 md:pl-2 ${
    effectiveScrolled ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
  }`;

  const telDesktopClass = `flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${
    effectiveScrolled
      ? "border-[#C59B27]/50 dark:border-[#D4AF37]/50 text-[#C59B27] dark:text-[#D4AF37] hover:bg-[#C59B27] hover:text-white dark:hover:bg-[#D4AF37] dark:hover:text-[#1B365D]"
      : "border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1B365D] backdrop-blur-sm"
  }`;

  const mobileTriggerClass = `hover:bg-black/10 dark:hover:bg-white/5 h-10 w-10 justify-center items-center flex rounded-xl border ${
    effectiveScrolled ? "border-slate-200/50 dark:border-white/10" : "border-white/30 backdrop-blur-sm"
  } ${navButtonColorClass}`;

  const mobileDrawerClass = `lg:hidden fixed inset-x-0 bg-white dark:bg-[#0A1931] transition-all duration-300 transform origin-top border-b border-slate-200 dark:border-white/10 max-h-[calc(100vh-6rem)] overflow-y-auto ${
    effectiveScrolled ? "top-24" : "top-24 md:top-28"
  } ${isMobileMenuOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-90 pointer-events-none"}`;

  return (
    <nav className={navClass} role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
        <div className="flex items-center justify-start lg:justify-center h-24 md:h-28 relative w-full">

          {/* LOGO LAYER */}
          <div className="flex-shrink-0 flex items-center justify-start absolute left-0 z-10">
            <button
              onClick={handleLogoRefresh}
              type="button"
              className="relative p-0 m-0 border-0 bg-transparent cursor-pointer focus:outline-none group select-none flex items-center rounded-xl"
              aria-label="Bhasya Legal - Reset and Go Home"
            >
              <div className={logoPlateClass}>
                <img src={Logo} alt="Bhasya Legal Logo" loading="eager" className={logoImgClass} />
                <div className={logoTextWrapClass}>
                  <div className="flex items-center gap-2 sm:gap-3 whitespace-nowrap">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wider text-[#C59B27] dark:text-[#D4AF37] drop-shadow-sm">
                      B<span className="text-[#1B365D] dark:text-white">L</span>
                    </span>
                    <span className="h-6 w-[1px] bg-slate-300 dark:bg-white/20 self-center" />
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-[#1B365D] dark:text-white">
                      <span className="text-[#C59B27] dark:text-[#D4AF37]">B</span>hasya
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* DESKTOP MATRIX */}
          <div className="hidden lg:flex items-center space-x-2 mx-auto justify-center">
            {navItems.map((item) => {
              if (item.path === "/services") {
                const servicesLinkClass = `relative flex items-center gap-1 text-[15px] transition-all duration-200 rounded-md focus:outline-none px-4 py-2 ${navButtonColorClass} ${
                  isActive(item.path)
                    ? "underline underline-offset-8 decoration-2 decoration-[#C59B27] dark:decoration-[#D4AF37]"
                    : "hover:underline hover:underline-offset-8 decoration-2 decoration-[#C59B27]/70 dark:decoration-[#D4AF37]/70"
                }`;
                const dropdownPanelClass = `absolute left-1/2 -translate-x-1/2 top-full pt-3 w-80 transition-all duration-200 origin-top ${
                  isServicesOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                }`;

                return (
                  <div
                    key={item.path}
                    ref={servicesWrapperRef}
                    className="relative"
                    onMouseEnter={openServicesMenu}
                    onMouseLeave={scheduleCloseServicesMenu}
                  >
                    <Link
                      to={item.path}
                      aria-current={isActive(item.path) ? "page" : undefined}
                      aria-expanded={isServicesOpen}
                      aria-haspopup="true"
                      onClick={() => setIsServicesOpen(false)}
                      className={servicesLinkClass}
                    >
                      {item.name}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
                    </Link>

                    <div className={dropdownPanelClass}>
                      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A1931] shadow-elegant-lg overflow-hidden">
                        <div className="p-2">
                          {SERVICE_DROPDOWN_ITEMS.map((service) => {
                            const Icon = service.icon;
                            return (
                              <Link
                                key={service.anchor}
                                to={`/services#${service.anchor}`}
                                onClick={() => setIsServicesOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-800 dark:text-neutral-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                              >
                                <span className="w-9 h-9 rounded-lg bg-[#C59B27]/10 dark:bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                                  <Icon className="w-4 h-4 text-[#C59B27] dark:text-[#D4AF37]" />
                                </span>
                                <span className="text-sm font-medium">{language === "en" ? service.nameEn : service.nameNp}</span>
                              </Link>
                            );
                          })}
                        </div>
                        <Link
                          to="/services"
                          onClick={() => setIsServicesOpen(false)}
                          className="flex items-center justify-between px-5 py-3.5 bg-slate-50 dark:bg-[#13294B]/50 text-sm font-bold text-[#C59B27] dark:text-[#D4AF37] hover:bg-slate-100 dark:hover:bg-[#13294B] transition-colors"
                        >
                          {language === "en" ? "View All Services" : "सबै सेवाहरू हेर्नुहोस्"}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              const navLinkClass = `relative text-[15px] transition-all duration-200 rounded-md focus:outline-none px-4 py-2 ${navButtonColorClass} ${
                isActive(item.path)
                  ? "underline underline-offset-8 decoration-2 decoration-[#C59B27] dark:decoration-[#D4AF37]"
                  : "hover:underline hover:underline-offset-8 decoration-2 decoration-[#C59B27]/70 dark:decoration-[#D4AF37]/70"
              }`;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={isActive(item.path) ? "page" : undefined}
                  className={navLinkClass}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* DESKTOP CONTROLS */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0 lg:absolute lg:right-0">
            <a href="tel:+9779845047233" className={telDesktopClass}>
              <Phone className="w-3.5 h-3.5" />
              {language === "en" ? "Call Now" : "फोन गर्नुहोस्"}
            </a>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`hover:bg-black/10 dark:hover:bg-white/5 h-9 w-9 rounded-lg ${navButtonColorClass}`}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-[#D4AF37]" />
              ) : (
                <Moon className={`w-4 h-4 ${effectiveScrolled ? "text-[#1B365D]" : "text-white"}`} />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className={`hover:bg-black/10 dark:hover:bg-white/5 h-9 w-14 rounded-lg ${navButtonColorClass}`}
              aria-label="Switch Language"
            >
              <Globe className={`w-4 h-4 ${effectiveScrolled ? "text-[#C59B27]" : "text-[#D4AF37]"}`} />
              <span className={`ml-1 text-[11px] uppercase ${navButtonColorClass}`}>{language}</span>
            </Button>
          </div>

          {/* MOBILE TRIGGER BUTTON CONTAINER */}
          <div className="flex lg:hidden items-center justify-end ml-auto pr-1 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={mobileTriggerClass}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER WINDOW */}
      <div className={mobileDrawerClass}>
        <div className="px-6 py-5 space-y-1 flex flex-col items-start w-full">
          {navItems.map((item) => {
            if (item.path === "/services") {
              const mobileServicesRowClass = `w-full flex items-center justify-between text-base rounded-xl transition-all duration-200 text-[#1B365D] dark:text-white ${
                isActive(item.path) ? "bg-[#C59B27]/10 text-[#C59B27] dark:text-[#D4AF37]" : "hover:bg-slate-100 dark:hover:bg-white/5"
              }`;
              return (
                <div key={item.path} className="w-full">
                  <div className={mobileServicesRowClass}>
                    <Link to={item.path} className="flex-1 p-2.5">
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                      aria-expanded={isMobileServicesOpen}
                      aria-label="Toggle services submenu"
                      className="p-2.5"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${isMobileServicesOpen ? "max-h-96 mt-1" : "max-h-0"}`}>
                    <div className="pl-4 border-l-2 border-[#C59B27]/20 dark:border-[#D4AF37]/20 ml-3 space-y-1 py-1">
                      {SERVICE_DROPDOWN_ITEMS.map((service) => {
                        const Icon = service.icon;
                        return (
                          <Link
                            key={service.anchor}
                            to={`/services#${service.anchor}`}
                            className="flex items-center gap-2.5 py-2 px-2 rounded-lg text-sm text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/5"
                          >
                            <Icon className="w-3.5 h-3.5 text-[#C59B27] dark:text-[#D4AF37]" />
                            {language === "en" ? service.nameEn : service.nameNp}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            const mobileLinkClass = `w-full text-base p-2.5 rounded-xl transition-all duration-200 text-[#1B365D] dark:text-white ${
              isActive(item.path) ? "bg-[#C59B27]/10 text-[#C59B27] dark:text-[#D4AF37] underline decoration-2" : "hover:bg-slate-100 dark:hover:bg-white/5"
            }`;

            return (
              <Link key={item.path} to={item.path} className={mobileLinkClass}>
                {item.name}
              </Link>
            );
          })}

          <div className="w-full h-[1px] bg-slate-200 dark:bg-white/10 my-3" />

          <a
            href="tel:+9779845047233"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#C59B27] dark:bg-[#D4AF37] text-white dark:text-[#1B365D] font-bold text-sm py-3 mb-3"
          >
            <Phone className="w-4 h-4" />
            {language === "en" ? "Call Now" : "फोन गर्नुहोस्"}
          </a>

          <div className="flex items-center justify-start gap-4 w-full pt-1 px-1">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="text-[#1B365D] dark:text-white bg-transparent border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/5 h-9 px-3 gap-2 flex items-center rounded-lg"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="w-4 h-4 text-[#D4AF37]" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#1B365D] dark:text-white" />
                  <span>Dark Mode</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="text-[#1B365D] dark:text-white bg-transparent border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-white/5 h-9 px-3 gap-2 flex items-center rounded-lg"
            >
              <Globe className="w-4 h-4 text-[#C59B27] dark:text-[#D4AF37]" />
              <span className="uppercase text-xs">{language === "en" ? "नेपाली (NP)" : "English (EN)"}</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;