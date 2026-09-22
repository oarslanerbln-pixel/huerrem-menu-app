import re

with open("src/data/menu.ts", "r", encoding="utf-8") as f:
    content = f.read()

blocks = re.split(r'\s*\{\s*id:\s*', content)
with open("cocktails.txt", "w", encoding="utf-8") as out:
    for block in blocks[1:]:
        subcat = re.search(r"subcategory:\s*['\"]([^'\"]+)['\"]", block)
        if subcat and subcat.group(1) == "Cocktails":
            name = re.search(r"name:\s*\{\s*DE:\s*['\"]([^'\"]+)['\"]", block)
            if name:
                out.write(name.group(1) + "\n")
