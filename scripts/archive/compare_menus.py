import json
import re

# Load JSON data
try:
    with open('all_items.json', 'r', encoding='utf-8') as f:
        original_items = json.load(f)
except Exception as e:
    print(f"Error loading JSON: {e}")
    exit(1)

# Load TS data
try:
    with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
        ts_content = f.read()
except Exception as e:
    print(f"Error loading TS: {e}")
    exit(1)

# Extract items from TS using regex
ts_items = []
blocks = re.split(r'\s*\{\s*id:\s*', ts_content)[1:]
for b in blocks:
    name_match = re.search(r'name:\s*\{\s*DE:\s*[\'\"]([^\'\"]+)[\'\"]', b)
    if name_match:
        name = name_match.group(1).strip()
        
        price_match = re.search(r'price:\s*([\d\.]+)', b)
        price = float(price_match.group(1)) if price_match else 0.0
        
        cat_match = re.search(r'category:\s*[\'\"]([^\'\"]+)[\'\"]', b)
        cat = cat_match.group(1) if cat_match else ''
        
        sub_match = re.search(r'subcategory:\s*[\'\"]([^\'\"]+)[\'\"]', b)
        sub = sub_match.group(1) if sub_match else ''
        
        ts_items.append({
            'name': name.lower().replace('\u200b', ''),
            'original_name': name,
            'price': price,
            'category': cat,
            'subcategory': sub
        })

# Create a set of TS names for easy lookup (ignoring case and whitespace variations)
def normalize_name(name):
    # Remove superscript numbers and letters which might not match exactly
    name = re.sub(r'[⁰¹²³⁴⁵⁶⁷⁸⁹ᵃᵇᶜᵈᵉᶠ]', '', name)
    # Remove extra spaces, lowercase
    return re.sub(r'\s+', ' ', name.lower().strip())

ts_normalized_names = {normalize_name(item['name']) for item in ts_items}
ts_name_to_item = {normalize_name(item['name']): item for item in ts_items}

missing_items = []
price_mismatches = []
found_count = 0

for orig in original_items:
    orig_name = orig.get('name', '')
    if not orig_name: continue
    orig_price_str = orig.get('price', '0').replace('€', '').replace(',', '.').strip()
    try:
        orig_price = float(orig_price_str)
    except:
        orig_price = 0.0
        
    orig_norm = normalize_name(orig_name)
    
    # Try to find a match
    match = None
    if orig_norm in ts_name_to_item:
        match = ts_name_to_item[orig_norm]
    else:
        # Try partial match for long names
        for ts_name, ts_item in ts_name_to_item.items():
            if orig_norm in ts_name or ts_name in orig_norm:
                match = ts_item
                break
                
    if match:
        found_count += 1
        # Check price
        if abs(match['price'] - orig_price) > 0.01:
            price_mismatches.append({
                'name': orig_name,
                'orig_price': orig_price,
                'ts_price': match['price']
            })
    else:
        missing_items.append(orig)

# Generate Markdown Report
md_lines = []
md_lines.append("# Menü Karşılaştırma Raporu (Orjinal vs. Yeni)")
md_lines.append(f"Orjinal menüden (konsol) **{len(original_items)}** ürün çekildi.")
md_lines.append(f"Yeni sistemimizde (`menu.ts`) **{len(ts_items)}** ürün (artı opsiyonlar vb.) bulunuyor.")
md_lines.append(f"Eşleşen temel ürün sayısı: **{found_count}**\n")

if missing_items:
    md_lines.append("## 🚨 Eksik Ürünler (Yeni Sistemde Bulunamayanlar)\n")
    md_lines.append("Şu ürünler `menu.ts` dosyamızda tam olarak bulunamadı (veya isimleri çok farklı yazılmış):\n")
    
    # Group by category/subcategory if available from JSON, otherwise just list
    for item in missing_items:
        cat = item.get('category', 'Belirtilmemiş Kategori')
        sub = item.get('subcategory', '')
        desc = item.get('description', '')
        price = item.get('price', '')
        
        loc = f"**{cat}**" + (f" > {sub}" if sub else "")
        md_lines.append(f"- {loc}: `{item['name']}` ({price})")
        if desc:
            md_lines.append(f"  - *Açıklama: {desc}*")
else:
    md_lines.append("## ✅ Eksik Ürün Yok")
    md_lines.append("Tüm orjinal ürünler yeni sistemde mevcut!\n")
    
if price_mismatches:
    md_lines.append("\n## 💰 Fiyat Farklılıkları\n")
    for pm in price_mismatches:
        md_lines.append(f"- `{pm['name']}`: Orjinal **{pm['orig_price']} €** -> Yeni **{pm['ts_price']} €**")

# Write report
with open('menu_comparison_results.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(md_lines))
    
print("Report generated: menu_comparison_results.md")
