import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Briefcase, GraduationCap } from "lucide-react";

// Import images directly from src
import SubinPhoto from "../img/team/subin-pandey.jpg";
import SaranaPhoto from "../img/team/sarana-shahi.jpg";
import RhishavPhoto from "../img/team/rhishav-sapkota.jpg";

const Attorneys = () => {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Our Attorneys",
      subtitle: "Dedicated legal professionals committed to your success",
      description: "Bhasya Legal brings together a team of experienced advocates and legal associates who are passionate about justice and client advocacy.",
      members: [
        {
          name: "Subin Pandey",
          role: "Advocate & Legal Expert",
          bio: "Subin Pandey is a highly motivated law practitioner with a Master of Laws (LL.M.) in Criminal and Constitutional Law from National Law College. He has extensive experience litigating civil, criminal, labor, and corporate cases. He has served as a Legal Expert at the Ministry of Federal Affairs and worked with the World Health Organization (WHO) and UNDP on legal reforms and human rights.",
          education: "LL.M. (Criminal & Constitutional Law), National Law College",
          experience: "Abhiyan Law Firm, Ministry of Federal Affairs, WHO, UNDP",
          image: SubinPhoto,
        },
        {
          name: "Sarana Shahi",
          role: "Advocate & Legal Associate",
          bio: "Sarana Shahi is a punctual, detail‑oriented Advocate with a BALLB from Kathmandu School of Law. She has experience as a Legal Associate at Vasya Legal Law Firm, handling case preparation, client consultations, and court proceedings. She also served as BALLB Coordinator at SANN International College, mentoring students in moot court and legal research.",
          education: "BALLB, Kathmandu School of Law, Purbanchal University",
          experience: "Basya Legal Law Firm, SANN International College",
          image: SaranaPhoto,
        },
        {
          name: "Rhishav Sapkota",
          role: "Legal Associate",
          bio: "Rhishav Sapkota is a dedicated Legal Associate with strong organizational and research skills. He supports the firm in case management, legal documentation, and client coordination. His meticulous approach ensures smooth workflow.",
          education: "Bachelor of Laws (LL.B.)",
          experience: "Legal documentation, case management, client coordination",
          image: RhishavPhoto,
        },
      ],
      cta: "Schedule a Consultation",
    },
    np: {
      title: "हाम्रा कानून व्यवसायीहरू",
      subtitle: "तपाईंको सफलताको लागि प्रतिबद्ध कानूनी पेशेवरहरू",
      description: "भास्य कानूनले अनुभवी अधिवक्ता र कानूनी सहयोगीहरूको टोली ल्याउँदछ।",
      members: [
        {
          name: "सुबिन पाण्डे",
          role: "अधिवक्ता र कानूनी विशेषज्ञ",
          bio: "सुबिन पाण्डे एक उच्च उत्प्रेरित कानून व्यवसायी हुन् जसले नेशनल ल कलेजबाट फौजदारी तथा संवैधानिक कानूनमा स्नातकोत्तर (LL.M.) गरेका छन्। उनीसँग नागरिक, फौजदारी, श्रम र कर्पोरेट मुद्दाहरूमा मुद्दा चलाउने व्यापक अनुभव छ। उनले संघीय मामिला मन्त्रालयमा कानुनी विज्ञको रूपमा काम गरेका छन् र विश्व स्वास्थ्य संगठन (WHO) र UNDP सँग कानुनी सुधार र मानव अधिकारमा काम गरेका छन्। ",
          education: "एलएल.एम. (आपराधिक र संवैधानिक कानून), राष्ट्रिय कानून कलेज",
          experience: "अभियान ल फर्म, संघीय मामिला मन्त्रालय, WHO, UNDP",
          image: SubinPhoto,
        },
        {
          name: "सारणा शाही",
          role: "अधिवक्ता र कानूनी सहयोगी",
          bio: "सरना शाही काठमाडौँ स्कूल अफ लबाट BALLB गरेकी एक समयनिष्ठ, विवरण-उन्मुख अधिवक्ता हुन्। उनीसँग वास्या लिगल ल फर्ममा कानुनी सहयोगीको रूपमा मुद्दा तयारी, ग्राहक परामर्श र अदालतको कार्यवाही ह्यान्डल गर्ने अनुभव छ। उनले SANN इन्टरनेशनल कलेजमा BALLB संयोजकको रूपमा पनि काम गरिन्, मुट कोर्ट र कानुनी अनुसन्धानमा विद्यार्थीहरूलाई मार्गदर्शन गरिन्।",
          education: "BALLB, काठमाडौं स्कूल अफ ल, पूर्वाञ्चल विश्वविद्यालय",
          experience: "भास्य कानून फर्म, SANN इन्टरनेशनल कलेज",
          image: SaranaPhoto,
        },
        {
          name: "ऋषभ सापकोटा",
          role: "कानूनी सहयोगी",
          bio: "ऋषभ सापकोटा बलियो संगठनात्मक र अनुसन्धान कौशल भएका समर्पित कानूनी सहयोगी हुन्।",
          education: "कानून स्नातक (LL.B.)",
          experience: "कानूनी कागजात, केस व्यवस्थापन, ग्राहक समन्वय",
          image: RhishavPhoto,
        },
      ],
      cta: "परामर्श तालिका बनाउनुहोस्",
    },
  };

  const c = language === "en" ? content.en : content.np;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-royal-blue dark:text-white mb-4">
            {c.title}
          </h1>
          <p className="text-lg text-law-gold font-medium mb-4">{c.subtitle}</p>
          <div className="w-24 h-1 bg-law-gold mx-auto mb-8"></div>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{c.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {c.members.map((member, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
            >
              {/* Image container - taller aspect ratio for portraits, object-contain to show full photo */}
              <div className="bg-gradient-to-br from-royal-blue/10 to-law-gold/10 flex items-center justify-center p-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-auto max-h-96 object-contain rounded-lg"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-serif font-bold text-royal-blue dark:text-white">{member.name}</h3>
                <p className="text-law-gold font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="space-y-2 text-sm border-t border-gray-100 dark:border-gray-700 pt-4">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 text-law-gold mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{member.education}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Briefcase className="w-4 h-4 text-law-gold mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-300">{member.experience}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-royal-blue to-law-gold/80 rounded-xl p-10 shadow-lg">
          <h3 className="text-2xl font-serif font-bold text-white mb-4">
            {language === "en" ? "Ready to Work With Us?" : "हामीसँग काम गर्न तयार हुनुहुन्छ?"}
          </h3>
          <Button asChild className="bg-white text-royal-blue hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg">
            <Link to="/contact">{c.cta}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Attorneys;