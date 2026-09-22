/* Hallmark · component: rainbow-space-trail · genre: playful · theme: brand-tokens
 * polish: continuous spectrum stroke · softer dust · stronger bloom
 */
import React, { useEffect, useRef } from 'react';
import { isReducedMotion } from '../lib/motion';

/** Spectral 7-band rainbow — continuous ROYGBIV order (brand hues as hex). */
const RAINBOW = [
  '#FF4D6A', // red
  '#FF8C3A', // orange
  '#FFD60A', // yellow
  '#2FD197', // green
  '#38B6FF', // blue
  '#845EC2', // violet
  '#FF5E9A', // pink
] as const;

interface Point {
  x: number;
  y: number;
}

interface Diamond {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rot: number;
  rotSpeed: number;
  life: number;
  maxLife: number;
  color: string;
}

const MAX_POINTS = 18;
const MAX_DIAMONDS = 120;
const IDLE_MS = 90;
const FADE_IN = 0.14;
const FADE_OUT = 0.07;
/** Sample step along path — short overlaps kill visible segment joints */
const STROKE_STEP = 2.2;

interface RainbowSpaceTrailProps {
  active: boolean;
}

/**
 * Cursor-following rainbow space trail: continuous spectrum stroke + soft dust.
 * Opt-in via `active`. Respects prefers-reduced-motion.
 */
export const RainbowSpaceTrail: React.FC<RainbowSpaceTrailProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active || isReducedMotion()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const points: Point[] = [];
    const diamonds: Diamond[] = [];
    const tip = { x: -9999, y: -9999 };
    const mouse = { x: -9999, y: -9999 };
    let hasPointer = false;
    let raf = 0;
    let lastSpawn = 0;
    let lastActivity = 0;
    let visibility = 0;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      const moved = Math.hypot(e.clientX - mouse.x, e.clientY - mouse.y);
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!hasPointer) {
        tip.x = mouse.x;
        tip.y = mouse.y;
        hasPointer = true;
      }
      if (moved > 0.5) lastActivity = performance.now();
    };

    const onLeave = () => {
      hasPointer = false;
      lastActivity = 0;
    };

    const spawnDiamond = (x: number, y: number, burst = 1) => {
      for (let i = 0; i < burst; i++) {
        if (diamonds.length >= MAX_DIAMONDS) diamonds.shift();
        const angle = Math.random() * Math.PI * 2;
        // Scatter off the stroke so dust ≠ dots on the line
        const offset = 10 + Math.random() * 22;
        const speed = Math.random() * 1.2 + 0.15;
        diamonds.push({
          x: x + Math.cos(angle) * offset,
          y: y + Math.sin(angle) * offset,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 0.4,
          size: Math.random() * 3.5 + 1.5,
          rot: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.1,
          life: 0,
          maxLife: Math.random() * 36 + 22,
          color: RAINBOW[Math.floor(Math.random() * RAINBOW.length)],
        });
      }
    };

    const drawDiamond = (d: Diamond, alpha: number) => {
      const half = d.size / 2;
      ctx.save();
      ctx.translate(d.x, d.y);
      ctx.rotate(d.rot);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = d.color;
      ctx.beginPath();
      ctx.moveTo(0, -half);
      ctx.lineTo(half * 0.72, 0);
      ctx.lineTo(0, half);
      ctx.lineTo(-half * 0.72, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    /** Catmull-ish midpoints → denser ribbon samples without sharp corners. */
    const buildRibbon = (): Point[] => {
      if (points.length < 2) return [];
      const ribbon: Point[] = [{ ...points[0] }];
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const cur = points[i];
        ribbon.push({
          x: (prev.x + cur.x) / 2,
          y: (prev.y + cur.y) / 2,
        });
        ribbon.push({ ...cur });
      }
      return ribbon;
    };

    const drawTrail = (vis: number) => {
      const ribbon = buildRibbon();
      if (ribbon.length < 2 || vis < 0.01) return;

      // Cumulative length for continuous spectrum mapping
      const lens: number[] = [0];
      let total = 0;
      for (let i = 1; i < ribbon.length; i++) {
        total += Math.hypot(ribbon[i].x - ribbon[i - 1].x, ribbon[i].y - ribbon[i - 1].y);
        lens.push(total);
      }
      if (total < 1) return;

      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalCompositeOperation = 'source-over';
      ctx.shadowBlur = 0;

      // Spectrum core only — no bloom / underglow / white halo
      let walked = 0;
      let seg = 1;
      let px = ribbon[0].x;
      let py = ribbon[0].y;

      while (walked < total) {
        const nextDist = Math.min(walked + STROKE_STEP, total);
        while (seg < ribbon.length && lens[seg] < nextDist) seg++;
        const i1 = Math.min(ribbon.length - 1, Math.max(1, seg));
        const segStart = lens[i1 - 1];
        const segEnd = lens[i1];
        const span = Math.max(0.0001, segEnd - segStart);
        const u = (nextDist - segStart) / span;
        const nx = ribbon[i1 - 1].x + (ribbon[i1].x - ribbon[i1 - 1].x) * u;
        const ny = ribbon[i1 - 1].y + (ribbon[i1].y - ribbon[i1 - 1].y) * u;

        const t = nextDist / total;
        const alpha = (0.55 + t * 0.35) * vis;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = rainbowAt(t);
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 3.5 + t * 2.8;
        ctx.stroke();

        px = nx - (nx - px) * 0.15;
        py = ny - (ny - py) * 0.15;
        walked = nextDist;
      }

      ctx.restore();
    };

    const tick = (now: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const moving = hasPointer && now - lastActivity < IDLE_MS;
      const target = moving ? 1 : 0;
      const rate = moving ? FADE_IN : FADE_OUT;
      visibility += (target - visibility) * rate;
      if (Math.abs(target - visibility) < 0.004) visibility = target;

      if (hasPointer && moving) {
        tip.x += (mouse.x - tip.x) * 0.28;
        tip.y += (mouse.y - tip.y) * 0.28;

        const last = points[points.length - 1];
        const dx = last ? tip.x - last.x : 0;
        const dy = last ? tip.y - last.y : 0;
        const dist = Math.hypot(dx, dy);

        // Tighter point spacing → smoother ribbon, less “bead” look
        if (!last || dist > 2.2) {
          points.push({ x: tip.x, y: tip.y });
          if (points.length > MAX_POINTS) points.shift();
        }

        // Sparse soft dust — not a dotted trail
        if (dist > 2 && now - lastSpawn > 28) {
          lastSpawn = now;
          spawnDiamond(tip.x, tip.y, dist > 12 ? 2 : 1);
        }
      } else if (!moving && points.length > 0) {
        if (visibility < 0.55 || points.length > 4) points.shift();
      }

      if (visibility < 0.01) {
        points.length = 0;
        if (!moving) diamonds.length = 0;
        raf = requestAnimationFrame(tick);
        return;
      }

      drawTrail(visibility);

      ctx.save();
      ctx.globalCompositeOperation = 'source-over';
      for (let i = diamonds.length - 1; i >= 0; i--) {
        const d = diamonds[i];
        d.life++;
        if (d.life >= d.maxLife) {
          diamonds.splice(i, 1);
          continue;
        }
        d.x += d.vx;
        d.y += d.vy;
        d.vx *= 0.97;
        d.vy *= 0.97;
        d.vy -= 0.01;
        d.rot += d.rotSpeed;
        const fade = 1 - d.life / d.maxLife;
        drawDiamond(d, fade * 0.45 * visibility);
      }
      ctx.restore();

      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    document.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [active]);

  if (!active || isReducedMotion()) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 'var(--z-particle)' }}
      aria-hidden
    />
  );
};

/** Smooth continuous rainbow along t ∈ [0,1] through all 7 bands. */
function rainbowAt(t: number): string {
  const clamped = Math.min(1, Math.max(0, t));
  const scaled = clamped * (RAINBOW.length - 1);
  const i = Math.floor(scaled);
  const f = scaled - i;
  const a = RAINBOW[i];
  const b = RAINBOW[Math.min(RAINBOW.length - 1, i + 1)];
  return mixHex(a, b, f);
}

function mixHex(a: string, b: string, t: number): string {
  const parse = (hex: string) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const bl = Math.round(ab + (bb - ab) * t);
  return `rgb(${r},${g},${bl})`;
}
