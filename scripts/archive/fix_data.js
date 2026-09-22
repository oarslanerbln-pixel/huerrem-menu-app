const fs = require('fs');
let c = fs.readFileSync('src/data/menu.ts', 'utf8');
c = c.replace(/\\'Traditionell\\'/g, "'Traditionell'");
c = c.replace(/\\'Kräuter & Blütentees\\'/g, "'Kräuter & Blütentees'");
c = c.replace(/\\'Exklusiv & Aromatisch\\'/g, "'Exklusiv & Aromatisch'");
fs.writeFileSync('src/data/menu.ts', c);
