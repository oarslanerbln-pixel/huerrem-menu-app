import { motion, AnimatePresence } from 'framer-motion';
import { Info, X } from 'lucide-react';
import { allergenLegend, additiveLegend } from '../../data/menu';
import { useLanguage } from '../../i18n/LanguageContext';

interface AllergenLegendProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AllergenLegend({ isOpen, onClose }: AllergenLegendProps) {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: '-50%', y: '-40%' }}
            animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.95, x: '-50%', y: '-40%' }}
            className="fixed top-1/2 left-1/2 z-[160] w-[calc(100%-2rem)] max-w-[400px] max-h-[85vh] flex flex-col theme-modal p-6 rounded-3xl border border-white/10 shadow-2xl"
          >
            <button 
              onClick={onClose}
              aria-label={t('close')}
              title={t('close')}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center border border-gold-500/30">
                <Info className="w-5 h-5 text-gold-400" />
              </div>
              <h3 className="font-display text-lg tracking-widest uppercase text-gold-100">
                {t('allergensTitle') || 'Allergene & Zusatzstoffe'}
              </h3>
            </div>

            <div className="max-h-[50vh] overflow-y-auto pr-2 no-scrollbar space-y-6">
              {/* Allergens */}
              <div>
                <h4 className="font-display text-sm tracking-wider uppercase text-gold-400 mb-3 border-b border-white/10 pb-1">
                  Allergene
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(allergenLegend).map(([code, desc]) => (
                    <div key={code} className="flex gap-3 items-start">
                      <span className="font-display font-bold text-xs bg-white/5 border border-white/10 text-gold-300 w-6 h-6 flex items-center justify-center rounded shrink-0">
                        {code}
                      </span>
                      <span className="font-body text-sm theme-text-muted pt-0.5">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additives */}
              <div>
                <h4 className="font-display text-sm tracking-wider uppercase text-gold-400 mb-3 border-b border-white/10 pb-1">
                  Zusatzstoffe
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(additiveLegend).map(([code, desc]) => (
                    <div key={code} className="flex gap-3 items-start">
                      <span className="font-display font-bold text-xs bg-white/5 border border-white/10 text-gold-300 min-w-[1.5rem] px-1 h-6 flex items-center justify-center rounded shrink-0">
                        {code}
                      </span>
                      <span className="font-body text-sm theme-text-muted pt-0.5">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <p className="mt-6 text-[10px] theme-text-muted font-body text-center leading-relaxed">
              *Trotz sorgfältiger Herstellung können neben den gekennzeichneten Zutaten Spuren anderer Stoffe enthalten sein, die im Produktionsprozess in der Küche verwendet werden.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
