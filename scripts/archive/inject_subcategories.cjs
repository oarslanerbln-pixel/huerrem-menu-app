const fs = require('fs');

const file = 'src/i18n/translations.ts';
let content = fs.readFileSync(file, 'utf8');

const subs = {
  TR: {
    Classic: 'Klasik',
    'Premium Blends': 'Premium Karışımlar',
    'Signature Blends': 'İmza Karışımlar',
    'Sommer-Specials': 'Yaz Spesiyalleri',
    Softdrinks: 'Meşrubatlar',
    'Kaffeespezialitäten': 'Kahveler',
    'Säfte': 'Meyve Suları',
    'Homemade Iced Tea': 'Ev Yapımı Buzlu Çay',
    'Fresh Homemade': 'Taze Ev Yapımı',
    'Burger Gerichte': 'Burgerler',
    Hauptgerichte: 'Ana Yemekler',
    'Bowls & Salate': 'Kaseler & Salatalar',
    'Pasta Gerichte': 'Makarnalar',
    Desserts: 'Tatlılar',
    'Teespezialitäten': 'Çaylar',
    Smoothies: 'Smoothieler',
    'Finger Food': 'Atıştırmalıklar',
    Suppen: 'Çorbalar',
    Vorspeisen: 'Başlangıçlar',
    Cocktails: 'Kokteyller',
    'Heiße Specials': 'Sıcak Spesiyaller',
    Shakes: 'Shakeler',
    'Happy Hour': 'Happy Hour'
  },
  EN: {
    Classic: 'Classic',
    'Premium Blends': 'Premium Blends',
    'Signature Blends': 'Signature Blends',
    'Sommer-Specials': 'Summer Specials',
    Softdrinks: 'Soft Drinks',
    'Kaffeespezialitäten': 'Coffees',
    'Säfte': 'Juices',
    'Homemade Iced Tea': 'Homemade Iced Tea',
    'Fresh Homemade': 'Fresh Homemade',
    'Burger Gerichte': 'Burgers',
    Hauptgerichte: 'Main Courses',
    'Bowls & Salate': 'Bowls & Salads',
    'Pasta Gerichte': 'Pastas',
    Desserts: 'Desserts',
    'Teespezialitäten': 'Teas',
    Smoothies: 'Smoothies',
    'Finger Food': 'Finger Food',
    Suppen: 'Soups',
    Vorspeisen: 'Starters',
    Cocktails: 'Cocktails',
    'Heiße Specials': 'Hot Specials',
    Shakes: 'Shakes',
    'Happy Hour': 'Happy Hour'
  },
  DE: {
    Classic: 'Classic',
    'Premium Blends': 'Premium Blends',
    'Signature Blends': 'Signature Blends',
    'Sommer-Specials': 'Sommer-Specials',
    Softdrinks: 'Softdrinks',
    'Kaffeespezialitäten': 'Kaffeespezialitäten',
    'Säfte': 'Säfte',
    'Homemade Iced Tea': 'Homemade Iced Tea',
    'Fresh Homemade': 'Fresh Homemade',
    'Burger Gerichte': 'Burger Gerichte',
    Hauptgerichte: 'Hauptgerichte',
    'Bowls & Salate': 'Bowls & Salate',
    'Pasta Gerichte': 'Pasta Gerichte',
    Desserts: 'Desserts',
    'Teespezialitäten': 'Teespezialitäten',
    Smoothies: 'Smoothies',
    'Finger Food': 'Finger Food',
    Suppen: 'Suppen',
    Vorspeisen: 'Vorspeisen',
    Cocktails: 'Cocktails',
    'Heiße Specials': 'Heiße Specials',
    Shakes: 'Shakes',
    'Happy Hour': 'Happy Hour'
  }
};
subs.ES = subs.EN;
subs.FR = subs.EN;
subs.RU = subs.EN;

for (const lang of Object.keys(subs)) {
  const marker = `${lang}: {`;
  if (!content.includes(marker)) continue;
  
  const inject = `\n    subcategories: ${JSON.stringify(subs[lang], null, 4).replace(/\n/g, '\n    ')},`;
  content = content.replace(marker, marker + inject);
}

fs.writeFileSync(file, content, 'utf8');
console.log('Injected subcategories!');
