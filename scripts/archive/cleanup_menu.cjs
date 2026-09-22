const fs = require('fs');

let content = fs.readFileSync('src/data/menu.ts', 'utf8');
const lines = content.split('\n');

let newLines = [];
let i = 0;
let skipItem = false;
let currentItemLines = [];

while (i < lines.length) {
  let line = lines[i];
  
  if (line.includes('  {') || (line.trim() === '{' && lines[i+1] && lines[i+1].includes('id:'))) {
    // Start of an item
    currentItemLines = [line];
    skipItem = false;
    i++;
    continue;
  }
  
  if (currentItemLines.length > 0) {
    currentItemLines.push(line);
    
    // Check for deletion conditions
    if (line.includes("id: 'd23'") || 
        line.includes("id: 'd24'") || 
        line.includes("id: 'd25'") || 
        line.includes("category: 'kombis'") || 
        line.includes("id: 'hh_kombi") ||
        line.includes("Cremige Kombination aus frischen Mangostücken, Joghurt, Zucker und Milch - tropisch und samtig.") ||
        line.includes("Cremige Kombination aus frischen Mangostückchen, Joghurt, Zucker und Milch - tropisch und samtig.")) {
      skipItem = true;
    }
    
    if (line.trim() === '},' || (line.trim() === '}' && i === lines.length - 3)) { // end of item
      if (!skipItem) {
        newLines.push(...currentItemLines);
      }
      currentItemLines = [];
    }
  } else {
    // Not inside an item, just push
    // Don't push category headers for kombis or happy hour combos
    if (!line.includes('--- HAPPY HOUR COMBOS ---') && !line.includes('--- Kombis ---')) {
      newLines.push(line);
    }
  }
  i++;
}

// Clean up any double empty lines
let finalStr = newLines.join('\n').replace(/\n\s*\n\s*\n/g, '\n\n');

// Clean up dangling commas before the array close
finalStr = finalStr.replace(/\},\n+\];/, '}\n];');

fs.writeFileSync('src/data/menu.ts', finalStr, 'utf8');
console.log('Cleaned up menu.ts thoroughly!');
