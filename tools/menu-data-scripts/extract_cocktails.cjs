const fs = require('fs');
const content = fs.readFileSync('c:/Users/oarsl/Desktop/Is Dosyasi/huerrem-menu-concept/webapp/src/data/menu.ts', 'utf-8');
const match = content.match(/export const menuData: MenuItem\[\] = (\[[\s\S]*\]);/);
if (match) {
  // It's not standard JSON, but we can write a quick parser for name and subcategory
  const cocktails = [];
  const items = match[1].split('},');
  items.forEach(item => {
    if (item.includes('"subcategory": "Cocktails"')) {
       const nameMatch = item.match(/"EN": "(.*?)"/);
       const priceMatch = item.match(/"price": ([\d\.]+)/);
       if (nameMatch) cocktails.push(nameMatch[1] + ' (' + (priceMatch ? priceMatch[1] : '?') + ')');
    }
  });
  console.log('Cocktails:', cocktails);
}

