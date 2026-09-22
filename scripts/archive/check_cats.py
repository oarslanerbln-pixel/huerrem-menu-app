import sys
sys.stdout.reconfigure(encoding='utf-8')
content = open(r'C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts', 'r', encoding='utf-8').read()

# Simple approach: find all subcategory lines
import re
cats = {}
# Find each block between { and } at top level
# Use simpler approach - find subcategory mentions
ids = re.findall(r"id:\s*'([^']+)'", content)
names = re.findall(r"name:\s*\{[^}]*DE:\s*'([^']+)'", content)
categories = re.findall(r"category:\s*'([^']+)'", content)
subcats = re.findall(r"subcategory:\s*'([^']+)'", content)

print(f"Total items: {len(ids)}")
print(f"Total names: {len(names)}")
print(f"Total categories: {len(categories)}")
print(f"Total subcategories: {len(subcats)}")
print()

# Count unique categories/subcategories
from collections import Counter
cat_counter = Counter(categories)
sub_counter = Counter(subcats)

print("CATEGORIES:")
for cat, count in sorted(cat_counter.items()):
    print(f"  {cat}: {count} items")

print("\nSUBCATEGORIES:")
for sub, count in sorted(sub_counter.items()):
    print(f"  {sub}: {count} items")
