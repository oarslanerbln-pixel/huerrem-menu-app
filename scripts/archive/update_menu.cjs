const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, '../src/data/menu.ts');
let content = fs.readFileSync(menuPath, 'utf8');

// 1. Update MenuCategory
content = content.replace(
  "export type MenuCategory = 'shisha' | 'drinks' | 'food' | 'kombis';",
  "export type MenuCategory = 'shisha' | 'drinks' | 'food' | 'happy_hour' | 'kombis';"
);

// 2. Add MenuItemVariation
const oldInterface = `export interface MenuItem {
  id: string;
  name: string | Record<string, string>;
  price: number;
  description: string | Record<string, string>;
  category: MenuCategory;
  subcategory?: string;
  isSignature?: boolean;
  imageUrl?: string;`;

const newInterface = `export interface MenuItemVariation {
  label: string | Record<string, string>;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string | Record<string, string>;
  price: number;
  description: string | Record<string, string>;
  category: MenuCategory;
  subcategory?: string;
  isSignature?: boolean;
  imageUrl?: string;
  variations?: MenuItemVariation[];`;

content = content.replace(oldInterface, newInterface);

// 3. Update Redbull & 28 Black Category to 'Energydrink'
content = content.replace(
  "id: 'd11',\n    name: { DE: 'RedBull', EN: 'RedBull', TR: 'RedBull' },\n    price: 4.90,\n    description: { DE: 'Klassischer Energy-Drink.', EN: 'Classic energy drink.', TR: 'Klasik enerji içeceği.' },\n    imageUrl: '/images/menury_originals/softdrinks__redbull.webp',\n    category: 'drinks',\n    subcategory: 'Softdrinks',",
  "id: 'd11',\n    name: { DE: 'RedBull', EN: 'RedBull', TR: 'RedBull' },\n    price: 4.90,\n    description: { DE: 'Klassischer Energy-Drink.', EN: 'Classic energy drink.', TR: 'Klasik enerji içeceği.' },\n    imageUrl: '/images/menury_originals/softdrinks__redbull.webp',\n    category: 'drinks',\n    subcategory: 'Energydrink',"
);

content = content.replace(
  "id: 'd12',\n    name: { DE: '28 Black (Schwarze Dose)', EN: '28 Black', TR: '28 Black' },\n    price: 4.90,\n    description: { DE: 'Premium Energy-Drink.', EN: 'Premium energy drink.', TR: 'Premium enerji içeceği.' },\n    imageUrl: '/images/menury_originals/softdrinks__28_black_schwarze_dose.webp',\n    category: 'drinks',\n    subcategory: 'Softdrinks',",
  "id: 'd12',\n    name: { DE: '28 Black (Schwarze Dose)', EN: '28 Black', TR: '28 Black' },\n    price: 4.90,\n    description: { DE: 'Premium Energy-Drink.', EN: 'Premium energy drink.', TR: 'Premium enerji içeceği.' },\n    imageUrl: '/images/menury_originals/softdrinks__28_black_schwarze_dose.webp',\n    category: 'drinks',\n    subcategory: 'Energydrink',"
);


// 4. Update Water (Mineralwasser and Stilles Wasser)
const waterOld = `  {
    id: 'd13',
    name: { DE: 'Mineralwasser', EN: 'Mineral Water', TR: 'Maden Suyu' },
    price: 3.20,
    description: { DE: '0,2l (3.20 €) | 0,7l (8.20 €)', EN: '0.2l (3.20 €) | 0.7l (8.20 €)', TR: '0,2l (3.20 €) | 0,7l (8.20 €)' },
    imageUrl: '/images/menury_originals/softdrinks__mineralwasser.webp',
    category: 'drinks',
    subcategory: 'Softdrinks',
  },
  {
    id: 'd15',
    name: { DE: 'Stilles Wasser', EN: 'Still Water', TR: 'Su' },
    price: 3.20,
    description: { DE: '0,2l (3.20 €) | 0,7l (8.20 €)', EN: '0.2l (3.20 €) | 0.7l (8.20 €)', TR: '0,2l (3.20 €) | 0,7l (8.20 €)' },
    imageUrl: '/images/menury_originals/softdrinks__stilles_wasser.webp',
    category: 'drinks',
    subcategory: 'Softdrinks',
  },`;

const waterNew = `  {
    id: 'd13',
    name: { DE: 'Mineralwasser / Stilles Wasser', EN: 'Mineral / Still Water', TR: 'Maden Suyu / Su' },
    price: 3.20,
    description: { DE: '', EN: '', TR: '' },
    variations: [
      { label: { DE: '0,2l', EN: '0.2l', TR: '0,2l' }, price: 3.20 },
      { label: { DE: '0,7l', EN: '0.7l', TR: '0,7l' }, price: 8.20 }
    ],
    imageUrl: '/images/menury_originals/softdrinks__mineralwasser.webp',
    category: 'drinks',
    subcategory: 'Softdrinks',
  },`;

content = content.replace(waterOld, waterNew);


fs.writeFileSync(menuPath, content, 'utf8');
console.log('Successfully applied interface, category, and water changes.');
