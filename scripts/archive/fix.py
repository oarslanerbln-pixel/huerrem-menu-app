import codecs
content = codecs.open('src/data/menu.ts', 'r', 'utf-8').read()
content = content.replace(r"\'Traditionell\'", "'Traditionell'")
content = content.replace(r"\'Kräuter & Blütentees\'", "'Kräuter & Blütentees'")
content = content.replace(r"\'Exklusiv & Aromatisch\'", "'Exklusiv & Aromatisch'")
codecs.open('src/data/menu.ts', 'w', 'utf-8').write(content)
