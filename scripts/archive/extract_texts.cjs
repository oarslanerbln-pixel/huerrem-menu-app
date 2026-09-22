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

const names = [];
const descriptions = [];

for (let item of menuData) {
  if (typeof item.name === 'object' && item.name['DE']) {
    names.push(item.name['DE']);
  }
  if (typeof item.description === 'object' && item.description['DE']) {
    descriptions.push(item.description['DE']);
  }
}

fs.writeFileSync('scripts/texts_to_translate.json', JSON.stringify({ names, descriptions }, null, 2));
console.log("texts_to_translate.json generated with all texts from menu.ts.");
