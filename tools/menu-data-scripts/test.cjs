const fs = require('fs');
const content = fs.readFileSync('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', 'utf-8');
const cats = content.match(/"category": "(.*?)"/g) || [];
const subcats = content.match(/"subcategory": "(.*?)"/g) || [];
console.log('Categories:', [...new Set(cats)]);
console.log('Subcategories:', [...new Set(subcats)]);

