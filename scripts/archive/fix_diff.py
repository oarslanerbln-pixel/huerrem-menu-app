import re

with open('diff.txt', 'r', encoding='utf-16') as f:
    diff_lines = f.readlines()

menu_path = r"C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts"
with open(menu_path, 'r', encoding='utf-8') as f:
    content = f.read()

deleted_blocks = []
i = 0
while i < len(diff_lines):
    line = diff_lines[i]
    if line.startswith('-  {'):
        block = []
        j = i + 1
        while j < len(diff_lines):
            l = diff_lines[j]
            if l.startswith('-    id:'):
                block.append(l[1:].rstrip())
            elif l.startswith('-    name:'):
                block.append(l[1:].rstrip())
            elif l.startswith('     price:'):
                price_line = l[1:].rstrip()
                if len(block) >= 2:
                    deleted_blocks.append({
                        'id_line': block[0],
                        'name_line': block[1],
                        'price_line': price_line
                    })
                break
            elif not l.startswith('-'):
                break
            j += 1
    i += 1

print(f"Found {len(deleted_blocks)} deleted blocks!")

for block in deleted_blocks:
    price_str = block['price_line'].strip()
    id_str = block['id_line']
    name_str = block['name_line']
    
    pattern = r"(\n[ \t]*\}(?:,)?\s*)\n([ \t]*" + re.escape(price_str) + r")"
    replacement = r"\1\n  {\n" + id_str + r"\n" + name_str + r"\n\2"
    
    content, count = re.subn(pattern, replacement, content, count=1)
    if count == 0:
        print("Failed to replace:", id_str)

with open(menu_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done patching.")
