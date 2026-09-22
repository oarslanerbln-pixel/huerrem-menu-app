import re
import random

# 48 unique country codes for World Cup 2026
unique_flags = [
    'us', 'ca', 'mx', 'de', 'fr', 'gb', 'es', 'it', 'nl', 'pt', 
    'be', 'hr', 'dk', 'ch', 'rs', 'pl', 'at', 'ar', 'br', 'uy', 
    'co', 'ec', 'cl', 'cr', 'pa', 'jm', 'ma', 'sn', 'dz', 'tn', 
    'eg', 'cm', 'gh', 'ml', 'ci', 'jp', 'ir', 'kr', 'sa', 'au', 
    'qa', 'ae', 'uz', 'nz', 'tr', 'gr', 'cz', 'hu'
]

with open('../src/data/worldCupData.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

flag_index = 0
for i, line in enumerate(lines):
    if '//' in line and "': '" in line:
        if flag_index < len(unique_flags):
            code = unique_flags[flag_index]
            flag_index += 1
        else:
            # If there are more than 48 items, reuse some or use something else, 
            # but user said "48 ulke olmasi lazim katilan 2026 yay", so we loop if needed
            code = unique_flags[flag_index % len(unique_flags)]
            flag_index += 1
            
        # Replace the country code
        lines[i] = re.sub(r"': '[a-z]{2}'", f"': '{code}'", line)
        lines[i] = re.sub(r"': '[a-z]{3}'", f"': '{code}'", lines[i]) # just in case

with open('../src/data/worldCupData.ts', 'w', encoding='utf-8') as f:
    f.writelines(lines)
