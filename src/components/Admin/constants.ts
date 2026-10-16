import type { MenuCategory } from '../../data/menu';

export const LANGS = ['DE', 'EN', 'TR', 'FR', 'ES', 'RU'] as const;

export type AdminCategory = MenuCategory | 'desserts';

export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  shisha: 'Shisha',
  drinks: 'Getränke',
  food: 'Speisen',
  happy_hour: 'Happy Hour',
  spiele: 'Spiele',
};

export const ADMIN_CATEGORY_OPTIONS: { key: AdminCategory; label: string }[] = [
  { key: 'shisha', label: 'Shisha' },
  { key: 'drinks', label: 'Getränke' },
  { key: 'food', label: 'Speisen' },
  { key: 'desserts', label: 'Desserts (Tatlılar)' },
  { key: 'happy_hour', label: 'Happy Hour' },
  { key: 'spiele', label: 'Spiele' },
];

export const DEFAULT_SUBCATEGORIES_BY_CATEGORY: Record<AdminCategory, string[]> = {
  food: [
    'Bowls & Salate',
    'Burger Gerichte',
    'Pasta Gerichte',
    'Hauptgerichte',
    'Snacks',
    'Finger Food',
    'Suppen',
    'Vorspeisen',
    'Shakes',
    'Desserts',
  ],
  desserts: [
    'Desserts',
    'Kuchen & Torten',
    'Eisspezialitäten',
    'Waffeln & Pancakes',
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
