import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowDown } from 'lucide-react';
import { gsap, useGSAP, whenMotionOk, SplitText } from '../lib/motion';
import { HERO_DATA } from '../data/mockData';
import { ASSETS } from '../data/clientAssets';

const SPECTRUM = [
  'var(--rb-red)',
  'var(--rb-orange)',
  'var(--rb-yellow)',
  'var(--rb-green)',
  'var(--rb-teal)',
  'var(--rb-blue)',
  'var(--rb-violet)',
  'var(--rb-pink)',
];

/**
 * Cinematic LOVE WORLD hero.
 * Drop the final film at ASSETS.hero.video — poster + fallback already wired.
 */
export const Hero: React.FC<{ onOpenVideo: () => void }> = ({ onOpenVideo }) => {
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
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Wordmark letters rise in spectrum order
        const title = sectionRef.current?.querySelector('[data-vh="title"]');
        if (title) {
          const split = SplitText.create(title, { type: 'chars', mask: 'chars' });
          split.chars.forEach((c, i) => {
            (c as HTMLElement).style.color = SPECTRUM[i % SPECTRUM.length];
          });
          tl.from(split.chars, {
            yPercent: 120,
            stagger: 0.045,
            duration: 0.8,
          });
        }

        tl.fromTo('[data-vh="rule"]', { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, '-=0.35')
          .fromTo('[data-vh="line"]', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.45 }, '-=0.3')
          .fromTo(
            '[data-vh="cta"]',
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.4 },
            '-=0.2'
          );

        // Slow zoom on the still so a poster-only hero still breathes
        gsap.to('[data-vh="poster"]', {
          scale: 1.08,
          duration: 18,
          repeat: -1,
          yoyo: true,
          ease: 'none',
        });
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
    if (videoReady && !prefersReduced) void tryAutoplay();
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

  const showPoster = videoFailed || prefersReduced || !playing;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-dvh w-full overflow-hidden bg-[oklch(18%_0.04_300)] text-white"
    >
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
            aria-label="LOVE WORLD film"
          >
            <source src={ASSETS.hero.video} type="video/mp4" />
          </video>
        )}

        {showPoster && (
          <img
            data-vh="poster"
            src={ASSETS.hero.poster}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            aria-hidden
          />
        )}

        {/* Ink wash so spectrum type keeps its contrast */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(18%_0.04_300)_6%,oklch(18%_0.04_300_/_0.55)_45%,oklch(18%_0.04_300_/_0.35)_100%)]" />
      </div>

      {/* Spectrum frame */}
      <div className="absolute inset-x-0 top-0 h-2 z-10" style={{ background: 'var(--gradient-rainbow)' }} aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-2 z-10" style={{ background: 'var(--gradient-rainbow)' }} aria-hidden />

      <div className="relative z-10 flex min-h-dvh flex-col justify-end pb-20 pt-28 sm:pb-24 sm:pt-32">
        <div className="sl-container max-w-5xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[var(--rb-yellow)] sm:text-sm">
            {HERO_DATA.anniversaryBadge}
          </p>

          <h1
            data-vh="title"
            className="mt-4 font-display text-[clamp(3.25rem,13vw,9rem)] font-extrabold leading-[0.88] tracking-tighter"
            style={{ overflowWrap: 'anywhere' }}
          >
            {HERO_DATA.headline}
          </h1>

          <div
            data-vh="rule"
            className="mt-5 h-2.5 w-full max-w-md origin-left rounded-full"
            style={{ background: 'var(--gradient-rainbow)' }}
            aria-hidden
          />

          <p data-vh="line" className="mt-6 max-w-xl text-base font-medium leading-relaxed text-white/85 sm:text-lg">
            {HERO_DATA.subtext}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              data-vh="cta"
              type="button"
              onClick={togglePlay}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full px-7 text-sm font-extrabold text-white transition-transform hover:scale-[1.03] cursor-pointer"
              style={{ background: 'var(--gradient-rainbow-diagonal)' }}
            >
              {playing && !videoFailed ? (
                <Pause className="h-4 w-4" aria-hidden />
              ) : (
                <Play className="h-4 w-4 fill-current" aria-hidden />
              )}
              {playing && !videoFailed ? 'Pause' : HERO_DATA.videoBadge}
            </button>

            {!videoFailed && (
              <button
                data-vh="cta"
                type="button"
                onClick={toggleMute}
                className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full border-2 border-white/40 text-white transition-colors hover:bg-white hover:text-[oklch(18%_0.04_300)] cursor-pointer"
                aria-label={muted ? 'Unmute film' : 'Mute film'}
              >
                {muted ? <VolumeX className="h-5 w-5" aria-hidden /> : <Volume2 className="h-5 w-5" aria-hidden />}
              </button>
            )}

            <a
              data-vh="cta"
              href="#intro"
              className="inline-flex min-h-12 items-center rounded-full bg-white px-7 text-sm font-extrabold text-[oklch(18%_0.04_300)] transition-transform hover:scale-[1.03] cursor-pointer"
            >
              Enter the world
            </a>
          </div>
        </div>

        <a
          href="#intro"
          className="absolute bottom-7 left-1/2 flex min-h-11 -translate-x-1/2 items-center text-white/70 transition-colors hover:text-white"
          aria-label="Scroll to the first chapter"
        >
          <ArrowDown className="h-5 w-5 animate-bounce" style={{ animationDuration: '2s' }} aria-hidden />
        </a>
      </div>
    </section>
  );
};
