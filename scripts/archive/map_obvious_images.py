import re
import os
import glob

all_images = []
for root, dirs, files in os.walk('public/images'):
    for file in files:
        if file.endswith(('.png', '.jpg', '.jpeg', '.webp')):
            path = os.path.join(root, file).replace('\\', '/')
            all_images.append(path)

def normalize_name(name):
    # Remove special chars, lower case
    name = re.sub(r'[^a-zA-Z0-9]', '', name.lower())
    return name

def find_best_image(name):
    clean = normalize_name(name)
    if not clean: return ''
    
    # EXACT match
    for img in all_images:
        base = os.path.basename(img)
        name_no_ext = os.path.splitext(base)[0]
        # remove prefix like "softdrinks__"
        if '__' in name_no_ext:
            name_no_ext = name_no_ext.split('__')[-1]
        
        norm_img = normalize_name(name_no_ext)
        if clean == norm_img:
            return '/' + img.replace('public/', '')
            
    # Substring match
    for img in all_images:
        if 'screenshot' in img.lower(): continue # Ignore generic screenshots
        base = os.path.basename(img)
        name_no_ext = os.path.splitext(base)[0]
        if '__' in name_no_ext:
            name_no_ext = name_no_ext.split('__')[-1]
            
        norm_img = normalize_name(name_no_ext)
        if clean in norm_img or norm_img in clean:
            if len(norm_img) > 3 and len(clean) > 3:
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
            
            best_img = find_best_image(name)
            if best_img:
                item = item.replace("imageUrl: ''", f"imageUrl: '{best_img}'")
                updated_count += 1
                print(f"Updated {name} -> {best_img}")
    
    new_items.append(item)

new_array_content = ',\n  '.join(new_items)

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(prefix + '\n  ' + new_array_content + '\n' + suffix)

print(f'Done. Updated {updated_count} empty images.')
