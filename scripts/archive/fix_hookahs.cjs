const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'images', 'menury_originals', 'hookahs');
const menuPath = path.join(__dirname, 'src', 'data', 'menu.ts');

const files = fs.readdirSync(targetDir);
let code = fs.readFileSync(menuPath, 'utf8');

for (const file of files) {
  if (file.endsWith('.png')) {
    const newName = file;
    // hookahs__luftschloss.png
    let baseName = file.replace('hookahs__', '').replace('.png', '');
    let searchName = baseName.replace(/_/g, ''); // luftschloss
    
    // Handle specific mappings
    if (baseName === 'hürremspecial_hookah') {
      searchName = 'hürremspezialhookah';
    }

    const regex = /name:\s*\{\s*DE:\s*'([^']+)'/g;
    let match;
    let found = false;
    while ((match = regex.exec(code)) !== null) {
      const deName = match[1];
      const normalizedDe = deName.replace(/[\s-]/g, '').toLowerCase();
      const normalizedBase = searchName.replace(/[\s-üöä]/g, (c) => {
        if (c==='ü') return 'u';
        if (c==='ö') return 'o';
        if (c==='ä') return 'a';
        return '';
      }).toLowerCase();
      
      const normalizedBase2 = searchName.replace(/[\s-]/g, '').toLowerCase();
      
      if (normalizedDe === normalizedBase || normalizedDe === normalizedBase2 || (normalizedBase === 'hurremspecialhookah' && normalizedDe === 'hürremspezialhookah'.replace(/[\s-]/g, '').toLowerCase())) {
         const itemStartIndex = code.lastIndexOf('{', match.index);
         // Find the NEXT occurrence of "category:" to safely cover imageUrl
         const categoryIndex = code.indexOf('category:', match.index);
         const itemEndIndex = categoryIndex + 20; // just after category
         
         const itemStr = code.substring(itemStartIndex, itemEndIndex);
         const updatedItem = itemStr.replace(/imageUrl:\s*'[^']*'/, `imageUrl: '/images/menury_originals/hookahs/${newName}'`);
         
         if (updatedItem !== itemStr) {
           code = code.substring(0, itemStartIndex) + updatedItem + code.substring(itemEndIndex);
           console.log(`Successfully replaced imageUrl for ${deName}`);
         } else {
           console.log(`Failed to replace imageUrl for ${deName} (regex didn't match)`);
         }
         found = true;
         break;
      }
    }
  }
}

fs.writeFileSync(menuPath, code);
console.log('Finished updating hookahs correctly.');
