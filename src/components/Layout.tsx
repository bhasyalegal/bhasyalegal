import React from "react";
import { useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";
import StickyCTA from "./StickyCTA";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-[#D4AF37] selection:text-[#1b0738]">
      {/* Primary Sticky Header Landmark */}
      <Navigation />
      
      {/* 
          MASTER BYPASS APPLIED HERE:
          Added '[&_section]:bg-transparent' and '[&_.bg-white]:bg-transparent'.
          This forcefully pierces through any hardcoded "bg-white" or "bg-slate-50" section panels 
          inside your pages, exposing the luxury, gold-tinted matte linen texture below.
      */}
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