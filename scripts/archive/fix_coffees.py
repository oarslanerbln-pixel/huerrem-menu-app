import re

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

mokka_img = 'https://images.unsplash.com/photo-1544253303-c4dbd8ebfcba?auto=format&fit=crop&q=80&w=600'
capp_img = 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=600'

def force_img(item_id, img_url, text):
    # Regex to find block and replace imageUrl: ''
    # Using a safer approach without backreferences that might fail if string gets too long
    pattern = r"(id:\s*'" + item_id + r"'.*?)imageUrl:\s*''"
    if re.search(pattern, text, re.DOTALL):
        return re.sub(pattern, r"\g<1>imageUrl: '" + img_url + "'", text, flags=re.DOTALL)
    
    # Or insert before category:
    pattern2 = r"(id:\s*'" + item_id + r"'.*?)(category:)"
    if re.search(pattern2, text, re.DOTALL):
        return re.sub(pattern2, r"\g<1>imageUrl: '" + img_url + "',\n    \g<2>", text, flags=re.DOTALL)
    return text

content = force_img('d_coffee_mokka', mokka_img, content)
content = force_img('d_coffee_cappuccino', capp_img, content)
content = force_img('d27', capp_img, content) # The old cappuccino id

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("Coffees fixed")
