import React, { useState, useEffect, useCallback, useRef, useLayoutEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun, ChevronDown, Phone, Scale, Building2, Gavel, Users, ArrowRight } from "lucide-react";
import Logo from "../img/logo.webp";
import LogoDark from "../img/logo-dark.webp";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/LanguageContext";


const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-[#C59B27] dark:focus-visible:ring-[#D4AF37]";


const SERVICE_DROPDOWN_ITEMS = [
  {
    anchor: "group-civil",
    icon: Scale,
    nameEn: "Civil Litigation",
    nameNp: "दिवानी मुद्दा",
    descEn: "Dispute resolution, property & contracts",
    descNp: "विवाद समाधान, सम्पत्ति र सम्झौता",
  },
  {
    anchor: "group-corporate",
    icon: Building2,
    nameEn: "Corporate & Commercial",
    nameNp: "कर्पोरेट र व्यावसायिक",
    descEn: "Company formation, contracts & compliance",
    descNp: "कम्पनी स्थापना, सम्झौता र अनुपालन",
  },
  {
    anchor: "group-criminal",
    icon: Gavel,
    nameEn: "Criminal Defense",
    nameNp: "आपराधिक प्रतिरक्षा",
    descEn: "Investigation, trial & appellate defense",
    descNp: "अनुसन्धान, मुद्दा र पुनरावेदन प्रतिरक्षा",
  },
  {
    anchor: "group-family",
    icon: Users,
    nameEn: "Family & Matrimonial",
    nameNp: "पारिवारिक र वैवाहिक",
    descEn: "Divorce, custody & inheritance matters",
    descNp: "सम्बन्धविच्छेद, संरक्षकत्व र उत्तराधिकार",
  },
];


const ThemeSwitch: React.FC<{
  isDark: boolean;
  onToggle: () => void;
  size?: "sm" | "md";
  className?: string;
}> = ({ isDark, onToggle, size = "sm", className = "" }) => {
  const trackClass = size === "md" ? "h-9 w-16" : "h-7 w-12";
  const thumbClass = size === "md" ? "h-7 w-7" : "h-5 w-5";
  const travelClass = size === "md" ? "translate-x-7" : "translate-x-5";
  const iconClass = size === "md" ? "h-4 w-4" : "h-3 w-3";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={onToggle}
      className={`relative inline-flex flex-shrink-0 items-center rounded-full border bg-slate-100 dark:bg-[#13294B] border-slate-300 dark:border-[#D4AF37]/30 transition-colors duration-300 motion-reduce:transition-none ${trackClass} ${FOCUS_RING} ${className}`}
    >
      <span
        className={`absolute left-1 top-1 flex items-center justify-center rounded-full bg-white dark:bg-[#0A1931] shadow-md transition-transform duration-300 ease-out motion-reduce:transition-none ${thumbClass} ${
          isDark ? travelClass : "translate-x-0"
        }`}
      >
        <Sun className={`absolute ${iconClass} text-[#D4AF37] transition-opacity duration-200 ${isDark ? "opacity-0" : "opacity-100"}`} />
        <Moon className={`absolute ${iconClass} text-[#D4AF37] transition-opacity duration-200 ${isDark ? "opacity-100" : "opacity-0"}`} />
      </span>
    </button>
  );
};


const LanguageSwitch: React.FC<{
  language: string;
  onSelect: (lang: "en" | "np") => void;
  size?: "sm" | "md";
  className?: string;
}> = ({ language, onSelect, size = "sm", className = "" }) => {
  const isNp = language === "np";
  const segmentWidthClass = size === "md" ? "w-16" : "w-14";
  const segmentPadClass = size === "md" ? "py-2 text-xs" : "py-1.5 text-[11px]";
  const travelClass = size === "md" ? "translate-x-16" : "translate-x-14";

  return (
    <div
      role="radiogroup"
      aria-label="Select language"
      className={`relative inline-flex items-center rounded-full border border-slate-300 dark:border-white/15 bg-slate-100/80 dark:bg-white/5 p-0.5 font-bold ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-y-0.5 left-0.5 rounded-full bg-white dark:bg-[#13294B] shadow-sm transition-transform duration-300 ease-out motion-reduce:transition-none ${segmentWidthClass} ${
          isNp ? travelClass : "translate-x-0"
        }`}
      />
      <button
        type="button"
        role="radio"
        aria-checked={!isNp}
        onClick={() => onSelect("en")}
        className={`relative z-10 rounded-full text-center transition-colors duration-200 ${segmentWidthClass} ${segmentPadClass} ${FOCUS_RING} ${
          !isNp ? "text-[#1B365D] dark:text-white" : "text-slate-500 dark:text-neutral-400"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={isNp}
        onClick={() => onSelect("np")}
        className={`relative z-10 rounded-full text-center transition-colors duration-200 ${segmentWidthClass} ${segmentPadClass} ${FOCUS_RING} ${
          isNp ? "text-[#1B365D] dark:text-white" : "text-slate-500 dark:text-neutral-400"
        }`}
      >
        नेपाली
      </button>
    </div>
  );
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [indicator, setIndicator] = useState<{ left: number; width: number; ready: boolean }>({
    left: 0,
    width: 0,
    ready: false,
  });

  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const lastScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesWrapperRef = useRef<HTMLDivElement | null>(null);
  const servicesTriggerRef = useRef<HTMLAnchorElement | null>(null);
  const serviceItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const navLinksRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const isHome = location.pathname === "/";
  const effectiveScrolled = isScrolled || !isHome;
  const isDark = theme === "dark";
  // The homepage hero is a fixed dark-navy gradient in *both* themes, so
  // while the nav is floating over it transparently (top of homepage,
  // pre-scroll) its text/icons need to stay light regardless of theme.
  // Once the nav has its own solid pill background — scrolled, or any
  // non-home page — that background does track the theme (white in light
  // mode, navy in dark mode), so text switches to theme-based color then.
  const navButtonColorClass = effectiveScrolled
    ? "text-[#1B365D] dark:text-white"
    : "text-white";

  const navItems = useMemo(
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

  const selectLanguage = useCallback(
    (lang: "en" | "np") => {
      setLanguage(lang);
    },
    [setLanguage]
  );

  const toggleTheme = useCallback(() => {
    setTheme(isDark ? "light" : "dark");
  }, [isDark, setTheme]);

  const handleLogoClick = useCallback(() => {
   
    if (isHome) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isHome]);

  const openServicesMenu = useCallback(() => {
    if (servicesCloseTimeoutRef.current) clearTimeout(servicesCloseTimeoutRef.current);
    setIsServicesOpen(true);
  }, []);

  const scheduleCloseServicesMenu = useCallback(() => {
    servicesCloseTimeoutRef.current = setTimeout(() => setIsServicesOpen(false), 150);
  }, []);

  const closeServicesMenu = useCallback(() => {
    if (servicesCloseTimeoutRef.current) clearTimeout(servicesCloseTimeoutRef.current);
    setIsServicesOpen(false);
  }, []);

  const focusServiceItem = useCallback((index: number) => {
    const total = SERVICE_DROPDOWN_ITEMS.length + 1; // +1 for "View all services"
    const clamped = ((index % total) + total) % total;
    serviceItemRefs.current[clamped]?.focus();
  }, []);

  const handleServicesTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLAnchorElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        openServicesMenu();
        requestAnimationFrame(() => focusServiceItem(0));
      }
    },
    [openServicesMenu, focusServiceItem]
  );

  const handleServiceItemKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          focusServiceItem(index + 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          focusServiceItem(index - 1);
          break;
        case "Home":
          e.preventDefault();
          focusServiceItem(0);
          break;
        case "End":
          e.preventDefault();
          focusServiceItem(SERVICE_DROPDOWN_ITEMS.length);
          break;
        case "Escape":
          e.preventDefault();
          closeServicesMenu();
          servicesTriggerRef.current?.focus();
          break;
        default:
          break;
      }
    },
    [focusServiceItem, closeServicesMenu]
  );

  const handleServicesBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (!servicesWrapperRef.current?.contains(e.relatedTarget as Node)) {
      setIsServicesOpen(false);
    }
  }, []);

  
  const updateIndicator = useCallback(() => {
    const container = navLinksRef.current;
    const activeItem = navItems.find((item) => isActive(item.path));
    const activeEl = activeItem ? linkRefs.current.get(activeItem.path) : undefined;

    if (container && activeEl) {
      const containerRect = container.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();
      setIndicator({ left: elRect.left - containerRect.left, width: elRect.width, ready: true });
    } else {
      setIndicator((prev) => ({ ...prev, ready: false }));
    }
  }, [navItems, isActive]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    const handleResize = () => {
      updateIndicator();
     
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updateIndicator, isMobileMenuOpen]);

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

  useEffect(() => {
   
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

 
  const navClass = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 motion-reduce:transition-none ${
    isNavVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
  }`;

  
  const navBgClass =
    "absolute inset-0 -z-10 backdrop-blur-md bg-white/90 dark:bg-[#0A1931]/90 shadow-[0_1px_24px_-6px_rgba(15,23,42,0.12)] border-b border-slate-200/70 dark:border-white/10 transition-opacity duration-500 ease-out motion-reduce:transition-none pointer-events-none " +
    (effectiveScrolled ? "opacity-100" : "opacity-0");

  const navHeightClass = effectiveScrolled ? "h-[72px]" : "h-20";

 
  const logoWidthClass = "w-36 sm:w-44 md:w-48 lg:w-44 xl:w-56";
  const logoPlateClass = `relative flex-shrink-0 transition-all duration-300 motion-reduce:transition-none ${logoWidthClass} ${
    effectiveScrolled ? "h-14 sm:h-16" : "h-16 sm:h-[72px]"
  }`;


  const logoImgClass =
  "h-full w-full object-contain object-left motion-reduce:transition-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]";

  // The homepage hero (Home.tsx --hero-bg) is a dark-navy gradient in both
  // themes, so the light/reversed logo lockup is always the right pick here
  // — it's no longer swapped for the navy lockup in light mode.
  const activeLogoSrc = Logo;
  const showImageLogo = !effectiveScrolled;

  const logoImgWrapClass = `absolute inset-0 flex items-center overflow-hidden transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:duration-0 ${
    showImageLogo ? "opacity-100 translate-x-0 scale-100" : "opacity-0 -translate-x-2 scale-95 pointer-events-none"
  }`;

  const logoTextWrapClass = `absolute inset-0 flex items-center justify-start transition-all duration-300 delay-75 ease-out motion-reduce:transition-none motion-reduce:delay-0 motion-reduce:duration-0 ${
    !showImageLogo ? "opacity-100 translate-x-0 scale-100 pointer-events-auto" : "opacity-0 translate-x-2 scale-95 pointer-events-none"
  }`;

 
  const telDesktopClass = `group relative flex items-center gap-2 rounded-full px-3.5 xl:px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#C59B27] to-[#B8860B] dark:from-[#D4AF37] dark:to-[#C59B27] shadow-[0_2px_14px_-4px_rgba(197,155,39,0.55)] transition-all duration-300 hover:shadow-[0_6px_20px_-4px_rgba(197,155,39,0.7)] hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 ${FOCUS_RING}`;

  const mobileTriggerClass = `flex h-12 w-12 items-center justify-center rounded-xl border transition-colors duration-200 ${
    effectiveScrolled
      ? "border-slate-200/70 dark:border-white/10"
      : "border-white/30 backdrop-blur-sm"
  } ${navButtonColorClass} ${FOCUS_RING}`;

  const mobileDrawerClass = `lg:hidden fixed inset-x-0 bg-white dark:bg-[#0A1931] border-b border-slate-200 dark:border-white/10 overflow-y-auto transition-all duration-300 ease-out origin-top motion-reduce:transition-none ${
    effectiveScrolled ? "top-[72px] max-h-[calc(100vh_-_72px)]" : "top-20 max-h-[calc(100vh_-_80px)]"
  } ${
    isMobileMenuOpen
      ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
      : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
  }`;

  return (
    <nav className={navClass} role="navigation" aria-label="Main navigation">
      <div aria-hidden="true" className={navBgClass} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 w-full">
      
        <div className={`grid grid-cols-[auto_1fr_auto] items-center w-full gap-2 transition-all duration-300 motion-reduce:transition-none ${navHeightClass}`}>

          {/* LOGO LAYER */}
          <div className="flex-shrink-0 flex items-center justify-start z-10">
            <Link
              to="/"
              onClick={handleLogoClick}
              className={`relative p-0 m-0 flex items-center rounded-xl group select-none ${FOCUS_RING}`}
              aria-label="Bhasya Legal - Home"
            >
              <div className={logoPlateClass}>
                <div className={logoImgWrapClass}>
                  <img src={activeLogoSrc} alt="Bhasya Legal Logo" loading="eager" className={logoImgClass} />
                </div>
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
            </Link>
          </div>

          <div className="hidden lg:flex items-center justify-center relative" ref={navLinksRef}>
           
            <div
              aria-hidden="true"
              className="absolute top-1/2 h-9 -translate-y-1/2 rounded-full bg-[#C59B27]/10 dark:bg-[#D4AF37]/15 ring-1 ring-[#C59B27]/30 dark:ring-[#D4AF37]/30 transition-all duration-300 ease-out motion-reduce:transition-none pointer-events-none"
              style={{ left: indicator.left, width: indicator.width, opacity: indicator.ready ? 1 : 0 }}
            />

            {navItems.map((item) => {
              if (item.path === "/services") {
                const servicesLinkClass = `relative z-10 flex items-center gap-1 text-sm xl:text-[15px] font-medium transition-colors duration-200 rounded-full px-2.5 xl:px-4 py-2 ${navButtonColorClass} ${FOCUS_RING} ${
                  isActive(item.path) ? "font-semibold" : "hover:text-[#C59B27] dark:hover:text-[#D4AF37]"
                }`;
                const dropdownPanelClass = `absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[440px] transition-all duration-200 origin-top motion-reduce:transition-none ${
                  isServicesOpen
                    ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
                }`;

                return (
                  <div
                    key={item.path}
                    ref={servicesWrapperRef}
                    className="relative"
                    onMouseEnter={openServicesMenu}
                    onMouseLeave={scheduleCloseServicesMenu}
                    onBlur={handleServicesBlur}
                  >
                    <Link
                      ref={(el) => {
                        servicesTriggerRef.current = el;
                        if (el) linkRefs.current.set(item.path, el);
                        else linkRefs.current.delete(item.path);
                      }}
                      to={item.path}
                      aria-current={isActive(item.path) ? "page" : undefined}
                      aria-expanded={isServicesOpen}
                      aria-haspopup="true"
                      onClick={() => setIsServicesOpen(false)}
                      onKeyDown={handleServicesTriggerKeyDown}
                      className={servicesLinkClass}
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 motion-reduce:transition-none ${
                          isServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Link>

                    <div className={dropdownPanelClass}>
                      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0A1931] shadow-[0_16px_48px_-12px_rgba(15,23,42,0.25)] overflow-hidden">
                        <div className="p-2">
                          {SERVICE_DROPDOWN_ITEMS.map((service, index) => {
                            const Icon = service.icon;
                            return (
                              <Link
                                key={service.anchor}
                                ref={(el) => {
                                  serviceItemRefs.current[index] = el;
                                }}
                                to={`/services#${service.anchor}`}
                                tabIndex={isServicesOpen ? 0 : -1}
                                onClick={() => setIsServicesOpen(false)}
                                onKeyDown={(e) => handleServiceItemKeyDown(e, index)}
                                className={`group/item flex items-start gap-3 px-3 py-2.5 rounded-xl text-slate-800 dark:text-neutral-200 transition-colors duration-200 hover:bg-gradient-to-r hover:from-[#C59B27]/[0.08] hover:to-transparent dark:hover:from-[#D4AF37]/[0.12] dark:hover:to-transparent ${FOCUS_RING}`}
                              >
                                <span className="w-10 h-10 rounded-lg bg-[#C59B27]/10 dark:bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 transition-shadow duration-200 group-hover/item:shadow-[0_0_16px_1px_rgba(197,155,39,0.35)]">
                                  <Icon className="w-4 h-4 text-[#C59B27] dark:text-[#D4AF37]" />
                                </span>
                                <span className="min-w-0">
                                  <span className="block text-sm font-semibold group-hover/item:text-[#C59B27] dark:group-hover/item:text-[#D4AF37] transition-colors duration-200">
                                    {language === "en" ? service.nameEn : service.nameNp}
                                  </span>
                                  <span className="block text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                                    {language === "en" ? service.descEn : service.descNp}
                                  </span>
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                        <Link
                          to="/services"
                          ref={(el) => {
                            serviceItemRefs.current[SERVICE_DROPDOWN_ITEMS.length] = el;
                          }}
                          tabIndex={isServicesOpen ? 0 : -1}
                          onClick={() => setIsServicesOpen(false)}
                          onKeyDown={(e) => handleServiceItemKeyDown(e, SERVICE_DROPDOWN_ITEMS.length)}
                          className={`flex items-center justify-between px-5 py-3.5 bg-slate-50 dark:bg-[#13294B]/50 text-sm font-bold text-[#C59B27] dark:text-[#D4AF37] hover:bg-slate-100 dark:hover:bg-[#13294B] transition-colors duration-200 ${FOCUS_RING}`}
                        >
                          {language === "en" ? "View All Services" : "सबै सेवाहरू हेर्नुहोस्"}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }

              const navLinkClass = `relative z-10 text-sm xl:text-[15px] font-medium transition-colors duration-200 rounded-full px-2.5 xl:px-4 py-2 ${navButtonColorClass} ${FOCUS_RING} ${
                isActive(item.path) ? "font-semibold" : "hover:text-[#C59B27] dark:hover:text-[#D4AF37]"
              }`;

              return (
                <Link
                  key={item.path}
                  ref={(el) => {
                    if (el) linkRefs.current.set(item.path, el);
                    else linkRefs.current.delete(item.path);
                  }}
                  to={item.path}
                  aria-current={isActive(item.path) ? "page" : undefined}
                  className={navLinkClass}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

         
          <div className="flex items-center justify-end gap-2 z-10">

          
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              <a href="tel:+9779845047233" className={telDesktopClass}>
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">{language === "en" ? "Free Consultation" : "निःशुल्क परामर्श"}</span>
              </a>

              <ThemeSwitch isDark={isDark} onToggle={toggleTheme} size="sm" />
              <LanguageSwitch language={language} onSelect={selectLanguage} size="sm" />
            </div>

            <div className="flex lg:hidden items-center">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
                className={mobileTriggerClass}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER WINDOW */}
      <div className={mobileDrawerClass}>
        <div className="px-6 py-5 space-y-1 flex flex-col items-start w-full">
          {navItems.map((item, index) => {
            const staggerStyle: React.CSSProperties = {
              transitionDelay: isMobileMenuOpen ? `${60 + index * 40}ms` : "0ms",
            };
            const staggerClass = `transition-all duration-300 motion-reduce:transition-none motion-reduce:duration-0 ${
              isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`;

            if (item.path === "/services") {
              const mobileServicesRowClass = `w-full flex items-center justify-between text-base rounded-xl text-[#1B365D] dark:text-white transition-colors duration-200 ${
                isActive(item.path) ? "bg-[#C59B27]/10 text-[#C59B27] dark:text-[#D4AF37]" : "hover:bg-slate-100 dark:hover:bg-white/5"
              } ${staggerClass}`;
              return (
                <div key={item.path} className="w-full" style={staggerStyle}>
                  <div className={mobileServicesRowClass}>
                    <Link to={item.path} className={`flex-1 p-2.5 rounded-xl ${FOCUS_RING}`}>
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsMobileServicesOpen((prev) => !prev)}
                      aria-expanded={isMobileServicesOpen}
                      aria-label="Toggle services submenu"
                      className={`p-2.5 rounded-xl ${FOCUS_RING}`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 motion-reduce:transition-none ${
                          isMobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 motion-reduce:transition-none ${
                      isMobileServicesOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pl-4 border-l-2 border-[#C59B27]/20 dark:border-[#D4AF37]/20 ml-3 space-y-1 py-1">
                      {SERVICE_DROPDOWN_ITEMS.map((service, sIndex) => {
                        const Icon = service.icon;
                        return (
                          <Link
                            key={service.anchor}
                            to={`/services#${service.anchor}`}
                            tabIndex={isMobileServicesOpen ? 0 : -1}
                            style={{ transitionDelay: isMobileServicesOpen ? `${sIndex * 30}ms` : "0ms" }}
                            className={`flex items-start gap-2.5 py-2 px-2 rounded-lg text-sm text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-200 motion-reduce:transition-none ${
                              isMobileServicesOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
                            } ${FOCUS_RING}`}
                          >
                            <Icon className="w-3.5 h-3.5 mt-0.5 text-[#C59B27] dark:text-[#D4AF37] flex-shrink-0" />
                            <span>
                              <span className="block">{language === "en" ? service.nameEn : service.nameNp}</span>
                              <span className="block text-xs text-slate-400 dark:text-neutral-500">
                                {language === "en" ? service.descEn : service.descNp}
                              </span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            const mobileLinkClass = `w-full text-base p-2.5 rounded-xl text-[#1B365D] dark:text-white transition-colors duration-200 ${
              isActive(item.path)
                ? "bg-[#C59B27]/10 text-[#C59B27] dark:text-[#D4AF37] font-semibold"
                : "hover:bg-slate-100 dark:hover:bg-white/5"
            } ${staggerClass} ${FOCUS_RING}`;

            return (
              <Link key={item.path} to={item.path} className={mobileLinkClass} style={staggerStyle}>
                {item.name}
              </Link>
            );
          })}

          <div
            className="w-full h-[1px] bg-slate-200 dark:bg-white/10 my-3"
            style={{ transitionDelay: isMobileMenuOpen ? `${60 + navItems.length * 40}ms` : "0ms" }}
          />

          <a
            href="tel:+9779845047233"
            style={{ transitionDelay: isMobileMenuOpen ? `${80 + navItems.length * 40}ms` : "0ms" }}
            className={`w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C59B27] to-[#B8860B] dark:from-[#D4AF37] dark:to-[#C59B27] text-white font-bold text-sm py-3.5 mb-3 shadow-[0_4px_16px_-4px_rgba(197,155,39,0.5)] transition-all duration-300 motion-reduce:transition-none motion-reduce:duration-0 ${
              isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            } ${FOCUS_RING}`}
          >
            <Phone className="w-4 h-4" />
            {language === "en" ? "Free Consultation" : "निःशुल्क परामर्श"}
          </a>

          <div
            style={{ transitionDelay: isMobileMenuOpen ? `${100 + navItems.length * 40}ms` : "0ms" }}
            className={`flex items-center justify-between gap-4 w-full pt-1 px-1 transition-all duration-300 motion-reduce:transition-none motion-reduce:duration-0 ${
              isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <ThemeSwitch isDark={isDark} onToggle={toggleTheme} size="md" />
            <LanguageSwitch language={language} onSelect={selectLanguage} size="md" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
