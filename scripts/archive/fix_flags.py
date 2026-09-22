import re

code_map = {
    'Egypt': 'eg',
    'Germany': 'de',
    'UAE': 'ae',
    'Spain': 'es',
    'Cuba': 'cu',
    'USA': 'us',
    'Brazil': 'br',
    'France': 'fr',
    'Jamaica': 'jm',
    'Russia': 'ru',
    'Turkey': 'tr',
    'Italy': 'it',
    'Japan': 'jp',
    'Morocco': 'ma',
    'Austria': 'at',
    'Luxembourg': 'lu',
    'India': 'in',
    'Belgium': 'be'
}

with open('../src/data/worldCupData.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if '//' in line and "': '" in line:
        comment = line.split('//')[1]
        new_code = 'un' # default unknown
        for country, code in code_map.items():
            if country in comment:
                new_code = code
                break
        
        # Replace the emoji string with the country code
        lines[i] = re.sub(r"': '[^']+'", f"': '{new_code}'", line)

with open('../src/data/worldCupData.ts', 'w', encoding='utf-8') as f:
    f.writelines(lines)
