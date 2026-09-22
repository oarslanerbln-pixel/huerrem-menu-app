const fs = require('fs');
let content = fs.readFileSync('src/data/menu.ts', 'utf8');

content += `

export const allergenLegend: Record<string, string> = {
  'A': 'Glutenhaltiges Getreide', 'B': 'Krebstiere', 'C': 'Eier', 'D': 'Fisch', 'E': 'Erdnüsse',
  'F': 'Sojabohnen', 'G': 'Milch', 'H': 'Schalenfrüchte', 'L': 'Sellerie', 'M': 'Senf',
  'N': 'Sesamsamen', 'O': 'Schwefeldioxid und Sulfite', 'P': 'Lupinen', 'R': 'Weichtiere'
};

export const additiveLegend: Record<string, string> = {
  '1': 'mit Farbstoff', '2': 'mit Konservierungsstoff', '3': 'mit Antioxidationsmittel',
  '4': 'mit Geschmacksverstärker', '5': 'geschwefelt', '6': 'geschwärzt', '7': 'gewachst',
  '8': 'mit Phosphat', '9': 'mit Süßungsmittel', '10': 'enthält eine Phenylalaninquelle'
};
`;

fs.writeFileSync('src/data/menu.ts', content);
console.log('Appended legends!');
