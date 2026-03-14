import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import { heroConfig, heroConfigEs } from '../config';
import { useLang } from '../LangContext';
import { useIsMobile } from '../hooks/useIsMobile';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const lang = useLang();
  const c = lang === 'es' ? heroConfigEs : heroConfig;
  const isMobile = useIsMobile();
  const bgImage = isMobile && c.backgroundImageMobile ? c.backgroundImageMobile : c.backgroundImage;
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [overlayMounted, setOverlayMounted] = useState(true);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const title = titleRef.current;
    if (!section || !grid || !title) return;

    // Set loaded state for initial animations
    const loadTimer = setTimeout(() => setIsLoaded(true), 100);

    // Get all grid cells
    const cells = grid.querySelectorAll('.grid-cell');
    const titleBlocks = title.querySelectorAll('.title-block');

    // Initial entrance animation — tears down 3D context on complete to eliminate
    // the GPU compositing layer boundary that leaves a 1px seam at the grid edges
    const tl = gsap.timeline({
      delay: 0.3,
      onComplete: () => {
        // Remove perspective/preserve-3d: cells are now at rotateX:0 (flat),
        // so 3D context is no longer needed. Removing it collapses the GPU
        // compositing layer and eliminates the compositing boundary seam.
        if (grid) {
          grid.style.perspective = '';
          grid.style.transformStyle = '';
        }
        // Clear GSAP inline transforms/opacity from cells — leaves them as
        // ordinary absolute divs with no GPU layer promotion.
        gsap.set(cells, { clearProps: 'transform,opacity' });
      },
    });

    // Grid cells flip in with stagger
    tl.fromTo(
      cells,
      {
        rotateX: 90,
        y: -100,
        opacity: 0,
      },
      {
        rotateX: 0,
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: {
          each: 0.05,
          from: 'random',
        },
        ease: 'expo.out',
      }
    );

    // Title blocks decode animation
    tl.fromTo(
      titleBlocks,
      {
        scale: 0,
        rotate: 180,
        opacity: 0,
      },
      {
        scale: 1,
        rotate: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      },
      '-=0.5'
    );

    // Scroll-based parallax
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    scrollTl.to(grid, {
      y: 150,
      ease: 'none',
    });

    scrollTl.to(
      title,
      {
        x: -200,
        ease: 'none',
      },
      0
    );

    if (scrollTl.scrollTrigger) {
      triggersRef.current.push(scrollTl.scrollTrigger);
    }

    return () => {
      clearTimeout(loadTimer);
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  if (!c.titleLine1 && !c.titleLine2) return null;

  const rows = c.gridRows || 6;
  const cols = c.gridCols || 8;

  // Generate grid cells
  const generateGridCells = () => {
    const cells = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isPink = c.pinkCells.some((p) => p.row === row && p.col === col);
        const cellIndex = row * cols + col;

        cells.push(
          <div
            key={cellIndex}
            className={`grid-cell absolute transition-transform duration-300 hover:scale-105 hover:z-10 ${
              isPink ? 'bg-pink' : ''
            }`}
            style={{
              left: `${(col / cols) * 100}%`,
              top: `${(row / rows) * 100}%`,
              // +1px only on non-edge cells: bridges the subpixel gap to the
              // right/bottom neighbour. Edge cells have no neighbour so no
              // bleed — prevents the overflow-hidden hard-clip boundary artifact.
              width: col < cols - 1 ? `calc(${100 / cols}% + 1px)` : `${100 / cols}%`,
              height: row < rows - 1 ? `calc(${100 / rows}% + 1px)` : `${100 / rows}%`,
              backgroundImage: isPink ? 'none' : bgImage ? `url(${bgImage})` : 'none',
              backgroundPosition: `${(col / (cols - 1)) * 100}% ${(row / (rows - 1)) * 100}%`,
              backgroundSize: `${cols * 100}% ${rows * 100}%`,
              backgroundRepeat: 'no-repeat',
              transformOrigin: 'center center',
            }}
            data-cursor-hover
          />
        );
      }
    }
    return cells;
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-black overflow-hidden"
    >
      {/* Grid container — perspective + preserve-3d kept here only, not on individual cells */}
      <div
        ref={gridRef}
        className="absolute inset-0"
        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      >
        {generateGridCells()}
      </div>

      {/* Title overlay */}
      <div
        ref={titleRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
      >
        <div className="relative w-full max-w-6xl px-6">
          {/* Title Line 1 */}
          {c.titleLine1 && (
            <div className="flex justify-start mb-4">
              <div className="title-block bg-pink px-8 py-4 pointer-events-auto hover:scale-110 transition-transform duration-300">
                <span className="font-display font-black text-6xl md:text-8xl lg:text-9xl text-black tracking-tighter">
                  {c.titleLine1}
                </span>
              </div>
            </div>
          )}

          {/* Title Line 2 */}
          {c.titleLine2 && (
            <div className="flex justify-end">
              <div className="title-block bg-pink px-8 py-4 pointer-events-auto hover:scale-110 transition-transform duration-300">
                <span className="font-display font-black text-6xl md:text-8xl lg:text-9xl text-black tracking-tighter">
                  {c.titleLine2}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Subtitle */}
      {c.subtitle && (
        <div className="absolute bottom-32 left-0 right-0 text-center z-20">
          <p className="font-body text-white/60 text-sm md:text-base uppercase tracking-[0.3em]">
            {c.subtitle}
          </p>
        </div>
      )}

      {/* CTA Button */}
      {c.ctaText && (
        <div className="absolute bottom-16 left-0 right-0 flex justify-center z-20">
          <a
            href={c.ctaHref || '#products'}
            className="group flex items-center gap-3 px-8 py-4 border-2 border-pink text-pink font-display font-bold text-sm uppercase tracking-wider hover:bg-pink hover:text-black transition-all duration-300"
            data-cursor-hover
          >
            {c.ctaText}
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
          </a>
        </div>
      )}

      {/* Corner decorations */}
      <div className="absolute top-24 left-6 w-16 h-16 border-l-2 border-t-2 border-pink/30 z-20" />
      <div className="absolute bottom-24 right-6 w-16 h-16 border-r-2 border-b-2 border-pink/30 z-20" />

      {/* Loading overlay — unmounted from DOM after fade so it leaves no compositing layer */}
      {overlayMounted && (
        <div
          className={`absolute inset-0 bg-black z-50 transition-opacity duration-700 pointer-events-none ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          onTransitionEnd={() => { if (isLoaded) setOverlayMounted(false); }}
        />
      )}
    </section>
  );
};

export default Hero;
