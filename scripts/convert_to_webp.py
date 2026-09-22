import os
import glob
from PIL import Image
import re
import sys

# Windows UTF-8 fix for prints
sys.stdout.reconfigure(encoding='utf-8')

IMAGE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../public/images'))
MENU_TS_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '../src/data/menu.ts'))

def convert_images():
    total_saved = 0
    total_images = 0
    
    print("Looking for images in:", IMAGE_DIR)
    
    patterns = ['*.png', '*.jpg', '*.jpeg']
    files = []
    for ext in patterns:
        files.extend(glob.glob(os.path.join(IMAGE_DIR, '**', ext), recursive=True))
        
    for file in files:
        if 'favicon' in file.lower() or 'logo' in file.lower() or 'hero' in file.lower():
            continue 
            
        try:
            img = Image.open(file)
            webp_path = os.path.splitext(file)[0] + '.webp'
            
            img.save(webp_path, 'webp', quality=85, method=6)
            
            orig_size = os.path.getsize(file)
            new_size = os.path.getsize(webp_path)
            
            if new_size < orig_size:
                total_saved += (orig_size - new_size)
            
            os.remove(file)
            total_images += 1
            
        except Exception as e:
            print(f"Error - {file}: {e}")
            
    print(f"\nDone! Converted {total_images} images to WebP.")
    print(f"Saved Space: {total_saved / (1024*1024):.2f} MB")

def update_menu_ts():
    if not os.path.exists(MENU_TS_PATH):
        print(f"Dosya bulunamadı: {MENU_TS_PATH}")
        return
        
    with open(MENU_TS_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Sadece imageUrl satırlarındaki .png ve .jpg'leri değiştirir
    new_content = re.sub(r'\.png(?=[\"\'])', '.webp', content, flags=re.IGNORECASE)
    new_content = re.sub(r'\.jpg(?=[\"\'])', '.webp', new_content, flags=re.IGNORECASE)
    new_content = re.sub(r'\.jpeg(?=[\"\'])', '.webp', new_content, flags=re.IGNORECASE)
    
    if new_content != content:
        with open(MENU_TS_PATH, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("src/data/menu.ts güncellendi! (Uzantılar .webp yapıldı)")
    else:
        print("menu.ts içinde değiştirilecek uzantı bulunamadı.")

if __name__ == '__main__':
    convert_images()
    update_menu_ts()
