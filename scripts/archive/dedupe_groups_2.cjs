const fs = require('fs');

const content = fs.readFileSync('src/data/menu.ts', 'utf8');
const lines = content.split('\n');
const finalLines = [];
let hasGroup = false;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  if (line.includes('id:')) {
    hasGroup = false;
  }

  if (line.includes('group: {')) {
    if (hasGroup) {
      continue;
    }
    hasGroup = true;
  }

  finalLines.push(line);
}

fs.writeFileSync('src/data/menu.ts', finalLines.join('\n'), 'utf8');
console.log('Fully deduplicated groups!');
