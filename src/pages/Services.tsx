import React, { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Scale, HeartPulse, Plane, Landmark, ScrollText, Users, Monitor, Copyright, Building2, AlertCircle, Shield, Gavel, FileText, Globe } from "lucide-react";

export const servicesData = [
  { id: 1, slug: "consumer-tort", titleEn: "Consumer Tort", titleNp: "उपभोक्ता अपराध", icon: Scale, descriptionEn: "Legal claims against businesses for negligence, defective products, or unfair trade practices.", descriptionNp: "लापरवाही, दोषपूर्ण उत्पादन, वा अनुचित व्यापार अभ्यासको लागि व्यवसायहरू विरुद्ध दाबीहरू।" },
  { id: 2, slug: "medical-negligence", titleEn: "Medical Negligence", titleNp: "चिकित्सीय लापरवाही", icon: HeartPulse, descriptionEn: "Compensation for harm caused by healthcare providers failing to meet standards of care.", descriptionNp: "हेरचाहको मापदण्ड पूरा नगर्ने स्वास्थ्य सेवा प्रदायकहरूको कारणले भएको क्षतिको क्षतिपूर्ति।" },
  { id: 3, slug: "divorce-from-abroad", titleEn: "Filing Divorce from Abroad", titleNp: "विदेशबाट सम्बन्ध विच्छेद दायर", icon: Plane, descriptionEn: "Assistance for Nepali citizens abroad filing divorce through Power of Attorney.", descriptionNp: "विदेशमा रहेका नेपाली नागरिकहरूको लागि पावर अफ अटर्नी मार्फत सम्बन्ध विच्छेद सहायता।" },
  { id: 4, slug: "land-disputes", titleEn: "Land Disputes", titleNp: "जग्गा विवाद", icon: Landmark, descriptionEn: "Ownership conflicts, inheritance, encroachment, and boundary disputes.", descriptionNp: "स्वामित्व द्वन्द्व, उत्तराधिकार, अतिक्रमण, र सीमा विवादहरू।" },
  { id: 5, slug: "writ-petition", titleEn: "Writ Petition", titleNp: "रिट निवेदन", icon: ScrollText, descriptionEn: "Constitutional remedy against unlawful state actions.", descriptionNp: "अवैध राज्य कार्यविरुद्ध संवैधानिक उपचार।" },
  { id: 6, slug: "public-interest-litigation", titleEn: "Public Interest Litigation", titleNp: "सार्वजनिक सरोकारको मुद्दा", icon: Users, descriptionEn: "Legal action for issues affecting society or public welfare.", descriptionNp: "समाज वा सार्वजनिक कल्याणलाई असर गर्ने मुद्दाहरूको लागि कानूनी कारबाही।" },
  { id: 7, slug: "sexual-offences", titleEn: "Sexual Offences", titleNp: "यौन अपराध", icon: AlertCircle, descriptionEn: "Rape, harassment, exploitation under Nepal's Penal Code.", descriptionNp: "बलात्कार, उत्पीडन, शोषण (नेपालको दण्ड संहिता अनुसार)।" },
  { id: 8, slug: "narcotics-cases", titleEn: "Narcotics Cases", titleNp: "लागूऔषध मुद्दा", icon: Shield, descriptionEn: "Defense for production, possession, or trafficking of illegal substances.", descriptionNp: "अवैध लागूऔषधको उत्पादन, ओगटो, वा ओसारपसारको प्रतिरक्षा।" },
  { id: 9, slug: "immigration-law", titleEn: "Immigration Law", titleNp: "अध्यागमन कानून", icon: Globe, descriptionEn: "Visa overstay, illegal entry, deportation, and asylum matters.", descriptionNp: "भिसा ओभरस्टे, अवैध प्रवेश, निर्वासन, र शरण मामिलाहरू।" },
  { id: 10, slug: "contract-disputes", titleEn: "Contractual Disputes", titleNp: "अनुबंधिक विवाद", icon: FileText, descriptionEn: "Breach of contract, non‑performance, and commercial claims.", descriptionNp: "अनुबंधको उल्लङ्घन, गैर-प्रदर्शन, र व्यावसायिक दाबीहरू।" },
  { id: 11, slug: "class-action", titleEn: "Class Action Cases", titleNp: "वर्गीय मुद्दा", icon: Users, descriptionEn: "Collective claims by multiple individuals with similar harm.", descriptionNp: "समान हानि भएका धेरै व्यक्तिहरूको सामूहिक दाबी।" },
  { id: 12, slug: "personal-injury", titleEn: "Personal Injury Law", titleNp: "व्यक्तिगत चोट कानून", icon: HeartPulse, descriptionEn: "Compensation for accidents, negligence, and unsafe conditions.", descriptionNp: "दुर्घटना, लापरवाही, र असुरक्षित अवस्थाको क्षतिपूर्ति।" },
  { id: 13, slug: "homicide", titleEn: "Homicide", titleNp: "हत्या", icon: Gavel, descriptionEn: "Unlawful killing cases: murder, manslaughter, and related offenses.", descriptionNp: "अवैध हत्याका मुद्दाहरू: हत्या, मानव वध, र सम्बन्धित अपराधहरू।" },
  { id: 14, slug: "theft-burglary", titleEn: "Theft and Burglary", titleNp: "चोरी र सिन्धु पार गरी चोरी", icon: Shield, descriptionEn: "Property crimes, including theft, burglary, and related offenses.", descriptionNp: "सम्पत्ति अपराधहरू: चोरी, सिन्धु पार गरी चोरी, र सम्बन्धित अपराधहरू।" },
  { id: 15, slug: "cyber-crime", titleEn: "Cyber Crime Cases", titleNp: "साइबर अपराध मुद्दा", icon: Monitor, descriptionEn: "Hacking, online fraud, identity theft, and cyberbullying.", descriptionNp: "ह्याकिङ, अनलाइन ठगी, पहिचान चोरी, र साइबर धम्की।" },
  { id: 16, slug: "defamation", titleEn: "Defamation and Abuse", titleNp: "मानहानि र दुर्व्यवहार", icon: AlertCircle, descriptionEn: "False statements harming reputation, civil and criminal remedies.", descriptionNp: "प्रतिष्ठालाई हानि पुर्याउने झूटा भनाइ, दिवानी र आपराधिक उपायहरू।" },
  { id: 17, slug: "ip-law", titleEn: "IP Law", titleNp: "बौद्धिक सम्पत्ति कानून", icon: Copyright, descriptionEn: "Protection of trademarks, copyrights, patents, and designs.", descriptionNp: "ट्रेडमार्क, प्रतिलिपि अधिकार, पेटेन्ट, र डिजाइनको संरक्षण।" },
  { id: 18, slug: "labor-law", titleEn: "Labor Law", titleNp: "श्रम कानून", icon: Building2, descriptionEn: "Employment contracts, workplace safety, wages, and dispute resolution.", descriptionNp: "रोजगार अनुबंध, कार्यस्थल सुरक्षा, ज्याला, र विवाद समाधान।" },
  { id: 19, slug: "refugee-law", titleEn: "Refugee Law", titleNp: "शरणार्थी कानून", icon: Globe, descriptionEn: "Protection of displaced persons and asylum seekers.", descriptionNp: "विस्थापित व्यक्ति र शरण खोज्नेहरूको संरक्षण।" },
];

const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0");
        entry.target.classList.remove("opacity-0", "translate-y-12");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [options]);
  return elementRef;
};

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  const ref = useIntersectionObserver();
  return (
    <div ref={ref} className="opacity-0 translate-y-12 transition-all duration-700 ease-out" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const Services = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const t = (en: string, np: string) => (language === "en" ? en : np);
  const headerRef = useIntersectionObserver();

  useEffect(() => {
    const handleScroll = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
      }
    };
    const hash = location.hash.replace("#", "");
    if (hash) handleScroll(hash);
    const storedSlug = sessionStorage.getItem("lastServiceSlug");
    if (storedSlug) {
      sessionStorage.removeItem("lastServiceSlug");
      handleScroll(storedSlug);
    }
  }, [location.hash]);

  const handleServiceClick = (slug: string) => sessionStorage.setItem("lastServiceSlug", slug);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f051d] transition-colors duration-300 relative">
      
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#D4AF37]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#1b0738]/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28">
        
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-20 space-y-4 opacity-0 translate-y-12 transition-all duration-700 ease-out">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1b0738] dark:text-white tracking-tight">
            {language === "en" ? "Practice Expertise" : "हाम्रा सेवा क्षेत्रहरू"}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-[#F4E3B2] mx-auto rounded-full" />
          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed">
            {language === "en" ? "Explore our comprehensive legal services across multiple practice areas managed by specialized lawyers." : "हाम्रा विविध अभ्यास क्षेत्रहरूमा व्यापक कानूनी सेवाहरू अन्वेषण गर्नुहोस्।"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const IconComponent = service.icon;
            const staggerDelay = (index % 3) * 150;

            return (
              <AnimatedSection key={service.id} delay={staggerDelay}>
                <div id={service.slug} className="scroll-mt-32 h-full">
                  <Link to={`/services/${service.slug}`} onClick={() => handleServiceClick(service.slug)} className="block h-full group">
                    <Card className="card-premium h-full border border-gray-200/60 dark:border-white/5 shadow-elegant hover:shadow-elegant-xl flex flex-col justify-between overflow-hidden relative">
                      <CardContent className="p-8 space-y-6 flex flex-col h-full justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="w-14 h-14 bg-[#1b0738] dark:bg-[#1b0738]/60 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform shadow-md">
                              <IconComponent className="w-7 h-7 text-[#D4AF37]" />
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-all">
                              <ArrowUpRight className="w-4 h-4" />
                            </div>
                          </div>
                          <h3 className="text-2xl font-serif font-bold text-[#1b0738] dark:text-white tracking-tight pt-2 group-hover:text-[#D4AF37] transition-colors">
                            {t(service.titleEn, service.titleNp)}
                          </h3>
                          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-light">
                            {t(service.descriptionEn, service.descriptionNp)}
                          </p>
                        </div>
                        <div className="pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-sm font-semibold tracking-wider text-[#1b0738] dark:text-[#D4AF37]">
                          <span>{language === "en" ? "LEARN DETAILS" : "थप जान्नुहोस्"}</span>
                          <div className="w-5 h-0.5 bg-[#D4AF37] transform scale-x-50 group-hover:scale-x-100 origin-right transition-transform duration-300" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;