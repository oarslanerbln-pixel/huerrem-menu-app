const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, 'src/data/menu.ts');
let content = fs.readFileSync(menuPath, 'utf8');

// 1. Fix Happy Hour
// Find all items with subcategory: 'Happy Hour' and remove them.
// We use a regex that finds an object starting with { and ending with subcategory: 'Happy Hour' ... },
const happyHourRegex = /\{\s*id:\s*'[^']+',[\s\S]*?subcategory:\s*'Happy Hour',?\s*\},?\s*/g;
content = content.replace(happyHourRegex, '');

// Now append the true Happy Hour items just before the last bracket of the array.
// The array ends with \n];
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

// Insert them at the end of the menuItems array
content = content.replace(/\n\];/, newHappyHour + missingCocktails + '\n];');


// 2. Remove Duplicates in Cocktails
// We'll parse out the items and reconstruct, or just find duplicates by id.
// In the previous commit, duplicates were added with the SAME id, or maybe different ids?
// Let's just find and remove them. We can use a regex to match each item and keep a Set of names within the Cocktails subcategory.
let seenCocktails = new Set();
let itemsRegex = /\{\s*id:\s*'([^']+)',[\s\S]*?subcategory:\s*'([^']+)',?[\s\S]*?\n\s*\},?\s*/g;

let cleanedContent = "";
let lastIndex = 0;

let arrayStartMatch = content.match(/export const menuItems: MenuItem\[\] = \[/);
if (arrayStartMatch) {
    let arrayStart = arrayStartMatch.index + arrayStartMatch[0].length;
    cleanedContent = content.substring(0, arrayStart);
    
    let itemMatch;
    // We need a robust parser for JS objects, but since they are well-formatted, let's just do a manual scan for '{' and '}'
    
    let currentDepth = 0;
    let itemStart = -1;
    let items = [];
    
    for (let i = arrayStart; i < content.length; i++) {
        if (content[i] === '{') {
            if (currentDepth === 0) itemStart = i;
            currentDepth++;
        } else if (content[i] === '}') {
            currentDepth--;
            if (currentDepth === 0) {
                // End of an item
                let itemStr = content.substring(itemStart, i + 1);
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
    
    // Join items
    cleanedContent += '\n' + finalItems.join(',\n') + '\n];\n';
    
    fs.writeFileSync(menuPath, cleanedContent, 'utf8');
    console.log("Successfully cleaned up menu.ts");
} else {
    console.log("Could not find menuItems array start.");
}
