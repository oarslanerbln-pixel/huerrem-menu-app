with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

start = -1
end = -1
for i, line in enumerate(lines):
    if '// --- ADDED FINGER FOOD ---' in line and start == -1:
        start = i
    if '// --- HAPPY HOUR COMBOS ---' in line:
        end = i

print(f"Start: {start}, End: {end}")

# Let's see if there are any non-duplicate items in between
items = ''.join(lines[start:end])
import re
names = re.findall(r'name:\s*\{\s*DE:\s*[\"\']([^\"\']+)[\"\']', items)
print("Items to be deleted:", names)

