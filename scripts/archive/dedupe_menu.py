import re

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

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

id_to_item = {}
ordered_ids = []
for item in items:
    id_match = re.search(r"id:\s*'([^']+)'", item)
    if id_match:
        id_val = id_match.group(1)
        if id_val not in id_to_item:
            ordered_ids.append(id_val)
        # Always overwrite so we keep the latest patched version!
        id_to_item[id_val] = item

new_array_content = ',\n  '.join([id_to_item[id_val] for id_val in ordered_ids])

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(prefix + '\n  ' + new_array_content + '\n' + suffix)

print(f'Deduplicated. Original items: {len(items)}, Unique items: {len(id_to_item)}')
