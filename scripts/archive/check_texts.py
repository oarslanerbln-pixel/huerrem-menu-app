import sys, re
sys.stdout.reconfigure(encoding='utf-8')
content = open(r'C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts', 'r', encoding='utf-8').read()

items = re.split(r'\n  \{', content)[1:]
for block in items:
    id_m = re.search(r"id:\s*'([^']+)'", block)
    if id_m:
        id_val = id_m.group(1)
        if 'shake' in id_val or 'hh_' in id_val or 'sig_' in id_val or 'hc_' in id_val:
            print(f'--- {id_val} ---')
            for line in block.split('\n')[:8]:
                print(line.strip())
