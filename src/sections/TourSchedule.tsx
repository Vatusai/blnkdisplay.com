import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { MapPin, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { tourScheduleConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const TourSchedule = () => {
  const { t } = useTranslation();
  
  // Null check: if config is empty, do not render
  if (tourScheduleConfig.tourDates.length === 0 && !tourScheduleConfig.sectionTitle) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeVenue, setActiveVenue] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => setIsVisible(true),
    });

    scrollTriggerRef.current = st;

    return () => {
      st.kill();
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current?.querySelectorAll('.tour-item') || [],
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isVisible]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'on-sale':
        return { text: t('applications.statusLabels.onSale'), color: 'text-[#00F0FF] bg-[#00F0FF]/10 border-[#00F0FF]/30' };
      case 'sold-out':
        return { text: t('applications.statusLabels.soldOut'), color: 'text-rose-400 bg-rose-400/10 border-rose-400/30' };
      case 'coming-soon':
        return { text: t('applications.statusLabels.comingSoon'), color: 'text-amber-400 bg-amber-400/10 border-amber-400/30' };
      default:
        return { text: t('applications.statusLabels.default'), color: 'text-gray-400 bg-gray-400/10 border-gray-400/30' };
    }
  };

  const TOUR_DATES = tourScheduleConfig.tourDates;

  return (
    <section
      id="tour"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0E1016] py-20 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07070A] via-[#0E1016] to-[#07070A]" />

      {/* Rotating LED panel */}
      {tourScheduleConfig.vinylImage && (
        <div className="absolute top-20 right-20 w-64 h-64 md:w-80 md:h-80 z-10 opacity-40">
          <img
            src={tourScheduleConfig.vinylImage}
            alt="LED Panel"
            className="w-full h-full animate-spin-slow rounded-lg"
          />
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-lg bg-[#00F0FF]/20 blur-3xl" />
        </div>
      )}

      {/* Content container */}
      <div ref={contentRef} className="relative z-20 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p className="font-mono-custom text-xs text-[#00F0FF]/60 uppercase tracking-wider mb-2">
            {t('applications.sectionLabel')}
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-white">
            {t('applications.sectionTitle')}
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Venue preview */}
          {TOUR_DATES.length > 0 && (
            <div className="hidden lg:flex lg:items-center">
              <div className="sticky top-32 w-full aspect-[4/3] rounded-2xl overflow-hidden led-module">
                <img
                  src={TOUR_DATES[activeVenue]?.image}
                  alt={TOUR_DATES[activeVenue]?.venue}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />

                {/* Venue info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#07070A] to-transparent">
                  <p className="font-display text-2xl text-white">
                    {TOUR_DATES[activeVenue]?.venue}
                  </p>
                  <p className="font-mono-custom text-sm text-[#00F0FF]/80">
                    {TOUR_DATES[activeVenue]?.city}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Right: Tour list */}
          <div className="space-y-4">
            {TOUR_DATES.map((tour, index) => {
              const status = getStatusLabel(tour.status);

              return (
                <div
                  key={tour.id}
                  className="tour-item group relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#00F0FF]/30 hover:bg-white/8 transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setActiveVenue(index)}
                  onMouseLeave={() => setActiveVenue(0)}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Date */}
                    <div className="flex-shrink-0 w-28">
                      <p className="font-mono-custom text-2xl font-bold text-white">
                        {tour.date.split('.').slice(1).join('.')}
                      </p>
                      <p className="font-mono-custom text-xs text-white/40">
                        {tour.date.split('.')[0]}
                      </p>
                    </div>

                    {/* Venue info */}
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-[#00F0FF]/60" />
                        <span className="font-display text-lg text-white">
                          {t(`applications.tourDates.${index}.city`, tour.city)}
                        </span>
                      </div>
                      <p className="text-sm text-white/50 ml-6">
                        {t(`applications.tourDates.${index}.venue`, tour.venue)}
                      </p>
                    </div>

                    {/* Time */}
                    <div className="flex items-center gap-2 text-white/40">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono-custom text-sm">{t(`applications.tourDates.${index}.time`, tour.time)}</span>
                    </div>

                    {/* Status badge */}
                    <div className="flex-shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                        {status.text}
                      </span>
                    </div>

                    {/* Action button */}
                    <div className="flex-shrink-0">
                      {tour.status === 'on-sale' ? (
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#00F0FF] text-[#07070A] rounded-full text-sm font-medium hover:bg-[#00F0FF]/80 transition-colors">
                          <ArrowRight className="w-4 h-4" />
                          <span>{t('applications.buyButtonText')}</span>
                        </button>
                      ) : (
                        <button className="flex items-center gap-2 px-4 py-2 border border-white/20 text-white/60 rounded-full text-sm hover:border-[#00F0FF]/50 hover:text-[#00F0FF] transition-colors">
                          <ExternalLink className="w-4 h-4" />
                          <span>{t('applications.detailsButtonText')}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#00F0FF] rounded-full group-hover:h-12 transition-all duration-300" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="font-mono-custom text-sm text-white/40 mb-4">
            {t('applications.bottomNote')}
          </p>
          <button className="px-8 py-4 bg-[#00F0FF] text-[#07070A] font-display text-sm uppercase tracking-wider rounded-full hover:bg-[#00F0FF]/80 transition-colors">
            {t('applications.bottomCtaText')}
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent" />
    </section>
  );
};

export default TourSchedule;
