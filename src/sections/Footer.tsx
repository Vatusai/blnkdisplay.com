import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { Instagram, Twitter, Youtube, Linkedin, Mail, Phone, MapPin, ExternalLink, Disc } from 'lucide-react';
import { footerConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_ICON_MAP = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  music: Linkedin,
};

const Footer = () => {
  const { t } = useTranslation();
  
  // Null check: if config is empty, do not render
  if (!footerConfig.brandName && !footerConfig.heroTitle && footerConfig.socialLinks.length === 0) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax title effect
      if (titleRef.current && portraitRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            if (titleRef.current) {
              // Title moves faster than portrait
              gsap.set(titleRef.current, {
                y: -self.progress * 100,
              });
            }
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleContactClick = () => {
    if (footerConfig.subscribeAlertMessage) {
      alert(t('footer.subscribeAlertMessage'));
    }
  };

  return (
    <section
      id="footer"
      ref={sectionRef}
      className="relative w-full bg-[#07070A] overflow-hidden"
    >
      {/* Artist portrait section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background portrait */}
        <div
          ref={portraitRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-full max-w-2xl aspect-[2/3] mx-auto">
            <img
              src={footerConfig.portraitImage}
              alt={footerConfig.portraitAlt}
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07070A] via-[#07070A]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#07070A] via-transparent to-transparent opacity-50" />
          </div>
        </div>

        {/* Parallax title overlay */}
        <div
          ref={titleRef}
          className="relative z-10 text-center will-change-transform px-4"
        >
          <h2 className="font-display text-[12vw] md:text-[10vw] text-white leading-none tracking-tighter">
            {t('footer.heroTitle')}
          </h2>
          <p className="font-mono-custom text-lg text-[#A7B0C8] uppercase tracking-[0.5em] mt-4">
            {t('footer.heroSubtitle')}
          </p>
        </div>

        {/* Artist name */}
        <div className="absolute bottom-20 left-12 z-20">
          <p className="font-mono-custom text-xs text-white/40 uppercase tracking-wider mb-2">
            {t('footer.artistLabel')}
          </p>
          <h3 className="font-display text-4xl text-white">{t('footer.artistName')}</h3>
          <p className="font-mono-custom text-sm text-[#00F0FF]/60">{t('footer.artistSubtitle')}</p>
        </div>
      </div>

      {/* Footer content */}
      <div className="relative bg-[#07070A] py-20 px-6 md:px-12">
        {/* Top divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent" />

        <div className="max-w-7xl mx-auto">
          {/* Footer grid - Main content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#00F0FF]/20 flex items-center justify-center">
                  <Disc className="w-5 h-5 text-[#00F0FF]" />
                </div>
                <span className="font-display text-2xl text-white">{footerConfig.brandName}</span>
              </div>
              <p className="text-sm text-[#A7B0C8] leading-relaxed mb-6">
                {footerConfig.brandDescription}
              </p>
              {/* Social links */}
              <div className="flex gap-4">
                {footerConfig.socialLinks.map((social) => {
                  const IconComponent = SOCIAL_ICON_MAP[social.icon];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-[#00F0FF] hover:border-[#00F0FF]/50 transition-colors"
                      aria-label={social.label}
                    >
                      <IconComponent className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-sm uppercase tracking-wider text-white mb-6">
                {t('footer.quickLinksTitle')}
              </h4>
              <ul className="space-y-3">
                {(t('footer.quickLinks', { returnObjects: true }) as string[]).map((link: string, index: number) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-sm text-[#A7B0C8] hover:text-[#00F0FF] transition-colors flex items-center gap-2 group"
                    >
                      <span>{link}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-sm uppercase tracking-wider text-white mb-6">
                {t('footer.contactTitle')}
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#00F0FF]/60 mt-0.5" />
                  <div>
                    <p className="text-sm text-[#A7B0C8]">{t('footer.emailLabel')}</p>
                    <a href={`mailto:${footerConfig.email}`} className="text-sm text-white hover:text-[#00F0FF] transition-colors">
                      {footerConfig.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#00F0FF]/60 mt-0.5" />
                  <div>
                    <p className="text-sm text-[#A7B0C8]">{t('footer.phoneLabel')}</p>
                    <span className="text-sm text-white">{footerConfig.phone}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#00F0FF]/60 mt-0.5" />
                  <div>
                    <p className="text-sm text-[#A7B0C8]">{t('footer.addressLabel')}</p>
                    <span className="text-sm text-white">{footerConfig.address}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-display text-sm uppercase tracking-wider text-white mb-6">
                {t('footer.newsletterTitle')}
              </h4>
              <p className="text-sm text-[#A7B0C8] mb-4">
                {t('footer.newsletterDescription')}
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t('footer.emailPlaceholder')}
                  className="flex-grow px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00F0FF]/50"
                />
                <button
                  onClick={handleContactClick}
                  className="px-4 py-3 bg-[#00F0FF]/20 text-[#00F0FF] rounded-lg text-sm font-medium hover:bg-[#00F0FF]/30 transition-colors"
                >
                  {t('footer.newsletterButtonText')}
                </button>
              </div>
            </div>
          </div>

          {/* Footer image grid */}
          {footerConfig.galleryImages.length > 0 && (
            <div className="mb-12">
              <p className="font-mono-custom text-xs text-white/30 uppercase tracking-wider mb-4">
                Gallery
              </p>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                {footerConfig.galleryImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="relative aspect-square overflow-hidden rounded-lg footer-grid-item cursor-pointer"
                    onMouseEnter={() => setHoveredImage(index)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <img
                      src={image.src}
                      alt=""
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        hoveredImage === index ? 'scale-110 brightness-110' : 'brightness-75'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/30 font-mono-custom">
              {t('footer.copyrightText')}
            </p>
            <div className="flex gap-6">
              {(t('footer.bottomLinks', { returnObjects: true }) as string[]).map((link: string, index: number) => (
                <a key={index} href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
