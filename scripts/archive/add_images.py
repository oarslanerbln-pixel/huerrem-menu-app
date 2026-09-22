import re

file_path = r"c:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Add images to Signature Cocktails
images = {
    "'sig_dragonfruit'": "'/images/menury_originals/signature_cocktails__dragonfruit_sunset.webp'",
    "'sig_fancy_love'": "'/images/menury_originals/signature_cocktails__fancy_love.webp'",
    "'sig_coconut_kiss'": "'/images/menury_originals/signature_cocktails__coconut_kiss.webp'",
    "'sig_solero'": "'/images/menury_originals/signature_cocktails__solero.webp'",
    "'sig_mosquito'": "'/images/menury_originals/signature_cocktails__mosquito.webp'",
    "'sig_blue_lychee'": "'/images/menury_originals/signature_cocktails__blue_lychee_mosquito.webp'",
}

for sig_id, img_url in images.items():
    pattern = re.compile(r"(id:\s*" + sig_id + r",.*?subcategory:\s*'Signature Cocktails')", re.DOTALL)
    def repl(m):
        if "imageUrl:" not in m.group(1):
            return m.group(1) + f",\n    imageUrl: {img_url}"
        return m.group(1)
    content = pattern.sub(repl, content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Images added to Signature Cocktails")
