import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import { useConcept } from '../../context/ConceptContext';

export default function BrandHeader() {
  const { t } = useLanguage();
  const { concept } = useConcept();


  return (
    <header className="text-center relative z-20 pt-10 pb-6">
      {/* Ambient silk background */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[160%] h-52 pointer-events-none z-0 opacity-80 mix-blend-screen overflow-hidden">
        {/* Deep red silk */}
        <motion.div
          animate={{ y: [-12, 12, -12], rotateZ: [-4, 4, -4], scaleX: [1, 1.08, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-24 rounded-[100%] blur-[28px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(139,0,0,0.5), transparent)' }}
        />
        {/* Gold silk overlay */}
        <motion.div
          animate={{ y: [8, -18, 8], rotateZ: [2, -3, 2], scaleX: [1.08, 0.92, 1.08] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-6 left-1/2 -translate-x-1/2 w-3/4 h-16 rounded-[100%] blur-[22px]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(197,165,90,0.15), transparent)' }}
        />
      </div>

      <div className="container-mobile relative z-10">
        {/* World Cup badge */}
        {concept === 'world-cup' && (
          <div className="absolute top-0 right-6 text-emerald-400 flex flex-col items-center animate-pulse drop-shadow-[0_0_15px_rgba(16,185,129,0.6)] z-20">
            <span className="text-[7px] font-display font-bold tracking-widest uppercase">VIP Cup</span>
          </div>
        )}

        {/* Brand mark — long press to unlock secret menu */}
        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(18px)', scale: 0.92 }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center gap-0 relative select-none"
        >
          {/* Script wordmark */}
          <motion.span
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.8, delay: 0.2, ease: 'easeOut' }}
            className="font-brand font-normal leading-none select-none"
            style={{
              fontSize: 'clamp(3rem, 12vw, 4.5rem)',
              background: 'linear-gradient(135deg, hsl(43,55%,45%) 0%, hsl(43,75%,70%) 45%, hsl(43,50%,50%) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.9))',
              letterSpacing: '0.02em',
            }}
          >
            Hürrem
          </motion.span>

          {/* SULTAN — widely spaced caps with bottom border */}
          <motion.div
            initial={{ opacity: 0, letterSpacing: '0.05em' }}
            animate={{ opacity: 1, letterSpacing: '0.52em' }}
            transition={{ duration: 2.5, delay: 0.5, ease: 'easeOut' }}
            className="relative font-display font-light theme-text-muted mt-0.5 pb-2 will-change-[opacity]"
            style={{ fontSize: 'clamp(0.7rem, 3vw, 0.9rem)', opacity: 0.75 }}
          >
            SULTAN
            {/* Ultra-thin bottom rule */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.8, delay: 1.2, ease: 'easeInOut' }}
              className="absolute -bottom-0 left-0 right-0 h-px origin-center"
              style={{ background: 'linear-gradient(90deg, transparent, var(--border-gold), transparent)' }}
            />
          </motion.div>
        </motion.div>

          {/* Diamond establishment line */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8, delay: 1.4, ease: 'easeOut' }}
            className="mt-5 flex items-center justify-center gap-2"
          >
            {/* Left line */}
            <div className="h-px w-10 opacity-40" style={{ background: 'linear-gradient(90deg, transparent, var(--theme-accent))' }} />
            <div className="theme-text-muted" style={{ fontSize: '6px', letterSpacing: '0.1em', opacity: 0.5 }}>◆</div>
            {/* Tagline */}
            <span
              className="font-body font-light uppercase theme-text-muted"
              style={{ fontSize: 'clamp(0.48rem, 1.8vw, 0.58rem)', letterSpacing: '0.28em', opacity: 0.6 }}
            >
              {t('tagline')}
            </span>
            <div className="theme-text-muted" style={{ fontSize: '6px', letterSpacing: '0.1em', opacity: 0.5 }}>◆</div>
            {/* Right line */}
            <div className="h-px w-10 opacity-40" style={{ background: 'linear-gradient(90deg, var(--theme-accent), transparent)' }} />
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.9 }}
            className="flex items-center justify-center gap-1.5 mt-2"
          >
            <MapPin className="w-2.5 h-2.5 theme-text-muted opacity-50" />
            <span className="font-body theme-text-muted opacity-50" style={{ fontSize: '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              Berlin · Kreuzberg
            </span>
          </motion.div>
      </div>
    </header>
  );
}
