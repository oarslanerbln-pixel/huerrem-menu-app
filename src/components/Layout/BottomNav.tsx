
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import { useMenu } from '../../context/MenuContext';
import type { MenuCategory } from '../../data/menu';
import { categoriesList } from '../../data/categories';

interface BottomNavProps {
  isCompact: boolean;
}

// Synthetic sound triggers
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const playSound = (_type: 'tick' | 'sweep') => {};

export default function BottomNav({ isCompact }: BottomNavProps) {
  const { t } = useLanguage();
  const { activeCategory, setCategory } = useMenu();

  const handleCategoryClick = (category: MenuCategory) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCategory(category);
    playSound('sweep');
    if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-40 pb-[env(safe-area-inset-bottom)] transition-all duration-500 pointer-events-none theme-border border-t theme-overlay-nav ${isCompact ? 'shadow-[0_-8px_40px_rgba(0,0,0,0.3)] backdrop-blur-2xl' : 'backdrop-blur-xl'}`}
    >
      <nav className="w-full max-w-screen-sm mx-auto h-20 flex justify-around items-center px-4 pointer-events-auto relative">

        {/* Ambient gold glow at bottom of nav */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(197,165,90,0.15), transparent)' }}
        />

        {categoriesList.map(cat => {
          const IconComponent = cat.icon;
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => handleCategoryClick(cat.key)}
              className="flex flex-col items-center justify-center gap-1.5 w-16 h-full relative cursor-pointer group"
              aria-label={t(cat.labelKey)}
            >
              {/* Active glow background — gold only */}
              {isActive && (
                <motion.div
                  layoutId="nav-category-glow"
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full pointer-events-none z-0 opacity-70"
                  style={{ background: 'radial-gradient(circle, rgba(197,165,90,0.18) 0%, transparent 70%)' }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}

              {/* Icon */}
              <div className={isActive ? 'animate-icon-float' : ''}>
                <IconComponent
                  className={`w-5 h-5 transition-all duration-400 relative z-10 ${
                    isActive
                      ? 'text-gold-700 dark:text-gold-400 scale-110'
                      : 'theme-text-muted group-hover:text-gold-600 dark:group-hover:text-gold-400'
                  }`}
                  style={isActive ? { filter: 'drop-shadow(0 0 8px rgba(197,165,90,0.5))' } : {}}
                />
              </div>

              {/* Label */}
              <span
                className={`font-display text-[8px] tracking-[0.2em] uppercase relative z-10 transition-all duration-300 ${
                  isActive ? 'text-gold-700 dark:text-gold-400 font-bold' : 'theme-text-muted group-hover:text-gold-600 dark:group-hover:text-gold-400'
                }`}
              >
                {t(cat.labelKey)}
              </span>

              {/* Active indicator — top gold hairline */}
              {isActive && (
                <motion.div
                  layoutId="active-dock-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[1.5px] rounded-b-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(197,165,90,0.9), rgba(255,255,255,0.5), rgba(197,165,90,0.9), transparent)',
                    boxShadow: '0 0 6px rgba(197,165,90,0.5)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
