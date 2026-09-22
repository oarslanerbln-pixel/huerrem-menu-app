import re

teas = {
    'lindenblüten': '/images/menury_originals/kraeuter_und_bluetentees__bio_lindenblueten_tee_mit_honig.webp',
    'minztee': '/images/menury_originals/kraeuter_und_bluetentees__frischer_minztee_mit_honig.webp',
    'hürrem tee': '/images/menury_originals/kraeuter_und_bluetentees__huerrem_tee.webp',
    'ingwer minze': '/images/menury_originals/kraeuter_und_bluetentees__ingwer_minze_tee_mit_honig.webp',
    'ingwer tee': '/images/menury_originals/kraeuter_und_bluetentees__ingwer_tee_mit_honig.webp',
    # Wait, maybe they are in the menu without 'mit honig'? 
    # Let's just search the name block for the key
}

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

out_content = content
for key, img_path in teas.items():
    # find the block with this name (case insensitive) and replace its imageUrl
    # We can do this safely:
    pattern = r'({[\s\S]*?name:\s*[\s\S]*?' + re.escape(key) + r'[\s\S]*?imageUrl:\s*[\'"])(.*?)([\'"])'
    
    def replacer(match):
        print(f"Mapping '{key}' -> {img_path}")
        return match.group(1) + img_path + match.group(3)
        
    out_content = re.sub(pattern, replacer, out_content, flags=re.IGNORECASE)

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(out_content)
