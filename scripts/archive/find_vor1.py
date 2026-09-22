import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/data/menu.ts', encoding='utf-8') as f:
    lines = f.readlines()

# Find lines with f_vor_1
for i, line in enumerate(lines):
    if 'f_vor_1' in line:
        print(f'Line {i+1}: {line.rstrip()}')
