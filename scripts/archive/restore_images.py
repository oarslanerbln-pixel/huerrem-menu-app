import re

def extract_images(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    match = re.search(r'(export const menuData: MenuItem\[\] = \[)(.*?)(^];)', content, re.DOTALL | re.MULTILINE)
    if not match:
        return {}

    array_content = match.group(2)
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

    id_to_img = {}
    for item in items:
        id_match = re.search(r"id:\s*'([^']+)'", item)
        img_match = re.search(r"imageUrl:\s*'([^']*)'", item)
        if id_match and img_match:
            id_to_img[id_match.group(1)] = img_match.group(1)
            
    return id_to_img

old_imgs = extract_images('old_menu.ts')

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'(export const menuData: MenuItem\[\] = \[)(.*?)(^];)', content, re.DOTALL | re.MULTILINE)
if not match:
    print('Regex failed on current menu')
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

updated = 0
new_items = []
for item in items:
    if "imageUrl: ''" in item:
        id_match = re.search(r"id:\s*'([^']+)'", item)
        if id_match:
            item_id = id_match.group(1)
            old_img = old_imgs.get(item_id, '')
            if old_img:
                item = item.replace("imageUrl: ''", f"imageUrl: '{old_img}'")
                updated += 1
                print(f"Restored image for {item_id}: {old_img}")
    new_items.append(item)

new_array_content = ',\n  '.join(new_items)

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(prefix + '\n  ' + new_array_content + '\n' + suffix)

print(f"Total restored images: {updated}")
