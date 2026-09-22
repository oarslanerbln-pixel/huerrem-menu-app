import re, sys
sys.stdout.reconfigure(encoding='utf-8')
from collections import Counter

content = open('src/data/menu.ts.orig', encoding='utf-8').read()
cats = re.findall(r"category:\s*'([^']+)'", content)
print(Counter(cats))
