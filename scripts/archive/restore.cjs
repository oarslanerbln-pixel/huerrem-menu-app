const fs = require('fs');

const oldContent = fs.readFileSync('old_menu.ts', 'utf8');
const newContent = fs.readFileSync('src/data/menu.ts', 'utf8');

// Find the block in old_menu.ts that contains Adana Kebab through Cheese Burger
// Adana Kebab is id: 'f5', Cheese Burger is id: 'f12'

const f5Index = oldContent.indexOf("id: 'f5'");
const f12Index = oldContent.indexOf("id: 'f12'");
const f12EndIndex = oldContent.indexOf("},", f12Index) + 2;

// The text we want to restore
const blockToRestore = oldContent.substring(oldContent.lastIndexOf("{", f5Index), f12EndIndex);

// Now we need to remove the mock items from src/data/menu.ts
// The mock items start from id: 'food_haupt_1'
const mockStartIndex = newContent.lastIndexOf(",{", newContent.indexOf("id: 'food_haupt_1'"));
const mockEndIndex = newContent.indexOf("];\n\n// Quiz Questions");

let finalContent = newContent.substring(0, mockStartIndex) + ",\n  " + blockToRestore + "\n" + newContent.substring(mockEndIndex);

fs.writeFileSync('src/data/menu.ts', finalContent, 'utf8');
console.log('Restored successfully.');
