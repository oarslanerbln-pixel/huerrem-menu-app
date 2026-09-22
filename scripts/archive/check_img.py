import re
with open('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

items = re.findall(r'\{[^{}]*name:\s*\{\s*DE:\s*[\'\"]([^\'\"]+)[\'\"].*?subcategory:\s*[\'\"]Signature Cocktails[\'\"](?:(?!imageUrl).)*?imageUrl:\s*[\'\"]([^\'\"]+)[\'\"]', content, re.DOTALL)
for name, img in items:
    print(f'{name} -> {img}')
