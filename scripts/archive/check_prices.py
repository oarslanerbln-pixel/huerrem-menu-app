import json
import re

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

items = re.findall(r"id:\s*['\"].*?['\"]", content)
print('Total items:', len(items))

blocks = content.split('id:')
for b in blocks[1:]:
    item_id = b.split(',')[0].strip().strip('\'\"')
    
    # We only care about this item's block. We can just check until the next item or end.
    if 'price:' not in b:
        print(f'Item without price: {item_id}')
