const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, '../src/data/menu.ts');
let content = fs.readFileSync(menuPath, 'utf8');

// Normalize newlines for robust matching
content = content.replace(/\r\n/g, '\n');

// 2. Add MenuItemVariation
const oldInterface = `export interface MenuItem {
  id: string;
  name: string | Record<string, string>;
  price: number;
  description: string | Record<string, string>;
  category: MenuCategory;
  subcategory?: string;
  isSignature?: boolean;
  imageUrl?: string;`;

const newInterface = `export interface MenuItemVariation {
  label: string | Record<string, string>;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string | Record<string, string>;
  price: number;
  description: string | Record<string, string>;
  category: MenuCategory;
  subcategory?: string;
  isSignature?: boolean;
  imageUrl?: string;
  variations?: MenuItemVariation[];`;
content = content.replace(oldInterface, newInterface);

// 3. Rename categories
content = content.replace(/subcategory:\s*'High Class Cocktails'/g, "subcategory: 'Cocktails'");
content = content.replace(/subcategory:\s*'Signature Cocktails'/g, "subcategory: 'Cocktails'");
content = content.replace(/subcategory:\s*'Kräuter und Blütentees'/g, "subcategory: 'Teespezialitäten'");
content = content.replace(/subcategory:\s*'Traditionell'/g, "subcategory: 'Teespezialitäten'");
content = content.replace(/subcategory:\s*'Exklusiv & Aromatisch'/g, "subcategory: 'Teespezialitäten'");
content = content.replace(/subcategory:\s*'Teas'/g, "subcategory: 'Teespezialitäten'");

// 4. Update RedBull and 28 Black Category to 'Energydrink'
content = content.replace(
  "id: 'd11',\n    name: { DE: 'RedBull', EN: 'RedBull', TR: 'RedBull' },\n    price: 4.90,\n    description: { DE: 'Klassischer Energy-Drink.', EN: 'Classic energy drink.', TR: 'Klasik enerji içeceği.' },\n    imageUrl: '/images/menury_originals/softdrinks__redbull.webp',\n    category: 'drinks',\n    subcategory: 'Softdrinks',",
  "id: 'd11',\n    name: { DE: 'RedBull', EN: 'RedBull', TR: 'RedBull' },\n    price: 4.90,\n    description: { DE: 'Klassischer Energy-Drink.', EN: 'Classic energy drink.', TR: 'Klasik enerji içeceği.' },\n    imageUrl: '/images/menury_originals/softdrinks__redbull.webp',\n    category: 'drinks',\n    subcategory: 'Energydrink',"
);

content = content.replace(
  "id: 'd12',\n    name: { DE: '28 Black (Schwarze Dose)', EN: '28 Black', TR: '28 Black' },\n    price: 4.90,\n    description: { DE: 'Premium Energy-Drink.', EN: 'Premium energy drink.', TR: 'Premium enerji içeceği.' },\n    imageUrl: '/images/menury_originals/softdrinks__28_black_schwarze_dose.webp',\n    category: 'drinks',\n    subcategory: 'Softdrinks',",
  "id: 'd12',\n    name: { DE: '28 Black (Schwarze Dose)', EN: '28 Black', TR: '28 Black' },\n    price: 4.90,\n    description: { DE: 'Premium Energy-Drink.', EN: 'Premium energy drink.', TR: 'Premium enerji içeceği.' },\n    imageUrl: '/images/menury_originals/softdrinks__28_black_schwarze_dose.webp',\n    category: 'drinks',\n    subcategory: 'Energydrink',"
);

// 5. Update Water (Mineralwasser and Stilles Wasser)
const waterOld = `  {
    id: 'd13',
    name: { DE: 'Mineralwasser', EN: 'Mineral Water', TR: 'Maden Suyu' },
    price: 3.20,
    description: { DE: '0,2l (3.20 €) | 0,7l (8.20 €)', EN: '0.2l (3.20 €) | 0.7l (8.20 €)', TR: '0,2l (3.20 €) | 0,7l (8.20 €)' },
    imageUrl: '/images/menury_originals/softdrinks__mineralwasser.webp',
    category: 'drinks',
    subcategory: 'Softdrinks',
  },
  {
    id: 'd15',
    name: { DE: 'Stilles Wasser', EN: 'Still Water', TR: 'Su' },
    price: 3.20,
    description: { DE: '0,2l (3.20 €) | 0,7l (8.20 €)', EN: '0.2l (3.20 €) | 0.7l (8.20 €)', TR: '0,2l (3.20 €) | 0,7l (8.20 €)' },
    imageUrl: '/images/menury_originals/softdrinks__stilles_wasser.webp',
    category: 'drinks',
    subcategory: 'Softdrinks',
  },`;

const waterNew = `  {
    id: 'd13',
    name: { DE: 'Mineralwasser / Stilles Wasser', EN: 'Mineral / Still Water', TR: 'Maden Suyu / Su' },
    price: 3.20,
    description: { DE: '', EN: '', TR: '' },
    variations: [
      { label: { DE: '0,2l', EN: '0.2l', TR: '0,2l' }, price: 3.20 },
      { label: { DE: '0,7l', EN: '0.7l', TR: '0,7l' }, price: 8.20 }
    ],
    imageUrl: '/images/menury_originals/softdrinks__mineralwasser.webp',
    category: 'drinks',
    subcategory: 'Softdrinks',
  },`;

content = content.replace(waterOld, waterNew);

// 6. ADD MISSING ITEMS
const new_items = `
  // --- ADDED FINGER FOOD ---
  {
    id: 'f_ff_1',
    name: { DE: 'Classic Fries', EN: 'Classic Fries', TR: 'Klasik Patates' },
    price: 4.90,
    description: { DE: 'Knusprige klassische Pommes Frites.', EN: 'Crispy classic french fries.', TR: 'Çıtır klasik patates kızartması.' },
    imageUrl: '/images/menury_originals/finger_food__classic_fries.webp',
    category: 'food',
    subcategory: 'Finger Food'
  },
  {
    id: 'f_ff_2',
    name: { DE: 'Curly Fries', EN: 'Curly Fries', TR: 'Kıvırcık Patates' },
    price: 5.50,
    description: { DE: 'Würzige Curly Fries.', EN: 'Spicy curly fries.', TR: 'Baharatlı kıvırcık patates.' },
    imageUrl: '/images/menury_originals/finger_food__curly_fries.webp',
    category: 'food',
    subcategory: 'Finger Food'
  },
  {
    id: 'f_ff_3',
    name: { DE: 'Sweet Potato Fries', EN: 'Sweet Potato Fries', TR: 'Tatlı Patates' },
    price: 6.50,
    description: { DE: 'Knusprige Süßkartoffelpommes.', EN: 'Crispy sweet potato fries.', TR: 'Çıtır tatlı patates kızartması.' },
    imageUrl: '/images/menury_originals/finger_food__sweet_potato_fries.webp',
    category: 'food',
    subcategory: 'Finger Food'
  },
  {
    id: 'f_ff_4',
    name: { DE: 'Crunchy Finger Food Platter', EN: 'Crunchy Finger Food Platter', TR: 'Çıtır Karışık Tabak' },
    price: 14.90,
    description: { DE: 'Eine bunte Mischung aus knusprigen Snacks.', EN: 'A colorful mix of crispy snacks.', TR: 'Çıtır atıştırmalıklardan oluşan karışık tabak.' },
    imageUrl: '/images/menury_originals/finger_food__crunchy_finger_food_platter.webp',
    category: 'food',
    subcategory: 'Finger Food'
  },
  {
    id: 'f_ff_5',
    name: { DE: 'Hürrem Knabbermix', EN: 'Hürrem Snack Mix', TR: 'Hürrem Çerez Mix' },
    price: 6.90,
    description: { DE: 'Hausgemachter Knabbermix.', EN: 'Homemade snack mix.', TR: 'Ev yapımı çerez karışımı.' },
    imageUrl: '/images/menury_originals/finger_food__huerrem_knabbermix.webp',
    category: 'food',
    subcategory: 'Finger Food'
  },
  {
    id: 'f_ff_6',
    name: { DE: 'Hürrem Nuss Deluxe', EN: 'Hürrem Nut Deluxe', TR: 'Hürrem Lüks Kuruyemiş' },
    price: 8.90,
    description: { DE: 'Hochwertige Nussmischung.', EN: 'Premium nut mix.', TR: 'Lüks kuruyemiş karışımı.' },
    imageUrl: '/images/menury_originals/finger_food__huerrem_nuss_deluxe.webp',
    category: 'food',
    subcategory: 'Finger Food'
  },
  
  // --- ADDED SUPPEN ---
  {
    id: 'f_soup_1',
    name: { DE: 'Linsensuppe', EN: 'Lentil Soup', TR: 'Mercimek Çorbası' },
    price: 6.90,
    description: { DE: 'Hausgemachte traditionelle Linsensuppe.', EN: 'Homemade traditional lentil soup.', TR: 'Geleneksel ev yapımı mercimek çorbası.' },
    imageUrl: '/images/menury_originals/suppen__linsensuppe.webp',
    category: 'food',
    subcategory: 'Suppen'
  },
  {
    id: 'f_soup_2',
    name: { DE: 'Tomatensuppe', EN: 'Tomato Soup', TR: 'Domates Çorbası' },
    price: 6.50,
    description: { DE: 'Fruchtige Tomatensuppe mit Basilikum.', EN: 'Fruity tomato soup with basil.', TR: 'Fesleğenli taze domates çorbası.' },
    imageUrl: '/images/menury_originals/suppen__tomatensuppe.webp',
    category: 'food',
    subcategory: 'Suppen'
  },

  // --- ADDED VORSPEISEN ---
  {
    id: 'f_vor_1',
    name: { DE: 'Acili Ezme', EN: 'Spicy Tomato Dip', TR: 'Acılı Ezme' },
    price: 5.90,
    description: { DE: 'Scharfer Dip aus fein gehackten Tomaten und Paprika.', EN: 'Spicy dip made from finely chopped tomatoes and peppers.', TR: 'İnce kıyılmış domates ve biberden acılı ezme.' },
    imageUrl: '/images/menury_originals/vorspeisen__acili_ezme.webp',
    category: 'food',
    subcategory: 'Vorspeisen'
  },
  {
    id: 'f_vor_2',
    name: { DE: 'Edamame', EN: 'Edamame', TR: 'Edamame' },
    price: 5.50,
    description: { DE: 'Gedämpfte Sojabohnen mit Meersalz.', EN: 'Steamed soybeans with sea salt.', TR: 'Deniz tuzu ile buharda pişmiş soya fasulyesi.' },
    imageUrl: '/images/menury_originals/vorspeisen__edamame.webp',
    category: 'food',
    subcategory: 'Vorspeisen'
  },
  {
    id: 'f_vor_3',
    name: { DE: 'Frühlingsrollen', EN: 'Spring Rolls', TR: 'Sigara Böreği / Çin Böreği' },
    price: 6.90,
    description: { DE: 'Knusprige Frühlingsrollen mit Sweet-Chili-Dip.', EN: 'Crispy spring rolls with sweet chili dip.', TR: 'Tatlı chili soslu çıtır börekler.' },
    imageUrl: '/images/menury_originals/vorspeisen__fruehlingsrollen.webp',
    category: 'food',
    subcategory: 'Vorspeisen'
  },
  {
    id: 'f_vor_4',
    name: { DE: 'Hummus', EN: 'Hummus', TR: 'Humus' },
    price: 6.50,
    description: { DE: 'Cremiges Kichererbsenpüree mit Tahini und Olivenöl.', EN: 'Creamy chickpea puree with tahini and olive oil.', TR: 'Tahin ve zeytinyağlı süzme humus.' },
    imageUrl: '/images/menury_originals/vorspeisen__hummus.webp',
    category: 'food',
    subcategory: 'Vorspeisen'
  },

  // --- ADDED HIGH CLASS COCKTAILS ---
  {
    id: 'd_hc_1',
    name: { DE: 'Another One Wood Smoke', EN: 'Another One Wood Smoke', TR: 'Another One Wood Smoke' },
    price: 12.90,
    description: { DE: 'Exklusiver Cocktail mit Rauch-Aroma.', EN: 'Exclusive cocktail with wood smoke flavor.', TR: 'Özel tütsülenmiş kokteyl.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__another_one_wood_smoke.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_hc_2',
    name: { DE: 'Cloud Seven Balloon Glass', EN: 'Cloud Seven Balloon Glass', TR: 'Cloud Seven Balloon Glass' },
    price: 13.90,
    description: { DE: 'Ein himmlischer Genuss im Ballonglas.', EN: 'A heavenly delight in a balloon glass.', TR: 'Balon bardakta eşsiz bir lezzet.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__cloud_seven_balloon_glass.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_hc_3',
    name: { DE: 'Funky Passion Bubble Tea', EN: 'Funky Passion Bubble Tea', TR: 'Funky Passion Bubble Tea' },
    price: 11.90,
    description: { DE: 'Fruchtiger Cocktail mit Tapioka-Perlen.', EN: 'Fruity cocktail with tapioca pearls.', TR: 'Tapyoka incili meyveli kokteyl.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__funky_passion_bubble_tea.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_hc_4',
    name: { DE: 'Violet Wood Smoke', EN: 'Violet Wood Smoke', TR: 'Violet Wood Smoke' },
    price: 13.50,
    description: { DE: 'Mystischer lila Cocktail mit Rauch-Effekt.', EN: 'Mystical purple cocktail with smoke effect.', TR: 'Duman efektli mistik mor kokteyl.' },
    imageUrl: '/images/menury_originals/high_class_cocktails__violet_wood_smoke.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },

  // --- ADDED SIGNATURE COCKTAILS ---
  {
    id: 'd_sig_1',
    name: { DE: 'Blue Lychee Mosquito', EN: 'Blue Lychee Mosquito', TR: 'Blue Lychee Mosquito' },
    price: 10.90,
    description: { DE: 'Erfrischender blauer Cocktail mit Litschi.', EN: 'Refreshing blue cocktail with lychee.', TR: 'Liçi aromalı ferahlatıcı mavi kokteyl.' },
    imageUrl: '/images/menury_originals/signature_cocktails__blue_lychee_mosquito.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_2',
    name: { DE: 'Coconut Kiss', EN: 'Coconut Kiss', TR: 'Coconut Kiss' },
    price: 9.90,
    description: { DE: 'Tropischer Cocktail mit Kokos und Ananas.', EN: 'Tropical cocktail with coconut and pineapple.', TR: 'Hindistan cevizi ve ananaslı tropikal kokteyl.' },
    imageUrl: '/images/menury_originals/signature_cocktails__coconut_kiss.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_3',
    name: { DE: 'Dragonfruit Sunset', EN: 'Dragonfruit Sunset', TR: 'Dragonfruit Sunset' },
    price: 11.50,
    description: { DE: 'Exotischer Cocktail mit Drachenfrucht.', EN: 'Exotic cocktail with dragon fruit.', TR: 'Ejder meyveli egzotik kokteyl.' },
    imageUrl: '/images/menury_originals/signature_cocktails__dragonfruit_sunset.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_4',
    name: { DE: 'Fancy Love', EN: 'Fancy Love', TR: 'Fancy Love' },
    price: 10.90,
    description: { DE: 'Süßer und eleganter Cocktail.', EN: 'Sweet and elegant cocktail.', TR: 'Tatlı ve şık kokteyl.' },
    imageUrl: '/images/menury_originals/signature_cocktails__fancy_love.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_5',
    name: { DE: 'Mosquito', EN: 'Mosquito', TR: 'Mosquito' },
    price: 9.90,
    description: { DE: 'Klassischer erfrischender Mosquito.', EN: 'Classic refreshing mosquito.', TR: 'Klasik ferahlatıcı mosquito.' },
    imageUrl: '/images/menury_originals/signature_cocktails__mosquito.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  },
  {
    id: 'd_sig_6',
    name: { DE: 'Solero', EN: 'Solero', TR: 'Solero' },
    price: 10.50,
    description: { DE: 'Fruchtiger Cocktail inspiriert vom klassischen Eis.', EN: 'Fruity cocktail inspired by the classic ice cream.', TR: 'Klasik dondurmadan ilham alan meyveli kokteyl.' },
    imageUrl: '/images/menury_originals/signature_cocktails__solero.webp',
    category: 'drinks',
    subcategory: 'Cocktails'
  }
`;

const insertIndex = content.indexOf('];\n\nexport const allergenLegend');
if (insertIndex !== -1) {
  content = content.substring(0, insertIndex) + ',' + new_items + '\n' + content.substring(insertIndex);
} else {
  console.warn("Could not find allergenLegend insertion point.");
}

// 7. Move Türkischer Cay
// Safe extraction using substring
const startIdx = content.indexOf("id: 'd_tea_cay',");
if (startIdx !== -1) {
  const objStart = content.lastIndexOf('{', startIdx);
  let objEnd = -1;
  let braceCount = 0;
  for (let i = objStart; i < content.length; i++) {
    if (content[i] === '{') braceCount++;
    if (content[i] === '}') braceCount--;
    if (braceCount === 0) {
      objEnd = i;
      break;
    }
  }

  if (objEnd !== -1) {
    let endCut = objEnd + 1;
    while (content[endCut] === ',' || content[endCut] === ' ' || content[endCut] === '\n') {
      endCut++;
    }
    
    // Create cayBlock (starts with a new line, ends with comma)
    const cayBlock = '\n  ' + content.substring(objStart, objEnd + 1) + ',';
    
    // Remove original block
    content = content.substring(0, objStart) + content.substring(endCut);
    
    // Now find the exact insertion point (right before the FIRST item in Teespezialitäten)
    const categoryIdx = content.indexOf("subcategory: 'Teespezialitäten'");
    if (categoryIdx !== -1) {
      // Look back for "  {\n    id:"
      const insertionPoint = content.lastIndexOf('  {\n    id:', categoryIdx);
      if (insertionPoint !== -1) {
        // Notice NO extra comma here! cayBlock already has the comma
        content = content.substring(0, insertionPoint) + cayBlock.trim() + '\n  ' + content.substring(insertionPoint);
        console.log("Moved Türkischer Cay Groß to top of Teespezialitäten");
      } else {
        console.warn("Could not find start of item for insertion.");
      }
    } else {
      console.warn("Could not find Teespezialitäten to insert before.");
    }
  }
}

fs.writeFileSync(menuPath, content, 'utf8');
console.log('Successfully applied all changes to menu.ts');
