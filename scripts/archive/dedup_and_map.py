import re
import os

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'(export const menuData: MenuItem\[\] = \[)(.*?)(^\];)', content, re.DOTALL | re.MULTILINE)
if not match:
    print("Failed to parse menuData")
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

# Deduplicate
seen_names = {}
deduped_items = []
for item in items:
    name_match = re.search(r"name:\s*\{\s*DE:\s*[\'\"`](.*?)[\'\"`]", item)
    if not name_match:
        deduped_items.append(item)
        continue
        
    name = name_match.group(1).strip().lower()
    
    # Check if this item has an image
    has_img = not bool(re.search(r"imageUrl:\s*['\"`]['\"`]", item))
    
    if name not in seen_names:
        seen_names[name] = item
    else:
        # If the new one has an image and the old one doesn't, swap them
        old_has_img = not bool(re.search(r"imageUrl:\s*['\"`]['\"`]", seen_names[name]))
        if has_img and not old_has_img:
            seen_names[name] = item

# Rebuild the list in original order (keep first occurrence)
final_items = []
added = set()
for item in items:
    name_match = re.search(r"name:\s*\{\s*DE:\s*[\'\"`](.*?)[\'\"`]", item)
    if not name_match:
        final_items.append(item)
        continue
    name = name_match.group(1).strip().lower()
    if name not in added:
        final_items.append(seen_names[name])
        added.add(name)

print(f"Original items: {len(items)}, Deduplicated items: {len(final_items)}")

# Now Map Images
img_dir = r'public\images\menury_originals'
image_files = []
for root, dirs, files in os.walk(img_dir):
    for f in files:
        if f.endswith(('.jpg', '.jpeg', '.png', '.webp')):
            path = os.path.join(root, f).replace('\\', '/')
            web_path = '/' + path.split('public/', 1)[1]
            image_files.append({
                'filename': f,
                'web_path': web_path,
                'name_part': f.split('__')[-1].rsplit('.', 1)[0].replace('_', ' ').lower()
            })

mapped = 0
mapped_items = []
for item in final_items:
    if bool(re.search(r"imageUrl:\s*['\"`]['\"`]", item)):
        name_match = re.search(r"name:\s*\{\s*DE:\s*[\'\"`](.*?)[\'\"`]", item)
        if name_match:
            name_str = name_match.group(1).lower()
            name_str = name_str.replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue').replace('ß', 'ss')
            name_str = name_str.replace('ı', 'i').replace('ş', 's').replace('ç', 'c').replace('ğ', 'g')
            name_str = re.sub(r'[^a-z0-9\s]', '', name_str).strip()
            
            best_match = ''
            for img in image_files:
                img_name = img['name_part']
                img_name = img_name.replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue').replace('ß', 'ss')
                img_name = img_name.replace('ı', 'i').replace('ş', 's').replace('ç', 'c').replace('ğ', 'g')
                img_name = re.sub(r'[^a-z0-9\s]', '', img_name).strip()
                
                name_words = set(name_str.split())
                img_words = set(img_name.split())
                
                if img_name == name_str:
                    best_match = img['web_path']
                    break
                
                if len(img_words) > 0 and len(name_words) > 0:
                    if len(img_words.intersection(name_words)) == len(img_words) or len(img_words.intersection(name_words)) == len(name_words):
                        best_match = img['web_path']
                        break
                        
            if best_match:
                item = re.sub(r"imageUrl:\s*['\"`]['\"`]", f"imageUrl: '{best_match}'", item)
                mapped += 1
                try:
                    print(f"Mapped {name_str} -> {best_match}")
                except:
                    pass
    mapped_items.append(item)

new_array_content = ',\n  '.join(mapped_items)

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(prefix + '\n  ' + new_array_content + '\n' + suffix)

print(f"Total mapped: {mapped}")
