import './InteractiveHummingbird.css';
import React, { useEffect, useRef } from 'react';

function InteractiveHummingbird() {
  const ref = useRef();
  useEffect(() => {
    const move = (e) => {
      if (ref.current) {
        const x = e.clientX;
        const y = e.clientY;
        ref.current.style.transform = `translate(${x - 20}px, ${y - 20}px)`;
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <svg ref={ref} viewBox="0 0 40 40" fill="none" className="hummingbird-svg">
      <ellipse cx="20" cy="34" rx="8" ry="3" fill="#e0b0ff" opacity=".2"/>
      <ellipse cx="20" cy="20" rx="7" ry="6" fill="#a87bc7"/>
      <ellipse cx="14" cy="16" rx="3" ry="1.5" fill="#f1d7ff"/>
      <ellipse cx="26" cy="16" rx="3" ry="1.5" fill="#f1d7ff"/>
      <ellipse cx="20" cy="24" rx="4" ry="2" fill="#fff"/>
      <ellipse cx="20" cy="20" rx="1.5" ry="1.5" fill="#734a91"/>
      <rect x="18.5" y="7" width="3" height="7" rx="1.5" fill="#734a91"/>
    </svg>
  );
}

export default InteractiveHummingbird;
