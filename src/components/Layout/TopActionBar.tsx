import { useState, useRef, useEffect } from 'react';
import { Info, Globe, ChevronDown, Sun, Moon, Sparkles, type LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import { useTheme, type Theme } from '../../context/ThemeContext';

// Synthetic sound triggers
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const playSound = (_type: 'tick' | 'sweep') => {
  // Sound is removed to keep it cleaner
};

export default function TopActionBar() {
  const { t, lang, setLang } = useLanguage();
  const { theme, setTheme } = useTheme();
  const langs = ['DE', 'TR', 'EN', 'FR', 'RU', 'ES'] as const;
  const themes: { id: Theme; icon: LucideIcon; label: string }[] = [
    { id: 'dark', icon: Moon, label: 'Dark' },
    { id: 'light', icon: Sun, label: 'Light' },
    { id: 'silver', icon: Sparkles, label: 'Silver' },
  ];
  
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(event.target as Node)) {
        setThemeMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInfoClick = () => {
    playSound('tick');
    if (navigator.vibrate) navigator.vibrate([20, 10]);
    alert(`${t('infoTitle')}\n\n${t('infoBody')}`);
  };

  const CurrentThemeIcon = themes.find(t => t.id === theme)?.icon || Moon;

  return (
    <div className="container-mobile px-4 pt-8 sm:pt-6 flex justify-end items-center z-50 relative gap-3">
      {/* Language Switcher Dropdown */}
      <div 
        className="relative"
        ref={langRef}
      >
        <button
          onClick={() => setLangMenuOpen(!langMenuOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:border-gold-500/50 transition-colors theme-card"
        >
          <Globe className="w-4 h-4 theme-accent-text" />
          <span className="font-display text-[10px] sm:text-xs font-bold tracking-[0.1em] theme-text">
            {lang}
          </span>
          <ChevronDown className={`w-3 h-3 theme-text-muted transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {langMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="absolute top-full right-0 mt-2 p-1.5 min-w-[80px] backdrop-blur-xl border border-gold-500/20 rounded-md shadow-2xl flex flex-col gap-0.5 theme-modal"
            >
              {langs.map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setLang(l);
                    setLangMenuOpen(false);
                    if (navigator.vibrate) navigator.vibrate(10);
                  }}
                  className={`px-4 py-2 rounded-sm font-display text-[11px] font-bold tracking-[0.1em] transition-all duration-300 text-center ${
                    lang === l 
                      ? 'text-black bg-gradient-to-r from-gold-300 to-gold-500 shadow-md' 
                      : 'theme-text hover:text-gold-400 hover:bg-gold-500/10'
                  }`}
                >
                  {l}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Theme Toggle Dropdown */}
      <div 
        className="relative"
        ref={themeRef}
      >
        <button
          onClick={() => setThemeMenuOpen(!themeMenuOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:border-gold-500/50 transition-colors theme-card"
          aria-label="Select Theme"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25 }}
            >
              <CurrentThemeIcon className="w-4 h-4 theme-accent-text" />
            </motion.div>
          </AnimatePresence>
          <ChevronDown className={`w-3 h-3 theme-text-muted transition-transform ${themeMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {themeMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="absolute top-full right-0 mt-2 p-1.5 min-w-[80px] backdrop-blur-xl border border-gold-500/20 rounded-2xl shadow-2xl flex flex-col gap-0.5 theme-modal"
            >
              {themes.map((tOpt) => {
                const Icon = tOpt.icon;
                return (
                  <button
                    key={tOpt.id}
                    onClick={() => {
                      setTheme(tOpt.id);
                      setThemeMenuOpen(false);
                      if (navigator.vibrate) navigator.vibrate(10);
                    }}
                    className={`px-4 py-2 flex items-center justify-center gap-2 rounded-sm font-display text-[11px] font-bold tracking-[0.1em] transition-all duration-300 text-center ${
                      theme === tOpt.id
                        ? 'text-black bg-gradient-to-r from-gold-300 to-gold-500 shadow-md'
                        : 'theme-text hover:text-gold-400 hover:bg-gold-500/10'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{tOpt.label}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={handleInfoClick}
        className="w-9 h-9 rounded-md border border-gold-500/25 flex items-center justify-center hover:border-gold-500/50 transition-colors shadow-sm theme-card"
        aria-label="Info"
      >
        <Info className="w-4 h-4 theme-text" />
      </button>
    </div>
  );
}
