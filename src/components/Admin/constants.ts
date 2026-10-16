import type { MenuCategory } from '../../data/menu';

export const LANGS = ['DE', 'EN', 'TR', 'FR', 'ES', 'RU'] as const;

export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  shisha: 'Shisha',
  drinks: 'Getränke',
  food: 'Speisen',
  happy_hour: 'Happy Hour',
  spiele: 'Spiele',
};

export const DEFAULT_SUBCATEGORIES_BY_CATEGORY: Record<MenuCategory, string[]> = {
  food: [
    'Desserts',
    'Bowls & Salate',
    'Burger Gerichte',
    'Pasta Gerichte',
    'Hauptgerichte',
    'Snacks',
    'Finger Food',
    'Suppen',
    'Vorspeisen',
    'Shakes',
  ],
  drinks: [
    'Signature Cocktails',
    'High-Class Cocktails',
    'Cocktails',
    'Mocktails',
    'Homemade Iced Tea',
    'Fresh Homemade',
    'Smoothies',
    'Säfte',
    'Softdrinks',
    'Energydrink',
    'Kaffeespezialitäten',
    'Teespezialitäten',
    'Heiße Specials',
  ],
  shisha: [
    'Signature Blends',
    'Premium Blends',
    'Classic',
    'Pfeifen',
    'HMD (Aufsätze)',
    'Shisha Extras',
  ],
  happy_hour: [
    'Happy Hour',
  ],
  spiele: [
    'Spiele',
  ],
};
