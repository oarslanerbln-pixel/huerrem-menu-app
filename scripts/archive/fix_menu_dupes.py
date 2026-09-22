import os

# Read the two scripts to extract the exact new_items strings
script1_path = r"c:\Users\oarsl\.gemini\antigravity-ide\brain\af508a34-dd10-4e5b-b809-0dc625212dfc\scratch\update_menu_script.py"
script2_path = r"c:\Users\oarsl\.gemini\antigravity-ide\brain\af508a34-dd10-4e5b-b809-0dc625212dfc\scratch\fix_iced_drinks.py"
menu_path = r"c:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts"

with open(script1_path, 'r', encoding='utf-8') as f:
    s1 = f.read()

with open(script2_path, 'r', encoding='utf-8') as f:
    s2 = f.read()

# Extract new_items from s1
start_idx1 = s1.find('new_items = """') + len('new_items = """')
end_idx1 = s1.find('"""', start_idx1)
new_items_1 = s1[start_idx1:end_idx1]

# Extract new_items from s2
start_idx2 = s2.find('new_items = """') + len('new_items = """')
end_idx2 = s2.find('"""', start_idx2)
new_items_2 = s2[start_idx2:end_idx2]

with open(menu_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace combinations
combo = new_items_1 + "\n" + new_items_2 + "\n];"
content = content.replace(combo, "];")

# Also try individual ones if any remain
content = content.replace(new_items_1 + "\n];", "];")
content = content.replace(new_items_2 + "\n];", "];")

# Now append them exactly once at the end.
# We will find the very last ]; in the file (which should be the end of the menu array)
# Or better, find `];` at the very end of the file.
last_bracket_idx = content.rfind('];')
if last_bracket_idx != -1:
    content = content[:last_bracket_idx] + new_items_1 + "\n" + new_items_2 + "\n];" + content[last_bracket_idx+2:]

with open(menu_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Duplicates removed and items added once.")
