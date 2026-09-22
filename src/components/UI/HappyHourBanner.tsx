import { Flame, Droplets, UtensilsCrossed } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export default function HappyHourBanner() {
  const { t } = useLanguage();

  return (
    <div className="w-full mb-8 relative group">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-gold-500/5 to-transparent blur-2xl rounded-sm" />
      
      <div className="relative flex flex-col items-center p-6 sm:p-8 rounded-sm border border-gold-500/20 theme-card shadow-lg">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <h2 className="font-display text-base sm:text-lg tracking-[0.2em] uppercase text-gold-500 animate-neon-pulse-slow text-center leading-relaxed font-bold">
            {t('hhTitle') || 'Deine Auszeit im Hürrem'}
          </h2>
        </div>

        <div className="flex flex-col gap-4 w-full">
          {/* Card 1: Shisha & Softdrink */}
          <div className="relative p-5 rounded-sm border border-gold-500/20 bg-gold-500/5 flex flex-col items-center gap-3 transition-transform hover:scale-[1.02] duration-500">
            <h3 className="font-display text-sm sm:text-base font-semibold tracking-wider uppercase text-gold-700 dark:text-gold-100 text-center">
              {t('hhShisha') || 'Mo - Fr: Shisha + Softdrink'}
            </h3>
            
            <div className="flex items-center gap-5 text-gold-500/80 my-1">
              <Flame className="w-5 h-5" strokeWidth={1.5} />
              <div className="w-px h-6 bg-gold-500/20" />
              <Droplets className="w-5 h-5" strokeWidth={1.5} />
            </div>
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent my-1" />
            
            <div className="flex flex-col items-center">
              <span className="font-body text-[11px] tracking-widest theme-text-muted mb-1 font-medium">{t('hhTime1') || '14 - 19 UHR'}</span>
              <span className="font-display font-bold text-lg tracking-wider text-gold-600 dark:text-gold-400 whitespace-nowrap">
                13,90 €
              </span>
            </div>
          </div>

          {/* Card 2: Food */}
          <div className="relative p-5 rounded-sm border border-gold-500/20 bg-gold-500/5 flex flex-col items-center gap-3 transition-transform hover:scale-[1.02] duration-500">
            <h3 className="font-display text-sm sm:text-base font-semibold tracking-wider uppercase text-gold-700 dark:text-gold-100 text-center">
              {t('hhKitchen') || 'Küche ab 16 Uhr'}
              <span className="font-body text-xs theme-text-muted tracking-wider mt-2 block font-normal">
                {t('hhFoodTypes') || 'BURGER, PASTA, SALATE & BOWLS'}
              </span>
            </h3>
            
            <div className="flex items-center gap-4 text-gold-400/80 my-1">
              <UtensilsCrossed className="w-5 h-5" strokeWidth={1.5} />
            </div>
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent my-1" />
            
            <div className="flex flex-col items-center">
              <span className="font-body text-[11px] tracking-widest theme-text-muted mb-1 font-medium">{t('hhTime2') || '16 - 19 UHR'}</span>
              <span className="font-display font-bold text-lg tracking-wider text-gold-600 dark:text-gold-400 whitespace-nowrap">
                9,90 €
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
