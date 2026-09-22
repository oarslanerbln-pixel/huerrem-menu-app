import json
import re

with open('menury_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

price_map = {}
for item in data['data']['menu_items']:
    title = item.get('menu_item_title')
    variants = item.get('variants', [])
    if title and variants:
        price = variants[0].get('price')
        if price is not None:
            norm_title = title.strip().lower()
            price_map[norm_title] = price

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

blocks = content.split('id: ')
new_blocks = [blocks[0]]
updated_count = 0
not_found_count = 0

for block in blocks[1:]:
    name_match = re.search(r'name:\s*(?:\{.*?DE:\s*["\']([^"\']+)["\']|["\']([^"\']+)["\'])', block)
    if name_match:
        name = (name_match.group(1) or name_match.group(2)).strip()
        norm_title = name.lower()
        
        matched = False
        # exact match
        if norm_title in price_map:
            new_price = float(price_map[norm_title])
            matched = True
        else:
            # Try to fix some common mismatches: Ice Kaktus -> Ice Kaktuz
            if norm_title == 'ice kaktus' and 'ice kaktuz' in price_map:
                new_price = float(price_map['ice kaktuz'])
                matched = True
            else:
                for k, v in price_map.items():
                    if norm_title == k.replace(' ', '') or k in norm_title or norm_title in k:
                        new_price = float(v)
                        matched = True
                        break
                    
        if matched:
            new_block = re.sub(r'price:\s*[\d.]+', f'price: {new_price}', block, count=1)
            if new_block != block:
                updated_count += 1
            block = new_block
        else:
            not_found_count += 1
            
    new_blocks.append(block)

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write('id: '.join(new_blocks))

print(f"Updated {updated_count} prices. Not found {not_found_count}")
