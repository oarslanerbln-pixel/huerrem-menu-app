import re
import os

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'(export const menuData: MenuItem\[\] = \[)(.*?)(^\];)', content, re.DOTALL | re.MULTILINE)
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

img_dir = r'public\images\menury_originals'
image_files = []
for root, dirs, files in os.walk(img_dir):
    for f in files:
        if f.endswith(('.jpg', '.jpeg', '.png', '.webp')):
            path = os.path.join(root, f).replace('\\', '/')
            web_path = '/' + path.split('public/', 1)[1]
            # normalize filename for matching
            name_part = f.split('__')[-1].rsplit('.', 1)[0].replace('_', ' ').lower()
            name_part = name_part.replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue').replace('ß', 'ss')
            name_part = name_part.replace('ı', 'i').replace('ş', 's').replace('ç', 'c').replace('ğ', 'g')
            name_part = re.sub(r'[^a-z0-9\s]', '', name_part).strip()
            
            image_files.append({
                'web_path': web_path,
                'name_part': name_part
            })

mapped = 0
mapped_items = []
for item in items:
    if bool(re.search(r"imageUrl:\s*['\"`]['\"`]", item)):
        name_match = re.search(r"name:\s*\{\s*DE:\s*[\'\"`](.*?)[\'\"`]", item)
        if name_match:
            original_name = name_match.group(1)
            name_str = original_name.lower()
            name_str = name_str.replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue').replace('ß', 'ss')
            name_str = name_str.replace('ı', 'i').replace('ş', 's').replace('ç', 'c').replace('ğ', 'g')
            name_str = re.sub(r'[^a-z0-9\s]', '', name_str).strip()
            
            best_match = ''
            name_words = set(name_str.split())
            
            for img in image_files:
                img_name = img['name_part']
                img_words = set(img_name.split())
                
                # exact match
                if img_name == name_str:
                    best_match = img['web_path']
                    break
                
                # word match
                if len(img_words) > 0 and len(name_words) > 0:
                    intersection = img_words.intersection(name_words)
                    if len(intersection) == len(img_words) or len(intersection) == len(name_words):
                        # check if it's a very generic word like "tee"
                        if len(intersection) == 1 and list(intersection)[0] in ['tee', 'tee', 'shisha']:
                            continue
                        best_match = img['web_path']
                        break
                        
            if best_match:
                item = re.sub(r"imageUrl:\s*['\"`]['\"`]", f"imageUrl: '{best_match}'", item)
                mapped += 1
                print(f"Mapped: {original_name} -> {best_match}")
            else:
                print(f"No match for empty image item: {original_name} (normalized: {name_str})")
                
    mapped_items.append(item)

print(f"Total mapped: {mapped}")

new_array_content = ',\n  '.join(mapped_items)

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(prefix + '\n  ' + new_array_content + '\n' + suffix)

