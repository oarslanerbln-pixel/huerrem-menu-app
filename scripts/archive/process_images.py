import os
from rembg import remove
from PIL import Image

shisha_dir = r"c:\Users\oarsl\Desktop\huerrem-menu-concept\webapp\public\images\shisha"

def process_images():
    for filename in os.listdir(shisha_dir):
        if filename.endswith(".png") or filename.endswith(".jpg"):
            input_path = os.path.join(shisha_dir, filename)
            output_path = os.path.join(shisha_dir, f"{os.path.splitext(filename)[0]}-nobg.png")
            
            print(f"Processing {filename}...")
            try:
                # Open the image
                input_image = Image.open(input_path)
                
                # Remove background
                output_image = remove(input_image)
                
                # Save the new image
                output_image.save(output_path)
                print(f"Saved {output_path}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    process_images()
