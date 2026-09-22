import sys
sys.stdout.reconfigure(encoding='utf-8')
content = open(r'C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts', 'r', encoding='utf-8').read()

import re

# Extract items more carefully
# Find blocks that look like menu items
blocks = re.split(r'\n  \{', content)

items = []
for block in blocks[1:]:  # skip first non-item part
    id_m = re.search(r"id:\s*'([^']+)'", block)
    name_m = re.search(r"DE:\s*'([^']+)'", block)
    cat_m = re.search(r"category:\s*'([^']+)'", block)
    sub_m = re.search(r"subcategory:\s*'([^']+)'", block)
    img_m = re.search(r"imageUrl:\s*'([^']*)'", block)
    if id_m and cat_m and sub_m:
        items.append({
            'id': id_m.group(1),
            'name': name_m.group(1) if name_m else '',
            'category': cat_m.group(1),
            'subcategory': sub_m.group(1),
            'imageUrl': img_m.group(1) if img_m else ''
        })

print(f"Parsed {len(items)} items\n")

# Show shakes
shakes = [i for i in items if i['subcategory'] == 'Shakes']
print(f"SHAKES ({len(shakes)}):")
for s in shakes:
    print(f"  [{s['id']}] {s['name']} | img: {s['imageUrl'] or '(empty)'}")

# Show happy hour
hh = [i for i in items if i['category'] == 'happy_hour']
print(f"\nHAPPY HOUR ({len(hh)}):")
for s in hh:
    print(f"  [{s['id']}] {s['name']}")

# Show spiele
sp = [i for i in items if i['category'] == 'spiele']
print(f"\nSPIELE ({len(sp)}):")
for s in sp:
    print(f"  [{s['id']}] {s['name']}")

# Show cocktails
ct = [i for i in items if 'cocktail' in i['subcategory'].lower() or 'Cocktails' == i['subcategory'] or 'Signature' in i['subcategory']]
print(f"\nCOCKTAILS/SIGNATURE ({len(ct)}):")
for s in ct:
    print(f"  [{s['id']}] {s['name']} | sub={s['subcategory']} | img: {s['imageUrl'] or '(empty)'}")
