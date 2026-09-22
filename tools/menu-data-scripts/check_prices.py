import re

with open('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', 'r', encoding='utf-8') as f:
    c = f.read()

items = ['d_sd_moloko', 'd27', 'White Chocolate', 'Dark Chocolate', 'c_espresso_doppio', 't_cay_klein', 't_minztee', 't_ingwer', 't_ingwer_minze', 't_huerrem', 't_linden']
for item in items:
    match = re.search(r'(?:id|name|DE)["\']?\s*:\s*.*?'+item+'.*?(?:price)["\']?\s*:\s*([\d\.]+)', c, re.DOTALL | re.IGNORECASE)
    if match:
        print(f'{item} -> {match.group(1)}')
    else:
        print(f'{item} -> NOT FOUND')
