import re

with open('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', 'r', encoding='utf-8') as f:
    c = f.read()

matches = re.finditer(r'\{\s*\"id\":\s*\"(d_sd_moloko|d27|d_hs_3|d_hs_4)\".*?\"category\"[^}]*\}', c, re.DOTALL)
for m in matches:
    print('---------')
    print(m.group(0))
