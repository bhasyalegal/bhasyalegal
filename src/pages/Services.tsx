import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Scale, HeartPulse, Plane, Landmark, ScrollText, Users, Monitor, Copyright, Building2, AlertCircle, Shield, Gavel, FileText, Globe, Search, X } from "lucide-react";

// Same 19 slugs preserved so ServiceDetail.tsx keeps working; grouped + expertise added.
export const servicesData = [
  { id: 1, slug: "consumer-tort", titleEn: "Consumer Tort", titleNp: "उपभोक्ता अपराध", icon: Scale, group: "civil", expertiseEn: ["Product liability", "Unfair trade practices", "Compensation claims"], expertiseNp: ["उत्पादन दायित्व", "अनुचित व्यापार अभ्यास", "क्षतिपूर्ति दाबी"], descriptionEn: "Legal claims against businesses for negligence, defective products, or unfair trade practices.", descriptionNp: "लापरवाही, दोषपूर्ण उत्पादन, वा अनुचित व्यापार अभ्यासको लागि व्यवसायहरू विरुद्ध दाबीहरू।" },
  { id: 2, slug: "medical-negligence", titleEn: "Medical Negligence", titleNp: "चिकित्सीय लापरवाही", icon: HeartPulse, group: "civil", expertiseEn: ["Hospital accountability", "Compensation recovery", "NMC complaints"], expertiseNp: ["अस्पताल जवाफदेहिता", "क्षतिपूर्ति प्राप्ति", "एनएमसी उजुरी"], descriptionEn: "Compensation for harm caused by healthcare providers failing to meet standards of care.", descriptionNp: "हेरचाहको मापदण्ड पूरा नगर्ने स्वास्थ्य सेवा प्रदायकहरूको कारणले भएको क्षतिको क्षतिपूर्ति।" },
  { id: 3, slug: "divorce-from-abroad", titleEn: "Filing Divorce from Abroad", titleNp: "विदेशबाट सम्बन्ध विच्छेद दायर", icon: Plane, group: "civil", expertiseEn: ["Power of Attorney", "Mutual & contested divorce", "Cross-border filing"], expertiseNp: ["पावर अफ अटर्नी", "आपसी र विवादित सम्बन्ध विच्छेद", "सीमा पार फाइलिङ"], descriptionEn: "Assistance for Nepali citizens abroad filing divorce through Power of Attorney.", descriptionNp: "विदेशमा रहेका नेपाली नागरिकहरूको लागि पावर अफ अटर्नी मार्फत सम्बन्ध विच्छेद सहायता।" },
  { id: 4, slug: "land-disputes", titleEn: "Land Disputes", titleNp: "जग्गा विवाद", icon: Landmark, group: "civil", expertiseEn: ["Ownership & title", "Boundary & encroachment", "Inheritance partition"], expertiseNp: ["स्वामित्व र टाइटल", "सीमा र अतिक्रमण", "उत्तराधिकार बाँडफाँड"], descriptionEn: "Ownership conflicts, inheritance, encroachment, and boundary disputes.", descriptionNp: "स्वामित्व द्वन्द्व, उत्तराधिकार, अतिक्रमण, र सीमा विवादहरू।" },
  { id: 5, slug: "writ-petition", titleEn: "Writ Petition", titleNp: "रिट निवेदन", icon: ScrollText, group: "civil", expertiseEn: ["Constitutional remedies", "State action challenge", "Public law"], expertiseNp: ["संवैधानिक उपचार", "राज्य कार्यविरुद्ध", "सार्वजनिक कानून"], descriptionEn: "Constitutional remedy against unlawful state actions.", descriptionNp: "अवैध राज्य कार्यविरुद्ध संवैधानिक उपचार।" },
  { id: 6, slug: "public-interest-litigation", titleEn: "Public Interest Litigation", titleNp: "सार्वजनिक सरोकारको मुद्दा", icon: Users, group: "civil", expertiseEn: ["Social impact cases", "Policy litigation", "Collective rights"], expertiseNp: ["सामाजिक प्रभाव मुद्दा", "नीति मुद्दा", "सामूहिक अधिकार"], descriptionEn: "Legal action for issues affecting society or public welfare.", descriptionNp: "समाज वा सार्वजनिक कल्याणलाई असर गर्ने मुद्दाहरूको लागि कानूनी कारबाही।" },
  { id: 7, slug: "class-action", titleEn: "Class Action Cases", titleNp: "वर्गीय मुद्दा", icon: Users, group: "consumer", expertiseEn: ["Collective claims", "Consumer redress", "Mass torts"], expertiseNp: ["सामूहिक दाबी", "उपभोक्ता सुधार", "मास टर्ट"], descriptionEn: "Collective claims by multiple individuals with similar harm.", descriptionNp: "समान हानि भएका धेरै व्यक्तिहरूको सामूहिक दाबी।" },
  { id: 8, slug: "personal-injury", titleEn: "Personal Injury Law", titleNp: "व्यक्तिगत चोट कानून", icon: HeartPulse, group: "consumer", expertiseEn: ["Accident claims", "Negligence", "Damages recovery"], expertiseNp: ["दुर्घटना दाबी", "लापरवाही", "क्षति प्राप्ति"], descriptionEn: "Compensation for accidents, negligence, and unsafe conditions.", descriptionNp: "दुर्घटना, लापरवाही, र असुरक्षित अवस्थाको क्षतिपूर्ति।" },
  { id: 9, slug: "refugee-law", titleEn: "Refugee Law", titleNp: "शरणार्थी कानून", icon: Globe, group: "consumer", expertiseEn: ["Asylum claims", "Displacement protection", "Humanitarian relief"], expertiseNp: ["शरण दाबी", "विस्थापन संरक्षण", "मानवीय राहत"], descriptionEn: "Protection of displaced persons and asylum seekers.", descriptionNp: "विस्थापित व्यक्ति र शरण खोज्नेहरूको संरक्षण।" },
  { id: 10, slug: "contract-disputes", titleEn: "Contractual Disputes", titleNp: "अनुबंधिक विवाद", icon: FileText, group: "corporate", expertiseEn: ["Breach of contract", "Commercial claims", "Risk allocation"], expertiseNp: ["अनुबंध उल्लङ्घन", "व्यावसायिक दाबी", "जोखिम बाँडफाँड"], descriptionEn: "Breach of contract, non‑performance, and commercial claims.", descriptionNp: "अनुबंधको उल्लङ्घन, गैर-प्रदर्शन, र व्यावसायिक दाबीहरू।" },
  { id: 11, slug: "ip-law", titleEn: "IP Law", titleNp: "बौद्धिक सम्पत्ति कानून", icon: Copyright, group: "corporate", expertiseEn: ["Trademarks & patents", "Copyright & designs", "Infringement defense"], expertiseNp: ["ट्रेडमार्क र पेटेन्ट", "प्रतिलिपि अधिकार र डिजाइन", "उल्लङ्घन प्रतिरक्षा"], descriptionEn: "Protection of trademarks, copyrights, patents, and designs.", descriptionNp: "ट्रेडमार्क, प्रतिलिपि अधिकार, पेटेन्ट, र डिजाइनको संरक्षण।" },
  { id: 12, slug: "labor-law", titleEn: "Labor Law", titleNp: "श्रम कानून", icon: Building2, group: "corporate", expertiseEn: ["Employment contracts", "Wages & benefits", "Workplace disputes"], expertiseNp: ["रोजगार अनुबंध", "ज्याला र सुविधा", "कार्यस्थल विवाद"], descriptionEn: "Employment contracts, workplace safety, wages, and dispute resolution.", descriptionNp: "रोजगार अनुबंध, कार्यस्थल सुरक्षा, ज्याला, र विवाद समाधान।" },
  { id: 13, slug: "immigration-law", titleEn: "Immigration Law", titleNp: "अध्यागमन कानून", icon: Globe, group: "corporate", expertiseEn: ["Visa & permits", "Deportation defense", "Asylum & residency"], expertiseNp: ["भिसा र अनुमति", "निर्वासन प्रतिरक्षा", "शरण र बसोबास"], descriptionEn: "Visa overstay, illegal entry, deportation, and asylum matters.", descriptionNp: "भिसा ओभरस्टे, अवैध प्रवेश, निर्वासन, र शरण मामिलाहरू।" },
  { id: 14, slug: "sexual-offences", titleEn: "Sexual Offences", titleNp: "यौन अपराध", icon: AlertCircle, group: "criminal", expertiseEn: ["Penal Code defense", "Victim representation", "POCSO matters"], expertiseNp: ["दण्ड संहिता प्रतिरक्षा", "पीडित प्रतिनिधित्व", "पोक्सो मामिला"], descriptionEn: "Rape, harassment, exploitation under Nepal's Penal Code.", descriptionNp: "बलात्कार, उत्पीडन, शोषण (नेपालको दण्ड संहिता अनुसार)।" },
  { id: 15, slug: "narcotics-cases", titleEn: "Narcotics Cases", titleNp: "लागूऔषध मुद्दा", icon: Shield, group: "criminal", expertiseEn: ["Possession defense", "Trafficking charges", "Bail & trial"], expertiseNp: ["ओगटो प्रतिरक्षा", "ओसारपसार आरोप", "जमानत र मुद्दा"], descriptionEn: "Defense for production, possession, or trafficking of illegal substances.", descriptionNp: "अवैध लागूऔषधको उत्पादन, ओगटो, वा ओसारपसारको प्रतिरक्षा।" },
  { id: 16, slug: "homicide", titleEn: "Homicide", titleNp: "हत्या", icon: Gavel, group: "criminal", expertiseEn: ["Murder & manslaughter", "Trial defense", "Evidence strategy"], expertiseNp: ["हत्या र मानव वध", "मुद्दा प्रतिरक्षा", "प्रमाण रणनीति"], descriptionEn: "Unlawful killing cases: murder, manslaughter, and related offenses.", descriptionNp: "अवैध हत्याका मुद्दाहरू: हत्या, मानव वध, र सम्बन्धित अपराधहरू।" },
  { id: 17, slug: "theft-burglary", titleEn: "Theft and Burglary", titleNp: "चोरी र सिन्धु पार गरी चोरी", icon: Shield, group: "criminal", expertiseEn: ["Property crimes", "Theft & burglary", "Defense strategy"], expertiseNp: ["सम्पत्ति अपराध", "चोरी र सिन्धु पार", "प्रतिरक्षा रणनीति"], descriptionEn: "Property crimes, including theft, burglary, and related offenses.", descriptionNp: "सम्पत्ति अपराधहरू: चोरी, सिन्धु पार गरी चोरी, र सम्बन्धित अपराधहरू।" },
  { id: 18, slug: "cyber-crime", titleEn: "Cyber Crime Cases", titleNp: "साइबर अपराध मुद्दा", icon: Monitor, group: "criminal", expertiseEn: ["Hacking & fraud", "Identity theft", "Online harassment"], expertiseNp: ["ह्याकिङ र ठगी", "पहिचान चोरी", "अनलाइन उत्पीडन"], descriptionEn: "Hacking, online fraud, identity theft, and cyberbullying.", descriptionNp: "ह्याकिङ, अनलाइन ठगी, पहिचान चोरी, र साइबर धम्की।" },
  { id: 19, slug: "defamation", titleEn: "Defamation and Abuse", titleNp: "मानहानि र दुर्व्यवहार", icon: AlertCircle, group: "criminal", expertiseEn: ["Civil & criminal defamation", "Reputation protection", "Abuse claims"], expertiseNp: ["दिवानी र आपराधिक मानहानि", "प्रतिष्ठा संरक्षण", "दुर्व्यवहार दाबी"], descriptionEn: "False statements harming reputation, civil and criminal remedies.", descriptionNp: "प्रतिष्ठालाई हानि पुर्याउने झूटा भनाइ, दिवानी र आपराधिक उपायहरू।" },
];

// ---- Group definitions (the 6 grouped practice titles) ----
export const practiceGroups: { id: string; titleEn: string; titleNp: string; icon: any; descriptionEn: string; descriptionNp: string }[] = [
  { id: "civil", titleEn: "Civil Litigation", titleNp: "दिवानी मुद्दा", icon: Scale, descriptionEn: "Disputes between individuals and entities — resolved with precision and poise.", descriptionNp: "व्यक्ति र संस्थाबीचका विवाद — निश्चितता र गरिमासँग समाधान।" },
  { id: "consumer", titleEn: "Consumer Protection", titleNp: "उपभोक्ता संरक्षण", icon: Shield, descriptionEn: "Safeguarding buyers against unfair, unsafe, and unlawful commercial conduct.", descriptionNp: "अनुचित, असुरक्षित र अवैध व्यावसायिक व्यवहारबाट उपभोक्ताको संरक्षण।" },
  { id: "corporate", titleEn: "Corporate & Commercial", titleNp: "कर्पोरेट र व्यावसायिक", icon: Building2, descriptionEn: "Contracts, compliance, and commerce — counsel for growing enterprises.", descriptionNp: "अनुबंध, अनुपालन र वाणिज्य — बढ्दो उद्यमको लागि परामर्श।" },
  { id: "criminal", titleEn: "Criminal Defense", titleNp: "आपराधिक प्रतिरक्षा", icon: Gavel, descriptionEn: "Strategic, rights-first defense across the full spectrum of offenses.", descriptionNp: "अधिकार-प्रथम रणनीतिक प्रतिरक्षा, सबै प्रकारका अपराधमा।" },
  { id: "family", titleEn: "Family & Matrimonial", titleNp: "पारिवारिक र वैवाहिक", icon: Users, descriptionEn: "Sensitive guidance through divorce, custody, and family matters.", descriptionNp: "सम्बन्ध विच्छेद, बाल हिरासत र पारिवारिक मामिलामा संवेदनशील मार्गदर्शन।" },
  { id: "property", titleEn: "Property & Real Estate", titleNp: "सम्पत्ति र रियल इस्टेट", icon: Landmark, descriptionEn: "Title, transfer, and disputes — protecting what matters most.", descriptionNp: "टाइटल, स्थानान्तरण र विवाद — महत्त्वपूर्ण कुराको संरक्षण।" },
];

const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0");
        entry.target.classList.remove("opacity-0", "translate-y-12");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);
  return elementRef;
};

const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useIntersectionObserver();
  return (
    <div ref={ref as any} className="opacity-0 translate-y-12 transition-all duration-700 ease-out" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const Services = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const t = (en: string, np: string) => (language === "en" ? en : np);
  const headerRef = useIntersectionObserver();

  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = (id: string) => {
      const element = document.getElementById(id);
      if (element) setTimeout(() => element.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
    };
    const hash = location.hash.replace("#", "");
    if (hash) handleScroll(hash);
    const storedSlug = sessionStorage.getItem("lastServiceSlug");
    if (storedSlug) { sessionStorage.removeItem("lastServiceSlug"); handleScroll(storedSlug); }
  }, [location.hash]);

  const handleServiceClick = (slug: string) => sessionStorage.setItem("lastServiceSlug", slug);

  // Filter services by search text (matches title, description, or expertise tags)
  const normalizedQuery = query.trim().toLowerCase();
  const filteredData = useMemo(() => {
    if (!normalizedQuery) return servicesData;
    return servicesData.filter((s) => {
      const haystack = [
        s.titleEn, s.titleNp, s.descriptionEn, s.descriptionNp,
        ...s.expertiseEn, ...s.expertiseNp,
      ].join(" ").toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  const visibleGroups = practiceGroups.filter((g) =>
    filteredData.some((s) => s.group === g.id)
  );

  const jumpToGroup = (id: string) => {
    setActiveGroup(id);
    const el = document.getElementById(`group-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f051d] transition-colors duration-300 relative">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#D4AF37]/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#1b0738]/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28">
        <div ref={headerRef as any} className="text-center max-w-2xl mx-auto mb-12 space-y-4 opacity-0 translate-y-12 transition-all duration-700 ease-out">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1b0738] dark:text-white tracking-tight">
            {language === "en" ? "Practice Expertise" : "हाम्रा सेवा क्षेत्रहरू"}
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-[#D4AF37] to-[#F4E3B2] mx-auto rounded-full" />
          <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed">
            {language === "en" ? "Explore our comprehensive legal services across multiple practice areas managed by specialized lawyers." : "हाम्रा विविध अभ्यास क्षेत्रहरूमा व्यापक कानूनी सेवाहरू अन्वेषण गर्नुहोस्।"}
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("Search a legal issue — e.g. \"divorce\", \"cyber crime\"...", "कानूनी समस्या खोज्नुहोस् — जस्तै \"सम्बन्ध विच्छेद\"...")}
            className="w-full bg-white dark:bg-[#160a2e] border border-gray-200/70 dark:border-white/10 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none rounded-full pl-11 pr-11 py-3 text-sm text-[#1b0738] dark:text-white placeholder:text-gray-400 shadow-sm"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label={t("Clear search", "खोज हटाउनुहोस्")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D4AF37] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sticky quick-jump group nav */}
        <div className="sticky top-0 z-20 -mx-6 px-6 py-3 mb-14 bg-gray-50/90 dark:bg-[#0f051d]/90 backdrop-blur border-b border-gray-200/60 dark:border-white/5">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {practiceGroups.map((g) => {
              const GIcon = g.icon;
              const count = servicesData.filter((s) => s.group === g.id).length;
              const disabled = !filteredData.some((s) => s.group === g.id);
              return (
                <button
                  key={g.id}
                  onClick={() => !disabled && jumpToGroup(g.id)}
                  disabled={disabled}
                  className={`flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold tracking-wide border transition-all
                    ${disabled
                      ? "opacity-30 cursor-not-allowed border-gray-200 dark:border-white/5 text-gray-400"
                      : "border-gray-200 dark:border-white/10 text-[#1b0738] dark:text-white hover:border-[#D4AF37] hover:text-[#D4AF37]"}`}
                >
                  <GIcon className="w-3.5 h-3.5" />
                  {t(g.titleEn, g.titleNp)}
                  <span className="text-[10px] text-gray-400">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {normalizedQuery && filteredData.length === 0 && (
          <div className="text-center py-20 text-gray-400 space-y-2">
            <Search className="w-8 h-8 mx-auto opacity-40" />
            <p className="text-sm">
              {t(`No matches for "${query}". Try a different term, or `, `"${query}" को लागि कुनै नतिजा भेटिएन। फरक शब्द प्रयास गर्नुहोस्, वा `)}
              <Link to="/contact" className="text-[#D4AF37] font-semibold hover:underline">
                {t("ask us directly", "सिधै सोध्नुहोस्")}
              </Link>.
            </p>
          </div>
        )}

        {/* GROUPED PRACTICE AREAS */}
        <div className="space-y-20">
          {visibleGroups.map((group) => {
            const GroupIcon = group.icon;
            const items = filteredData.filter((s) => s.group === group.id);
            return (
              <section key={group.id} id={`group-${group.id}`} className="scroll-mt-32">
                <AnimatedSection>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1b0738] to-[#2d1056] border border-[#D4AF37]/30 flex items-center justify-center shadow-elegant">
                      <GroupIcon className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1b0738] dark:text-white">
                        {t(group.titleEn, group.titleNp)}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-light">{t(group.descriptionEn, group.descriptionNp)}</p>
                    </div>
                  </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((service, index) => {
                    const IconComponent = service.icon;
                    const staggerDelay = (index % 3) * 150;
                    const expertise = language === "en" ? service.expertiseEn : service.expertiseNp;
                    return (
                      <AnimatedSection key={service.id} delay={staggerDelay}>
                        <div id={service.slug} className="scroll-mt-32 h-full">
                          <Link to={`/services/${service.slug}`} onClick={() => handleServiceClick(service.slug)} className="block h-full group">
                            <Card className="card-premium h-full border border-gray-200/60 dark:border-white/5 shadow-elegant hover:shadow-elegant-xl hover:-translate-y-1 flex flex-col justify-between overflow-hidden relative transition-all duration-300">
                              <CardContent className="p-8 space-y-5 flex flex-col h-full justify-between">
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1b0738] to-[#2d1056] border border-[#D4AF37]/30 flex items-center justify-center group-hover:border-[#D4AF37] transition-colors">
                                      <IconComponent className="w-6 h-6 text-[#D4AF37]" />
                                    </div>
                                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-[#D4AF37] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                  </div>
                                  <div>
                                    <h3 className="text-xl font-serif font-semibold text-[#1b0738] dark:text-white group-hover:text-[#D4AF37] transition-colors">
                                      {t(service.titleEn, service.titleNp)}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed mt-2">
                                      {t(service.descriptionEn, service.descriptionNp)}
                                    </p>
                                  </div>

                                  {/* Practice Expertise inside each title */}
                                  <div className="pt-2 border-t border-gray-100 dark:border-white/5">
                                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#D4AF37] mb-2">
                                      {language === "en" ? "Practice Expertise" : "अभ्यास विशेषज्ञता"}
                                    </p>
                                    <ul className="flex flex-wrap gap-2">
                                      {expertise.map((e) => (
                                        <li key={e} className="text-[12px] text-gray-600 dark:text-gray-300 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full px-3 py-1">
                                          {e}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        </div>
                      </AnimatedSection>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Closing CTA — bridges browsing to contact */}
        <div className="mt-24 text-center rounded-2xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#1b0738] to-[#2d1056] py-14 px-8">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
            {t("Not sure which practice area fits your case?", "तपाईंको मुद्दा कुन अभ्यास क्षेत्रमा पर्छ थाहा छैन?")}
          </h3>
          <p className="text-gray-300 font-light mb-6 max-w-xl mx-auto">
            {t("Tell us what happened — our team will point you to the right counsel, free of charge.", "के भयो हामीलाई बताउनुहोस् — हाम्रो टोलीले तपाईंलाई सही परामर्शमा निःशुल्क पुर्याउनेछ।")}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[#D4AF37] hover:bg-[#c49f2e] text-[#1b0738] font-bold px-8 py-3.5 text-sm uppercase tracking-widest transition-colors"
          >
            {t("Talk to a Lawyer", "अधिवक्तासँग कुरा गर्नुहोस्")}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
