const fs = require('fs');

let content = fs.readFileSync('menu.ts', 'utf-8');

function updatePrice(nameEn, newPrice) {
    const regex = new RegExp('(\\{\\s*"id":\\s*"[^"]+",\\s*"name":\\s*\\{[^\\}]*"EN":\\s*"' + nameEn + '"[^\\}]*\\}[\\s\\S]*?"price":\\s*)([\\d\\.]+)', 'g');
    content = content.replace(regex, `$1${newPrice}`);
}

// 1. Update prices of existing items
updatePrice('Moloko', 4.9);
updatePrice('Cappuccino', 3.9);
updatePrice('Hot Chocolate', 4.9);
updatePrice('White Chocolate', 4.9);

// 2. Prepare new items
const newItems = `
  {
    "id": "c_espresso_doppio",
    "name": {
      "DE": "Espresso Doppio",
      "EN": "Espresso Doppio",
      "TR": "Espresso Doppio",
      "FR": "Espresso Doppio",
      "ES": "Espresso Doppio",
      "RU": "Espresso Doppio"
    },
    "price": 3.9,
    "description": {
      "DE": "Doppelter Espresso",
      "EN": "Double Espresso",
      "TR": "Duble Espresso"
    },
    "category": "drinks",
    "subcategory": "Kaffeespezialitäten"
  },
  {
    "id": "t_cay_klein",
    "name": {
      "DE": "Kleiner Türkischer Tee",
      "EN": "Small Turkish Tea",
      "TR": "Küçük Çay",
      "FR": "Petit thé turc",
      "ES": "Pequeño té turco",
      "RU": "Маленький турецкий чай"
    },
    "price": 1.9,
    "description": {
      "DE": "Klassischer türkischer Schwarztee im kleinen Glas",
      "EN": "Classic Turkish black tea in a small glass",
      "TR": "İnce belli bardakta klasik Türk çayı"
    },
    "category": "drinks",
    "subcategory": "Teespezialitäten"
  },
  {
    "id": "t_minztee",
    "name": {
      "DE": "Frischer Minztee",
      "EN": "Fresh Mint Tea",
      "TR": "Taze Nane Çayı",
      "FR": "Thé à la menthe fraîche",
      "ES": "Té de menta fresca",
      "RU": "Свежий мятный чай"
    },
    "price": 4.5,
    "description": {
      "DE": "Tee aus frischen Minzblättern",
      "EN": "Tea made from fresh mint leaves",
      "TR": "Taze nane yapraklarından çay"
    },
    "category": "drinks",
    "subcategory": "Teespezialitäten"
  },
  {
    "id": "t_ingwer",
    "name": {
      "DE": "Ingwer Tee",
      "EN": "Ginger Tea",
      "TR": "Zencefil Çayı",
      "FR": "Thé au gingembre",
      "ES": "Té de jengibre",
      "RU": "Имбирный чай"
    },
    "price": 4.5,
    "description": {
      "DE": "Wärmender Tee mit frischem Ingwer",
      "EN": "Warming tea with fresh ginger",
      "TR": "Taze zencefilli ısıtan çay"
    },
    "category": "drinks",
    "subcategory": "Teespezialitäten"
  },
  {
    "id": "t_ingwer_minze",
    "name": {
      "DE": "Ingwer Minze Tee",
      "EN": "Ginger Mint Tea",
      "TR": "Zencefilli Nane Çayı",
      "FR": "Thé gingembre-menthe",
      "ES": "Té de jengibre y menta",
      "RU": "Имбирно-мятный чай"
    },
    "price": 4.5,
    "description": {
      "DE": "Erfrischende Kombination aus Ingwer und Minze",
      "EN": "Refreshing combination of ginger and mint",
      "TR": "Zencefil ve nanenin ferahlatıcı uyumu"
    },
    "category": "drinks",
    "subcategory": "Teespezialitäten"
  },
  {
    "id": "t_huerrem",
    "name": {
      "DE": "Hürrem Tee",
      "EN": "Hürrem Tea",
      "TR": "Hürrem Çayı",
      "FR": "Thé Hürrem",
      "ES": "Té Hürrem",
      "RU": "Чай Хюррем"
    },
    "price": 5.2,
    "description": {
      "DE": "Unsere exklusive Hürrem Hausmischung",
      "EN": "Our exclusive Hürrem house blend",
      "TR": "Özel Hürrem ev yapımı harmanımız"
    },
    "category": "drinks",
    "subcategory": "Teespezialitäten"
  },
  {
    "id": "t_linden",
    "name": {
      "DE": "Lindenblüten Tee",
      "EN": "Linden Blossom Tea",
      "TR": "Ihlamur Çayı",
      "FR": "Thé de tilleul",
      "ES": "Té de tilo",
      "RU": "Липовый чай"
    },
    "price": 4.5,
    "description": {
      "DE": "Beruhigender Lindenblütentee",
      "EN": "Soothing linden blossom tea",
      "TR": "Rahatlatıcı ıhlamur çayı"
    },
    "category": "drinks",
    "subcategory": "Teespezialitäten"
  },
`;

// Insert the new items before the end of the array
content = content.replace(/\]\s*$/, newItems + '\n]');

fs.writeFileSync('menu.ts', content, 'utf-8');
console.log('Update script 3 finished');
