import re, sys
sys.stdout.reconfigure(encoding='utf-8')

# Read original file and the current menu.ts
orig_content = open('src/data/menu.ts.orig', encoding='utf-8').read()
menu_content = open('src/data/menu.ts', encoding='utf-8').read()

# Find the happy_hour section in orig
happy_idx = orig_content.find("// --- HAPPY HOUR COMBOS ---")
print('Happy Hour section at index:', happy_idx)
print(orig_content[happy_idx: happy_idx + 3000])
