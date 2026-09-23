import type { MenuCategory } from '../../data/menu';

export const LANGS = ['DE', 'EN', 'TR', 'FR', 'ES', 'RU'] as const;

export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  shisha: 'Shisha',
  drinks: 'Getränke',
  food: 'Speisen',
  happy_hour: 'Happy Hour',
  spiele: 'Spiele',
};
