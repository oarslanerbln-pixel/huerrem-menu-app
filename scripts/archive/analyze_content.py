import os
import re

# 1. Parse image filenames to extract categories and items
image_dir = r"C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\public\images\menury_originals"
categories_from_images = {}

for filename in os.listdir(image_dir):
    if filename.endswith(".webp") and "__" in filename:
        parts = filename.replace(".webp", "").split("__")
        if len(parts) >= 2:
            category_raw = parts[0]
            item_raw = parts[1]
            
            # Format category
            category = category_raw.replace("_and_", " & ").replace("_", " ").title()
            # Format item
            item = item_raw.replace("_", " ").title()
            
            if category not in categories_from_images:
                categories_from_images[category] = []
            categories_from_images[category].append(item)

print("=== ORIGINAL MENU CATEGORIES & ITEMS (From Images) ===")
for cat, items in categories_from_images.items():
    print(f"\n[{cat}]")
    for item in items:
        print(f" - {item}")

# 2. Check menu.ts for price issues (e.g. variations in description)
menu_ts_path = r"C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts"
print("\n\n=== MENU.TS PRICE VARIATION ISSUES ===")
with open(menu_ts_path, "r", encoding="utf-8") as f:
    content = f.read()

# Very basic parsing to find items with '€' in description but a single price
items = content.split("{")
for i, block in enumerate(items):
    if "id:" in block and "price:" in block and "description:" in block:
        try:
            name_match = re.search(r"name:\s*\{\s*DE:\s*'([^']+)'", block)
            if not name_match:
                name_match = re.search(r"name:\s*'([^']+)'", block)
            
            name = name_match.group(1) if name_match else "Unknown"
            
            desc_match = re.search(r"description:\s*\{\s*DE:\s*'([^']+)'", block)
            if not desc_match:
                desc_match = re.search(r"description:\s*'([^']+)'", block)
                
            desc = desc_match.group(1) if desc_match else ""
            
            if "€" in desc or "|" in desc:
                print(f"Flagged Item: {name}")
                print(f"  Description has variations: {desc}")
        except Exception as e:
            pass
