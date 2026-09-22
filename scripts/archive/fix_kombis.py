import re

# 1. Add kombis back to menu.ts
menu_path = r"C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts"
with open(menu_path, "r", encoding="utf-8") as f:
    menu_content = f.read()

menu_content = menu_content.replace(
    "export type MenuCategory = 'shisha' | 'drinks' | 'food' | 'happy_hour';",
    "export type MenuCategory = 'shisha' | 'drinks' | 'food' | 'happy_hour' | 'kombis';"
)

with open(menu_path, "w", encoding="utf-8") as f:
    f.write(menu_content)

# 2. Add kombis to CategoryHero.tsx
hero_path = r"C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\components\UI\CategoryHero.tsx"
with open(hero_path, "r", encoding="utf-8") as f:
    hero_content = f.read()

kombis_entry = """  happy_hour: {
    gradientClass: 'from-fuchsia-900/40 to-pink-900/40',
    icon: Flame,
    categoryKey: 'Happy Hour',
    mottoFallback: 'Enjoy our special offers',
    accentColor: '#d946ef',
    emoji: '🥂'
  },
  kombis: {
    gradientClass: 'from-emerald-900/40 to-teal-900/40',
    icon: Star,
    categoryKey: 'Kombis',
    mottoFallback: 'Perfekte Kombinationen',
    accentColor: '#10b981',
    emoji: '🍱'
  }"""

# We just replace the happy_hour entry with happy_hour + kombis
hero_content = re.sub(r"happy_hour:\s*\{[^}]+\}", kombis_entry, hero_content, flags=re.DOTALL)

with open(hero_path, "w", encoding="utf-8") as f:
    f.write(hero_content)

print("Fixed kombis everywhere!")
