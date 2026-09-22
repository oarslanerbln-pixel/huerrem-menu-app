const fs = require('fs');
const path = require('path');

const cardPath = path.join(__dirname, '..', 'src', 'components', 'UI', 'MenuItemCard.tsx');
let content = fs.readFileSync(cardPath, 'utf8');

// Replace the main motion.article class
content = content.replace(
  /className=\{`relative flex flex-col gap-2 overflow-hidden cursor-pointer transition-all duration-300 group theme-card`\}/,
  'className={`relative flex flex-row items-center gap-4 p-3 overflow-hidden cursor-pointer transition-all duration-300 group theme-card min-h-[100px]`}'
);

// Replace the image container class and styles
content = content.replace(
  /className=\{`relative w-full aspect-\[4\/5\] mb-4 rounded-\[2rem\] overflow-hidden z-10 cursor-pointer group shadow-\[0_12px_40px_rgba\(0,0,0,0\.6\)\] \$\{([\s\S]*?)\}`\}/,
  'className={`relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-[1rem] overflow-hidden z-10 cursor-pointer group shadow-md ${$1}`}'
);

// Replace image properties
content = content.replace(
  /className=\{`relative w-full h-full transition-transform duration-\[900ms\] ease-out group-hover:scale-104 \$\{([\s\S]*?)scale-90([\s\S]*?)object-cover([\s\S]*?)\}`\}[\s\S]*?loading="lazy"[\s\S]*?style=\{[\s\S]*?\}\s*\/>/m,
  `className={\`relative w-full h-full transition-transform duration-[900ms] ease-out group-hover:scale-105 \${
                item.category === 'shisha'
                  ? 'object-contain object-center mix-blend-multiply scale-90'
                  : 'object-cover object-center'
              }\`} 
              loading="lazy"
            />`
);

// Wrap the Title & Badge Row and Price Row in a flex-col container
const titleAndPriceRegex = /\{\/\* Title & Badge Row \*\/\}[\s\S]*?<\/div>\s*\{\/\* Price \+ Actions \*\/\}[\s\S]*?<\/div>\s*<\/div>/;
const match = content.match(titleAndPriceRegex);
if (match) {
  const replacement = `
        <div className="flex-1 flex flex-col justify-center min-w-0 py-1 pr-1 relative z-10">
${match[0]}
        </div>`;
  content = content.replace(match[0], replacement);
}

// Adjust the inner title row to not have gap-3 if it's already tight
// (We keep the original title and price layout inside our new flex-col container)
content = content.replace(
  /className="flex justify-between items-start gap-3 relative z-10"/,
  'className="flex justify-between items-start gap-2"'
);

fs.writeFileSync(cardPath, content, 'utf8');
console.log('Successfully updated MenuItemCard to compact list view!');
