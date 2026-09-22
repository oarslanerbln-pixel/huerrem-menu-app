import re

menu_ts_path = r"C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts"

with open(menu_ts_path, "r", encoding="utf-8") as f:
    content = f.read()

# Extract items
blocks = re.split(r'\s*\{\s*id:\s*', content)
cocktails = []
for block in blocks[1:]:
    subcat_match = re.search(r"subcategory:\s*['\"]([^'\"]+)['\"]", block)
    if subcat_match and subcat_match.group(1) == "Cocktails":
        name_match = re.search(r"name:\s*\{\s*DE:\s*['\"]([^'\"]+)['\"]", block)
        if name_match:
            cocktails.append(name_match.group(1))

print("Total Cocktails:", len(cocktails))
for c in cocktails:
    print(" - " + c)
