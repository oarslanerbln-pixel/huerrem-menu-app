const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  './src/App.tsx',
  './src/components/UI/SpecialEventButton.tsx',
  './src/components/Quiz/OracleQuiz.tsx',
  './src/components/UI/SearchBar.tsx',
  './src/components/UI/MixologyBuilder.tsx',
  './src/components/UI/CategoryHero.tsx'
];

filesToUpdate.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remplacements
    content = content.replace(/bg-white\/70/g, 'bg-[#FAF8F5]/80');
    content = content.replace(/bg-white\/80/g, 'bg-[#FAF8F5]/85');
    content = content.replace(/bg-white\/95/g, 'bg-[#FAF8F5]/95');
    content = content.replace(/bg-white\/60/g, 'bg-[#FAF8F5]/70');
    // Replace standalone bg-white
    content = content.replace(/bg-white(?!\/)/g, 'bg-[#FAF8F5]');

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
});
