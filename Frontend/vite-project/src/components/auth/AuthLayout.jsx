import React from 'react';
import { GalaxyPanel } from '../ui/GalaxyPanel';
import logoImg from '../../assets/logo.jpeg';

export const AuthLayout = ({ children, title, subtitle, sideImage }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        className="animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '1020px',
          backgroundColor: '#09090b',
          border: '1px solid #27272a',
          borderRadius: '28px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.9)',
          padding: '12px',
          gap: '12px',
        }}
      >
        {/* Left Side: Form Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '36px 32px',
            backgroundColor: '#121215',
            borderRadius: '20px',
            border: '1px solid #1c1c21',
          }}
        >
          {/* Brand Logo Only (images/websitelogo.jpeg) - Wording removed */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '32px' }}>
            <img
              src={logoImg}
              alt="Logo"
              style={{
                height: '48px',
                maxWidth: '180px',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          </div>

          {/* Titles */}
          {title && (
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#ffffff', marginBottom: '6px' }}>
                {title}
              </h2>
              {subtitle && (
                <p style={{ fontSize: '14px', color: '#a1a1aa' }}>
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Form Content */}
          {children}
        </div>

        {/* Right Side: Visual Panel (Clean image with live color animations, no text/boxes) */}
        <div
          style={{
            display: 'flex',
            height: '100%',
          }}
        >
          <GalaxyPanel imageSrc={sideImage} />
        </div>
      </div>
    </div>
  );
};
