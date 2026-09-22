import re
import os
import glob

# Get all images in menury_originals
image_files = glob.glob('public/images/menury_originals/**/*', recursive=True)
image_files = [f.replace('\\', '/') for f in image_files if os.path.isfile(f)]

def find_best_image(name, subcategory):
    # clean name
    clean_name = name.lower().replace(' ', '_').replace('-', '_').replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue')
    clean_sub = subcategory.lower().replace(' ', '_')
    
    # Check if there is a match
    for img in image_files:
        if clean_name in img.lower() or img.lower().endswith(clean_name + '.webp') or img.lower().endswith(clean_name + '.png'):
            return '/' + img.replace('public/', '')
    
    # Try just comparing the base filename
    for img in image_files:
        base = os.path.basename(img).split('.')[0]
        if base.endswith(clean_name) or clean_name in base:
            return '/' + img.replace('public/', '')
            
    return ''

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to find objects where imageUrl: '' and update them.
# The structure is roughly:
# name: { DE: 'Edamame', ... }
# ...
# imageUrl: '',
# category: 'food',
# subcategory: 'Vorspeisen',

# Let's split by items as before
match = re.search(r'(export const menuData: MenuItem\[\] = \[)(.*?)(^];)', content, re.DOTALL | re.MULTILINE)
if not match:
    print('Regex failed')
    exit(1)

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
        if char == '{':
            brace_count += 1
        elif char == '}':
            brace_count -= 1
        elif char in ("'", '"', "`"):
            in_string = True
            quote_char = char
        if brace_count == 0 and char == ',':
            items.append(current_item.strip()[:-1].strip())
            current_item = ''
    else:
        if escape:
            escape = False
        elif char == '\\':
            escape = True
        elif char == quote_char:
            in_string = False

if current_item.strip():
    items.append(current_item.strip())

updated_count = 0
new_items = []
for item in items:
    if "imageUrl: ''" in item:
        # extract name DE
        name_match = re.search(r"name:\s*\{\s*DE:\s*'([^']+)'", item)
        sub_match = re.search(r"subcategory:\s*'([^']+)'", item)
        
        if name_match and sub_match:
            name = name_match.group(1)
            sub = sub_match.group(1)
            
            best_img = find_best_image(name, sub)
            if best_img:
                item = item.replace("imageUrl: ''", f"imageUrl: '{best_img}'")
                updated_count += 1
                print(f"Updated {name} -> {best_img}")
    
    new_items.append(item)

new_array_content = ',\n  '.join(new_items)

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(prefix + '\n  ' + new_array_content + '\n' + suffix)

print(f'Done. Updated {updated_count} empty images.')
