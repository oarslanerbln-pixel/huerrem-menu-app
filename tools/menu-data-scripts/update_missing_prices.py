import re
import sys

with open('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', 'r', encoding='utf-8') as f:
    c = f.read()

def remove_item(content, identifier):
    # This regex looks for { ... identifier ... }
    # Since objects can have nested {}, we have to be careful.
    # It's better to find the identifier, then find the enclosing { and }
    idx = content.find(identifier)
    if idx == -1:
        return content
        
    start_idx = content.rfind('{', 0, idx)
    # To find the end, we need to balance braces
    brace_count = 0
    end_idx = -1
    for i in range(start_idx, len(content)):
        if content[i] == '{':
            brace_count += 1
        elif content[i] == '}':
            brace_count -= 1
            if brace_count == 0:
                end_idx = i
                break
                
    if end_idx != -1:
        # Also remove trailing comma and whitespace if present
        next_comma = content.find(',', end_idx)
        if next_comma != -1 and content[end_idx+1:next_comma].isspace():
            end_idx = next_comma
            
        print(f"Removing {identifier}")
        return content[:start_idx] + content[end_idx+1:].lstrip()
    return content

c = remove_item(c, '"d_sd_moloko"')
c = remove_item(c, "'d_sd_moloko'")

c = remove_item(c, '"d27"')
c = remove_item(c, "'d27'")

c = remove_item(c, '"White Chocolate"')
c = remove_item(c, "'White Chocolate'")

c = remove_item(c, '"Dark Chocolate"')
c = remove_item(c, "'Dark Chocolate'")

new_items = """  {
    "id": "d_sd_moloko",
    "name": {
      "DE": "Moloko",
      "EN": "Moloko",
      "TR": "Moloko",
      "FR": "Moloko",
      "ES": "Moloko",
      "RU": "Молоко"
    },
    "price": 4.90,
    "description": {
      "DE": "0,25l - Für alle Sorten bitte unser Personal fragen.\\nZusatzstoffe: (1) mit Farbstoff, (2) mit Konservierungsstoffen, (3) mit Antioxidationsmitteln, (13) koffeinhaltig.",
      "EN": "0.25l - Please ask our staff for all varieties.\\nAdditives: (1) with colorant, (2) with preservatives, (3) with antioxidants, (13) caffeinated.",
      "TR": "0,25l - Tüm çeşitler için lütfen personelimize danışın.\\nKatkı maddeleri: (1) renklendirici, (2) koruyucu, (3) antioksidan, (13) kafein içerir."
    },
    "imageUrl": "/images/menury_originals/softdrinks__moloko.webp",
    "category": "drinks",
    "subcategory": "Softdrinks"
  },
  {
    "id": "d27",
    "name": {
      "DE": "Cappuccino",
      "EN": "Cappuccino",
      "TR": "Cappuccino",
      "FR": "Cappuccino",
      "ES": "Capuchino",
      "RU": "Капучино"
    },
    "price": 3.90,
    "description": {
      "DE": "Ein Klassiker aus Espresso, heißer Milch und cremigem Milchschaum.",
      "EN": "A classic made of espresso, hot milk and creamy milk froth.",
      "TR": "Espresso, sıcak süt ve kremsi süt köpüğünden oluşan bir klasik."
    },
    "imageUrl": "",
    "category": "drinks",
    "subcategory": "Kaffeespezialitäten"
  },
  {
    "id": "d_heisse_schokolade",
    "name": {
      "DE": "Heiße Schokolade",
      "EN": "Hot Chocolate",
      "TR": "Sıcak Çikolata",
      "FR": "Chocolat chaud",
      "ES": "Chocolate caliente",
      "RU": "Горячий шоколад"
    },
    "price": 4.90,
    "description": {
      "DE": "Intensive dunkle Schokolade, (Auf Wunsch mit Sahne) - ein Traum für Schokoladenliebhaber.",
      "EN": "Intensive dark chocolate, (with cream on request) - a dream for chocolate lovers.",
      "TR": "Yoğun bitter çikolata, (istek üzerine krema ile) - çikolata severler için bir rüya."
    },
    "imageUrl": "/images/menury_originals/heisse_specials__dark_chocolate.webp",
    "category": "drinks",
    "subcategory": "Heiße Specials"
  },
  {
    "id": "d_white_chocolate",
    "name": {
      "DE": "Weiße Schokolade",
      "EN": "White Chocolate",
      "TR": "Beyaz Çikolata",
      "FR": "Chocolat blanc",
      "ES": "Chocolate blanco",
      "RU": "Белый шоколад"
    },
    "price": 4.90,
    "description": {
      "DE": "Cremige weiße Schokolade, (Auf Wunsch mit Sahne und zerbröselten Spekulatius) - perfekt für süße Genussmomente.",
      "EN": "Creamy white chocolate, (with cream and crumbled speculoos on request) - perfect for sweet moments of pleasure.",
      "TR": "Kremsi beyaz çikolata, (istek üzerine krema ve ufalanmış speculoos bisküvisi ile) - tatlı keyif anları için mükemmel."
    },
    "imageUrl": "/images/menury_originals/heisse_specials__white_chocolate.webp",
    "category": "drinks",
    "subcategory": "Heiße Specials"
  },
"""

# Now insert new_items just before "spiele_info"
spiele_idx = c.find('"id": "spiele_info"')
insert_idx = c.rfind('{', 0, spiele_idx)

final_c = c[:insert_idx] + new_items + c[insert_idx:]

with open('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(final_c)

print("Updated Moloko, Cappuccino, Hot Chocolate, and White Chocolate with correct prices!")
