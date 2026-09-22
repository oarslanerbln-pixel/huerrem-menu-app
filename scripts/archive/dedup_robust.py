import re

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

seen_names = {}
final_items = []
added = set()

def normalize_name(name):
    name = name.lower()
    name = name.replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue').replace('ß', 'ss')
    name = name.replace('ı', 'i').replace('ş', 's').replace('ç', 'c').replace('ğ', 'g')
    name = re.sub(r'[^a-z0-9]', '', name)
    return name

for item in items:
    name_match = re.search(r"name:\s*\{\s*DE:\s*[\'\"`](.*?)[\'\"`]", item)
    if not name_match:
        seen_names[item] = item
        continue
        
    name = normalize_name(name_match.group(1))
    
    has_img = not bool(re.search(r"imageUrl:\s*['\"`]['\"`]", item))
    
    if name not in seen_names:
        seen_names[name] = item
    else:
        old_has_img = not bool(re.search(r"imageUrl:\s*['\"`]['\"`]", seen_names[name]))
        if has_img and not old_has_img:
            seen_names[name] = item

for item in items:
    name_match = re.search(r"name:\s*\{\s*DE:\s*[\'\"`](.*?)[\'\"`]", item)
    if not name_match:
        if item not in added:
            final_items.append(item)
            added.add(item)
        continue
        
    name = normalize_name(name_match.group(1))
    if name not in added:
        final_items.append(seen_names[name])
        added.add(name)

new_array_content = ',\n  '.join(final_items)

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(prefix + '\n  ' + new_array_content + '\n' + suffix)

print(f"Original items: {len(items)}, Deduplicated items: {len(final_items)}")
