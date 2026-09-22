const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, 'public', 'images', 'screenshots');
const targetDir = path.join(__dirname, 'public', 'images', 'menury_originals', 'hookahs');
const menuPath = path.join(__dirname, 'src', 'data', 'menu.ts');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(screenshotsDir);
let code = fs.readFileSync(menuPath, 'utf8');

for (const file of files) {
  if (file.endsWith('.png') && !file.startsWith('Screenshot')) {
    // Determine target name
    const safeName = file.replace(/[\s-]/g, '_').toLowerCase();
    const newName = `hookahs__${safeName}`;
    const oldPath = path.join(screenshotsDir, file);
    const newPath = path.join(targetDir, newName);
    
    // Copy file
    fs.copyFileSync(oldPath, newPath);
    console.log(`Copied ${file} -> ${newName}`);

    // Update menu.ts
    // The name of the hookah in the file without extension
    const baseName = file.replace('.png', '');
    let searchName = baseName;
    
    // Handle specific mappings if names are slightly different
    if (baseName === 'hürremspecial-hookah') {
      searchName = 'Hürrem Spezial Hookah';
    }

    // Try to find the item in menu.ts
    // We look for name: { DE: 'SearchName' (case insensitive-ish)
    // Actually, let's just find all names and check if they match baseName ignoring spaces/case
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
         // Found it! Replace imageUrl
         const itemStartIndex = code.lastIndexOf('{', match.index);
         const itemEndIndex = code.indexOf('},', match.index);
         
         const itemStr = code.substring(itemStartIndex, itemEndIndex);
         const updatedItem = itemStr.replace(/imageUrl:\s*'[^']*'/, `imageUrl: '/images/menury_originals/hookahs/${newName}'`);
         
         code = code.substring(0, itemStartIndex) + updatedItem + code.substring(itemEndIndex);
         console.log(`Updated imageUrl for ${deName} to /images/menury_originals/hookahs/${newName}`);
         found = true;
         break;
      }
    }
    if (!found) {
      console.log(`WARNING: Could not find matching item for ${file} (searched for ${searchName})`);
    }
  }
}

fs.writeFileSync(menuPath, code);
console.log('Finished updating hookah images.');
