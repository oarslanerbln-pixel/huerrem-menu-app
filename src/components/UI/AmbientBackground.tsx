import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const AmbientBackground: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[var(--theme-bg)] transition-colors duration-500">
      {/* 
        Premium Dark Liquid Gold / Smoke effect.
        Using large blurry radial gradients that translate and rotate over long durations.
        Hidden in light/silver themes.
      */}
      <div
        className="absolute inset-0 mix-blend-screen transition-opacity duration-500"
        style={{ opacity: isDark ? 0.35 : 0 }}
      >
        <div className="ambient-blob bg-gold-600/10 w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] left-[-20%] top-[-20%] animate-blob-1" />
        <div className="ambient-blob bg-[#B8860B]/15 w-[100vw] h-[100vw] max-w-[1000px] max-h-[1000px] right-[-30%] top-[30%] animate-blob-2" />
        <div className="ambient-blob bg-gold-400/5 w-[150vw] h-[150vw] max-w-[1500px] max-h-[1500px] left-[10%] bottom-[-30%] animate-blob-3" />
      </div>
      
      {/* Subtle noise texture overlay — reduced in light/silver themes */}
      <div
        className="absolute inset-0 mix-blend-overlay pointer-events-none bg-noise transition-opacity duration-500"
        style={{ opacity: isDark ? 0.25 : 0.06 }}
      />
      
      {/* Vignette to focus attention to the center */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,var(--marble-base)_100%)] transition-[opacity,background] duration-500"
        style={{ opacity: isDark ? 0.8 : 0.25 }}
      />
    </div>
  );
};

export default AmbientBackground;
