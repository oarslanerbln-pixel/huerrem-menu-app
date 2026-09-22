import sys

with open('menu.ts', 'r', encoding='utf-8') as f:
    current = f.read()

with open('C:/Users/oarsl/old_menu.ts', 'r', encoding='utf-8') as f:
    old = f.read()

# 1. Find the end of spiele_info in current
# "id": "spiele_info"
spiele_idx = current.find('"id": "spiele_info"')
if spiele_idx == -1:
    print("Could not find spiele_info")
    sys.exit(1)

# Find the closing brace of spiele_info
end_spiele = current.find('}', spiele_idx)
# Keep going until we find the real end of the object
while current[end_spiele+1:end_spiele+3] != '\n  ' and current[end_spiele+1:end_spiele+3] != ',\n':
    end_spiele = current.find('}', end_spiele+1)
    if end_spiele == -1: break

if end_spiele == -1:
    print("Could not find end of spiele_info")
    sys.exit(1)

# We want everything up to the end of spiele_info object, including the '}'
clean_current = current[:end_spiele+1]

# 2. Re-define our new items
new_items = """
  {
    "id": "c_butterfly",
    "name": {
      "DE": "Butterfly Pea Flower Tea",
      "EN": "Butterfly Pea Flower Tea",
      "TR": "Butterfly Pea Flower Tea"
    },
    "price": 8.9,
    "description": {
      "DE": "Blauer Blütentee trifft auf fruchtiges Wildberry und süßen Honig - ein sanftes, harmonisches Geschmackserlebnis",
      "EN": "Blue blossom tea meets fruity wild berry and sweet honey - a gentle, harmonious taste experience",
      "TR": "Mavi çiçek çayı meyvemsi wildberry ve tatlı bal ile buluşuyor - yumuşak, uyumlu bir lezzet deneyimi"
    },
    "category": "drinks",
    "subcategory": "Signature Cocktails"
  },
  {
    "id": "c_beautiful_dream",
    "name": {
      "DE": "Beautiful Dream",
      "EN": "Beautiful Dream",
      "TR": "Beautiful Dream"
    },
    "price": 9.4,
    "description": {
      "DE": "Erdbeerpüree, Sahne, Kokoscreme, weiße Schokolade, Kirschsaft",
      "EN": "Strawberry puree, cream, coconut cream, white chocolate, cherry juice",
      "TR": "Çilek püresi, krema, hindistan cevizi kreması, beyaz çikolata, vişne suyu"
    },
    "allergens": ["G"],
    "category": "drinks",
    "subcategory": "Signature Cocktails"
  },
  {
    "id": "ss_iced_americano",
    "name": {
      "DE": "Iced Americano",
      "EN": "Iced Americano",
      "TR": "Iced Americano"
    },
    "price": 6.9,
    "description": {
      "DE": "Klassischer eisgekühlter Americano",
      "EN": "Classic iced Americano",
      "TR": "Klasik buzlu Americano"
    },
    "category": "drinks",
    "subcategory": "Sommer-Specials"
  },
  {
    "id": "ss_iced_matcha",
    "name": {
      "DE": "Iced Matcha",
      "EN": "Iced Matcha",
      "TR": "Iced Matcha"
    },
    "price": 6.9,
    "description": {
      "DE": "Erfrischender Iced Matcha",
      "EN": "Refreshing iced Matcha",
      "TR": "Ferahlatıcı buzlu Matcha"
    },
    "category": "drinks",
    "subcategory": "Sommer-Specials"
  },
  {
    "id": "c_espresso_doppio",
    "name": {
      "DE": "Espresso Doppio",
      "EN": "Espresso Doppio",
      "TR": "Espresso Doppio",
      "FR": "Espresso Doppio",
      "ES": "Espresso Doppio",
      "RU": "Espresso Doppio"
    },
    "price": 3.9,
    "description": {
      "DE": "Doppelter Espresso",
      "EN": "Double Espresso",
      "TR": "Duble Espresso"
    },
    "category": "drinks",
    "subcategory": "Kaffeespezialitäten"
  },
  {
    "id": "t_cay_klein",
    "name": {
      "DE": "Kleiner Türkischer Tee",
      "EN": "Small Turkish Tea",
      "TR": "Küçük Çay",
      "FR": "Petit thé turc",
      "ES": "Pequeño té turco",
      "RU": "Маленький турецкий чай"
    },
    "price": 1.9,
    "description": {
      "DE": "Klassischer türkischer Schwarztee im kleinen Glas",
      "EN": "Classic Turkish black tea in a small glass",
      "TR": "İnce belli bardakta klasik Türk çayı"
    },
    "category": "drinks",
    "subcategory": "Teespezialitäten"
  },
  {
    "id": "t_minztee",
    "name": {
      "DE": "Frischer Minztee",
      "EN": "Fresh Mint Tea",
      "TR": "Taze Nane Çayı",
      "FR": "Thé à la menthe fraîche",
      "ES": "Té de menta fresca",
      "RU": "Свежий мятный чай"
    },
    "price": 4.5,
    "description": {
      "DE": "Tee aus frischen Minzblättern",
      "EN": "Tea made from fresh mint leaves",
      "TR": "Taze nane yapraklarından çay"
    },
    "category": "drinks",
    "subcategory": "Teespezialitäten"
  },
  {
    "id": "t_ingwer",
    "name": {
      "DE": "Ingwer Tee",
      "EN": "Ginger Tea",
      "TR": "Zencefil Çayı",
      "FR": "Thé au gingembre",
      "ES": "Té de jengibre",
      "RU": "Имбирный чай"
    },
    "price": 4.5,
    "description": {
      "DE": "Wärmender Tee mit frischem Ingwer",
      "EN": "Warming tea with fresh ginger",
      "TR": "Taze zencefilli ısıtan çay"
    },
    "category": "drinks",
    "subcategory": "Teespezialitäten"
  },
  {
    "id": "t_ingwer_minze",
    "name": {
      "DE": "Ingwer Minze Tee",
      "EN": "Ginger Mint Tea",
      "TR": "Zencefilli Nane Çayı",
      "FR": "Thé gingembre-menthe",
      "ES": "Té de jengibre y menta",
      "RU": "Имбирно-мятный чай"
    },
    "price": 4.5,
    "description": {
      "DE": "Erfrischende Kombination aus Ingwer und Minze",
      "EN": "Refreshing combination of ginger and mint",
      "TR": "Zencefil ve nanenin ferahlatıcı uyumu"
    },
    "category": "drinks",
    "subcategory": "Teespezialitäten"
  },
  {
    "id": "t_huerrem",
    "name": {
      "DE": "Hürrem Tee",
      "EN": "Hürrem Tea",
      "TR": "Hürrem Çayı",
      "FR": "Thé Hürrem",
      "ES": "Té Hürrem",
      "RU": "Чай Хюррем"
    },
    "price": 5.2,
    "description": {
      "DE": "Unsere exklusive Hürrem Hausmischung",
      "EN": "Our exclusive Hürrem house blend",
      "TR": "Özel Hürrem ev yapımı harmanımız"
    },
    "category": "drinks",
    "subcategory": "Teespezialitäten"
  },
  {
    "id": "t_linden",
    "name": {
      "DE": "Lindenblüten Tee",
      "EN": "Linden Blossom Tea",
      "TR": "Ihlamur Çayı",
      "FR": "Thé de tilleul",
      "ES": "Té de tilo",
      "RU": "Липовый чай"
    },
    "price": 4.5,
    "description": {
      "DE": "Beruhigender Lindenblütentee",
      "EN": "Soothing linden blossom tea",
      "TR": "Rahatlatıcı ıhlamur çayı"
    },
    "category": "drinks",
    "subcategory": "Teespezialitäten"
  }"""

# 3. Get the bottom from old_menu.ts
idx_quiz = old.find('export const quizQuestions = [')
if idx_quiz == -1:
    print("Could not find quizQuestions in old_menu.ts")
    sys.exit(1)

bottom_part = old[idx_quiz:]

# 4. Construct final string
final_content = clean_current + ",\n" + new_items + "\n];\n\n" + bottom_part

with open('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(final_content)

print("menu.ts fully repaired and items correctly appended!")
