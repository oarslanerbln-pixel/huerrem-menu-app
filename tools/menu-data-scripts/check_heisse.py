import re

with open('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', 'r', encoding='utf-8') as f:
    c = f.read()

items = ['Heiße Schokolade']
for item in items:
    match = re.search(r'\{(?:[^{}]*?)(?:id|name|DE)["\']?\s*:\s*.*?'+item+'.*?(?:price)["\']?\s*:\s*([\d\.]+)(?:[^{}]*?)\}', c, re.DOTALL | re.IGNORECASE)
    if match:
        print(f'{item} -> {match.group(0)}')
    else:
        print(f'{item} -> NOT FOUND')
