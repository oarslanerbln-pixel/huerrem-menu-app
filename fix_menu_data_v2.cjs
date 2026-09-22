const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, 'src/data/menu.ts');
let content = fs.readFileSync(menuPath, 'utf8');

// 1. Fix Happy Hour
const happyHourRegex = /\{\s*id:\s*'[^']+',[\s\S]*?subcategory:\s*'Happy Hour',?\s*\},?\s*/g;
content = content.replace(happyHourRegex, '');

const newHappyHour = `
  {
    id: 'hh_shisha_softdrink',
    name: {
      DE: 'Shisha + Softdrink',
      EN: 'Shisha + Softdrink',
      TR: 'Nargile + Meşrubat',
    },
    description: {
      DE: 'Mo-Fr 14:00 - 19:00 Uhr',
      EN: 'Mon-Fri 14:00 - 19:00',
      TR: 'Pzt-Cum 14:00 - 19:00',
    },
    price: 13.90,
    category: 'happy_hour',
    subcategory: 'Happy Hour',
  },
  {
    id: 'hh_food',
    name: {
      DE: 'Pasta, Burger, Salat, Bowl\\'s',
      EN: 'Pasta, Burger, Salad, Bowls',
      TR: 'Makarna, Burger, Salata, Bowl',
    },
    description: {
      DE: 'Mo-Fr 16:00 - 19:00 Uhr (Außer Beef & Broccoli Penne und Beef Balance Bowl)',
      EN: 'Mon-Fri 16:00 - 19:00 (Except Beef & Broccoli Penne and Beef Balance Bowl)',
      TR: 'Pzt-Cum 16:00 - 19:00 (Beef & Broccoli Penne ve Beef Balance Bowl hariç)',
    },
    price: 9.90,
    category: 'happy_hour',
    subcategory: 'Happy Hour',
  },
`;

const missingCocktails = `
  {
    id: 'c_butterfly_pea',
    name: { DE: 'Butterfly Pea Flower Tea', EN: 'Butterfly Pea Flower Tea', TR: 'Butterfly Pea Flower Tea' },
    price: 8.90,
    category: 'drinks',
    subcategory: 'Cocktails',
    badge: 'Signature',
  },
  {
    id: 'c_beautiful_dream',
    name: { DE: 'Beautiful Dream', EN: 'Beautiful Dream', TR: 'Beautiful Dream' },
    price: 9.40,
    category: 'drinks',
    subcategory: 'Cocktails',
    badge: 'Signature',
  },
  {
    id: 'c_dreamy_breeze',
    name: { DE: 'Dreamy Breeze (Bubble-Tea)', EN: 'Dreamy Breeze (Bubble-Tea)', TR: 'Dreamy Breeze (Bubble-Tea)' },
    price: 10.90,
    category: 'drinks',
    subcategory: 'Cocktails',
    badge: 'High-Class',
  },
`;

// Insert them right before export const quizQuestions
content = content.replace(/\n\];[\s\n]*export const quizQuestions/, newHappyHour + missingCocktails + '\n];\n\nexport const quizQuestions');


// 2. Remove Duplicates in Cocktails
let seenCocktails = new Set();

let cleanedContent = "";
let arrayStartMatch = content.match(/export const menuData: MenuItem\[\] = \[/);
if (arrayStartMatch) {
    let arrayStart = arrayStartMatch.index + arrayStartMatch[0].length;
    cleanedContent = content.substring(0, arrayStart);
    
    let arrayEndMatch = content.match(/\n\];[\s\n]*export const quizQuestions/);
    let arrayEnd = arrayEndMatch.index;
    
    let arrayContent = content.substring(arrayStart, arrayEnd);
    
    let currentDepth = 0;
    let itemStart = -1;
    let items = [];
    
    for (let i = 0; i < arrayContent.length; i++) {
        if (arrayContent[i] === '{') {
            if (currentDepth === 0) itemStart = i;
            currentDepth++;
        } else if (arrayContent[i] === '}') {
            currentDepth--;
            if (currentDepth === 0) {
                // End of an item
                let itemStr = arrayContent.substring(itemStart, i + 1);
                items.push(itemStr);
            }
        }
    }
    
    // Now filter items
    let finalItems = [];
    for (let item of items) {
        let isCocktail = item.includes("subcategory: 'Cocktails'");
        if (isCocktail) {
            let nameMatch = item.match(/DE:\s*'([^']+)'/);
            if (nameMatch) {
                let name = nameMatch[1];
                if (seenCocktails.has(name)) {
                    // Skip duplicate
                    continue;
                }
                seenCocktails.add(name);
            }
        }
        finalItems.push(item);
    }
    
    cleanedContent += '\n' + finalItems.join(',\n') + content.substring(arrayEnd);
    
    fs.writeFileSync(menuPath, cleanedContent, 'utf8');
    console.log("Successfully cleaned up menu.ts");
} else {
    console.log("Could not find menuData array start.");
}
