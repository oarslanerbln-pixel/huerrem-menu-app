const fs = require('fs');
let code = fs.readFileSync('src/data/menu.ts', 'utf8');

const duplicateIds = [
  'd_fh_1',   'd_fh_2',   'd_fh_3',
  'd_fh_4',   'd_fh_5',   'd_fh_6',
  'd_fh_7',   'd_fh_8',   'd_hit_6',
  'd_hit_7',  'f_ff_2',   'f_ff_3',
  'f_ff_4',   'f_ff_5',   'f_ff_6',
  'f_soup_1', 'f_soup_2', 'f_vor_1',
  'f_vor_2',  'f_vor_3',  'f_vor_4',
  'd_hc_1',   'd_hc_2',   'd_hc_3',
  'd_hc_4',   'd_sig_1',  'd_sig_2',
  'd_sig_3',  'd_sig_4',  'd_sig_5',
  'd_hs_1',   'd_hs_2',   'd_hs_3',
  'd_hs_4',   'd_hs_5'
];

for (const id of duplicateIds) {
  // Regex to match the object block.
  // It matches optionally a comment line before, then { id: '...', ... },
  const regex = new RegExp(`(?:\\s*//[^\\n]*\\n)?\\s*\\{\\s*id:\\s*'${id}'[\\s\\S]*?\\},`, 'g');
  
  const matches = [...code.matchAll(regex)];
  if (matches.length > 1) {
    console.log(`Found ${matches.length} matches for ${id}. Keeping the first, removing the rest.`);
    // Keep the first, remove the others
    for (let i = 1; i < matches.length; i++) {
      code = code.replace(matches[i][0], '');
    }
  } else if (matches.length === 1) {
    console.log(`ID ${id} is only found once.`);
  } else {
    console.log(`ID ${id} not found.`);
  }
}

// Write back
fs.writeFileSync('src/data/menu.ts', code);
console.log('Done.');
