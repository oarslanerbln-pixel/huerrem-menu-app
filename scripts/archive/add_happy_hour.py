import sys
import codecs
sys.stdout.reconfigure(encoding='utf-8')
filepath = r'C:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\data\menu.ts'

with codecs.open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

happy_hour_items = '''
  // --- ADDED HAPPY HOUR ---
  {
    id: 'hh_1',
    name: { DE: 'SHISHA + SOFTDRINK', EN: 'SHISHA + SOFTDRINK', TR: 'NARGİLE + SOFT İÇECEK' },
    price: 13.90,
    description: { 
      DE: 'Shisha + Softdrink Nachwahl\\nMontag-Freitag 14:00 - 19:00 Uhr', 
      EN: 'Shisha + Softdrink of choice\\nMonday-Friday 14:00 - 19:00', 
      TR: 'Seçmeli Nargile + Soft İçecek\\nPazartesi-Cuma 14:00 - 19:00' 
    },
    allergens: ['12', '16', 'C'],
    category: 'happy_hour',
    subcategory: 'Happy Hour',
    imageUrl: ''
  },
  {
    id: 'hh_2',
    name: { DE: 'PASTA, BURGER, SALAT, BOWL\\'S', EN: 'PASTA, BURGER, SALAD, BOWL\\'S', TR: 'MAKARNA, BURGER, SALATA, BOWL' },
    price: 9.90,
    description: { 
      DE: 'Montag-Freitag | 16:00-19:00 Uhr\\nGenieße unsere Happy Hour und wähle dein Lieblingsgericht aus den Kategorien Pasta, Burger, Salat oder Bowl.\\nAusgenommen: Beef & Broccoli Penne sowie Beef Balance Bowl.', 
      EN: 'Monday-Friday | 16:00-19:00\\nEnjoy our Happy Hour and choose your favorite dish from the categories Pasta, Burger, Salad or Bowl.\\nExcluded: Beef & Broccoli Penne and Beef Balance Bowl.', 
      TR: 'Pazartesi-Cuma | 16:00-19:00\\nHappy Hour keyfini çıkarın ve Makarna, Burger, Salata veya Bowl kategorilerinden favori yemeğinizi seçin.\\nHariç: Beef & Broccoli Penne ve Beef Balance Bowl.' 
    },
    category: 'happy_hour',
    subcategory: 'Happy Hour',
    imageUrl: ''
  },
  // --- ADDED SPIELE ---
  {
    id: 'spiele_1',
    name: { DE: 'SPIELE & SPAß', EN: 'GAMES & FUN', TR: 'OYUN & EĞLENCE' },
    price: 0,
    description: {
      DE: 'Für Ihre Unterhaltung bieten wir verschiedene Spiele an. Fragen Sie unser Team.',
      EN: 'For your entertainment we offer various games. Ask our team.',
      TR: 'Eğlenceniz için çeşitli oyunlar sunuyoruz. Ekibimize danışın.'
    },
    category: 'spiele',
    subcategory: 'Spiele',
    imageUrl: ''
  }
'''

if "id: 'hh_1'" not in content:
    index = content.rfind('];')
    if index != -1:
        updated = content[:index] + happy_hour_items + content[index:]
        with codecs.open(filepath, 'w', encoding='utf-8') as f:
            f.write(updated)
        print('Items added successfully!')
    else:
        print('Could not find ];')
else:
    print('Items already exist!')
