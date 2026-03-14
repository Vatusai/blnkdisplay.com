/**
 * LandingPage - Public Website
 * 
 * The public-facing marketing website for BLNK Display.
 * This is the main entry point for regular visitors.
 * Separate from the admin panel to keep concerns isolated.
 */

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Sections
import Hero from './sections/Hero';
import ProductShowcase from './sections/ProductShowcase';
import ColorPalette from './sections/ColorPalette';
import Finale from './sections/Finale';
import VideoShowcase from './sections/VideoShowcase';
import Applications from './sections/Applications';
import Specs from './sections/Specs';
import Workflow from './sections/Workflow';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Components
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import WhatsAppButton from './components/WhatsAppButton';

// Context
import { LangContext, type Lang } from './LangContext';

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>('es');

  useEffect(() => {
    // Initialize ScrollTrigger refresh after all content loads
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimeout);
    };
  }, []);

  return (
    <LangContext.Provider value={lang}>
      <div className="relative bg-black min-h-screen overflow-x-hidden">
        {/* Grain overlay */}
        <div className="grain-overlay" />

        {/* Custom cursor */}
        <CustomCursor />

        {/* WhatsApp floating button */}
        <WhatsAppButton />

        {/* Navigation */}
        <Navigation lang={lang} onToggleLang={() => setLang(l => l === 'es' ? 'en' : 'es')} />

        {/* Main content */}
        <main className="relative">
          <Hero />
          <ProductShowcase />
          <ColorPalette />
          <Finale />
          <VideoShowcase />
          <Applications />
          <Specs />
          <Workflow />
          <Contact />
          <Footer />
        </main>
      </div>
    </LangContext.Provider>
  );
}
