const fs = require('fs');
let content = fs.readFileSync('menu.ts', 'utf-8');

const butterflyPeaTea = `
  {
    "id": "c_butterfly",
    "name": {
      "DE": "Butterfly Pea Flower Tea",
      "EN": "Butterfly Pea Flower Tea",
      "TR": "Butterfly Pea Flower Tea",
      "FR": "Butterfly Pea Flower Tea",
      "ES": "Butterfly Pea Flower Tea",
      "RU": "Butterfly Pea Flower Tea"
    },
    "price": 8.9,
    "description": {
      "DE": "Blauer Blütentee trifft auf fruchtiges Wildberry und süßen Honig - ein sanftes, harmonisches Geschmackserlebnis",
      "EN": "Blue blossom tea meets fruity wild berry and sweet honey - a gentle, harmonious taste experience",
      "TR": "Mavi çiçek çayı meyvemsi wildberry ve tatlı bal ile buluşuyor - yumuşak, uyumlu bir lezzet deneyimi",
      "FR": "Le thé aux fleurs bleues rencontre les fruits des bois et le miel doux - une expérience gustative douce et harmonieuse"
    },
    "category": "drinks",
    "subcategory": "Signature Cocktails"
  },
`;

const beautifulDream = `
  {
    "id": "c_beautiful_dream",
    "name": {
      "DE": "Beautiful Dream",
      "EN": "Beautiful Dream",
      "TR": "Beautiful Dream",
      "FR": "Beautiful Dream",
      "ES": "Beautiful Dream",
      "RU": "Beautiful Dream"
    },
    "price": 9.4,
    "description": {
      "DE": "Erdbeerpüree, Sahne, Kokoscreme, weiße Schokolade, Kirschsaft",
      "EN": "Strawberry puree, cream, coconut cream, white chocolate, cherry juice",
      "TR": "Çilek püresi, krema, hindistan cevizi kreması, beyaz çikolata, vişne suyu",
      "FR": "Purée de fraises, crème, crème de coco, chocolat blanc, jus de cerise"
    },
    "allergens": ["G"],
    "category": "drinks",
    "subcategory": "Signature Cocktails"
  },
`;

const icedAmericano = `
  {
    "id": "ss_iced_americano",
    "name": {
      "DE": "Iced Americano",
      "EN": "Iced Americano",
      "TR": "Iced Americano",
      "FR": "Iced Americano",
      "ES": "Iced Americano",
      "RU": "Iced Americano"
    },
    "price": 6.9,
    "description": {
      "DE": "Klassischer eisgekühlter Americano",
      "EN": "Classic iced Americano",
      "TR": "Klasik buzlu Americano",
      "FR": "Americano glacé classique"
    },
    "category": "drinks",
    "subcategory": "Sommer-Specials"
  },
`;

const icedMatcha = `
  {
    "id": "ss_iced_matcha",
    "name": {
      "DE": "Iced Matcha",
      "EN": "Iced Matcha",
      "TR": "Iced Matcha",
      "FR": "Iced Matcha",
      "ES": "Iced Matcha",
      "RU": "Iced Matcha"
    },
    "price": 6.9,
    "description": {
      "DE": "Erfrischender Iced Matcha",
      "EN": "Refreshing iced Matcha",
      "TR": "Ferahlatıcı buzlu Matcha",
      "FR": "Matcha glacé rafraîchissant"
    },
    "category": "drinks",
    "subcategory": "Sommer-Specials"
  }
`;

const insertionMatch = content.indexOf('export const alchemistQuestions');
if (insertionMatch !== -1) {
    // Find the last closing bracket before alchemistQuestions
    const preText = content.substring(0, insertionMatch);
    const postText = content.substring(insertionMatch);
    const lastBracketIndex = preText.lastIndexOf('];');
    if (lastBracketIndex !== -1) {
        const updatedContent = preText.substring(0, lastBracketIndex) + 
            butterflyPeaTea + beautifulDream + icedAmericano + icedMatcha + '\\n];' + 
            preText.substring(lastBracketIndex + 2) + postText;
        fs.writeFileSync('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', updatedContent, 'utf-8');
        console.log('Successfully inserted items!');
    } else {
        console.log('Could not find ]; before alchemistQuestions');
    }
} else {
    console.log('Could not find export const alchemistQuestions');
}
