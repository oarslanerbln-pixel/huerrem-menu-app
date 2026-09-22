"""
Map downloaded Menury original images to our menu.ts items.
Copies the right files into /images/drinks/ and /images/food/ directories,
and outputs the menu.ts changes needed.
"""
import shutil
import os

MENURY_DIR = r"c:\Users\oarsl\Desktop\huerrem-menu-concept\webapp\public\images\menury_originals"
DRINKS_DIR = r"c:\Users\oarsl\Desktop\huerrem-menu-concept\webapp\public\images\drinks"
FOOD_DIR = r"c:\Users\oarsl\Desktop\huerrem-menu-concept\webapp\public\images\food"

os.makedirs(DRINKS_DIR, exist_ok=True)
os.makedirs(FOOD_DIR, exist_ok=True)

# Mapping: menu.ts id -> (menury_filename, target_dir, target_filename)
# Based on matching Menury downloaded files to our menu.ts items

DRINK_MAPPINGS = {
    # Sommer-Specials (originals from restaurant owner!)
    "d1": ("sommer_specials__golden_mango_macchiatto.webp", "golden_mango_macchiato.webp"),
    "d2": ("sommer_specials__iced_strawberry_velvet.webp", "iced_strawberry_velvet.webp"),
    "d6": ("sommer_specials__iced_latte.webp", "iced_latte.webp"),
    # Softdrinks
    "d9": ("softdrinks__coca_cola.webp", "coca_cola.webp"),
    "d10": ("softdrinks__coca_cola_zero.webp", "coca_cola_zero.webp"),
    "d11": ("softdrinks__fanta.webp", "fanta.webp"),
    "d12": ("softdrinks__sprite.webp", "sprite.webp"),
    "d13": ("softdrinks__mineralwasser.webp", "mineralwasser.webp"),
    "d14": ("softdrinks__churchill_02l.webp", "churchill.webp"),
    "d15": ("softdrinks__stilles_wasser.webp", "stilles_wasser.webp"),
    "d16": ("softdrinks__schweppes_ginger_ale.webp", "schweppes_ginger_ale.webp"),
    "d17": ("softdrinks__schweppes_wild_berry.webp", "schweppes_wild_berry.webp"),
    "d18": ("softdrinks__rixdorfer_fassbrause.webp", "rixdorfer_fassbrause.webp"),
    "d19": ("softdrinks__club_mate.webp", "club_mate.webp"),
    "d20": ("softdrinks__elephant_bay.webp", "elephant_bay.webp"),
    # Kaffeespezialitäten
    "d26": ("kaffeespezialitaeten__tuerkischer_mokka.webp", "turkischer_kaffee.webp"),
    "d27": ("kaffeespezialitaeten__cappuccino.webp", "cappuccino.webp"),
    # Heiße Specials
    "d_hs_2": ("heisse_specials__matcha_latte.webp", "matcha_latte.webp"),
    "d_hs_3": ("heisse_specials__white_chocolate.webp", "white_chocolate.webp"),
    "d_hs_4": ("heisse_specials__dark_chocolate.webp", "dark_chocolate.webp"),
    "d_hs_5": ("heisse_specials__sahlep.webp", "sahlep.webp"),
}

FOOD_MAPPINGS = {
    "f1": ("vorspeisen__hummus.webp", "hummus_original.webp"),
    "f10": ("finger_food__classic_fries.webp", "pommes_frites_original.webp"),
    "f12": ("burger_gerichte__classic_cheeseburger.webp", "cheese_burger_original.webp"),
}

def copy_mapped_files():
    print("=" * 60)
    print("COPYING MENURY ORIGINAL IMAGES")
    print("=" * 60)
    
    copied = 0
    
    # Copy drink images
    print("\n--- DRINKS ---")
    for item_id, (src_name, dest_name) in DRINK_MAPPINGS.items():
        src = os.path.join(MENURY_DIR, src_name)
        dest = os.path.join(DRINKS_DIR, dest_name)
        if os.path.exists(src):
            shutil.copy2(src, dest)
            print(f"  [OK] {item_id}: {src_name} -> drinks/{dest_name}")
            copied += 1
        else:
            print(f"  [FAIL] {item_id}: {src_name} NOT FOUND")
    
    # Copy food images
    print("\n--- FOOD ---")
    for item_id, (src_name, dest_name) in FOOD_MAPPINGS.items():
        src = os.path.join(MENURY_DIR, src_name)
        dest = os.path.join(FOOD_DIR, dest_name)
        if os.path.exists(src):
            shutil.copy2(src, dest)
            print(f"  [OK] {item_id}: {src_name} -> food/{dest_name}")
            copied += 1
        else:
            print(f"  [FAIL] {item_id}: {src_name} NOT FOUND")
    
    print(f"\n{'=' * 60}")
    print(f"Copied {copied} files total")
    print(f"\n--- MENU.TS imageUrl VALUES TO ADD/UPDATE ---\n")
    
    for item_id, (_, dest_name) in DRINK_MAPPINGS.items():
        print(f"  {item_id}: imageUrl: '/images/drinks/{dest_name}'")
    
    for item_id, (_, dest_name) in FOOD_MAPPINGS.items():
        print(f"  {item_id}: imageUrl: '/images/food/{dest_name}'")
    
    print(f"\n--- ITEMS STILL WITHOUT IMAGE (need AI generation) ---")
    print("  d7  - Fritz Cola (NO IMAGE on Menury)")
    print("  d8  - Fritz Cola Zero (NO IMAGE on Menury)")
    print("  d_hs_1 - Chai Latte (NO IMAGE on Menury)")
    print("  d_juice_1-9 - All juices (NO IMAGE on Menury)")
    print("  d_hit_1-7 - All Homemade Iced Teas (NO IMAGE on Menury)")
    print("  d_fh_1-8 - All Fresh Homemade (NO IMAGE on Menury)")
    print("  d23 - Mango Lassi (NOT IN MENURY)")
    print("  d24 - Virgin Mojito (NOT IN MENURY)")
    print("  d25 - Passion Fruit Cooler (NOT IN MENURY)")

if __name__ == "__main__":
    copy_mapped_files()
