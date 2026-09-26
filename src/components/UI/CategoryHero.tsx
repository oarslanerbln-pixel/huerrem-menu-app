import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Coffee, Utensils, Crown, type LucideIcon } from 'lucide-react';
import type { MenuCategory } from '../../data/menu';
import { useLanguage } from '../../i18n/LanguageContext';
import type { TranslationKey } from '../../i18n/translations';

interface CategoryHeroProps {
  category: MenuCategory;
}

const HERO_DATA: Record<MenuCategory, {
  gradientClass: string;
  icon: LucideIcon;
  categoryKey: TranslationKey;
  mottoFallback: string;
  accentColor: string;
  emoji: string;
}> = {
  shisha: {
    gradientClass: 'hero-gradient-shisha',
    icon: Wind,
    categoryKey: 'catShisha',
    mottoFallback: 'Dumanın Dili',
    accentColor: 'text-red-300',
    emoji: '🌿',
  },
  drinks: {
    gradientClass: 'hero-gradient-drinks',
    icon: Coffee,
    categoryKey: 'catDrinks',
    mottoFallback: 'Tadarık Atölyesi',
    accentColor: 'text-blue-300',
    emoji: '🍹',
  },
  food: {
    gradientClass: 'hero-gradient-food',
    icon: Utensils,
    categoryKey: 'catFood',
    mottoFallback: 'Lezzetin Sarayı',
    accentColor: 'text-green-300',
    emoji: '🍽️',
  },
  happy_hour: {
    gradientClass: 'hero-gradient-happy-hour',
    icon: Crown,
    categoryKey: 'catHappyHour',
    mottoFallback: 'Mo-Fr 14:00 - 18:00 Uhr',
    accentColor: 'text-amber-300',
    emoji: '🕒',
  },
  spiele: {
    gradientClass: 'hero-gradient-kombis',
    icon: Crown,
    categoryKey: 'catSpiele',
    mottoFallback: 'Für Unterhaltung bieten wir verschiedene Spiele an. Fragen Sie unser Team.',
    accentColor: 'text-amber-300',
    emoji: '🎲',
  },
};

// Placeholder videos for each category to be later replaced by Veo videos
const CATEGORY_VIDEOS: Record<string, string> = {
  shisha: 'https://cdn.pixabay.com/video/2020/05/24/40059-425121654_large.mp4', // Smoke
  drinks: 'https://cdn.pixabay.com/video/2021/08/11/84687-586745199_large.mp4', // Drinks/Liquid
  food: 'https://cdn.pixabay.com/video/2021/08/17/85376-590059374_large.mp4', // Flame/grill abstract
  happy_hour: 'https://cdn.pixabay.com/video/2018/09/20/18260-290748182_large.mp4', // Sunset/cocktail hour
  spiele: 'https://cdn.pixabay.com/video/2020/06/03/40960-427909376_large.mp4', // Gold particles
};

const CategoryHero: React.FC<CategoryHeroProps> = ({ category }) => {
  const { t } = useLanguage();
  const data = HERO_DATA[category];
  const IconComponent = data.icon;

  return (
    <motion.div
      key={category}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={`relative overflow-hidden rounded-xl mx-0 mb-6 shadow-lg border border-white/5 ${data.gradientClass}`}
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 opacity-[0.15] mix-blend-screen pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
          src={CATEGORY_VIDEOS[category] || CATEGORY_VIDEOS.drinks}
        />
      </div>

      {/* Background ambient glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute w-[60%] h-[60%] right-[-10%] top-[-10%] rounded-full bg-white/10 blur-[60px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 py-6 flex items-center gap-4">
        {/* Icon container */}
        <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center shrink-0">
          <IconComponent className={`w-6 h-6 ${data.accentColor}`} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-base shrink-0">{data.emoji}</span>
            <h2 className={`font-display text-2xl font-semibold tracking-widest uppercase ${data.accentColor} drop-shadow-md break-words min-w-0 flex-1`}>
              {t(data.categoryKey)}
            </h2>
          </div>
          <p className="font-body text-[11px] font-medium tracking-[0.2em] uppercase text-white/70">
            {t(`${data.categoryKey}Desc` as TranslationKey) || data.mottoFallback}
          </p>
        </div>

        {/* Decorative gold dot */}
        <div className="w-2 h-2 rounded-full bg-gold-500/40 shrink-0 animate-pulse" />
      </div>

      {/* Bottom subtle gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </motion.div>
  );
};

export default CategoryHero;
