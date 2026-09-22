const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, '../src/data/menu.ts');
let content = fs.readFileSync(menuPath, 'utf8');

// 1. Rename High Class Cocktails and Signature Cocktails to Cocktails
content = content.replace(/subcategory:\s*'High Class Cocktails'/g, "subcategory: 'Cocktails'");
content = content.replace(/subcategory:\s*'Signature Cocktails'/g, "subcategory: 'Cocktails'");

// 2. Rename Kräuter und Blütentees, Traditionell, Exklusiv & Aromatisch to Teespezialitäten
content = content.replace(/subcategory:\s*'Kräuter und Blütentees'/g, "subcategory: 'Teespezialitäten'");
content = content.replace(/subcategory:\s*'Traditionell'/g, "subcategory: 'Teespezialitäten'");
content = content.replace(/subcategory:\s*'Exklusiv & Aromatisch'/g, "subcategory: 'Teespezialitäten'");
content = content.replace(/subcategory:\s*'Teas'/g, "subcategory: 'Teespezialitäten'");

fs.writeFileSync(menuPath, content, 'utf8');
console.log('Successfully refactored categories');
