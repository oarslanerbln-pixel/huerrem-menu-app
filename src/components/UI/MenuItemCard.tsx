import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { type MenuItem } from '../../data/menu';
import { useLanguage } from '../../i18n/LanguageContext';
import { translations } from '../../i18n/translations';
import { useConcept } from '../../context/ConceptContext';
import { getAssetUrl } from '../../utils/paths';
import { worldCupFlags } from '../../data/worldCupData';
import IceShatterEffect from './IceShatterEffect';
import { useDeviceOrientation } from '../../hooks/useDeviceOrientation';

interface MenuItemCardProps {
  item: MenuItem;
}

const INTENSITY_COLORS = [
  'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]',
  'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]',
  'bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]',
  'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]',
  'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]'
];

const INTENSITY_HEIGHTS = [
  'h-[9px]',
  'h-[12px]',
  'h-[15px]',
  'h-[18px]',
  'h-[21px]',
];

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const isSignature = item.isSignature;
  const { lang } = useLanguage();
  const { concept, cardConcept } = useConcept();
  const [isExpanded, setIsExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [isCenter, setIsCenter] = useState(false);

  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' });

  React.useEffect(() => {
    // Only apply carousel highlight on mobile viewports
    if (window.innerWidth > 768) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCenter(entry.isIntersecting);
      },
      {
        // triggers when item crosses the middle 25% of the screen
        rootMargin: '-35% 0px -40% 0px',
        threshold: 0
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const itemName = typeof item.name === 'string' ? item.name : item.name?.[lang] || item.name?.DE || '';
  const itemDesc = typeof item.description === 'string' ? item.description : item.description?.[lang] || item.description?.DE || '';

  const orientation = useDeviceOrientation();
  const parallaxX = orientation.gamma ? Math.min(Math.max(orientation.gamma / 2, -20), 20) : 0;
  const parallaxY = orientation.beta ? Math.min(Math.max((orientation.beta - 45) / 2, -20), 20) : 0;

  let articleClassName: string;
  if (cardConcept === 'layout-minimal') {
    articleClassName = `relative flex flex-row items-stretch p-0 cursor-pointer transition-all duration-700 group min-h-[130px] rounded-xl minimal-card-bg border minimal-card-border overflow-hidden shadow-md hover:shadow-xl ${isCenter ? 'carousel-active' : ''}`;
  } else if (cardConcept === 'layout-compact') {
    articleClassName = `relative flex flex-row items-center gap-3 p-3 sm:p-4 overflow-hidden cursor-pointer transition-all duration-700 group min-h-[100px] rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-white/10 hover:shadow-[0_15px_40px_rgba(197,165,90,0.15)] ${isCenter ? 'carousel-active' : ''}`;
  } else {
    articleClassName = `relative flex flex-row items-center gap-3 p-3 sm:p-4 overflow-hidden cursor-pointer transition-all duration-500 group min-h-[120px] rounded-md sm:rounded-lg theme-card backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] hover:shadow-lg ${isCenter ? 'carousel-active' : ''}`;
  }

  return (
    <>
    <motion.article
      ref={ref}
      layoutId={`card-${item.id}`}
      animate={isInView
        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
        : { opacity: 0, y: 12, filter: 'blur(6px)' }
      }
      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      whileTap={{ scale: 0.985 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={(_, { offset }) => {
        const swipe = offset.x;
        if (swipe > 75) {
          if (navigator.vibrate) navigator.vibrate(10);
        }
      }}
      onClick={() => {
        setIsExpanded(true);
        if (navigator.vibrate) navigator.vibrate(15);
      }}
      className={articleClassName}
      style={{ willChange: 'opacity, transform, filter' }}
    >
      {cardConcept === 'layout-default' && (
        <>
          {/* Golden Radiance — continuous loop */}
          <div className="absolute inset-0 opacity-25 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none z-0 animate-golden-radiance"
               style={{ background: 'linear-gradient(135deg, rgba(197,165,90,0.35) 0%, rgba(180,130,50,0.12) 30%, transparent 55%, rgba(197,165,90,0.18) 80%, rgba(220,190,100,0.3) 100%)' }} />
          <div className="absolute inset-0 rounded-md sm:rounded-lg border-t border-white/20 dark:border-white/10 pointer-events-none z-0 mix-blend-overlay" />

          {isSignature && (
            <div className="signature-accent-line z-10" />
          )}

          {item.imageUrl && !imgError && (
            <motion.div
              layoutId={`image-container-${item.id}`}
              className={`relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-sm sm:rounded-md overflow-hidden z-10 cursor-pointer group/img shadow-md ring-1 ring-black/10 ${
                item.category === 'shisha'
                  ? 'bg-gradient-to-b from-white/90 via-white/50 to-white/10'
                  : 'theme-image-card-bg backdrop-blur-md'
              }`}

              whileTap={{ scale: 0.97, rotate: -0.5 }}
            >
              {item.id === 's18' && (
                <div className="absolute inset-0 pointer-events-none z-10 mix-blend-color-dodge opacity-80 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/40 via-purple-500/40 to-fuchsia-500/40 blur-xl" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-pink-500/30 rounded-full blur-2xl" />
                </div>
              )}
              <motion.img
                src={getAssetUrl(item.imageUrl)}
                alt={itemName}
                onError={() => setImgError(true)}
                className={`relative w-full h-full transition-transform duration-[900ms] ease-out group-hover:scale-105 ${
                    item.category === 'shisha'
                      ? 'object-contain object-center mix-blend-multiply scale-90'
                      : 'object-cover object-center'
                  }`}
                loading="lazy"
              />
              <div className="absolute inset-0 z-10 pointer-events-none theme-image-gradient" />
            </motion.div>
          )}

          <div className="flex-1 flex flex-col min-w-0 py-1 pr-1 relative z-10">
            <div className="flex justify-between items-start gap-2 flex-nowrap">
              <div className="flex-1 min-w-0 pr-2">
                {item.badge && (
                  <span className="inline-block mb-1.5 text-[9px] uppercase tracking-[0.22em] font-bold px-2 py-0.5 rounded-sm theme-accent-text border theme-border backdrop-blur-md shadow-sm" style={{ backgroundColor: 'color-mix(in srgb, var(--theme-accent) 15%, transparent)' }}>
                    {typeof item.badge === 'string' ? item.badge : item.badge[lang]}
                  </span>
                )}
                <h3 className="theme-card-title flex items-center gap-2 flex-wrap leading-snug">
                  <span className="break-words min-w-0" style={{ wordBreak: 'break-word' }}>{itemName}</span>
                  {concept === 'world-cup' && worldCupFlags[item.id] && (
                    <img
                      src={`https://flagcdn.com/w40/${worldCupFlags[item.id]}.png`}
                      srcSet={`https://flagcdn.com/w80/${worldCupFlags[item.id]}.png 2x`}
                      alt={`${worldCupFlags[item.id]} flag`}
                      className="h-4 w-auto rounded-[2px] opacity-80 shrink-0"
                      title="World Cup Edition"
                    />
                  )}
                </h3>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0 pl-1">
                {item.price > 0 && (
                  <span className="price-fine-dining whitespace-nowrap" aria-label={`${item.price.toFixed(2)} Euro`}>
                    {item.price.toFixed(2).replace('.', ',')} €
                  </span>
                )}
              </div>
            </div>

            <div className="relative z-10 w-full mt-1.5">
              {isSignature && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-px bg-gold-500/40" />
                  <span className="text-gold-600/50" style={{ fontSize: '7px' }}>◆</span>
                  <div className="w-6 h-px bg-gold-500/40" />
                </div>
              )}
              <p className="font-body font-medium text-xs text-text-secondary leading-snug line-clamp-2 mt-1">{itemDesc}</p>

              {(item.allergens?.length || item.additives?.length) ? (
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.allergens?.map(a => (
                    <span key={a} className="font-display text-[9px] theme-text-muted border theme-border rounded px-1 min-w-[1rem] text-center" title="Allergen">{a}</span>
                  ))}
                  {item.additives?.map(a => (
                    <span key={a} className="font-display text-[9px] theme-text-muted border theme-border rounded px-1 min-w-[1rem] text-center" title="Zusatzstoff">{a}</span>
                  ))}
                </div>
              ) : null}

              {item.intensity !== undefined && (
                <div className="flex items-center gap-2.5 mt-3 pt-2.5 border-t border-gold-500/10 w-fit">
                  <span className="font-display text-[8px] uppercase tracking-widest text-text-tertiary">
                    {translations[lang].intensityLabel}
                  </span>
                  <div className="flex gap-[3px] items-end">
                    {[1, 2, 3, 4, 5].map((level) => {
                      const isActive = level <= item.intensity!;
                      const colorClass = isActive ? INTENSITY_COLORS[level - 1] : 'bg-gold-500/15 text-transparent';
                      const heightClass = INTENSITY_HEIGHTS[level - 1];
                      return (
                        <div
                          key={level}
                          className={`w-[4px] rounded-sm transition-all duration-300 ${colorClass.split(' ')[0]} ${heightClass} ${isActive ? 'intensity-bar active' : 'intensity-bar'}`}
                        />
                      );
                    })}
                  </div>
                  <span className="font-body text-[8px] font-medium tracking-wider uppercase ml-0.5 text-gold-600/80">
                    {item.intensity <= 2 ? translations[lang].intensityLight : item.intensity === 3 ? translations[lang].intensityMedium : translations[lang].intensityHeavy}
                  </span>
                </div>
              )}
            </div>

            {item.includes && item.includes.length > 0 && (
              <div className="flex flex-wrap gap-x-1 gap-y-0 pt-1.5 relative z-10">
                {item.includes.map((inc, i) => (
                  <span key={i} className="text-[9px] font-display font-light tracking-[0.2em] text-text-tertiary uppercase">
                    {inc}{i < item.includes!.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="card-hairline relative z-10" />
        </>
      )}

      {cardConcept === 'layout-minimal' && (
        <>
          {/* Soft Gold Shimmer — premium continuous loop */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-1500 animate-golden-radiance rounded-xl"
               style={{ background: 'linear-gradient(135deg, rgba(197,165,90,0.08) 0%, rgba(220,190,110,0.15) 25%, rgba(197,165,90,0.04) 50%, rgba(180,150,70,0.12) 75%, rgba(197,165,90,0.08) 100%)' }} />
          {/* Sweep shine line */}
          <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden rounded-xl">
            <div className="absolute top-0 left-0 w-[60%] h-full bg-gradient-to-r from-transparent via-[rgba(197,165,90,0.06)] to-transparent animate-sweep-shine" />
          </div>
          {item.imageUrl && !imgError ? (
            <motion.div
              layoutId={`image-container-${item.id}`}
              className="relative w-[100px] sm:w-[140px] flex-shrink-0 overflow-hidden z-10 cursor-pointer border-r border-gold-500/10 group/img"

              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover/img:bg-transparent transition-colors duration-700 z-10" />
              <motion.img
                src={getAssetUrl(item.imageUrl)}
                alt={itemName}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-all duration-1000 group-hover/img:scale-110 filter grayscale-[30%] group-hover/img:grayscale-0"
                loading="lazy"
              />
            </motion.div>
          ) : (
            <div className="relative w-[100px] sm:w-[140px] flex-shrink-0 minimal-card-noimg border-r minimal-card-border flex items-center justify-center">
              <span className="theme-text-muted font-display text-[10px] tracking-widest uppercase opacity-40">No Image</span>
            </div>
          )}

          <div className="flex-1 flex flex-col justify-center p-3 sm:p-5 relative z-10">
             <div className="flex justify-between items-start gap-2 mb-2">
                <h3 className="font-display text-sm sm:text-base font-light tracking-[0.15em] uppercase theme-text minimal-card-title transition-colors duration-500 leading-snug break-words min-w-0 pr-2" style={{ wordBreak: 'break-word' }}>
                  {itemName}
                </h3>
                {item.price > 0 && (
                  <span className="font-display text-sm sm:text-base font-semibold shrink-0 minimal-card-price whitespace-nowrap">
                    {item.price.toFixed(2).replace('.', ',')} €
                  </span>
                )}
             </div>
             {itemDesc && (
                <p className="font-body text-[11px] sm:text-[12px] theme-text-muted leading-relaxed line-clamp-3 font-light">
                  {itemDesc}
                </p>
             )}
          </div>
        </>
      )}

      {cardConcept === 'layout-compact' && (
        <>
          {/* Aurora Plasma — continuous fluid loop */}
          <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-70 transition-opacity duration-1000 animate-aurora-plasma"
               style={{ 
                 background: 'linear-gradient(120deg, rgba(64,224,208,0.12) 0%, rgba(147,112,219,0.15) 20%, rgba(197,165,90,0.2) 40%, rgba(224,86,126,0.12) 60%, rgba(64,224,208,0.1) 80%, rgba(147,112,219,0.18) 100%)' 
               }} />
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[8px] z-0 transition-all duration-700 group-hover:bg-black/35" />
          {/* Continuous laser sweep line */}
          <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-transparent via-white/8 to-transparent animate-laser-continuous" />
          </div>

          {item.imageUrl && !imgError && (
            <motion.div
              layoutId={`image-container-${item.id}`}
              className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-[14px] overflow-hidden z-10 cursor-pointer shadow-[0_8px_20px_rgba(0,0,0,0.5)] group/img border border-white/10"

              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-30 bg-[linear-gradient(45deg,transparent,rgba(255,255,255,0.4),transparent)] group-hover:translate-x-full transition-transform duration-1000 -translate-x-full" />
              <motion.img
                src={getAssetUrl(item.imageUrl)}
                alt={itemName}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
              />
            </motion.div>
          )}

          <div className="flex-1 flex flex-col min-w-0 justify-center h-full relative z-10 pl-2">
            <div className="flex justify-between items-start gap-2 mb-1.5">
              <h3 className="font-display text-sm sm:text-base font-bold tracking-widest uppercase text-white/95 break-words min-w-0 pr-2 drop-shadow-md leading-snug" style={{ wordBreak: 'break-word' }}>
                {itemName}
              </h3>
              {item.price > 0 && (
                <span className="font-editorial text-sm sm:text-base font-medium tracking-wider text-gold-400 whitespace-nowrap shrink-0 drop-shadow-sm">
                  {item.price.toFixed(2).replace('.', ',')} €
                </span>
              )}
            </div>
            {itemDesc && (
              <p className="font-body text-[10px] sm:text-[11px] text-white/60 leading-relaxed line-clamp-2 pr-4 transition-colors duration-500 group-hover:text-white/80">
                {itemDesc}
              </p>
            )}
            <div className="w-8 h-px bg-gradient-to-r from-gold-500/80 to-transparent mt-3 transition-all duration-700 ease-out group-hover:w-[80%]" />
          </div>
        </>
      )}
    </motion.article>

    {createPortal(
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(false);
            }}
          >
            <div className="absolute inset-0 transition-colors duration-1000 theme-bg opacity-[0.98] backdrop-blur-[40px]" />

            <motion.div
              layoutId={`card-${item.id}`}
              className="relative w-full h-full sm:h-[85vh] sm:w-[90vw] sm:max-w-6xl sm:rounded-[2rem] flex flex-col sm:flex-row bg-[#0a0806]/80 backdrop-blur-3xl border border-gold-500/10 shadow-[0_30px_100px_rgba(0,0,0,0.9),inset_0_0_0_1px_rgba(197,165,90,0.05)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{ x: parallaxX, y: parallaxY }}
            >
              <button
                onClick={() => setIsExpanded(false)}
                aria-label="Kapat"
                className="fixed sm:absolute top-5 right-5 sm:top-8 sm:right-8 z-[120] w-12 h-12 rounded-full bg-black/20 backdrop-blur-xl flex items-center justify-center text-white/50 hover:text-gold-400 hover:bg-black/60 transition-all border border-white/5 hover:border-gold-500/30 group"
              >
                <X className="w-5 h-5 transition-transform group-hover:rotate-90 duration-500" />
              </button>

              {/* Left/Top Area: The Hero Image or Placeholder */}
              <div className="relative w-full min-h-[45vh] h-auto sm:h-full sm:w-1/2 flex items-center justify-center overflow-hidden p-8 sm:p-12">
                {/* Elegant radial mesh gradient background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,30,20,0.8)_0%,rgba(10,8,6,1)_100%)]" />
                {/* Dynamic Spotlight */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-1/2 bg-gradient-to-b from-gold-500/10 to-transparent blur-3xl opacity-70 pointer-events-none" />
                {/* Organic ambient glow behind the item */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-gold-900/15 blur-[60px] rounded-full pointer-events-none mix-blend-color-dodge" />

                {(!item.imageUrl || imgError) ? (
                  <motion.div
                    layoutId={`image-container-${item.id}`}
                    className="relative w-full h-full min-h-[320px] flex items-center justify-center z-10 border border-gold-500/5 rounded-3xl bg-black/40 backdrop-blur-md shadow-inner"
                  >
                    <div className="font-brand text-7xl sm:text-9xl text-transparent bg-clip-text bg-gradient-to-br from-gold-300 via-gold-500 to-gold-800 opacity-30 select-none tracking-widest drop-shadow-sm filter contrast-125">H S</div>
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none" />
                  </motion.div>
                ) : (
                  <motion.div
                    layoutId={`image-container-${item.id}`}
                    className="relative w-full h-full min-h-[320px] flex items-center justify-center z-10"
                  >
                    {isSignature && <IceShatterEffect />}

                    <motion.img
                      src={getAssetUrl(item.imageUrl)}
                      alt={itemName}
                      className="relative z-10 w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.7)] max-h-[65vh] sm:max-h-none"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{
                        opacity: 1,
                        scale: isSignature ? 1.05 : 1,
                        y: [-8, 8, -8],
                      }}
                      transition={{
                        opacity: { duration: 1 },
                        scale: { type: 'spring', stiffness: 80, damping: 25 },
                        y: { duration: 10, repeat: Infinity, ease: 'easeInOut' }
                      }}
                    />
                  </motion.div>
                )}
              </div>

              {/* Right/Bottom Area: Typography & Details */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-auto min-h-[55vh] sm:h-full sm:w-1/2 p-8 sm:p-16 flex flex-col justify-center overflow-y-auto no-scrollbar z-10 bg-transparent sm:bg-black/20"
              >
                {/* Gradient fade at the top for mobile so the text doesn't clash with image abruptly */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0a0806] to-transparent sm:hidden -mt-32 z-0 pointer-events-none" />
                <div className="absolute inset-0 bg-[#0a0806] sm:hidden -z-10" />

                <div className="mb-6 sm:mb-10 w-full relative z-10">
                  <h2 
                    className="font-brand text-4xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/60 font-light tracking-wide leading-[1.15] mb-5 flex items-center flex-wrap gap-4 break-words max-w-full drop-shadow-sm"
                    style={{ wordBreak: 'break-word', hyphens: 'auto' }}
                  >
                    {itemName}
                    {concept === 'world-cup' && worldCupFlags[item.id] && (
                      <img
                        src={`https://flagcdn.com/w80/${worldCupFlags[item.id]}.png`}
                        alt={`${worldCupFlags[item.id]} flag`}
                        className="h-8 w-auto rounded shadow-[0_0_20px_rgba(255,255,255,0.4)] ml-2 inline-block grayscale-[20%]"
                      />
                    )}
                  </h2>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-[1px] bg-gradient-to-r from-gold-500/80 to-transparent" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-gold-500/40" />
                  </div>
                  {item.price > 0 && (
                    <span className="text-white/90 drop-shadow-lg font-display text-2xl sm:text-3xl tracking-[0.15em] font-light">
                      {item.price.toFixed(2)} EUR
                    </span>
                  )}
                </div>

                <p className="font-body text-[15px] sm:text-[17px] text-white/70 leading-relaxed font-light mb-12 max-w-xl relative z-10">
                  {itemDesc}
                </p>

                {(item.allergens?.length || item.additives?.length) ? (
                  <div className="mb-10 relative z-10">
                    <h3 className="font-display text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4 flex items-center gap-2">
                      <div className="w-3 h-px bg-white/20" />
                      {translations[lang].allergensTitle}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.allergens?.map(a => (
                        <span key={a} className="font-display font-medium text-[11px] text-white/60 bg-white/5 border border-white/10 rounded px-2.5 py-1 backdrop-blur-sm" title="Allergen">{a}</span>
                      ))}
                      {item.additives?.map(a => (
                        <span key={a} className="font-display font-medium text-[11px] text-white/60 bg-white/5 border border-white/10 rounded px-2.5 py-1 backdrop-blur-sm" title="Zusatzstoff">{a}</span>
                      ))}
                    </div>
                    <p className="font-body text-[10px] text-white/40 italic tracking-wide max-w-sm">
                      * {translations[lang].allergenNote}
                    </p>
                  </div>
                ) : null}

                {item.flavorProfile && (
                  <div className="space-y-5 max-w-sm relative z-10">
                    <h4 className="font-display text-[10px] uppercase tracking-[0.2em] text-gold-500/80 mb-5 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                      Flavor Profile
                    </h4>
                    {Object.entries(item.flavorProfile).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-5">
                        <span className="font-body text-[11px] uppercase tracking-widest text-white/50 w-28 font-light">{key}</span>
                        <div className="flex-1 h-[1px] bg-white/10 relative overflow-hidden rounded-full">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${value}%` }}
                            transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold-600 to-gold-400 shadow-[0_0_10px_rgba(197,165,90,0.5)]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
};

export default MenuItemCard;
