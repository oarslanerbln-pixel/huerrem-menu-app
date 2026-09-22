import re

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix hh_1
content = content.replace(
    '''    price: 13.90,
          DE: `Shisha''',
    '''    price: 13.90,
    description: {
      DE: `Shisha'''
)

# Fix hh_2
content = content.replace(
    '''    price: 9.90,
          DE: `Montag''',
    '''    price: 9.90,
    description: {
      DE: `Montag'''
)

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(content)

