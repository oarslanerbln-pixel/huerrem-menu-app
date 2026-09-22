import re

with open("src/data/menu.ts", "r", encoding="utf-8") as f:
    data = f.read()

blocks = re.split(r'\s*\{\s*id:\s*', data)
res = []
for b in blocks[1:]:
    name = re.search(r'name:\s*\{\s*DE:\s*[\'\"]([^\'\"]+)[\'\"]', b)
    name = name.group(1) if name else '?'
    cat = re.search(r'category:\s*[\'\"]([^\'\"]+)[\'\"]', b)
    cat = cat.group(1) if cat else '?'
    sub = re.search(r'subcategory:\s*[\'\"]([^\'\"]+)[\'\"]', b)
    sub = sub.group(1) if sub else '?'
    if sub in ['Cocktails', 'Happy Hour']:
        res.append(f'{name} ({cat} > {sub})')

with open("check_items.txt", "w", encoding="utf-8") as out:
    out.write('\n'.join(res))
