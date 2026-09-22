import re
with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    text = f.read()

names = []
for item in text.split('id: '):
    if "imageUrl: ''" in item:
        name_match = re.search(r"name:\s*\{\s*DE:\s*'([^']+)'", item)
        if name_match:
            names.append(name_match.group(1).encode('ascii', 'ignore').decode('ascii'))

with open('missing_names.txt', 'w', encoding='utf-8') as f:
    f.write(', '.join(names))
