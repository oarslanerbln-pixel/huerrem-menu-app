import re, sys
sys.stdout.reconfigure(encoding='utf-8')
from collections import Counter

content = open('src/data/menu.ts', encoding='utf-8').read()
cats = re.findall(r'"category"\s*:\s*"([^"]+)"', content)
print(Counter(cats))
