import re
import json

with open('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()
categories = re.findall(r'category:\s*[\'"]([^\'"]+)[\'"]', content)
subcategories = re.findall(r'subcategory:\s*[\'"]([^\'"]+)[\'"]', content)
print('Unique categories:', set(categories))
print('Unique subcategories:', set(subcategories))
