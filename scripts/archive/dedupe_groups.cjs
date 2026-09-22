const fs = require('fs');
let content = fs.readFileSync('src/data/menu.ts', 'utf8');

const lines = content.split('\n');
const finalLines = [];
let lastGroup = null;

for (let line of lines) {
  if (line.includes('group: {')) {
    if (lastGroup === line.trim()) {
      continue;
    }
    lastGroup = line.trim();
  } else if (line.includes('id:')) {
    lastGroup = null;
  }
  
  finalLines.push(line);
}

fs.writeFileSync('src/data/menu.ts', finalLines.join('\n'), 'utf8');
console.log('Deduplicated groups!');
