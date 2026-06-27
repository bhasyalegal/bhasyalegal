import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Scale, Users, Award, Clock, Shield, Handshake, 
  HeartPulse, Plane, Landmark, ScrollText, Gavel,
  FileText, Building2, Globe, Monitor,
  Copyright, AlertCircle, BookOpen
} from "lucide-react";

// --- Animation Helper Hooks ---
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
    <div 
      ref={ref} 
      className="opacity-0 translate-y-12 transition-all duration-700 ease-out" 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const About = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "About Bhasya Legal",
      subtitle: "Trusted Legal Excellence in Nepal",
      essay1: "At Bhasya Legal, we understand that navigating legal challenges can be overwhelming. Whether you're dealing with family matters such as divorce, child custody, or inheritance disputes, or facing personal legal issues like medical negligence, consumer complaints, or land disputes, our team is here to guide you with compassion and clarity.",
      essay2: "Our expertise spans a wide range of legal services, including criminal defense, immigration law, labor disputes, contract negotiations, and cyber crime cases. We also handle constitutional matters such as writ petitions and public interest litigation, as well as sensitive cases involving sexual offences, narcotics, and defamation.",
      essay3: "For those facing more complex legal battles—such as homicide cases, corporate disputes, class actions, intellectual property challenges, or refugee law matters—we offer the highest level of strategic advocacy. At Bhasya Legal, we are more than just lawyers; we are your partners in justice.",
      mission: "Our Mission",
      missionText: "To provide accessible, high‑quality legal services that protect rights, resolve disputes, and promote justice in Nepal.",
      vision: "Our Vision",
      visionText: "To be the most trusted legal partner for individuals and businesses across Nepal, setting the standard for excellence and integrity.",
      valuesTitle: "Our Core Values",
      values: [
        { icon: Scale, title: "Integrity", desc: "We uphold the highest ethical standards in every action." },
        { icon: Users, title: "Client First", desc: "Your goals and well‑being are our top priority." },
        { icon: Award, title: "Excellence", desc: "We pursue the best possible outcomes through meticulous preparation." },
        { icon: Clock, title: "Timeliness", desc: "We respect your time and deliver prompt, efficient service." },
        { icon: Shield, title: "Confidentiality", desc: "Your information is always protected with utmost discretion." },
        { icon: Handshake, title: "Partnership", desc: "We build lasting relationships based on trust and results." },
      ],
      practicesTitle: "Our Practice Areas",
      practices: [
        { icon: Scale, name: "Consumer Tort", desc: "Claims against businesses for negligence, defective products, or unfair trade practices." },
        { icon: HeartPulse, name: "Medical Negligence", desc: "Compensation for harm caused by healthcare providers failing to meet standards of care." },
        { icon: Plane, name: "Filing Divorce from Abroad", desc: "Assistance for Nepali citizens abroad filing divorce through Power of Attorney." },
        { icon: Landmark, name: "Land Disputes", desc: "Ownership conflicts, inheritance, encroachment, and boundary disputes." },
        { icon: ScrollText, name: "Writ Petition", desc: "Constitutional remedy against unlawful state actions." },
        { icon: Users, name: "Public Interest Litigation", desc: "Legal action for issues affecting society or public welfare." },
        { icon: AlertCircle, name: "Sexual Offences", desc: "Rape, harassment, exploitation under Nepal's Penal Code." },
        { icon: Shield, name: "Narcotics Cases", desc: "Defense for production, possession, or trafficking of illegal substances." },
        { icon: Globe, name: "Immigration Law", desc: "Visa overstay, illegal entry, deportation, and asylum matters." },
        { icon: FileText, name: "Contract Disputes", desc: "Breach of contract, non‑performance, and commercial claims." },
        { icon: Users, name: "Class Action Cases", desc: "Collective claims by multiple individuals with similar harm." },
        { icon: HeartPulse, name: "Personal Injury Law", desc: "Compensation for accidents, negligence, and unsafe conditions." },
        { icon: Gavel, name: "Homicide", desc: "Unlawful killing cases: murder, manslaughter, and related offenses." },
        { icon: Shield, name: "Theft and Burglary", desc: "Property crimes, including theft, burglary, and related offenses." },
        { icon: Monitor, name: "Cyber Crime Cases", desc: "Hacking, online fraud, identity theft, and cyberbullying." },
        { icon: AlertCircle, name: "Defamation and Abuse", desc: "False statements harming reputation, civil and criminal remedies." },
        { icon: Copyright, name: "IP Law", desc: "Protection of trademarks, copyrights, patents, and designs." },
        { icon: Building2, name: "Labor Law", desc: "Employment contracts, workplace safety, wages, and dispute resolution." },
        { icon: Globe, name: "Refugee Law", desc: "Protection of displaced persons and asylum seekers." },
      ],
      cta: "Schedule a Confidential Consultation",
    },
    np: {
      title: "भास्य कानूनको बारेमा",
      subtitle: "नेपालमा भरपर्दो कानूनी उत्कृष्टता",
      essay1: "भास्य कानूनमा, हामी बुझ्दछौं कि कानूनी चुनौतीहरू नेभिगेट गर्नु अत्यन्तै कठिन हुन सक्छ। चाहे तपाईं सम्बन्ध विच्छेद, बाल हिरासत, वा सम्पत्ति विवाद जस्ता पारिवारिक मामिलाहरूसँग व्यवहार गर्दै हुनुहुन्छ, वा चिकित्सीय लापरवाही, उपभोक्ता उजुरी, वा जग्गा विवाद जस्ता व्यक्तिगत कानूनी मुद्दाहरूको सामना गर्दै हुनुहुन्छ, हाम्रो टोली तपाईंलाई सहानुभूति र स्पष्टताका साथ मार्गदर्शन गर्न यहाँ छ।",
      essay2: "हाम्रो विशेषज्ञताले आपराधिक प्रतिरक्षा, अध्यागमन कानून, श्रम विवाद, अनुबंध वार्ता, र साइबर अपराध मुद्दाहरू सहित कानूनी सेवाहरूको विस्तृत दायरालाई समेट्छ। साथै, हामी रिट निवेदन र सार्वजनिक सरोकारका मुद्दाहरू जस्ता संवैधानिक मामिलाहरू, साथै यौन अपराध, लागूऔषध, र मानहानि सम्बन्धी संवेदनशील मुद्दाहरू पनि ह्यान्डल गर्छौं।",
      essay3: "अधिक जटिल कानूनी युद्धहरूको सामना गर्नेहरूका लागि—जस्तै हत्या मुद्दाहरू, कर्पोरेट विवादहरू, वर्गीय मुद्दाहरू, बौद्धिक सम्पत्ति चुनौतीहरू, वा शरणार्थी कानून मामिलाहरू—हामी रणनीतिक वकालतको उच्चतम स्तर प्रदान गर्छौं। भास्य कानूनमा, हामी केवल वकिलहरू मात्र होइनौं; हामी तपाईंको न्यायमा साझेदार हौं।",
      mission: "हाम्रो मिसन",
      missionText: "नेपालमा अधिकारको रक्षा गर्ने, विवाद समाधान गर्ने, र न्याय प्रवर्द्धन गर्ने पहुँचयोग्य, उच्च‑गुणस्तरीय कानूनी सेवाहरू प्रदान गर्नु।",
      vision: "हाम्रो दृष्टिकोण",
      visionText: "नेपालभरका व्यक्ति र व्यवसायहरूको लागि सबैभन्दा भरपर्दो कानूनी साझेदार बन्नु, उत्कृष्टता र अखण्डताको मापदण्ड स्थापित गर्नु।",
      valuesTitle: "हाम्रो मूल मान्यताहरू",
      values: [
        { icon: Scale, title: "अखण्डता", desc: "हामी प्रत्येक कार्यमा उच्चतम नैतिक मापदण्डहरू पालन गर्छौं।" },
        { icon: Users, title: "ग्राहक पहिलो", desc: "तपाईंको लक्ष्य र कल्याण हाम्रो शीर्ष प्राथमिकता हो।" },
        { icon: Award, title: "उत्कृष्टता", desc: "हामी सावधानीपूर्वक तयारी मार्फत उत्तम सम्भावित परिणाम प्राप्त गर्छौं।" },
        { icon: Clock, title: "समयनिष्ठता", desc: "हामी तपाईंको समयको सम्मान गर्छौं र द्रुत, प्रभावकारी सेवा दिन्छौं।" },
        { icon: Shield, title: "गोपनीयता", desc: "तपाईंको जानकारी सधैं अत्यन्त विवेकका साथ संरक्षित गरिन्छ।" },
        { icon: Handshake, title: "साझेदारी", desc: "हामी विश्वास र परिणाममा आधारित दीर्घकालीन सम्बन्ध निर्माण गर्छौं।" },
      ],
      practicesTitle: "हाम्रा सेवा क्षेत्रहरू",
      practices: [
        { icon: Scale, name: "उपभोक्ता अपराध", desc: "लापरवाही, दोषपूर्ण उत्पादन, वा अनुचित व्यापार अभ्यासको लागि व्यवसायहरू विरुद्ध दाबीहरू।" },
        { icon: HeartPulse, name: "चिकित्सीय लापरवाही", desc: "हेरचाहको मापदण्ड पूरा नगर्ने स्वास्थ्य सेवा प्रदायकहरूको कारणले भएको क्षतिको क्षतिपूर्ति।" },
        { icon: Plane, name: "विदेशबाट सम्बन्ध विच्छेद", desc: "विदेशमा रहेका नेपाली नागरिकहरूको लागि पावर अफ अटर्नी मार्फत सम्बन्ध विच्छेद सहायता।" },
        { icon: Landmark, name: "जग्गा विवाद", desc: "स्वामित्व द्वन्द्व, उत्तराधिकार, अतिक्रमण, र सीमा विवादहरू।" },
        { icon: ScrollText, name: "रिट निवेदन", desc: "अवैध राज्य कार्यविरुद्ध संवैधानिक उपचार।" },
        { icon: Users, name: "सार्वजनिक सरोकारको मुद्दा", desc: "समाज वा सार्वजनिक कल्याणलाई असर गर्ने मुद्दाहरूको लागि कानूनी कारबाही।" },
        { icon: AlertCircle, name: "यौन अपराध", desc: "बलात्कार, उत्पीडन, शोषण (नेपालको दण्ड संहिता अनुसार)।" },
        { icon: Shield, name: "लागूऔषध मुद्दा", desc: "अवैध लागूऔषधको उत्पादन, ओगटो, वा ओसारपसारको प्रतिरक्षा।" },
        { icon: Globe, name: "अध्यागमन कानून", desc: "भिसा ओभरस्टे, अवैध प्रवेश, निर्वासन, र शरण मामिलाहरू।" },
        { icon: FileText, name: "अनुबंधिक विवाद", desc: "अनुबंधको उल्लङ्घन, गैर-प्रदर्शन, र व्यावसायिक दाबीहरू।" },
        { icon: Users, name: "वर्गीय मुद्दा", desc: "समान हानि भएका धेरै व्यक्तिहरूको सामूहिक दाबी।" },
        { icon: HeartPulse, name: "व्यक्तिगत चोट कानून", desc: "दुर्घटना, लापरवाही, र असुरक्षित अवस्थाको क्षतिपूर्ति।" },
        { icon: Gavel, name: "हत्या", desc: "अवैध हत्याका मुद्दाहरू: हत्या, मानव वध, र सम्बन्धित अपराधहरू।" },
        { icon: Shield, name: "चोरी र सिन्धु पार गरी चोरी", desc: "सम्पत्ति अपराधहरू: चोरी, सिन्धु पार गरी चोरी, र सम्बन्धित अपराधहरू।" },
        { icon: Monitor, name: "साइबर अपराध मुद्दा", desc: "ह्याकिङ, अनलाइन ठगी, पहिचान चोरी, र साइबर धम्की।" },
        { icon: AlertCircle, name: "मानहानि र दुर्व्यवहार", desc: "प्रतिष्ठालाई हानि पुर्याउने झूटा भनाइ, दिवानी र आपराधिक उपायहरू।" },
        { icon: Copyright, name: "बौद्धिक सम्पत्ति कानून", desc: "ट्रेडमार्क, प्रतिलिपि अधिकार, पेटेन्ट, र डिजाइनको संरक्षण।" },
        { icon: Building2, name: "श्रम कानून", desc: "रोजगार अनुबंध, कार्यस्थल सुरक्षा, ज्याला, र विवाद समाधान।" },
        { icon: Globe, name: "शरणार्थी कानून", desc: "विस्थापित व्यक्ति र शरण खोज्नेहरूको संरक्षण।" },
      ],
      cta: "गोप्य परामर्श तालिका बनाउनुहोस्",
    },
  };

  const c = language === "en" ? content.en : content.np;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f051d] py-20 transition-colors duration-300 relative">
      
      {/* Background Aura Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#D4AF37]/5 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#1b0738]/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1b0738] dark:text-white mb-4 tracking-tight">
              {c.title}
            </h1>
            <p className="text-lg text-[#D4AF37] font-medium mb-4">{c.subtitle}</p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#D4AF37] to-[#F4E3B2] mx-auto mb-8 rounded-full"></div>
          </div>
        </AnimatedSection>

        {/* 3-Paragraph Essay */}
        <AnimatedSection delay={200}>
          <div className="max-w-4xl mx-auto mb-16 space-y-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed font-light">{c.essay1}</p>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed font-light">{c.essay2}</p>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed font-light">{c.essay3}</p>
          </div>
        </AnimatedSection>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <AnimatedSection delay={300}>
            <div className="bg-white/50 dark:bg-[#1b0738]/20 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 dark:border-white/5 h-full">
              <h2 className="text-2xl font-serif font-bold text-[#1b0738] dark:text-white mb-4">
                {c.mission}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">{c.missionText}</p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={400}>
            <div className="bg-white/50 dark:bg-[#1b0738]/20 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 dark:border-white/5 h-full">
              <h2 className="text-2xl font-serif font-bold text-[#1b0738] dark:text-white mb-4">
                {c.vision}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-light">{c.visionText}</p>
            </div>
          </AnimatedSection>
        </div>

        {/* Core Values */}
        <AnimatedSection delay={500}>
          <div className="mb-20">
            <h2 className="text-3xl font-serif font-bold text-[#1b0738] dark:text-white text-center mb-12">
              {c.valuesTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {c.values.map((value, index) => (
                <div key={index} className="text-center p-6 bg-white/30 dark:bg-[#1b0738]/10 rounded-xl border border-gray-100 dark:border-white/5 hover:border-[#D4AF37]/50 transition-all">
                  <div className="w-16 h-16 bg-[#1b0738] rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1b0738] dark:text-white mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Practice Areas */}
        <AnimatedSection delay={600}>
          <div className="mb-20">
            <h2 className="text-3xl font-serif font-bold text-[#1b0738] dark:text-white text-center mb-12">
              {c.practicesTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {c.practices.map((practice, index) => (
                <div key={index} className="bg-white/50 dark:bg-[#1b0738]/20 p-6 rounded-xl border border-gray-200 dark:border-white/5 hover:border-[#D4AF37] transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1b0738]/10 dark:bg-white/5 rounded-full flex items-center justify-center flex-shrink-0">
                      <practice.icon className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1b0738] dark:text-white">{practice.name}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">{practice.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection delay={700}>
          <div className="text-center bg-[#1b0738] rounded-2xl p-10 shadow-xl overflow-hidden relative">
            <h3 className="text-2xl font-serif font-bold text-white mb-4 relative z-10">
              {language === "en" ? "Ready to Work With Us?" : "हामीसँग काम गर्न तयार हुनुहुन्छ?"}
            </h3>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto relative z-10">
              {language === "en" 
                ? "Contact us today for a confidential consultation. Our team is here to help you navigate any legal challenge." 
                : "गोप्य परामर्शको लागि आज हामीलाई सम्पर्क गर्नुहोस्। हाम्रो टोली कुनै पनि कानूनी चुनौतीमा तपाईंको सहायता गर्न यहाँ छ।"}
            </p>
            <Button asChild className="bg-[#D4AF37] text-[#1b0738] hover:bg-[#F4E3B2] font-semibold px-8 py-3 rounded-lg relative z-10">
              <Link to="/contact">{c.cta}</Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default About;