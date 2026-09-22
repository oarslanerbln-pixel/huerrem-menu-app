const fs = require('fs');

const fileContent = fs.readFileSync('src/data/menu.ts', 'utf-8');

// Extract the menuData array string
const startToken = 'export const menuData: MenuItem[] = [';
const endToken = '];\n\nexport const quizQuestions = [';
const startIndex = fileContent.indexOf(startToken) + startToken.length - 1;
const endIndex = fileContent.indexOf(endToken) + 1;

let menuDataStr = fileContent.substring(startIndex, endIndex);

// We need to carefully parse it. Since it's valid JS (almost JSON but without some quotes on keys, though here keys are quoted), we can just evaluate it.
let menuData;
try {
  menuData = eval('(' + menuDataStr + ')');
} catch (e) {
  console.error("Failed to eval menuData", e);
  process.exit(1);
}

const allergenCodes = new Set(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'L', 'M', 'N', 'O', 'P', 'R']);
const additiveCodes = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19']);

let modifiedCount = 0;

for (let item of menuData) {
  let matched = false;
  let localAllergens = new Set(item.allergens || []);
  let localAdditives = new Set(item.additives || []);

  if (typeof item.name === 'object') {
    for (const lang of Object.keys(item.name)) {
      const nameStr = item.name[lang];
      // Match pattern like "Drink Name 9, A, H"
      // Looking for space followed by comma separated list of 1-2 chars
      const match = nameStr.match(/ (([A-Z0-9]{1,2})(, )?)+$/);
      if (match) {
        const fullMatch = match[0];
        const codesStr = fullMatch.trim();
        const codes = codesStr.split(',').map(c => c.trim());
        
        let allValid = true;
        for (const c of codes) {
          if (!allergenCodes.has(c) && !additiveCodes.has(c)) {
            allValid = false;
            break;
          }
        }
        
        if (allValid) {
          for (const c of codes) {
            if (allergenCodes.has(c)) localAllergens.add(c);
            if (additiveCodes.has(c)) localAdditives.add(c);
          }
          item.name[lang] = nameStr.substring(0, nameStr.length - fullMatch.length);
          matched = true;
        }
      }
    }
  }

  if (matched) {
    if (localAllergens.size > 0) item.allergens = Array.from(localAllergens).sort();
    if (localAdditives.size > 0) item.additives = Array.from(localAdditives).sort();
    modifiedCount++;
  }
}

console.log(`Modified ${modifiedCount} items.`);

const newMenuDataStr = JSON.stringify(menuData, null, 2);

// Reconstruct the file
const newFileContent = fileContent.substring(0, startIndex) + newMenuDataStr + fileContent.substring(endIndex);

fs.writeFileSync('src/data/menu.ts', newFileContent, 'utf-8');
console.log("Successfully wrote to menu.ts");
