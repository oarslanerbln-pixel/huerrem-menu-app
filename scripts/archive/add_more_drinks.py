import re

new_items = """
  // --- Fresh Homemade ---
  {
    id: 'd_fh_1',
    name: { DE: 'Hibiscus Orange Limo', EN: 'Hibiscus Orange Limo', TR: 'Hibiscus Orange Limo' },
    price: 6.90,
    description: { 
      DE: 'Orangensaft mit Hibiskustee und ein Hauch von Limettensaft - fruchtig und erfrischend.', 
      EN: 'Orange juice with hibiscus tea and a hint of lime juice - fruity and refreshing.', 
      TR: 'Portakal suyu, ebegümeci çayı ve bir dokunuş misket limonu - meyvemsi ve ferahlatıcı.' 
    },
    category: 'drinks',
    subcategory: 'Fresh Homemade',
  },
  {
    id: 'd_fh_2',
    name: { DE: '53', EN: '53', TR: '53' },
    price: 6.90,
    description: { 
      DE: 'Ein exotischer Mix aus Maracujasaft, Rohrzucker, Jasmintee und frischer Minze - pure Harmonie im Glas.', 
      EN: 'An exotic mix of passion fruit juice, cane sugar, jasmine tea and fresh mint - pure harmony in a glass.', 
      TR: 'Çarkıfelek meyvesi suyu, esmer şeker, yasemin çayı ve taze nanenin egzotik karışımı - bardakta saf uyum.' 
    },
    category: 'drinks',
    subcategory: 'Fresh Homemade',
  },
  {
    id: 'd_fh_3',
    name: { DE: 'Blue Wonder', EN: 'Blue Wonder', TR: 'Blue Wonder' },
    price: 6.90,
    description: { 
      DE: 'Jasmin- und blauer Blütentee treffen auf Aloe Vera und frische Blaubeeren - ein wahrer Genuss für die Sinne.', 
      EN: 'Jasmine and blue blossom tea meet aloe vera and fresh blueberries - a real treat for the senses.', 
      TR: 'Yasemin ve mavi çiçek çayı, aloe vera ve taze yaban mersini ile buluşuyor - duyular için gerçek bir şölen.' 
    },
    category: 'drinks',
    subcategory: 'Fresh Homemade',
  },
  {
    id: 'd_fh_4',
    name: { DE: 'Softy Gold', EN: 'Softy Gold', TR: 'Softy Gold' },
    price: 6.90,
    description: { 
      DE: 'Cremige Kombination aus frischen Mangostückchen, Joghurt, Zucker und Milch - tropisch und samtig.', 
      EN: 'Creamy combination of fresh mango pieces, yogurt, sugar and milk - tropical and velvety.', 
      TR: 'Taze mango parçaları, yoğurt, şeker ve sütün kremsi kombinasyonu - tropikal ve kadifemsi.' 
    },
    category: 'drinks',
    subcategory: 'Fresh Homemade',
  },
  {
    id: 'd_fh_5',
    name: { DE: 'Aloe Vera', EN: 'Aloe Vera', TR: 'Aloe Vera' },
    price: 6.90,
    description: { 
      DE: 'Reiner Aloe-Vera-Drink für eine erfrischende und gesunde Auszeit.', 
      EN: 'Pure aloe vera drink for a refreshing and healthy break.', 
      TR: 'Ferahlatıcı ve sağlıklı bir mola için saf aloe vera içeceği.' 
    },
    category: 'drinks',
    subcategory: 'Fresh Homemade',
  },
  {
    id: 'd_fh_6',
    name: { DE: 'Berry Yakult Peach Limo', EN: 'Berry Yakult Peach Limo', TR: 'Berry Yakult Peach Limo' },
    price: 7.40,
    description: { 
      DE: 'Frische Beeren, kombiniert mit Yakult und Whitepeach - eine spritzige und fruchtige Spezialität.', 
      EN: 'Fresh berries combined with Yakult and white peach - a sparkling and fruity specialty.', 
      TR: 'Yakult ve beyaz şeftali ile birleştirilmiş taze meyveler - canlı ve meyveli bir spesiyalite.' 
    },
    category: 'drinks',
    subcategory: 'Fresh Homemade',
  },
  {
    id: 'd_fh_7',
    name: { DE: 'Pink Lover', EN: 'Pink Lover', TR: 'Pink Lover' },
    price: 7.40,
    description: { 
      DE: 'Eine bezaubernde Mischung aus Mineralwasser, frischem Zitronensaft und Drachenfruchtpüree.', 
      EN: 'An enchanting mixture of mineral water, fresh lemon juice and dragon fruit puree.', 
      TR: 'Maden suyu, taze limon suyu ve ejder meyvesi püresinin büyüleyici bir karışımı.' 
    },
    category: 'drinks',
    subcategory: 'Fresh Homemade',
  },
  {
    id: 'd_fh_8',
    name: { DE: 'Rosé', EN: 'Rosé', TR: 'Rosé' },
    price: 7.40,
    description: { 
      DE: 'Frische Beeren, Kokosnussmilch, Holunderblütensirup, Hibiskustee.', 
      EN: 'Fresh berries, coconut milk, elderflower syrup, hibiscus tea.', 
      TR: 'Taze meyveler, hindistan cevizi sütü, mürver çiçeği şurubu, ebegümeci çayı.' 
    },
    category: 'drinks',
    subcategory: 'Fresh Homemade',
  },

  // --- Smoothies ---
  {
    id: 'd_sm_1',
    name: { DE: 'Very Berry', EN: 'Very Berry', TR: 'Very Berry' },
    price: 7.90,
    description: { 
      DE: 'Erdbeeren, Himbeeren, Beerenmix, Acai-Beeren, Kokosmilch, Gurke.', 
      EN: 'Strawberries, raspberries, mixed berries, acai berries, coconut milk, cucumber.', 
      TR: 'Çilek, ahududu, karışık orman meyveleri, acai meyvesi, hindistan cevizi sütü, salatalık.' 
    },
    category: 'drinks',
    subcategory: 'Smoothies',
  },
  {
    id: 'd_sm_2',
    name: { DE: 'Green Goddess', EN: 'Green Goddess', TR: 'Green Goddess' },
    price: 7.90,
    description: { 
      DE: 'Mango, Mandelmilch, Spinat, Banane.', 
      EN: 'Mango, almond milk, spinach, banana.', 
      TR: 'Mango, badem sütü, ıspanak, muz.' 
    },
    category: 'drinks',
    subcategory: 'Smoothies',
  },
  {
    id: 'd_sm_3',
    name: { DE: 'Pink Punch', EN: 'Pink Punch', TR: 'Pink Punch' },
    price: 7.90,
    description: { 
      DE: 'Himbeere, Ananas, Kokosmilch, Banane, Mango.', 
      EN: 'Raspberry, pineapple, coconut milk, banana, mango.', 
      TR: 'Ahududu, ananas, hindistan cevizi sütü, muz, mango.' 
    },
    category: 'drinks',
    subcategory: 'Smoothies',
  },
  {
    id: 'd_sm_4',
    name: { DE: 'Orange Glow', EN: 'Orange Glow', TR: 'Orange Glow' },
    price: 7.90,
    description: { 
      DE: 'Karotten, Banane, Orangen, Mango, Maracuja.', 
      EN: 'Carrots, banana, oranges, mango, passion fruit.', 
      TR: 'Havuç, muz, portakal, mango, çarkıfelek meyvesi.' 
    },
    category: 'drinks',
    subcategory: 'Smoothies',
  },
  {
    id: 'd_sm_5',
    name: { DE: 'Pina Colada', EN: 'Pina Colada', TR: 'Pina Colada' },
    price: 7.90,
    description: { 
      DE: 'Banane, Kokoswasser, Kokosmilch, Ananas.', 
      EN: 'Banana, coconut water, coconut milk, pineapple.', 
      TR: 'Muz, hindistan cevizi suyu, hindistan cevizi sütü, ananas.' 
    },
    category: 'drinks',
    subcategory: 'Smoothies',
  },

  // --- Homemade Iced Tea (Additional) ---
  {
    id: 'd_hit_6',
    name: { DE: 'Cotton Candy', EN: 'Cotton Candy', TR: 'Cotton Candy' },
    price: 6.90,
    description: { 
      DE: 'Ein verspielter Eistee mit dem süßen Geschmack von Zuckerwatte - ein echtes Highlight.', 
      EN: 'A playful iced tea with the sweet taste of cotton candy - a real highlight.', 
      TR: 'Pamuk şekerin tatlı lezzetiyle eğlenceli bir soğuk çay - tam bir hit.' 
    },
    category: 'drinks',
    subcategory: 'Homemade Iced Tea',
  },
  {
    id: 'd_hit_7',
    name: { DE: 'Kaktus Feige', EN: 'Cactus Fig', TR: 'Kaktüs İnciri' },
    price: 6.90,
    description: { 
      DE: 'Ein exotischer Genuss mit dem einzigartigen Aroma von Kaktusfeigen.', 
      EN: 'An exotic treat with the unique aroma of cactus figs.', 
      TR: 'Kaktüs incirinin eşsiz aromasıyla egzotik bir keyif.' 
    },
    category: 'drinks',
    subcategory: 'Homemade Iced Tea',
  }
"""

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'\];\s*\n*// Quiz Questions', content)
if match:
    insert_pos = match.start()
    last_brace = content.rfind('}', 0, insert_pos)
    new_content = content[:last_brace+1] + ',' + new_items + content[last_brace+1:]
    
    with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Added new image items successfully.")
else:
    print("Could not find the insertion point.")
