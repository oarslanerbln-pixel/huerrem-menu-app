import re

filepath = r"C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Fix missing comma before ADDED FINGER FOOD
content = re.sub(r"\}\s*// --- ADDED FINGER FOOD ---", "},\n  // --- ADDED FINGER FOOD ---", content)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed missing comma before FINGER FOOD")
