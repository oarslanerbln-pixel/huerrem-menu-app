import re
from collections import defaultdict

menu_path = r'c:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts'
with open(menu_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract items
items = re.findall(r"id:\s*['\"].*?['\"].*?name:\s*\{.*?TR:\s*['\"](.*?)['\"].*?\},.*?category:\s*['\"](.*?)['\"].*?subcategory:\s*['\"](.*?)['\"]", content, re.DOTALL)

menu_tree = defaultdict(lambda: defaultdict(list))
for name, cat, subcat in items:
    menu_tree[cat][subcat].append(name)

# Also try to extract prices and descriptions if needed, but let's just stick to names for a quick report
with open('menu_report.md', 'w', encoding='utf-8') as out:
    out.write("# Hürrem Sultan Menu Check-up\\n\\n")
    for cat in sorted(menu_tree.keys()):
        out.write(f"## {cat}\\n")
        for subcat in sorted(menu_tree[cat].keys()):
            out.write(f"### {subcat}\\n")
            for name in menu_tree[cat][subcat]:
                out.write(f"- {name}\\n")
        out.write("\\n")
