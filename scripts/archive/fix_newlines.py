import re

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace any newlines inside "" strings with \n
# It's easier to just do it via specific string replacement for the broken parts
broken1 = """      DE: "Shisha + Softdrink Nachwahl
Montag-Freitag 14:00 - 19:00 Uhr", 
      EN: "Shisha + Soft drink of choice
Monday-Friday 2:00 PM - 7:00 PM",
      TR: "Nargile + Seçmeli Meşrubat
Pazartesi-Cuma 14:00 - 19:00",
      FR: "Chicha + Boisson au choix
Lundi-Vendredi 14:00 - 19:00",
      ES: "Shisha + Refresco a elección
Lunes-Viernes 14:00 - 19:00",
      RU: "Кальян + Напиток на выбор
Понедельник-Пятница 14:00 - 19:00"
    },"""

fixed1 = """      DE: `Shisha + Softdrink Nachwahl\\nMontag-Freitag 14:00 - 19:00 Uhr`, 
      EN: `Shisha + Soft drink of choice\\nMonday-Friday 2:00 PM - 7:00 PM`,
      TR: `Nargile + Seçmeli Meşrubat\\nPazartesi-Cuma 14:00 - 19:00`,
      FR: `Chicha + Boisson au choix\\nLundi-Vendredi 14:00 - 19:00`,
      ES: `Shisha + Refresco a elección\\nLunes-Viernes 14:00 - 19:00`,
      RU: `Кальян + Напиток на выбор\\nПонедельник-Пятница 14:00 - 19:00`
    },"""

broken2 = """      DE: "Montag-Freitag | 16:00-19:00 Uhr
Genieße unsere Happy Hour und wähle dein Lieblingsgericht aus den Kategorien Pasta, Burger, Salat oder Bowl.
Ausgenommen: Beef & Broccoli Penne sowie Beef Balance Bowl.", 
      EN: "Monday-Friday | 4:00 PM-7:00 PM
Enjoy our Happy Hour and choose your favorite dish from Pasta, Burger, Salad or Bowl.
Excluded: Beef & Broccoli Penne and Beef Balance Bowl.",
      TR: "Pazartesi-Cuma | 16:00-19:00
Happy Hour'ımızın tadını çıkarın ve Makarna, Burger, Salata veya Bowl arasından en sevdiğinizi seçin.
Hariç tutulanlar: Beef & Broccoli Penne ve Beef Balance Bowl.",
      FR: "Lundi-Vendredi | 16:00-19:00
Profitez de notre Happy Hour et choisissez votre plat préféré (Pâtes, Burger, Salade ou Bowl).
Exclus: Beef & Broccoli Penne et Beef Balance Bowl.",
      ES: "Lunes-Viernes | 16:00-19:00
Disfruta de nuestro Happy Hour y elige tu plato favorito (Pasta, Burger, Ensalada o Bowl).
Excluido: Beef & Broccoli Penne y Beef Balance Bowl.",
      RU: "Понедельник-Пятница | 16:00-19:00
Наслаждайтесь нашим Happy Hour и выберите любимое блюдо (Паста, Бургер, Салат или Боул).
Исключения: Beef & Broccoli Penne и Beef Balance Bowl."
    },"""

fixed2 = """      DE: `Montag-Freitag | 16:00-19:00 Uhr\\nGenieße unsere Happy Hour und wähle dein Lieblingsgericht aus den Kategorien Pasta, Burger, Salat oder Bowl.\\nAusgenommen: Beef & Broccoli Penne sowie Beef Balance Bowl.`, 
      EN: `Monday-Friday | 4:00 PM-7:00 PM\\nEnjoy our Happy Hour and choose your favorite dish from Pasta, Burger, Salad or Bowl.\\nExcluded: Beef & Broccoli Penne and Beef Balance Bowl.`,
      TR: `Pazartesi-Cuma | 16:00-19:00\\nHappy Hour'ımızın tadını çıkarın ve Makarna, Burger, Salata veya Bowl arasından en sevdiğinizi seçin.\\nHariç tutulanlar: Beef & Broccoli Penne ve Beef Balance Bowl.`,
      FR: `Lundi-Vendredi | 16:00-19:00\\nProfitez de notre Happy Hour et choisissez votre plat préféré (Pâtes, Burger, Salade ou Bowl).\\nExclus: Beef & Broccoli Penne et Beef Balance Bowl.`,
      ES: `Lunes-Viernes | 16:00-19:00\\nDisfruta de nuestro Happy Hour y elige tu plato favorito (Pasta, Burger, Ensalada o Bowl).\\nExcluido: Beef & Broccoli Penne y Beef Balance Bowl.`,
      RU: `Понедельник-Пятница | 16:00-19:00\\nНаслаждайтесь нашим Happy Hour и выберите любимое блюдо (Паста, Бургер, Салат или Боул).\\nИсключения: Beef & Broccoli Penne и Beef Balance Bowl.`
    },"""

# The file uses UTF-8 and cp1252 might mess up replacing if we just use normal replace. Let's do regex to be safe.
content = re.sub(r'description: \{\s*DE: "Shisha.*?19:00"\s*\},', fixed1, content, flags=re.DOTALL)
content = re.sub(r'description: \{\s*DE: "Montag-Freitag.*?Balance Bowl\."\s*\},', fixed2, content, flags=re.DOTALL)

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(content)

