import os
import json
import re

image_dir = 'public/images/menury_originals'
if not os.path.exists(image_dir):
    print(f'{image_dir} does not exist')
else:
    files = [f for f in os.listdir(image_dir) if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))]
    print(f'Found {len(files)} images in {image_dir}')
    print('Sample images:', files[:10])

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

items = re.findall(r"id:\s*['\"](.*?)['\"]", content)
print(f'Total items in menuData: {len(items)}')
