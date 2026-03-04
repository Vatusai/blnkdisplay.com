import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { Send, Check, Zap, Maximize, RefreshCw, Layers, Weight, Wrench } from 'lucide-react';
import { footerConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const Specs = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventDate: '',
    venue: '',
    message: '',
  });

  const SPECS_DATA = [
    { icon: Maximize, label: t('specs.specs.0.label'), value: '2.9mm / 3.9mm', desc: t('specs.specs.0.desc') },
    { icon: Zap, label: t('specs.specs.1.label'), value: '4500 nits', desc: t('specs.specs.1.desc') },
    { icon: RefreshCw, label: t('specs.specs.2.label'), value: '7680Hz', desc: t('specs.specs.2.desc') },
    { icon: Layers, label: t('specs.specs.3.label'), value: '±10°', desc: t('specs.specs.3.desc') },
    { icon: Weight, label: t('specs.specs.4.label'), value: '8.2 kg', desc: t('specs.specs.4.desc') },
    { icon: Wrench, label: t('specs.specs.5.label'), value: t('specs.specs.5.value'), desc: t('specs.specs.5.desc') },
  ];



  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
          },
        }
      );

      // Specs grid animation
      gsap.fromTo(
        specsRef.current?.querySelectorAll('.spec-card') || [],
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: specsRef.current,
            start: 'top 80%',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full bg-[#07070A] py-24 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070A] via-[#0E1016] to-[#07070A]" />

      {/* Specs Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Headline */}
          <div ref={headlineRef}>
            <p className="font-mono-custom text-xs text-[#00F0FF]/60 uppercase tracking-wider mb-4">
              {t('specs.sectionLabel')}
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6 whitespace-pre-line">
              {t('specs.headline')}
            </h2>
            <p className="text-[#A7B0C8] text-lg leading-relaxed max-w-md">
              {t('specs.description')}
            </p>
          </div>

          {/* Right: Specs Grid */}
          <div ref={specsRef} className="grid grid-cols-2 gap-4">
            {SPECS_DATA.map((spec, index) => {
              const IconComponent = spec.icon;
              return (
                <div
                  key={index}
                  className="spec-card group p-5 rounded-xl bg-white/5 border border-white/10 hover:border-[#00F0FF]/30 transition-all duration-300 hover:bg-white/8"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center group-hover:bg-[#00F0FF]/20 transition-colors">
                      <IconComponent className="w-4 h-4 text-[#00F0FF]" />
                    </div>
                    <span className="font-mono-custom text-xs text-[#A7B0C8] uppercase tracking-wider">
                      {spec.label}
                    </span>
                  </div>
                  <p className="font-display text-2xl text-white mb-1">{spec.value}</p>
                  <p className="text-xs text-[#A7B0C8]/70">{spec.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Contact Info */}
          <div>
            <p className="font-mono-custom text-xs text-[#00F0FF]/60 uppercase tracking-wider mb-4">
              {t('specs.contactSectionLabel')}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-6 whitespace-pre-line">
              {t('specs.contactHeadline')}
            </h2>
            <p className="text-[#A7B0C8] text-lg leading-relaxed mb-10 max-w-md">
              {t('specs.contactDescription')}
            </p>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#00F0FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-[#A7B0C8] mb-1">{t('specs.contactLabels.email')}</p>
                  <a href={`mailto:${footerConfig.email}`} className="text-white hover:text-[#00F0FF] transition-colors">
                    {footerConfig.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#00F0FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-[#A7B0C8] mb-1">{t('specs.contactLabels.phone')}</p>
                  <span className="text-white">{footerConfig.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#00F0FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-[#A7B0C8] mb-1">{t('specs.contactLabels.address')}</p>
                  <span className="text-white">{footerConfig.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div ref={formRef} className="led-module p-8">
            {formSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#00F0FF]/20 flex items-center justify-center mb-6">
                  <Check className="w-8 h-8 text-[#00F0FF]" />
                </div>
                <h3 className="font-display text-2xl text-white mb-2">{t('specs.form.successTitle')}</h3>
                <p className="text-[#A7B0C8]">{t('specs.form.successMessage')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-[#A7B0C8] mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#A7B0C8] mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-[#A7B0C8] mb-2">Event Date</label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#A7B0C8] mb-2">Venue City</label>
                    <input
                      type="text"
                      name="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      placeholder="City, State"
                      className="form-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#A7B0C8] mb-2">{t('specs.form.message')}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('specs.form.messagePlaceholder')}
                    rows={4}
                    className="form-input resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <span>{t('specs.form.submit')}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent" />
    </section>
  );
};

export default Specs;
