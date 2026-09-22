import re

# Mapping of softdrink IDs to premium Unsplash images
images_map = {
    'd_sd_cola': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600', # Classic dark cola with ice
    'd_sd_cola_zero': 'https://images.unsplash.com/photo-1596803244618-8dbee441d70b?auto=format&fit=crop&q=80&w=600', # Cola glass
    'd_sd_fanta': 'https://images.unsplash.com/photo-1620875886807-16086f4a56a6?auto=format&fit=crop&q=80&w=600', # Orange soda with ice
    'd_sd_sprite': 'https://images.unsplash.com/photo-1625860633266-9ebdd59c0490?auto=format&fit=crop&q=80&w=600', # Clear sparkling lime drink
    'd_sd_mezzo': 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&q=80&w=600', # Mixed cola/orange style
    'd_sd_schweppes_wb': 'https://images.unsplash.com/photo-1595981267035-7b04d84b4e1e?auto=format&fit=crop&q=80&w=600', # Pink wildberry style
    'd_sd_schweppes_ta': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600', # Tonic water
    'd_sd_schweppes_ga': 'https://images.unsplash.com/photo-1595981234058-a9302bfcb844?auto=format&fit=crop&q=80&w=600', # Ginger ale
    'd_sd_redbull': 'https://images.unsplash.com/photo-1621317762699-0a672ee6b30f?auto=format&fit=crop&q=80&w=600', # Energy drink vibe
    'd_sd_redbull_sf': 'https://images.unsplash.com/photo-1621317762699-0a672ee6b30f?auto=format&fit=crop&q=80&w=600',
    'd_sd_redbull_red': 'https://images.unsplash.com/photo-1608667508764-33cf0726b13a?auto=format&fit=crop&q=80&w=600', # Red energy
    'd_sd_redbull_blue': 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=600', # Blue energy
    'd_sd_fritz_cola': 'https://images.unsplash.com/photo-1555562095-2c35e982d6df?auto=format&fit=crop&q=80&w=600', # Artisan bottle cola
    'd_sd_clubmate': 'https://images.unsplash.com/photo-1624896265008-012586d06d4e?auto=format&fit=crop&q=80&w=600', # Mate style bottle
}

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

for item_id, img_url in images_map.items():
    # We find the block for the item id and replace its imageUrl field.
    # The regex looks for id: 'item_id', ... imageUrl: '...'
    pattern = r"(id:\s*'" + item_id + r"'.*?imageUrl:\s*')[^']*(')"
    content = re.sub(pattern, r"\g<1>" + img_url + r"\g<2>", content, flags=re.DOTALL)

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Soft drink images updated.")
