const fs = require('fs');
const path = require('path');

const cardPath = path.join(__dirname, '..', 'src', 'components', 'UI', 'MenuItemCard.tsx');
let content = fs.readFileSync(cardPath, 'utf8');

// Insert the missing closing div for Title & Badge Row before Description
content = content.replace(
  /(\s*)\{\/\* Description & Allergens \*\/\}/,
  '$1</div>$1{/* Description & Allergens */}'
);

fs.writeFileSync(cardPath, content, 'utf8');
console.log('Fixed missing closing tag.');
