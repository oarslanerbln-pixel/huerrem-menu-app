import re

filepath = r"C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Change RedBull subcategory
content = re.sub(
    r"(name:\s*\{\s*DE:\s*'RedBull'[^}]+\}.*?subcategory:\s*)'Softdrinks'",
    r"\1'Energydrink'",
    content,
    flags=re.DOTALL
)

# 2. Change 28 Black subcategory
content = re.sub(
    r"(name:\s*\{\s*DE:\s*'28 Black \(Schwarze Dose\)'[^}]+\}.*?subcategory:\s*)'Softdrinks'",
    r"\1'Energydrink'",
    content,
    flags=re.DOTALL
)

# 3. Remove Stilles Wasser (d15) because we already have Mineralwasser (d13)
# Let's find the block for d15
content = re.sub(
    r"\s*\{\s*id:\s*'d15',.*?\},",
    "",
    content,
    flags=re.DOTALL
)

# 4. Update Mineralwasser (d13) name to "Mineralwasser / Stilles Wasser" for clarity
def update_mineralwasser(match):
    return match.group(0).replace("'Mineralwasser'", "'Mineralwasser / Stilles Wasser'")

content = re.sub(r"\{\s*id:\s*'d13'.*?\},", update_mineralwasser, content, flags=re.DOTALL)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Applied energy drink category & mineralwasser fix!")
