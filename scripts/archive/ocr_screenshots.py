import os
import pytesseract
from PIL import Image

screenshot_dir = r"C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\public\images\screenshots"
output = []

for file in sorted(os.listdir(screenshot_dir)):
    if file.endswith(".png"):
        path = os.path.join(screenshot_dir, file)
        try:
            text = pytesseract.image_to_string(Image.open(path))
            if text.strip():
                # Just get the first few non-empty lines to see what the screenshot is about
                lines = [line.strip() for line in text.split('\n') if line.strip()]
                output.append(f"--- {file} ---")
                output.append('\n'.join(lines[:5]))
        except Exception as e:
            output.append(f"Error on {file}: {e}")

with open(r"C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\screenshot_summary.txt", "w", encoding="utf-8") as f:
    f.write('\n'.join(output))

print("OCR complete")
