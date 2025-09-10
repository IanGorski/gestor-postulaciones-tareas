import './ParticlesBackground.css';
import React, { useMemo } from 'react';
import '../../styles/particles.css';

function ParticlesBackground({ density = 5, speed = 1 }) {
  // Limitar partículas en móviles y reducir movimiento si el usuario lo prefiere de esa forma
  const isMobile = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 600px)').matches;
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const effectiveDensity = prefersReducedMotion ? 0 : Math.max(0, Math.min(80, isMobile ? Math.min(density, 12) : density));
  const items = useMemo(() => Array.from({ length: effectiveDensity }), [effectiveDensity]);
  const colors = useMemo(() => ['#a87bc7', '#e0b0ff', '#734a91', '#f1d7ff', '#b49ad2'], []);
  const scale = 1 / (speed || 1);
  if (prefersReducedMotion || effectiveDensity === 0) return null;
  return (
    <div className="particles-bg" style={{ '--anim-scale': scale }}>
      {items.map((_, i) => (
        <div
          key={i}
          className={`particle dyn dyn-${(i % 5) + 1}`}
          style={{
            left: `${(i * 13) % 100}vw`,
            top: `${(i * 23) % 100}vh`,
            width: 8 + (i % 4) * 4,
            height: 8 + (i % 4) * 4,
            backgroundColor: colors[i % colors.length],
            animationDelay: `${(i % 10) * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

export default ParticlesBackground;
