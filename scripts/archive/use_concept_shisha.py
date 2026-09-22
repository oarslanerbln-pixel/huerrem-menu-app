import re

concept_mapping = {
    'doppel apfel': 'shisha_concept_apple.png',
    'apfel minze': 'shisha_concept_apple_mint.png',
    'traube minze': 'shisha_concept_grape_mint.png',
    'black nana': 'shisha_concept_black_nana.png',
    'sternstaub': 'shisha_concept_sternstaub.png',
    'luftschloss': 'shisha_concept_luftschloss.png',
    'limette minze': 'shisha_concept_lime_mint.png',
    'lemon chill': 'shisha_concept_lemon_chill.png',
    'pfirsich minze': 'shisha_concept_peach_mint.png', # Assuming this is s9 or similar
    'love 66': 'shisha_concept_love66.png',
    'ice kaktus': 'shisha_concept_ice_kaktus.png',
    'blueberry': 'shisha_concept_blueberry.png',
    'nasty girl': 'shisha_concept_nasty_girl.png',
    'raffaello': 'shisha_concept_raffaello.png',
    'falim red': 'shisha_concept_falim_red.png',
    'african queen': 'shisha_concept_african_queen.png'
}

def get_concept_image(name_de):
    name_lower = name_de.lower()
    for key, filename in concept_mapping.items():
        if key in name_lower:
            return '/images/shisha/' + filename
            
    # Fallback if exact name not found but it's a shisha
    return '/images/shisha/shisha_concept_led.png'

with open('../src/data/menu.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

current_name_de = ''
current_cat = ''
current_id = ''

for i, line in enumerate(lines):
    id_match = re.search(r"id:\s*'([^']+)'", line)
    if id_match:
        current_id = id_match.group(1)
        current_name_de = ''

    if 'name:' in line:
        name_match = re.search(r"DE:\s*'([^']+)'", line)
        if not name_match:
            name_match = re.search(r'DE:\s*"([^"]+)"', line)
        if name_match:
            current_name_de = name_match.group(1)
            
    cat_match = re.search(r"category:\s*'([^']+)'", line)
    if cat_match:
        current_cat = cat_match.group(1)
        
    if 'imageUrl:' in line:
        if current_cat == 'shisha' or current_id.startswith('s'):
            img_url = get_concept_image(current_name_de)
            if "'" in line:
                lines[i] = re.sub(r"imageUrl:\s*'.*?'", f"imageUrl: '{img_url}'", line)
            else:
                lines[i] = re.sub(r'imageUrl:\s*".*?"', f"imageUrl: '{img_url}'", line)

with open('../src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Mapped shisha concepts successfully!")
