import os
from rembg import remove
from PIL import Image

shisha_dir = r"c:\Users\oarsl\Desktop\huerrem-menu-concept\webapp\public\images\shisha"

def process_images():
    for filename in os.listdir(shisha_dir):
        if filename.endswith(".png"):
            input_path = os.path.join(shisha_dir, filename)
            
            print(f"Processing {filename}...")
            try:
                img = Image.open(input_path).convert("RGBA")
                # Get bounding box of non-transparent pixels
                bbox = img.getbbox()
                if bbox:
                    # Crop to the card
                    cropped = img.crop(bbox)
                    # Create a white background image of the same size
                    # This ensures rembg treats the card as the whole image and removes the white bg
                    bg = Image.new("RGB", cropped.size, (255, 255, 255))
                    bg.paste(cropped, mask=cropped.split()[3])
                    
                    # Run rembg again
                    output_image = remove(bg)
                    
                    # Save
                    output_image.save(input_path)
                    print(f"Saved {input_path}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    process_images()
