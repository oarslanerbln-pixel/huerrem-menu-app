import re

menu_ts_path = r"C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts"

with open(menu_ts_path, "r", encoding="utf-8") as f:
    content = f.read()

# Extract items
items = []
blocks = re.split(r'\s*\{\s*id:\s*', content)

for block in blocks[1:]:
    try:
        # name
        name_match = re.search(r"name:\s*\{\s*DE:\s*['\"]([^'\"]+)['\"]", block)
        if not name_match:
            name_match = re.search(r"name:\s*['\"]([^'\"]+)['\"]", block)
        name = name_match.group(1) if name_match else "Unknown"

        # subcategory
        subcat_match = re.search(r"subcategory:\s*['\"]([^'\"]+)['\"]", block)
        subcat = subcat_match.group(1) if subcat_match else "Unknown"

        # price
        price_match = re.search(r"price:\s*([\d\.]+)", block)
        price = price_match.group(1) if price_match else "Unknown"

        # description
        desc_match = re.search(r"description:\s*\{\s*DE:\s*['\"]([^'\"]+)['\"]", block)
        if not desc_match:
            desc_match = re.search(r"description:\s*['\"]([^'\"]+)['\"]", block)
        desc = desc_match.group(1) if desc_match else ""
        
        items.append({
            "name": name,
            "subcat": subcat,
            "price": price,
            "desc": desc
        })
    except Exception:
        pass

print("=== EXISTING MENU.TS CATEGORIES & ITEMS ===")
grouped = {}
for item in items:
    cat = item["subcat"]
    if cat not in grouped:
        grouped[cat] = []
    grouped[cat].append(item)

for cat, cat_items in grouped.items():
    print(f"\n[{cat}]")
    for it in cat_items:
        print(f" - {it['name']} (Price: {it['price']})")
        if "€" in it['desc'] or "|" in it['desc']:
            print(f"   [!] POTENTIAL PRICE VARIATION IN DESC: {it['desc']}")

