import re

with open('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', 'r', encoding='utf-8') as f:
    c = f.read()

def remove_broken(content, item_id):
    idx = content.find(f'"id": "{item_id}"')
    if idx == -1:
        idx = content.find(f"'id': '{item_id}'")
        
    if idx != -1:
        start_idx = content.rfind('{', 0, idx)
        
        brace_count = 0
        end_idx = -1
        for i in range(start_idx, len(content)):
            if content[i] == '{':
                brace_count += 1
            elif content[i] == '}':
                brace_count -= 1
                if brace_count == 0:
                    end_idx = i
                    break
                    
        if end_idx != -1:
            # find comma after it
            next_comma = content.find(',', end_idx)
            if next_comma != -1 and content[end_idx+1:next_comma].isspace():
                end_idx = next_comma
            return content[:start_idx] + content[end_idx+1:].lstrip()
    return content

c = remove_broken(c, 'd_sd_moloko')
c = remove_broken(c, 'd27')
c = remove_broken(c, 'd_hs_3')
c = remove_broken(c, 'd_hs_4')

with open('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(c)

print("Removed broken items")
