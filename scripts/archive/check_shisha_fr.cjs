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

for (let item of menuData) {
  if (item.category === 'shisha') {
    if (typeof item.name === 'object' && (!item.name['FR'] || item.name['FR'] === item.name['DE'])) {
       console.log(`Shisha name issue: ${item.id} - ${item.name['DE']} -> FR is ${item.name['FR']}`);
    }
    if (typeof item.description === 'object' && (!item.description['FR'] || item.description['FR'] === item.description['DE'])) {
       console.log(`Shisha desc issue: ${item.id} - ${item.description['DE']} -> FR is ${item.description['FR']}`);
    }
  }
}
