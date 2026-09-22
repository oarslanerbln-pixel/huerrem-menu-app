import re

with open('src/i18n/translations.ts', 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    'TR': '''    hhTitle: 'Hürrem Mola Vakti',
    hhShisha: 'Pzt - Cuma: Nargile + Meşrubat',
    hhKitchen: 'Mutfak 16:00\\'dan itibaren',
    hhFoodTypes: 'BURGER, MAKARNA, SALATA & BOWL',
    hhTime1: '14:00 - 19:00',
    hhTime2: '16:00 - 19:00',''',
    'EN': '''    hhTitle: 'Your Break at Hürrem',
    hhShisha: 'Mon - Fri: Shisha + Soft Drink',
    hhKitchen: 'Kitchen from 4 PM',
    hhFoodTypes: 'BURGERS, PASTA, SALADS & BOWLS',
    hhTime1: '2 PM - 7 PM',
    hhTime2: '4 PM - 7 PM',''',
    'DE': '''    hhTitle: 'Deine Auszeit im Hürrem',
    hhShisha: 'Mo - Fr: Shisha + Softdrink',
    hhKitchen: 'Küche ab 16 Uhr',
    hhFoodTypes: 'BURGER, PASTA, SALATE & BOWLS',
    hhTime1: '14 - 19 UHR',
    hhTime2: '16 - 19 UHR',''',
    'ES': '''    hhTitle: 'Tu Descanso en Hürrem',
    hhShisha: 'Lun - Vie: Shisha + Refresco',
    hhKitchen: 'Cocina a partir de las 4 PM',
    hhFoodTypes: 'HAMBURGUESAS, PASTA, ENSALADAS Y BOWLS',
    hhTime1: '2 PM - 7 PM',
    hhTime2: '4 PM - 7 PM',''',
    'FR': '''    hhTitle: 'Votre Pause chez Hürrem',
    hhShisha: 'Lun - Ven: Chicha + Boisson Gazeuse',
    hhKitchen: 'Cuisine à partir de 16h',
    hhFoodTypes: 'BURGERS, PÂTES, SALADES & BOWLS',
    hhTime1: '14h - 19h',
    hhTime2: '16h - 19h',''',
    'RU': '''    hhTitle: 'Ваш Перерыв в Hürrem',
    hhShisha: 'Пн - Пт: Кальян + Напиток',
    hhKitchen: 'Кухня с 16:00',
    hhFoodTypes: 'БУРГЕРЫ, ПАСТА, САЛАТЫ И БОУЛЫ',
    hhTime1: '14:00 - 19:00',
    hhTime2: '16:00 - 19:00','''
}

for lang, repl in replacements.items():
    if f'{lang}: {{' in content:
        # replace existing keys if they exist
        for key in ['hhTitle', 'hhShisha', 'hhKitchen', 'hhFoodTypes', 'hhTime1', 'hhTime2']:
            content = re.sub(rf'\s*{key}:\s*[\'"].*?[\'"],\n', '\n', content, count=1)
        
        # insert new ones
        content = content.replace(f'{lang}: {{', f'{lang}: {{\n{repl}')

with open('src/i18n/translations.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done')
