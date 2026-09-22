import re

def extract_images(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    match = re.search(r'(export const menuData: MenuItem\[\] = \[)(.*?)(^];)', content, re.DOTALL | re.MULTILINE)
    if not match: return {}

    array_content = match.group(2)
    items, current_item, brace_count, in_string, escape, quote_char = [], '', 0, False, False, ''
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

    name_to_img = {}
    for item in items:
        name_match = re.search(r"name:\s*\{\s*DE:\s*'([^']+)'", item)
        img_match = re.search(r"imageUrl:\s*'([^']*)'", item)
        if name_match and img_match:
            name_to_img[name_match.group(1).lower().strip()] = img_match.group(1)
    return name_to_img

old_imgs = extract_images('old_menu_ac4.ts')

with open('src/data/menu.ts', 'r', encoding='utf-8') as f: content = f.read()
match = re.search(r'(export const menuData: MenuItem\[\] = \[)(.*?)(^];)', content, re.DOTALL | re.MULTILINE)
prefix = content[:match.start(2)]
array_content = match.group(2)
suffix = content[match.end(2):]

items, current_item, brace_count, in_string, escape, quote_char = [], '', 0, False, False, ''
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

updated, new_items = 0, []
for item in items:
    if "imageUrl: ''" in item:
        name_match = re.search(r"name:\s*\{\s*DE:\s*'([^']+)'", item)
        if name_match:
            item_name = name_match.group(1).lower().strip()
            best_match = old_imgs.get(item_name, '')
            if not best_match:
                for old_name, old_img in old_imgs.items():
                    if old_img and (old_name in item_name or item_name in old_name):
                        best_match = old_img
                        break
            if best_match:
                item = item.replace("imageUrl: ''", f"imageUrl: '{best_match}'")
                updated += 1
                try:
                    print(f"Restored image for {item_name}: {best_match}")
                except Exception:
                    pass
    new_items.append(item)

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(prefix + '\n  ' + ',\n  '.join(new_items) + '\n' + suffix)
print(f'Total restored images from ac4: {updated}')
