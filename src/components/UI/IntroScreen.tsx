import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroScreenProps {
  isVisible: boolean;
  onSkip?: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ isVisible, onSkip }) => {
  const [phase, setPhase] = useState(0);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const FALLBACK_DURATION = 8000; // Auto skip after 8 seconds

  const handleUnlock = React.useCallback(() => {
    setPhase((currentPhase) => {
      if (currentPhase === 3) return currentPhase;
      if (navigator.vibrate) navigator.vibrate(30);
      
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);

      setTimeout(() => {
        if (onSkip) onSkip();
      }, 1000); // 1s fade to menu
      
      return 3;
    });
  }, [onSkip]);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setPhase(1), 800);   // Show brand
      setTimeout(() => setPhase(2), 2000);  // Show enter text

      fallbackTimerRef.current = setTimeout(() => {
        handleUnlock();
      }, FALLBACK_DURATION);
    }

    return () => {
      if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    };
  }, [isVisible, handleUnlock]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black select-none touch-none"
        >
          {/* Subtle vignette/glow background */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 3 ? 0 : 1 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(30,22,10,0.8) 0%, rgba(0,0,0,1) 80%)'
            }}
          />

          <div className="relative z-20 flex flex-col items-center justify-center px-6 text-center h-full w-full" onClick={handleUnlock}>
            
            {/* Minimalist Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
              animate={phase >= 1 ? (phase === 3 ? { opacity: 0, y: -20, filter: 'blur(10px)' } : { opacity: 1, y: 0, filter: 'blur(0px)' }) : {}}
              transition={{ duration: 2.5, ease: 'easeOut' }}
              className="font-display font-medium text-gold-300 tracking-[0.6em] mb-6 uppercase"
              style={{ fontSize: 'clamp(0.6rem, 2vw, 0.8rem)' }}
            >
              Premium Lounge
            </motion.div>

            {/* Elegant Main Logo */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
              animate={phase >= 1 ? (phase === 3 ? { opacity: 0, scale: 1.1, filter: 'blur(20px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }) : {}}
              transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
              className="font-brand font-normal leading-none relative z-10 mb-20"
              style={{
                fontSize: 'clamp(4.5rem, 18vw, 8rem)',
                background: 'linear-gradient(180deg, #FFFFFF 0%, #E8D385 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 4px 20px rgba(232,211,133,0.3))',
                letterSpacing: '0.02em',
              }}
            >
              Hürrem
            </motion.h1>

            {/* Tap to Enter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? (phase === 3 ? { opacity: 0 } : { opacity: 1 }) : {}}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="absolute bottom-24 flex flex-col items-center justify-center cursor-pointer"
            >
              {/* Subtle pulsing line */}
              <motion.div 
                animate={{ height: ['0px', '40px', '0px'], opacity: [0, 0.8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-[1px] bg-gold-400 mb-6"
              />
              
              <p className="font-display font-medium uppercase tracking-[0.3em] text-xs md:text-[11px] text-gold-200 px-8 py-3 rounded-full border border-gold-500/30 bg-black/40 backdrop-blur-md shadow-[0_0_15px_rgba(232,211,133,0.15)] transition-all duration-700 hover:border-gold-500/60 hover:bg-black/60">
                Tap to Enter
              </p>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;
