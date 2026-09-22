import os

brand_path = os.path.join(os.path.dirname(__file__), 'src', 'components', 'Layout', 'BrandHeader.tsx')
with open(brand_path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("HǬrrem", "Hürrem")

with open(brand_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("BrandHeader.tsx updated.")
