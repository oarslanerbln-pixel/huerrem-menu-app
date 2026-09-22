import re
import os
import glob

image_files = glob.glob('public/images/screenshots/*.png')
image_files = [f.replace('\\', '/') for f in image_files if os.path.isfile(f)]

def find_screenshot(name):
    # e.g. "African Queen" -> "african-queen.png"
    # "Apfel Minze" -> "apfel-minze.png" or "apfel minze.png"
    clean_name = name.lower().strip()
    
    for img in image_files:
        base = os.path.basename(img).lower().replace('.png', '')
        if base == clean_name or base == clean_name.replace(' ', '-') or base.replace('-', ' ') == clean_name:
            return '/' + img.replace('public/', '')
            
    # fuzzy matching
    for img in image_files:
        base = os.path.basename(img).lower().replace('.png', '')
        if not base.startswith('screenshot') and (base in clean_name or clean_name in base):
            return '/' + img.replace('public/', '')
            
    return ''

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'(export const menuData: MenuItem\[\] = \[)(.*?)(^];)', content, re.DOTALL | re.MULTILINE)
prefix = content[:match.start(2)]
array_content = match.group(2)
suffix = content[match.end(2):]

items = []
current_item = ''
brace_count = 0
in_string = False
escape = False
quote_char = ''

for char in array_content:
    current_item += char
    if not in_string:
        if char == '{': brace_count += 1
        elif char == '}': brace_count -= 1
        elif char in ("'", '"', "`"): in_string = True; quote_char = char
        if brace_count == 0 and char == ',': items.append(current_item.strip()[:-1].strip()); current_item = ''
    else:
        if escape: escape = False
        elif char == '\\': escape = True
        elif char == quote_char: in_string = False
if current_item.strip(): items.append(current_item.strip())

updated_count = 0
new_items = []
for item in items:
    if "imageUrl: ''" in item:
        name_match = re.search(r"name:\s*\{\s*DE:\s*'([^']+)'", item)
        if name_match:
            name = name_match.group(1)
            
            best_img = find_screenshot(name)
            if best_img:
                item = item.replace("imageUrl: ''", f"imageUrl: '{best_img}'")
                updated_count += 1
                print(f"Updated {name} -> {best_img}")
    
    new_items.append(item)

new_array_content = ',\n  '.join(new_items)

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(prefix + '\n  ' + new_array_content + '\n' + suffix)

print(f'Done. Updated {updated_count} empty images with screenshots.')
