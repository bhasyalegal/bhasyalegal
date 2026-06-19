import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";

// Import icons (adjust as needed)
import {
  Scale,
  HeartPulse,
  Plane,
  Landmark,
  ScrollText,
  Users,
  Monitor,
  Copyright,
  Building2,
  ChevronDown,
  AlertCircle,
  Shield,
  Gavel,
  FileText,
  Globe,
} from "lucide-react";

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();
  const [expandedService, setExpandedService] = useState<number | null>(null);

  // Service data with slugs for linking
  const services = [
    { id: 1, slug: "family-law", titleEn: "Family Law", titleNp: "पारिवारिक कानून", icon: Scale, description: "Compassionate guidance through divorce, custody, adoption, and family legal matters." },
    { id: 2, slug: "criminal-defense", titleEn: "Criminal Defense", titleNp: "आपराधिक प्रतिरक्षा", icon: Shield, description: "Strong, strategic defense for criminal charges with a focus on protecting your rights." },
    { id: 3, slug: "business-law", titleEn: "Business Law", titleNp: "व्यापार कानून", icon: Gavel, description: "Corporate legal services, contracts, and business formation from startup to enterprise." },
    { id: 4, slug: "consumer-tort", titleEn: "Consumer Tort", titleNp: "उपभोक्ता अपराध", icon: Scale, description: "Legal claims against businesses for negligence, defective products, or unfair trade practices." },
    { id: 5, slug: "medical-negligence", titleEn: "Medical Negligence", titleNp: "चिकित्सीय लापरवाही", icon: HeartPulse, description: "Compensation for harm caused by healthcare providers failing to meet standards of care." },
    { id: 6, slug: "divorce-from-abroad", titleEn: "Filing Divorce from Abroad", titleNp: "विदेशबाट सम्बन्ध विच्छेद", icon: Plane, description: "Assistance for Nepali citizens abroad filing divorce through Power of Attorney." },
    { id: 7, slug: "land-disputes", titleEn: "Land Disputes", titleNp: "जग्गा विवाद", icon: Landmark, description: "Ownership conflicts, inheritance, encroachment, and boundary disputes." },
    { id: 8, slug: "writ-petition", titleEn: "Writ Petition", titleNp: "रिट निवेदन", icon: ScrollText, description: "Constitutional remedy against unlawful state actions." },
    { id: 9, slug: "public-interest-litigation", titleEn: "Public Interest Litigation", titleNp: "सार्वजनिक सरोकारको मुद्दा", icon: Users, description: "Legal action for issues affecting society or public welfare." },
    { id: 10, slug: "sexual-offences", titleEn: "Sexual Offences", titleNp: "यौन अपराध", icon: AlertCircle, description: "Rape, harassment, exploitation under Nepal's Penal Code." },
    { id: 11, slug: "narcotics-cases", titleEn: "Narcotics Cases", titleNp: "लागूऔषध मुद्दा", icon: Shield, description: "Defense for production, possession, or trafficking of illegal substances." },
    { id: 12, slug: "immigration-law", titleEn: "Immigration Law", titleNp: "अध्यागमन कानून", icon: Globe, description: "Visa overstay, illegal entry, deportation, and asylum matters." },
    { id: 13, slug: "contract-disputes", titleEn: "Contract Disputes", titleNp: "अनुबंधिक विवाद", icon: FileText, description: "Breach of contract, non‑performance, and commercial claims." },
    { id: 14, slug: "class-action", titleEn: "Class Action Cases", titleNp: "वर्गीय मुद्दा", icon: Users, description: "Collective claims by multiple individuals with similar harm." },
    { id: 15, slug: "personal-injury", titleEn: "Personal Injury Law", titleNp: "व्यक्तिगत चोट कानून", icon: HeartPulse, description: "Compensation for accidents, negligence, and unsafe conditions." },
    { id: 16, slug: "homicide", titleEn: "Homicide", titleNp: "हत्या", icon: Gavel, description: "Unlawful killing cases: murder, manslaughter, and related offenses." },
    { id: 17, slug: "theft-burglary", titleEn: "Theft and Burglary", titleNp: "चोरी र सिन्धु पार गरी चोरी", icon: Shield, description: "Property crimes, including theft, burglary, and related offenses." },
    { id: 18, slug: "cyber-crime", titleEn: "Cyber Crime Cases", titleNp: "साइबर अपराध", icon: Monitor, description: "Hacking, online fraud, identity theft, and cyberbullying." },
    { id: 19, slug: "ip-law", titleEn: "IP Law", titleNp: "बौद्धिक सम्पत्ति कानून", icon: Copyright, description: "Protection of trademarks, copyrights, patents, and designs." },
    { id: 20, slug: "labor-law", titleEn: "Labor Law", titleNp: "श्रम कानून", icon: Building2, description: "Employment contracts, workplace safety, wages, and dispute resolution." },
    { id: 21, slug: "refugee-law", titleEn: "Refugee Law", titleNp: "शरणार्थी कानून", icon: Globe, description: "Protection of displaced persons and asylum seekers." },
  ];

  // Handle hash on load – scroll to the service with matching slug
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
      }
    }
  }, [location.hash]);

  const toggleExpand = (id: number) => {
    setExpandedService((prev) => (prev === id ? null : id));
  };

  const t = (en: string, np: string) => (language === "en" ? en : np);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-royal-blue dark:text-white mb-4">
            {language === "en" ? "Our Practice Areas" : "हाम्रा सेवा क्षेत्रहरू"}
          </h1>
          <div className="w-24 h-1 bg-law-gold mx-auto mb-6"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {language === "en"
              ? "Explore our comprehensive legal services across multiple practice areas."
              : "हाम्रा विविध अभ्यास क्षेत्रहरूमा व्यापक कानूनी सेवाहरू अन्वेषण गर्नुहोस्।"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              id={service.slug} // <-- ID for hash linking
              className="scroll-mt-32" // <-- Offset for fixed navbar
            >
              <Card
                className={`
                  rounded-3xl overflow-hidden transition-all duration-500 border
                  ${
                    expandedService === service.id
                      ? "border-law-gold shadow-2xl scale-[1.02]"
                      : "border-gray-200 dark:border-white/10"
                  }
                  bg-white dark:bg-gray-800
                  hover:-translate-y-1 hover:shadow-2xl
                `}
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleExpand(service.id)}
                    className="w-full text-left p-8 focus:outline-none"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <div className="flex items-start gap-5">
                        <div
                          className={`
                            w-16 h-16 rounded-2xl flex items-center justify-center
                            transition-all duration-500
                            ${
                              expandedService === service.id
                                ? "bg-law-gold shadow-lg"
                                : "bg-royal-blue dark:bg-royal-blue/80"
                            }
                          `}
                        >
                          <service.icon
                            className={`
                              w-8 h-8
                              ${
                                expandedService === service.id
                                  ? "text-royal-blue"
                                  : "text-law-gold"
                              }
                            `}
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-serif font-semibold text-royal-blue dark:text-white">
                            {t(service.titleEn, service.titleNp)}
                          </h3>
                          <div className="mt-3 w-16 h-[2px] bg-gradient-to-r from-law-gold to-transparent"></div>
                        </div>
                      </div>
                      <ChevronDown
                        className={`
                          w-5 h-5 mt-2 text-gray-500 transition-transform duration-500
                          ${expandedService === service.id ? "rotate-180" : ""}
                        `}
                      />
                    </div>

                    {expandedService !== service.id && (
                      <p className="mt-8 text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                        {t(service.description, service.description)}
                      </p>
                    )}
                  </button>

                  <div
                    className={`
                      overflow-hidden transition-all duration-500
                      ${
                        expandedService === service.id
                          ? "max-h-[500px] opacity-100"
                          : "max-h-0 opacity-0"
                      }
                    `}
                  >
                    <div className="px-8 pb-8 border-t border-gray-200 dark:border-white/10">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-6">
                        {t(service.description, service.description)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;