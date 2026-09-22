import re

menu_path = r"C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts"
with open(menu_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Remove old Happy Hour combos (Kombi 1, Kombi 2, Kombi 3) safely!
# We find { id: 'hh_kombiX', ... } up to the NEXT },
# But we make sure it's exactly the object!
def remove_combo(code, id_str):
    idx = code.find(f"id: '{id_str}'")
    if idx == -1: return code
    # Find the preceding {
    start = code.rfind('{', 0, idx)
    # Find the matching closing } for this object
    # We can just look for `  },` after idx
    match = re.search(r'\n[ \t]*\},?\s*', code[idx:])
    if match:
        end = idx + match.end()
        # Remove it
        return code[:start] + code[end:]
    return code

code = remove_combo(code, 'hh_kombi1')
code = remove_combo(code, 'hh_kombi2')
code = remove_combo(code, 'hh_kombi3')


# 2. Add New Happy Hour combos + missing Cocktails
newData = """  {
    id: 'hh_new_1',
    name: { DE: 'SHISHA + SOFTDRINK ¹³, ¹⁶, ᶜ', EN: 'SHISHA + SOFTDRINK ¹³, ¹⁶, ᶜ', TR: 'SHISHA + SOFTDRINK ¹³, ¹⁶, ᶜ' },
    price: 13.90,
    description: { DE: 'Shisha + Softdrink Nachwahl\\nMontag-Freitag 14:00 - 19:00 Uhr', EN: 'Shisha + Softdrink of choice\\nMonday-Friday 14:00 - 19:00', TR: 'Nargile + Seçmeli Meşrubat\\nPazartesi-Cuma 14:00 - 19:00' },
    imageUrl: '',
    category: 'happy_hour',
    subcategory: 'Happy Hour'
  },
  {
    id: 'hh_new_2',
    name: { DE: "PASTA, BURGER, SALAT, BOWL'S", EN: "PASTA, BURGER, SALAD, BOWL'S", TR: "MAKARNA, BURGER, SALATA, BOWL'S" },
    price: 9.90,
    description: { 
      DE: 'Montag-Freitag | 16:00-19:00 Uhr\\nGenieße unsere Happy Hour und wähle dein Lieblingsgericht aus den Kategorien Pasta, Burger, Salat oder Bowl. Ausgenommen: Beef & Broccoli Penne sowie Beef Balance Bowl.', 
      EN: 'Monday-Friday | 16:00-19:00\\nEnjoy our Happy Hour and choose your favorite dish from the categories Pasta, Burger, Salad or Bowl. Excluded: Beef & Broccoli Penne and Beef Balance Bowl.', 
      TR: 'Pazartesi-Cuma | 16:00-19:00\\nHappy Hour keyfini çıkarın ve Makarna, Burger, Salata veya Bowl kategorilerinden en sevdiğiniz yemeği seçin. Hariç: Beef & Broccoli Penne ve Beef Balance Bowl.' 
    },
    imageUrl: '',
    category: 'happy_hour',
    subcategory: 'Happy Hour'
  },
  {
    id: 'd_sig_missing_1',
    name: { DE: 'Butterfly Pea Flower Tea', EN: 'Butterfly Pea Flower Tea', TR: 'Butterfly Pea Flower Tea' },
    price: 8.90,
    description: { DE: 'Blauer Blütentee trifft auf fruchtiges Wildberry und süßen Honig - ein sanftes, harmonisches Geschmackserlebnis', EN: 'Blue blossom tea meets fruity wildberry and sweet honey - a gentle, harmonious taste experience', TR: 'Mavi çiçek çayı, meyvemsi wildberry ve tatlı bal ile buluşuyor - yumuşak, uyumlu bir lezzet deneyimi' },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_missing_2',
    name: { DE: 'Beautiful Dream ⁶', EN: 'Beautiful Dream ⁶', TR: 'Beautiful Dream ⁶' },
    price: 9.40,
    description: { DE: 'Erdbeerpüree, Sahne, Kokoscreme, weiße Schokolade, Kirschsaft', EN: 'Strawberry puree, cream, coconut cream, white chocolate, cherry juice', TR: 'Çilek püresi, krema, hindistan cevizi kreması, beyaz çikolata, vişne suyu' },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_hc_missing_1',
    name: { DE: 'Dreamy Breeze (Bubble-Tea) ⁶', EN: 'Dreamy Breeze (Bubble-Tea) ⁶', TR: 'Dreamy Breeze (Bubble-Tea) ⁶' },
    price: 10.90,
    description: { DE: 'Ube-Flavour, brauner Zuckersirup, Kokosmilch, Blaubeerperlen, Heavy Cream\\nEin cremiger, exotischer Genuss mit überraschendem Look.', EN: 'Ube flavor, brown sugar syrup, coconut milk, blueberry pearls, heavy cream\\nA creamy, exotic delight with a surprising look.', TR: 'Ube aroması, esmer şeker şurubu, hindistan cevizi sütü, yaban mersini incileri, ağır krema\\nŞaşırtıcı görünümüyle kremsi, egzotik bir lezzet.' },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'High-Class Cocktails'
  },
"""
# Ensure there is a comma before the new items if we inject them at the end.
endMarker = "];"
lastIndex = code.rfind(endMarker)
if lastIndex != -1:
    # Check if the previous non-whitespace character is a comma or closing brace
    # Actually just insert it before `];` safely.
    # The array is `  }, \n];` usually
    # If the last item ends with `}`, it needs a `,`
    # Let's just do it carefully
    before = code[:lastIndex]
    if before.rstrip().endswith('}'):
        before = before.rstrip() + ',\n'
    code = before + newData + code[lastIndex:]

# 3. Add allergen superscripts to existing names
code = re.sub(r"(name:\s*\{\s*DE:\s*)('Coconut Kiss')(,\s*EN:\s*)('Coconut Kiss')(,\s*TR:\s*)('Coconut Kiss')", r"\g<1>'Coconut Kiss ⁹'\g<3>'Coconut Kiss ⁹'\g<5>'Coconut Kiss ⁹'", code)
code = re.sub(r"(name:\s*\{\s*DE:\s*)('Solero')(,\s*EN:\s*)('Solero')(,\s*TR:\s*)('Solero')", r"\g<1>'Solero ᶜ'\g<3>'Solero ᶜ'\g<5>'Solero ᶜ'", code)
code = re.sub(r"(name:\s*\{\s*DE:\s*)('Violet')(,\s*EN:\s*)('Violet')(,\s*TR:\s*)('Violet')", r"\g<1>'Violet (Wood Smoke) ᵃ, ᶜ'\g<3>'Violet (Wood Smoke) ᵃ, ᶜ'\g<5>'Violet (Wood Smoke) ᵃ, ᶜ'", code)
code = re.sub(r"(name:\s*\{\s*DE:\s*)('Another One')(,\s*EN:\s*)('Another One')(,\s*TR:\s*)('Another One')", r"\g<1>'Another One (Wood Smoke) ᵃ, ᶜ'\g<3>'Another One (Wood Smoke) ᵃ, ᶜ'\g<5>'Another One (Wood Smoke) ᵃ, ᶜ'", code)
code = re.sub(r"(name:\s*\{\s*DE:\s*)('Cloud Seven')(,\s*EN:\s*)('Cloud Seven')(,\s*TR:\s*)('Cloud Seven')", r"\g<1>'Cloud Seven (Balloon Glass) ᵃ'\g<3>'Cloud Seven (Balloon Glass) ᵃ'\g<5>'Cloud Seven (Balloon Glass) ᵃ'", code)

with open(menu_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("Update successful!")
