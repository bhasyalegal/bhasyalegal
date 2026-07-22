import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Scale } from "lucide-react";

interface GavelLoaderProps {
  message?: string;
}

const GavelLoader = ({ message }: GavelLoaderProps) => {
  const { language } = useLanguage();

  const legalPhrases = {
    en: [
      "Reviewing legal precedents...",
      "Analyzing case files...",
      "Securing digital chambers...",
      "Verifying constitutional framework...",
      "Examining statutory provisions...",
      "Consulting senior counsel...",
      "Preparing judicial briefs...",
      "Evaluating evidentiary documentation..."
    ],
    np: [
      "कानूनी नजिरहरू बुझ्दै...",
      "मिसिल र प्रमाण विश्लेषण गर्दै...",
      "डिजिटल इजलास सुरक्षित गर्दै...",
      "संवैधानिक ढोका खोल्दै...",
      "वैधानिक व्यवस्थाहरू केलाउँदै...",
      "वरिष्ठ अधिवक्तासँग परामर्श गर्दै...",
      "अदालती बहस बुँदा तयार पार्दै...",
      "प्रमाण कागजातहरू मूल्याङ्कन गर्दै..."
    ],
  };

  const currentPhrases = language === "en" ? legalPhrases.en : legalPhrases.np;

  /* 
     RANDOMIZER LOGIC: 
     We pick a completely random index instantly upon mounting. 
     I also expanded the list above so there are more unique phrases to pull from!
  */
  const [randomPhraseIndex] = useState(() => 
    Math.floor(Math.random() * currentPhrases.length)
  );

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background select-none overflow-hidden">
      
      {/* Self-contained premium structural animations */}
      <style>{`
        @keyframes gavel-strike {
          0% { transform: rotate(-35deg); }
          12% { transform: rotate(-35deg); }
          18% { transform: rotate(3deg); }
          22% { transform: rotate(0deg); }
          30% { transform: rotate(0deg); }
          45% { transform: rotate(-35deg); }
          100% { transform: rotate(-35deg); }
        }
        @keyframes impact-ripple {
          0% { transform: scale(0.4); opacity: 0; }
          17% { transform: scale(0.4); opacity: 0; }
          19% { transform: scale(0.5); opacity: 1; }
          35% { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes subtle-glow {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.1); opacity: 0.25; }
        }
        .animate-gavel {
          transform-origin: 72px 55px;
          animation: gavel-strike 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-ripple {
          transform-origin: 45px 64px;
          animation: impact-ripple 2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
        }
        .animate-ambient-glow {
          animation: subtle-glow 4s ease-in-out infinite;
        }
      `}</style>

      {/* Layered Premium Ambient Lighting Background */}
      <div className="absolute w-[350px] h-[350px] bg-[#D4AF37]/10 dark:bg-[#D4AF37]/5 rounded-full blur-[80px] pointer-events-none animate-ambient-glow" />
      <div className="absolute w-[200px] h-[200px] bg-[#1b0738]/5 dark:bg-white/5 rounded-full blur-[60px] pointer-events-none translate-y-12" />

      {/* Main Glassmorphic Animation Core */}
      <div className="relative p-10 rounded-2xl card-premium flex flex-col items-center max-w-sm w-full mx-4 border border-[#D4AF37]/20 shadow-elegant-xl">
        
        {/* Vector Canvas */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-32 h-32 text-[#1b0738] dark:text-gray-100 drop-shadow-md"
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* 1. Impact Sound Wave Ring */}
          <circle 
            cx="45" 
            cy="64" 
            r="16" 
            className="stroke-[#D4AF37] animate-ripple" 
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* 2. Stationary Judicial Sound Block */}
          <g className="text-[#D4AF37]">
            <path d="M25 68h40" strokeWidth="3" />
            <rect x="33" y="61" width="24" height="7" rx="1.5" fill="currentColor" fillOpacity="0.1" />
          </g>

          {/* 3. Dynamic Animated Wooden Hammer Assembly */}
          <g className="animate-gavel text-[#1b0738] dark:text-white">
            <line x1="45" y1="42" x2="72" y2="55" strokeWidth="3" />
            <circle cx="72" cy="55" r="2" fill="#D4AF37" stroke="none" />
            
            <g transform="rotate(26, 45, 42)">
              <rect x="37" y="32" width="16" height="20" rx="2" fill="currentColor" />
              <line x1="37" y1="36" x2="53" y2="36" className="stroke-[#D4AF37]" strokeWidth="1" />
              <line x1="37" y1="48" x2="53" y2="48" className="stroke-[#D4AF37]" strokeWidth="1" />
              <path d="M37 34.5c-2 2-2 11 0 13V34.5z" fill="#D4AF37" />
              <path d="M53 34.5c2 2 2 11 0 13V34.5z" fill="#D4AF37" />
            </g>
          </g>
        </svg>

        {/* Branding Signifier Footer */}
        <div className="mt-6 text-center space-y-3 relative z-10 w-full">
          <div className="flex items-center justify-center gap-2 text-[#D4AF37] tracking-widest text-xs uppercase font-semibold">
            <Scale className="w-3.5 h-3.5" />
            <span>BHASYA LEGAL</span>
          </div>

          {/* Random phrase container */}
          <p className="text-sm font-light text-muted-foreground min-h-[20px] tracking-wide">
            {message || currentPhrases[randomPhraseIndex]}
          </p>
        </div>

        {/* Luxury Corner Border Accents */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]/30 rounded-tl" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]/30 rounded-tr" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]/30 rounded-bl" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]/30 rounded-br" />
      </div>
    </div>
  );
};

export default GavelLoader;