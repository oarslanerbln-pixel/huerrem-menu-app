import re

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Find where the HAPPY HOUR COMBOS section is and replace it up to the end of the array
start_marker = "// --- HAPPY HOUR COMBOS ---"
end_marker = "];\n\nexport const allergenLegend"

if start_marker in content and end_marker in content:
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)
    
    if start_idx != -1 and end_idx != -1:
        new_section = """// --- HAPPY HOUR COMBOS ---
  {
    id: 'hh_1',
    name: { DE: "SHISHA + SOFTDRINK", EN: "SHISHA + SOFT DRINK", TR: "NARGİLE + MEŞRUBAT", FR: "CHICHA + BOISSON", ES: "SHISHA + REFRESCO", RU: "КАЛЬЯН + НАПИТОК" },
    price: 13.90,
    description: {
      DE: "Gönnen Sie sich Ihre Lieblings-Shisha kombiniert mit einem erfrischenden Softdrink Ihrer Wahl.\\nPerfekt für eine entspannte Auszeit am Nachmittag.\\n\\nGültig: Montag-Freitag 14:00 - 19:00 Uhr", 
      EN: "Treat yourself to your favorite shisha paired with a refreshing soft drink of your choice.\\nPerfect for a relaxing afternoon break.\\n\\nValid: Monday-Friday 2:00 PM - 7:00 PM",
      TR: "Günün yorgunluğunu en sevdiğiniz nargile ve seçeceğiniz serinletici bir meşrubat ile atın.\\nKeyifli bir öğleden sonra molası için mükemmel seçim.\\n\\nGeçerlilik: Pazartesi-Cuma 14:00 - 19:00",
      FR: "Offrez-vous votre chicha préférée accompagnée d'une boisson rafraîchissante de votre choix.\\nParfait pour une pause relaxante l'après-midi.\\n\\nValable : Lundi-Vendredi 14:00 - 19:00",
      ES: "Disfruta de tu shisha favorita combinada con un refresco a tu elección.\\nPerfecto para un descanso relajante por la tarde.\\n\\nVálido: Lunes-Viernes 14:00 - 19:00",
      RU: "Побалуйте себя любимым кальяном в сочетании с освежающим напитком на ваш выбор.\\nИдеально для расслабляющего дневного отдыха.\\n\\nДействует: Понедельник-Пятница 14:00 - 19:00"
    },
    category: 'happy_hour',
    subcategory: 'Happy Hour',
    imageUrl: '',
    additives: ['13', '16', 'C'],
    isSignature: true,
    badge: { DE: "SPECIAL", EN: "SPECIAL", TR: "ÖZEL", FR: "SPÉCIAL", ES: "ESPECIAL", RU: "СПЕЦИАЛЬНЫЙ" }
  },
  {
    id: 'hh_2',
    name: { DE: "PASTA, BURGER, SALAT, BOWL'S", EN: "PASTA, BURGER, SALAD, BOWL'S", TR: "MAKARNA, BURGER, SALATA, BOWL", FR: "PÂTES, BURGER, SALADE, BOWL", ES: "PASTA, BURGER, ENSALADA, BOWL", RU: "ПАСТА, БУРГЕР, САЛАТ, БОУЛ" },
    price: 9.90,
    description: {
      DE: "Genießen Sie unsere Happy Hour und wählen Sie Ihr Lieblingsgericht aus unseren Premium-Kategorien (Pasta, Burger, Salat oder Bowl).\\nFrisch zubereitet für Ihren perfekten Feierabend.\\n\\nGültig: Montag-Freitag 16:00 - 19:00 Uhr\\n(Ausgenommen: Beef & Broccoli Penne, Beef Balance Bowl)", 
      EN: "Enjoy our Happy Hour and choose your favorite dish from our premium categories (Pasta, Burger, Salad or Bowl).\\nFreshly prepared for your perfect evening.\\n\\nValid: Monday-Friday 4:00 PM - 7:00 PM\\n(Excluded: Beef & Broccoli Penne, Beef Balance Bowl)",
      TR: "Happy Hour ayrıcalığıyla Premium kategorilerimizden (Makarna, Burger, Salata veya Bowl) dilediğiniz lezzeti seçin.\\nKusursuz bir akşamüstü için özenle hazırlandı.\\n\\nGeçerlilik: Pazartesi-Cuma 16:00 - 19:00\\n(Hariç tutulanlar: Beef & Broccoli Penne, Beef Balance Bowl)",
      FR: "Profitez de notre Happy Hour et choisissez votre plat préféré parmi nos catégories premium (Pâtes, Burger, Salade ou Bowl).\\nPréparé avec soin pour votre soirée.\\n\\nValable : Lundi-Vendredi 16:00 - 19:00\\n(Exclus : Beef & Broccoli Penne, Beef Balance Bowl)",
      ES: "Disfruta de nuestra Happy Hour y elige tu plato favorito de nuestras categorías premium (Pasta, Burger, Ensalada o Bowl).\\nPreparado al momento para tu tarde perfecta.\\n\\nVálido: Lunes-Viernes 16:00 - 19:00\\n(Excluido: Beef & Broccoli Penne, Beef Balance Bowl)",
      RU: "Наслаждайтесь нашим Happy Hour и выберите любимое блюдо из наших премиум-категорий (Паста, Бургер, Салат или Боул).\\nСвежеприготовленное для вашего идеального вечера.\\n\\nДействует: Понедельник-Пятница 16:00 - 19:00\\n(Исключения: Beef & Broccoli Penne, Beef Balance Bowl)"
    },
    category: 'happy_hour',
    subcategory: 'Happy Hour',
    imageUrl: '',
    isSignature: true,
    badge: { DE: "SPECIAL", EN: "SPECIAL", TR: "ÖZEL", FR: "SPÉCIAL", ES: "ESPECIAL", RU: "СПЕЦИАЛЬНЫЙ" }
  },
  // --- GAMES & FUN ---
  {
    id: 'game_1',
    name: { DE: "SPIELE & SPAß", EN: "GAMES & FUN", TR: "OYUNLAR VE EĞLENCE", FR: "JEUX & DÉTENTE", ES: "JUEGOS Y DIVERSIÓN", RU: "ИГРЫ И ВЕСЕЛЬЕ" },
    price: 0.00,
    description: {
      DE: "Für Ihre Unterhaltung bieten wir verschiedene Gesellschafts- und Brettspiele an.\\nMachen Sie es sich in unserer Lounge gemütlich und genießen Sie die gemeinsame Zeit mit Freunden.\\n\\nFragen Sie unser Team nach der aktuellen Spielauswahl!", 
      EN: "For your entertainment we offer various board and social games.\\nMake yourself comfortable in our lounge and enjoy quality time with friends.\\n\\nAsk our team about the current game selection!",
      TR: "Sizlerin eğlencesi için çeşitli masa ve kutu oyunları sunuyoruz.\\nLounge alanımızda rahatınıza bakın ve arkadaşlarınızla keyifli vakit geçirin.\\n\\nMevcut oyun seçeneklerimiz için ekibimize danışabilirsiniz!",
      FR: "Pour votre divertissement, nous proposons divers jeux de société.\\nInstallez-vous confortablement dans notre lounge et profitez d'un bon moment entre amis.\\n\\nDemandez à notre équipe notre sélection de jeux actuelle !",
      ES: "Para su entretenimiento ofrecemos varios juegos de mesa.\\nPóngase cómodo en nuestro lounge y disfrute del tiempo con amigos.\\n\\n¡Pregunte a nuestro equipo por la selección de juegos actual!",
      RU: "Для вашего развлечения мы предлагаем различные настольные игры.\\nРасполагайтесь поудобнее в нашем лаундже и наслаждайтесь временем с друзьями.\\n\\nСпросите нашу команду о доступных играх!"
    },
    category: 'spiele',
    subcategory: 'All',
    imageUrl: '',
    isSignature: true,
    badge: { DE: "GRATIS", EN: "FREE", TR: "ÜCRETSİZ", FR: "GRATUIT", ES: "GRATIS", RU: "БЕСПЛАТНО" }
  }
"""
        
        updated_content = content[:start_idx] + new_section + "\n" + content[end_idx:]
        
        with open('src/data/menu.ts', 'w', encoding='utf-8') as fw:
            fw.write(updated_content)
        print("Successfully updated menu.ts with professional Happy Hour and Games items.")
    else:
        print("Could not find exact boundaries.")
else:
    print("Markers not found.")
