const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, 'src', 'data', 'menu.ts');
const imagesDir = path.join(__dirname, 'public', 'images', 'menury_originals');

let code = fs.readFileSync(menuPath, 'utf8');
const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.webp'));

let updatedCount = 0;

for (const file of files) {
  // If already in the code, skip
  if (code.includes(file)) {
    continue;
  }
  
  // E.g. dessert__austrian_kaiserschmarrn.webp
  // or bowls_and_salate__beef_balance_bowl.webp
  let [catSlug, itemSlug] = file.replace('.webp', '').split('__');
  
  if (!itemSlug) continue;

  // We want to find the item in menu.ts
  // The name is usually similar to itemSlug but Title Cased.
  // We can try to use a regex to find the object that has a similar name.
  // E.g. name: { DE: 'Austrian Kaiserschmarrn'
  
  // Convert itemSlug to regex pattern, replacing _ with spaces/letters
  const searchName = itemSlug.split('_').join('.*?'); 
  
  // Find the object
  // We look for name: { DE: 'something matching searchName' ... }, ... imageUrl: ''
  // It's safer to just do a case-insensitive search for the name inside the DE, EN or TR field.
  const regex = new RegExp(`(name:\\s*\\{\\s*DE:\\s*['"][^'"]*?${searchName}[^'"]*?['"][\\s\\S]*?imageUrl:\\s*)['"][^'"]*['"]`, 'i');
  
  if (regex.test(code)) {
    code = code.replace(regex, `$1'/images/menury_originals/${file}'`);
    updatedCount++;
    console.log(`Updated: ${file}`);
  } else {
    // Try matching TR name or EN name if DE fails
    const regex2 = new RegExp(`(name:\\s*\\{[^}]*?['"][^'"]*?${searchName}[^'"]*?['"][^}]*?\\}[\\s\\S]*?imageUrl:\\s*)['"][^'"]*['"]`, 'i');
    if (regex2.test(code)) {
      code = code.replace(regex2, `$1'/images/menury_originals/${file}'`);
      updatedCount++;
      console.log(`Updated (fallback): ${file}`);
    } else {
      console.log(`Could not find a match for: ${file}`);
    }
  }
}

fs.writeFileSync(menuPath, code);
console.log(`Total images updated: ${updatedCount}`);
