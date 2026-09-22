import re

filepath = r"C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Fix MenuCategory
content = content.replace(
    "export type MenuCategory = 'shisha' | 'drinks' | 'food';",
    "export type MenuCategory = 'shisha' | 'drinks' | 'food' | 'happy_hour';"
)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)
print("Added happy_hour to MenuCategory")
