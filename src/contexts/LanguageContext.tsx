import React, { createContext, useState, useContext, useEffect } from "react";

type Language = "en" | "np";

interface Translations {
  [key: string]: {
    en: string;
    np: string;
  };
}

const translations: Translations = {
  home: { en: "Home", np: "गृह पृष्ठ" },
  about: { en: "About Us", np: "हाम्रो बारेमा" },
  services: { en: "Services", np: "सेवाहरू" },
  attorneys: { en: "Attorneys", np: "कानुन व्यवसायी" },
  blog: { en: "Blog", np: "ब्लग" },
  contact: { en: "Contact", np: "सम्पर्क" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved === "en" || saved === "np") ? saved : "en";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};