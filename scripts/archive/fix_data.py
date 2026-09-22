import codecs
import re

content = codecs.open('src/data/menu.ts', 'r', 'utf-8').read()

# 1. Add happy_hour to MenuCategory
content = content.replace(
    "export type MenuCategory = 'shisha' | 'drinks' | 'food' | 'kombis';",
    "export type MenuCategory = 'shisha' | 'drinks' | 'food' | 'kombis' | 'happy_hour';"
)

# 2. Add Happy Hour items
happy_hour_items = '''
  // --- Happy Hour ---
  {
    id: 'hh1',
    name: { DE: 'SHISHA + SOFTDRINK 13, 16, C', EN: 'SHISHA + SOFTDRINK 13, 16, C', TR: 'SHISHA + SOFTDRINK 13, 16, C' },
    price: 13.90,
    description: { 
      DE: 'Shisha + Softdrink Nachwahl\\nMontag-Freitag 14:00 - 19:00 Uhr', 
      EN: 'Shisha + Softdrink of choice\\nMonday-Friday 14:00 - 19:00', 
      TR: 'Nargile + Seçmeli Meşrubat\\nPazartesi-Cuma 14:00 - 19:00' 
    },
    imageUrl: '',
    category: 'happy_hour'
  },
  {
    id: 'hh2',
    name: { DE: "PASTA, BURGER, SALAT, BOWL'S", EN: "PASTA, BURGER, SALAD, BOWL'S", TR: "MAKARNA, BURGER, SALATA, BOWL'S" },
    price: 9.90,
    description: { 
      DE: 'Montag-Freitag | 16:00-19:00 Uhr\\nGenieße unsere Happy Hour und wähle dein Lieblingsgericht aus den Kategorien Pasta, Burger, Salat oder Bowl. Ausgenommen: Beef & Broccoli Penne sowie Beef Balance Bowl.', 
      EN: 'Monday-Friday | 16:00-19:00\\nEnjoy our Happy Hour and choose your favorite dish from the categories Pasta, Burger, Salad or Bowl. Excluded: Beef & Broccoli Penne and Beef Balance Bowl.', 
      TR: 'Pazartesi-Cuma | 16:00-19:00\\nHappy Hour keyfini çıkarın ve Makarna, Burger, Salata veya Kase kategorilerinden en sevdiğiniz yemeği seçin. Hariç: Beef & Broccoli Penne ve Beef Balance Bowl.' 
    },
    imageUrl: '',
    category: 'happy_hour'
  },
'''
content = content.replace('export const menuData: MenuItem[] = [', 'export const menuData: MenuItem[] = [\n' + happy_hour_items)

# 3. Remove Oreo and Nutella Shakes (d_shake_2 and d_shake_3)
lines = content.split('\n')
new_lines = []
skip = False
for line in lines:
    if "id: 'd_shake_2'," in line or "id: 'd_shake_3'," in line:
        skip = True
        # We need to remove the "{" from the previous line too!
        if new_lines[-1].strip() == '{':
            new_lines.pop()
        continue
    
    if skip:
        if line.strip() == '},':
            skip = False
        elif line.strip() == '}':
            skip = False
        continue
        
    new_lines.append(line)

content = '\n'.join(new_lines)

# 4. Fix Kombis prices so they don't show 0.00
content = re.sub(r"(id:\s*'k1'[\s\S]*?category:\s*'kombis',\n\s*subcategory:\s*'Hürrem Kombis')", r"\1,\n    price: 19.90", content)
content = re.sub(r"(id:\s*'k2'[\s\S]*?category:\s*'kombis',\n\s*subcategory:\s*'Hürrem Kombis')", r"\1,\n    price: 24.90", content)
content = re.sub(r"(id:\s*'k3'[\s\S]*?category:\s*'kombis',\n\s*subcategory:\s*'Hürrem Kombis')", r"\1,\n    price: 29.90", content)
content = re.sub(r"(id:\s*'k4'[\s\S]*?category:\s*'kombis',\n\s*subcategory:\s*'Hürrem Kombis')", r"\1,\n    price: 39.90", content)
content = re.sub(r"(id:\s*'k5'[\s\S]*?category:\s*'kombis',\n\s*subcategory:\s*'Hürrem Kombis')", r"\1,\n    price: 49.90", content)

codecs.open('src/data/menu.ts', 'w', 'utf-8').write(content)
print("Updated menu.ts successfully!")
