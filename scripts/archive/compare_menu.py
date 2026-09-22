import json
import re

# Load JSON
with open('menury_data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

json_categories = {}
json_items = []

for menu in data['data']['menus']:
    cat_name = menu['menu_title'].strip()
    json_categories[cat_name] = []
    
    # menus can have items directly or submenus
    if 'items' in menu:
        for item in menu['items']:
            title = item.get('menu_item_title', '').strip()
            json_categories[cat_name].append(title)
            json_items.append(title.lower())
            
    if 'submenus' in menu:
        for submenu in menu['submenus']:
            sub_name = submenu['menu_title'].strip()
            full_cat = f"{cat_name} -> {sub_name}"
            json_categories[full_cat] = []
            
            if 'items' in submenu:
                for item in submenu['items']:
                    title = item.get('menu_item_title', '').strip()
                    json_categories[full_cat].append(title)
                    json_items.append(title.lower())


# Load TS
with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    ts_content = f.read()
    
ts_items = []
blocks = ts_content.split('id: ')
for block in blocks[1:]:
    name_match = re.search(r'name:\s*(?:\{.*?DE:\s*["\']([^"\']+)["\']|["\']([^"\']+)["\'])', block)
    if name_match:
        name = (name_match.group(1) or name_match.group(2)).strip()
        ts_items.append(name.lower())

print("=== CATEGORIES IN JSON ===")
for cat in json_categories.keys():
    print(cat)

print("\n=== ITEMS IN JSON BUT NOT IN TS ===")
missing_count = 0
for cat, items in json_categories.items():
    missing_in_cat = []
    for item in items:
        if item.lower() not in ts_items:
            # try fuzzy
            found = False
            for ts_item in ts_items:
                if ts_item in item.lower() or item.lower() in ts_item:
                    found = True
                    break
            if not found:
                missing_in_cat.append(item)
                
    if missing_in_cat:
        print(f"\n[{cat}]")
        for m in missing_in_cat:
            print(f"  - {m}")
        missing_count += len(missing_in_cat)

print(f"\nTotal Missing Items: {missing_count}")
