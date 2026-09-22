import sys
import re

try:
    with open('menu.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # Function to update price for a specific EN name
    def update_price(content, en_name, new_price):
        # find the block with this EN name
        pattern = r'(\{\s*"id":\s*"[^"]+",\s*"name":\s*\{[^\}]*"EN":\s*"' + re.escape(en_name) + r'"[^\}]*\}[ \t\n\r\w\W]*?"price":\s*)([\d\.]+)'
        return re.sub(pattern, r'\g<1>' + str(new_price), content, count=1)

    content = update_price(content, 'Moloko', 4.9)
    content = update_price(content, 'Cappuccino', 3.9)
    content = update_price(content, 'Hot Chocolate', 4.9)
    content = update_price(content, 'White Chocolate', 4.9)

    new_items = """
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
  }
"""

    idx = content.find('export const alchemistQuestions')
    if idx == -1:
        idx = content.find('export const allergenLegend')

    if idx != -1:
        pre_text = content[:idx]
        post_text = content[idx:]
        last_bracket = pre_text.rfind('];')
        if last_bracket != -1:
            updated = pre_text[:last_bracket] + ',' + new_items + '\n];' + pre_text[last_bracket+2:] + post_text
            with open('menu.ts', 'w', encoding='utf-8') as f:
                f.write(updated)
            print("Successfully updated menu.ts with teas and coffees")
        else:
            print("Could not find closing bracket")
    else:
        print("Could not find insertion point")
except Exception as e:
    print("Error:", str(e))
