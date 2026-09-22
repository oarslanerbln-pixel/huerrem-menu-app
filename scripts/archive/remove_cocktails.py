import re
with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

def remove_item(name):
    global content
    pattern = r'\{\s*id:\s*\'[^\']*\',\s*name:\s*\{\s*DE:\s*\'' + name + r'\'.*?\},'
    content = re.sub(pattern, '', content, flags=re.DOTALL)

remove_item('Virgin Mojito')
remove_item('Passion Fruit Cooler')

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(content)
