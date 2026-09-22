import os
from PIL import Image

shisha_dir = r"c:\Users\oarsl\Desktop\huerrem-menu-concept\webapp\public\images\shisha"

def remove_white_bg(img, tolerance=15):
    img = img.convert("RGBA")
    data = img.getdata()
    new_data = []
    
    # We remove anything close to white
    for item in data:
        # Check if the pixel is near white (including the alpha channel)
        # item is (R, G, B, A)
        if item[0] > 255 - tolerance and item[1] > 255 - tolerance and item[2] > 255 - tolerance and item[3] > 0:
            new_data.append((255, 255, 255, 0)) # Make transparent
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    return img

def process_images():
    for filename in os.listdir(shisha_dir):
        if filename.endswith(".png"):
            input_path = os.path.join(shisha_dir, filename)
            print(f"Processing {filename}...")
            try:
                img = Image.open(input_path)
                bbox = img.getbbox()
                if bbox:
                    cropped = img.crop(bbox)
                    cleaned = remove_white_bg(cropped, tolerance=30) # 30 tolerance to catch light grays
                    cleaned.save(input_path)
                    print(f"Saved {input_path}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    process_images()
