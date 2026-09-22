import re

filepath = r"C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Replace any occurrence of },\s*, with },
# More precisely, look for double commas between objects or before the comment I added
content = re.sub(r"},\s*,\s*// --- ADDED FINGER FOOD ---", "},\n  // --- ADDED FINGER FOOD ---", content)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed double commas!")
