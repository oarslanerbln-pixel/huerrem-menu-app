import re, sys
sys.stdout.reconfigure(encoding='utf-8')
from collections import Counter

# Also check spiele category in the orig file
content = open('src/data/menu.ts.orig', encoding='utf-8').read()
# Find the spiele items
spiele = re.findall(r"category:\s*'spiele'", content)
happy_hour = re.findall(r"category:\s*'happy_hour'", content)
print('spiele items:', len(spiele))
print('happy_hour items:', len(happy_hour))

# Find the items more precisely
spiele_items = re.findall(r'\{[^{}]*category:\s*\'spiele\'[^{}]*\}', content, flags=re.DOTALL)
print('\nSpiele items:')
for item in spiele_items:
    name = re.search(r'name:\s*\{.*?DE:\s*[\'"]([^\'"]+)[\'"]', item, flags=re.DOTALL)
    if name:
        print(' -', name.group(1))
    else:
        name = re.search(r'name:\s*[\'"]([^\'"]+)[\'"]', item)
        if name:
            print(' -', name.group(1))

happy_items = re.findall(r'\{[^{}]*category:\s*\'happy_hour\'[^{}]*\}', content, flags=re.DOTALL)
print('\nHappy Hour items:')
for item in happy_items:
    name = re.search(r'name:\s*\{.*?DE:\s*[\'"]([^\'"]+)[\'"]', item, flags=re.DOTALL)
    if name:
        print(' -', name.group(1))
    else:
        name = re.search(r'name:\s*[\'"]([^\'"]+)[\'"]', item)
        if name:
            print(' -', name.group(1))
