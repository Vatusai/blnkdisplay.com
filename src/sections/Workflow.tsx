import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { workflowConfig, workflowConfigEs } from '../config';
import { useLang } from '../LangContext';

gsap.registerPlugin(ScrollTrigger);

const Workflow = () => {
  const lang = useLang();
  const c = lang === 'es' ? workflowConfigEs : workflowConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const steps = stepsRef.current;
    if (!section || !heading || !steps) return;

    const stepElements = steps.querySelectorAll('.workflow-step');

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
      heading.querySelector('h2'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, ease: 'power2.out' }
    );

    if (headingTl.scrollTrigger) {
      triggersRef.current.push(headingTl.scrollTrigger);
    }

    // Steps animation
    stepElements.forEach((step, index) => {
      const stepTl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
          end: 'top 55%',
          scrub: 1,
        },
      });

      stepTl.fromTo(
        step,
        { 
          y: 60, 
          opacity: 0,
          rotate: -0.5,
        },
        { 
          y: 0, 
          opacity: 1,
          rotate: 0,
          ease: 'power2.out',
          delay: index * 0.1,
        }
      );

      if (stepTl.scrollTrigger) {
        triggersRef.current.push(stepTl.scrollTrigger);
      }
    });

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  if (!c.steps.length) return null;

  return (
    <section
      ref={sectionRef}
      id="support"
      className="relative min-h-screen w-full bg-[#0B0C0F] py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
        PROCESS
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div ref={headingRef} className="mb-16 md:mb-24">
          <span className="block font-body text-xs uppercase tracking-[0.3em] text-pink mb-4">
            {c.sectionLabel}
          </span>
          <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-white leading-[0.95] tracking-tight">
            {c.headingMain}
          </h2>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="space-y-6">
          {c.steps.map((step, index) => (
            <div
              key={index}
              className="workflow-step group relative bg-white p-8 md:p-12 transition-all duration-300 hover:translate-x-2"
              data-cursor-hover
            >
              {/* Magenta left border */}
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-pink" />

              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                {/* Step number */}
                <div className="flex-shrink-0">
                  <span className="font-display font-black text-5xl md:text-7xl text-pink/20 group-hover:text-pink/40 transition-colors duration-300">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-display font-bold text-2xl md:text-3xl text-black mb-3 uppercase tracking-wide">
                    {step.title}
                  </h3>
                  <p className="font-body text-base md:text-lg text-black/60 max-w-2xl leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_40px_rgba(255,45,143,0.1)]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
