import re
data = open('src/data/menu.ts', encoding='utf-8').read()
blocks = re.split(r'\s*\{\s*id:\s*', data)[1:]
for b in blocks:
    name = re.search(r"name:\s*\{\s*DE:\s*['\"]([^'\"]+)['\"]", b)
    if name:
        print(name.group(1))
