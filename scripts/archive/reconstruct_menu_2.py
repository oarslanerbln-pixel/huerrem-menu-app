import sys
sys.stdout.reconfigure(encoding='utf-8')

filepath = r'C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# Strategy:
# 1. Manually parse all `{ ... }` blocks from the file using bracket counting.
# 2. Filter blocks to only those containing `id: '` AND `name:` AND `price:`. This guarantees we only get MenuItems and QuizItems, and completely excludes `export interface MenuItem`.
# 3. Separate `MenuItems` (contains `category:`) from `QuizItems` (contains `question:`).
# 4. Filter duplicates from `MenuItems` by `id: '...'`.
# 5. Fix image paths and empty out shake/kombi images inside the blocks themselves.
# 6. Append `hh_1`, `hh_2`, `spiele_1`.
# 7. Reconstruct the file safely.

blocks = []
depth = 0
current = []

for ch in text:
    if ch == '{':
        if depth == 0:
            current = []
        depth += 1
        current.append(ch)
    elif ch == '}':
        if depth > 0:
            depth -= 1
            current.append(ch)
            if depth == 0:
                blocks.append(''.join(current).strip())
        else:
            # Unbalanced }, ignore
            pass
    else:
        if depth > 0:
            current.append(ch)

import re

menu_items = []
quiz_items = []
seen_ids = set()

for block in blocks:
    if "id: '" in block and "name:" in block and ("price:" in block or block.find("price:") != -1 or "category:" in block):
        # Extract ID
        id_match = re.search(r"id:\s*'([^']+)'", block)
        if not id_match:
            continue
        item_id = id_match.group(1)
        
        if item_id in seen_ids:
            continue
        seen_ids.add(item_id)
        
        # Patch the block
        # Fix image paths
        block = re.sub(
            r"/images/menury_originals/signature_cocktails__([a-zA-Z0-9_]+)\.webp",
            r"/images/drinks/cocktails/signature_cocktails__\1.webp",
            block
        )
        block = re.sub(
            r"/images/menury_originals/highball_cocktails__([a-zA-Z0-9_]+)\.webp",
            r"/images/drinks/cocktails/highball_cocktails__\1.webp",
            block
        )
        
        # Empty Shake Images
        if item_id.startswith('d_shake_'):
            block = re.sub(r"imageUrl:\s*'[^']*'", "imageUrl: ''", block)
            if item_id in ['d_shake_1', 'd_shake_2', 'd_shake_3']:
                if 'allergens' not in block:
                    block = block.replace("category: 'drinks'", "allergens: ['G', 'H', 'A'],\n    category: 'drinks'")
            if item_id in ['d_shake_4', 'd_shake_5']:
                if 'allergens' not in block:
                    block = block.replace("category: 'drinks'", "allergens: ['G', 'H'],\n    category: 'drinks'")
        
        # Empty Kombi Images
        if item_id.startswith('hh_kombi'):
            block = re.sub(r"imageUrl:\s*'[^']*'", "imageUrl: ''", block)

        menu_items.append(block)
    elif "id: '" in block and "question:" in block and "options:" in block:
        quiz_items.append(block)

# Extract allergens and additives
allergen_dict = ""
allergen_match = re.search(r'export const allergenLegend.*?(?=\{)(.*?\}|.*)', text, re.DOTALL)
if allergen_match:
    import ast
    # let's just find the exact block for allergenLegend
    for b in blocks:
        if "'A':" in b and "'Glutenhaltiges Getreide'" in b:
            allergen_dict = b
            break

additive_dict = ""
for b in blocks:
    if "'1':" in b and "'mit Farbstoff'" in b:
        additive_dict = b
        break

# Append missing
missing_items = [
"""{
    id: 'hh_1',
    name: { DE: 'SHISHA + SOFTDRINK', EN: 'SHISHA + SOFTDRINK', TR: 'NARGİLE + SOFT İÇECEK' },
    price: 13.90,
    description: { 
      DE: 'Shisha + Softdrink Nachwahl\\nMontag-Freitag 14:00 - 19:00 Uhr', 
      EN: 'Shisha + Softdrink of choice\\nMonday-Friday 14:00 - 19:00', 
      TR: 'Seçmeli Nargile + Soft İçecek\\nPazartesi-Cuma 14:00 - 19:00' 
    },
    allergens: ['12', '16', 'C'],
    category: 'happy_hour',
    subcategory: 'Happy Hour',
    imageUrl: ''
  }""",
"""{
    id: 'hh_2',
    name: { DE: 'PASTA, BURGER, SALAT, BOWL\\'S', EN: 'PASTA, BURGER, SALAD, BOWL\\'S', TR: 'MAKARNA, BURGER, SALATA, BOWL' },
    price: 9.90,
    description: { 
      DE: 'Montag-Freitag | 16:00-19:00 Uhr\\nGenieße unsere Happy Hour und wähle dein Lieblingsgericht aus den Kategorien Pasta, Burger, Salat oder Bowl.\\nAusgenommen: Beef & Broccoli Penne sowie Beef Balance Bowl.', 
      EN: 'Monday-Friday | 16:00-19:00\\nEnjoy our Happy Hour and choose your favorite dish from the categories Pasta, Burger, Salad or Bowl.\\nExcluded: Beef & Broccoli Penne and Beef Balance Bowl.', 
      TR: 'Pazartesi-Cuma | 16:00-19:00\\nHappy Hour keyfini çıkarın ve Makarna, Burger, Salata veya Bowl kategorilerinden favori yemeğinizi seçin.\\nHariç: Beef & Broccoli Penne ve Beef Balance Bowl.' 
    },
    category: 'happy_hour',
    subcategory: 'Happy Hour',
    imageUrl: ''
  }""",
"""{
    id: 'spiele_1',
    name: { DE: 'SPIELE & SPAß', EN: 'GAMES & FUN', TR: 'OYUN & EĞLENCE' },
    price: 0,
    description: {
      DE: 'Für Ihre Unterhaltung bieten wir verschiedene Spiele an. Fragen Sie unser Team.',
      EN: 'For your entertainment we offer various games. Ask our team.',
      TR: 'Eğlenceniz için çeşitli oyunlar sunuyoruz. Ekibimize danışın.'
    },
    category: 'spiele',
    subcategory: 'Spiele',
    imageUrl: ''
  }"""
]
for item in missing_items:
    if "hh_1" in item and "hh_1" not in seen_ids:
        menu_items.append(item)
    elif "hh_2" in item and "hh_2" not in seen_ids:
        menu_items.append(item)
    elif "spiele_1" in item and "spiele_1" not in seen_ids:
        menu_items.append(item)

print(f"Extracted {len(menu_items)} menu items and {len(quiz_items)} quiz items.")

# Assemble final file
new_file = """export type MenuCategory = 'shisha' | 'drinks' | 'food' | 'kombis' | 'happy_hour' | 'spiele';

export interface MenuItemVariation {
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
  variations?: MenuItemVariation[];
  tags?: string[]; // For quiz matching
  allergens?: string[];
  additives?: string[];
  includes?: string[]; // For combinations
  badge?: string | Record<string, string>; // Small badge (e.g. "BELIEBT", "TOP DEAL")
  intensity?: 1 | 2 | 3 | 4 | 5; // Strength/intensity rating for Shishas (1 = Hafif, 5 = Çok Ağır)
  arModelUrl?: string; // Android/Web AR model (.glb)
  arIosModelUrl?: string; // iOS AR model (.usdz)
  themeColor?: string; // Hex color for intelligent ambient lighting
  flavorProfile?: {
    sweetness: number; // 0-100
    sourness: number;  // 0-100
    freshness: number; // 0-100
    strength: number;  // 0-100
  };
}

export const menuData: MenuItem[] = [
  """ + ",\n  ".join(menu_items) + """
];

export const quizQuestions = [
  """ + ",\n  ".join(quiz_items) + """
];

export const allergenLegend: Record<string, string> = """ + allergen_dict + """;

export const additiveLegend: Record<string, string> = """ + additive_dict + """;
"""

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_file)
print("File successfully reconstructed!")
