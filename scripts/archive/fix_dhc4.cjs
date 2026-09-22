const fs = require('fs');
let content = fs.readFileSync('src/data/menu.ts', 'utf8');

const regex = /  \{\n    id: 'd_hc_5',[\s\S]*?subcategory: 'Cocktails'\n  \},/g;
let extracted = content.match(regex);

if (extracted) {
  content = content.replace(regex, ''); // remove it from the middle of d_hc_4
  
  // now find the END of d_hc_4.
  // d_hc_4 ends with subcategory: 'Cocktails'\n  },
  const dhc4Regex = /(id: 'd_hc_4',[\s\S]*?subcategory: 'Cocktails'\n  \},)/;
  content = content.replace(dhc4Regex, '$1\n' + extracted.join('\n'));
}

fs.writeFileSync('src/data/menu.ts', content, 'utf8');
console.log('Fixed d_hc_4');
