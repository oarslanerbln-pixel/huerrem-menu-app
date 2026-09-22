import re

with open('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', 'r', encoding='utf-8') as f:
    c = f.read()

updates = {
    't_cay_kleine': '/images/menury_originals/tee__cay_kleine.webp',
    't_frischer_minze': '/images/menury_originals/tee__frischer_minztee.webp',
    't_ingwer': '/images/menury_originals/tee__ingwer_teee.webp',
    't_ingwer_minze': '/images/menury_originals/tee__ingwer_minze_tee.webp',
    't_lindenbluten': '/images/menury_originals/tee__lindenbluten_tee.webp',
}

for t_id, img_url in updates.items():
    # We find the id, then find the NEXT imageUrl: '' or imageUrl: "" and replace it.
    idx = c.find(f"id: '{t_id}'")
    if idx == -1:
        idx = c.find(f'id: "{t_id}"')
    
    if idx != -1:
        img_idx = c.find('imageUrl: ', idx)
        if img_idx != -1:
            # find the end of the line
            end_line_idx = c.find('\n', img_idx)
            old_line = c[img_idx:end_line_idx]
            # Replace the empty quotes with the new url
            new_line = re.sub(r'imageUrl:\s*[\'\"].*?[\'\"]', f"imageUrl: '{img_url}'", old_line)
            c = c[:img_idx] + new_line + c[end_line_idx:]
            print(f"Updated {t_id}")

with open('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(c)

