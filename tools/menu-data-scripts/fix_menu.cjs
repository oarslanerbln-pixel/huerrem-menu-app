const fs = require('fs');
let content = fs.readFileSync('menu.ts', 'utf-8');
content = content.replace(/"subcategory": "High Class Cocktails"/g, '"subcategory": "High-Class Cocktails"');
fs.writeFileSync('menu.ts', content, 'utf-8');

