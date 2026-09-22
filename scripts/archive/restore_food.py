import re
import os

# 1. Patch index.css
css_path = r'c:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\index.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

# Replace body { ... overflow-x: hidden; ... } with html, body { ... }
css_content = css_content.replace('''html {
  -webkit-tap-highlight-color: transparent;
  scroll-behavior: smooth;
  font-family: var(--font-body);
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  position: relative;
}''', '''html, body {
  -webkit-tap-highlight-color: transparent;
  scroll-behavior: smooth;
  font-family: var(--font-body);
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
  position: relative;
}''')

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css_content)


# 2. Restore menu.ts food items
menu_path = r'c:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts'
with open(menu_path, 'r', encoding='utf-8') as f:
    menu_content = f.read()

food_items_str = """
  // --- Food / Yemekler ---
  {
    id: 'f1',
    name: { DE: 'Hummus', EN: 'Hummus', TR: 'Hummus' },
    price: 6.90,
    description: { DE: 'Cremiger Kichererbsen-Dip mit Olivenöl und Paprika.', EN: 'Creamy chickpea dip with olive oil and paprika.', TR: 'Zeytinyağı ve kırmızı biberli kremsi nohut ezmesi.' },
    imageUrl: '/images/menury_originals/vorspeisen__hummus.webp',
    category: 'food',
    subcategory: 'Vorspeisen',
    tags: ['classic', 'creamy']
  },
  {
    id: 'f2',
    name: { DE: 'Sigara Böreği', EN: 'Sigara Böreği', TR: 'Sigara Böreği' },
    price: 7.50,
    description: { DE: 'Knusprige Yufka-Röllchen gefüllt mit Schafskäse und Petersilie.', EN: 'Crispy yufka rolls filled with feta cheese and parsley.', TR: 'Beyaz peynir ve maydanoz dolgulu çıtır yufka rulo.' },
    imageUrl: '',
    category: 'food',
    subcategory: 'Vorspeisen',
    tags: ['classic', 'crispy']
  },
  {
    id: 'f3',
    name: { DE: 'Mercimek Çorbası', EN: 'Lentil Soup', TR: 'Mercimek Çorbası' },
    price: 5.90,
    description: { DE: 'Türkische rote Linsensuppe mit Zitrone und Minze.', EN: 'Turkish red lentil soup with lemon and mint.', TR: 'Limon ve nane eşliğinde geleneksel kırmızı mercimek çorbası.' },
    imageUrl: '',
    category: 'food',
    subcategory: 'Vorspeisen',
    tags: ['classic']
  },
  {
    id: 'f4',
    name: { DE: 'Falafel Teller', EN: 'Falafel Plate', TR: 'Falafel Tabağı' },
    price: 8.90,
    description: { DE: 'Knusprige Kichererbsen-Bällchen mit Tahin-Sauce und Salat.', EN: 'Crispy chickpea balls with tahini sauce and salad.', TR: 'Tahin sosu ve taze salata ile çıtır nohut köfteleri.' },
    imageUrl: '/images/food/falafel_teller.png',
    category: 'food',
    subcategory: 'Vorspeisen',
    tags: ['crispy']
  },
  {
    id: 'f5',
    name: { DE: 'Adana Kebab', EN: 'Adana Kebab', TR: 'Adana Kebap' },
    price: 14.90,
    description: { DE: 'Würziger Hackfleischspieß vom Grill mit Reis und Salat.', EN: 'Spicy grilled minced meat skewer with rice and salad.', TR: 'Izgarada pişmiş baharatlı kıyma şiş, pilav ve salata ile.' },
    imageUrl: '/images/food/adana_kebab.png',
    category: 'food',
    subcategory: 'Hauptgerichte',
    isSignature: true,
    tags: ['meat', 'intense'],
  },
  {
    id: 'f6',
    name: { DE: 'Chicken Wings', EN: 'Chicken Wings', TR: 'Tavuk Kanatları' },
    price: 11.90,
    description: { DE: 'Knusprige Chicken Wings mit BBQ-Sauce und Cole Slaw.', EN: 'Crispy chicken wings with BBQ sauce and coleslaw.', TR: 'Barbekü soslu ve lahana salatalı çıtır tavuk kanatları.' },
    imageUrl: '/images/food/chicken_wings.png',
    category: 'food',
    subcategory: 'Hauptgerichte',
    tags: ['meat', 'crispy']
  },
  {
    id: 'f7',
    name: { DE: 'Beyti Sarma', EN: 'Beyti Sarma', TR: 'Beyti Sarma' },
    price: 15.90,
    description: { DE: 'Gerollter Kebab in Lavash mit Tomaten-Butter-Sauce und Joghurt.', EN: 'Rolled kebab in lavash with tomato-butter sauce and yogurt.', TR: 'Lavaş ekmeğine sarılı kebap, domates-tereyağı sosu ve yoğurt ile.' },
    imageUrl: '/images/food/beyti_sarma.png',
    category: 'food',
    subcategory: 'Hauptgerichte',
    tags: ['meat', 'creamy']
  },
  {
    id: 'f8',
    name: { DE: 'Pide Kaşarlı', EN: 'Cheese Pide', TR: 'Kaşarlı Pide' },
    price: 10.90,
    description: { DE: 'Türkische Pizza mit Käse – knusprig aus dem Steinofen.', EN: 'Turkish pizza with cheese – crispy from the stone oven.', TR: 'Taş fırından çıtır çıtır, bol kaşar peynirli Türk pizzası.' },
    imageUrl: '',
    category: 'food',
    subcategory: 'Hauptgerichte',
    tags: ['classic', 'crispy']
  },
  {
    id: 'f9',
    name: { DE: 'Lahmacun', EN: 'Lahmacun', TR: 'Lahmacun' },
    price: 7.90,
    description: { DE: 'Hauchdünner türkischer Fladen mit Hackfleisch und Kräutern.', EN: 'Wafer-thin Turkish flatbread with minced meat and herbs.', TR: 'Kıyma ve taze otlarla hazırlanmış incecik Türk pizzası.' },
    imageUrl: '/images/food/lahmacun.png',
    category: 'food',
    subcategory: 'Hauptgerichte',
    tags: ['classic', 'crispy']
  },
  {
    id: 'f10',
    name: { DE: 'Pommes Frites', EN: 'French Fries', TR: 'Patates Kızartması' },
    price: 5.50,
    description: { DE: 'Knusprige Pommes mit Ketchup oder Mayo.', EN: 'Crispy fries with ketchup or mayo.', TR: 'Ketçap veya mayonez ile çıtır patates kızartması.' },
    imageUrl: '/images/food/pommes_frites.png',
    category: 'food',
    subcategory: 'Snacks',
    tags: ['crispy']
  },
  {
    id: 'f11',
    name: { DE: 'Nachos Supreme', EN: 'Nachos Supreme', TR: 'Nachos Supreme' },
    price: 8.90,
    description: { DE: 'Tortilla-Chips mit Käse, Jalapeños und Sour Cream.', EN: 'Tortilla chips with cheese, jalapeños and sour cream.', TR: 'Peynir, jalapeño ve ekşi krema eşliğinde tortilla cipsleri.' },
    imageUrl: '/images/food/nachos_supreme.png',
    category: 'food',
    subcategory: 'Snacks',
    tags: ['crispy']
  },
  {
    id: 'f12',
    name: { DE: 'Cheese Burger', EN: 'Cheese Burger', TR: 'Cheese Burger' },
    price: 9.90,
    description: { DE: 'Saftiges Rindfleisch-Patty mit Cheddar, Salat und Sauce.', EN: 'Juicy beef patty with cheddar, lettuce and sauce.', TR: 'Cheddar peyniri, marul ve özel soslu sulu dana köftesi.' },
    imageUrl: '/images/food/cheese_burger.png',
    category: 'food',
    subcategory: 'Snacks',
    tags: ['meat']
  },
"""

# Replace the empty // --- Food / Yemekler --- section with the populated one
menu_content = re.sub(r'// --- Food / Yemekler ---.*?(?=\s+// --- Kombis ---)', food_items_str, menu_content, flags=re.DOTALL)

with open(menu_path, 'w', encoding='utf-8') as f:
    f.write(menu_content)

print("Food items restored and index.css viewport patched successfully.")
