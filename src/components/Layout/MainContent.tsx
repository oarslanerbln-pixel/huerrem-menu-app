import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import { useMenu } from '../../context/MenuContext';

import type { TranslationKey } from '../../i18n/translations';

import AllergenLegend from '../UI/AllergenLegend';
import { Info } from 'lucide-react';
import HappyHourBanner from '../UI/HappyHourBanner';
import ItemGroup from '../UI/ItemGroup';

export default function MainContent() {
  const { t, tSub, lang } = useLanguage();
  
  const getLocalizedGroup = (group: string | Record<string, string> | undefined, l: string) => {
    if (!group) return null;
    if (typeof group === 'string') return group;
    return group[l] || group.EN || group.DE || '';
  };
  const { filteredItems, activeCategory, activeSubcategory, subcategories, searchQuery } = useMenu();

  const [isLegendOpen, setIsLegendOpen] = useState(false);

  return (
    <main className="container-mobile mt-4 px-4 relative">
      <div className="grid gap-4">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory + '-' + activeSubcategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 250, damping: 25 }}
            className="flex flex-col relative z-10"
          >
            {searchQuery.trim().length > 0 ? (
              filteredItems.length > 0 ? (
                (() => {
                  const groupedItems = filteredItems.reduce((acc, item) => {
                    const g = item.subcategory ? tSub(item.subcategory) : 'Search Results';
                    if (!acc[g]) acc[g] = [];
                    acc[g].push(item);
                    return acc;
                  }, {} as Record<string, typeof filteredItems>);
                  
                  return (
                    <div className="flex flex-col gap-4 mt-2">
                      {Object.entries(groupedItems).map(([gName, gItems]) => (
                        <ItemGroup key={gName} gName={gName} gItems={gItems} />
                      ))}
                    </div>
                  );
                })()
              ) : (
                <div className="text-center py-20 font-body text-xs text-text-tertiary">
                  {t('emptyState')}
                </div>
              )
            ) : filteredItems.length > 0 ? (
              activeSubcategory === 'All' ? (
                // Group by subcategory based on the logically sorted `subcategories` array
                <>
                  <HappyHourBanner />
                  {subcategories.filter(s => s !== 'All').map(sub => {
                  const itemsInSub = filteredItems.filter(item => item.subcategory === sub);
                  if (itemsInSub.length === 0) return null;
                  
                  return (
                    <div key={sub} className="mb-8 last:mb-0">
                      {/* Subcategory Sticky Header */}
                      <div className="flex flex-col mb-4 sticky top-14 z-20 theme-overlay-bar border-y shadow-sm py-2.5 -mx-4 px-4 text-center">
                        <div className="flex justify-center w-full">
                          <h3 className="font-display font-bold text-[12px] tracking-[0.25em] uppercase theme-accent-text brand-diamond inline-flex items-center">
                            {tSub(sub)}
                          </h3>
                        </div>
                        {t(`${sub}_desc` as TranslationKey) && t(`${sub}_desc` as TranslationKey) !== `${sub}_desc` && (
                          <p className="mt-1.5 text-[11px] theme-text-muted font-editorial italic">
                            {t(`${sub}_desc` as TranslationKey)}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-4">
                        {Object.entries(itemsInSub.reduce((acc, item) => {
                          const g = getLocalizedGroup(item.group, lang) || 'default';
                          if (!acc[g]) acc[g] = [];
                          acc[g].push(item);
                          return acc;
                        }, {} as Record<string, typeof itemsInSub>)).map(([gName, gItems]) => (
                          <ItemGroup key={gName} gName={gName} gItems={gItems} />
                        ))}
                      </div>
                    </div>
                  );
                  })}
                </>
              ) : (
                (() => {
                  const groupedItems = filteredItems.reduce((acc, item) => {
                    const g = getLocalizedGroup(item.group, lang) || 'default';
                    if (!acc[g]) acc[g] = [];
                    acc[g].push(item);
                    return acc;
                  }, {} as Record<string, typeof filteredItems>);
                  
                  return (
                    <div className="flex flex-col gap-4 mt-2">
                      {Object.entries(groupedItems).map(([gName, gItems]) => (
                        <ItemGroup key={gName} gName={gName} gItems={gItems} />
                      ))}
                    </div>
                  );
                })()
              )
            ) : (
              <div className="text-center py-20 font-body text-xs text-text-tertiary">
                {t('emptyState')}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Allergens Button */}
      <div className="w-full flex justify-center mt-12 mb-6">
        <button 
          onClick={() => setIsLegendOpen(true)}
          className="group flex items-center gap-2 px-5 py-2.5 rounded-full theme-overlay-bar border transition-all duration-300 hover:scale-105 shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
        >
          <Info className="w-4 h-4 theme-accent-text group-hover:scale-110 transition-transform duration-300" />
          <span className="font-display text-[10px] font-bold tracking-[0.2em] uppercase theme-text-muted transition-colors duration-300 group-hover:theme-text">
            {t('allergensTitle') || 'Allergene & Zusatzstoffe'}
          </span>
        </button>
      </div>

      <AllergenLegend isOpen={isLegendOpen} onClose={() => setIsLegendOpen(false)} />

      {/* Branding Footer */}
      <div className="w-full flex flex-col items-center justify-center py-8 pb-32">
        <a 
          href="https://1618-digital.de" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center group transition-all duration-500 hover:scale-105"
        >
          <span className="text-[9px] font-display uppercase tracking-[0.4em] text-gold-600/70 mb-2 transition-colors group-hover:text-gold-500">
            Crafted by
          </span>
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gold-500/50 group-hover:to-gold-400 transition-colors duration-500" />
            <span className="text-[13px] font-editorial font-medium tracking-[0.35em] text-white/80 drop-shadow-[0_0_12px_rgba(197,165,90,0.3)] group-hover:text-gold-300 group-hover:drop-shadow-[0_0_16px_rgba(197,165,90,0.8)] transition-all duration-500">
              1618 DIGITAL
            </span>
            <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gold-500/50 group-hover:to-gold-400 transition-colors duration-500" />
          </div>
        </a>
      </div>
    </main>
  );
}
