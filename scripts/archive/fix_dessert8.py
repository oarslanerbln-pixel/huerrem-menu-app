import re

menu_path = r"C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts"
with open(menu_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_dessert = """    id: 'food_dessert_8',
    name: { DE: 'Original San Sebastián Cheesecake', EN: 'Original San Sebastian Cheesecake', TR: 'Orijinal San Sebastian Cheesecake' },
    description: {
      DE: 'Klassik: 6.90 €, mit Vollmilchschokosoße: 8.90 €, mit weißer Schokosoße: 8.90 €',
      EN: 'Classic: 6.90 €, with milk chocolate sauce: 8.90 €, with white chocolate sauce: 8.90 €',
      TR: 'Klasik: 6.90 €, sütlü çikolata sosu ile: 8.90 €, beyaz çikolata sosu ile: 8.90 €'
    },
  {"""

new_dessert = """    id: 'food_dessert_8',
    name: { DE: 'Original San Sebastián Cheesecake', EN: 'Original San Sebastian Cheesecake', TR: 'Orijinal San Sebastian Cheesecake' },
    description: {
      DE: 'Klassik: 6.90 €, mit Vollmilchschokosoße: 8.90 €, mit weißer Schokosoße: 8.90 €',
      EN: 'Classic: 6.90 €, with milk chocolate sauce: 8.90 €, with white chocolate sauce: 8.90 €',
      TR: 'Klasik: 6.90 €, sütlü çikolata sosu ile: 8.90 €, beyaz çikolata sosu ile: 8.90 €'
    },
    price: 6.90,
    category: 'food',
    subcategory: 'Desserts',
    imageUrl: '/images/menury_originals/dessert__original_san_sebastián_cheesecake.webp'
  },
  {"""

if old_dessert in content:
    content = content.replace(old_dessert, new_dessert)
    with open(menu_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patched food_dessert_8")
else:
    print("Could not find old_dessert block")
