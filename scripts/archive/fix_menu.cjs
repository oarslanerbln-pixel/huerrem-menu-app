const fs = require('fs');
let content = fs.readFileSync('src/data/menu.ts', 'utf8');

// We need to find the specific corrupted lines and remove them
const lines = content.split('\n');
let newLines = [];
let skip = false;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("price: 6.90") && lines[i+1] && lines[i+1].includes("Fruchtig-cremiger indischer Klassiker mit reifer Mango")) {
    skip = true;
  }
  
  if (skip) {
    if (lines[i].includes("tags: ['fresh', 'fruity', 'exotic']") && lines[i+1] && lines[i+1].includes("},")) {
      skip = false;
      i++; // skip the closing brace as well
      continue;
    }
    continue;
  }
  
  newLines.push(lines[i]);
}

fs.writeFileSync('src/data/menu.ts', newLines.join('\n'), 'utf8');
console.log('Fixed menu.ts');
