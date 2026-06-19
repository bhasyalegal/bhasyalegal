import React from "react";
import ServiceDetail from "./pages/ServiceDetail";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Attorneys from "./pages/Attorneys";
import Contact from "./pages/Contact";
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import About from "./pages/About";



import Layout from "./components/Layout";
import Home from "./pages/Home";
import Services from "./pages/Services";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />

            <BrowserRouter>
  <Layout>
    <Routes>
      <Route path="/attorneys" element={<Attorneys />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />    

  {/* LIST PAGE */}
  <Route path="/services" element={<Services />} />
  <Route path="/blog" element={<Blog />} />
  <Route path="/blog/:slug" element={<BlogPost />} />

  {/* ARTICLE PAGE (THIS IS WHAT YOU ARE MISSING) */}
  <Route path="/services/:slug" element={<ServiceDetail />} />
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