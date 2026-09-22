const fs = require('fs');
let content = fs.readFileSync('menu.ts', 'utf-8');

// 1. Remove Virgin Mojito
// Find the block for Virgin Mojito and remove it.
content = content.replace(/\{\s*"id":\s*"[^"]+",\s*"name":\s*\{\s*"DE":\s*"Virgin Mojito"[^}]+},\s*"price":\s*6\.9,[\s\S]*?(?=\},\s*\{)\},\s*/g, '');
// Handle case if it's at the end or formatted differently (it might not have DE as first, but in my dump it's there).
// Let's use a safer replace function:
function replaceItem(nameEn, newContent) {
    const regex = new RegExp('\\{\\s*"id":\\s*"[^"]+",\\s*"name":\\s*\\{[^\\}]*"EN":\\s*"' + nameEn + '"[^\\}]*\\}[\\s\\S]*?(?:(?=\\},\\s*\\{\\s*"id")|(?=\\}\\]))\\}?,?\\s*', 'g');
    content = content.replace(regex, newContent);
}

replaceItem('Virgin Mojito', '');
replaceItem('Passion Fruit Cooler', '');

// 2. Add new items in place
const butterflyPeaTea = `{
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

const beautifulDream = `{
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

// Let's just insert these before Another One Wood Smoke, or at the end of the array.
// To be safe, let's insert them right after the last Cocktail.

// 3. Separate High Class and Signature, and update prices for High class.
function updateCocktail(nameEn, newSubcategory, newPrice) {
    const regex = new RegExp('(\\{\\s*"id":\\s*"[^"]+",\\s*"name":\\s*\\{[^\\}]*"EN":\\s*"' + nameEn + '"[^\\}]*\\}[\\s\\S]*?(?:(?=\\},\\s*\\{\\s*"id")|(?=\\}\\]))\\}?)', 'g');
    content = content.replace(regex, (match) => {
        let updated = match;
        if (newSubcategory) {
            updated = updated.replace(/"subcategory":\s*"Cocktails"/g, '"subcategory": "' + newSubcategory + '"');
        }
        if (newPrice) {
            updated = updated.replace(/"price":\s*[\d\.]+/g, '"price": ' + newPrice);
        }
        return updated;
    });
}

// High Class (Set to 10.90)
updateCocktail('Another One Wood Smoke', 'High Class Cocktails', 10.9);
updateCocktail('Cloud Seven Balloon Glass', 'High Class Cocktails', 10.9);
updateCocktail('Funky Passion Bubble Tea', 'High Class Cocktails', 10.9);
updateCocktail('Violet Wood Smoke', 'High Class Cocktails', 10.9);

// Signature (Keep prices)
updateCocktail('Blue Lychee Mosquito', 'Signature Cocktails', null);
updateCocktail('Coconut Kiss', 'Signature Cocktails', null);
updateCocktail('Dragonfruit Sunset', 'Signature Cocktails', null);
updateCocktail('Fancy Love', 'Signature Cocktails', null);
updateCocktail('Mosquito', 'Signature Cocktails', null);
updateCocktail('Solero', 'Signature Cocktails', null);

// 4. Add Iced Americano and Iced Matcha to Sommer-Specials
const icedAmericano = `{
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

const icedMatcha = `{
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
  },
  `;

// Let's insert the new items right before the closing bracket of menuData array.
// The array ends with `]`
content = content.replace(/\]\s*$/, butterflyPeaTea + beautifulDream + icedAmericano + icedMatcha + '\n]');

fs.writeFileSync('menu.ts', content, 'utf-8');
console.log('Update script finished');
