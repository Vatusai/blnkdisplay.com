import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.css';
import './App.css';
import useLenis from './hooks/useLenis';
import { siteConfig } from './config';
import Hero from './sections/Hero';
import AlbumCube from './sections/AlbumCube';
import ParallaxGallery from './sections/ParallaxGallery';
import TourSchedule from './sections/TourSchedule';
import Specs from './sections/Specs';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLElement>(null);
  
  // Initialize Lenis smooth scrolling
  useLenis();

  useEffect(() => {
    // Set page title from config
    if (siteConfig.title) {
      document.title = siteConfig.title;
    }

    // Add viewport meta for better mobile experience
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      // Solo considerar pinned sections que NO sean el Hero (ahora es flujo libre)
      const pinned = ScrollTrigger.getAll()
        .filter(st => {
          const trigger = st.trigger;
          const isHero = trigger?.classList?.contains('hero-section');
          return st.vars.pin && !isHero;
        })
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build pinned ranges with settle ratios
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Global snap configuration
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.4 },
          delay: 0,
          ease: 'power1.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <main ref={mainRef} className="relative w-full min-h-screen bg-[#07070A] overflow-x-hidden">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Hero Section - Immersive landing with LED module */}
      <div className="hero-section">
        <Hero />
      </div>

      {/* Album Cube Section - 3D Technology showcase */}
      <div className="technology-section pinned-section">
        <AlbumCube />
      </div>

      {/* Parallax Gallery Section */}
      <div className="gallery-section">
        <ParallaxGallery />
      </div>

      {/* Tour Schedule / Applications Section */}
      <div className="applications-section">
        <TourSchedule />
      </div>

      {/* Specs & Contact Form Section */}
      <div className="specs-section">
        <Specs />
      </div>

      {/* Footer Section */}
      <div className="contact-section">
        <Footer />
      </div>
    </main>
  );
}

export default App;
