import re
import os

filepath = r"C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Normalize newlines to \n for easier regex
content = content.replace('\r\n', '\n')

# 1. Add MenuItemVariation
old_interface = """export interface MenuItem {
  id: string;
  name: string | Record<string, string>;
  price: number;
  description: string | Record<string, string>;
  category: MenuCategory;
  subcategory?: string;
  isSignature?: boolean;
  imageUrl?: string;"""

new_interface = """export interface MenuItemVariation {
  label: string | Record<string, string>;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string | Record<string, string>;
  price: number;
  description: string | Record<string, string>;
  category: MenuCategory;
  subcategory?: string;
  isSignature?: boolean;
  imageUrl?: string;
  variations?: MenuItemVariation[];"""

content = content.replace(old_interface, new_interface)

# 2. Re-order Türkischer Cay Groß to the first position of Teespezialitäten
# Let's find the item block for Türkischer Cay Groß
match = re.search(r"\s*\{\s*id:\s*'d_tea_cay',.*?\},", content, flags=re.DOTALL)
if match:
    cay_block = match.group(0)
    content = content.replace(cay_block, "") # Remove it from its current position
    # Now find the first item of Teespezialitäten. E.g. 'Bio Kamille Tee' or whatever is there.
    # We will insert cay_block right after the first item that has subcategory: 'Teespezialitäten' starts, but wait, it's an array of items.
    # It's better to find the first Teespezialitäten item and put it before it.
    first_tea_match = re.search(r"(\s*\{\s*id:\s*'[^']+',[^}]+subcategory:\s*'Teespezialitäten'.*?\})", content, flags=re.DOTALL)
    if first_tea_match:
        content = content[:first_tea_match.start()] + cay_block + content[first_tea_match.start():]
    else:
        print("Could not find first Teespezialitäten item")
else:
    # Maybe id is different?
    print("Could not find Türkischer Cay item by id 'd_tea_cay'")
    
    # Try searching by name
    match2 = re.search(r"\s*\{\s*id:\s*'[^']+',\s*name:\s*\{\s*DE:\s*'Türkischer Cay[^}]+.*?\},", content, flags=re.DOTALL)
    if match2:
        cay_block = match2.group(0)
        content = content.replace(cay_block, "")
        first_tea_match = re.search(r"(\s*\{\s*id:\s*'[^']+',[^}]+subcategory:\s*'Teespezialitäten'.*?\})", content, flags=re.DOTALL)
        if first_tea_match:
            content = content[:first_tea_match.start()] + cay_block + content[first_tea_match.start():]
        else:
            print("Could not find first Teespezialitäten item")
    else:
        print("Could not find Türkischer Cay item by name either")

# Save file with \n
with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Robust update complete")
