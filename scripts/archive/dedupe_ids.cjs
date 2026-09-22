const fs = require('fs');

let content = fs.readFileSync('src/data/menu.ts', 'utf8');
const lines = content.split('\n');
let newLines = [];
let seenIds = new Set();
let skipDepth = 0;
let skipping = false;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  if (!skipping) {
    let idMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
    if (idMatch) {
      let id = idMatch[1];
      if (seenIds.has(id)) {
        skipping = true;
        skipDepth = 1;
        while (newLines.length > 0) {
          let lastLine = newLines.pop();
          if (lastLine.includes('{')) {
            break;
          }
        }
        continue;
      } else {
        seenIds.add(id);
      }
    }
  }
  
  if (skipping) {
    skipDepth += (line.match(/\{/g) || []).length;
    skipDepth -= (line.match(/\}/g) || []).length;
    if (skipDepth === 0) {
      skipping = false;
    }
    continue;
  }
  
  newLines.push(line);
}

let finalStr = newLines.join('\n');
finalStr = finalStr.replace(/\},\s*\];/g, '\n  }\n];');
fs.writeFileSync('src/data/menu.ts', finalStr, 'utf8');
console.log('Deduplicated all items!');
