import os
import re

image_dir = 'public/images/menury_originals'
files = [f for f in os.listdir(image_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.svg'))]

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

used_images = set()
for match in re.finditer(r'imageUrl:\s*[\'"](.*?)[\'"]', content):
    used_images.add(os.path.basename(match.group(1)))

unused = [f for f in files if f not in used_images]
print(f"Unused images ({len(unused)}):")
for u in unused:
    print(u)
