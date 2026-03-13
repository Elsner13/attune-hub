'use client';

import { useEffect, useRef } from 'react';

// -----------------------------------------------------------------
//  CONSTANTS
// -----------------------------------------------------------------

const BG           = '#040E0B';
const STAR_COUNT   = 250;
const DUST_COUNT   = 60;
const NEBULA_COUNT = 2;
const SS_MIN_MS    = 2500;
const SS_MAX_MS    = 7000;

const SKY   = [160, 230, 196] as const;
const CLOUD = [240, 240, 236] as const;
const MIST  = [138, 158, 148] as const;

const NEBULA_COLORS: Array<[number,number,number]> = [
  [20,  80, 50],
  [10,  60, 45],
];

// -----------------------------------------------------------------
//  INTERFACES
// -----------------------------------------------------------------

interface Star {
  x: number; y: number; r: number;
  base: number; alpha: number;
  phase: number; phaseSpd: number;
  sky: boolean;
  heading: number;
  headingDrift: number;
  spd: number;
  layer: number;
}

interface Dust {
  x: number; y: number;
  vx: number; vy: number;
  r: number; alpha: number; base: number;
  sky: boolean;
}

interface Nebula {
  x: number; y: number;
  rx: number; ry: number;
  vx: number; vy: number;
  color: [number,number,number];
  base: number; alpha: number;
  phase: number; phaseSpd: number;
  resonance: number;
}

interface ShootingStar {
  x: number; y: number;
  vx: number; vy: number;
  len: number; alpha: number;
  r: number; g: number; b: number;
  age: number; life: number;
}

// -----------------------------------------------------------------
//  HELPERS
// -----------------------------------------------------------------

const rnd   = () => Math.random();
const rng   = (a: number, b: number) => a + rnd() * (b - a);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function initStars(W: number, H: number): Star[] {
  return Array.from({ length: STAR_COUNT }, () => {
    const layer = rnd() < 0.55 ? 0 : rnd() < 0.7 ? 1 : 2;

    const layerR    = [rng(0.12, 0.5),  rng(0.4,  0.9),  rng(0.7, 1.4)][layer];
    const layerBase = [rng(0.05, 0.25), rng(0.15, 0.45), rng(0.25, 0.6)][layer];
    // Speeds reduced by 40%
    const spd       = [rng(0.0048, 0.015), rng(0.012, 0.033), rng(0.024, 0.06)][layer];
    const headingDrift = rng(-0.003, 0.003);

    return {
      x: rnd() * W, y: rnd() * H,
      r: layerR,
      base: layerBase, alpha: layerBase,
      phase: rnd() * Math.PI * 2,
      phaseSpd: rng(0.0006, 0.0042),
      sky: rnd() < 0.05,
      heading: rnd() * Math.PI * 2,
      headingDrift,
      spd,
      layer,
    };
  });
}

function initDust(W: number, H: number): Dust[] {
  return Array.from({ length: DUST_COUNT }, () => {
    const base = rng(0.15, 0.55);
    return {
      x: rnd() * W, y: rnd() * H,
      vx: rng(-0.072, 0.072), vy: rng(-0.054, 0.054),
      r: rng(0.4, 1.8),
      alpha: base, base,
      sky: rnd() < 0.08,
    };
  });
}

function initNebulae(W: number, H: number): Nebula[] {
  return Array.from({ length: NEBULA_COUNT }, (_, i) => {
    const base = rng(0.04, 0.12);
    return {
      x: rnd() * W, y: rnd() * H,
      rx: rng(W * 0.18, W * 0.38),
      ry: rng(H * 0.15, H * 0.32),
      vx: rng(-0.03, 0.03), vy: rng(-0.024, 0.024),
      color: NEBULA_COLORS[i % NEBULA_COLORS.length],
      base, alpha: base,
      phase: rnd() * Math.PI * 2,
      phaseSpd: rng(0.0003, 0.0012),
      resonance: 0,
    };
  });
}

function spawnSS(W: number, H: number): ShootingStar {
  const edge = Math.floor(rnd() * 4);
  let x = 0, y = 0;
  let vx = rng(2.4, 5.4), vy = rng(1.2, 3.6);
  if (edge === 0)      { x = rnd() * W; y = -10;    vy =  Math.abs(vy); }
  else if (edge === 1) { x = W + 10;    y = rnd()*H; vx = -Math.abs(vx); }
  else if (edge === 2) { x = rnd() * W; y = H + 10;  vy = -Math.abs(vy); }
  else                 { x = -10;       y = rnd()*H;  vx =  Math.abs(vx); }
  const [r, g, b] = rnd() < 0.3 ? SKY : CLOUD;
  return { x, y, vx, vy, len: rng(80, 200), alpha: rng(0.7, 1.0), r, g, b, age: 0, life: rng(400, 900) };
}

// -----------------------------------------------------------------
//  COMPONENT
// -----------------------------------------------------------------

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0;
    let stars:   Star[]         = [];
    let dust:    Dust[]         = [];
    let nebulae: Nebula[]       = [];
    let shots:   ShootingStar[] = [];
    let lastSS = 0, nextSS = rng(SS_MIN_MS, SS_MAX_MS);
    let lastTime = performance.now();

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      stars   = initStars(W, H);
      dust    = initDust(W, H);
      nebulae = initNebulae(W, H);
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = (now: number) => {
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;

      // Spawns
      if (now - lastSS > nextSS) {
        shots.push(spawnSS(W, H));
        lastSS = now; nextSS = rng(SS_MIN_MS, SS_MAX_MS);
      }

      // Background
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // -- Nebulae --
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (const n of nebulae) {
        n.phase += n.phaseSpd;
        n.x += n.vx; n.y += n.vy;
        if (n.x - n.rx < -n.rx * 0.5) n.vx += 0.003;
        if (n.x + n.rx > W + n.rx * 0.5) n.vx -= 0.003;
        if (n.y - n.ry < -n.ry * 0.5) n.vy += 0.003;
        if (n.y + n.ry > H + n.ry * 0.5) n.vy -= 0.003;
        n.vx = clamp(n.vx, -0.048, 0.048);
        n.vy = clamp(n.vy, -0.042, 0.042);
        n.resonance = Math.max(0, n.resonance - 0.002);
        n.alpha = n.base + Math.sin(n.phase) * (n.base * 0.5) + n.resonance;

        const [r, g, b] = n.color;
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, Math.max(n.rx, n.ry));
        grad.addColorStop(0,   `rgba(${r},${g},${b},${n.alpha.toFixed(3)})`);
        grad.addColorStop(0.4, `rgba(${r},${g},${b},${(n.alpha * 0.5).toFixed(3)})`);
        grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);
        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.scale(1, n.ry / n.rx);
        ctx.translate(-n.x, -n.y);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.rx, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.restore();

      // -- Stars -- wander
      for (const s of stars) {
        s.phase += s.phaseSpd;
        s.alpha  = s.base + Math.sin(s.phase) * (s.base * 0.4);

        s.heading += s.headingDrift + (rnd() - 0.5) * 0.0008;

        s.x += Math.cos(s.heading) * s.spd;
        s.y += Math.sin(s.heading) * s.spd;

        if (s.x < -2) s.x = W + 2;
        if (s.x > W + 2) s.x = -2;
        if (s.y < -2) s.y = H + 2;
        if (s.y > H + 2) s.y = -2;

        const [r, g, b] = s.sky ? SKY : CLOUD;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${s.alpha.toFixed(3)})`;
        ctx.fill();
      }

      // -- Dust --
      for (const d of dust) {
        d.vx *= 0.998; d.vy *= 0.998;
        d.x += d.vx;   d.y += d.vy;
        if (d.x < 0) d.x = W;  if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H;  if (d.y > H) d.y = 0;
        const [r, g, b] = d.sky ? SKY : MIST;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${d.alpha.toFixed(3)})`;
        ctx.fill();
      }

      // -- Shooting stars --
      for (let i = shots.length - 1; i >= 0; i--) {
        const ss = shots[i];
        ss.age += dt;
        ss.x   += ss.vx * (dt / 16);
        ss.y   += ss.vy * (dt / 16);
        const t      = ss.age / ss.life;
        const fAlpha = ss.alpha * (1 - t);

        if (ss.age < 60) {
          for (const n of nebulae) {
            const dx = n.x - ss.x, dy = n.y - ss.y;
            if (Math.sqrt(dx*dx + dy*dy) < n.rx * 1.5) {
              n.resonance = Math.min(n.resonance + 0.06, 0.18);
            }
          }
        }

        if (fAlpha <= 0 || ss.age > ss.life) { shots.splice(i, 1); continue; }

        const mag  = Math.hypot(ss.vx, ss.vy);
        const tailX = ss.x - (ss.vx / mag) * ss.len * (1 - t * 0.5);
        const tailY = ss.y - (ss.vy / mag) * ss.len * (1 - t * 0.5);
        const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        grad.addColorStop(0,   `rgba(${ss.r},${ss.g},${ss.b},${fAlpha.toFixed(3)})`);
        grad.addColorStop(0.3, `rgba(${ss.r},${ss.g},${ss.b},${(fAlpha * 0.4).toFixed(3)})`);
        grad.addColorStop(1,   `rgba(${ss.r},${ss.g},${ss.b},0)`);
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        const headGlow = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 6);
        headGlow.addColorStop(0, `rgba(${ss.r},${ss.g},${ss.b},${fAlpha.toFixed(3)})`);
        headGlow.addColorStop(1, `rgba(${ss.r},${ss.g},${ss.b},0)`);
        ctx.fillStyle = headGlow;
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 6, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100vw', height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
