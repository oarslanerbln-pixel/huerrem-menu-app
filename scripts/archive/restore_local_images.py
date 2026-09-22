import json
import re
import os

# 1. Load Manifest
manifest_path = '../public/images/menury_originals/_manifest.json'
with open(manifest_path, 'r', encoding='utf-8') as f:
    manifest = json.load(f)

# Title to local_file mapping
title_to_file = {}
for item in manifest:
    # lower case matching
    title_to_file[item['title'].lower()] = item['local_file']

# 2. Get Shisha images
shisha_dir = '../public/images/shisha'
shisha_files = os.listdir(shisha_dir)

def get_shisha_image(name_de):
    name_clean = name_de.lower().replace(' ', '-').replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue')
    
    # Check direct match
    for f in shisha_files:
        if f == name_clean + '.png' or f == name_clean + '.webp':
            return '/images/shisha/' + f
            
    # Check concept match
    for f in shisha_files:
        if 'concept_' in f and name_clean.replace('-', '_') in f.replace('-', '_'):
            return '/images/shisha/' + f
            
    # Add a couple of hardcoded exceptions if necessary:
    if "traube-minze" in name_clean: return "/images/shisha/traube-minze.png"
    if "sternstaub" in name_clean: return "/images/shisha/sternstaub.png"
    if "black-nana" in name_clean: return "/images/shisha/black-nana.png"
            
    return ''

# 3. Process menu.ts
with open('../src/data/menu.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

current_name_de = ''
current_cat = ''
current_id = ''

for i, line in enumerate(lines):
    # Match ID
    id_match = re.search(r"id:\s*'([^']+)'", line)
    if id_match:
        current_id = id_match.group(1)
        current_name_de = '' # reset

    # ONLY match if it's the "name:" line!
    if 'name:' in line:
        name_match = re.search(r"DE:\s*'([^']+)'", line)
        if not name_match:
            name_match = re.search(r'DE:\s*"([^"]+)"', line)
            
        if name_match:
            current_name_de = name_match.group(1)
        
    # Match Category
    cat_match = re.search(r"category:\s*'([^']+)'", line)
    if cat_match:
        current_cat = cat_match.group(1)
        
    # Match imageUrl and Replace
    if 'imageUrl:' in line:
        img_url = ''
        
        if current_cat == 'shisha' or current_id.startswith('s'):
            img_url = get_shisha_image(current_name_de)
        else:
            # check manifest
            lookup_name = current_name_de.lower()
            if lookup_name in title_to_file:
                img_url = '/images/menury_originals/' + title_to_file[lookup_name]
            else:
                # fallback: try to find something similar in title_to_file
                for t, f in title_to_file.items():
                    if t in lookup_name or lookup_name in t:
                        img_url = '/images/menury_originals/' + f
                        break
        
        if not img_url:
            # Check drinks
            if os.path.exists('../public/images/drinks/'):
                for f in os.listdir('../public/images/drinks/'):
                    if current_name_de.lower().replace(' ', '_') in f.lower():
                        img_url = '/images/drinks/' + f
                        break
            
            # Check food
            if not img_url and os.path.exists('../public/images/food/'):
                for f in os.listdir('../public/images/food/'):
                    if current_name_de.lower().replace(' ', '_') in f.lower():
                        img_url = '/images/food/' + f
                        break
        
        # Override Sahlep (user requested typography)
        if current_id == 'd_hot_sahlep':
            img_url = ''
            
        # Replace
        if img_url:
            lines[i] = re.sub(r"imageUrl:\s*'.*?'", f"imageUrl: '{img_url}'", line)
            lines[i] = re.sub(r'imageUrl:\s*".*?"', f"imageUrl: '{img_url}'", lines[i])
        else:
            # If nothing found, put a placeholder or leave empty string
            lines[i] = re.sub(r"imageUrl:\s*'.*?'", "imageUrl: ''", line)
            lines[i] = re.sub(r'imageUrl:\s*".*?"', "imageUrl: ''", lines[i])

with open('../src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.writelines(lines)

print("Local images restored properly!")
