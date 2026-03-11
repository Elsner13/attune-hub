'use client';

import { useEffect, useRef } from 'react';

const VOID_X_RATIO = 0.52;
const VOID_Y_RATIO = 0.42;
const VOID_RADIUS = 38;
const STAR_COUNT = 280;
const VORTEX_COUNT = 190;
const ROTATION_SPEED = 0.00018;
const INWARD_DRIFT = 0.12;

const cloud = "rgba(234, 239, 239, ";
const mist  = "rgba(191, 201, 209, ";
const sky   = "rgba(79, 195, 247, ";
const void_bg = "#080C0F";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseOpacity: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  isSky: boolean;
}

interface VortexParticle {
  angle: number;
  radius: number;
  speed: number;
  inwardDrift: number;
  size: number;
  opacity: number;
  isSky: boolean;
  isBright: boolean;
}

function initStars(w: number, h: number): Star[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    radius: Math.random() * 1.2 + 0.2,
    baseOpacity: Math.random() * 0.5 + 0.15,
    opacity: Math.random() * 0.5 + 0.15,
    twinkleSpeed: Math.random() * 0.008 + 0.002,
    twinklePhase: Math.random() * Math.PI * 2,
    isSky: Math.random() < 0.04,
  }));
}

function initVortex(w: number, h: number): VortexParticle[] {
  const maxRadius = Math.min(w, h) * 0.52;
  return Array.from({ length: VORTEX_COUNT }, () => {
    const radius = VOID_RADIUS + 20 + Math.pow(Math.random(), 0.7) * (maxRadius - VOID_RADIUS - 20);
    return {
      angle: Math.random() * Math.PI * 2,
      radius,
      speed: (1 / radius) * 18 + ROTATION_SPEED * (1 + Math.random() * 0.5),
      inwardDrift: INWARD_DRIFT * (0.5 + Math.random() * 1.0),
      size: Math.random() * 2.0 + 0.4,
      opacity: Math.random() * 0.55 + 0.2,
      isSky: Math.random() < 0.06,
      isBright: Math.random() < 0.12,
    };
  });
}

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    let vortex: VortexParticle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = initStars(canvas.width, canvas.height);
      vortex = initVortex(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      const voidX = w * VOID_X_RATIO;
      const voidY = h * VOID_Y_RATIO;
      const maxRadius = Math.min(w, h) * 0.52;

      ctx.fillStyle = void_bg;
      ctx.fillRect(0, 0, w, h);

      // Stars
      for (const star of stars) {
        star.twinklePhase += star.twinkleSpeed;
        star.opacity = star.baseOpacity + Math.sin(star.twinklePhase) * 0.15;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        const colorBase = star.isSky ? sky : (Math.random() < 0.5 ? cloud : mist);
        ctx.fillStyle = colorBase + star.opacity.toFixed(2) + ")";
        ctx.fill();
      }

      // Vortex
      for (const p of vortex) {
        p.angle += p.speed;
        p.radius -= p.inwardDrift;

        if (p.radius < VOID_RADIUS) {
          p.radius = maxRadius * (0.85 + Math.random() * 0.15);
          p.angle = Math.random() * Math.PI * 2;
          p.opacity = Math.random() * 0.55 + 0.2;
        }

        const x = voidX + Math.cos(p.angle) * p.radius;
        const y = voidY + Math.sin(p.angle) * p.radius * 0.72;
        const sizeMult = p.isBright ? 1.8 : 1.0;
        const opacityMult = p.isBright ? 1.3 : 1.0;
        const finalOpacity = Math.min(p.opacity * opacityMult, 1);

        ctx.beginPath();
        ctx.arc(x, y, p.size * sizeMult, 0, Math.PI * 2);
        const colorBase = p.isSky ? sky : (p.isBright ? cloud : mist);
        ctx.fillStyle = colorBase + finalOpacity.toFixed(2) + ")";
        ctx.fill();
      }

      // Void shadow
      const gradient = ctx.createRadialGradient(voidX, voidY, 0, voidX, voidY, VOID_RADIUS * 2.2);
      gradient.addColorStop(0, "rgba(8, 12, 15, 1)");
      gradient.addColorStop(0.5, "rgba(8, 12, 15, 0.7)");
      gradient.addColorStop(1, "rgba(8, 12, 15, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(voidX, voidY, VOID_RADIUS * 2.2, 0, Math.PI * 2);
      ctx.fill();

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
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
