import re

with open('src/data/worldCupData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r"'s13':\s*'[^']+'", "'s13': 'tr'", content)
content = re.sub(r"'s14':\s*'[^']+'", "'s14': 'ba'", content)
content = re.sub(r"'d_sd_mezzo':\s*'tr'", "'d_sd_mezzo': 'dk'", content)
content = re.sub(r"'f4':\s*'tr'", "'f4': 'ch'", content)

with open('src/data/worldCupData.ts', 'w', encoding='utf-8') as f:
    f.write(content)
