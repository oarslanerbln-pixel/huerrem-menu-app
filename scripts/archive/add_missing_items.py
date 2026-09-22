import re

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to remove the existing 'hh_kombi1', 'hh_kombi2', 'hh_kombi3'
# They are located near the bottom.
content = re.sub(
    r'\{\s*id:\s*[\'"`]hh_kombi1[\'"`].*?\},.*?\{\s*id:\s*[\'"`]hh_kombi2[\'"`].*?\},.*?\{\s*id:\s*[\'"`]hh_kombi3[\'"`].*?\}',
    '''{
    id: 'hh_1',
    name: { DE: "SHISHA + SOFTDRINK", EN: "SHISHA + SOFT DRINK", TR: "NARGİLE + MEŞRUBAT", FR: "CHICHA + BOISSON", ES: "SHISHA + REFRESCO", RU: "КАЛЬЯН + НАПИТОК" },
    price: 13.90,
    description: { 
      DE: "Shisha + Softdrink Nachwahl\\nMontag-Freitag 14:00 - 19:00 Uhr", 
      EN: "Shisha + Soft drink of choice\\nMonday-Friday 2:00 PM - 7:00 PM",
      TR: "Nargile + Seçmeli Meşrubat\\nPazartesi-Cuma 14:00 - 19:00",
      FR: "Chicha + Boisson au choix\\nLundi-Vendredi 14:00 - 19:00",
      ES: "Shisha + Refresco a elección\\nLunes-Viernes 14:00 - 19:00",
      RU: "Кальян + Напиток на выбор\\nПонедельник-Пятница 14:00 - 19:00"
    },
    category: 'happy_hour',
    imageUrl: '',
    additives: ['13', '16', 'C']
  },
  {
    id: 'hh_2',
    name: { DE: "PASTA, BURGER, SALAT, BOWL'S", EN: "PASTA, BURGER, SALAD, BOWL'S", TR: "MAKARNA, BURGER, SALATA, BOWL", FR: "PÂTES, BURGER, SALADE, BOWL", ES: "PASTA, BURGER, ENSALADA, BOWL", RU: "ПАСТА, БУРГЕР, САЛАТ, БОУЛ" },
    price: 9.90,
    description: { 
      DE: "Montag-Freitag | 16:00-19:00 Uhr\\nGenieße unsere Happy Hour und wähle dein Lieblingsgericht aus den Kategorien Pasta, Burger, Salat oder Bowl.\\nAusgenommen: Beef & Broccoli Penne sowie Beef Balance Bowl.", 
      EN: "Monday-Friday | 4:00 PM-7:00 PM\\nEnjoy our Happy Hour and choose your favorite dish from Pasta, Burger, Salad or Bowl.\\nExcluded: Beef & Broccoli Penne and Beef Balance Bowl.",
      TR: "Pazartesi-Cuma | 16:00-19:00\\nHappy Hour'ımızın tadını çıkarın ve Makarna, Burger, Salata veya Bowl arasından en sevdiğinizi seçin.\\nHariç tutulanlar: Beef & Broccoli Penne ve Beef Balance Bowl.",
      FR: "Lundi-Vendredi | 16:00-19:00\\nProfitez de notre Happy Hour et choisissez votre plat préféré (Pâtes, Burger, Salade ou Bowl).\\nExclus: Beef & Broccoli Penne et Beef Balance Bowl.",
      ES: "Lunes-Viernes | 16:00-19:00\\nDisfruta de nuestro Happy Hour y elige tu plato favorito (Pasta, Burger, Ensalada o Bowl).\\nExcluido: Beef & Broccoli Penne y Beef Balance Bowl.",
      RU: "Понедельник-Пятница | 16:00-19:00\\nНаслаждайтесь нашим Happy Hour и выберите любимое блюдо (Паста, Бургер, Салат или Боул).\\nИсключения: Beef & Broccoli Penne и Beef Balance Bowl."
    },
    category: 'happy_hour',
    imageUrl: ''
  },
  {
    id: 'spiele_1',
    name: { DE: "Brett- & Kartenspiele", EN: "Board & Card Games", TR: "Masa ve Kart Oyunları", FR: "Jeux de société", ES: "Juegos de mesa", RU: "Настольные игры" },
    price: 0.00,
    description: { 
      DE: "Für Ihre Unterhaltung bieten wir verschiedene Spiele an. Fragen Sie unser Team!", 
      EN: "We offer various games for your entertainment. Ask our team!",
      TR: "Eğlenceniz için çeşitli oyunlar sunuyoruz. Ekibimize sorun!",
      FR: "Nous proposons divers jeux pour votre divertissement. Demandez à notre équipe !",
      ES: "Ofrecemos varios juegos para tu entretenimiento. ¡Pregunta a nuestro equipo!",
      RU: "Для вашего развлечения мы предлагаем различные игры. Спросите у нашей команды!"
    },
    category: 'spiele',
    imageUrl: ''
  }''',
    content,
    flags=re.DOTALL
)

with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated menu.ts")
