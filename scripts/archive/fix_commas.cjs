const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, 'src', 'data', 'menu.ts');
let code = fs.readFileSync(menuPath, 'utf8');

// The issue is missing commas between items in the array.
// I can fix this by replacing all "}\n\n  {" with "},\n  {"
code = code.replace(/\}\s*\{/g, '},\n  {');
code = code.replace(/\}\n\s*\{/g, '},\n  {');

fs.writeFileSync(menuPath, code);
console.log('menu.ts commas fixed!');
