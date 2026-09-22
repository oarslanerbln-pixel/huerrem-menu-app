import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import { useMenu } from '../../context/MenuContext';
import SearchBar from '../UI/SearchBar';
import MenuItemCard from '../UI/MenuItemCard';
import { categoriesList } from '../../data/categories';

interface FilterBarProps {
  isCompact: boolean;
}

// Synthetic sound triggers
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const playSound = (_type: 'tick' | 'sweep') => {};

export default function FilterBar({ isCompact }: FilterBarProps) {
  const { t, lang, tSub } = useLanguage();
  const {
    activeCategory,
    activeSubcategory,
    setSubcategory,
    subcategories,
    searchQuery,
    filteredItems,
  } = useMenu();
  const chipsScrollRef = useRef<HTMLDivElement>(null);

  const handleSubcategoryClick = (sub: string) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setSubcategory(sub);
    playSound('tick');
    if (navigator.vibrate) navigator.vibrate([30, 20]);
  };

  return (
    <div
      className={`sticky top-0 z-30 pt-3 pb-1.5 transition-all duration-500 ${
        isCompact ? 'theme-overlay-bar border-b shadow-2xl' : 'bg-transparent'
      }`}
    >
      <div className="container-mobile flex flex-col gap-2">

        {/* Compact brand on scroll */}
        <div className="relative w-full flex justify-center">
          <AnimatePresence>
            {isCompact && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-1 w-full flex items-center justify-between px-4 pb-1"
              >
                <span
                  className="font-brand text-sm font-normal"
                  style={{
                    background: 'linear-gradient(135deg, hsl(43,55%,45%) 0%, hsl(43,75%,68%) 50%, hsl(43,50%,50%) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    letterSpacing: '0.2em',
                  }}
                >
                  Hürrem
                </span>
                <span className="font-body text-[8px] tracking-widest uppercase theme-text-muted opacity-60">
                  {t(categoriesList.find((c: { key: string, labelKey: string }) => c.key === activeCategory)?.labelKey || 'catShisha')}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search bar */}
        <div className="px-4 relative z-50">
          <SearchBar />
        </div>

        {/* Search Overlay (only visible when searching) */}
        <AnimatePresence>
          {searchQuery.trim().length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute left-0 right-0 top-[100%] min-h-[100vh] theme-overlay-search backdrop-blur-3xl z-40 px-4 pt-6 pb-32 overflow-y-auto no-scrollbar shadow-[0_-20px_60px_rgba(0,0,0,0.4)] border-t theme-border"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl theme-accent-text uppercase tracking-widest">{t('searchResults')}</h2>
                <span className="theme-search-count text-xs">{filteredItems.length} {t('resultsCount')}</span>
              </div>
              {filteredItems.length > 0 ? (
                <div className="grid gap-4">
                  {filteredItems.map(item => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full theme-accent-bg opacity-10 flex items-center justify-center">
                    <span className="theme-accent-text text-2xl">?</span>
                  </div>
                  <p className="theme-no-result-text text-sm font-body">{t('noResults')}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div 
          className="w-full overflow-x-auto no-scrollbar scroll-smooth py-2 relative z-30"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 20px, black calc(100% - 20px), transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20px, black calc(100% - 20px), transparent 100%)',
            opacity: searchQuery.trim().length > 0 ? 0.3 : 1,
            pointerEvents: searchQuery.trim().length > 0 ? 'none' : 'auto',
            transition: 'opacity 0.3s'
          }}
        >

          <div ref={chipsScrollRef} className="flex gap-2 pb-1 pt-1 before:content-[''] before:w-4 before:shrink-0 after:content-[''] after:w-4 after:shrink-0">
            {subcategories.map(sub => {
              const isActive = activeSubcategory === sub;
              return (
                <button
                  key={sub}
                  onClick={() => handleSubcategoryClick(sub)}
                  className={`relative shrink-0 px-4 py-2 text-[11px] font-display uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-500 ${
                    isActive 
                      ? 'theme-accent-text font-bold shadow-sm' 
                      : 'theme-subcat-inactive font-medium hover:theme-text'
                  }`}
                >
                  {/* Active Frosted Glass Box */}
                  {isActive && (
                    <motion.div
                      layoutId={`filter-pill-${lang}`}
                      className="absolute inset-0 border z-0"
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      style={{
                        backgroundColor: 'var(--gold-glow)',
                        borderColor: 'var(--border-gold)'
                      }}
                    />
                  )}
                  <span className="relative z-10">
                    {sub === 'All' ? t('subAll') : tSub(sub)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
