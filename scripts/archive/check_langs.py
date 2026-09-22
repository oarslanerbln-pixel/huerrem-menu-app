import ast
import re

def check_missing_langs():
    with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We can just use a regex to extract name objects.
    matches = re.finditer(r'"name":\s*({[^}]+})', content)
    missing_count = 0
    for match in matches:
        obj_str = match.group(1)
        # Check if FR, ES, RU are present
        if '"FR"' not in obj_str or '"ES"' not in obj_str or '"RU"' not in obj_str:
            missing_count += 1
            print(f"Missing in: {obj_str}")
            
    print(f"Total missing: {missing_count}")

check_missing_langs()
