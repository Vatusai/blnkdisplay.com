import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import { colorPaletteConfig, colorPaletteConfigEs, type ColorSwatch } from '../config';
import { useLang } from '../LangContext';

gsap.registerPlugin(ScrollTrigger);

const ColorPalette = () => {
  const lang = useLang();
  const c = lang === 'es' ? colorPaletteConfigEs : colorPaletteConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [modalSwatch, setModalSwatch] = useState<ColorSwatch | null>(null);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const triggersRef = useRef<ScrollTrigger[]>([]);
  const particleIdRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const cards = grid.querySelectorAll('.color-card');

    // Grid line draw animation
    const lineTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        toggleActions: 'play none none reverse',
      },
    });

    lineTl.fromTo(
      '.grid-line-h',
      { scaleX: 0 },
      { scaleX: 1, duration: 1, stagger: 0.1, ease: 'expo.out' }
    );

    lineTl.fromTo(
      '.grid-line-v',
      { scaleY: 0 },
      { scaleY: 1, duration: 1, stagger: 0.1, ease: 'expo.out' },
      0
    );

    if (lineTl.scrollTrigger) {
      triggersRef.current.push(lineTl.scrollTrigger);
    }

    // Cards flip in
    const cardsTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    cardsTl.fromTo(
      cards,
      { rotateY: 90, opacity: 0 },
      { rotateY: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'expo.out' }
    );

    if (cardsTl.scrollTrigger) {
      triggersRef.current.push(cardsTl.scrollTrigger);
    }

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalSwatch(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = modalSwatch ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modalSwatch]);

  const handleCardClick = (e: React.MouseEvent, swatch: ColorSwatch, index: number) => {
    setActiveIndex(index);

    // Open modal if image exists
    if (swatch.image) {
      setModalSwatch(swatch);
    }

    // Create particles
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles = Array.from({ length: 12 }, () => ({
      id: particleIdRef.current++,
      x: x + (Math.random() - 0.5) * 100,
      y: y + (Math.random() - 0.5) * 100,
      color: swatch.color,
    }));

    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1000);
  };

  if (c.colors.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="palette"
      className="relative min-h-screen w-full bg-black py-24 overflow-hidden"
    >
      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[33.33, 66.66].map((pos, i) => (
          <div
            key={`h-${i}`}
            className="grid-line-h absolute left-0 right-0 h-px bg-white/10 origin-left"
            style={{ top: `${pos}%` }}
          />
        ))}
        {[25, 50, 75].map((pos, i) => (
          <div
            key={`v-${i}`}
            className="grid-line-v absolute top-0 bottom-0 w-px bg-white/10 origin-top"
            style={{ left: `${pos}%` }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16 text-center">
          {c.sectionLabel && (
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 h-px bg-pink" />
              <span className="font-body text-pink text-sm uppercase tracking-[0.3em]">
                {c.sectionLabel}
              </span>
              <div className="w-12 h-px bg-pink" />
            </div>
          )}
          {(c.headingMain || c.headingAccent) && (
            <h2 className="font-display font-black text-5xl md:text-7xl text-white uppercase tracking-tight">
              {c.headingMain}<span className="text-pink">{c.headingAccent}</span>
            </h2>
          )}
        </div>

        {/* Color grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10"
        >
          {c.colors.map((swatch, index) => (
            <div
              key={swatch.nameSecondary}
              className={`color-card relative bg-black preserve-3d cursor-pointer group overflow-hidden ${
                activeIndex === index ? 'ring-2 ring-pink z-10' : ''
              }`}
              onClick={(e) => handleCardClick(e, swatch, index)}
              data-cursor-hover
            >
              {/* Color block */}
              <div
                className="aspect-square transition-transform duration-500 ease-custom-expo group-hover:scale-110"
                style={{ backgroundColor: swatch.color }}
              />

              {/* Info — always visible */}
              <div className="p-4 text-center bg-black">
                <span className="block font-display font-black text-lg text-white mb-1">
                  {swatch.name}
                </span>
                <span className="block font-body text-pink text-xs uppercase tracking-wider mb-1">
                  {swatch.nameSecondary}
                </span>
                <span className="block font-body text-white/50 text-xs">
                  {swatch.description}
                </span>
              </div>

              {/* Corner accent */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="fixed pointer-events-none z-50 w-4 h-4 rounded-full animate-ping"
            style={{
              left: particle.x,
              top: particle.y,
              backgroundColor: particle.color,
            }}
          />
        ))}

        {/* Bottom text */}
        {c.bottomText && (
          <div className="mt-16 text-center">
            <p className="font-body text-white/40 text-sm uppercase tracking-wider">
              {c.bottomText}
            </p>
          </div>
        )}
      </div>

      {/* Decorative text */}
      {c.decorativeText && (
        <div className="absolute bottom-0 right-0 font-display font-black text-[8rem] md:text-[15rem] text-white/[0.02] leading-none pointer-events-none select-none">
          {c.decorativeText}
        </div>
      )}

      {/* Image Modal */}
      {modalSwatch && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setModalSwatch(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setModalSwatch(null)}
              className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center bg-black/60 hover:bg-black text-white transition-colors rounded-full"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image */}
            <img
              src={modalSwatch.image}
              alt={modalSwatch.name}
              className="w-full h-auto max-h-[80vh] object-contain"
            />

            {/* Caption */}
            <div className="mt-4 text-center">
              <p className="font-display font-black text-2xl text-white uppercase">
                {modalSwatch.name}
              </p>
              <p className="font-body text-pink text-sm mt-1">
                {modalSwatch.nameSecondary}
              </p>
              <p className="font-body text-white/50 text-sm mt-1">
                {modalSwatch.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ColorPalette;
