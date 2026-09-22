import shutil, os, re

artifact_dir = r'C:\Users\oarsl\.gemini\antigravity-ide\brain\4341e5fc-1021-4fe6-82ec-99cf3fe020ef'
target_dir = r'C:\Users\oarsl\Desktop\huerrem-menu-concept\webapp\public\images\shisha'

images = [
    'media__1781129475685.png',
    'media__1781129475821.png',
    'media__1781129475847.png',
    'media__1781129475853.png',
    'media__1781129475965.png',
    'media__1781131296153.png'
]

copied_files = []
for i, img in enumerate(images):
    src = os.path.join(artifact_dir, img)
    if os.path.exists(src):
        dst_name = f'premium_ai_shisha_{i+1}.png'
        dst = os.path.join(target_dir, dst_name)
        shutil.copy2(src, dst)
        copied_files.append('/images/shisha/' + dst_name)

# Now update menu.ts for all shisha to cycle through these copied_files
if copied_files:
    menu_path = r'C:\Users\oarsl\Desktop\huerrem-menu-concept\webapp\src\data\menu.ts'
    with open(menu_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    current_cat = ''
    current_id = ''
    shisha_idx = 0
    
    for i, line in enumerate(lines):
        id_match = re.search(r"id:\s*'([^']+)'", line)
        if id_match:
            current_id = id_match.group(1)
            
        cat_match = re.search(r"category:\s*'([^']+)'", line)
        if cat_match:
            current_cat = cat_match.group(1)
            
        if 'imageUrl:' in line:
            if current_cat == 'shisha' or current_id.startswith('s'):
                ai_url = copied_files[shisha_idx % len(copied_files)]
                # Ensure we handle single and double quotes
                if "'" in line:
                    lines[i] = re.sub(r"imageUrl:\s*'.*?'", f"imageUrl: '{ai_url}'", line)
                else:
                    lines[i] = re.sub(r'imageUrl:\s*".*?"', f"imageUrl: '{ai_url}'", line)
                shisha_idx += 1
                
    with open(menu_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)
    
    print('Successfully copied and mapped AI Shisha images!')
else:
    print('No AI images found in artifact directory.')
