// Layout.tsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";
import StickyCTA from "./StickyCTA";
import GavelLoader from "./GavelLoader";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isPageChanging, setIsPageChanging] = useState(false);

  useEffect(() => {
    setIsPageChanging(true);
    const transitionTimer = setTimeout(() => {
      setIsPageChanging(false);
    }, 700);
    return () => clearTimeout(transitionTimer);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-[#D4AF37] selection:text-[#1b0738] relative">
      
      {/* --- BACKGROUND TEXTURE --- */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.15] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(#D4AF37 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {isPageChanging && <GavelLoader />}
      <Navigation />
      
      <main 
        className={`flex-1 relative z-10 ${!isHomePage ? "pt-24 md:pt-28" : ""} 
          animate-fade-in 
          [&_section]:bg-transparent 
          [&_.bg-white]:bg-transparent 
          [&_.bg-slate-50]:bg-transparent`}
      >
        {children}
      </main>
      
      <Footer />
      <ScrollToTopButton />
      <StickyCTA />
    </div>
  );
};

export default Layout;