import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import * as THREE from 'three';
import { albumCubeConfig } from '../config';

gsap.registerPlugin(ScrollTrigger);

interface CubeProps {
  rotationProgress: number;
}

const Cube = ({ rotationProgress }: CubeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const textures = useTexture(albumCubeConfig.cubeTextures);

  // Responsive cube size
  const cubeSize = Math.min(viewport.width * 0.35, 2.5);

  useFrame(() => {
    if (meshRef.current) {
      // Map rotation progress (0-1) to rotation angles
      const targetRotationY = rotationProgress * Math.PI * 2;
      const targetRotationX = Math.sin(rotationProgress * Math.PI) * 0.3;

      // Smooth interpolation
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        targetRotationY,
        0.1
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        targetRotationX,
        0.1
      );
    }
  });

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
      {textures.map((texture, index) => (
        <meshStandardMaterial
          key={index}
          attach={`material-${index}`}
          map={texture}
          roughness={0.2}
          metalness={0.1}
          emissive={new THREE.Color(0x00F0FF)}
          emissiveIntensity={0.05}
        />
      ))}
    </mesh>
  );
};

const AlbumCube = () => {
  const { t } = useTranslation();
  
  // Null check: if config is empty, do not render
  if (albumCubeConfig.albums.length === 0 || albumCubeConfig.cubeTextures.length === 0) {
    return null;
  }

  const sectionRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [rotationProgress, setRotationProgress] = useState(0);
  const [currentAlbumIndex, setCurrentAlbumIndex] = useState(0);
  const [blurAmount, setBlurAmount] = useState(0);
  const [letterSpacing, setLetterSpacing] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Main scroll timeline with three-phase animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const progress = self.progress;
            setRotationProgress(progress);

            // Calculate current album index
            const albumIndex = Math.min(
              Math.floor(progress * 4),
              albumCubeConfig.albums.length - 1
            );
            setCurrentAlbumIndex(albumIndex);

            // Velocity-based blur effect
            const velocity = Math.abs(self.getVelocity());
            const targetBlur = Math.min(velocity / 500, 8);
            const targetSpacing = Math.min(velocity / 100, 30);

            setBlurAmount(prev => prev + (targetBlur - prev) * 0.2);
            setLetterSpacing(prev => prev + (targetSpacing - prev) * 0.2);
          }
        }
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        watermarkRef.current,
        { x: '-12vw', opacity: 0 },
        { x: 0, opacity: 0.08, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        bodyRef.current,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        watermarkRef.current,
        { x: 0, opacity: 0.08 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bodyRef.current,
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentAlbum = albumCubeConfig.albums[currentAlbumIndex];

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#07070A] overflow-hidden"
    >
      {/* Background watermark */}
      <div
        ref={watermarkRef}
        className="absolute left-[6vw] top-[18vh] pointer-events-none z-0"
      >
        <span className="watermark">DISPLAY</span>
      </div>

      {/* Left content */}
      <div className="absolute left-[10vw] top-[34vh] w-[44vw] max-w-xl z-20">
        <div ref={headlineRef}>
          <p className="font-mono-custom text-xs text-[#00F0FF]/60 uppercase tracking-wider mb-4">
            {t('technology.sectionLabel')}
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6 whitespace-pre-line">
            {t('technology.headline')}
          </h2>
        </div>
        <div ref={bodyRef}>
          <p className="text-[#A7B0C8] text-lg leading-relaxed mb-8">
            {t('technology.description')}
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#00F0FF]/10 flex items-center justify-center">
              <span className="font-mono-custom text-lg text-[#00F0FF] font-bold">{t('technology.featureNumber')}</span>
            </div>
            <div>
              <p className="text-white font-medium">{t('technology.featureTitle')}</p>
              <p className="text-[#A7B0C8] text-sm">{t('technology.featureDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div className="absolute right-[10vw] top-1/2 -translate-y-1/2 w-[40vw] h-[50vh] z-10">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1}
              castShadow
            />
            <spotLight
              position={[-10, -10, -10]}
              angle={0.15}
              penumbra={1}
              intensity={0.5}
              color="#00F0FF"
            />
            <pointLight position={[0, 0, 5]} intensity={0.5} color="#00F0FF" />
            <Cube rotationProgress={rotationProgress} />
            <Environment preset="city" />
          </Suspense>
        </Canvas>

        {/* LED module frame overlay */}
        <div className="absolute inset-0 led-module pointer-events-none opacity-30" />
      </div>

      {/* Album info overlay */}
      <div className="absolute bottom-12 left-12 z-20">
        <p className="font-mono-custom text-xs text-[#00F0FF]/60 uppercase tracking-wider mb-2">
          {t('technology.techLabel')} {String(currentAlbum.id).padStart(2, '0')} / {String(albumCubeConfig.albums.length).padStart(2, '0')}
        </p>
        <h3 
          className="font-display text-5xl md:text-7xl text-white mb-2 transition-all duration-300"
          style={{
            filter: `blur(${blurAmount}px)`,
            letterSpacing: `${letterSpacing}px`,
          }}
        >
          {t(`technology.albums.${currentAlbumIndex}.title`, currentAlbum.title)}
        </h3>
        <p className="font-mono-custom text-sm text-[#A7B0C8]">
          {t(`technology.albums.${currentAlbumIndex}.subtitle`, currentAlbum.subtitle)}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-20">
        <div className="flex flex-col gap-3">
          {albumCubeConfig.albums.map((album, index) => (
            <div
              key={album.id}
              className={`w-2 rounded-full transition-all duration-300 ${
                index === currentAlbumIndex
                  ? 'bg-[#00F0FF] h-8'
                  : 'bg-white/20 h-2'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-12 right-12 z-20">
        <p className="font-mono-custom text-xs text-white/40 uppercase tracking-wider">
          {t('technology.scrollHint')}
        </p>
      </div>

      {/* Decorative corner lines */}
      <div className="absolute top-12 left-12 w-20 h-px bg-gradient-to-r from-[#00F0FF]/50 to-transparent" />
      <div className="absolute top-12 left-12 w-px h-20 bg-gradient-to-b from-[#00F0FF]/50 to-transparent" />
      <div className="absolute bottom-12 right-12 w-20 h-px bg-gradient-to-l from-[#00F0FF]/30 to-transparent" />
      <div className="absolute bottom-12 right-12 w-px h-20 bg-gradient-to-t from-[#00F0FF]/30 to-transparent" />
    </section>
  );
};

export default AlbumCube;
