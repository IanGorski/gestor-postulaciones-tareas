import React from 'react';
import "../../styles/animatedBackground.css";

function AnimatedBackground({ speed = 1 }) {
  return (
    <div className="animated-bg" style={{ '--bg-speed': speed }}>
      <svg className="dog1 animated-dog" viewBox="0 0 64 64" fill="none">
        {/* ...SVG shapes... */}
        <ellipse cx="32" cy="48" rx="20" ry="10" fill="#e0b0ff" opacity=".2" />
        <circle cx="32" cy="32" r="18" fill="#a87bc7" />
        <ellipse cx="24" cy="28" rx="6" ry="8" fill="#fff" />
        <ellipse cx="40" cy="28" rx="6" ry="8" fill="#fff" />
        <ellipse cx="24" cy="28" rx="3" ry="4" fill="#734a91" />
        <ellipse cx="40" cy="28" rx="3" ry="4" fill="#734a91" />
        <ellipse cx="32" cy="40" rx="7" ry="4" fill="#fff" />
        <ellipse cx="32" cy="42" rx="3" ry="2" fill="#734a91" />
      </svg>
      <svg className="dog2 animated-dog" viewBox="0 0 48 48" fill="none">
        {/* ...SVG shapes... */}
        <ellipse cx="24" cy="36" rx="14" ry="7" fill="#e0b0ff" opacity=".2" />
        <circle cx="24" cy="24" r="14" fill="#a87bc7" />
        <ellipse cx="17" cy="19" rx="4" ry="5" fill="#fff" />
        <ellipse cx="31" cy="19" rx="4" ry="5" fill="#fff" />
        <ellipse cx="17" cy="19" rx="2" ry="2.5" fill="#734a91" />
        <ellipse cx="31" cy="19" rx="2" ry="2.5" fill="#734a91" />
        <ellipse cx="24" cy="30" rx="5" ry="3" fill="#fff" />
        <ellipse cx="24" cy="32" rx="2" ry="1.5" fill="#734a91" />
      </svg>
      <svg className="dog3 animated-dog" viewBox="0 0 56 56" fill="none">
        {/* ...SVG shapes... */}
        <ellipse cx="28" cy="42" rx="12" ry="6" fill="#e0b0ff" opacity=".2" />
        <circle cx="28" cy="28" r="12" fill="#a87bc7" />
        <ellipse cx="22" cy="24" rx="3" ry="4" fill="#fff" />
        <ellipse cx="34" cy="24" rx="3" ry="4" fill="#fff" />
        <ellipse cx="22" cy="24" rx="1.5" ry="2" fill="#734a91" />
        <ellipse cx="34" cy="24" rx="1.5" ry="2" fill="#734a91" />
        <ellipse cx="28" cy="34" rx="4" ry="2" fill="#fff" />
        <ellipse cx="28" cy="36" rx="1.5" ry="1" fill="#734a91" />
      </svg>
      <svg className="hummingbird1 animated-hummingbird" viewBox="0 0 40 40" fill="none">
        {/* ...SVG shapes... */}
        <ellipse cx="20" cy="34" rx="8" ry="3" fill="#e0b0ff" opacity=".2" />
        <ellipse cx="20" cy="20" rx="7" ry="6" fill="#a87bc7" />
        <ellipse cx="14" cy="16" rx="3" ry="1.5" fill="#f1d7ff" />
        <ellipse cx="26" cy="16" rx="3" ry="1.5" fill="#f1d7ff" />
        <ellipse cx="20" cy="24" rx="4" ry="2" fill="#fff" />
        <ellipse cx="20" cy="20" rx="1.5" ry="1.5" fill="#734a91" />
        <rect x="18.5" y="7" width="3" height="7" rx="1.5" fill="#734a91" />
      </svg>
      <svg className="hummingbird2 animated-hummingbird" viewBox="0 0 32 32" fill="none">
        {/* ...SVG shapes... */}
        <ellipse cx="16" cy="27" rx="6" ry="2.5" fill="#e0b0ff" opacity=".2" />
        <ellipse cx="16" cy="16" rx="5" ry="4" fill="#a87bc7" />
        <ellipse cx="11" cy="13" rx="2" ry="1" fill="#f1d7ff" />
        <ellipse cx="21" cy="13" rx="2" ry="1" fill="#f1d7ff" />
        <ellipse cx="16" cy="20" rx="3" ry="1.5" fill="#fff" />
        <ellipse cx="16" cy="16" rx="1" ry="1" fill="#734a91" />
        <rect x="15" y="5" width="2" height="5" rx="1" fill="#734a91" />
      </svg>
      <svg className="hummingbird3 animated-hummingbird" viewBox="0 0 36 36" fill="none">
        {/* ...SVG shapes... */}
        <ellipse cx="18" cy="30" rx="7" ry="2.5" fill="#e0b0ff" opacity=".2" />
        <ellipse cx="18" cy="18" rx="6" ry="5" fill="#a87bc7" />
        <ellipse cx="13" cy="15" rx="2.5" ry="1.2" fill="#f1d7ff" />
        <ellipse cx="23" cy="15" rx="2.5" ry="1.2" fill="#f1d7ff" />
        <ellipse cx="18" cy="22" rx="3.5" ry="1.5" fill="#fff" />
        <ellipse cx="18" cy="18" rx="1.2" ry="1.2" fill="#734a91" />
        <rect x="16.2" y="6" width="2.5" height="6" rx="1.2" fill="#734a91" />
      </svg>
    </div>
  );
}

export default AnimatedBackground;
