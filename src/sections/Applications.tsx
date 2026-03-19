import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { applicationsConfig, applicationsConfigEs } from '../config';
import { useLang } from '../LangContext';


gsap.registerPlugin(ScrollTrigger);

const Applications = () => {
  const lang = useLang();
  const c = lang === 'es' ? applicationsConfigEs : applicationsConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;
    if (!section || !heading || !cards) return;

    const cardElements = cards.querySelectorAll('.app-card');

    // Heading animation
    const headingTl = gsap.timeline({
      scrollTrigger: {
        trigger: heading,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
      },
    });

    headingTl.fromTo(
      heading.querySelectorAll('.reveal-text'),
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, ease: 'power2.out' }
    );

    if (headingTl.scrollTrigger) {
      triggersRef.current.push(headingTl.scrollTrigger);
    }

    // Cards animation
    cardElements.forEach((card, index) => {
      const cardTl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 50%',
          scrub: 1,
        },
      });

      cardTl.fromTo(
        card,
        { 
          y: 80, 
          opacity: 0,
          rotateX: -10,
        },
        { 
          y: 0, 
          opacity: 1,
          rotateX: 0,
          ease: 'power2.out',
          delay: index * 0.1,
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

  if (!c.applications.length) return null;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen w-full bg-[#0B0C0F] py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
        {c.decorativeText || 'PROJECTS'}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headingRef} className="mb-16 md:mb-24">
          <span className="reveal-text block font-body text-xs uppercase tracking-[0.3em] text-pink mb-4">
            {c.sectionLabel}
          </span>
          <h2 className="reveal-text font-display font-black text-4xl md:text-6xl lg:text-7xl text-white leading-[0.95] tracking-tight">
            {c.headingMain}
            <span className="text-pink"> {c.headingAccent}</span>
          </h2>
        </div>

        {/* Applications grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {c.applications.map((app, index) => (
            <div
              key={index}
              className="app-card group relative aspect-[4/3] overflow-hidden cursor-pointer perspective-1000"
              data-cursor-hover
            >
              {/* Image */}
              <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                <img
                  src={app.image}
                  alt={app.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <div className="transform transition-transform duration-500 ease-out group-hover:translate-y-[-8px]">
                  <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-2">
                    {app.title}
                  </h3>
                  <p className="font-body text-sm text-white/70 max-w-md">
                    {app.description}
                  </p>
                </div>
              </div>

              {/* Border glow on hover */}
              <div className="absolute inset-0 border border-white/10 transition-colors duration-300 group-hover:border-pink/50" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Applications;
