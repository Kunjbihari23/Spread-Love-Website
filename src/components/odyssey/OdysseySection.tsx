import React, { useRef, useState } from 'react';
import { ArrowRight, BookOpen, Hand, Sparkles, Star } from 'lucide-react';
import {
  gsap,
  ScrollTrigger,
  SplitText,
  Draggable,
  Flip,
  useGSAP,
  isReducedMotion,
  scrollToY,
  EASE,
} from '../../lib/motion';
import { TIMELINE_DATA } from '../../data/mockData';
import {
  CHARACTER_ART,
  CoverCrest,
  CoverFrame,
  HeartShape,
  PaperPlane,
  TrailPath,
} from './OdysseyArt';

const PAGES = TIMELINE_DATA;
const HEART_COUNT = 22;
const HEART_COLORS = ['#ff4d8d', '#ffca4b', '#c4b5fd', '#2fd197', '#ff8fb3', '#38b6ff'];

/** Scroll length: one screen per page plus the cover and the finale. */
const TRACK_VH = (PAGES.length + 2) * 100;

export const OdysseySection: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const cornerRef = useRef<HTMLButtonElement>(null);

  // `-1` = closed cover, `PAGES.length` = finale
  const [chapter, setChapter] = useState(-1);
  const chapterRef = useRef(-1);
  const draggedRef = useRef(false);
  const seekRef = useRef<(index: number) => void>(() => {});

  const reduced = isReducedMotion();

  useGSAP(
    () => {
      if (reduced || !trackRef.current || !stageRef.current) return;

      const q = gsap.utils.selector(stageRef);
      const isMobile = window.matchMedia('(max-width: 860px)').matches;
      const leaves = q<HTMLDivElement>('[data-od="leaf"]');
      const lefts = q<HTMLDivElement>('[data-od="left"]');
      const spreads = q<HTMLDivElement>('[data-od="spread"]');

      /* ── Resting state ─────────────────────────────────────── */
      gsap.set(spreads, { autoAlpha: (i) => (i === 0 ? 1 : 0) });
      gsap.set(leaves, { rotateY: 0, transformPerspective: 2400 });
      gsap.set('[data-od="finale"]', { autoAlpha: 0 });
      gsap.set('[data-od="heart"]', { autoAlpha: 0, scale: 0 });
      gsap.set('[data-od="plane"]', { autoAlpha: 0 });

      // Split every page title once; the context reverts them on cleanup.
      const titleChars = new Map<number, Element[]>();
      q<HTMLElement>('[data-od="title"]').forEach((el, i) => {
        titleChars.set(i, SplitText.create(el, { type: 'words,chars', mask: 'words' }).chars);
      });

      /* ── Master reel ───────────────────────────────────────── */
      const tl = gsap.timeline({ defaults: { ease: EASE.story } });

      // Act I — the theater opens and the book presents itself
      tl.addLabel('cover', 0)
        .fromTo(
          '[data-od="curtain-l"]',
          { xPercent: 0 },
          { xPercent: -104, duration: 1.1, ease: EASE.page },
          0
        )
        .fromTo(
          '[data-od="curtain-r"]',
          { xPercent: 0 },
          { xPercent: 104, duration: 1.1, ease: EASE.page },
          0
        )
        .fromTo(
          '[data-od="cover-title"] .od-cover-word',
          { yPercent: 130, rotate: 8, autoAlpha: 0 },
          { yPercent: 0, rotate: 0, autoAlpha: 1, duration: 0.7, stagger: 0.06 },
          0.25
        )
        .fromTo(
          '.od-frame-line, .od-frame-flourish',
          { drawSVG: '50% 50%' },
          { drawSVG: '0% 100%', duration: 0.8, stagger: 0.05 },
          0.3
        )
        .fromTo(
          '.od-foil',
          { backgroundPosition: '200% 0%' },
          { backgroundPosition: '-60% 0%', duration: 1.2, ease: 'none' },
          0.4
        )
        .to('#od-crest-shape', { morphSVG: '#od-crest-star', duration: 0.5 }, 0.55)
        .to(
          '.od-crest-spark',
          { scale: 1.9, autoAlpha: 0, duration: 0.5, stagger: { each: 0.03, from: 'random' } },
          0.6
        )
        .to('[data-od="cover-hint"]', { autoAlpha: 0, y: -10, duration: 0.3 }, 0.9);

      // The front board swings open
      tl.addLabel('open', 1.3)
        .to(
          '[data-od="cover"]',
          {
            rotateY: isMobile ? 0 : -168,
            xPercent: isMobile ? -6 : 0,
            yPercent: isMobile ? -8 : 0,
            scale: isMobile ? 0.94 : 1,
            autoAlpha: isMobile ? 0 : 1,
            duration: 1.1,
            ease: EASE.page,
          },
          'open'
        )
        .to('[data-od="cover"]', { autoAlpha: 0, duration: 0.25 }, 'open+=0.95')
        .to('[data-od="plane"]', { autoAlpha: 1, duration: 0.3 }, 'open+=0.3')
        .from('[data-od="rail"]', { yPercent: 160, autoAlpha: 0, duration: 0.5 }, 'open+=0.5');

      /* ── Act II — one chapter per page ──────────────────────── */
      PAGES.forEach((page, i) => {
        const label = `p${i}`;
        if (i === 0) tl.addLabel(label, tl.labels.open + 0.85);
        else tl.addLabel(label);

        // Turn the previous leaf away and dissolve its illustration
        if (i > 0) {
          tl.to(
            leaves[i - 1],
            { rotateY: isMobile ? 0 : -172, yPercent: isMobile ? -102 : 0, duration: 1, ease: EASE.page },
            label
          )
            .to(leaves[i - 1], { autoAlpha: 0, duration: 0.3 }, `${label}+=0.7`)
            .fromTo(
              leaves[i - 1].querySelector('.od-leaf-shade'),
              { autoAlpha: 0 },
              { autoAlpha: 0.85, duration: 0.5, yoyo: true, repeat: 1 },
              label
            )
            .to(spreads[i - 1], { autoAlpha: 0, duration: 0.6 }, `${label}+=0.3`)
            .fromTo(
              lefts[i - 1],
              { scale: 1, filter: 'blur(0px)' },
              { scale: 1.06, filter: 'blur(6px)', duration: 0.8 },
              label
            )
            .fromTo(spreads[i], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, `${label}+=0.25`);
        }

        const inAt = i === 0 ? `${label}+=0` : `${label}+=0.45`;

        // Illustration: torn-paper wipe + slow push in
        tl.fromTo(
          lefts[i].querySelector('[data-od="window"]'),
          { clipPath: 'inset(0% 0% 100% 0% round 14px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 0.7 },
          inAt
        )
          .fromTo(
            lefts[i].querySelector('img'),
            { scale: 1.24, xPercent: -3 },
            { scale: 1.02, xPercent: 0, duration: 2.4, ease: 'none' },
            inAt
          )
          .fromTo(
            lefts[i].querySelectorAll('[data-od="tape"]'),
            { autoAlpha: 0, scale: 0.6, rotate: 0 },
            { autoAlpha: 0.92, scale: 1, rotate: -24, duration: 0.4, stagger: 0.08, ease: EASE.pop },
            `${inAt}+=0.25`
          )
          .fromTo(
            lefts[i].querySelector('[data-od="friend"]'),
            { autoAlpha: 0, scale: 0.4, yPercent: 30, rotate: -14 },
            { autoAlpha: 1, scale: 1, yPercent: 0, rotate: 0, duration: 0.6, ease: EASE.pop },
            `${inAt}+=0.35`
          )
          .fromTo(
            lefts[i].querySelector('[data-od="caption"]'),
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.4 },
            `${inAt}+=0.5`
          );

        // Story page: chapter mark, year, title letters, body, stickers, ribbon
        const face = leaves[i];
        tl.fromTo(
          face.querySelector('[data-od="chapter"]'),
          { autoAlpha: 0, x: -16 },
          { autoAlpha: 1, x: 0, duration: 0.35 },
          inAt
        )
          .fromTo(
            face.querySelector('[data-od="year"]'),
            { autoAlpha: 0, scale: 0.7, rotate: -6 },
            { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.55, ease: EASE.pop },
            `${inAt}+=0.1`
          )
          .fromTo(
            titleChars.get(i) ?? [],
            { yPercent: 115, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.5, stagger: 0.012 },
            `${inAt}+=0.2`
          )
          .fromTo(
            face.querySelectorAll('[data-od="copy"]'),
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 },
            `${inAt}+=0.35`
          )
          .fromTo(
            face.querySelectorAll('[data-od="sticker"]'),
            { autoAlpha: 0, scale: 0.75, rotate: -4 },
            { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.45, stagger: 0.09, ease: EASE.pop },
            `${inAt}+=0.5`
          )
          .to(
            face.querySelectorAll('[data-od="sticker"]'),
            { rotate: 2.5, duration: 0.7, ease: EASE.wiggle, stagger: 0.09 },
            `${inAt}+=0.6`
          )
          .fromTo(
            face.querySelector('[data-od="ribbon"]'),
            { autoAlpha: 0, xPercent: -18 },
            { autoAlpha: 1, xPercent: 0, duration: 0.45, ease: EASE.pop },
            `${inAt}+=0.7`
          );

        // Dwell time so a reader can actually read the page
        tl.to({}, { duration: 0.9 });
      });

      /* ── Act III — the finale ───────────────────────────────── */
      tl.addLabel('finale');
      tl.to(
        leaves[PAGES.length - 1],
        { rotateY: isMobile ? 0 : -172, yPercent: isMobile ? -102 : 0, duration: 1, ease: EASE.page },
        'finale'
      )
        .to(leaves[PAGES.length - 1], { autoAlpha: 0, duration: 0.3 }, 'finale+=0.7')
        .to(spreads[PAGES.length - 1], { autoAlpha: 0, duration: 0.6 }, 'finale+=0.3')
        .fromTo('[data-od="finale"]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, 'finale+=0.35')
        .fromTo(
          '[data-od="finale-line"]',
          { autoAlpha: 0, y: 26, scale: 0.94 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: EASE.pop },
          'finale+=0.5'
        )
        .fromTo(
          '[data-od="heart"]',
          { autoAlpha: 1, scale: 0, x: 0, y: 0, rotation: 0 },
          {
            autoAlpha: 1,
            scale: () => gsap.utils.random(0.6, 1.5),
            duration: 1.6,
            ease: 'none',
            stagger: { each: 0.03, from: 'center' },
            physics2D: {
              velocity: () => gsap.utils.random(320, 760),
              angle: () => gsap.utils.random(200, 340),
              gravity: 520,
            },
            rotation: () => gsap.utils.random(-220, 220),
          },
          'finale+=0.55'
        )
        .to('[data-od="heart"]', { autoAlpha: 0, duration: 0.5 }, 'finale+=1.7')
        .to({}, { duration: 0.6 });

      /* ── Full-length ambience, laid over the whole reel ────── */
      const total = tl.duration();
      tl.fromTo(
        '#od-trail-visible',
        { drawSVG: '0% 0%' },
        { drawSVG: '0% 100%', duration: total, ease: 'none' },
        0
      )
        .to(
          '[data-od="plane"]',
          {
            duration: total,
            ease: 'none',
            motionPath: {
              path: '#od-trail-motion',
              align: '#od-trail-motion',
              alignOrigin: [0.5, 0.5],
              autoRotate: true,
            },
          },
          0
        )
        .fromTo('[data-od="stars-far"]', { yPercent: 6 }, { yPercent: -10, duration: total, ease: 'none' }, 0)
        .fromTo('[data-od="stars-near"]', { yPercent: 14 }, { yPercent: -26, duration: total, ease: 'none' }, 0)
        .fromTo(
          '[data-od="book"]',
          { rotateX: 9, scale: 0.94 },
          { rotateX: 0, scale: 1, duration: 1.4, ease: EASE.story },
          0.2
        );

      /* ── Scroll wiring ─────────────────────────────────────── */
      const st = ScrollTrigger.create({
        animation: tl,
        trigger: trackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: stageRef.current,
        pinSpacing: false,
        scrub: 1,
        snap: {
          snapTo: 'labelsDirectional',
          duration: { min: 0.15, max: 0.5 },
          delay: 0.06,
          ease: 'power1.inOut',
        },
        onUpdate: (self) => {
          const time = tl.duration() * self.progress;
          let next = -1;
          if (time >= (tl.labels.finale ?? Infinity) - 0.35) next = PAGES.length;
          else {
            PAGES.forEach((_, i) => {
              if (time >= (tl.labels[`p${i}`] ?? Infinity) - 0.35) next = i;
            });
          }
          if (next !== chapterRef.current) {
            chapterRef.current = next;
            setChapter(next);
          }
        },
      });

      // Chapter jumps keep scroll as the single source of truth
      seekRef.current = (index: number) => {
        const label = index >= PAGES.length ? 'finale' : index < 0 ? 'cover' : `p${index}`;
        const time = tl.labels[label];
        if (time === undefined) return;
        const target = st.start + (st.end - st.start) * (time / tl.duration());
        scrollToY(target, 1.05);
      };

      /* ── Drag the corner to turn the page ──────────────────── */
      if (cornerRef.current) {
        const corner = cornerRef.current;
        Draggable.create(corner, {
          type: 'x,y',
          inertia: false,
          dragResistance: 0.35,
          onPress: () => {
            draggedRef.current = false;
            gsap.to('[data-od="corner-hint"]', { autoAlpha: 0, duration: 0.2 });
          },
          onDrag: function () {
            draggedRef.current = true;
            gsap.set(corner, { rotation: this.x * -0.08 });
          },
          onDragEnd: function () {
            if (this.x < -42 || this.y < -42) {
              seekRef.current(Math.min(chapterRef.current + 1, PAGES.length));
            } else if (this.x > 42) {
              seekRef.current(Math.max(chapterRef.current - 1, 0));
            }
            gsap.to(corner, { x: 0, y: 0, rotation: 0, duration: 0.5, ease: EASE.spring });
          },
        });
      }

      /* ── Spotlight tracks the pointer ──────────────────────── */
      const spot = { x: 50, y: 42 };
      const setSpotX = gsap.quickSetter(stageRef.current, '--od-spot-x', '%') as (v: number) => void;
      const setSpotY = gsap.quickSetter(stageRef.current, '--od-spot-y', '%') as (v: number) => void;
      const onMove = (e: PointerEvent) => {
        const r = stageRef.current!.getBoundingClientRect();
        gsap.to(spot, {
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
          duration: 0.7,
          ease: 'power2.out',
          overwrite: true,
          onUpdate: () => {
            setSpotX(spot.x);
            setSpotY(spot.y);
          },
        });
      };
      stageRef.current.addEventListener('pointermove', onMove);

      /* ── Arrow keys page through the book ──────────────────── */
      const onKey = (e: KeyboardEvent) => {
        if (!st.isActive) return;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          seekRef.current(Math.min(chapterRef.current + 1, PAGES.length));
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          seekRef.current(Math.max(chapterRef.current - 1, 0));
        }
      };
      window.addEventListener('keydown', onKey);

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        stageRef.current?.removeEventListener('pointermove', onMove);
        window.removeEventListener('keydown', onKey);
      };
    },
    { scope: rootRef, dependencies: [reduced] }
  );

  /* ── Gold pill slides between chapter chips (FLIP) ────────── */
  useGSAP(
    () => {
      if (reduced || !railRef.current || !pillRef.current) return;
      const active = railRef.current.querySelector<HTMLElement>('[aria-current="true"]');
      if (!active) {
        gsap.to(pillRef.current, { autoAlpha: 0, duration: 0.2 });
        return;
      }
      const state = Flip.getState(pillRef.current);
      Object.assign(pillRef.current.style, {
        left: `${active.offsetLeft}px`,
        top: `${active.offsetTop}px`,
        width: `${active.offsetWidth}px`,
        height: `${active.offsetHeight}px`,
      });
      gsap.to(pillRef.current, { autoAlpha: 1, duration: 0.2 });
      Flip.from(state, { duration: 0.45, ease: EASE.pop });
    },
    { dependencies: [chapter, reduced] }
  );

  /* ── Reduced motion: a calm, readable storybook list ──────── */
  if (reduced) {
    return (
      <section id="timeline" ref={rootRef} className="od-root py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <OdysseyHeading />
          <div className="mt-10 space-y-8">
            {PAGES.map((page, i) => {
              const Friend = CHARACTER_ART[page.id];
              return (
                <article key={page.id} className="od-static-card">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img src={page.image} alt={page.title} className="h-56 w-full object-cover sm:h-full" />
                  </div>
                  <div>
                    <p className="od-hand text-2xl text-[var(--od-pink)]">Chapter {i + 1}</p>
                    <p className="od-year">{page.year}</p>
                    <h3 className="od-story mt-1 text-2xl font-extrabold">{page.title}</h3>
                    <p className="mt-1 font-semibold text-[var(--od-pink)]">{page.subtitle}</p>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--od-ink-soft)]">{page.description}</p>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {page.highlights.map((h) => (
                        <li key={h} className="od-sticker">
                          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--od-pink)]" />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="od-ribbon">{page.achievement}</span>
                      {Friend && <Friend className="h-12 w-12" />}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="timeline" ref={rootRef} className="od-root">
      <div className="od-scrim od-scrim--top" />

      <div ref={trackRef} style={{ height: `${TRACK_VH}vh` }}>
        <div ref={stageRef} className="od-stage">
          {/* Ambience */}
          <div data-od="stars-far" className="od-starfield" style={{ opacity: 0.4 }} />
          <div data-od="stars-near" className="od-starfield" style={{ backgroundSize: '220px 220px' }} />
          <div className="od-spotlight" />

          {/* Journey trail across the floor of the theater */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[6vh] z-[6] h-[22vh]">
            <TrailPath className="h-full w-full" />
            <PaperPlane data-od="plane" className="od-quill" />
          </div>

          {/* The book */}
          <div className="od-book-wrap">
            <div data-od="book" className="od-book">
              <div className="od-edges" />

              {PAGES.map((page, i) => {
                const Friend = CHARACTER_ART[page.id];
                return (
                  <div
                    key={page.id}
                    data-od="spread"
                    className="od-spread"
                    style={{ zIndex: PAGES.length - i }}
                    aria-hidden={chapter !== i}
                  >
                    {/* Left — the illustration plate */}
                    <div data-od="left" className="od-paper-face">
                      <div data-od="window" className="od-window">
                        <img src={page.image} alt={page.title} loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1b0e2b]/70 via-transparent to-[#1b0e2b]/10" />
                      </div>
                      <span data-od="tape" className="od-tape od-tape--tl" />
                      <span data-od="tape" className="od-tape od-tape--br" />

                      {Friend && (
                        <Friend
                          data-od="friend"
                          className="absolute bottom-[3%] left-[4%] z-[6] h-[22%] w-auto drop-shadow-[0_10px_18px_rgba(30,10,45,0.45)]"
                        />
                      )}

                      <p
                        data-od="caption"
                        className="od-hand absolute bottom-[8%] right-[9%] z-[6] max-w-[58%] text-right text-[1.35rem] leading-tight text-[#fff6e2] drop-shadow-[0_2px_6px_rgba(20,8,32,0.9)]"
                      >
                        {page.keyCharacter}
                      </p>
                    </div>

                    {/* Right — the turning story leaf */}
                    <div data-od="leaf" className="od-leaf od-paper-face">
                      <div className="relative flex h-full flex-col justify-between p-[7%]">
                        <div>
                          <p
                            data-od="chapter"
                            className="od-hand text-xl text-[var(--od-pink)] sm:text-2xl"
                          >
                            Chapter {String(i + 1).padStart(2, '0')}
                          </p>
                          <p data-od="year" className="od-year">
                            {page.year}
                          </p>
                          <h3
                            data-od="title"
                            className="od-story mt-1 text-[clamp(1.1rem,2.1vw,1.9rem)] font-extrabold leading-[1.1] text-[var(--od-ink)]"
                          >
                            {page.title}
                          </h3>
                          <p
                            data-od="copy"
                            className="od-story mt-1.5 text-[clamp(0.8rem,1.1vw,1rem)] font-semibold text-[var(--od-pink)]"
                          >
                            {page.subtitle}
                          </p>
                          <p
                            data-od="copy"
                            className="mt-2.5 text-[clamp(0.72rem,0.95vw,0.9rem)] leading-relaxed text-[var(--od-ink-soft)]"
                          >
                            {page.description}
                          </p>
                        </div>

                        <div className="mt-3 grid gap-1.5 sm:grid-cols-2">
                          {page.highlights.map((h) => (
                            <span key={h} data-od="sticker" className="od-sticker">
                              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--od-pink)]" />
                              {h}
                            </span>
                          ))}
                        </div>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                          <span data-od="ribbon" className="od-ribbon">
                            <Star className="h-3 w-3 fill-white" />
                            {page.achievement}
                          </span>
                          {i === PAGES.length - 1 ? (
                            <a
                              href="#love-world"
                              className="od-story inline-flex items-center gap-1.5 text-xs font-bold text-[var(--od-pink)] hover:underline"
                            >
                              Enter LOVE WORLD
                              <ArrowRight className="h-3.5 w-3.5" />
                            </a>
                          ) : (
                            <span className="od-hand text-lg text-[var(--od-ink-soft)]">
                              turn the page →
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="od-leaf-shade" />
                    </div>
                  </div>
                );
              })}

              <div className="od-gutter" />

              {/* Drag-to-turn corner */}
              <button
                ref={cornerRef}
                type="button"
                aria-label="Drag or click to turn the page"
                className="od-corner"
                onClick={() => {
                  if (draggedRef.current) return;
                  seekRef.current(Math.min(chapter + 1, PAGES.length));
                }}
              >
                <span
                  data-od="corner-hint"
                  className="od-hand absolute bottom-3 right-3 flex items-center gap-1 text-[0.95rem] text-[var(--od-ink-soft)]"
                >
                  <Hand className="h-3.5 w-3.5" />
                  drag
                </span>
              </button>

              {/* Finale */}
              <div data-od="finale" className="od-finale">
                <div className="relative">
                  {[...Array(HEART_COUNT)].map((_, i) => (
                    <HeartShape
                      key={i}
                      data-od="heart"
                      className="od-heart"
                      fill={HEART_COLORS[i % HEART_COLORS.length]}
                    />
                  ))}
                  <p data-od="finale-line" className="od-hand text-3xl text-[var(--od-gold)]">
                    and the story keeps going…
                  </p>
                  <h3
                    data-od="finale-line"
                    className="od-story od-foil mt-1 text-[clamp(1.8rem,4.6vw,3.6rem)] font-extrabold leading-[1.05]"
                  >
                    Ten Years of Spreading Love
                  </h3>
                  <p
                    data-od="finale-line"
                    className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#f4e7ff]/85 sm:text-base"
                  >
                    Every sketch, lullaby and pocket hug from 2014 to today grew into one
                    shared dream — and it opens next in LOVE WORLD.
                  </p>
                  <div data-od="finale-line" className="pointer-events-auto mt-6 flex flex-wrap justify-center gap-3">
                    <a
                      href="#love-world"
                      className="od-story inline-flex min-h-[46px] items-center gap-2 rounded-full bg-gradient-to-r from-[#ff4d8d] to-[var(--od-gold)] px-6 text-sm font-extrabold text-[#2a1c3f] shadow-[0_14px_30px_-12px_rgba(255,120,170,0.9)] transition-transform hover:scale-105"
                    >
                      <Sparkles className="h-4 w-4" />
                      Step into LOVE WORLD
                    </a>
                    <button
                      type="button"
                      onClick={() => seekRef.current(0)}
                      className="od-story inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[var(--od-gold)]/50 px-6 text-sm font-bold text-[#fff6e2] transition-colors hover:bg-white/10"
                    >
                      <BookOpen className="h-4 w-4" />
                      Read from Chapter 01
                    </button>
                  </div>
                </div>
              </div>

              {/* Cover board */}
              <div data-od="cover" className="od-cover">
                <div className="od-cover-grain" />
                <CoverFrame className="absolute inset-0 h-full w-full" />
                <div className="relative grid h-full place-items-center px-8 text-center">
                  <div>
                    <CoverCrest className="mx-auto h-20 w-20 sm:h-24 sm:w-24" />
                    <p className="od-hand mt-2 text-xl text-[var(--od-gold)] sm:text-2xl">
                      a storybook in ten chapters of wonder
                    </p>
                    <h2
                      data-od="cover-title"
                      className="od-story od-foil mt-1 text-[clamp(1.9rem,5.4vw,4.4rem)] font-extrabold leading-[0.98]"
                    >
                      {'The 10-Year Creative Odyssey'.split(' ').map((w) => (
                        <span key={w} className="od-cover-word mr-[0.28em] inline-block">
                          {w}
                        </span>
                      ))}
                    </h2>
                    <p
                      data-od="cover-hint"
                      className="od-story mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--od-gold)]/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#ffe9a8]"
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      scroll to open the book
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter rail */}
          <nav ref={railRef} data-od="rail" className="od-rail" aria-label="Story chapters">
            <span ref={pillRef} className="od-chip-pill" />
            {PAGES.map((page, i) => (
              <button
                key={page.id}
                type="button"
                className="od-chip"
                aria-current={chapter === i}
                onClick={() => seekRef.current(i)}
              >
                {page.year}
              </button>
            ))}
            <button
              type="button"
              className="od-chip"
              aria-current={chapter >= PAGES.length}
              onClick={() => seekRef.current(PAGES.length)}
              aria-label="Jump to the finale"
            >
              ♥
            </button>
          </nav>

          {/* Velvet curtains — open on the first scroll */}
          <div data-od="curtain-l" className="od-curtain od-curtain--l" />
          <div data-od="curtain-r" className="od-curtain od-curtain--r" />

          <div className="od-vignette" />
          <div className="od-grain" />
        </div>
      </div>

      <div className="od-scrim od-scrim--bottom" />
    </section>
  );
};

const OdysseyHeading: React.FC = () => (
  <header className="text-center">
    <p className="od-hand text-2xl text-[var(--od-gold)]">a storybook in ten chapters of wonder</p>
    <h2 className="od-story od-foil text-[clamp(2rem,5vw,3.6rem)] font-extrabold leading-tight">
      The 10-Year Creative Odyssey
    </h2>
  </header>
);
