import re

new_coffees = """
  // --- Missing Kaffeespezialitäten & Hot Drinks ---
  {
    id: 'd_coffee_cappuccino',
    name: { DE: 'Cappuccino', EN: 'Cappuccino', TR: 'Cappuccino' },
    price: 3.80,
    description: { 
      DE: 'Ein klassischer Espresso mit viel aufgeschäumter Milch und Milchschaumkrone.', 
      EN: 'A classic espresso with plenty of frothed milk and a milk foam crown.', 
      TR: 'Bol köpüklü süt ve süt köpüğü tacı ile klasik bir espresso.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Kaffeespezialitäten',
    tags: ['creamy', 'classic']
  },
  {
    id: 'd_coffee_milchkaffee',
    name: { DE: 'Milchkaffee', EN: 'Café au Lait', TR: 'Sütlü Kahve' },
    price: 4.20,
    description: { 
      DE: 'Große Tasse Kaffee mit viel heißer Milch für einen sanften Start in den Tag.', 
      EN: 'Large cup of coffee with lots of hot milk for a gentle start to the day.', 
      TR: 'Güne yumuşak bir başlangıç için bol sıcak sütlü büyük fincan kahve.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Kaffeespezialitäten',
    tags: ['creamy', 'mild']
  },
  {
    id: 'd_coffee_icedlatte',
    name: { DE: 'Iced Latte', EN: 'Iced Latte', TR: 'Buzlu Latte' },
    price: 4.80,
    description: { 
      DE: 'Kalter Espresso mit eiskalter Milch und Eiswürfeln - die perfekte Erfrischung.', 
      EN: 'Cold espresso with ice-cold milk and ice cubes - the perfect refreshment.', 
      TR: 'Buz gibi süt ve buz küpleriyle soğuk espresso - mükemmel serinlik.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1517701550927-30cfcb64db10?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Kaffeespezialitäten',
    tags: ['cold', 'refreshing']
  },
  {
    id: 'd_coffee_icedcaramel',
    name: { DE: 'Iced Caramel Macchiato', EN: 'Iced Caramel Macchiato', TR: 'Buzlu Karamel Macchiato' },
    price: 5.20,
    description: { 
      DE: 'Iced Latte verfeinert mit Vanillesirup und einem großzügigen Karamell-Drizzle.', 
      EN: 'Iced Latte refined with vanilla syrup and a generous caramel drizzle.', 
      TR: 'Vanilya şurubu ve bol karamel sosu ile tatlandırılmış buzlu latte.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1499961024600-ad094db605d4?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Kaffeespezialitäten',
    tags: ['cold', 'sweet']
  },
  {
    id: 'd_hot_chai',
    name: { DE: 'Chai Latte', EN: 'Chai Latte', TR: 'Chai Latte' },
    price: 4.50,
    description: { 
      DE: 'Würziger indischer Schwarztee mit Gewürzen, aufgegossen mit heißer, geschäumter Milch.', 
      EN: 'Spicy Indian black tea with spices, infused with hot, frothed milk.', 
      TR: 'Sıcak köpüklü sütle demlenmiş, baharatlı Hint siyah çayı.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1576092762791-dd9e2220afa1?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Kaffeespezialitäten',
    tags: ['spicy', 'creamy', 'tea']
  },
  {
    id: 'd_hot_matcha',
    name: { DE: 'Matcha Latte', EN: 'Matcha Latte', TR: 'Matcha Latte' },
    price: 4.80,
    description: { 
      DE: 'Fein gemahlener japanischer Grüntee, cremig aufgeschlagen mit heißer Milch.', 
      EN: 'Finely ground Japanese green tea, whipped creamily with hot milk.', 
      TR: 'Sıcak sütle kremsi bir şekilde çırpılmış ince öğütülmüş Japon yeşil çayı.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1515823662415-eafdd0b3718a?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Kaffeespezialitäten',
    tags: ['bio', 'creamy']
  },
  {
    id: 'd_hot_choco',
    name: { DE: 'Heiße Schokolade', EN: 'Hot Chocolate', TR: 'Sıcak Çikolata' },
    price: 4.20,
    description: { 
      DE: 'Cremige, heiße Schokolade aus feinster Kakaobohne - ein Trost für die Seele.', 
      EN: 'Creamy hot chocolate made from the finest cocoa beans - comfort for the soul.', 
      TR: 'En kaliteli kakao çekirdeklerinden yapılmış kremsi sıcak çikolata - ruhunuzu ısıtır.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Kaffeespezialitäten',
    tags: ['sweet', 'creamy']
  },
  {
    id: 'd_hot_sahlep',
    name: { DE: 'Sahlep', EN: 'Sahlep', TR: 'Salep' },
    price: 4.50,
    description: { 
      DE: 'Traditionelles heißes, cremiges Wintergetränk aus Orchideenwurzelmehl, garniert mit Zimt.', 
      EN: 'Traditional hot, creamy winter drink made from orchid root flour, garnished with cinnamon.', 
      TR: 'Tarçınla süslenmiş, orkide kökü tozundan yapılan geleneksel sıcak ve kremsi kış içeceği.' 
    },
    imageUrl: 'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&q=80&w=600',
    category: 'drinks',
    subcategory: 'Kaffeespezialitäten',
    tags: ['traditional', 'sweet']
  }
"""

with open('src/data/menu.ts', 'r', encoding='utf-8') as f:
    content = f.read()

match = re.search(r'\];\s*\n*// Quiz Questions', content)
if match:
    insert_pos = match.start()
    last_brace = content.rfind('}', 0, insert_pos)
    new_content = content[:last_brace+1] + ',' + new_coffees + content[last_brace+1:]
    
    with open('src/data/menu.ts', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Added new coffees successfully.")
else:
    print("Could not find the insertion point.")
