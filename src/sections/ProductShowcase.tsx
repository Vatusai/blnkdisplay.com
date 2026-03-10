import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { productShowcaseConfig, productShowcaseConfigEs } from '../config';
import { useLang } from '../LangContext';

gsap.registerPlugin(ScrollTrigger);

const ProductShowcase = () => {
  const lang = useLang();
  const c = lang === 'es' ? productShowcaseConfigEs : productShowcaseConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const product = productRef.current;
    const content = contentRef.current;
    if (!section || !product || !content) return;

    // Product entrance animation
    const productTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 60%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    });

    productTl.fromTo(
      product,
      {
        rotateY: 90,
        opacity: 0,
        scale: 0.8,
      },
      {
        rotateY: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'expo.out',
      }
    );

    if (productTl.scrollTrigger) {
      triggersRef.current.push(productTl.scrollTrigger);
    }

    // Content entrance
    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 50%',
        toggleActions: 'play none none reverse',
      },
    });

    contentTl.fromTo(
      content.children,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'expo.out',
      }
    );

    if (contentTl.scrollTrigger) {
      triggersRef.current.push(contentTl.scrollTrigger);
    }

    // Floating animation for product
    gsap.to(product, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const rotateY = ((mouseX - centerX) / centerX) * 15;
      const rotateX = ((centerY - mouseY) / centerY) * 15;

      gsap.to(product, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(product, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  if (!c.productName && !c.headingMain) return null;

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative min-h-screen w-full bg-black py-24 overflow-hidden perspective-1000"
    >
      {/* Background grid lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-pink" />
        <div className="absolute left-2/4 top-0 bottom-0 w-px bg-pink" />
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-pink" />
        <div className="absolute top-1/3 left-0 right-0 h-px bg-pink" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-pink" />
      </div>

      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          {c.sectionLabel && (
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-px bg-pink" />
              <span className="font-body text-pink text-sm uppercase tracking-[0.3em]">
                {c.sectionLabel}
              </span>
            </div>
          )}
          {(c.headingMain || c.headingAccent) && (
            <h2 className="font-display font-black text-5xl md:text-7xl text-white uppercase tracking-tight">
              {c.headingMain}<span className="text-pink">{c.headingAccent}</span>
            </h2>
          )}
        </div>

        {/* Product display */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Product image */}
          <div className="relative flex items-center justify-center">
            {/* Glow effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 md:w-96 md:h-96 bg-pink/20 rounded-full blur-3xl animate-pulse-pink" />
            </div>

            {/* Product */}
            <div
              ref={productRef}
              className="relative preserve-3d"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {c.productImage && (
                <img
                  src={c.productImage}
                  alt={c.productImageAlt}
                  className="w-64 md:w-80 lg:w-96 h-auto object-contain drop-shadow-2xl"
                />
              )}

              {/* Floating particles */}
              <div className="absolute -top-8 -right-8 text-pink animate-float">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 text-pink animate-float" style={{ animationDelay: '1s' }}>
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            {/* Price tag */}
            {c.price && (
              <div className="absolute top-0 right-0 lg:right-12 bg-pink text-black px-6 py-3 font-display font-black text-2xl">
                {c.price}
              </div>
            )}
          </div>

          {/* Product info */}
          <div ref={contentRef} className="space-y-8">
            <div>
              {c.productName && (
                <h3 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
                  {c.productName}
                </h3>
              )}
              {c.description && (
                <p className="font-body text-white/60 text-lg leading-relaxed">
                  {c.description}
                </p>
              )}
            </div>

            {/* Features */}
            {c.features.length > 0 && (
              <div className="grid grid-cols-2 gap-6">
                {c.features.map((feature, index) => (
                  <div key={index} className="border border-white/10 p-6 hover:border-pink transition-colors duration-300">
                    <div className="text-pink font-display font-black text-3xl mb-2">{feature.value}</div>
                    <div className="font-body text-white/40 text-sm uppercase tracking-wider">
                      {feature.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Color swatches */}
            {c.colorSwatches.length > 0 && (
              <div>
                {c.colorSwatchesLabel && (
                  <p className="font-body text-white/40 text-sm uppercase tracking-wider mb-4">
                    {c.colorSwatchesLabel}
                  </p>
                )}
                <div className="flex gap-3">
                  {c.colorSwatches.map((color, index) => (
                    <button
                      key={index}
                      className="w-12 h-12 rounded-full border-2 border-transparent hover:border-white transition-all duration-300 hover:scale-110"
                      style={{ backgroundColor: color }}
                      data-cursor-hover
                    />
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            {c.ctaText && (
              <button
                className="group flex items-center gap-4 px-8 py-4 bg-pink text-black font-display font-bold text-sm uppercase tracking-wider hover:bg-white transition-all duration-300"
                data-cursor-hover
              >
                <ShoppingBag className="w-5 h-5" />
                {c.ctaText}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      {c.decorativeText && (
        <div className="absolute bottom-12 left-6 font-display font-black text-[12rem] text-white/[0.02] leading-none pointer-events-none select-none">
          {c.decorativeText}
        </div>
      )}
    </section>
  );
};

export default ProductShowcase;
