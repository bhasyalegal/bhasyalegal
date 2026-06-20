import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  AlertCircle,
  Shield,
  Gavel,
  FileText,
  Globe,
} from "lucide-react";

const Services = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();

  // ─── Services data ────────────────────────────────────────────────
  const services = [
    {
      id: 1,
      slug: "consumer-tort",
      titleEn: "Consumer Tort",
      titleNp: "उपभोक्ता अपराध",
      icon: Scale,
      descriptionEn: "Legal claims against businesses for negligence, defective products, or unfair trade practices.",
      descriptionNp: "लापरवाही, दोषपूर्ण उत्पादन, वा अनुचित व्यापार अभ्यासको लागि व्यवसायहरू विरुद्ध दाबीहरू।",
    },
    {
      id: 2,
      slug: "medical-negligence",
      titleEn: "Medical Negligence",
      titleNp: "चिकित्सीय लापरवाही",
      icon: HeartPulse,
      descriptionEn: "Compensation for harm caused by healthcare providers failing to meet standards of care.",
      descriptionNp: "हेरचाहको मापदण्ड पूरा नगर्ने स्वास्थ्य सेवा प्रदायकहरूको कारणले भएको क्षतिको क्षतिपूर्ति।",
    },
    {
      id: 3,
      slug: "divorce-from-abroad",
      titleEn: "Filing Divorce from Abroad",
      titleNp: "विदेशबाट सम्बन्ध विच्छेद दायर",
      icon: Plane,
      descriptionEn: "Assistance for Nepali citizens abroad filing divorce through Power of Attorney.",
      descriptionNp: "विदेशमा रहेका नेपाली नागरिकहरूको लागि पावर अफ अटर्नी मार्फत सम्बन्ध विच्छेद सहायता।",
    },
    {
      id: 4,
      slug: "land-disputes",
      titleEn: "Land Disputes",
      titleNp: "जग्गा विवाद",
      icon: Landmark,
      descriptionEn: "Ownership conflicts, inheritance, encroachment, and boundary disputes.",
      descriptionNp: "स्वामित्व द्वन्द्व, उत्तराधिकार, अतिक्रमण, र सीमा विवादहरू।",
    },
    {
      id: 5,
      slug: "writ-petition",
      titleEn: "Writ Petition",
      titleNp: "रिट निवेदन",
      icon: ScrollText,
      descriptionEn: "Constitutional remedy against unlawful state actions.",
      descriptionNp: "अवैध राज्य कार्यविरुद्ध संवैधानिक उपचार।",
    },
    {
      id: 6,
      slug: "public-interest-litigation",
      titleEn: "Public Interest Litigation",
      titleNp: "सार्वजनिक सरोकारको मुद्दा",
      icon: Users,
      descriptionEn: "Legal action for issues affecting society or public welfare.",
      descriptionNp: "समाज वा सार्वजनिक कल्याणलाई असर गर्ने मुद्दाहरूको लागि कानूनी कारबाही।",
    },
    {
      id: 7,
      slug: "sexual-offences",
      titleEn: "Sexual Offences",
      titleNp: "यौन अपराध",
      icon: AlertCircle,
      descriptionEn: "Rape, harassment, exploitation under Nepal's Penal Code.",
      descriptionNp: "बलात्कार, उत्पीडन, शोषण (नेपालको दण्ड संहिता अनुसार)।",
    },
    {
      id: 8,
      slug: "narcotics-cases",
      titleEn: "Narcotics Cases",
      titleNp: "लागूऔषध मुद्दा",
      icon: Shield,
      descriptionEn: "Defense for production, possession, or trafficking of illegal substances.",
      descriptionNp: "अवैध लागूऔषधको उत्पादन, ओगटो, वा ओसारपसारको प्रतिरक्षा।",
    },
    {
      id: 9,
      slug: "immigration-law",
      titleEn: "Immigration Law",
      titleNp: "अध्यागमन कानून",
      icon: Globe,
      descriptionEn: "Visa overstay, illegal entry, deportation, and asylum matters.",
      descriptionNp: "भिसा ओभरस्टे, अवैध प्रवेश, निर्वासन, र शरण मामिलाहरू।",
    },
    {
      id: 10,
      slug: "contract-disputes",
      titleEn: "Contractual Disputes",
      titleNp: "अनुबंधिक विवाद",
      icon: FileText,
      descriptionEn: "Breach of contract, non‑performance, and commercial claims.",
      descriptionNp: "अनुबंधको उल्लङ्घन, गैर-प्रदर्शन, र व्यावसायिक दाबीहरू।",
    },
    {
      id: 11,
      slug: "class-action",
      titleEn: "Class Action Cases",
      titleNp: "वर्गीय मुद्दा",
      icon: Users,
      descriptionEn: "Collective claims by multiple individuals with similar harm.",
      descriptionNp: "समान हानि भएका धेरै व्यक्तिहरूको सामूहिक दाबी।",
    },
    {
      id: 12,
      slug: "personal-injury",
      titleEn: "Personal Injury Law",
      titleNp: "व्यक्तिगत चोट कानून",
      icon: HeartPulse,
      descriptionEn: "Compensation for accidents, negligence, and unsafe conditions.",
      descriptionNp: "दुर्घटना, लापरवाही, र असुरक्षित अवस्थाको क्षतिपूर्ति।",
    },
    {
      id: 13,
      slug: "homicide",
      titleEn: "Homicide",
      titleNp: "हत्या",
      icon: Gavel,
      descriptionEn: "Unlawful killing cases: murder, manslaughter, and related offenses.",
      descriptionNp: "अवैध हत्याका मुद्दाहरू: हत्या, मानव वध, र सम्बन्धित अपराधहरू।",
    },
    {
      id: 14,
      slug: "theft-burglary",
      titleEn: "Theft and Burglary",
      titleNp: "चोरी र सिन्धु पार गरी चोरी",
      icon: Shield,
      descriptionEn: "Property crimes, including theft, burglary, and related offenses.",
      descriptionNp: "सम्पत्ति अपराधहरू: चोरी, सिन्धु पार गरी चोरी, र सम्बन्धित अपराधहरू।",
    },
    {
      id: 15,
      slug: "cyber-crime",
      titleEn: "Cyber Crime Cases",
      titleNp: "साइबर अपराध मुद्दा",
      icon: Monitor,
      descriptionEn: "Hacking, online fraud, identity theft, and cyberbullying.",
      descriptionNp: "ह्याकिङ, अनलाइन ठगी, पहिचान चोरी, र साइबर धम्की।",
    },
    {
      id: 16,
      slug: "defamation",
      titleEn: "Defamation and Abuse",
      titleNp: "मानहानि र दुर्व्यवहार",
      icon: AlertCircle,
      descriptionEn: "False statements harming reputation, civil and criminal remedies.",
      descriptionNp: "प्रतिष्ठालाई हानि पुर्याउने झूटा भनाइ, दिवानी र आपराधिक उपायहरू।",
    },
    {
      id: 17,
      slug: "ip-law",
      titleEn: "IP Law",
      titleNp: "बौद्धिक सम्पत्ति कानून",
      icon: Copyright,
      descriptionEn: "Protection of trademarks, copyrights, patents, and designs.",
      descriptionNp: "ट्रेडमार्क, प्रतिलिपि अधिकार, पेटेन्ट, र डिजाइनको संरक्षण।",
    },
    {
      id: 18,
      slug: "labor-law",
      titleEn: "Labor Law",
      titleNp: "श्रम कानून",
      icon: Building2,
      descriptionEn: "Employment contracts, workplace safety, wages, and dispute resolution.",
      descriptionNp: "रोजगार अनुबंध, कार्यस्थल सुरक्षा, ज्याला, र विवाद समाधान।",
    },
    {
      id: 19,
      slug: "refugee-law",
      titleEn: "Refugee Law",
      titleNp: "शरणार्थी कानून",
      icon: Globe,
      descriptionEn: "Protection of displaced persons and asylum seekers.",
      descriptionNp: "विस्थापित व्यक्ति र शरण खोज्नेहरूको संरक्षण।",
    },
  ];

  const t = (en: string, np: string) => (language === "en" ? en : np);

  // ─── Scroll to hash (from home page) ──────────────────────────────
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  }, [location.hash]);

  // ─── Remember scroll position when going back from detail ────────
  // On mount, check sessionStorage for a last visited slug
  useEffect(() => {
    const storedSlug = sessionStorage.getItem("lastServiceSlug");
    if (storedSlug) {
      // Clear it so it doesn't scroll again on next visit
      sessionStorage.removeItem("lastServiceSlug");
      const element = document.getElementById(storedSlug);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 400);
      }
    }
  }, []);

  // When clicking a service, store the slug before navigating
  const handleServiceClick = (slug: string) => {
    sessionStorage.setItem("lastServiceSlug", slug);
  };

  // ─── Render ──────────────────────────────────────────────────────────
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
            <div key={service.id} id={service.slug} className="scroll-mt-32">
              <Link
                to={`/services/${service.slug}`}
                onClick={() => handleServiceClick(service.slug)}
                className="block h-full transition-all duration-300 hover:-translate-y-2"
              >
                <Card className="rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl h-full cursor-pointer">
                  <CardContent className="p-8 text-center">
                    <div className="flex justify-center mb-6">
                      <div className="w-20 h-20 bg-royal-blue dark:bg-royal-blue/80 rounded-full flex items-center justify-center group-hover:bg-law-gold transition-colors duration-300">
                        <service.icon className="w-10 h-10 text-law-gold group-hover:text-royal-blue transition-colors duration-300" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-royal-blue dark:text-white mb-4">
                      {t(service.titleEn, service.titleNp)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {t(service.descriptionEn, service.descriptionNp)}
                    </p>
                    <div className="mt-6">
                      <Button
                        className="bg-law-gold hover:bg-law-gold/90 text-royal-blue font-semibold"
                        onClick={(e) => {
                          e.preventDefault();
                          handleServiceClick(service.slug);
                          navigate(`/services/${service.slug}`);
                        }}
                      >
                        {language === "en" ? "Learn More" : "थप जान्नुहोस्"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export const services = [
  // ... all your services
];

export default Services;