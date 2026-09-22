import re
import sys

filepath = r'C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts'
with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update cocktail image paths
text = re.sub(
    r"/images/menury_originals/signature_cocktails__([a-zA-Z0-9_]+)\.webp",
    r"/images/drinks/cocktails/signature_cocktails__\1.webp",
    text
)
text = re.sub(
    r"/images/menury_originals/highball_cocktails__([a-zA-Z0-9_]+)\.webp",
    r"/images/drinks/cocktails/highball_cocktails__\1.webp",
    text
)

# 2. Update Shakes to have empty images and add allergens if needed
# We just replace imageUrl: '/images/menury_originals/shakes__...' with imageUrl: ''
text = re.sub(
    r"(id:\s*'d_shake_[1-5]',\s*name:.*?\n\s*price:.*?\n\s*description:.*?\n\s*)imageUrl:\s*'[^']*'",
    r"\1imageUrl: ''",
    text,
    flags=re.DOTALL
)
# Ensure Shake allergens are there
text = re.sub(
    r"(id:\s*'d_shake_1'.*?imageUrl:\s*''.*?)(category:\s*'drinks')",
    r"\1allergens: ['G', 'H', 'A'],\n    \2",
    text,
    flags=re.DOTALL
)
text = re.sub(
    r"(id:\s*'d_shake_2'.*?imageUrl:\s*''.*?)(category:\s*'drinks')",
    r"\1allergens: ['G', 'H', 'A'],\n    \2",
    text,
    flags=re.DOTALL
)
text = re.sub(
    r"(id:\s*'d_shake_3'.*?imageUrl:\s*''.*?)(category:\s*'drinks')",
    r"\1allergens: ['G', 'H', 'A'],\n    \2",
    text,
    flags=re.DOTALL
)
text = re.sub(
    r"(id:\s*'d_shake_4'.*?imageUrl:\s*''.*?)(category:\s*'drinks')",
    r"\1allergens: ['G', 'H'],\n    \2",
    text,
    flags=re.DOTALL
)
text = re.sub(
    r"(id:\s*'d_shake_5'.*?imageUrl:\s*''.*?)(category:\s*'drinks')",
    r"\1allergens: ['G', 'H'],\n    \2",
    text,
    flags=re.DOTALL
)

# 3. Update Kombis to have empty images
text = re.sub(
    r"(id:\s*'hh_kombi[123]',\s*name:.*?\n\s*price:.*?\n\s*description:.*?\n\s*)imageUrl:\s*'[^']*'",
    r"\1imageUrl: ''",
    text,
    flags=re.DOTALL
)

# 4. Remove Duplicates Safely
# Strategy: find all blocks `{ ... }` that match an item definition.
# If we have seen the `id` before, we replace the block with an empty string.
seen_ids = set()
def replace_duplicate(match):
    block = match.group(0)
    id_match = re.search(r"id:\s*'([^']+)'", block)
    if id_match:
        item_id = id_match.group(1)
        if item_id in seen_ids:
            return "" # Remove it
        seen_ids.add(item_id)
    return block

# Find item blocks. Look for `{ \n id: '...', ... }`
# We use a regex that matches from `{` to `}` if it contains `id:` and `category:`
text = re.sub(r'\{\s*id:\s*\'[^\']+\'.*?category:\s*\'[^\']+\'.*?\}', replace_duplicate, text, flags=re.DOTALL)

# Clean up empty commas `,,` and `,\s*,`
text = re.sub(r',\s*,\s*\{', r',\n  {', text)
text = re.sub(r',\s*\];', r'\n];', text)
text = re.sub(r'\},\s*\];', r'}\n];', text)
text = re.sub(r'\},\s*,', r'},', text) # remove trailing extra commas after block
text = re.sub(r'\},\s*\{', r'},\n  {', text)

# 5. Append missing hh_1, hh_2, spiele_1 to the end of the menuData array
missing_items = """  {
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
  },
  {
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
  },
  {
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

# Insert right before the array ends
text = text.replace('\n];\n\nexport const allergenLegend', ',\n' + missing_items + '\n];\n\nexport const allergenLegend')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(text)

print("Safely updated menu.ts!")
