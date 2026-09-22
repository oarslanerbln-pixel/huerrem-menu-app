const fs = require('fs');
const path = require('path');

const cardPath = path.join(__dirname, '..', 'src', 'components', 'UI', 'MenuItemCard.tsx');
let content = fs.readFileSync(cardPath, 'utf8');

// Insert the closing </div> right before <div className="card-hairline relative z-10" />
content = content.replace(
  /(\s*)\{\/\* Fine dining hairline separator \*\/\}/,
  '$1</div>$1{/* Fine dining hairline separator */}'
);

fs.writeFileSync(cardPath, content, 'utf8');
console.log('Added final closing tag.');
