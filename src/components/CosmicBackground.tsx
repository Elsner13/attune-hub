'use client';

import { useEffect, useRef } from 'react';

// ── Tuning constants ──────────────────────────────────────────────
const STAR_COUNT       = 320;
const DUST_COUNT       = 80;    // slow-drifting nebula dust motes
const SUN_RADIUS       = 28;    // core glow radius
const SUN_X_RATIO      = 0.50;
const SUN_Y_RATIO      = 0.44;

// Orbital rings: { radiusRatio, speed, tilt, count, size, color, alpha }
// radiusRatio is fraction of Math.min(w, h)
const RINGS = [
  { radiusRatio: 0.09, speed:  0.0028,  tilt: 0.18, count:  1, size: 3.4, color: [212, 228, 240] as [number,number,number], alpha: 0.9 },
  { radiusRatio: 0.15, speed:  0.0019,  tilt: 0.10, count:  2, size: 2.6, color: [180, 205, 235] as [number,number,number], alpha: 0.75 },
  { radiusRatio: 0.22, speed:  0.0013,  tilt: 0.25, count:  3, size: 2.0, color: [155, 190, 225] as [number,number,number], alpha: 0.65 },
  { radiusRatio: 0.31, speed:  0.00085, tilt: 0.08, count:  4, size: 1.6, color: [120, 160, 205] as [number,number,number], alpha: 0.55 },
  { radiusRatio: 0.40, speed:  0.00055, tilt: 0.32, count:  6, size: 1.2, color: [100, 140, 190] as [number,number,number], alpha: 0.45 },
  { radiusRatio: 0.52, speed:  0.00032, tilt: 0.15, count: 10, size: 0.9, color:  [78, 120, 175] as [number,number,number], alpha: 0.35 },
  { radiusRatio: 0.65, speed:  0.00018, tilt: 0.42, count: 18, size: 0.7, color:  [60, 100, 160] as [number,number,number], alpha: 0.25 },
];

// Colors
const BG      = '#00002A';
const SKY_R   = 78;
const SKY_G   = 164;
const SKY_B   = 204;
const CLOUD_R = 212;
const CLOUD_G = 228;
const CLOUD_B = 240;
const MIST_R  = 78;
const MIST_G  = 106;
const MIST_B  = 156;

// ── Type definitions ──────────────────────────────────────────────
interface Star {
  x: number; y: number;
  r: number;
  baseAlpha: number; alpha: number;
  phase: number; speed: number;
  isSky: boolean;
}

interface OrbitalBody {
  angle: number;
  ring: typeof RINGS[0];
  twinkle: number;
  twinkleSpeed: number;
}

interface DustMote {
  x: number; y: number;
  vx: number; vy: number;
  r: number; alpha: number;
}

// ── Init helpers ──────────────────────────────────────────────────
function initStars(w: number, h: number): Star[] {
  return Array.from({ length: STAR_COUNT }, () => {
    const baseAlpha = Math.random() * 0.45 + 0.08;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.1 + 0.15,
      baseAlpha,
      alpha: baseAlpha,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.006 + 0.001,
      isSky: Math.random() < 0.05,
    };
  });
}

function initBodies(): OrbitalBody[] {
  const bodies: OrbitalBody[] = [];
  RINGS.forEach((ring) => {
    for (let i = 0; i < ring.count; i++) {
      bodies.push({
        angle: (Math.PI * 2 * i) / ring.count,
        ring,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.004 + 0.001,
      });
    }
  });
  return bodies;
}

function initDust(w: number, h: number): DustMote[] {
  return Array.from({ length: DUST_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.08,
    vy: (Math.random() - 0.5) * 0.06,
    r: Math.random() * 1.5 + 0.5,
    alpha: Math.random() * 0.10 + 0.02,
  }));
}

// ── Component ─────────────────────────────────────────────────────
export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars:  Star[]        = [];
    let bodies: OrbitalBody[] = [];
    let dust:   DustMote[]    = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      stars  = initStars(canvas.width, canvas.height);
      dust   = initDust(canvas.width, canvas.height);
      bodies = initBodies();
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      const W      = canvas.width;
      const H      = canvas.height;
      const cx     = W * SUN_X_RATIO;
      const cy     = H * SUN_Y_RATIO;
      const minDim = Math.min(W, H);

      // Background
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // Stars
      for (const s of stars) {
        s.phase += s.speed;
        s.alpha  = s.baseAlpha + Math.sin(s.phase) * 0.12;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.isSky
          ? `rgba(${SKY_R},${SKY_G},${SKY_B},${s.alpha.toFixed(3)})`
          : `rgba(${MIST_R},${MIST_G},${MIST_B},${s.alpha.toFixed(3)})`;
        ctx.fill();
      }

      // Nebula dust
      for (const d of dust) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = W;
        if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H;
        if (d.y > H) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${SKY_R},${SKY_G},${SKY_B},${d.alpha.toFixed(3)})`;
        ctx.fill();
      }

      // Orbital ring paths (faint ellipses)
      for (const ring of RINGS) {
        const rx = ring.radiusRatio * minDim;
        const ry = rx * (1 - ring.tilt * 0.45);
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${MIST_R},${MIST_G},${MIST_B},0.055)`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }

      // Sun — deep outer glow
      const outerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, SUN_RADIUS * 7);
      outerGlow.addColorStop(0,   `rgba(${SKY_R},${SKY_G},${SKY_B},0.10)`);
      outerGlow.addColorStop(0.4, `rgba(${SKY_R},${SKY_G},${SKY_B},0.03)`);
      outerGlow.addColorStop(1,    'rgba(8,12,15,0)');
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, SUN_RADIUS * 7, 0, Math.PI * 2);
      ctx.fill();

      // Sun — corona
      const corona = ctx.createRadialGradient(cx, cy, 0, cx, cy, SUN_RADIUS * 2.5);
      corona.addColorStop(0,   `rgba(${CLOUD_R},${CLOUD_G},${CLOUD_B},0.95)`);
      corona.addColorStop(0.3, `rgba(${SKY_R},${SKY_G},${SKY_B},0.55)`);
      corona.addColorStop(0.7, `rgba(${SKY_R},${SKY_G},${SKY_B},0.12)`);
      corona.addColorStop(1,    'rgba(8,12,15,0)');
      ctx.fillStyle = corona;
      ctx.beginPath();
      ctx.arc(cx, cy, SUN_RADIUS * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Orbital bodies
      for (const body of bodies) {
        body.angle   += body.ring.speed;
        body.twinkle += body.twinkleSpeed;

        const rx    = body.ring.radiusRatio * minDim;
        const ry    = rx * (1 - body.ring.tilt * 0.45);
        const bx    = cx + Math.cos(body.angle) * rx;
        const by    = cy + Math.sin(body.angle) * ry;
        const pulse = 0.85 + Math.sin(body.twinkle) * 0.15;
        const alpha = body.ring.alpha * pulse;
        const [r, g, b] = body.ring.color;

        // Body glow halo
        const glowR = body.ring.size * 3.8;
        const glow  = ctx.createRadialGradient(bx, by, 0, bx, by, glowR);
        glow.addColorStop(0, `rgba(${r},${g},${b},${(alpha * 0.35).toFixed(3)})`);
        glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(bx, by, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Body core
        ctx.beginPath();
        ctx.arc(bx, by, body.ring.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`;
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
