const fs = require('fs');

const fileContent = fs.readFileSync('src/data/menu.ts', 'utf-8');
const translations = JSON.parse(fs.readFileSync('scripts/translation_map.json', 'utf-8'));

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

let modified = 0;

for (let item of menuData) {
  // Update names
  if (typeof item.name === 'object' && item.name['DE']) {
    const deText = item.name['DE'];
    if (translations[deText]) {
      if (translations[deText]['FR']) item.name['FR'] = translations[deText]['FR'];
      if (translations[deText]['ES']) item.name['ES'] = translations[deText]['ES'];
      if (translations[deText]['RU']) item.name['RU'] = translations[deText]['RU'];
      modified++;
    }
  }

  // Update descriptions
  if (typeof item.description === 'object' && item.description['DE']) {
    const deText = item.description['DE'];
    if (translations[deText]) {
      if (translations[deText]['FR']) item.description['FR'] = translations[deText]['FR'];
      if (translations[deText]['ES']) item.description['ES'] = translations[deText]['ES'];
      if (translations[deText]['RU']) item.description['RU'] = translations[deText]['RU'];
      modified++;
    }
  }
}

console.log(`Updated ${modified} fields with translations.`);

const newMenuDataStr = JSON.stringify(menuData, null, 2);
const newFileContent = fileContent.substring(0, startIndex) + newMenuDataStr + fileContent.substring(endIndex);

fs.writeFileSync('src/data/menu.ts', newFileContent, 'utf-8');
console.log("Successfully wrote translations back to menu.ts");
