import os
import re

img_dir = r'public\images\menury_originals'
image_files = []
for root, dirs, files in os.walk(img_dir):
    for f in files:
        if f.endswith(('.jpg', '.jpeg', '.png', '.webp')):
            path = os.path.join(root, f).replace('\\', '/')
            # path is like public/images/menury_originals/...
            # we need /images/menury_originals/...
            web_path = '/' + path.split('public/', 1)[1]
            image_files.append({
                'filename': f,
                'web_path': web_path,
                'name_part': f.split('__')[-1].rsplit('.', 1)[0].replace('_', ' ').lower()
            })

print(f"Found {len(image_files)} images in folder.")

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# We will regex replace the imageUrl line for items where name matches
def replace_img(match):
    full_match = match.group(0)
    name_str = match.group(1).lower().replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue').replace('ß', 'ss')
    name_str = name_str.replace('ı', 'i') # acılı ezme -> acili ezme
    current_img = match.group(2)
    
    if current_img != '':
        return full_match # already has image
        
    best_img = ''
    for img in image_files:
        img_name = img['name_part'].replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue').replace('ß', 'ss')
        
        # direct match or contained
        if img_name == name_str or img_name in name_str or name_str in img_name:
            best_img = img['web_path']
            break
            
    if best_img:
        print(f"Mapped: {name_str} -> {best_img}")
        return full_match.replace("imageUrl: ''", f"imageUrl: '{best_img}'")
        
    return full_match

# The regex matches name block and then imageUrl block within the same object
# But it's easier to split into objects and do it per object
match = re.search(r'(export const menuData: MenuItem\[\] = \[)(.*?)(^\];)', content, re.DOTALL | re.MULTILINE)
if not match:
    print("Failed to parse menuData")
    exit(1)

prefix = content[:match.start(2)]
array_content = match.group(2)
suffix = content[match.end(2):]

# basic tokenization of items
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

updated = 0
new_items = []
for item in items:
    if "imageUrl: ''" in item:
        name_match = re.search(r"name:\s*\{\s*DE:\s*[\'\"`](.*?)[\'\"`]", item)
        if name_match:
            name_str = name_match.group(1).lower()
            name_str = name_str.replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue').replace('ß', 'ss')
            name_str = name_str.replace('ı', 'i').replace('ş', 's').replace('ç', 'c').replace('ğ', 'g')
            name_str = re.sub(r'[^a-z0-9\s]', '', name_str).strip() # strip special chars
            
            best_match = ''
            for img in image_files:
                img_name = img['name_part']
                img_name = img_name.replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue').replace('ß', 'ss')
                img_name = img_name.replace('ı', 'i').replace('ş', 's').replace('ç', 'c').replace('ğ', 'g')
                img_name = re.sub(r'[^a-z0-9\s]', '', img_name).strip()
                
                # We do a basic word intersection to avoid wrong matches like "tee"
                name_words = set(name_str.split())
                img_words = set(img_name.split())
                
                # Check for exact or high overlap
                if img_name == name_str:
                    best_match = img['web_path']
                    break
                
                if len(img_words) > 0 and len(name_words) > 0:
                    if len(img_words.intersection(name_words)) == len(img_words) or len(img_words.intersection(name_words)) == len(name_words):
                        best_match = img['web_path']
                        break
                        
            if best_match:
                item = item.replace("imageUrl: ''", f"imageUrl: '{best_match}'")
                updated += 1
                try:
                    print(f"Matched {name_str} with {best_match}")
                except:
                    pass
                    
    new_items.append(item)

new_array_content = ',\n  '.join(new_items)

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(prefix + '\n  ' + new_array_content + '\n' + suffix)

print(f"Total images mapped: {updated}")
