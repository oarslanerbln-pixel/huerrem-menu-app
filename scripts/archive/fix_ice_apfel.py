import re
with open('../src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

new_content = re.sub(r"(id: 's17',.*?imageUrl: )'/images/shisha/shisha_concept_led\.png'", r"\g<1>'/images/shisha/shisha_concept_ice_apfel.png'", content, flags=re.DOTALL)

with open('../src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)
