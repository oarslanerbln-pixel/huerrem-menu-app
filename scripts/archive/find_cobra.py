import sys
sys.stdout.reconfigure(encoding='utf-8')

lines = open('src/data/menu.ts', encoding='utf-8').readlines()
for i, line in enumerate(lines):
    if 'cobra' in line.lower() or 'Cobra' in line:
        print(f'Line {i+1}: {line.rstrip()}')
