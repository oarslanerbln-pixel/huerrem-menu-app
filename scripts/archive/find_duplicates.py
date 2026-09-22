import re

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

names = re.findall(r'name:\s*\{\s*DE:\s*[\"\']([^\"\']+)[\"\']', content)
duplicates = set([x for x in names if names.count(x) > 1])
print('Duplicates:', duplicates)

