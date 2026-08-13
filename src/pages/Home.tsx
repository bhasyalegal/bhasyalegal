import React, { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Scale, Shield, Gavel, Users, Award, Clock, ArrowRight, Building2, Landmark } from "lucide-react";
import WhoWeAreImg from "../img/lawyer-judge-counselor-having-team-meeting-with-client-law-legal-services.webp";
import { useLanguage } from "@/contexts/LanguageContext";
import gsap from "gsap";

// Code-split: this pulls in three.js + react-three-fiber + drei + postprocessing
// + the 15MB statue model, none of which should block the initial paint of the
// hero text/nav. Loaded only once Home actually mounts, in its own chunk.
const LadyJusticeStatue3D = lazy(() => import("@/components/LadyJusticeStatue3D"));

const PRACTICE_GROUPS = [
  { id: "civil", icon: Scale, titleEn: "Civil Litigation", titleNp: "दिवानी मुद्दा", descEn: "Disputes between individuals and entities, resolved with precision and poise.", descNp: "व्यक्ति र संस्थाबीचका विवाद, निश्चितता र गरिमासँग समाधान।" },
  { id: "consumer", icon: Shield, titleEn: "Consumer Protection", titleNp: "उपभोक्ता संरक्षण", descEn: "Safeguarding buyers against unfair, unsafe, and unlawful commercial conduct.", descNp: "अनुचित, असुरक्षित र अवैध व्यावसायिक व्यवहारबाट उपभोक्ताको संरक्षण।" },
  { id: "corporate", icon: Building2, titleEn: "Corporate & Commercial", titleNp: "कर्पोरेट र व्यावसायिक", descEn: "Contracts, compliance, and commerce — counsel for growing enterprises.", descNp: "अनुबंध, अनुपालन र वाणिज्य — बढ्दो उद्यमको लागि परामर्श।" },
  { id: "criminal", icon: Gavel, titleEn: "Criminal Defense", titleNp: "आपराधिक प्रतिरक्षा", descEn: "Strategic, rights-first defense across the full spectrum of offenses.", descNp: "अधिकार-प्रथम रणनीतिक प्रतिरक्षा, सबै प्रकारका अपराधमा।" },
  { id: "family", icon: Users, titleEn: "Family & Matrimonial", titleNp: "पारिवारिक र वैवाहिक", descEn: "Sensitive guidance through divorce, custody, and family matters.", descNp: "सम्बन्ध विच्छेद, बाल हिरासत र पारिवारिक मामिलामा संवेदनशील मार्गदर्शन।" },
  { id: "property", icon: Landmark, titleEn: "Property & Real Estate", titleNp: "सम्पत्ति र रियल इस्टेट", descEn: "Title, transfer, and disputes — protecting what matters most.", descNp: "टाइटल, स्थानान्तरण र विवाद — महत्त्वपूर्ण कुराको संरक्षण।" },
];

const STAT_ICONS = [Users, Award, Clock];

const DEVANAGARI_DIGITS = "०१२३४५६७८९";

function toLocaleDigits(n: number, useDevanagari: boolean): string {
  const s = Math.max(0, Math.round(n)).toString();
  return useDevanagari ? s.replace(/[0-9]/g, (d) => DEVANAGARI_DIGITS[Number(d)]) : s;
}

function parseStatValue(value: string): {
  prefix: string;
  target: number | null;
  suffix: string;
  useDevanagari: boolean;
} {
  if (value.includes("/")) {
    return { prefix: "", target: null, suffix: value, useDevanagari: false };
  }

  const match = value.match(/^([^\d०-९]*)([\d०-९]+)(.*)$/);
  if (!match) return { prefix: "", target: null, suffix: value, useDevanagari: false };
  const [, prefix, digits, suffix] = match;
  const useDevanagari = DEVANAGARI_DIGITS.includes(digits[0]);
  const normalized = useDevanagari
    ? digits.replace(/[०-९]/g, (d) => String(DEVANAGARI_DIGITS.indexOf(d)))
    : digits;
  return { prefix, target: parseInt(normalized, 10), suffix, useDevanagari };
}

function AnimatedStatNumber({ value, start }: { value: string; start: boolean }) {
  const initial = parseStatValue(value);
  const [display, setDisplay] = useState(
    initial.target === null ? value : `${initial.prefix}${toLocaleDigits(0, initial.useDevanagari)}${initial.suffix}`
  );

  useEffect(() => {
    if (!start) return;

    const { prefix, target, suffix, useDevanagari } = parseStatValue(value);
    if (target === null) {
      setDisplay(value);
      return;
    }

    const reduceMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const counter = { n: 0 };
    const tween = gsap.to(counter, {
      n: target,
      duration: 1.6,
      ease: "power2.out",
      onUpdate: () => setDisplay(`${prefix}${toLocaleDigits(counter.n, useDevanagari)}${suffix}`),
    });

    return () => {
      tween.kill();
    };
  }, [start, value]);

  return <>{display}</>;
}

const Home = () => {
  const { language } = useLanguage();

  const [isDesktopHero, setIsDesktopHero] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1280
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const update = () => setIsDesktopHero(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const textColumnRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    if (!statsRef.current) return;
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.3 }
    );
    statsObserver.observe(statsRef.current);
    return () => statsObserver.disconnect();
  }, []);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.12 };
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
          scrollObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const targetElements = document.querySelectorAll(".reveal-on-scroll");
    targetElements.forEach((element) => scrollObserver.observe(element));

    return () => {
      targetElements.forEach((element) => scrollObserver.unobserve(element));
    };
  }, []);

  useLayoutEffect(() => {
    if (!headingRef.current) return;
    const headingSpan = headingRef.current.querySelector("span");
    const buttonElements = buttonsRef.current ? Array.from(buttonsRef.current.children) : [];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.set(textColumnRef.current, { autoAlpha: 0 })
        .to(textColumnRef.current, { autoAlpha: 1, duration: 0.5 })
        .fromTo(headingSpan, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7 }, 0.15)
        .fromTo(ruleRef.current, { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 0.5 }, 0.4)
        .fromTo(subRef.current, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6 }, 0.5)
        .fromTo(
          buttonElements,
          { y: 22, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.12, clearProps: "all" },
          0.7
        );
    });

    return () => {
      ctx.revert();
    };
  }, [language, isDesktopHero]);

  const content = {
    en: {
      firmName: "Bhasya Legal",
      heroSub: "Premier legal counsel with unwavering dedication to achieving the best outcomes for our clients across Nepal.",
      heroBtn: "Book a Consultation",
      heroBtnSecondary: "Explore Our Services", 
      stats: [
        { number: "100+", label: "Cases Won" },
        { number: "2+", label: "Years Experience" },
        { number: "24/7", label: "Emergency Support" },
      ],
      whoWeAreTitle: "Who We Are",
      whoWeAreHeading: "Dedicated to Universal Justice",
      whoWeAreP1: "Bhasya Legal is a leading law firm in Nepal, committed to delivering exceptional legal services with integrity and professionalism. Our team of experienced attorneys brings decades of combined expertise across multiple practice areas.",
      whoWeAreP2: "We believe in accessible justice and personalized attention. Every client receives dedicated counsel tailored to their unique situation. Whether you're facing a complex corporate matter or a personal legal issue, Bhasya Legal stands with you.",
      practiceTitle: "Our Practice Areas",
      practiceHeading: "Fields of Legal Competence",
      practiceSub: "We provide comprehensive legal services across six core disciplines, delivering expert counsel tailored to your specific needs.",
      exploreDiscipline: "Explore",
      viewAllBtn: "View All Services",
    },
    np: {
      firmName: "भास्य कानून",
      heroSub: "नेपालभरका हाम्रा ग्राहकहरूका लागि उत्तम परिणामहरू प्राप्त गर्न अटल समर्पणका साथ उत्कृष्ट कानूनी परामर्श।",
      heroBtn: "परामर्श बुक गर्नुहोस्",
      heroBtnSecondary: "हाम्रा सेवाहरू हेर्नुहोस्",
      stats: [
        { number: "१००+", label: "मुद्दा जित" },
        { number: "२+", label: "वर्ष अनुभव" },
        { number: "२४/७", label: "आपत्कालीन सहायता" },
      ],
      whoWeAreTitle: "हामी को हौं",
      whoWeAreHeading: "सार्वभौमिक न्यायप्रति समर्पित",
      whoWeAreP1: "भास्य कानून नेपालको एक प्रमुख फर्म हो, जो अखण्डता र व्यावसायिकताका साथ असाधारण कानूनी सेवाहरू प्रदान गर्न प्रतिबद्ध छ। हाम्रो अनुभवी अधिवक्ताहरूको टोलीले धेरै अभ्यास क्षेत्रहरूमा दशकौंको संयुक्त विशेषज्ञता ल्याउँछ।",
      whoWeAreP2: "हामी पहुँचयोग्य न्याय र व्यक्तिगत ध्यानमा विश्वास गर्छौं। प्रत्येक ग्राहकले आफ्नो अद्वितीय परिस्थिति अनुसार समर्पित परामर्श प्राप्त गर्दछ। चाहे तपाईं जटिल कर्पोरेट मामिला वा व्यक्तिगत कानूनी मुद्दाको सामना गर्दै हुनुहुन्छ, भास्य कानून तपाईंको साथमा छ।",
      practiceTitle: "हाम्रा सेवा क्षेत्रहरू",
      practiceHeading: "कानूनी सक्षमताका क्षेत्रहरू",
      practiceSub: "हामी छवटा प्रमुख विधाहरूमा व्यापक कानूनी सेवाहरू प्रदान गर्छौं, तपाईंको विशिष्ट आवश्यकता अनुसार विशेषज्ञ परामर्श प्रदान गर्दछौं।",
      exploreDiscipline: "थप बुझ्नुहोस्",
      viewAllBtn: "सबै सेवाहरू हेर्नुहोस्",
    },
  };

  const c = language === "en" ? content.en : content.np;

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen">
      <style>{`
        .hero-theme-vars {
          --hero-bg: linear-gradient(180deg, #07152A 0%, #0B1F3A 55%, #102D4D 100%);
          --hero-heading: #F8F5EE;
          --hero-sub-text: rgba(248, 245, 238, 0.95);
          --hero-accent: #C9A227;
          --hero-accent-line: #C9A227;
          --hero-overlay: transparent;
          --hero-overlay-xl: linear-gradient(to right, #07152A 0%, rgba(7,21,42,0.65) 45%, transparent 80%);
          --hero-stat-band-bg: linear-gradient(to bottom, #0B1F3A 0%, #163A63 100%);
          --hero-stat-card-bg: rgba(248, 245, 238, 0.06);
          --hero-stat-border: rgba(201, 162, 39, 0.3);
          --hero-stat-shadow: 0 12px 28px -12px rgba(0, 0, 0, 0.35);
        }
        .dark .hero-theme-vars {
          --hero-bg: linear-gradient(180deg, #05101F 0%, #07152A 55%, #0B1F3A 100%);
          --hero-heading: #F8F5EE;
          --hero-sub-text: rgba(248, 245, 238, 0.95);
          --hero-accent-line: #C9A227;
          --hero-overlay: transparent;
          --hero-overlay-xl: linear-gradient(to right, #05101F 0%, rgba(5,16,31,0.7) 50%, transparent 100%);
          --hero-stat-band-bg: linear-gradient(to bottom, #07152A 0%, #0B1F3A 100%);
          --hero-stat-card-bg: rgba(248, 245, 238, 0.04);
          --hero-stat-shadow: 0 12px 28px -12px rgba(0, 0, 0, 0.45);
        }
        .hero-theme-vars ::selection {
          background: var(--hero-accent);
          color: var(--hero-heading);
        }
        html, body {
          max-width: 100% !important;
          overflow-x: hidden !important;
          width: 100% !important;
        }
        .notch-friendly-padding {
          padding-left: max(1.5rem, env(safe-area-inset-left));
          padding-right: max(1.5rem, env(safe-area-inset-right));
        }
        .hero-notch-top {
          padding-top: env(safe-area-inset-top);
        }
        .full-bleed-viewport {
          height: 100vh;
          height: 100svh;
          height: 100dvh;
        }
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
        }
        .reveal-active {
          opacity: 1;
          transform: translateY(0);
        }
        .stat-card {
          transform: translateY(20px) scale(0.94);
        }
        .stat-card.reveal-active {
          transform: translateY(0) scale(1);
        }
        .delay-100 { transition-delay: 80ms; }
        .delay-200 { transition-delay: 160ms; }
        .delay-300 { transition-delay: 240ms; }
        @keyframes cta-pulse-glow {
          0%, 100% { 
            box-shadow: 0 8px 24px -6px rgba(201, 162, 39, 0.5), 0 0 0 0 rgba(201, 162, 39, 0.4); 
          }
          50% { 
            box-shadow: 0 8px 24px -6px rgba(201, 162, 39, 0.5), 0 0 0 12px rgba(201, 162, 39, 0); 
          }
        }
        .cta-pulse {
          animation: cta-pulse-glow 2.4s ease-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .cta-pulse { animation: none; }
          .reveal-on-scroll, .stat-card {
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-theme-vars relative full-bleed-viewport hero-notch-top w-full overflow-hidden bg-[image:var(--hero-bg)] flex items-stretch notch-friendly-padding">
        
        {/* ========================================= */}
        {/* DESKTOP LAYOUT (Centered Left, Statue Right) */}
        {/* ========================================= */}
        {isDesktopHero ? (
          <div className="relative z-10 w-full h-full max-w-7xl mx-auto grid grid-cols-[40%_60%] items-center gap-8 px-8 pointer-events-none">
            <div
              ref={textColumnRef}
              className="relative z-10 text-left flex flex-col justify-center h-full"
            >
              <h1
                ref={headingRef}
                className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-[color:var(--hero-heading)] leading-[1.08] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              >
                <span className="inline-block">
                  {language === "en" ? (
                    <>
                      <span style={{ color: "#C9A227" }}>B</span>hasya{" "}
                      <span style={{ color: "#C9A227" }}>L</span>egal
                    </>
                  ) : (
                    <>
                      <span style={{ color: "#C9A227" }}>भा</span>स्य{" "}
                      <span style={{ color: "#C9A227" }}>का</span>नून
                    </>
                  )}
                </span>
              </h1>

              <div ref={ruleRef} className="mt-5 h-px w-16 bg-[color:var(--hero-accent-line)]" />
              
              <p ref={subRef} className="mt-5 text-base text-[color:var(--hero-sub-text)] font-semibold leading-relaxed max-w-xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]">
                {c.heroSub}
              </p>

              <div ref={buttonsRef} className="mt-8 flex flex-col sm:flex-row gap-4 pointer-events-auto w-full sm:w-auto">
                <a
                  href="tel:+9779845047233"
                  className="cta-pulse group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C9A227] text-[#0B1F3A] font-bold tracking-wide text-sm transition-all duration-300 hover:bg-[#F8D869] hover:scale-[1.03] active:scale-95"
                >
                  {c.heroBtn}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#C9A227]/60 bg-[#07152A]/40 backdrop-blur-sm text-[#F8F5EE] font-bold tracking-wide text-sm transition-all duration-300 hover:bg-[#C9A227] hover:text-[#0B1F3A] hover:border-[#C9A227] hover:scale-[1.03] active:scale-95"
                >
                  {c.heroBtnSecondary}
                </Link>
              </div>
            </div>

            <div className="relative h-full min-h-[100svh] pointer-events-auto">
              <Suspense fallback={null}>
                <LadyJusticeStatue3D className="absolute inset-0 w-full h-full" />
              </Suspense>
            </div>
          </div>
        ) : (
          /* ========================================= */
          /* MOBILE LAYOUT (Title Top, Buttons Bottom, No Dark Hue) */
          /* ========================================= */
          <>
            {/* Mobile Canvas Background (No dark hue overlay) */}
            <div className="absolute inset-0 z-0">
              <Suspense fallback={null}>
                <LadyJusticeStatue3D className="w-full h-full" />
              </Suspense>
            </div>

            {/* Mobile Text Overlay */}
            <div
              ref={textColumnRef}
              className="relative z-10 w-full h-full flex flex-col items-center pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] px-4 pointer-events-none"
            >
              {/* Top - Title */}
              <div className="absolute top-0 left-0 right-0 text-center pt-16">
                <h1
                  ref={headingRef}
                  className="text-4xl font-serif font-bold tracking-tight text-[color:var(--hero-heading)] leading-[1.08] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                >
                  <span className="inline-block">
                    {language === "en" ? (
                      <>
                        <span style={{ color: "#C9A227" }}>B</span>hasya{" "}
                        <span style={{ color: "#C9A227" }}>L</span>egal
                      </>
                    ) : (
                      <>
                        <span style={{ color: "#C9A227" }}>भा</span>स्य{" "}
                        <span style={{ color: "#C9A227" }}>का</span>नून
                      </>
                    )}
                  </span>
                </h1>
              </div>

              {/* Bottom - Copy and CTAs, below the statue/pedestal */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[8%] text-center flex flex-col items-center gap-4 pointer-events-auto w-full max-w-xs">
                <div ref={ruleRef} className="h-px w-16 bg-[color:var(--hero-accent-line)]" />
                
                <p ref={subRef} className="text-sm text-[color:var(--hero-sub-text)] font-semibold leading-relaxed max-w-xs px-3 drop-shadow-[0_4px_10px_rgba(0,0,0,0.95)]">
                  {c.heroSub}
                </p>

                <div ref={buttonsRef} className="flex flex-col gap-3 w-full max-w-xs">
                  <a
                    href="tel:+9779845047233"
                    className="cta-pulse group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#C9A227] text-[#0B1F3A] font-bold tracking-wide text-sm transition-all duration-300 hover:bg-[#F8D869] hover:scale-[1.03] active:scale-95"
                  >
                    {c.heroBtn}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>

                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#C9A227]/60 bg-[#07152A]/40 backdrop-blur-sm text-[#F8F5EE] font-bold tracking-wide text-sm transition-all duration-300 hover:bg-[#C9A227] hover:text-[#0B1F3A] hover:border-[#C9A227] hover:scale-[1.03] active:scale-95"
                  >
                    {c.heroBtnSecondary}
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="absolute inset-0 z-[5] pointer-events-none xl:bg-[image:var(--hero-overlay-xl)]" />
      </section>

      {/* Stats Band */}
      <section
        ref={statsRef}
        className="hero-theme-vars relative overflow-hidden py-14 sm:py-16 bg-[image:var(--hero-stat-band-bg)] notch-friendly-padding"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{ background: "radial-gradient(60% 90% at 50% 0%, #C9A227 0%, transparent 70%)" }}
        />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A227]/70 to-transparent" />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {c.stats.map((stat, index) => {
              const delays = ["", "delay-100", "delay-200"];
              const Icon = STAT_ICONS[index];
              return (
                <div
                  key={index}
                  className={`reveal-on-scroll stat-card group flex flex-col items-center text-center py-8 px-4 space-y-3 rounded-lg border bg-[color:var(--hero-stat-card-bg)] border-[color:var(--hero-stat-border)] shadow-[var(--hero-stat-shadow)] transition-colors duration-300 ${delays[index]}`}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/30 text-[#C9A227] transition-colors duration-300 group-hover:bg-[#C9A227]/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-4xl sm:text-5xl font-serif font-bold text-[color:var(--hero-heading)] tabular-nums">
                    <AnimatedStatNumber value={stat.number} start={statsVisible} />
                  </h3>
                  <p className="text-[color:var(--hero-accent)] font-semibold tracking-widest text-xs uppercase">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section
        id="about"
        className="py-24 relative notch-friendly-padding bg-background"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              aria-hidden="true"
              className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#C9A227]/40 to-transparent"
            />
            <div className="space-y-6 reveal-on-scroll">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-px bg-[#C9A227]" />
                <span className="text-[#C9A227] font-semibold tracking-widest text-xs uppercase">{c.whoWeAreTitle}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0B1F3A] dark:text-white leading-tight">
                {c.whoWeAreHeading}
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                {c.whoWeAreP1}
              </p>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                {c.whoWeAreP2}
              </p>
            </div>

            <div className="relative w-full reveal-on-scroll delay-200">
              <img
                src={WhoWeAreImg}
                alt="Bhasya Legal Team"
                className="rounded-lg w-full h-auto object-cover border border-[#E5DED0] dark:border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section
        id="services"
        className="py-24 relative notch-friendly-padding bg-[#FCFBF8] dark:bg-[#07152A] border-t border-[#E5DED0] dark:border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 reveal-on-scroll">
            <span className="text-[#C9A227] font-semibold tracking-widest text-xs uppercase">{c.practiceTitle}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0B1F3A] dark:text-white">
              {c.practiceHeading}
            </h2>
            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 font-light">
              {c.practiceSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRACTICE_GROUPS.map((group, index) => {
              const Icon = group.icon;
              const delays = ["", "delay-100", "delay-200"];
              return (
                <Link
                  key={group.id}
                  to={`/services#group-${group.id}`}
                  className={`block group w-full reveal-on-scroll ${delays[index % 3]}`}
                >
                  <Card className="h-full rounded-lg border border-[#E5DED0] dark:border-[#C9A227]/15 bg-[#F8F5EE] dark:bg-[#102A4A] shadow-none hover:shadow-soft hover:-translate-y-1 hover:border-[#C9A227]/55 transition-all duration-300">
                    <CardContent className="p-8 flex flex-col items-start h-full justify-between">
                      <div className="space-y-4 w-full">
                        <div className="flex items-center justify-between">
                          <span className="font-serif text-3xl text-[#C9A227]/70">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <Icon className="w-6 h-6 text-[#C9A227]" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-[#0B1F3A] dark:text-white">
                          {language === "en" ? group.titleEn : group.titleNp}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                          {language === "en" ? group.descEn : group.descNp}
                        </p>
                      </div>

                      <div className="pt-6 flex items-center text-[#0B1F3A] dark:text-[#C9A227] font-semibold text-xs tracking-wider uppercase opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        {c.exploreDiscipline} <ArrowRight className="w-3.5 h-3.5 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-14 reveal-on-scroll">
            <Button
              asChild
              size="lg"
              className="bg-[#0B1F3A] hover:bg-[#C9A227] hover:text-[#0B1F3A] dark:bg-[#0B1F3A] dark:hover:bg-[#C9A227] dark:hover:text-[#0B1F3A] text-white dark:text-white font-semibold px-9 py-6 text-sm rounded-md shadow-none transition-colors"
            >
              <Link to="/services">{c.viewAllBtn}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;