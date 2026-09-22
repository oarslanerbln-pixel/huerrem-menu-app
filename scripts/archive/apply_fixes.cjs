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

// 1. Remove Mango Lassi
menuData = menuData.filter(item => {
  if (item.name && item.name['DE'] && item.name['DE'].includes('Mango Lassi')) return false;
  return true;
});

// 2. Obstteller to 19.90, Pommes to 4.90, 53 image to ""
for (let item of menuData) {
  if (item.name && item.name['DE'] && item.name['DE'].includes('Obstteller')) {
    item.price = 19.90;
  }
  if (item.name && item.name['DE'] && item.name['DE'].toLowerCase().includes('fries')) {
    item.price = 4.90;
  }
  if (item.id === 'd_fh_2') { // 53
    item.imageUrl = ""; // Just to be sure
  }
}

const newMenuDataStr = JSON.stringify(menuData, null, 2);
const newFileContent = fileContent.substring(0, startIndex) + newMenuDataStr + fileContent.substring(endIndex);

fs.writeFileSync('src/data/menu.ts', newFileContent, 'utf-8');
console.log("Successfully applied data fixes");
