import sys
sys.stdout.reconfigure(encoding='utf-8')

lines = open('src/data/menu.ts', encoding='utf-8').readlines()
for i, line in enumerate(lines):
    if 'suppe' in line.lower() or 'soup' in line.lower() or 'mercimek' in line.lower() or 'tomat' in line.lower() or 'lentil' in line.lower():
        print(f'Line {i+1}: {line.rstrip()}')
