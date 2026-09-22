import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Sparkles, Check, Send } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useLanguage } from '../../i18n/LanguageContext';

const WishlistPanel: React.FC = () => {
  const { items, toggle, clear, total, count } = useWishlist();
  const { lang, t } = useLanguage();
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    if (navigator.vibrate) navigator.vibrate([10, 50, 10]);
    setTimeout(() => {
      setIsCheckingOut(false);
      clear();
      if (navigator.vibrate) navigator.vibrate([30, 100, 30]);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          key="wishlist-panel"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 22, stiffness: 180, mass: 0.9 }}
          className="fixed left-0 right-0 z-45 mx-auto max-w-[480px] bottom-[calc(4rem+env(safe-area-inset-bottom))]"
        >
          <div
            role="region"
            aria-label="Wishlist Panel"
            aria-expanded="true"
            className="mx-3 rounded-2xl border theme-border overflow-hidden theme-card backdrop-blur-[40px] shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
          >
            {/* Animated shimmer top border */}
            <div className="wishlist-top-shimmer" />

            {/* Header */}
            <div className="flex justify-between items-center px-4 pt-3 pb-2 border-b theme-border">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 theme-accent-text opacity-60" />
                <span className="font-display text-[10px] tracking-[0.25em] uppercase theme-accent-text font-light">
                  {t('wishlistTitle')}
                </span>
                <span className="font-body text-[9px] theme-text-muted">
                  · {count} {t('wishlistItems')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={clear}
                  className="w-8 h-8 flex items-center justify-center rounded-full theme-text-muted hover:theme-accent-text transition-all"
                  style={{ transition: 'color 0.2s, background 0.2s' }}
                  aria-label={t('wishlistClear')}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Items list */}
            <div className="px-4 py-2 flex flex-col gap-1.5 max-h-40 overflow-y-auto no-scrollbar">
              <AnimatePresence initial={false}>
                {items.map(item => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, x: 10, height: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="flex justify-between items-center py-1.5 group/item"
                  >
                    <span className="font-display text-[11px] font-light theme-text uppercase tracking-wider flex-1 truncate pr-2">
                      {typeof item.name === 'string' ? item.name : (item.name?.[lang] || item.name?.DE)}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <span
                        className="font-display text-[11px] theme-accent-text tabular-nums whitespace-nowrap"
                        aria-label={`${item.price.toFixed(2)} Euro`}
                      >
                        {item.price.toFixed(2).replace('.', ',')} €
                      </span>
                      <button
                        onClick={() => toggle(item)}
                        className="w-6 h-6 flex items-center justify-center rounded-full theme-text-muted hover:theme-accent-text transition-all opacity-0 group-hover/item:opacity-100"
                        aria-label={`Remove ${typeof item.name === 'string' ? item.name : (item.name?.[lang] || item.name?.DE)}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Total footer */}
            <div className="flex flex-col border-t theme-border" style={{ background: 'color-mix(in srgb, var(--theme-accent) 3%, transparent)' }}>
              <div className="flex justify-between items-center px-4 py-3">
                <span className="font-display text-[9px] tracking-[0.2em] uppercase theme-text-muted">
                  {t('wishlistTotal')}
                </span>
                <span className="font-display text-lg theme-accent-text tracking-wider font-medium">
                  {total.toFixed(2).replace('.', ',')} €
                </span>
              </div>
              <div className="px-4 pb-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full relative overflow-hidden font-display text-xs tracking-widest uppercase py-3 rounded-xl font-bold transition-all"
                  style={{
                    background: 'linear-gradient(135deg, var(--gold-600, #B8860B), var(--gold-400, #DAA520))',
                    color: '#000',
                    boxShadow: '0 0 20px color-mix(in srgb, var(--theme-accent) 25%, transparent)',
                  }}
                >
                  <AnimatePresence mode="wait">
                    {isCheckingOut ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>{lang === 'TR' ? 'Sipariş Alındı' : lang === 'DE' ? 'Bestellung erhalten' : 'Order Received'}</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>{lang === 'TR' ? 'Siparişi Gönder' : lang === 'DE' ? 'Bestellung abschicken' : 'Send Order'}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WishlistPanel;
