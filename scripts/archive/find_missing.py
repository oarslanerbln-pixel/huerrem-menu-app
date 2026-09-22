import re
with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    text = f.read()

names = []
for item in text.split('id: '):
    if "imageUrl: ''" in item:
        name_match = re.search(r"name:\s*\{\s*DE:\s*'([^']+)'", item)
        if name_match:
            names.append(name_match.group(1))

print("Missing images for:", names)
