import re

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find export const menuData = [
start_idx = content.find('export const menuData: MenuItem[] = [')
if start_idx == -1:
    print("Could not find menuData")
    exit(1)

array_start = content.find('[', start_idx) + 1
# Find the end of menuData array by matching brackets
stack = 1
array_end = -1
for i in range(array_start, len(content)):
    if content[i] == '[':
        stack += 1
    elif content[i] == ']':
        stack -= 1
        if stack == 0:
            array_end = i
            break

menu_content = content[array_start:array_end]

# We need to split menu_content into individual items.
# They are separated by commas, but commas can be inside the items.
# Let's just find each top-level object `{ ... }`
items = []
stack = 0
item_start = -1
for i, char in enumerate(menu_content):
    if char == '{':
        if stack == 0:
            item_start = i
        stack += 1
    elif char == '}':
        stack -= 1
        if stack == 0 and item_start != -1:
            items.append((item_start, i + 1))

print(f"Found {len(items)} top-level objects in menuData")

# Let's check each item for its name.DE
seen_names = set()
items_to_keep = []

for start, end in items:
    item_str = menu_content[start:end]
    name_match = re.search(r'name:\s*\{\s*DE:\s*[\"\']([^\"\']+)[\"\']', item_str)
    if name_match:
        name = name_match.group(1)
        if name in seen_names:
            print(f"Duplicate found: {name}")
            continue
        seen_names.add(name)
    else:
        # Some items might not have DE name? Or maybe they do. We keep them just in case.
        pass
    
    items_to_keep.append(item_str)

# Now reconstruct menuData
new_menu_content = ',\n  '.join(items_to_keep)
# Add a newline at the beginning and end for formatting
new_menu_content = '\n  ' + new_menu_content + '\n'

new_content = content[:array_start] + new_menu_content + content[array_end:]

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Deduplication complete.")
