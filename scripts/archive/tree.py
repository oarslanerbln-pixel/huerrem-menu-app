import re
from collections import defaultdict

with open('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

items = re.findall(r'\{[^{}]*name:\s*\{\s*DE:\s*[\'\"]([^\'\"]+)[\'\"].*?category:\s*[\'\"]([^\'\"]+)[\'\"].*?subcategory:\s*[\'\"]([^\'\"]+)[\'\"]', content, re.DOTALL)
tree = defaultdict(lambda: defaultdict(list))
for name, cat, sub in items:
    tree[cat][sub].append(name)

for cat, subs in tree.items():
    print(f'\n[{cat.upper()}]')
    for sub, names in subs.items():
        print(f'  - {sub} ({len(names)} items)')
