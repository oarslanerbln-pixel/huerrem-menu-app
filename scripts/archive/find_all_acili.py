import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/menu.ts', encoding='utf-8') as f:
    lines = f.readlines()

# Find ALL occurrences of Acili Ezme
for i, line in enumerate(lines):
    if 'Acili Ezme' in line or 'acili_ezme' in line or 'f_vor_1' in line:
        print(f'Line {i+1}: {line.rstrip()}')
