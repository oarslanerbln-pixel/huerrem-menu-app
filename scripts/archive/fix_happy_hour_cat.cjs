const fs = require('fs');
let content = fs.readFileSync('src/data/menu.ts', 'utf8');
content = content.replace("category: 'drinks',\n      subcategory: 'Happy Hour'", "category: 'happy_hour',\n      subcategory: 'Happy Hour'");
fs.writeFileSync('src/data/menu.ts', content);
