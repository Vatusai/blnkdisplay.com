import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { specsConfig, specsConfigEs } from '../config';
import { useLang } from '../LangContext';
import { Zap, Sun, RefreshCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  'Pitch': <Zap className="w-8 h-8" />,
  'Brightness': <Sun className="w-8 h-8" />,
  'Refresh': <RefreshCw className="w-8 h-8" />,
  'Brillo': <Sun className="w-8 h-8" />,
  'Refresco': <RefreshCw className="w-8 h-8" />,
};

const Specs = () => {
  const lang = useLang();
  const c = lang === 'es' ? specsConfigEs : specsConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const cards = cardsRef.current;
    if (!section || !content || !cards) return;

    const cardElements = cards.querySelectorAll('.spec-card');

    // Content animation
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: content,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
      },
    });

    contentTl.fromTo(
      content.querySelectorAll('.reveal-text'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, ease: 'power2.out' }
    );

    if (contentTl.scrollTrigger) {
      triggersRef.current.push(contentTl.scrollTrigger);
    }

    // Cards animation
    cardElements.forEach((card, index) => {
      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 55%',
          scrub: 1,
        },
      });

      cardTl.fromTo(
        card,
        { 
          x: 60, 
          opacity: 0,
          rotate: -1,
        },
        { 
          x: 0, 
          opacity: 1,
          rotate: 0,
          ease: 'power2.out',
          delay: index * 0.12,
        }
      );

      if (cardTl.scrollTrigger) {
        triggersRef.current.push(cardTl.scrollTrigger);
      }
    });

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  if (!c.specs.length) return null;

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative min-h-screen w-full bg-[#0B0C0F] py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
        SPECS
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left column - heading */}
          <div ref={contentRef} className="lg:col-span-2">
            <span className="reveal-text block font-body text-xs uppercase tracking-[0.3em] text-pink mb-4">
              {c.sectionLabel}
            </span>
            <h2 className="reveal-text font-display font-black text-3xl md:text-4xl lg:text-5xl text-white leading-[0.95] tracking-tight mb-6">
              {c.headingMain}
            </h2>
            <p className="reveal-text font-body text-base text-white/60 leading-relaxed">
              {c.description}
            </p>
          </div>

          {/* Right column - spec cards */}
          <div ref={cardsRef} className="lg:col-span-3 space-y-4">
            {c.specs.map((spec, index) => (
              <div
                key={index}
                className="spec-card group relative bg-white p-6 md:p-8 flex items-start gap-6 transition-all duration-300 hover:translate-x-2"
                data-cursor-hover
              >
                {/* Magenta left border */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink" />

                {/* Icon */}
                <div className="flex-shrink-0 text-pink transition-transform duration-300 group-hover:scale-110">
                  {iconMap[spec.title] || <Zap className="w-8 h-8" />}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <h3 className="font-display font-bold text-lg text-black uppercase tracking-wide">
                      {spec.title}
                    </h3>
                    <span className="font-display font-black text-2xl md:text-3xl text-pink">
                      {spec.value}
                    </span>
                  </div>
                  <p className="font-body text-sm text-black/60">
                    {spec.description}
                  </p>
                </div>

                {/* Hover glow */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: '0 0 30px color-mix(in srgb, var(--accent) 15%, transparent)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specs;
