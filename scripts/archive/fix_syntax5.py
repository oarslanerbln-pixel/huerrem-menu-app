import re

path = r"C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix Sahlep
old_sahlep = """    category: 'drinks',
    tags: ['intense', 'sweet']
  },
    price: 5.50,
    description: { 
      DE: 'Ein traditionelles, cremiges Heißgetränk mit feiner Vanillenote und einem Hauch Zimt.',"""
new_sahlep = """    category: 'drinks',
    subcategory: 'Heiße Specials',
    tags: ['intense', 'sweet']
  },
  {
    id: 'd_hs_5',
    name: { DE: 'Sahlep', EN: 'Sahlep', TR: 'Sahlep' },
    price: 5.50,
    description: { 
      DE: 'Ein traditionelles, cremiges Heißgetränk mit feiner Vanillenote und einem Hauch Zimt.',"""

content = content.replace(old_sahlep, new_sahlep)

# Add subcategory to sahlep end
old_sahlep_end = """    imageUrl: '/images/menury_originals/heisse_specials__sahlep.webp',
    category: 'drinks',
    tags: ['creamy', 'classic']
  },"""
new_sahlep_end = """    imageUrl: '/images/menury_originals/heisse_specials__sahlep.webp',
    category: 'drinks',
    subcategory: 'Heiße Specials',
    tags: ['creamy', 'classic']
  },"""

content = content.replace(old_sahlep_end, new_sahlep_end)

# Remove broken Happy Hour combos and fix missing comma
# Find the end of Shakes
old_kombis = """  // --- HAPPY HOUR COMBOS ---
  
    price: 18.90,
    description: { DE: 'Classic Pfeife + Tee (Schwarztee, Apfeltee, Früchtetee oder Grüntee). Premium Pfeife: +3€. (Mo-Fr 10:00 - 15:00)', EN: 'Classic Shisha + Tea (Black, Apple, Fruit or Green). Premium Shisha: +3€. (Mo-Fr 10:00 - 15:00)', TR: 'Klasik Nargile + Çay (Siyah, Elma, Meyve veya Yeşil). Premium Nargile: +3€. (Pzt-Cum 10:00 - 15:00)' },
    imageUrl: '',
    category: 'happy_hour',
    subcategory: 'Happy Hour'
  },
  
    price: 19.90,
    description: { DE: 'Classic Pfeife + Softdrink / Saft. Premium Pfeife: +3€. (Mo-Fr 10:00 - 15:00)', EN: 'Classic Shisha + Soft drink / Juice. Premium Shisha: +3€. (Mo-Fr 10:00 - 15:00)', TR: 'Klasik Nargile + Meşrubat / Meyve Suyu. Premium Nargile: +3€. (Pzt-Cum 10:00 - 15:00)' },
    imageUrl: '',
    category: 'happy_hour',
    subcategory: 'Happy Hour'
  },
  
    price: 21.90,
    description: { DE: 'Classic Pfeife + Milchshake. Premium Pfeife: +3€. (Mo-Fr 10:00 - 15:00)', EN: 'Classic Shisha + Milkshake. Premium Shisha: +3€. (Mo-Fr 10:00 - 15:00)', TR: 'Klasik Nargile + Milkshake. Premium Nargile: +3€. (Pzt-Cum 10:00 - 15:00)' },
    imageUrl: '',
    category: 'happy_hour',
    subcategory: 'Happy Hour'
  }


  {
    id: 'd_kt_1',"""

new_kombis = """  // --- HAPPY HOUR COMBOS ---
  {
    id: 'd_kt_1',"""

content = content.replace(old_kombis, new_kombis)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed!")
