import sys

try:
    with open('menu.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    butterfly = """
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
  },"""

    beautiful = """
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
  },"""

    americano = """
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
  },"""

    matcha = """
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
  }"""

    idx = content.find('export const alchemistQuestions')
    if idx == -1:
        idx = content.find('export const allergenLegend')

    if idx != -1:
        pre_text = content[:idx]
        post_text = content[idx:]
        last_bracket = pre_text.rfind('];')
        if last_bracket != -1:
            updated = pre_text[:last_bracket] + butterfly + beautiful + americano + matcha + '\n];' + pre_text[last_bracket+2:] + post_text
            with open('menu.ts', 'w', encoding='utf-8') as f:
                f.write(updated)
            print("Successfully updated menu.ts")
        else:
            print("Could not find closing bracket")
    else:
        print("Could not find insertion point")
except Exception as e:
    print("Error:", str(e))
