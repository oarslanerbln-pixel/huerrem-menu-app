const fs = require('fs');
const path = require('path');

const cardPath = path.join(__dirname, '..', 'src', 'components', 'UI', 'MenuItemCard.tsx');
let content = fs.readFileSync(cardPath, 'utf8');

// 1. Remove the incorrectly placed open wrapper
content = content.replace(
  /\s*<div className="flex-1 flex flex-col justify-center min-w-0 py-1 pr-1 relative z-10">\n\{\/\* Title & Badge Row \*\/\}/,
  '\n{/* Title & Badge Row */}'
);

// 2. Remove the incorrectly placed closing tags (there are two `</div>` that close the Title & Badge Row and our old wrapper, and one `</div>` for Price + Actions).
// Wait, the original code had:
/*
      {/* Title & Badge Row *\/}
      <div className="flex justify-between items-start gap-3 relative z-10">
        <div className="flex-1 min-w-0">
          ...
        </div>

        {/* Price + Actions *\/}
        <div className="flex flex-col items-end gap-2 shrink-0">
          ...
        </div>
      </div>
*/
// My previous script replaced `gap-3 relative z-10` with `gap-2` and inserted `<div className="flex-1...">` before it.
// And it appended `</div>` after it.
// Let's just find the exact block and replace it correctly.

content = content.replace(
  /\{\/\* Title & Badge Row \*\/\}[\s\S]*?\{\/\* Description & Allergens \*\/\}/,
  (match) => {
    // Inside this match, there are extra `</div>` tags right before ` {/* Description & Allergens */}`.
    // The match ends with `        </div>\n        </div>\n      </div>\n\n      {/* Description & Allergens */}`
    // I want to remove the extra `</div>` and add the `flex-1 flex flex-col` at the very beginning.
    
    // First, let's remove the extra `</div>` at the end of the match.
    // The original structure of Title & Badge Row ended with one `</div>`. My script added two more or something.
    let cleanedMatch = match.replace(/<\/div>\s*<\/div>\s*<\/div>\s*\{\/\* Description/, '</div>\n\n      {/* Description');
    
    // Now wrap the entire right-side content starting from Title & Badge row
    return `<div className="flex-1 flex flex-col min-w-0 py-1 pr-1 relative z-10">\n      ` + cleanedMatch;
  }
);

// We need to close the `<div className="flex-1 flex flex-col ...">` after Kombi Includes.
content = content.replace(
  /\{\/\* Kombi includes \*\/\}[\s\S]*?<\/div>\s*\)\}\s*<\/motion\.article>/,
  (match) => {
    return match.replace(/<\/motion\.article>/, '  </div>\n    </motion.article>');
  }
);

// Since Description & Allergens block has a width of 92%, let's change it to w-full so it fits in the column
content = content.replace(
  /className=\{`relative z-10 \$\{isSignature \? 'w-\[95%\] mt-3' : 'w-\[92%\] mt-1\.5'\}`\}/g,
  'className={`relative z-10 w-full mt-1.5`}'
);

// Description text was truncated because of `leading-relaxed tracking-wide`.
// In a compact list view, we should limit the lines to 2.
content = content.replace(
  /<p className=\{`leading-relaxed tracking-wide \$\{[\s\S]*?\}\`\}>\s*\{itemDesc\}\s*<\/p>/m,
  '<p className={`font-body font-medium text-xs text-text-secondary leading-snug line-clamp-2 mt-1`}>{itemDesc}</p>'
);

fs.writeFileSync(cardPath, content, 'utf8');
console.log('Fixed MenuItemCard layout overlay issue.');
