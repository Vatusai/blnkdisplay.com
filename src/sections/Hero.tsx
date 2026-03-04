import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { Play, Music, Disc, Calendar, ChevronDown } from 'lucide-react';
import LanguageToggle from '../components/LanguageToggle';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  disc: Disc,
  play: Play,
  calendar: Calendar,
  music: Music,
};

const NAV_ITEMS = [
  { key: 'technology', icon: 'disc' as const },
  { key: 'gallery', icon: 'play' as const },
  { key: 'applications', icon: 'calendar' as const },
  { key: 'contact', icon: 'music' as const },
];

const Hero = () => {
  const { t, i18n } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const moduleRef = useRef<HTMLDivElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const TARGET_TEXT = t('hero.decodeText');
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  const [displayText, setDisplayText] = useState(' '.repeat(TARGET_TEXT.length));
  const [isDecoding, setIsDecoding] = useState(true);
  
  // Update display text when language changes
  useEffect(() => {
    setDisplayText(' '.repeat(TARGET_TEXT.length));
    setIsDecoding(true);
  }, [i18n.language, TARGET_TEXT]);

  // Decode text effect
  useEffect(() => {
    let iteration = 0;
    const maxIterations = TARGET_TEXT.length * 8;

    const interval = setInterval(() => {
      setDisplayText(() => {
        return TARGET_TEXT.split('')
          .map((_, index) => {
            if (index < iteration / 8) {
              return TARGET_TEXT[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });

      iteration += 1;

      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(TARGET_TEXT);
        setIsDecoding(false);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // GSAP animations - solo animaciones de entrada, sin scroll-driven exit
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Nav slide in
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );

      // LED Module entrance
      gsap.fromTo(
        moduleRef.current,
        { scale: 0.82, opacity: 0, y: '6vh' },
        { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.2 }
      );

      // Glint line entrance
      gsap.fromTo(
        glintRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.7, ease: 'power2.out', delay: 0.5 }
      );

      // Subtitle fade in
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.2 }
      );

      // CTA buttons fade in
      gsap.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 1.4 }
      );

      // NOTA: Eliminado el ScrollTrigger con pin y exit animation
      // El Hero ahora es una sección estática que se scrollea naturalmente

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-[#07070A]"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/hero-glow.jpg)` }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07070A]/50 to-[#07070A]" />
        {/* Vignette */}
        <div className="vignette" />
      </div>

      {/* Navigation pill */}
      <nav
        ref={navRef}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 nav-pill rounded-full px-2 py-2"
      >
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const IconComponent = ICON_MAP[item.icon];
            const sectionId = item.key === 'technology' ? 'technology' : 
                            item.key === 'gallery' ? 'gallery' : 
                            item.key === 'applications' ? 'tour' : 'footer';
            return (
              <button
                key={item.key}
                onClick={() => scrollToSection(sectionId)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-mono-custom uppercase tracking-wider text-white/80 hover:text-[#00F0FF] transition-colors rounded-full hover:bg-white/5"
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{t(`nav.${item.key}`)}</span>
              </button>
            );
          })}
          <div className="w-px h-4 bg-white/20 mx-1" />
          <LanguageToggle />
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        {/* Logo / Brand */}
        <div className="absolute top-8 left-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#00F0FF]/20 flex items-center justify-center">
              <Disc className="w-4 h-4 text-[#00F0FF]" />
            </div>
            <span className="font-display text-lg text-white">{t('hero.brandName')}</span>
          </div>
        </div>

        {/* LED Module */}
        <div
          ref={moduleRef}
          className="relative w-[62vw] h-[38vh] md:w-[50vw] md:h-[32vh] led-module mb-8"
        >
          {/* Grid dots background */}
          <div className="absolute inset-4 grid-dots rounded-[18px] opacity-50" />
          
          {/* Glint line */}
          <div
            ref={glintRef}
            className="absolute left-1/2 top-0 glint-line origin-center"
            style={{ transform: 'translateX(-50%)' }}
          />

          {/* Module content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="font-mono-custom text-xs text-[#00F0FF]/60 uppercase tracking-wider mb-2">
                {t('hero.systemLabel')}
              </p>
              <div className="w-16 h-16 mx-auto rounded-full bg-[#00F0FF]/10 flex items-center justify-center glow-cyan">
                <Zap className="w-8 h-8 text-[#00F0FF]" />
              </div>
            </div>
          </div>
        </div>

        {/* Main title with decode effect */}
        <h1
          ref={titleRef}
          className="decode-text text-[10vw] md:text-[8vw] lg:text-[6vw] font-bold text-white leading-none tracking-tighter mb-4 text-center"
        >
          <span className={`${isDecoding ? 'text-glow-cyan' : ''} transition-all duration-300`}>
            {displayText}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-mono-custom text-sm md:text-base text-[#A7B0C8] uppercase tracking-[0.3em] mb-10 text-center"
        >
          {t('hero.subtitle')}
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => scrollToSection('footer')}
            className="btn-primary"
          >
            {t('hero.ctaPrimary')}
          </button>
          <button
            onClick={() => scrollToSection('gallery')}
            className="btn-secondary"
          >
            {t('hero.ctaSecondary')}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="font-mono-custom text-xs uppercase tracking-wider">{t('hero.scroll')}</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />

      {/* Corner accents */}
      <div className="absolute top-8 right-8 text-right">
        <p className="font-mono-custom text-xs text-white/40 uppercase tracking-wider">{t('hero.cornerLabel')}</p>
        <p className="font-mono-custom text-xs text-[#00F0FF]/60">{t('hero.cornerDetail')}</p>
      </div>

      {/* Corner lines */}
      <div className="absolute top-8 left-8 w-20 h-px bg-gradient-to-r from-[#00F0FF]/50 to-transparent" />
      <div className="absolute top-8 left-8 w-px h-20 bg-gradient-to-b from-[#00F0FF]/50 to-transparent" />
      <div className="absolute bottom-8 right-8 w-20 h-px bg-gradient-to-l from-[#00F0FF]/30 to-transparent" />
      <div className="absolute bottom-8 right-8 w-px h-20 bg-gradient-to-t from-[#00F0FF]/30 to-transparent" />
    </section>
  );
};

// Zap icon component
const Zap = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export default Hero;
