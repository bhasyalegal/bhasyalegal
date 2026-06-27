import React, { useEffect, useState } from "react";
import HeroBg from "../img/hero-bg.jpg"; 

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#1b0738]">
      
      {/* 1. CINEMATIC BACKGROUND KINETIC ZOOM */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-out select-none will-change-transform
          ${isMounted ? "scale-100" : "scale-112"}`}
        style={{ backgroundImage: `url(${HeroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b0738]/85 via-[#1b0738]/50 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* COMPONENT BODY MATRIX */}
      <div className="relative z-10 flex h-full max-w-7xl mx-auto px-6 lg:px-12 items-center">
        <div className="max-w-4xl text-left">
          
          {/* Main Heading */}
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.15] select-none">
            Bhasya Legal
          </h1>

          {/* LOWERED SUBTITLE WITH THIN DARK BORDER */}
          <div className={`mt-8 inline-block px-6 py-2 border border-white/20 rounded-full transition-all duration-[900ms] delay-[400ms]
            ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="text-xs font-extrabold tracking-[0.3em] uppercase text-white/90">
              JUSTICE • INTEGRITY • NEPAL
            </span>
          </div>

          {/* Subheading */}
          <p 
            className={`mt-6 text-base md:text-lg lg:text-xl text-gray-200/80 font-light max-w-2xl leading-relaxed transition-all duration-[1200ms] delay-[700ms]
              ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            Bhasya Legal provides premier legal counsel with unwavering dedication to 
            achieving the best outcomes for our clients across Nepal.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1b0738] to-transparent pointer-events-none" />
    </div>
  );
};

export default Hero;