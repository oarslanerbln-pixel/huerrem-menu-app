const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'components', 'Layout', 'FilterBar.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  /'theme-text font-medium'/g,
  "'theme-text font-bold'"
);

content = content.replace(
  /'theme-text-muted hover:theme-text font-normal'/g,
  "'theme-text-muted hover:theme-text font-medium text-opacity-90'"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('FilterBar text updated.');
