import re

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract all items by matching { id: ..., name: { DE: "..." } ... } roughly
# We will just parse the file and keep the FIRST occurrence of each name.DE
# Actually, since it's TypeScript and has complex structures, it's safer to use regex to find the blocks, 
# but a regex to match an entire object block is tricky.
# Let's see how they are duplicated.

items = re.findall(r'(\{\s*id:\s*[\'"]([^\'"]+)[\'"],\s*name:\s*\{\s*DE:\s*[\'"]([^\'"]+)[\'"].*?\n\s*\})', content, flags=re.DOTALL)

from collections import defaultdict
names_to_ids = defaultdict(list)
for block, id_, name in items:
    names_to_ids[name].append(id_)

for name, ids in names_to_ids.items():
    if len(ids) > 1:
        print(f"{name}: {ids}")

