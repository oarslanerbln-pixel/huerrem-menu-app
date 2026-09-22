import re

unsplash_urls = {
    # Shishas
    's1': 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80', # Apple
    's2': 'https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=600&q=80',
    's3': 'https://images.unsplash.com/photo-1596484552993-8fbc4c986c75?auto=format&fit=crop&w=600&q=80',
    's4': 'https://images.unsplash.com/photo-1620875886807-16086f4a56a6?auto=format&fit=crop&w=600&q=80',
    's5': 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=600&q=80',
    's6': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80',
    's7': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=80',
    's8': 'https://images.unsplash.com/photo-1553530666-ba11a90a2bf9?auto=format&fit=crop&w=600&q=80',
    's9': 'https://images.unsplash.com/photo-1595981267035-7b04d84b4e1e?auto=format&fit=crop&w=600&q=80',
    's10': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80',
    's11': 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&q=80',
    's12': 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=600&q=80',
    's13': 'https://images.unsplash.com/photo-1628557044797-f21a177c37ec?auto=format&fit=crop&w=600&q=80',
    's14': 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&w=600&q=80',
    's15': 'https://images.unsplash.com/photo-1555562095-2c35e982d6df?auto=format&fit=crop&w=600&q=80',
    's16': 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80',
    's17': 'https://images.unsplash.com/photo-1608667508764-33cf0726b13a?auto=format&fit=crop&w=600&q=80',
    's18': 'https://images.unsplash.com/photo-1621317762699-0a672ee6b30f?auto=format&fit=crop&w=600&q=80',
    
    # Coffees
    'd_coffee_espresso': 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=600',
    'd_coffee_crema': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600',
    'd_coffee_latte': 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=600',
    'd_coffee_mokka': 'https://images.unsplash.com/photo-1544253303-c4dbd8ebfcba?auto=format&fit=crop&q=80&w=600',
    'd_coffee_cappuccino': 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=600',
    'd_coffee_milchkaffee': 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600',
    'd_coffee_icedlatte': 'https://images.unsplash.com/photo-1517701550927-30cfcb64db10?auto=format&fit=crop&q=80&w=600',
    'd_coffee_icedcaramel': 'https://images.unsplash.com/photo-1499961024600-ad094db605d4?auto=format&fit=crop&q=80&w=600',
    
    # Teas
    'd_tea_cay': 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&q=80&w=600',
    'd_tea_kamille': 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=600',
    'd_tea_salbei': 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80&w=600',
    'd_tea_sencha': 'https://images.unsplash.com/photo-1627490847250-934ab3bda2eb?auto=format&fit=crop&q=80&w=600',
    'd_tea_hotbeauty': 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&q=80&w=600',
    'd_tea_fourseason': 'https://images.unsplash.com/photo-1596484552993-8fbc4c986c75?auto=format&fit=crop&q=80&w=600',
    'd_tea_bluedream': 'https://images.unsplash.com/photo-1620619572115-38fc7183e8fa?auto=format&fit=crop&q=80&w=600',
    'd_tea_mango': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600',
    'd_tea_apple': 'https://images.unsplash.com/photo-1577859714523-5e925c48b26f?auto=format&fit=crop&q=80&w=600',
    'd_tea_blossom': 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&q=80&w=600',
    
    # Hot Drinks
    'd_hot_chai': 'https://images.unsplash.com/photo-1576092762791-dd9e2220afa1?auto=format&fit=crop&q=80&w=600',
    'd_hot_matcha': 'https://images.unsplash.com/photo-1515823662415-eafdd0b3718a?auto=format&fit=crop&q=80&w=600',
    'd_hot_choco': 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&q=80&w=600',
    
    # Softdrinks
    'd_sd_cola': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600',
    'd_sd_cola_zero': 'https://images.unsplash.com/photo-1596803244618-8dbee441d70b?auto=format&fit=crop&q=80&w=600',
    'd_sd_fanta': 'https://images.unsplash.com/photo-1620875886807-16086f4a56a6?auto=format&fit=crop&q=80&w=600',
    'd_sd_sprite': 'https://images.unsplash.com/photo-1625860633266-9ebdd59c0490?auto=format&fit=crop&q=80&w=600',
    'd_sd_mezzo': 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&q=80&w=600',
    'd_sd_schweppes_wb': 'https://images.unsplash.com/photo-1595981267035-7b04d84b4e1e?auto=format&fit=crop&q=80&w=600',
    'd_sd_schweppes_ta': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    'd_sd_schweppes_ga': 'https://images.unsplash.com/photo-1595981234058-a9302bfcb844?auto=format&fit=crop&q=80&w=600',
    'd_sd_redbull': 'https://images.unsplash.com/photo-1621317762699-0a672ee6b30f?auto=format&fit=crop&q=80&w=600',
    'd_sd_redbull_sf': 'https://images.unsplash.com/photo-1621317762699-0a672ee6b30f?auto=format&fit=crop&q=80&w=600',
    'd_sd_redbull_red': 'https://images.unsplash.com/photo-1608667508764-33cf0726b13a?auto=format&fit=crop&q=80&w=600',
    'd_sd_redbull_blue': 'https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=600',
    'd_sd_fritz_cola': 'https://images.unsplash.com/photo-1555562095-2c35e982d6df?auto=format&fit=crop&q=80&w=600',
    'd_sd_clubmate': 'https://images.unsplash.com/photo-1624896265008-012586d06d4e?auto=format&fit=crop&q=80&w=600',
    
    # Smoothies
    'd_sm_1': 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&q=80&w=600',
    'd_sm_2': 'https://images.unsplash.com/photo-1628557044797-f21a177c37ec?auto=format&fit=crop&q=80&w=600',
    'd_sm_3': 'https://images.unsplash.com/photo-1553530666-ba11a90a2bf9?auto=format&fit=crop&q=80&w=600',
    'd_sm_4': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=600',
    'd_sm_5': 'https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&q=80&w=600',
    
    # Iced Teas
    'd_hit_6': 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=600',
    'd_hit_7': 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600',
    
    # Food
    'f1': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600',
    'f2': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600',
    'f3': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600',
    'f4': 'https://images.unsplash.com/photo-1544025162-831e133c9215?auto=format&fit=crop&q=80&w=600',
    'f5': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600',
    
    # Drinks (Cocktails / Longdrinks fallback)
    'd1': 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600',
    'd2': 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600',
    'd3': 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600',
    'd4': 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600',
    'd5': 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600',
    'd6': 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600',
}

def main():
    with open('../src/data/menu.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    def replacer(match):
        item_id = match.group(1)
        full_block = match.group(0)
        
        best_img = ''
        if item_id in unsplash_urls:
            best_img = unsplash_urls[item_id]
        elif 'd_coffee' in item_id:
            best_img = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600'
        elif 'd_tea' in item_id:
            best_img = 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&q=80&w=600'
        elif 'd_sd' in item_id:
            best_img = 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600'
        
        # Exception for sahlep which the user requested to keep typographic
        if item_id == 'd_hot_sahlep':
            best_img = ''
            
        new_block = re.sub(r"imageUrl:\s*'[^']*'", "imageUrl: '" + best_img + "'", full_block)
        return new_block

    new_content = re.sub(r"(id:\s*'([^']+)'.*?imageUrl:\s*'[^']*')", replacer, content, flags=re.DOTALL)

    with open('../src/data/menu.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)

if __name__ == '__main__':
    main()
