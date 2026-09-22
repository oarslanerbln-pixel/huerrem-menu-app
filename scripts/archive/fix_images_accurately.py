import re
import random

images = {
    'shisha': [
        "https://images.unsplash.com/photo-1510816922405-1a80c9e6d0aa?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1572097560227-848e02d645e5?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1527027581781-8b7762696e1b?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1602444318723-5e728469a47c?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1588667614088-7e44a49edcb1?auto=format&fit=crop&q=80&w=600",
    ],
    'coffee': [
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1514432324607-a09d5b4aefdd?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1511920170033-f8396924c648?auto=format&fit=crop&q=80&w=600",
    ],
    'tea': [
        "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1627490847250-934ab3bda2eb?auto=format&fit=crop&q=80&w=600",
    ],
    'hot': [
        "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&q=80&w=600", # Hot Choco
        "https://images.unsplash.com/photo-1515823662415-eafdd0b3718a?auto=format&fit=crop&q=80&w=600", # Matcha
        "https://images.unsplash.com/photo-1576092762791-dd9e2220afa1?auto=format&fit=crop&q=80&w=600", # Chai
    ],
    'softdrink': [
        "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1625860633266-9ebdd59c0490?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1596803244618-8dbee441d70b?auto=format&fit=crop&q=80&w=600",
    ],
    'smoothie': [
        "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1553530666-ba11a90a2bf9?auto=format&fit=crop&q=80&w=600",
    ],
    'icedtea': [
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&q=80&w=600",
    ],
    'food': [
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1544025162-831e133c9215?auto=format&fit=crop&q=80&w=600",
    ],
    'kombi': [
        "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600",
    ]
}

def main():
    with open('../src/data/menu.ts', 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    current_id = None
    
    counters = {k: 0 for k in images.keys()}

    for i, line in enumerate(lines):
        match_id = re.search(r"id:\s*'([^']+)'", line)
        if match_id:
            current_id = match_id.group(1)
            
        if current_id and "imageUrl:" in line:
            # Determine category type based on ID
            cat = None
            if current_id.startswith('s') and current_id[1:].isdigit():
                cat = 'shisha'
            elif current_id.startswith('d_coffee'):
                cat = 'coffee'
            elif current_id.startswith('d_tea'):
                cat = 'tea'
            elif current_id.startswith('d_hot'):
                cat = 'hot'
            elif current_id.startswith('d_sd'):
                cat = 'softdrink'
            elif current_id.startswith('d_sm'):
                cat = 'smoothie'
            elif current_id.startswith('d_hit'):
                cat = 'icedtea'
            elif current_id.startswith('f'):
                cat = 'food'
            elif current_id.startswith('k'):
                cat = 'kombi'
                
            img_url = ''
            if cat:
                img_url = images[cat][counters[cat] % len(images[cat])]
                counters[cat] += 1
                
            # Sahlep typography exception
            if current_id == 'd_hot_sahlep':
                img_url = ''
                
            # Replace safely
            lines[i] = re.sub(r"imageUrl:\s*'.*?'", f"imageUrl: '{img_url}'", line)
            lines[i] = re.sub(r'imageUrl:\s*".*?"', f"imageUrl: '{img_url}'", lines[i])

    with open('../src/data/menu.ts', 'w', encoding='utf-8') as f:
        f.writelines(lines)
        
    print("All images correctly mapped to their respective categories!")

if __name__ == '__main__':
    main()
