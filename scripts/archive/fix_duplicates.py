import re
from collections import Counter

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

ids_seen = set()

def replace_id(match):
    prefix = match.group(1)
    original_id = match.group(2)
    suffix = match.group(3)
    
    new_id = original_id
    if new_id in ids_seen:
        count = 2
        while f"{original_id}_{count}" in ids_seen:
            count += 1
        new_id = f"{original_id}_{count}"
    
    ids_seen.add(new_id)
    return f"{prefix}{new_id}{suffix}"

# Match id: '...', taking care of the surrounding quotes
new_content = re.sub(r'(id:\s*[\'"])(.*?)([\'"])', replace_id, content)

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Duplicate IDs fixed.")
