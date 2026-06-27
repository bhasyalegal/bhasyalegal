import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Helmet } from "react-helmet-async";

// ─── Components ────────────────────────────────────────────────
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";

// ─── Pages ──────────────────────────────────────────────────────
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Attorneys from "./pages/Attorneys";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound"; // ✅ Imported


// ─── AOS ────────────────────────────────────────────────────────
import AOS from 'aos';
import 'aos/dist/aos.css';

const queryClient = new QueryClient();

const App = () => {
  // ✅ AOS initialization – inside component
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <LanguageProvider>
          <TooltipProvider>
            {/* ✅ Helmet moved inside component */}
            <Helmet>
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "LegalService",
                  "name": "Bhasya Legal",
                  "url": "https://bhasyalegal.com",
                  "logo": "https://bhasyalegal.com/logo.png",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Kathmandu",
                    "addressCountry": "NP",
                  },
                  "telephone": "+977-9843722015",
                  "openingHours": "Mo-Fr 09:00-18:00",
                })}
              </script>
            </Helmet>

            <Toaster />
            <Sonner />
            <BrowserRouter
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }}
            >
              <ScrollToTop />
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:slug" element={<ServiceDetail />} />
                  <Route path="/attorneys" element={<Attorneys />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="*" element={<NotFound />} /> {/* ✅ Now works */}
                </Routes>
              </Layout>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;