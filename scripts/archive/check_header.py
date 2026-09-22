import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/menu.ts.orig', encoding='utf-8') as f:
    content = f.read()

header = content[:content.find('export const menuData')]
print(header[:3000])
