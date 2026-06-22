import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Scale, Shield, Gavel, Users, Award, Clock } from "lucide-react";
import HeroBG from "../img/hero-bg.webp";
import WhoWeAreImg from "../img/lawyer-judge-counselor-having-team-meeting-with-client-law-legal-services.webp";
import { useLanguage } from "@/contexts/LanguageContext";

<div data-aos="fade-up" data-aos-delay="100">
  {/* content */}
</div>

const Home = () => {
  const { language } = useLanguage();
  const slugMap: { [key: string]: string } = {
  "Family Law": "family-law",
  "Criminal Defense": "criminal-defense",
  "Business Law": "business-law",
  "पारिवारिक कानून": "family-law",
  "आपराधिक प्रतिरक्षा": "criminal-defense",
  "व्यापार कानून": "business-law",
};

  // Bilingual content
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${HeroBG})` }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 animate-fade-in">
            {c.heroTitle.split(" ").map((word, i) => 
              word === "Integrity." || word === "अखण्डता।" ? (
                <span key={i} className="text-law-gold">{word} </span>
              ) : word === "Nepal." || word === "नेपाल।" ? (
                <span key={i} className="text-law-gold">{word}</span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h1>
          <p className="text-l mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            {c.heroSub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white bg-transparent hover:bg-white hover:text-[#1B0738] font-semibold px-8 py-4 text-lg rounded-lg transition-all duration-200"
            >
              <a href="#about">{c.heroBtn}</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16" style={{ backgroundColor: "#D4AE36" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {c.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-royal-blue rounded-full flex items-center justify-center">
                    {index === 0 && <Users className="w-8 h-8 text-law-gold" />}
                    {index === 1 && <Award className="w-8 h-8 text-law-gold" />}
                    {index === 2 && <Clock className="w-8 h-8 text-law-gold" />}
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-royal-blue mb-2">{stat.number}</h3>
                <p className="text-gray-700 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-4xl font-serif font-bold text-royal-blue dark:text-white">
                {c.whoWeAreTitle}
              </h2>
              <p className="text-l text-gray-600 dark:text-gray-300 leading-relaxed">
                {c.whoWeAreP1}
              </p>
              <p className="text-l text-gray-600 dark:text-gray-300 leading-relaxed">
                {c.whoWeAreP2}
              </p>
            </div>
            <div className="relative">
              <img
                src={WhoWeAreImg}
                alt="Bhasya Legal Team"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-royal-blue/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section id="services" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-4xl font-serif font-bold text-royal-blue dark:text-white mb-6">
              {c.practiceTitle}
            </h2>
            <p className="text-l text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {c.practiceSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {c.practiceAreas.map((area, index) => {
              // Map practice titles to slugs for linking to service detail pages
              const slugMap: { [key: string]: string } = {
                "Family Law": "family-law",
                "Criminal Defense": "criminal-defense",
                "Business Law": "business-law",
                // Add Nepali mapping if needed
                "पारिवारिक कानून": "family-law",
                "आपराधिक प्रतिरक्षा": "criminal-defense",
                "व्यापार कानून": "business-law",
              };
              const slug = slugMap[area.title] || "";
              return (
                <Link
  key={index}
  to={`/services#${slug}`}  // <-- Hash link
  className="block transition-all duration-300 hover:-translate-y-2"
>
                
                  <Card className="group hover:shadow-xl border-0 shadow-lg dark:bg-gray-800 h-full">
                    <CardContent className="p-8 text-center">
                      <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-royal-blue rounded-full flex items-center justify-center group-hover:bg-law-gold transition-colors duration-300">
                          {index === 0 && <Scale className="w-10 h-10 text-law-gold group-hover:text-royal-blue transition-colors duration-300" />}
                          {index === 1 && <Shield className="w-10 h-10 text-law-gold group-hover:text-royal-blue transition-colors duration-300" />}
                          {index === 2 && <Gavel className="w-10 h-10 text-law-gold group-hover:text-royal-blue transition-colors duration-300" />}
                        </div>
                      </div>
                      <h3 className="text-2xl font-serif font-semibold text-royal-blue dark:text-white mb-4">
                        {area.title}
                      </h3>
                      <p className="text-l text-gray-600 dark:text-gray-300 leading-relaxed">
                        {area.desc}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-royal-blue hover:bg-royal-blue/90 text-white font-semibold px-8 py-4"
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