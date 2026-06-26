import React from "react";
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

  const content = {
    en: {
      heroTitle: "Justice. Integrity. Nepal.",
      heroSub: "Bhasya Legal provides premier legal counsel with unwavering dedication to achieving the best outcomes for our clients across Nepal.",
      heroBtn: "Know More About Us",
      stats: [
        { number: "100+", label: "Cases Won" },
        { number: "2+", label: "Years Experience" },
        { number: "24/7", label: "Emergency Support" },
      ],
      whoWeAreTitle: "Who We Are",
      whoWeAreP1: "Bhasya Legal is a leading law firm in Nepal, committed to delivering exceptional legal services with integrity and professionalism. Our team of experienced attorneys brings decades of combined expertise across multiple practice areas.",
      whoWeAreP2: "We believe in accessible justice and personalized attention. Every client receives dedicated counsel tailored to their unique situation. Whether you're facing a complex corporate matter or a personal legal issue, Bhasya Legal stands with you.",
      practiceTitle: "Our Practice Areas",
      practiceSub: "We provide comprehensive legal services across multiple practice areas, delivering expert counsel tailored to your specific needs.",
      practiceAreas: [
        { title: "Family Law", desc: "Compassionate guidance through divorce, custody, adoption, and family legal matters." },
        { title: "Criminal Defense", desc: "Strong, strategic defense for criminal charges with a focus on protecting your rights." },
        { title: "Business Law", desc: "Corporate legal services, contracts, and business formation from startup to enterprise." },
      ],
      viewAllBtn: "View All Services",
    },
    np: {
      heroTitle: "न्याय। अखण्डता। नेपाल।",
      heroSub: "भास्य कानूनले नेपालभरका हाम्रा ग्राहकहरूका लागि उत्तम परिणामहरू प्राप्त गर्न अटल समर्पणका साथ उत्कृष्ट कानूनी परामर्श प्रदान गर्दछ।",
      heroBtn: "हाम्रो बारेमा थप जान्नुहोस्",
      stats: [
        { number: "१००+", label: "मुद्दा जित" },
        { number: "२+", label: "वर्ष अनुभव" },
        { number: "२४/७", label: "आपत्कालीन सहायता" },
      ],
      whoWeAreTitle: "हामी को हौं",
      whoWeAreP1: "भास्य कानून नेपालको एक प्रमुख कानून फर्म हो, जो अखण्डता र व्यावसायिकताका साथ असाधारण कानूनी सेवाहरू प्रदान गर्न प्रतिबद्ध छ। हाम्रो अनुभवी अधिवक्ताहरूको टोलीले धेरै अभ्यास क्षेत्रहरूमा दशकौंको संयुक्त विशेषज्ञता ल्याउँछ।",
      whoWeAreP2: "हामी पहुँचयोग्य न्याय र व्यक्तिगत ध्यानमा विश्वास गर्छौं। प्रत्येक ग्राहकले आफ्नो अद्वितीय परिस्थिति अनुसार समर्पित परामर्श प्राप्त गर्दछ। चाहे तपाईं जटिल कर्पोरेट मामिला वा व्यक्तिगत कानूनी मुद्दाको सामना गर्दै हुनुहुन्छ, भास्य कानून तपाईंको साथमा छ।",
      practiceTitle: "हाम्रा सेवा क्षेत्रहरू",
      practiceSub: "हामी धेरै अभ्यास क्षेत्रहरूमा व्यापक कानूनी सेवाहरू प्रदान गर्छौं, तपाईंको विशिष्ट आवश्यकता अनुसार विशेषज्ञ परामर्श प्रदान गर्दछौं।",
      practiceAreas: [
        { title: "पारिवारिक कानून", desc: "सम्बन्ध विच्छेद, बाल हिरासत, धर्मपुत्र ग्रहण, र पारिवारिक कानूनी मामिलाहरूमा सहानुभूतिपूर्ण मार्गदर्शन।" },
        { title: "आपराधिक प्रतिरक्षा", desc: "तपाईंको अधिकारको रक्षामा केन्द्रित आपराधिक आरोपहरूको लागि बलियो, रणनीतिक प्रतिरक्षा।" },
        { title: "व्यापार कानून", desc: "कर्पोरेट कानूनी सेवाहरू, अनुबंध, र स्टार्टअपदेखि उद्यमसम्म व्यवसाय गठन।" },
      ],
      viewAllBtn: "सबै सेवाहरू हेर्नुहोस्",
    },
  };

  const c = language === "en" ? content.en : content.np;

  return (
    <div className="min-h-screen overflow-hidden">
      
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HeroBG})` }}
      >
        <div className="absolute inset-0 bg-[#1b0738]/40 dark:bg-[#0f051d]/60 backdrop-blur-[2px]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white space-y-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white animate-fade-in">
            {c.heroTitle.split(" ").map((word, i) => 
              word.includes("Integrity.") || word.includes("अखण्डता।") || word.includes("Nepal.") || word.includes("नेपाल।") ? (
                <span key={i} className="text-gradient-gold block md:inline-block mx-1">{word} </span>
              ) : (
                <span key={i} className="mx-1">{word} </span>
              )
            )}
          </h1>
          
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-100 font-light leading-relaxed animate-fade-in-up">
            {c.heroSub}
          </p>

          <div className="pt-4 animate-fade-in-up">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-[#D4AF37] text-[#D4AF37] bg-transparent hover:bg-[#D4AF37] hover:text-[#1B0738] font-bold px-8 py-6 text-lg rounded-xl shadow-elegant transition-all duration-300"
            >
              <a href="#about">{c.heroBtn}</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 bg-gradient-to-r from-[#D4AF37] via-[#E5C060] to-[#D4AF37] shadow-elegant-lg relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {c.stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-2">
                <div className="w-16 h-16 bg-[#1b0738] rounded-2xl flex items-center justify-center shadow-md transform hover:rotate-6 transition-transform">
                  {index === 0 && <Users className="w-7 h-7 text-[#D4AF37]" />}
                  {index === 1 && <Award className="w-7 h-7 text-[#D4AF37]" />}
                  {index === 2 && <Clock className="w-7 h-7 text-[#D4AF37]" />}
                </div>
                <h3 className="text-4xl font-extrabold text-[#1b0738] tracking-tight pt-2">{stat.number}</h3>
                <p className="text-[#1b0738]/90 font-semibold tracking-wide text-sm uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="about" className="py-24 bg-gray-50 dark:bg-[#110724] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-0.5 bg-[#D4AF37]" />
                <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase">{c.whoWeAreTitle}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1b0738] dark:text-white leading-tight">
                Dedicated to Universal Justice
              </h2>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                {c.whoWeAreP1}
              </p>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                {c.whoWeAreP2}
              </p>
            </div>
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37] to-[#1b0738] rounded-2xl opacity-20 group-hover:opacity-30 blur-lg transition duration-300" />
              <img
                src={WhoWeAreImg}
                alt="Bhasya Legal Team"
                className="rounded-2xl shadow-elegant-xl w-full h-auto object-cover relative z-10 border border-gray-200/50 dark:border-white/5"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section id="services" className="py-24 bg-white dark:bg-[#0f051d]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[#D4AF37] font-bold tracking-widest text-sm uppercase">{c.practiceTitle}</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1b0738] dark:text-white">
              Fields of Legal Competence
            </h2>
            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 font-light">
              {c.practiceSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {c.practiceAreas.map((area, index) => {
              const slug = SLUG_MAP[area.title] || "";
              return (
                <Link
                  key={index}
                  to={`/services#${slug}`}
                  className="block group"
                >
                  <Card className="card-premium h-full transition-all duration-300 border border-gray-100 dark:border-gray-800 shadow-elegant hover:shadow-elegant-xl">
                    <CardContent className="p-8 text-center flex flex-col items-center h-full justify-between">
                      <div className="space-y-6">
                        <div className="w-20 h-20 bg-[#1b0738] rounded-2xl flex items-center justify-center mx-auto group-hover:bg-[#D4AF37] transition-colors duration-300 shadow-inner">
                          {index === 0 && <Scale className="w-9 h-9 text-[#D4AF37] group-hover:text-[#1b0738] transition-colors duration-300" />}
                          {index === 1 && <Shield className="w-9 h-9 text-[#D4AF37] group-hover:text-[#1b0738] transition-colors duration-300" />}
                          {index === 2 && <Gavel className="w-9 h-9 text-[#D4AF37] group-hover:text-[#1b0738] transition-colors duration-300" />}
                        </div>
                        
                        <h3 className="text-2xl font-serif font-bold text-[#1b0738] dark:text-white group-hover:text-[#D4AF37] transition-colors">
                          {area.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                          {area.desc}
                        </p>
                      </div>

                      <div className="pt-6 flex items-center text-[#D4AF37] font-semibold text-sm tracking-wider opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        EXPLORE DISCIPLINE <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Button
              asChild
              size="lg"
              className="bg-[#1b0738] hover:bg-[#2d1056] dark:bg-[#D4AF37] dark:hover:bg-[#b89327] text-white dark:text-[#1b0738] font-bold px-10 py-6 text-base rounded-xl shadow-elegant"
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