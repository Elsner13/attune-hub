'use client';

import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Ring lerp target
  const mouse  = useRef({ x: -100, y: -100 });
  const ring   = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const dot  = dotRef.current;
    const rng  = ringRef.current;
    if (!dot || !rng) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // Dot follows instantly
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    const attachHover = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };

    document.addEventListener('mousemove', onMove);
    attachHover();

    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    // Ring lerp loop
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1);
      rng.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  const ringSize = hovered ? 56 : 36;

  return (
    <>
      {/* Dot — tracks exactly */}
      <div
        ref={dotRef}
        style={{
          position:       'fixed',
          top:            0,
          left:           0,
          width:          6,
          height:         6,
          borderRadius:   '50%',
          background:     '#ffffff',
          mixBlendMode:   'difference',
          pointerEvents:  'none',
          zIndex:         9999,
          marginLeft:     -3,
          marginTop:      -3,
          willChange:     'transform',
        }}
      />

      {/* Ring — lerps behind, expands on hover */}
      <div
        ref={ringRef}
        style={{
          position:       'fixed',
          top:            0,
          left:           0,
          width:          ringSize,
          height:         ringSize,
          borderRadius:   '50%',
          border:         '1.5px solid #ffffff',
          background:     hovered ? 'rgba(255,255,255,0.08)' : 'transparent',
          mixBlendMode:   'difference',
          pointerEvents:  'none',
          zIndex:         9998,
          marginLeft:     -(ringSize / 2),
          marginTop:      -(ringSize / 2),
          transition:     'width 0.25s cubic-bezier(0.16,1,0.3,1), height 0.25s cubic-bezier(0.16,1,0.3,1), margin 0.25s cubic-bezier(0.16,1,0.3,1), background 0.2s',
          willChange:     'transform',
        }}
      />
    </>
  );
}
