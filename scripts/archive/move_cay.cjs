const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, '../src/data/menu.ts');
let content = fs.readFileSync(menuPath, 'utf8');

const cayRegex = /\s*\{\s*id:\s*'d_tea_cay'[\s\S]*?\},/;
const cayMatch = content.match(cayRegex);
if (cayMatch) {
  const cayBlock = cayMatch[0];
  content = content.replace(cayBlock, ''); 
  
  // Find first Teespezialitäten
  const firstTeaRegex = /(\s*\{\s*id:\s*'[^']+',[\s\S]*?subcategory:\s*'Teespezialitäten'[\s\S]*?\})/;
  const firstTeaMatch = content.match(firstTeaRegex);
  if (firstTeaMatch) {
    const idx = firstTeaMatch.index;
    content = content.substring(0, idx) + cayBlock + content.substring(idx);
    console.log("Moved Türkischer Cay Groß to top of Teespezialitäten");
  } else {
    console.warn("Could not find Teespezialitäten to insert before.");
  }
} else {
  // Maybe it's already there but the ID was lost?
  // Let's check if it exists
  if (content.includes("'d_tea_cay'")) {
    console.log("Cay exists but regex failed");
  } else {
    console.log("Cay is missing from file!");
  }
}

fs.writeFileSync(menuPath, content, 'utf8');
