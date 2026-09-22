import re

menu_path = r'c:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts'

with open(menu_path, 'r', encoding='utf-8') as f:
    content = f.read()

parts = content.split('export const quizQuestions')
menu_part = parts[0]
oracle_part = '\nexport const quizQuestions' + parts[1]

match = re.search(r'(export const menuData: MenuItem\[\] = \[)(.*?)(\n\];)', menu_part, re.DOTALL)
prefix = menu_part[:match.start(1)] + match.group(1)
items_str = match.group(2)
suffix = match.group(3) + menu_part[match.end(3):]

item_blocks = re.split(r'(\n\s*\{\s*id:\s*[\'"].*?)', items_str)
filtered_items = item_blocks[0]

for i in range(1, len(item_blocks), 2):
    full_block = item_blocks[i] + item_blocks[i+1]
    
    # Check if it's food
    if re.search(r"category:\s*['\"]food['\"]", full_block):
        # If it's food, keep only if subcategory is Vorspeisen or Desserts
        is_vorspeisen = re.search(r"subcategory:\s*['\"]Vorspeisen['\"]", full_block)
        is_desserts = re.search(r"subcategory:\s*['\"]Desserts['\"]", full_block)
        if not (is_vorspeisen or is_desserts):
            continue # skip removing it
            
    filtered_items += full_block

new_content = prefix + filtered_items + suffix + oracle_part

with open(menu_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Cleaned fake food!")
