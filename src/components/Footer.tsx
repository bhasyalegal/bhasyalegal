import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, ShieldCheck } from "lucide-react";
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
      phone: "+977 9845047233",
      email: "info@bhasyalegal.com",
      hours: "Mon–Fri: 9:00 AM – 6:00 PM",
      hoursSat: "Sat: 10:00 AM – 2:00 PM",
      emergency: "Emergency: 24/7 Support",
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
      emergency: "आपत्कालीन: २४/७ सहायता",
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

  const practiceAreas = [
    { slug: "consumer-tort", nameEn: "Consumer Tort", nameNp: "उपभोक्ता अपराध" },
    { slug: "medical-negligence", nameEn: "Medical Negligence", nameNp: "चिकित्सीय लापरवाही" },
    { slug: "land-disputes", nameEn: "Land Disputes", nameNp: "जग्गा विवाद" },
    { slug: "class-action", nameEn: "Class Action Cases", nameNp: "वर्गीय मुद्दा" },
    { slug: "narcotics-cases", nameEn: "Narcotics Cases", nameNp: "लागूऔषध मुद्दा" },
    { slug: "homicide", nameEn: "Homicide", nameNp: "हत्या" },
  ];

  return (
    <footer className="text-gray-300 border-t border-white/5 relative z-30" style={{ backgroundColor: "#100422" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Company Branding Profile */}
          <div className="space-y-6">
            <img 
              src={LogoLight} 
              width={180} 
              alt="Bhasya Legal Logo" 
              className="drop-shadow-sm brightness-105"
              loading="lazy"
            />
            <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
              {c.companyDesc}
            </p>
          </div>

          {/* Quick Links Map */}
          <div className="space-y-6">
            <h4 className="text-lg font-serif font-bold text-[#D4AF37] tracking-wider uppercase text-sm">
              {c.quickLinks}
            </h4>
            <ul className="space-y-3" role="navigation" aria-label="Footer Quick Links">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="inline-block text-gray-400 hover:text-[#D4AF37] transform hover:translate-x-1 text-[15px] transition-all duration-200"
                  >
                    {t(link.nameEn, link.nameNp)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Practice Fields */}
          <div className="space-y-6">
            <h4 className="text-lg font-serif font-bold text-[#D4AF37] tracking-wider uppercase text-sm">
              {c.practiceAreas}
            </h4>
            <ul className="space-y-3" role="navigation" aria-label="Footer Practice Disciplines">
              {practiceAreas.map((area) => (
                <li key={area.slug}>
                  <Link
                    to={`/services#${area.slug}`}
                    className="inline-block text-gray-400 hover:text-[#D4AF37] transform hover:translate-x-1 text-[15px] transition-all duration-200"
                  >
                    {t(area.nameEn, area.nameNp)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Organized Contact Channels */}
          <div className="space-y-6">
            <h4 className="text-lg font-serif font-bold text-[#D4AF37] tracking-wider uppercase text-sm">
              {c.contactInfo}
            </h4>
            <div className="space-y-4 text-[15px]">
              
              <div className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray-400 leading-relaxed">{c.address}</span>
              </div>

              <div className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 text-[#D4AF37] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href={`tel:${c.phone}`} className="text-gray-400 hover:text-[#D4AF37] transition-colors">{c.phone}</a>
              </div>

              <div className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-[#D4AF37] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href={`mailto:${c.email}`} className="text-gray-400 hover:text-[#D4AF37] transition-colors break-all">{c.email}</a>
              </div>

              <div className="flex items-start space-x-3 pt-2 border-t border-white/5">
                <Clock className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                <div className="text-gray-400 text-sm space-y-1 font-light">
                  <p>{c.hours}</p>
                  <p>{c.hoursSat}</p>
                  <div className="flex items-center space-x-1.5 text-[#D4AF37] font-semibold mt-2 tracking-wide text-xs uppercase bg-[#D4AF37]/10 px-2.5 py-1 rounded-md border border-[#D4AF37]/20 w-fit">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{c.emergency}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Global Structural Copyright Frame */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center sm:text-left tracking-wide">
            © {new Date().getFullYear()} Bhasya Legal. {c.copyright}
          </p>
          <div className="flex space-x-6 text-xs text-gray-500 font-light">
            <a href="#privacy" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;