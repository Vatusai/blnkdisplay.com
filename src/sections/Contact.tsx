import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { contactConfig, contactConfigEs } from '../config';
import { useLang } from '../LangContext';
import { Mail, Phone, MapPin, ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const lang = useLang();
  const c = lang === 'es' ? contactConfigEs : contactConfig;
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    eventType: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const form = formRef.current;
    if (!section || !content || !form) return;

    const formElements = form.querySelectorAll('.form-field');

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

    // Form fields animation
    formElements.forEach((field, index) => {
      const fieldTl = gsap.timeline({
        scrollTrigger: {
          trigger: field,
          start: 'top 90%',
          end: 'top 70%',
          scrub: 1,
        },
      });

      fieldTl.fromTo(
        field,
        { y: 16, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          ease: 'power2.out',
          delay: index * 0.05,
        }
      );

      if (fieldTl.scrollTrigger) {
        triggersRef.current.push(fieldTl.scrollTrigger);
      }
    });

    return () => {
      triggersRef.current.forEach(trigger => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    try {
      const response = await fetch(c.scriptUrl, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      const result = await response.json() as { result: string };

      if (result.result === 'success') {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setFormData({ name: '', email: '', company: '', eventType: '', message: '' });
        }, 4000);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen w-full bg-[#0B0C0F] py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-display font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
        CONTACT
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - info */}
          <div ref={contentRef}>
            <span className="reveal-text block font-body text-xs uppercase tracking-[0.3em] text-pink mb-4">
              {c.sectionLabel}
            </span>
            <h2 className="reveal-text font-display font-black text-3xl md:text-5xl lg:text-6xl text-white leading-[0.95] tracking-tight mb-6">
              {c.headingMain}
            </h2>
            <p className="reveal-text font-body text-base md:text-lg text-white/60 leading-relaxed mb-12 max-w-md">
              {c.description}
            </p>

            {/* Contact info */}
            <div className="space-y-6">
              <div className="reveal-text flex items-center gap-4 group" data-cursor-hover>
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center transition-colors duration-300 group-hover:border-pink group-hover:bg-pink/10">
                  <Mail className="w-5 h-5 text-pink" />
                </div>
                <div>
                  <span className="block font-body text-xs uppercase tracking-wider text-white/40 mb-1">{c.contactLabels.email}</span>
                  <span className="font-body text-white group-hover:text-pink transition-colors duration-300">
                    {c.email}
                  </span>
                </div>
              </div>

              <div className="reveal-text flex items-center gap-4 group" data-cursor-hover>
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center transition-colors duration-300 group-hover:border-pink group-hover:bg-pink/10">
                  <Phone className="w-5 h-5 text-pink" />
                </div>
                <div>
                  <span className="block font-body text-xs uppercase tracking-wider text-white/40 mb-1">{c.contactLabels.phone}</span>
                  <span className="font-body text-white group-hover:text-pink transition-colors duration-300">
                    {c.phone}
                  </span>
                </div>
              </div>

              <div className="reveal-text flex items-center gap-4 group" data-cursor-hover>
                <div className="w-12 h-12 border border-white/20 flex items-center justify-center transition-colors duration-300 group-hover:border-pink group-hover:bg-pink/10">
                  <MapPin className="w-5 h-5 text-pink" />
                </div>
                <div>
                  <span className="block font-body text-xs uppercase tracking-wider text-white/40 mb-1">{c.contactLabels.location}</span>
                  <span className="font-body text-white group-hover:text-pink transition-colors duration-300">
                    {c.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Secondary CTA */}
            <div className="reveal-text mt-12">
              <button 
                className="group flex items-center gap-3 text-white/60 hover:text-pink transition-colors duration-300"
                data-cursor-hover
              >
                <Download className="w-5 h-5" />
                <span className="font-body text-sm uppercase tracking-wider">
                  {c.ctaSecondary}
                </span>
              </button>
            </div>
          </div>

          {/* Right column - form */}
          <div className="relative">
            {submitted ? (
              <div className="absolute inset-0 flex items-center justify-center bg-pink/10 border border-pink">
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink flex items-center justify-center mx-auto mb-6">
                    <ArrowRight className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-2">{c.successTitle}</h3>
                  <p className="font-body text-white/60">{c.successMessage}</p>
                </div>
              </div>
            ) : null}

            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className={`space-y-6 ${submitted ? 'opacity-0 pointer-events-none' : ''}`}
            >
              <div className="form-field">
                <label className="block font-body text-xs uppercase tracking-wider text-white/40 mb-2">
                  {c.formLabels.name}
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-white/20 text-white placeholder:text-white/30 focus:border-pink focus:ring-pink/20 rounded-none h-12"
                  placeholder={c.formPlaceholders.name}
                />
              </div>

              <div className="form-field">
                <label className="block font-body text-xs uppercase tracking-wider text-white/40 mb-2">
                  {c.formLabels.email}
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-white/20 text-white placeholder:text-white/30 focus:border-pink focus:ring-pink/20 rounded-none h-12"
                  placeholder={c.formPlaceholders.email}
                />
              </div>

              <div className="form-field">
                <label className="block font-body text-xs uppercase tracking-wider text-white/40 mb-2">
                  {c.formLabels.company}
                </label>
                <Input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-transparent border-white/20 text-white placeholder:text-white/30 focus:border-pink focus:ring-pink/20 rounded-none h-12"
                  placeholder={c.formPlaceholders.company}
                />
              </div>

              <div className="form-field">
                <label className="block font-body text-xs uppercase tracking-wider text-white/40 mb-2">
                  {c.formLabels.eventType}
                </label>
                <Input
                  type="text"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full bg-transparent border-white/20 text-white placeholder:text-white/30 focus:border-pink focus:ring-pink/20 rounded-none h-12"
                  placeholder={c.formPlaceholders.eventType}
                />
              </div>

              <div className="form-field">
                <label className="block font-body text-xs uppercase tracking-wider text-white/40 mb-2">
                  {c.formLabels.message}
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-transparent border-white/20 text-white placeholder:text-white/30 focus:border-pink focus:ring-pink/20 rounded-none resize-none"
                  placeholder={c.formPlaceholders.message}
                />
              </div>

              <div className="form-field pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-pink text-black font-display font-bold text-sm uppercase tracking-wider h-14 hover:bg-pink-light transition-colors duration-300 rounded-none disabled:opacity-60 disabled:cursor-not-allowed"
                  data-cursor-hover
                >
                  {isSubmitting ? c.sendingText : c.ctaText}
                  {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>

                {error && (
                  <p className="font-body text-sm text-red-400 text-center mt-4">
                    {c.errorMessage}{' '}
                    <a
                      href={`mailto:${c.email}`}
                      className="underline hover:text-red-300 transition-colors"
                    >
                      {c.email}
                    </a>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
