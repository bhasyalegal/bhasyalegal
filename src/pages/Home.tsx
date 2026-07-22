import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Scale, Shield, Gavel, Users, Award, Clock, ArrowRight, Building2, Landmark } from "lucide-react";
import WhoWeAreImg from "../img/lawyer-judge-counselor-having-team-meeting-with-client-law-legal-services.webp";
import { useLanguage } from "@/contexts/LanguageContext";
import LadyJusticeStatue3D from "@/components/LadyJusticeStatue3D";
import gsap from "gsap";

const PRACTICE_GROUPS = [
  { id: "civil", icon: Scale, titleEn: "Civil Litigation", titleNp: "दिवानी मुद्दा", descEn: "Disputes between individuals and entities, resolved with precision and poise.", descNp: "व्यक्ति र संस्थाबीचका विवाद, निश्चितता र गरिमासँग समाधान।" },
  { id: "consumer", icon: Shield, titleEn: "Consumer Protection", titleNp: "उपभोक्ता संरक्षण", descEn: "Safeguarding buyers against unfair, unsafe, and unlawful commercial conduct.", descNp: "अनुचित, असुरक्षित र अवैध व्यावसायिक व्यवहारबाट उपभोक्ताको संरक्षण।" },
  { id: "corporate", icon: Building2, titleEn: "Corporate & Commercial", titleNp: "कर्पोरेट र व्यावसायिक", descEn: "Contracts, compliance, and commerce — counsel for growing enterprises.", descNp: "अनुबंध, अनुपालन र वाणिज्य — बढ्दो उद्यमको लागि परामर्श।" },
  { id: "criminal", icon: Gavel, titleEn: "Criminal Defense", titleNp: "आपराधिक प्रतिरक्षा", descEn: "Strategic, rights-first defense across the full spectrum of offenses.", descNp: "अधिकार-प्रथम रणनीतिक प्रतिरक्षा, सबै प्रकारका अपराधमा।" },
  { id: "family", icon: Users, titleEn: "Family & Matrimonial", titleNp: "पारिवारिक र वैवाहिक", descEn: "Sensitive guidance through divorce, custody, and family matters.", descNp: "सम्बन्ध विच्छेद, बाल हिरासत र पारिवारिक मामिलामा संवेदनशील मार्गदर्शन।" },
  { id: "property", icon: Landmark, titleEn: "Property & Real Estate", titleNp: "सम्पत्ति र रियल इस्टेट", descEn: "Title, transfer, and disputes — protecting what matters most.", descNp: "टाइटल, स्थानान्तरण र विवाद — महत्त्वपूर्ण कुराको संरक्षण।" },
];

const Home = () => {
  const { language } = useLanguage();

  // ---- Hero entrance refs (DOM-side GSAP timeline) ----
  const heroRef = useRef<HTMLElement>(null);
  const kickerRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // Hero entrance: fades/rises the real DOM text in, timed to roughly
    // overlap with the 3D statue's own rise-and-rotate (which the canvas
    // component animates itself — see LadyJusticeStatue3D.tsx). Keeping
    // these on separate GSAP timelines avoids a fragile cross-component
    // ref bridge; both start on mount so they read as one sequence.
    if (!headingRef.current) return;

    // Split the heading into per-line spans so it can appear line by line.
    const headingEl = headingRef.current;
    const originalText = headingEl.textContent ?? "";
    headingEl.textContent = "";
    const lineSpan = document.createElement("span");
    lineSpan.textContent = originalText;
    lineSpan.style.display = "inline-block";
    headingEl.appendChild(lineSpan);

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.set(heroRef.current, { autoAlpha: 0 })
      .to(heroRef.current, { autoAlpha: 1, duration: 0.5 })
      .from(kickerRef.current, { y: 14, autoAlpha: 0, duration: 0.6 }, 0.1)
      .from(lineSpan, { y: 24, autoAlpha: 0, duration: 0.7 }, 0.25)
      .from(ruleRef.current, { scaleX: 0, transformOrigin: "left center", duration: 0.5 }, 0.55)
      .from(subRef.current, { y: 16, autoAlpha: 0, duration: 0.6 }, 0.65)
      .from(
        buttonsRef.current ? Array.from(buttonsRef.current.children) : [],
        { y: 22, autoAlpha: 0, duration: 0.6, stagger: 0.12 },
        0.85
      );

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const content = {
    en: {
      firmName: "Bhasya Legal",
      heroKicker: "Advocates & Legal Counsellors ·",
      heroSub: "Premier legal counsel with unwavering dedication to achieving the best outcomes for our clients across Nepal.",
      heroBtn: "Call For Consultation",
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
      heroKicker: "अधिवक्ता तथा कानूनी परामर्शदाता · नेपाल",
      heroSub: "नेपालभरका हाम्रा ग्राहकहरूका लागि उत्तम परिणामहरू प्राप्त गर्न अटल समर्पणका साथ उत्कृष्ट कानूनी परामर्श।",
      heroBtn: "परामर्शको लागि कल गर्नुहोस्",
      heroBtnSecondary: "हाम्रा सेवाहरू हेर्नुहोस्",
      stats: [
        { number: "१००+", label: "मुद्दा जित" },
        { number: "२+", label: "वर्ष अनुभव" },
        { number: "२४/७", label: "आपत्कालीन सहायता" },
      ],
      whoWeAreTitle: "हामी को हौं",
      whoWeAreHeading: "सार्वभौमिक न्यायप्रति समर्पित",
      whoWeAreP1: "भास्य कानून नेपालको एक प्रमुख कानून फर्म हो, जो अखण्डता र व्यावसायिकताका साथ असाधारण कानूनी सेवाहरू प्रदान गर्न प्रतिबद्ध छ। हाम्रो अनुभवी अधिवक्ताहरूको टोलीले धेरै अभ्यास क्षेत्रहरूमा दशकौंको संयुक्त विशेषज्ञता ल्याउँछ।",
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
        html, body {
          max-width: 100% !important;
          overflow-x: hidden !important;
          width: 100% !important;
        }
        .notch-friendly-padding {
          padding-left: max(1.5rem, env(safe-area-inset-left));
          padding-right: max(1.5rem, env(safe-area-inset-right));
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
        .delay-100 { transition-delay: 80ms; }
        .delay-200 { transition-delay: 160ms; }
        .delay-300 { transition-delay: 240ms; }
      `}</style>

      {/* ============ HERO ============ */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] w-full overflow-hidden bg-gradient-to-b from-[#050a14] to-[#0d1626] flex items-stretch notch-friendly-padding"
      >
        {/*
          60/40 split via CSS grid, not 3D-space math:
          - lg+: two explicit columns, text left / statue right.
          - below lg: single column, statue becomes a background layer
            behind the (centered) text, matching the old absolute-fill look.
        */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-[40%_60%] items-center">

          {/* Left 40% — text & CTAs, exclusively */}
          <div className="relative z-10 max-w-2xl mx-auto lg:mx-0 py-24 lg:py-0 text-center lg:text-left">
            <span
              ref={kickerRef}
              className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#C59B27]"
            >
              {c.heroKicker}
            </span>

            <h1
              ref={headingRef}
              className="mt-5 text-5xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-white leading-[1.05]"
            >
              {c.firmName}
            </h1>

            <div ref={ruleRef} className="mt-6 h-px w-16 bg-[#C59B27] mx-auto lg:mx-0" />

            <p
              ref={subRef}
              className="mt-6 text-base sm:text-lg text-neutral-200 font-light leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {c.heroSub}
            </p>

            <div ref={buttonsRef} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="tel:+9779845047233"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md bg-[#C59B27] text-[#12213C] font-semibold tracking-wide text-sm transition-colors hover:bg-[#D4AF37]"
              >
                {c.heroBtn}
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-md border border-white/25 text-white font-semibold tracking-wide text-sm transition-colors hover:border-white/60"
              >
                {c.heroBtnSecondary}
              </Link>
            </div>
          </div>

          {/* Right 60% — the statue, on its own reflective marble stage.
              On mobile/tablet this column collapses and the statue instead
              sits as a full-bleed background behind the text column above
              (see the absolute layer below). */}
          <div className="hidden lg:block relative h-full min-h-[100svh]">
            <LadyJusticeStatue3D className="absolute inset-0 w-full h-full" />
          </div>
        </div>

        {/* Mobile/tablet: statue as a full-bleed background layer */}
        <div className="lg:hidden absolute inset-0 z-0">
          <LadyJusticeStatue3D className="w-full h-full" />
        </div>

        {/* Legibility scrim — heavier on mobile (statue behind text), lighter
            on desktop (statue has its own 60% column so needs less fading) */}
        <div className="absolute inset-0 z-[5] pointer-events-none bg-gradient-to-b from-[#050a14]/80 via-[#050a14]/55 to-[#050a14]/80 lg:bg-gradient-to-r lg:from-[#050a14] lg:via-[#050a14]/70 lg:to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-[#0A1931] border-b border-gray-100 dark:border-white/5 notch-friendly-padding">
        <div className="max-w-7xl mx-auto reveal-on-scroll">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 dark:divide-white/10">
            {c.stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center py-6 sm:py-0 space-y-1.5">
                <div className="flex items-center gap-2 text-[#C59B27]">
                  {index === 0 && <Users className="w-4 h-4" />}
                  {index === 1 && <Award className="w-4 h-4" />}
                  {index === 2 && <Clock className="w-4 h-4" />}
                  <h3 className="text-3xl font-serif font-bold text-[#1B365D] dark:text-white">{stat.number}</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium tracking-wide text-xs uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section
        id="about"
        className="py-24 relative notch-friendly-padding bg-white dark:bg-[#0A1931]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="space-y-6 reveal-on-scroll">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-px bg-[#C59B27]" />
                <span className="text-[#C59B27] font-semibold tracking-widest text-xs uppercase">{c.whoWeAreTitle}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1B365D] dark:text-white leading-tight">
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
                className="rounded-lg w-full h-auto object-cover border border-gray-100 dark:border-white/10"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section
        id="services"
        className="py-24 relative notch-friendly-padding bg-[#F7F5F0] dark:bg-[#081527] border-t border-gray-100 dark:border-white/5"
      >
        <div className="max-w-7xl mx-auto">

          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 reveal-on-scroll">
            <span className="text-[#C59B27] font-semibold tracking-widest text-xs uppercase">{c.practiceTitle}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1B365D] dark:text-white">
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
                  <Card className="h-full border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F2347] shadow-none hover:border-[#C59B27]/60 transition-colors duration-300">
                    <CardContent className="p-8 flex flex-col items-start h-full justify-between">
                      <div className="space-y-4">
                        <Icon className="w-7 h-7 text-[#C59B27]" strokeWidth={1.5} />
                        <h3 className="text-xl font-serif font-bold text-[#1B365D] dark:text-white">
                          {language === "en" ? group.titleEn : group.titleNp}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                          {language === "en" ? group.descEn : group.descNp}
                        </p>
                      </div>

                      <div className="pt-6 flex items-center text-[#1B365D] dark:text-[#C59B27] font-semibold text-xs tracking-wider uppercase opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
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
              className="bg-[#1B365D] hover:bg-[#13294B] dark:bg-[#C59B27] dark:hover:bg-[#b89327] text-white dark:text-[#1B365D] font-semibold px-9 py-6 text-sm rounded-md shadow-none"
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
