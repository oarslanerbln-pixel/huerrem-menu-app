import re

with open('../src/data/menu.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

current_name = ''
current_id = ''

print("--- DEBUG START ---")
for line in lines[:200]:
    id_m = re.search(r"id:\s*'([^']+)'", line)
    if id_m: 
        current_id = id_m.group(1)
        
    n_m = re.search(r"DE:\s*'([^']+)'", line)
    if not n_m:
        n_m = re.search(r'DE:\s*"([^"]+)"', line)
    if n_m: 
        current_name = n_m.group(1)
        
    if 'imageUrl:' in line:
        print(f"ID: {current_id} | Name: {current_name}")
print("--- DEBUG END ---")
