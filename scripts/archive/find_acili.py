import re, sys
sys.stdout.reconfigure(encoding='utf-8')

content = open('src/data/menu.ts', encoding='utf-8').read()
# Find all lines with acili ezme
matches = list(re.finditer(r'"id":\s*"([^"]*)"[^}]*"name"[^}]*"DE":\s*"Acili Ezme"', content, flags=re.DOTALL))
if not matches:
    matches = list(re.finditer(r'"id":\s*"([^"]*acili|[^"]*vor[^"]*)"', content))

# Just search for 'Acili Ezme'  
idx = 0
count = 0
positions = []
while True:
    idx = content.find('Acili Ezme', idx)
    if idx == -1:
        break
    positions.append(idx)
    count += 1
    idx += 1

print(f'Acili Ezme found {count} times at positions: {positions}')
for pos in positions:
    print(f'\n--- At position {pos} ---')
    print(content[pos-200:pos+100])
