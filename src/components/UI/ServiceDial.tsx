import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Flame, Receipt, X, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export default function ServiceDial() {
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleAction = (action: string) => {
    console.log(`Action triggered: ${action}`);
    if (navigator.vibrate) navigator.vibrate([10, 20, 10]);
    setIsOpen(false);
    setTimeout(() => {
      const msg = action === 'waiter' ? 'Garson çağrıldı' : action === 'coals' ? 'Köz talebi iletildi' : 'Hesap istendi';
      setToastMessage(msg);
      if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
      setTimeout(() => setToastMessage(null), 3000);
    }, 400);
  };

  const toggleDial = () => {
    if (navigator.vibrate) navigator.vibrate(10);
    setIsOpen(!isOpen);
  };

  const actions = [
    { id: 'waiter', icon: Bell,    label: t('serviceCallWaiter'),    color: 'theme-accent-text',  bg: 'var(--theme-accent)' },
    { id: 'coals',  icon: Flame,   label: t('serviceRequestCoals'),  color: 'text-orange-600',    bg: 'rgb(234 88 12 / 0.15)' },
    { id: 'bill',   icon: Receipt,  label: t('serviceRequestBill'),   color: 'text-emerald-700',   bg: 'rgb(5 150 105 / 0.15)' },
  ];

  return (
    <div className="fixed bottom-[6.5rem] right-4 z-45 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-end gap-3 mb-4 pointer-events-auto"
          >
            {actions.map((action, i) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: (actions.length - 1 - i) * 0.05 }}
                  onClick={() => handleAction(action.id)}
                  className="flex items-center gap-3 theme-card backdrop-blur-xl border theme-border py-2.5 px-4 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  <span className="font-display text-[11px] tracking-widest uppercase font-bold theme-text">
                    {action.label}
                  </span>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: action.bg === 'var(--theme-accent)' ? 'color-mix(in srgb, var(--theme-accent) 12%, transparent)' : action.bg }}
                  >
                    <Icon className={`w-4 h-4 ${action.color}`} />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button — always gold gradient, readable on all themes */}
      <button
        onClick={toggleDial}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 pointer-events-auto relative z-50 ${
          isOpen
            ? 'border theme-border backdrop-blur-md theme-card rotate-180'
            : 'bg-gradient-to-br from-gold-400 to-gold-600 hover:scale-105'
        }`}
        aria-label={t('serviceTitle')}
      >
        <div className="absolute inset-0 rounded-full border border-white/10" />
        {isOpen ? (
          <X className="w-6 h-6 theme-accent-text" />
        ) : (
          <Bell className="w-6 h-6 text-black animate-icon-float" />
        )}
      </button>

      {/* Toast Notification — theme-aware */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-24 right-0 z-[100] flex items-center gap-3 theme-card backdrop-blur-xl border theme-border py-3 px-5 rounded-xl shadow-xl pointer-events-none whitespace-nowrap"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-display text-[10px] tracking-widest uppercase font-bold theme-accent-text">
              {toastMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
