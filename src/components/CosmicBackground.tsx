'use client';

import { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────
//  CONSTANTS
// ─────────────────────────────────────────────────────────────────

const BG           = '#000008';
const STAR_COUNT   = 500;
const DUST_COUNT   = 160;
const NEBULA_COUNT = 5;
const MAX_BH       = 2;       // black holes alive at once
const BH_SPAWN_MS  = 14000;   // avg ms between black hole births
const BH_LIFE_MS   = 20000;   // how long a black hole lives
const SS_MIN_MS    = 2500;    // min ms between shooting stars
const SS_MAX_MS    = 7000;    // max ms between shooting stars

// Palette — all blues, no warm tones
const SKY   = [78,  164, 204] as const;
const CLOUD = [212, 228, 240] as const;
const MIST  = [78,  106, 156] as const;
const SLATE = [26,   63, 117] as const;

const NEBULA_COLORS: Array<[number,number,number]> = [
  [20,  40, 110],  // deep indigo
  [10,  70, 120],  // ocean blue
  [35,  20, 90],   // violet
  [15,  90, 110],  // deep teal
  [50,  30, 130],  // midnight purple
];

// ─────────────────────────────────────────────────────────────────
//  INTERFACES
// ─────────────────────────────────────────────────────────────────

interface Star {
  x: number; y: number; r: number;
  base: number; alpha: number;
  phase: number; phaseSpd: number;
  sky: boolean;
}

interface Dust {
  x: number; y: number;
  vx: number; vy: number;
  r: number; alpha: number; base: number;
  sky: boolean;
}

interface Nebula {
  x: number; y: number;
  rx: number; ry: number;  // radii of the soft blob
  vx: number; vy: number;
  color: [number,number,number];
  base: number; alpha: number;
  phase: number; phaseSpd: number;
  resonance: number;  // extra brightness triggered by shooting stars
}

interface RingParticle {
  angle: number; radius: number; speed: number;
  size: number; alpha: number;
}

interface BlackHole {
  id: number;
  x: number; y: number;
  r: number; maxR: number;
  age: number; life: number;
  growT: number; dieT: number;
  pull: number;
  rot: number;
  ring: RingParticle[];
  dying: boolean;
}

interface ShootingStar {
  x: number; y: number;
  vx: number; vy: number;
  len: number; alpha: number;
  r: number; g: number; b: number;
  age: number; life: number;
}

// ─────────────────────────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────────────────────────

const rnd  = () => Math.random();
const rng  = (a: number, b: number) => a + rnd() * (b - a);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function initStars(W: number, H: number): Star[] {
  return Array.from({ length: STAR_COUNT }, () => {
    const base = rng(0.08, 0.55);
    return {
      x: rnd() * W, y: rnd() * H,
      r: rng(0.15, 1.3),
      base, alpha: base,
      phase: rnd() * Math.PI * 2,
      phaseSpd: rng(0.002, 0.009),
      sky: rnd() < 0.06,
    };
  });
}

function initDust(W: number, H: number): Dust[] {
  return Array.from({ length: DUST_COUNT }, () => {
    const base = rng(0.15, 0.55);
    return {
      x: rnd() * W, y: rnd() * H,
      vx: rng(-0.12, 0.12), vy: rng(-0.09, 0.09),
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
      vx: rng(-0.05, 0.05), vy: rng(-0.04, 0.04),
      color: NEBULA_COLORS[i % NEBULA_COLORS.length],
      base, alpha: base,
      phase: rnd() * Math.PI * 2,
      phaseSpd: rng(0.0005, 0.002),
      resonance: 0,
    };
  });
}

function spawnBH(W: number, H: number, id: number): BlackHole {
  const maxR = rng(40, 90);
  const ring: RingParticle[] = Array.from({ length: 60 }, (_, i) => ({
    angle: (Math.PI * 2 * i) / 60,
    radius: rng(maxR * 0.9, maxR * 1.6),
    speed: rng(0.006, 0.018) * (rnd() < 0.5 ? 1 : -1),
    size: rng(0.5, 2.2),
    alpha: rng(0.3, 0.9),
  }));
  return {
    id, x: rng(W * 0.15, W * 0.85), y: rng(H * 0.15, H * 0.85),
    r: 0, maxR,
    age: 0, life: rng(BH_LIFE_MS * 0.8, BH_LIFE_MS * 1.2),
    growT: rng(2500, 4500), dieT: rng(3000, 5000),
    pull: rng(18, 40),
    rot: 0,
    ring,
    dying: false,
  };
}

function spawnSS(W: number, H: number): ShootingStar {
  // Start from a random edge
  const edge = Math.floor(rnd() * 4);
  let x = 0, y = 0;
  let vx = rng(4, 9), vy = rng(2, 6);
  if (edge === 0) { x = rnd() * W; y = -10; vy = Math.abs(vy); }
  else if (edge === 1) { x = W + 10; y = rnd() * H; vx = -Math.abs(vx); }
  else if (edge === 2) { x = rnd() * W; y = H + 10; vy = -Math.abs(vy); }
  else { x = -10; y = rnd() * H; vx = Math.abs(vx); }
  const [r, g, b] = rnd() < 0.3 ? SKY : CLOUD;
  return {
    x, y, vx, vy,
    len: rng(80, 200),
    alpha: rng(0.7, 1.0),
    r, g, b,
    age: 0, life: rng(400, 900),
  };
}

// ─────────────────────────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────────────────────────

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
    let bhs:     BlackHole[]    = [];
    let shots:   ShootingStar[] = [];
    let bhId     = 0;
    let lastBH   = 0;
    let nextBH   = rng(BH_SPAWN_MS * 0.5, BH_SPAWN_MS * 1.2);
    let lastSS   = 0;
    let nextSS   = rng(SS_MIN_MS, SS_MAX_MS);
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
      const dt = Math.min(now - lastTime, 50); // cap at 50ms
      lastTime = now;

      // ── Spawn events ────────────────────────────────────────
      if (now - lastBH > nextBH && bhs.length < MAX_BH) {
        bhs.push(spawnBH(W, H, bhId++));
        lastBH = now;
        nextBH = rng(BH_SPAWN_MS * 0.7, BH_SPAWN_MS * 1.5);
      }
      if (now - lastSS > nextSS) {
        shots.push(spawnSS(W, H));
        lastSS = now;
        nextSS = rng(SS_MIN_MS, SS_MAX_MS);
      }

      // ── Background ──────────────────────────────────────────
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      // ── Nebulae (drawn first, behind everything) ─────────────
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (const n of nebulae) {
        n.phase += n.phaseSpd;
        n.x += n.vx; n.y += n.vy;
        // Soft edge bounce
        if (n.x - n.rx < -n.rx * 0.5) n.vx += 0.003;
        if (n.x + n.rx > W + n.rx * 0.5) n.vx -= 0.003;
        if (n.y - n.ry < -n.ry * 0.5) n.vy += 0.003;
        if (n.y + n.ry > H + n.ry * 0.5) n.vy -= 0.003;
        n.vx = clamp(n.vx, -0.08, 0.08);
        n.vy = clamp(n.vy, -0.07, 0.07);
        // Resonance decay
        n.resonance = Math.max(0, n.resonance - 0.002);
        const breathe = n.base + Math.sin(n.phase) * (n.base * 0.5);
        n.alpha = breathe + n.resonance;

        const [r, g, b] = n.color;
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, Math.max(n.rx, n.ry));
        grad.addColorStop(0,   `rgba(${r},${g},${b},${(n.alpha).toFixed(3)})`);
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

      // ── Stars ────────────────────────────────────────────────
      for (const s of stars) {
        s.phase += s.phaseSpd;
        s.alpha  = s.base + Math.sin(s.phase) * 0.15;
        const [r, g, b] = s.sky ? SKY : CLOUD;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${s.alpha.toFixed(3)})`;
        ctx.fill();
      }

      // ── Dust (physics + render) ──────────────────────────────
      for (const d of dust) {
        // Black hole gravity
        for (const bh of bhs) {
          if (bh.r < 2) continue;
          const dx = bh.x - d.x;
          const dy = bh.y - d.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const influence = bh.r * 5;
          if (dist < influence) {
            const strength = (bh.pull / (dist * dist)) * dt * 0.04;
            d.vx += (dx / dist) * strength;
            d.vy += (dy / dist) * strength;
            // Consumed by black hole
            if (dist < bh.r * 0.6) {
              d.x = rnd() * W;
              d.y = rnd() * H;
              d.vx = rng(-0.12, 0.12);
              d.vy = rng(-0.09, 0.09);
            }
          }
        }
        // Velocity damping
        d.vx *= 0.998;
        d.vy *= 0.998;
        d.x += d.vx;
        d.y += d.vy;
        // Wrap
        if (d.x < 0)  d.x = W;
        if (d.x > W)  d.x = 0;
        if (d.y < 0)  d.y = H;
        if (d.y > H)  d.y = 0;
        const [r, g, b] = d.sky ? SKY : MIST;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${d.alpha.toFixed(3)})`;
        ctx.fill();
      }

      // ── Black holes ──────────────────────────────────────────
      for (let i = bhs.length - 1; i >= 0; i--) {
        const bh = bhs[i];
        bh.age += dt;
        bh.rot += 0.003;

        // Phase: grow → stable → die
        const stableStart = bh.growT;
        const dieStart    = bh.life - bh.dieT;

        if (bh.age < stableStart) {
          bh.r = lerp(0, bh.maxR, bh.age / stableStart);
        } else if (bh.age < dieStart) {
          bh.r = bh.maxR;
          bh.dying = false;
        } else {
          bh.dying = true;
          const t = (bh.age - dieStart) / bh.dieT;
          bh.r = lerp(bh.maxR, 0, clamp(t, 0, 1));
        }

        if (bh.age > bh.life) {
          bhs.splice(i, 1);
          continue;
        }

        const visR = bh.r;
        if (visR < 0.5) continue;

        // Outer diffuse glow
        const outerGlow = ctx.createRadialGradient(bh.x, bh.y, visR, bh.x, bh.y, visR * 4.5);
        const [sr, sg, sb] = SKY;
        outerGlow.addColorStop(0,   `rgba(${sr},${sg},${sb},0.06)`);
        outerGlow.addColorStop(0.5, `rgba(${sr},${sg},${sb},0.02)`);
        outerGlow.addColorStop(1,   `rgba(${sr},${sg},${sb},0)`);
        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(bh.x, bh.y, visR * 4.5, 0, Math.PI * 2);
        ctx.fill();

        // Accretion disk ring particles
        for (const p of bh.ring) {
          p.angle += p.speed * (dt / 16);
          const ellipseA = visR * 1.5;
          const ellipseB = ellipseA * 0.45;
          const px = bh.x + Math.cos(p.angle + bh.rot) * ellipseA;
          const py = bh.y + Math.sin(p.angle + bh.rot) * ellipseB;
          // Brightness based on proximity to event horizon
          const proximity = 1 - clamp((p.radius - visR) / (visR * 2), 0, 1);
          const [cr, cg, cb] = proximity > 0.6 ? CLOUD : (proximity > 0.3 ? SKY : MIST);
          const ringAlpha = p.alpha * proximity * (bh.dying ? Math.max(0, 1 - (bh.age - (bh.life - bh.dieT)) / bh.dieT) : 1);
          ctx.beginPath();
          ctx.arc(px, py, p.size * (0.7 + proximity * 0.8), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${ringAlpha.toFixed(3)})`;
          ctx.fill();
        }

        // Event horizon (black void)
        const horizon = ctx.createRadialGradient(bh.x, bh.y, 0, bh.x, bh.y, visR);
        horizon.addColorStop(0,   'rgba(0,0,4,1)');
        horizon.addColorStop(0.7, 'rgba(0,0,8,0.95)');
        horizon.addColorStop(1,   'rgba(0,0,12,0)');
        ctx.fillStyle = horizon;
        ctx.beginPath();
        ctx.arc(bh.x, bh.y, visR * 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Shooting stars ───────────────────────────────────────
      for (let i = shots.length - 1; i >= 0; i--) {
        const ss = shots[i];
        ss.age += dt;
        ss.x   += ss.vx * (dt / 16);
        ss.y   += ss.vy * (dt / 16);
        const t      = ss.age / ss.life;
        const fAlpha = ss.alpha * (1 - t);

        // Resonance ping to nearby nebulae
        if (ss.age < 60) {
          for (const n of nebulae) {
            const dx = n.x - ss.x, dy = n.y - ss.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < n.rx * 1.5) {
              n.resonance = Math.min(n.resonance + 0.06, 0.18);
            }
          }
        }

        if (fAlpha <= 0 || ss.age > ss.life) { shots.splice(i, 1); continue; }

        // Draw streak
        const tailX = ss.x - (ss.vx / Math.hypot(ss.vx, ss.vy)) * ss.len * (1 - t * 0.5);
        const tailY = ss.y - (ss.vy / Math.hypot(ss.vx, ss.vy)) * ss.len * (1 - t * 0.5);
        const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        grad.addColorStop(0, `rgba(${ss.r},${ss.g},${ss.b},${fAlpha.toFixed(3)})`);
        grad.addColorStop(0.3, `rgba(${ss.r},${ss.g},${ss.b},${(fAlpha * 0.4).toFixed(3)})`);
        grad.addColorStop(1, `rgba(${ss.r},${ss.g},${ss.b},0)`);
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = rng(1.2, 2.2);
        ctx.stroke();

        // Head glow
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
