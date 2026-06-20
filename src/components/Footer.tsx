import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import LogoLight from "../img/logo-light.webp";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      companyDesc: "Providing exceptional legal counsel with integrity, dedication, and results-driven advocacy for clients across Nepal.",
      quickLinks: "Quick Links",
      practiceAreas: "Practice Areas",
      contactInfo: "Contact Info",
      address: "Kadaghari, Kathmandu, Nepal",
      phone: "+977 9843722015",
      email: "bhasyalegal@gmail.com",
      hours: "Mon–Fri: 9:00 AM – 6:00 PM",
      hoursSat: "Sat: 10:00 AM – 2:00 PM",
      emergency: "Emergency: 24/7",
      copyright: "All rights reserved.",
    },
    np: {
      companyDesc: "नेपालभरका ग्राहकहरूको लागि अखण्डता, समर्पण, र परिणाम-संचालित वकालतको साथ उत्कृष्ट कानूनी परामर्श प्रदान गर्दै।",
      quickLinks: "द्रुत लिङ्कहरू",
      practiceAreas: "सेवा क्षेत्रहरू",
      contactInfo: "सम्पर्क जानकारी",
      address: "कडाघारी, काठमाडौं, नेपाल",
      phone: "+९७७ ९८४३७२२०१५",
      email: "info@bhasyalegal.com",
      hours: "सोम–शुक्र: बिहान ९ – साँझ ६",
      hoursSat: "शनि: बिहान १० – दिउँसो २",
      emergency: "आपत्कालीन: २४/७",
      copyright: "सबै अधिकार सुरक्षित।",
    },
  };

  const c = language === "en" ? content.en : content.np;
  const t = (en: string, np: string) => (language === "en" ? en : np);

  const quickLinks = [
    { nameEn: "About Us", nameNp: "हाम्रो बारेमा", path: "/about" },
    { nameEn: "Services", nameNp: "सेवाहरू", path: "/services" },
    { nameEn: "Attorneys", nameNp: "कानून व्यवसायी", path: "/attorneys" },
    { nameEn: "Blog", nameNp: "ब्लग", path: "/blog" },
    { nameEn: "Contact", nameNp: "सम्पर्क", path: "/contact" },
  ];

  // ─── Six practice areas ───────────────────────────────────────────
  const practiceAreas = [
    { slug: "consumer-tort", nameEn: "Consumer Tort", nameNp: "उपभोक्ता अपराध" },
    { slug: "medical-negligence", nameEn: "Medical Negligence", nameNp: "चिकित्सीय लापरवाही" },
    { slug: "land-disputes", nameEn: "Land Dispute", nameNp: "जग्गा विवाद" },
    { slug: "class-action", nameEn: "Class Action Cases", nameNp: "वर्गीय मुद्दा" },
    { slug: "narcotics-cases", nameEn: "Narcotics Cases", nameNp: "लागूऔषध मुद्दा" },
    { slug: "homicide", nameEn: "Homicide", nameNp: "हत्या" },
  ];

  return (
    <footer className="text-white" style={{ backgroundColor: "#100422" }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <img src={LogoLight} width={200} alt="Bhasya Legal Logo" />
            <p className="text-gray-300 leading-relaxed">{c.companyDesc}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-law-gold">{c.quickLinks}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-300 hover:text-law-gold transition-colors">
                    {t(link.nameEn, link.nameNp)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Areas */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-law-gold">{c.practiceAreas}</h4>
            <ul className="space-y-2">
              {practiceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    to={`/services#${area.slug}`}
                    className="text-gray-300 hover:text-law-gold transition-colors"
                  >
                    {t(area.nameEn, area.nameNp)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-law-gold">{c.contactInfo}</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-law-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">{c.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-law-gold" />
                <p className="text-gray-300">{c.phone}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-law-gold" />
                <p className="text-gray-300">{c.email}</p>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-law-gold mt-1" />
                <div className="text-gray-300">
                  <p>{c.hours}</p>
                  <p>{c.hoursSat}</p>
                  <p className="text-law-gold font-medium">{c.emergency}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} Bhasya Legal. {c.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;