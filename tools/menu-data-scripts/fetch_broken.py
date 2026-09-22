import re

with open('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', 'r', encoding='utf-8') as f:
    c = f.read()

for item in ['d_sd_moloko', 'd27', 'd_hs_3', 'd_hs_4']:
    idx = c.find(f'"id": "{item}"')
    if idx == -1:
        idx = c.find(f"'id': '{item}'")
    if idx != -1:
        start_idx = c.rfind('{', 0, idx)
        
        # We need to find the matching '}' for this '{'
        # Because the inner 'name' object was removed, it looks like:
        # { "id": "d_hs_3", "name": , "price": 4.9, "description": { ... } }
        brace_count = 0
        end_idx = -1
        for i in range(start_idx, len(c)):
            if c[i] == '{':
                brace_count += 1
            elif c[i] == '}':
                brace_count -= 1
                if brace_count == 0:
                    end_idx = i
                    break
        
        if end_idx != -1:
            print(f'--- {item} ---')
            print(c[start_idx:end_idx+2])
