import re
from collections import Counter
with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

names = re.findall(r'name:\s*\{\s*DE:\s*[\'\"`](.*?)[\'\"`]', content)
c = Counter(names)
for k, v in c.items():
    if v > 1:
        print(f'{k}: {v}')
