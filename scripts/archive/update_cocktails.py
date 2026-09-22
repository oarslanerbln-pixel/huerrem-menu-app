import json
import re

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove Mango Lassi (d23)
content = re.sub(r'\s*{\s*id: \'d23\',[^{}]*{[^{}]*}[^{}]*},?', '', content, flags=re.DOTALL)
# Remove Virgin Mojito (d24)
content = re.sub(r'\s*{\s*id: \'d24\',[^{}]*{[^{}]*}[^{}]*},?', '', content, flags=re.DOTALL)
# Remove Passion Fruit Cooler (d25)
content = re.sub(r'\s*{\s*id: \'d25\',[^{}]*{[^{}]*}[^{}]*},?', '', content, flags=re.DOTALL)

# Add group to high class cocktails
hc_group = "    group: { DE: 'High Class Cocktails', EN: 'High Class Cocktails', TR: 'High Class Kokteyller' },\n    subcategory: 'Cocktails'"
content = content.replace("subcategory: 'Cocktails'", hc_group, 4) # Only the first 4 (d_hc_1 to d_hc_4)

# Add group to signature cocktails
sig_group = "    group: { DE: 'Signature Cocktails', EN: 'Signature Cocktails', TR: 'Imza Kokteyller' },\n    subcategory: 'Cocktails'"
content = content.replace("subcategory: 'Cocktails'", sig_group, 6) # The next 6 (d_sig_1 to d_sig_6)

# Now we need to insert the 2 new high class cocktails. Let's insert them right after d_hc_4.
# Find d_hc_4 block
dhc4_match = re.search(r'id: \'d_hc_4\'.*?},', content, flags=re.DOTALL)
if dhc4_match:
    insertion = """
  {
    id: 'd_hc_5',
    name: { DE: 'Cotton Candy Shop', EN: 'Cotton Candy Shop', TR: 'Cotton Candy Shop' },
    price: 11.90,
    description: { DE: 'Bananensaft, Kokoscreme, Sahne.', EN: 'Banana juice, coconut cream, whipped cream.', TR: 'Muz suyu, hindistan cevizi kremasi, krema.' },
    imageUrl: '',
    category: 'drinks',
    group: { DE: 'High Class Cocktails', EN: 'High Class Cocktails', TR: 'High Class Kokteyller' },
    subcategory: 'Cocktails'
  },
  {
    id: 'd_hc_6',
    name: { DE: 'Dreamy Breeze (Bubble-Tea)', EN: 'Dreamy Breeze (Bubble-Tea)', TR: 'Dreamy Breeze (Bubble-Tea)' },
    price: 11.90,
    description: { DE: 'Ube-Flavour, brauner Zuckersirup, Kokosmilch, Blaubeerperlen, Heavy Cream. Ein cremiger, exotischer Genuss mit überraschendem Look.', EN: 'Ube flavor, brown sugar syrup, coconut milk, blueberry pearls, heavy cream.', TR: 'Ube aromasi, esmer seker surubu, hindistan cevizi sütü, yaban mersini incileri, krema.' },
    imageUrl: '',
    allergens: ['G'],
    category: 'drinks',
    group: { DE: 'High Class Cocktails', EN: 'High Class Cocktails', TR: 'High Class Kokteyller' },
    subcategory: 'Cocktails'
  },"""
    content = content[:dhc4_match.end()] + insertion + content[dhc4_match.end():]

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
