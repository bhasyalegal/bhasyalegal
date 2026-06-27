import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Scale, Shield, Gavel, Users, Award, Clock, ArrowRight } from "lucide-react";
import HeroBG from "../img/hero-bg.webp";
import WhoWeAreImg from "../img/lawyer-judge-counselor-having-team-meeting-with-client-law-legal-services.webp";
import { useLanguage } from "@/contexts/LanguageContext";

const SLUG_MAP: Record<string, string> = {
  "Family Law": "family-law",
  "Criminal Defense": "criminal-defense",
  "Business Law": "business-law",
  "पारिवारिक कानून": "family-law",
  "आपराधिक प्रतिरक्षा": "criminal-defense",
  "व्यापार कानून": "business-law",
};

const Home = () => {
  const { language } = useLanguage();

  // HIGH-PERFORMANCE NATIVE SCROLL ANIMATION ENGINE
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.12,
    };

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

  const content = {
    en: {
      heroTitle: "Justice. Integrity. Nepal.",
      heroSub: "Bhasya Legal provides premier legal counsel with unwavering dedication to achieving the best outcomes for our clients across Nepal.",
      heroBtn: "Schedule a Consultation",
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
      practiceSub: "We provide comprehensive legal services across multiple practice areas, delivering expert counsel tailored to your specific needs.",
      practiceAreas: [
        { title: "Family Law", desc: "Compassionate guidance through divorce, custody, adoption, and family legal matters." },
        { title: "Criminal Defense", desc: "Strong, strategic defense for criminal charges with a focus on protecting your rights." },
        { title: "Business Law", desc: "Corporate legal services, contracts, and business formation from startup to enterprise." },
      ],
      exploreDiscipline: "EXPLORE DISCIPLINE",
      viewAllBtn: "View All Services",
    },
    np: {
      heroTitle: "न्याय। अखण्डता। नेपाल।",
      heroSub: "भास्य कानूनले नेपालभरका हाम्रा ग्राहकहरूका लागि उत्तम परिणामहरू प्राप्त गर्न अटल समर्पणका साथ उत्कृष्ट कानूनी परामर्श प्रदान गर्दछ।",
      heroBtn: "परामर्शको लागि कल गर्नुहोस्",
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
      practiceSub: "हामी धेरै अभ्यास क्षेत्रहरूमा व्यापक कानूनी सेवाहरू प्रदान गर्छौं, तपाईंको विशिष्ट आवश्यकता अनुसार विशेषज्ञ परामर्श प्रदान गर्दछौं।",
      practiceAreas: [
        { title: "पारिवारिक कानून", desc: "सम्बन्ध विच्छेद, बाल हिरासत, धर्मपुत्र ग्रहण, र पारिवारिक कानूनी मामिलाहरूमा सहानुभूतिपूर्ण मार्गदर्शन।" },
        { title: "आपराधिक प्रतिरक्षा", desc: "तपाईंको अधिकारको रक्षामा केन्द्रित आपराधिक आरोपहरूको लागि बलियो, रणनीतिक प्रतिरक्षा।" },
        { title: "व्यापार कानून", desc: "कर्पोरेट कानूनी सेवाहरू, अनुबंध, र स्टार्टअपदेखि उद्यमसम्म व्यवसाय गठन।" },
      ],
      exploreDiscipline: "थप बुझ्नुहोस्",
      viewAllBtn: "सबै सेवाहरू हेर्नुहोस्",
    },
  };

  const c = language === "en" ? content.en : content.np;

  return (
    <div className="w-full max-w-full overflow-x-hidden min-h-screen bg-white dark:bg-[#0A192F]">
      
      {/* GLOBAL ENGINE STYLES OVERRIDE */}
      <style>{`
        html, body {
          max-width: 100% !important;
          overflow-x: hidden !important;
          width: 100% !important;
          position: relative;
        }

        .notch-friendly-padding {
          padding-left: max(1.5rem, env(safe-area-inset-left));
          padding-right: max(1.5rem, env(safe-area-inset-right));
        }

        @keyframes premiumZoom {
          0% { transform: scale(1.06); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1.06); }
        }
        @keyframes elegantFadeUp {
          from { opacity: 0; transform: translateY(20px); filter: blur(3px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .animate-cinematic-bg {
          animation: premiumZoom 16s infinite ease-in-out;
        }
        .animate-fade-up-staggered {
          opacity: 0;
          animation: elegantFadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* HARDWARE ACCELERATED SCROLL POP-UP ENGINE CLASSES */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(40px) scale(0.98);
          filter: blur(4px);
          transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.85s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity, filter;
        }
        
        .reveal-active {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }

        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }
      `}</style>

      {/* TRUE-CENTERED PREMIUM HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden bg-[#0A1931] flex items-center justify-center text-center notch-friendly-padding">
        
        {/* BACKGROUND RENDER SYSTEM */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-cinematic-bg will-change-transform"
            style={{ backgroundImage: `url(${HeroBG})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A1931]" />
        </div>

        {/* Added top padding to push content slightly lower down the screen */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 w-full pt-16 md:pt-24">
          
          {/* HERO HEADLINE ENTRIES */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-neutral-200 leading-[1.15] select-none break-words whitespace-normal">
            {c.heroTitle.split(" ").map((word, i) => {
              const isGoldWord = word.includes("Integrity.") || word.includes("अखण्डता।") || word.includes("Nepal.") || word.includes("नेपाल।");
              return (
                <span 
                  key={i} 
                  className={`inline-block mx-1 sm:mx-2 animate-fade-up-staggered
                    ${isGoldWord ? "text-[#C59B27] drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]" : "text-neutral-200 drop-shadow-[0_4px_15px_rgba(0,0,0,0.7)]"}`}
                  style={{ animationDelay: `${i * 180}ms` }}
                >
                  {word}
                </span>
              );
            })}
          </h1>
          
          <p 
            className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-neutral-300 font-normal drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)] leading-relaxed select-none animate-fade-up-staggered"
            style={{ animationDelay: "650ms" }}
          >
            {c.heroSub}
          </p>

          {/* Redirection link directly setup to call the dynamic legal number */}
          <div className="pt-2 flex justify-center animate-fade-up-staggered" style={{ animationDelay: "850ms" }}>
            <a
              href="tel:+9779843722015"
              className="group relative overflow-hidden px-8 py-3.5 sm:px-9 sm:py-4 rounded-xl border-2 border-[#C59B27] text-[#C59B27] bg-black/30 backdrop-blur-[2px] font-bold tracking-widest text-xs uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C59B27] focus:ring-offset-2 focus:ring-offset-[#0A1931]
                hover:text-[#0A1931] hover:bg-[#C59B27] hover:shadow-[0_0_35px_rgba(197,155,39,0.5)]"
            >
              <span className="absolute inset-0 translate-x-[-101%] bg-gradient-to-r from-[#D4AF37] via-[#C59B27] to-[#A37F1F] transition-transform duration-500 ease-[cubic-bezier(0.16_1_0.3_1)] group-hover:translate-x-0" />
              
              <span className="relative z-10 flex items-center gap-2.5 justify-center">
                {c.heroBtn}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </span>
            </a>
          </div>

        </div>
      </section>

      {/* Stats Section (Animations removed from outer structural layer to avoid mobile layout-shift gaps) */}
      <section className="py-14 bg-gradient-to-r from-[#C59B27] via-[#E5C060] to-[#C59B27] relative z-20 shadow-lg notch-friendly-padding">
        <div className="max-w-7xl mx-auto reveal-on-scroll">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {c.stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-2">
                <div className="w-16 h-16 bg-[#1B365D] rounded-2xl flex items-center justify-center shadow-md transform hover:rotate-6 transition-transform">
                  {index === 0 && <Users className="w-7 h-7 text-[#C59B27]" />}
                  {index === 1 && <Award className="w-7 h-7 text-[#C59B27]" />}
                  {index === 2 && <Clock className="w-7 h-7 text-[#C59B27]" />}
                </div>
                <h3 className="text-4xl font-extrabold text-[#1B365D] tracking-tight pt-2">{stat.number}</h3>
                <p className="text-[#1B365D]/90 font-semibold tracking-wide text-sm uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="about" className="py-24 bg-gray-50 dark:bg-[#0F2347] relative notch-friendly-padding overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-6 reveal-on-scroll">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-0.5 bg-[#C59B27]" />
                <span className="text-[#C59B27] font-bold tracking-widest text-sm uppercase">{c.whoWeAreTitle}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1B365D] dark:text-white leading-tight">
                {c.whoWeAreHeading}
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-200 leading-relaxed font-light">
                {c.whoWeAreP1}
              </p>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-200 leading-relaxed font-light">
                {c.whoWeAreP2}
              </p>
            </div>

            <div className="relative group w-full reveal-on-scroll delay-200">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#C59B27] to-[#1B365D] rounded-2xl opacity-15 group-hover:opacity-25 blur-lg transition duration-300" />
              <img
                src={WhoWeAreImg}
                alt="Bhasya Legal Team"
                className="rounded-2xl w-full h-auto object-cover relative z-10 border border-blue-100/50 dark:border-white/5 shadow-xl"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section id="services" className="py-24 bg-white dark:bg-[#0A192F] notch-friendly-padding">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4 reveal-on-scroll">
            <span className="text-[#C59B27] font-bold tracking-widest text-sm uppercase">{c.practiceTitle}</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1B365D] dark:text-white">
              {c.practiceHeading}
            </h2>
            <p className="text-base md:text-lg text-gray-500 dark:text-blue-200/70 font-light">
              {c.practiceSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {c.practiceAreas.map((area, index) => {
              const slug = SLUG_MAP[area.title] || "";
              const delays = ["", "delay-100", "delay-200"];
              return (
                <Link
                  key={index}
                  to={`/services#${slug}`}
                  className={`block group w-full reveal-on-scroll ${delays[index]}`}
                >
                  <Card className="h-full transition-all duration-300 border border-gray-100 dark:border-blue-900/40 bg-white dark:bg-[#0F2347] shadow-md hover:shadow-2xl">
                    <CardContent className="p-6 sm:p-8 text-center flex flex-col items-center h-full justify-between">
                      <div className="space-y-6">
                        <div className="w-20 h-20 bg-[#1B365D] dark:bg-[#0A1931] rounded-2xl flex items-center justify-center mx-auto group-hover:bg-[#C59B27] transition-colors duration-300 shadow-inner">
                          {index === 0 && <Scale className="w-9 h-9 text-[#C59B27] group-hover:text-[#1B365D] transition-colors duration-300" />}
                          {index === 1 && <Shield className="w-9 h-9 text-[#C59B27] group-hover:text-[#1B365D] transition-colors duration-300" />}
                          {index === 2 && <Gavel className="w-9 h-9 text-[#C59B27] group-hover:text-[#1B365D] transition-colors duration-300" />}
                        </div>
                        
                        <h3 className="text-2xl font-serif font-bold text-[#1B365D] dark:text-white group-hover:text-[#C59B27] transition-colors">
                          {area.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-200 leading-relaxed font-light">
                          {area.desc}
                        </p>
                      </div>

                      <div className="pt-6 flex items-center text-[#C59B27] font-semibold text-sm tracking-wider opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        {c.exploreDiscipline} <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-16 reveal-on-scroll">
            <Button
              asChild
              size="lg"
              className="bg-[#1B365D] hover:bg-[#234675] dark:bg-[#C59B27] dark:hover:bg-[#b89327] text-white dark:text-[#1B365D] font-bold px-10 py-6 text-base rounded-xl shadow-md"
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