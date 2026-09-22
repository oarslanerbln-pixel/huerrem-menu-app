const fs = require('fs');

const content = fs.readFileSync('src/data/menu.ts', 'utf8');
const lines = content.split('\n');
const finalLines = [];

let skipLines = false;
let openBraces = 0;
let closeBraces = 0;
let depth = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.includes("id: 'hh_kombi") || line.includes("id: 'k1'") || line.includes("id: 'k2'") || line.includes("id: 'k3'") || line.includes("id: 'k4") || line.includes("id: 'k5")) {
    // We found a kombi item!
    // Pop lines from finalLines until we hit the opening brace!
    while (finalLines.length > 0) {
      let lastLine = finalLines.pop();
      if (lastLine.includes('{')) {
        break;
      }
    }
    
    // Now we must skip lines until we hit the closing brace of this object
    skipLines = true;
    continue;
  }

  if (skipLines) {
    if (line.includes('},') || line.trim() === '}') {
      skipLines = false;
    }
    continue;
  }

  // Also strip the comment lines if they exist so it's clean
  if (line.includes('// --- HAPPY HOUR COMBOS ---') || line.includes('// --- Kombis ---')) {
    continue;
  }

  finalLines.push(line);
}

fs.writeFileSync('src/data/menu.ts', finalLines.join('\n'), 'utf8');
console.log('Removed Kombis perfectly!');
