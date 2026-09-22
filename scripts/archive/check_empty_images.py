import re
with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()
empty_images = re.findall(r"imageUrl:\s*['\"`]['\"`]", content)
print(f'Empty images count: {len(empty_images)}')
