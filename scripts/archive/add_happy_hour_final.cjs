const fs = require('fs');
let content = fs.readFileSync('src/data/menu.ts', 'utf8');

const happyHourItem = `  },
  {
    id: 'hh_angebot_1',
    name: { DE: 'Happy Hour Angebote', EN: 'Happy Hour Offers', TR: 'Happy Hour Fırsatları' },
    price: 0,
    description: { DE: 'Täglich wechselnde Angebote - frage unser Personal!', EN: 'Daily changing offers - ask our staff!', TR: 'Günlük değişen fırsatlar - personelimize sorunuz!' },
    imageUrl: '',
    category: 'happy_hour',
    subcategory: 'Happy Hour'
  }
];`;

content = content.replace(/^\];/m, happyHourItem);
fs.writeFileSync('src/data/menu.ts', content);
console.log('Successfully injected happy hour');
