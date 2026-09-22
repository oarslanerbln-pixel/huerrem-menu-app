import re

file_path = r"c:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts"

with open(file_path, "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines, start=1):
    # Fix the missing comma for beautiful dream
    if "id: 'sig_beautiful_dream'," in "".join(lines[i-2:i+2]):
        pass  # Just a reference, the problem is at the closing brace of beautiful dream
    
    # 1833 to 1843 logic: find the orphaned price
    if i == 1832:
        if lines[i].strip() == "price: 4.80," and "imageUrl: '/images/menury_originals/sommer_specials__iced_latte.webp'," in "".join(lines[i:i+10]):
            skip = True
            
    if skip:
        if line.strip() == "},":
            skip = False
        continue

    new_lines.append(line)

content = "".join(new_lines)
# Fix missing comma
content = content.replace("    additives: [\"9\"]\n  }\n\n\n  // --- New Sommer-Specials ---", "    additives: [\"9\"]\n  },\n\n\n  // --- New Sommer-Specials ---")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
