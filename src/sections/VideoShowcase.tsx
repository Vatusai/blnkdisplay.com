import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { videoConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

const VideoShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  // Autoplay when scrolled into view
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    const heading = headingRef.current;
    if (!video || !section || !heading) return;

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
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, ease: 'power2.out' }
    );
    if (headingTl.scrollTrigger) triggersRef.current.push(headingTl.scrollTrigger);

    // Autoplay on enter viewport
    const autoplayTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      onEnter: () => {
        video.muted = true;
        video.play().then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        }).catch(() => {});
      },
      onLeave: () => {
        video.pause();
        setIsPlaying(false);
      },
      onEnterBack: () => {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      },
      onLeaveBack: () => {
        video.pause();
        setIsPlaying(false);
      },
    });
    triggersRef.current.push(autoplayTrigger);

    return () => {
      triggersRef.current.forEach(t => t.kill());
      triggersRef.current = [];
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="relative w-full bg-black py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-display font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none">
        DEMO
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="mb-12">
          <span className="reveal-text block font-body text-xs uppercase tracking-[0.3em] text-pink mb-4">
            {videoConfig.sectionLabel}
          </span>
          <h2 className="reveal-text font-display font-black text-4xl md:text-6xl lg:text-7xl text-white leading-[0.95] tracking-tight">
            {videoConfig.headingMain}{' '}
            <span className="text-stroke">{videoConfig.headingAccent}</span>
          </h2>
          <p className="reveal-text font-body text-white/50 text-base md:text-lg mt-6 max-w-xl leading-relaxed">
            {videoConfig.description}
          </p>
        </div>

        {/* Video container */}
        <div className="relative group border border-white/10 overflow-hidden">
          <video
            ref={videoRef}
            src={videoConfig.videoSrc}
            poster={videoConfig.posterImage}
            muted
            playsInline
            loop
            preload="metadata"
            className="w-full aspect-video object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          {/* Overlay — visible before first play */}
          {!hasStarted && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <button
                onClick={togglePlay}
                className="w-20 h-20 border-2 border-white/60 rounded-full flex items-center justify-center text-white hover:bg-white/10 hover:border-white transition-all duration-300"
                data-cursor-hover
              >
                <Play className="w-8 h-8 ml-1" />
              </button>
            </div>
          )}

          {/* Controls bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/60 to-transparent">
            <button
              onClick={togglePlay}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200"
              data-cursor-hover
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              <span className="font-body text-xs uppercase tracking-wider">
                {isPlaying ? 'Pause' : 'Play'}
              </span>
            </button>

            <button
              onClick={toggleMute}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200"
              data-cursor-hover
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              <span className="font-body text-xs uppercase tracking-wider">
                {isMuted ? 'Unmute' : 'Mute'}
              </span>
            </button>
          </div>

          {/* Pink corner accent */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-pink" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-pink" />
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
