import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowDown, Sparkles } from 'lucide-react';
import { gsap, useGSAP, whenMotionOk } from '../lib/motion';
import { HERO_DATA } from '../data/mockData';
import { ASSETS } from '../data/clientAssets';
import { Button } from './ui/Button';
import { RainbowArc } from './ui/RainbowArc';

interface HeroProps {
  onOpenVideo: () => void;
}

/**
 * Cinematic LOVE WORLD video hero.
 * Drop final mp4 at ASSETS.hero.video — poster + fallback already wired.
 */
export const Hero: React.FC<HeroProps> = ({ onOpenVideo }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useGSAP(
    () => {
      const mm = whenMotionOk(() => {
        gsap
          .timeline({ defaults: { ease: 'power2.out' } })
          .fromTo('[data-vh="overlay"]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 })
          .fromTo(
            '[data-vh="brand"]',
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.45 },
            '-=0.15'
          )
          .fromTo(
            '[data-vh="line"]',
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.4 },
            '-=0.2'
          )
          .fromTo(
            '[data-vh="cta"]',
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, stagger: 0.06, duration: 0.35 },
            '-=0.15'
          );
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const tryAutoplay = useCallback(async () => {
    const v = videoRef.current;
    if (!v || prefersReduced || videoFailed) return;
    try {
      v.muted = true;
      setMuted(true);
      await v.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, [prefersReduced, videoFailed]);

  useEffect(() => {
    if (videoReady && !prefersReduced) {
      void tryAutoplay();
    }
  }, [videoReady, prefersReduced, tryAutoplay]);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v || videoFailed) {
      onOpenVideo();
      return;
    }
    if (v.paused) {
      try {
        await v.play();
        setPlaying(true);
      } catch {
        onOpenVideo();
      }
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const scrollNext = () => {
    document.getElementById('intro')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-dvh w-full overflow-hidden bg-slate-950 text-white"
    >
      {/* Full-bleed media plane */}
      <div className="absolute inset-0">
        {!videoFailed && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            poster={ASSETS.hero.poster}
            playsInline
            loop
            muted={muted}
            preload="metadata"
            onLoadedData={() => setVideoReady(true)}
            onError={() => setVideoFailed(true)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            aria-label="LOVE WORLD logo video"
          >
            <source src={ASSETS.hero.video} type="video/mp4" />
          </video>
        )}

        {/* Poster fallback when video missing / reduced motion */}
        {(videoFailed || prefersReduced || !playing) && (
          <img
            src={ASSETS.hero.poster}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              playing && !videoFailed && !prefersReduced ? 'opacity-0' : 'opacity-100'
            }`}
            aria-hidden
          />
        )}

        <div
          data-vh="overlay"
          className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-slate-950/25"
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>

      {/* Content — brand-first, sparse */}
      <div className="relative z-10 flex min-h-dvh flex-col justify-end pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="sl-container max-w-4xl">
          <div data-vh="brand" className="space-y-4 sm:space-y-5">
            <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-amber-200/90">
              <Sparkles className="h-4 w-4" aria-hidden />
              {HERO_DATA.anniversaryBadge}
            </p>
            <h1 className="font-display text-[clamp(2.75rem,8vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight text-white">
              Spread Love
            </h1>
            <RainbowArc variant="stripe" className="max-w-[12rem] sm:max-w-[16rem]" />
            <p data-vh="line" className="max-w-xl text-base sm:text-lg font-medium text-white/85 leading-relaxed">
              {HERO_DATA.subtext}
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              data-vh="cta"
              variant="primary"
              size="lg"
              onClick={togglePlay}
              icon={
                playing && !videoFailed ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 fill-current" />
                )
              }
              iconPosition="left"
              className="cursor-pointer"
            >
              {playing && !videoFailed ? 'Pause' : HERO_DATA.videoBadge}
            </Button>

            {!videoFailed && (
              <button
                data-vh="cta"
                type="button"
                onClick={toggleMute}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors cursor-pointer"
                aria-label={muted ? 'Unmute video' : 'Mute video'}
              >
                {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
            )}

            <Button
              data-vh="cta"
              variant="outline"
              size="lg"
              href="#intro"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20 cursor-pointer"
            >
              Enter the world
            </Button>
          </div>
        </div>

        <button
          type="button"
          onClick={scrollNext}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors cursor-pointer min-h-11"
          aria-label="Scroll to introduction"
        >
          <ArrowDown className="h-5 w-5 animate-bounce" style={{ animationDuration: '2s' }} />
        </button>
      </div>
    </section>
  );
};
