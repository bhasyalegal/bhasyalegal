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
  
  // Track page navigation states
  const [isPageChanging, setIsPageChanging] = useState(false);

  useEffect(() => {
    // 1. Trigger the premium loading screen immediately on any page change
    setIsPageChanging(true);

    // 2. Keep it brief (700ms) so it's snappy but lets the gavel slam down once beautifully
    const transitionTimer = setTimeout(() => {
      setIsPageChanging(false);
    }, 700);

    // 3. Always clean up timers to prevent memory leaks during rapid clicks
    return () => clearTimeout(transitionTimer);
  }, [location.pathname]); // Fires every single time the URL changes

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-[#D4AF37] selection:text-[#1b0738]">
      {/* 
         Render the Gavel loader as a brief overlay when changing pages.
         We keep the background components mounted underneath so transitions feel fluid.
      */}
      {isPageChanging && <GavelLoader />}

      {/* Primary Sticky Header Landmark */}
      <Navigation />
      
      {/* Main Content Area */}
      <main 
        className={`flex-1 ${!isHomePage ? "pt-24 md:pt-28" : ""} 
          animate-fade-in 
          [&_section]:bg-transparent 
          [&_.bg-white]:bg-transparent 
          [&_.bg-slate-50]:bg-transparent`}
      >
        {children}
      </main>
      
      {/* Structural Footing Landmark */}
      <Footer />
      
      {/* Global Context Control Elements */}
      <ScrollToTopButton />
      <StickyCTA />
    </div>
  );
};

export default Layout;