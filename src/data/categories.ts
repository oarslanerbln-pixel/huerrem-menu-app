import { Wind, Coffee, Utensils, Crown } from 'lucide-react';
import type { MenuCategory } from './menu';

export const categoriesList = [
  { key: 'shisha' as MenuCategory, labelKey: 'catShisha' as const, icon: Wind },
  { key: 'drinks' as MenuCategory, labelKey: 'catDrinks' as const, icon: Coffee },
  { key: 'food' as MenuCategory, labelKey: 'catFood' as const, icon: Utensils },
  { key: 'happy_hour' as MenuCategory, labelKey: 'catHappyHour' as const, icon: Crown },
  { key: 'spiele' as MenuCategory, labelKey: 'catSpiele' as const, icon: Crown },
];
