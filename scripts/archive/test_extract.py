import re

with open('menu_head.ts', 'r', encoding='utf-16') as f:
    content = f.read()

count = 0
for match in re.finditer(r"id:\s*'([^']+)'.*?imageUrl:\s*'([^']*)'", content, re.DOTALL):
    block = match.group(0)
    if block.count("id: '") == 1 and match.group(2):
        count += 1
        if count <= 5:
            print(match.group(1), match.group(2))
print("Total found:", count)
