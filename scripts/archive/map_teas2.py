import re

teas = {
    'lindenblüten': '/images/menury_originals/kraeuter_und_bluetentees__bio_lindenblueten_tee_mit_honig.webp',
    'minztee': '/images/menury_originals/kraeuter_und_bluetentees__frischer_minztee_mit_honig.webp',
    'hürrem tee': '/images/menury_originals/kraeuter_und_bluetentees__huerrem_tee.webp',
    'ingwer-minz': '/images/menury_originals/kraeuter_und_bluetentees__ingwer_minze_tee_mit_honig.webp',
    'ingwer tee': '/images/menury_originals/kraeuter_und_bluetentees__ingwer_tee_mit_honig.webp',
}

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

blocks = content.split('id:')
out_content = blocks[0]

for b in blocks[1:]:
    for key, img_path in teas.items():
        if key.lower() in b.lower():
            # replace imageUrl: ''
            b = re.sub(r'imageUrl:\s*[\'"][\'"]', f"imageUrl: '{img_path}'", b, count=1)
            break
    out_content += 'id:' + b

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(out_content)
print("Updated teas!")
