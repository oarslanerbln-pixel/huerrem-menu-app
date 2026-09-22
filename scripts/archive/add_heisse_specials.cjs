const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, 'src', 'data', 'menu.ts');
let code = fs.readFileSync(menuPath, 'utf8');

const heisseSpecials = `
  // --- Heiße Specials ---
  {
    id: 'd_hs_1',
    name: { DE: 'Chai Latte', EN: 'Chai Latte', TR: 'Chai Latte' },
    price: 4.50,
    description: { 
      DE: 'Aromatischer Gewürztee kombiniert mit Milch und einem cremigen Milchschaum - würzig und beruhigend.', 
      EN: 'Aromatic spiced tea combined with milk and creamy milk foam - spicy and soothing.', 
      TR: 'Süt ve kremsi süt köpüğü ile birleştirilmiş aromatik baharat çayı - baharatlı ve rahatlatıcı.' 
    },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'Heiße Specials'
  },
  {
    id: 'd_hs_2',
    name: { DE: 'Matcha Latte', EN: 'Matcha Latte', TR: 'Matcha Latte' },
    price: 4.90,
    description: { 
      DE: 'Feiner, japanischer Grüntee, cremig aufgeschäumt - für alle, die den besonderen Geschmack lieben.', 
      EN: 'Fine Japanese green tea, frothily whipped - for all those who love a special taste.', 
      TR: 'İnce Japon yeşil çayı, kremsi köpürtülmüş - özel bir lezzet sevenler için.' 
    },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'Heiße Specials'
  },
  {
    id: 'd_hs_3',
    name: { DE: 'White Chocolate', EN: 'White Chocolate', TR: 'White Chocolate' },
    price: 4.90,
    description: { 
      DE: 'Cremige weiße Schokolade, (Auf Wunsch mit Sahne und zerbröselten Spekulatius) - perfekt für süße Genussmomente.', 
      EN: 'Creamy white chocolate, (with cream and crumbled speculoos on request) - perfect for sweet moments of pleasure.', 
      TR: 'Kremsi beyaz çikolata, (istek üzerine krema ve ufalanmış speculoos bisküvisi ile) - tatlı keyif anları için mükemmel.' 
    },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'Heiße Specials'
  },
  {
    id: 'd_hs_4',
    name: { DE: 'Dark Chocolate', EN: 'Dark Chocolate', TR: 'Dark Chocolate' },
    price: 4.90,
    description: { 
      DE: 'Intensive dunkle Schokolade, (Auf Wunsch mit Sahne) - ein Traum für Schokoladenliebhaber.', 
      EN: 'Intensive dark chocolate, (with cream on request) - a dream for chocolate lovers.', 
      TR: 'Yoğun bitter çikolata, (istek üzerine krema ile) - çikolata severler için bir rüya.' 
    },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'Heiße Specials'
  },
  {
    id: 'd_hs_5',
    name: { DE: 'Sahlep', EN: 'Sahlep', TR: 'Sahlep' },
    price: 4.50,
    description: { 
      DE: 'Ein traditionelles, cremiges Heißgetränk mit feiner Vanillenote und einem Hauch Zimt.', 
      EN: 'A traditional, creamy hot drink with a subtle vanilla note and a hint of cinnamon.', 
      TR: 'İnce vanilya notası ve bir tutam tarçın ile geleneksel, kremsi sıcak içecek.' 
    },
    imageUrl: '',
    category: 'drinks',
    subcategory: 'Heiße Specials'
  },
`;

if (!code.includes("id: 'd_hs_1'")) {
  code = code.replace(/\];\s*export const allergenLegend/, heisseSpecials + '\n];\n\nexport const allergenLegend');
  fs.writeFileSync(menuPath, code);
  console.log('Successfully added Heiße Specials to menu.ts!');
} else {
  console.log('Heiße Specials already exist.');
}
