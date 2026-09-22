import re

filepath = r"C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update MenuItem interface safely
interface_old = """export interface MenuItem {
  id: string;
  name: string | Record<string, string>;
  price: number;
  description: string | Record<string, string>;
  category: MenuCategory;
  subcategory?: string;
  isSignature?: boolean;
  imageUrl?: string;"""

interface_new = """export interface MenuItemVariation {
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
  variations?: MenuItemVariation[];"""
content = content.replace(interface_old, interface_new)

# 2. Update RedBull and 28 Black to Energydrink
# Softdrinks -> Energydrink just for these two items.
rb_old = "    name: { DE: 'RedBull', EN: 'RedBull', TR: 'RedBull' },\n    price: 4.90,\n    description: { DE: 'Klassischer Energy-Drink.', EN: 'Classic energy drink.', TR: 'Klasik enerji içeceği.' },\n    imageUrl: '/images/menury_originals/softdrinks__redbull.webp',\n    category: 'drinks',\n    subcategory: 'Softdrinks',"
rb_new = rb_old.replace("'Softdrinks'", "'Energydrink'")
content = content.replace(rb_old, rb_new)

tb_old = "    name: { DE: '28 Black (Schwarze Dose)', EN: '28 Black', TR: '28 Black' },\n    price: 4.90,\n    description: { DE: 'Premium Energy-Drink.', EN: 'Premium energy drink.', TR: 'Premium enerji içeceği.' },\n    imageUrl: '/images/menury_originals/softdrinks__28_black_schwarze_dose.webp',\n    category: 'drinks',\n    subcategory: 'Softdrinks',"
tb_new = tb_old.replace("'Softdrinks'", "'Energydrink'")
content = content.replace(tb_old, tb_new)

# 3. Update Mineralwasser / Stilles Wasser
water_old = """  {
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
  },"""

water_new = """  {
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
  },"""
content = content.replace(water_old, water_new)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)
print("Applied clean updates.")
