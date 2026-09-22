import re

unique_flags = [
    'us', 'ca', 'mx', 'de', 'fr', 'gb', 'es', 'it', 'nl', 'pt', 
    'be', 'hr', 'dk', 'ch', 'rs', 'pl', 'at', 'ar', 'br', 'uy', 
    'co', 'ec', 'cl', 'cr', 'pa', 'jm', 'ma', 'sn', 'dz', 'tn', 
    'eg', 'cm', 'gh', 'ml', 'ci', 'jp', 'ir', 'kr', 'sa', 'au', 
    'qa', 'ae', 'uz', 'nz', 'tr', 'gr', 'cz', 'hu'
]

with open('../src/data/worldCupData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all keys like 's1': 'something'
def replace_flag(match):
    global flag_index
    code = unique_flags[flag_index % len(unique_flags)]
    flag_index += 1
    return f"'{match.group(1)}': '{code}'"

flag_index = 0
new_content = re.sub(r"'([A-Za-z0-9_]+)':\s*'[^']+'", replace_flag, content)

with open('../src/data/worldCupData.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)
