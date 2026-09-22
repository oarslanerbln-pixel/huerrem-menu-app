const fs = require('fs');

let content = fs.readFileSync('src/data/menu.ts', 'utf8');
const lines = content.split('\n');
const finalLines = [];
let skipDepth = 0;
let skipping = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Are we starting to skip an object?
  if (!skipping) {
    if (line.includes("id: 'd23'") || // Mango Lassi
        line.includes("id: 'd24'") || // Virgin Mojito
        line.includes("id: 'd25'") || // Passion Fruit Cooler
        line.includes("id: 'hh_kombi") || // Kombis
        line.match(/id:\s*['"]k[1-5]/)) {
      skipping = true;
      skipDepth = 1;
      
      // We must remove the PREVIOUS line if it was the opening brace {
      while (finalLines.length > 0) {
        let lastLine = finalLines.pop();
        if (lastLine.includes('{')) {
          break;
        }
      }
      
      continue;
    }
  }

  if (skipping) {
    let openBraces = (line.match(/\{/g) || []).length;
    let closeBraces = (line.match(/\}/g) || []).length;
    
    skipDepth += openBraces;
    skipDepth -= closeBraces;
    
    if (skipDepth === 0) {
      skipping = false;
      // We just finished skipping this object. It might have a trailing comma.
      // E.g., `  },`
      // We don't push it.
    }
    continue;
  }

  // Remove comment lines that are leftover
  if (line.includes('// --- HAPPY HOUR COMBOS ---') || line.includes('// --- Kombis ---')) {
    continue;
  }

  finalLines.push(line);
}

// Fix trailing commas
let finalStr = finalLines.join('\n');
finalStr = finalStr.replace(/\},\s*\];/g, '\n  }\n];');

fs.writeFileSync('src/data/menu.ts', finalStr, 'utf8');
console.log('Successfully removed target items!');
