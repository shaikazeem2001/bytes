import React from 'react';
import defaultHero from '../../assets/login_hero.jpeg';

export const GalaxyPanel = ({ imageSrc = defaultHero }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '540px',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.85)',
        backgroundColor: '#000000',
      }}
    >
      {/* 1. Base Image with Live Cosmic Panning Animation */}
      <img
        src={imageSrc}
        alt="Cosmic Visual"
        className="animate-cosmic-pan"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          filter: 'brightness(0.95) contrast(1.15) saturate(1.2)',
          willChange: 'transform',
        }}
      />

      {/* 2. Live Moving Color Nebula Layer 1 (Cyan / Violet / Magenta) */}
      <div
        className="animate-nebula-1"
        style={{
          position: 'absolute',
          top: '-40%',
          left: '-40%',
          width: '180%',
          height: '180%',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.45) 0%, rgba(6, 182, 212, 0.35) 40%, rgba(236, 72, 153, 0.25) 70%, rgba(0,0,0,0) 90%)',
          mixBlendMode: 'color-dodge',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* 3. Live Moving Color Nebula Layer 2 (Electric Blue / Amber) */}
      <div
        className="animate-nebula-2"
        style={{
          position: 'absolute',
          bottom: '-30%',
          right: '-30%',
          width: '160%',
          height: '160%',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(245, 158, 11, 0.2) 50%, rgba(126, 34, 206, 0.3) 80%, rgba(0,0,0,0) 100%)',
          mixBlendMode: 'overlay',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* 4. Shimmer Sweep Light Animation */}
      <div
        className="animate-shimmer-sweep"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '40%',
          height: '100%',
          background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
