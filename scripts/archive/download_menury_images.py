"""
Download all menu item images from Menury API for Hürrem Lounge.
Fetches the restaurant data and downloads every item image (excluding hookah/shisha).
"""
import json
import os
import urllib.request
import ssl

# Disable SSL verification for simple download
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

API_URL = "https://menury.com/api/restaurant/acf150c429"
OUTPUT_DIR = r"c:\Users\oarsl\Desktop\huerrem-menu-concept\webapp\public\images\menury_originals"

# Menu IDs for categories (from API data)
# 44944 = HOOKAH (skip)
# 44942 = GETRÄNKE (parent)
# 44943 = FOOD (parent)
HOOKAH_MENU_IDS = {44944}

def fetch_api_data():
    """Fetch the full restaurant data from Menury API."""
    print("Fetching Menury API data...")
    req = urllib.request.Request(API_URL, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, context=ctx) as response:
        data = json.loads(response.read().decode("utf-8"))
    return data

def get_menu_id_to_title(menus):
    """Create a mapping of menu ID to menu title."""
    mapping = {}
    for menu in menus:
        mapping[menu["id"]] = menu["menu_title"]
    return mapping

def sanitize_filename(name):
    """Create a safe filename from a menu item title."""
    # Remove special chars, replace spaces with underscores
    safe = name.lower()
    replacements = {
        "ä": "ae", "ö": "oe", "ü": "ue", "ß": "ss",
        "ç": "c", "ş": "s", "ğ": "g", "ı": "i",
        " ": "_", "/": "_", "&": "and", "(": "", ")": "",
        ",": "", ".": "", "'": "", '"': "", "-": "_",
        "é": "e", "è": "e", "ê": "e"
    }
    for old, new in replacements.items():
        safe = safe.replace(old, new)
    # Remove any remaining non-alphanumeric chars (except underscore)
    safe = "".join(c for c in safe if c.isalnum() or c == "_")
    # Remove consecutive underscores
    while "__" in safe:
        safe = safe.replace("__", "_")
    return safe.strip("_")

def download_image(url, filepath):
    """Download an image from URL to filepath."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, context=ctx) as response:
            with open(filepath, "wb") as f:
                f.write(response.read())
        return True
    except Exception as e:
        print(f"  ERROR downloading {url}: {e}")
        return False

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    data = fetch_api_data()
    restaurant = data["data"]
    menus = restaurant["menus"]
    menu_items = restaurant["menu_items"]
    
    menu_id_to_title = get_menu_id_to_title(menus)
    
    print(f"\nFound {len(menu_items)} menu items total.")
    print(f"Menu categories: {list(menu_id_to_title.values())}\n")
    
    downloaded = 0
    skipped_hookah = 0
    no_image = 0
    items_with_images = []
    
    for item in menu_items:
        title = item["menu_item_title"]
        image = item.get("image")
        item_menus = item.get("menus", [])
        
        # Get the category name(s) for this item
        category_names = []
        for m in item_menus:
            mid = m["id"]
            if mid in menu_id_to_title:
                category_names.append(menu_id_to_title[mid])
        
        # Check if this is a hookah item
        is_hookah = any(m["id"] in HOOKAH_MENU_IDS for m in item_menus)
        if is_hookah:
            skipped_hookah += 1
            continue
        
        if image is None or image.get("url") is None:
            no_image += 1
            print(f"  NO IMAGE: {title} [{', '.join(category_names)}]")
            continue
        
        img_url = image["url"]
        category_str = sanitize_filename(category_names[0]) if category_names else "unknown"
        filename = f"{category_str}__{sanitize_filename(title)}.webp"
        filepath = os.path.join(OUTPUT_DIR, filename)
        
        print(f"  Downloading: {title} -> {filename}")
        if download_image(img_url, filepath):
            downloaded += 1
            items_with_images.append({
                "title": title,
                "category": category_names,
                "url": img_url,
                "local_file": filename
            })
    
    # Save manifest
    manifest_path = os.path.join(OUTPUT_DIR, "_manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(items_with_images, f, ensure_ascii=False, indent=2)
    
    print(f"\n{'='*60}")
    print(f"SUMMARY:")
    print(f"  Downloaded: {downloaded}")
    print(f"  Skipped (hookah): {skipped_hookah}")
    print(f"  No image available: {no_image}")
    print(f"  Manifest saved to: {manifest_path}")
    print(f"{'='*60}")

if __name__ == "__main__":
    main()
