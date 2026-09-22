const fs = require('fs');

const fileContent = fs.readFileSync('src/data/menu.ts', 'utf-8');

const startToken = 'export const menuData: MenuItem[] = [';
const endToken = '];\n\nexport const quizQuestions = [';
const startIndex = fileContent.indexOf(startToken) + startToken.length - 1;
const endIndex = fileContent.indexOf(endToken) + 1;

let menuDataStr = fileContent.substring(startIndex, endIndex);

let menuData;
try {
  menuData = eval('(' + menuDataStr + ')');
} catch (e) {
  console.error("Failed to eval menuData", e);
  process.exit(1);
}

let missingNames = 0;
let missingDescs = 0;

for (let item of menuData) {
  if (typeof item.name === 'object') {
    if (!item.name['FR'] || !item.name['ES'] || !item.name['RU']) {
      console.log(`Missing name languages for: ${item.id} - ${item.name['DE']}`);
      missingNames++;
    }
  }
  if (typeof item.description === 'object') {
    if (!item.description['FR'] || !item.description['ES'] || !item.description['RU']) {
      console.log(`Missing description languages for: ${item.id} - ${item.name['DE'] || item.name}`);
      missingDescs++;
    }
  } else if (typeof item.description === 'string' && item.description.trim() !== '') {
      console.log(`Description is string for: ${item.id} - ${item.description}`);
  }
}

console.log(`Total missing names: ${missingNames}`);
console.log(`Total missing descriptions: ${missingDescs}`);
