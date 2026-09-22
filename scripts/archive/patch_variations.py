import re

filepath = r"C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Fix Mineralwasser and Stilles Wasser
def fix_water(match):
    full_block = match.group(0)
    # Extract existing description
    desc_match = re.search(r"description:\s*\{\s*DE:\s*'0,2l \(3\.20 €\) \| 0,7l \(8\.20 €\)'[^}]+\},", full_block)
    if desc_match:
        replacement = """description: { DE: '', EN: '', TR: '' },
    variations: [
      { label: { DE: '0,2l', EN: '0.2l', TR: '0,2l' }, price: 3.20 },
      { label: { DE: '0,7l', EN: '0.7l', TR: '0,7l' }, price: 8.20 }
    ],"""
        full_block = full_block.replace(desc_match.group(0), replacement)
    return full_block

content = re.sub(r"\{\s*id:\s*'d13'.*?\},", fix_water, content, flags=re.DOTALL)
content = re.sub(r"\{\s*id:\s*'d15'.*?\},", fix_water, content, flags=re.DOTALL)

# 2. Fix Juices (Säfte)
def fix_juices(match):
    full_block = match.group(0)
    desc_match = re.search(r"description:\s*\{\s*DE:\s*'0,2l \(3\.20 €\) \| 0,4l \(4\.90 €\)'[^}]+\},", full_block)
    if desc_match:
        replacement = """description: { DE: '', EN: '', TR: '' },
    variations: [
      { label: { DE: '0,2l', EN: '0.2l', TR: '0,2l' }, price: 3.20 },
      { label: { DE: '0,4l', EN: '0.4l', TR: '0,4l' }, price: 4.90 }
    ],"""
        full_block = full_block.replace(desc_match.group(0), replacement)
    return full_block

for juice_id in ["d_juice_1", "d_juice_2", "d_juice_3", "d_juice_4", "d_juice_5", "d_juice_6", "d_juice_7", "d_juice_8", "d_juice_9"]:
    content = re.sub(r"\{\s*id:\s*'" + juice_id + r"'.*?\},", fix_juices, content, flags=re.DOTALL)

# 3. Fix Burgers (Extra Beef/Chicken Patty)
def fix_beef_burger(match):
    full_block = match.group(0)
    desc_match = re.search(r"description:\s*\{\s*DE:\s*'([^']+)Extra Beef Patty:\s*\+3,00 €'[^}]+\},", full_block)
    if desc_match:
        orig_desc_de = desc_match.group(1).strip().replace("\\n", "")
        # Assuming EN and TR are similarly formatted, we just simplify for the script
        replacement = f"""description: {{ DE: '{orig_desc_de}', EN: '{orig_desc_de}', TR: '{orig_desc_de}' }},
    variations: [
      {{ label: {{ DE: 'Extra Beef Patty', EN: 'Extra Beef Patty', TR: 'Ekstra Köfte' }}, price: 3.00 }}
    ],"""
        full_block = full_block.replace(desc_match.group(0), replacement)
    return full_block

content = re.sub(r"\{\s*id:\s*'f_burger_1'.*?\},", fix_beef_burger, content, flags=re.DOTALL)
content = re.sub(r"\{\s*id:\s*'f_burger_3'.*?\},", fix_beef_burger, content, flags=re.DOTALL)

def fix_chicken_burger(match):
    full_block = match.group(0)
    desc_match = re.search(r"description:\s*\{\s*DE:\s*'([^']+)Extra Chicken Patty:\s*\+3,00 €'[^}]+\},", full_block)
    if desc_match:
        orig_desc_de = desc_match.group(1).strip().replace("\\n", "")
        replacement = f"""description: {{ DE: '{orig_desc_de}', EN: '{orig_desc_de}', TR: '{orig_desc_de}' }},
    variations: [
      {{ label: {{ DE: 'Extra Chicken Patty', EN: 'Extra Chicken Patty', TR: 'Ekstra Tavuk' }}, price: 3.00 }}
    ],"""
        full_block = full_block.replace(desc_match.group(0), replacement)
    return full_block

content = re.sub(r"\{\s*id:\s*'f_burger_2'.*?\},", fix_chicken_burger, content, flags=re.DOTALL)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Patched basic price variations in menu.ts")
