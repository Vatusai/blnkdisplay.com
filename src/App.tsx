import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './sections/Hero';
import ProductShowcase from './sections/ProductShowcase';
import ColorPalette from './sections/ColorPalette';
import Finale from './sections/Finale';
import Applications from './sections/Applications';
import Specs from './sections/Specs';
import Workflow from './sections/Workflow';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import WhatsAppButton from './components/WhatsAppButton';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Velocity-based skew effect
    let currentSkew = 0;
    let targetSkew = 0;
    
    const updateSkew = () => {
      currentSkew += (targetSkew - currentSkew) * 0.1;
      if (mainRef.current) {
        mainRef.current.style.transform = `skewY(${currentSkew}deg)`;
      }
      requestAnimationFrame(updateSkew);
    };
    
    const handleScroll = () => {
      const scrollSpeed = Math.abs(window.scrollY - (window as any).lastScrollY || 0);
      targetSkew = Math.min(scrollSpeed * 0.02, 3);
      (window as any).lastScrollY = window.scrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    updateSkew();
    
    // Reset skew when scroll stops
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const resetSkew = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        targetSkew = 0;
      }, 100);
    };
    window.addEventListener('scroll', resetSkew, { passive: true });
    
    // Initialize ScrollTrigger refresh after all content loads
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', resetSkew);
      clearTimeout(scrollTimeout);
      clearTimeout(refreshTimeout);
    };
  }, []);

  return (
    <div className="relative bg-black min-h-screen overflow-x-hidden">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Custom cursor */}
      <CustomCursor />

      {/* WhatsApp floating button */}
      <WhatsAppButton />

      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main ref={mainRef} className="relative transition-transform duration-100 ease-out will-change-transform">
        <Hero />
        <ProductShowcase />
        <ColorPalette />
        <Finale />
        <Applications />
        <Specs />
        <Workflow />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
