import re
import sys

filename = r'c:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts'

with open(filename, 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find object blocks in the array.
# Assuming objects start with `  {\n    id: ` and end with `  },`
# We use a non-greedy match to find the end of the block.
pattern = re.compile(r'([ \t]*{\n[ \t]*id:\s*\'[^\']+\',.*?\n[ \t]*},)', re.DOTALL)

def replacer(match):
    block = match.group(1)
    if "category: 'food'" in block or "subcategory: 'Cocktails'" in block:
        # print("Removing block:", block[:50].strip() + "...")
        return ""
    return block

new_content = pattern.sub(replacer, content)

# Count how many objects were removed
old_count = len(re.findall(r'id:\s*\'', content))
new_count = len(re.findall(r'id:\s*\'', new_content))

print(f"Original items: {old_count}")
print(f"New items: {new_count}")
print(f"Removed items: {old_count - new_count}")

with open(filename, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("menu.ts updated successfully.")
