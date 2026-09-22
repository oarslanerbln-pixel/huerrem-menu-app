import re

with open('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', 'r', encoding='utf-8') as f:
    c = f.read()

updates = {
    't_cay_klein': '/images/menury_originals/tee__cay_kleine.webp',
    't_minztee': '/images/menury_originals/tee__frischer_minztee.webp',
    't_ingwer': '/images/menury_originals/tee__ingwer_teee.webp',
    't_ingwer_minze': '/images/menury_originals/tee__ingwer_minze_tee.webp',
    't_linden': '/images/menury_originals/tee__lindenbluten_tee.webp',
}

for t_id, img_url in updates.items():
    idx = c.find(f'"id": "{t_id}"')
    if idx == -1:
        idx = c.find(f"'id': '{t_id}'")
        
    if idx == -1:
        print(f"Could not find id {t_id}")
        continue
        
    if idx != -1:
        # the imageUrl might not exist. If it doesn't exist, we add it.
        # But wait, looking at repair_menu_final.py, I DID NOT ADD imageUrl AT ALL!!!
        # Oh, in `repair_menu_final.py`, I didn't include an `imageUrl` property for the teas!
        print(f"Found {t_id}")
        # let's just insert imageUrl right after "category": "drinks",
        cat_idx = c.find('"category": "drinks"', idx)
        if cat_idx != -1:
            c = c[:cat_idx] + f'"imageUrl": "{img_url}",\n    ' + c[cat_idx:]
            print(f"Inserted imageUrl for {t_id}")

with open('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(c)
