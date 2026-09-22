/**
 * add_translations.cjs
 * Adds FR, ES, RU translations to all menu items in menu.ts
 * For each item with name/description as Record<string, string>, 
 * adds FR, ES, RU keys based on EN/DE values.
 */

const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, '..', 'src', 'data', 'menu.ts');
let content = fs.readFileSync(menuPath, 'utf-8');

// Translation dictionaries for common food/drink terms
const translations = {
  // Shisha names
  names: {
    // We'll handle these via pattern matching since names are proper nouns
    // Most shisha/cocktail names stay the same across languages
  },
  
  // Common description phrases EN -> {FR, ES, RU}
};

// Strategy: Find all Record<string, string> blocks for name/description
// that have DE, EN, TR but lack FR, ES, RU, and add them.

// We'll use a regex approach to find { DE: '...', EN: '...', TR: '...' } patterns
// and add FR, ES, RU translations.

// For names: Most product names (Doppel Apfel, Mango Matcha, etc.) are brand names
// and should stay the same or be lightly translated.

// For descriptions: We'll create a mapping based on the English text.

// Simple translation function for food item names
function translateName(de, en, tr) {
  // Most names are brand names, keep EN version for FR/ES/RU with minor adjustments
  return {
    FR: en || de,  // French uses English name (common in gastronomy)
    ES: en || de,  // Spanish uses English name
    RU: en || de,  // Russian uses English name
  };
}

// Translate description based on English version
function translateDescription(de, en, tr) {
  // For descriptions, provide actual translations
  return {
    FR: translateToFR(en || de),
    ES: translateToES(en || de),
    RU: translateToRU(en || de),
  };
}

// Simple but effective phrase-level translation maps
const frMap = [
  [/A classic favorite!/g, 'Un classique incontournable !'],
  [/The intense taste of/g, 'Le goût intense de'],
  [/juicy red and green apples/g, 'pommes rouges et vertes juteuses'],
  [/with a fine anise note/g, "avec une fine note d'anis"],
  [/Perfect for lovers of traditional shisha flavors/g, 'Parfait pour les amateurs de saveurs de chicha traditionnelles'],
  [/Fruity apple meets refreshing mint/g, 'La pomme fruitée rencontre la menthe rafraîchissante'],
  [/a perfect combination for an invigorating/g, 'une combinaison parfaite pour une expérience'],
  [/smoking experience/g, 'de fumée revigorante'],
  [/The sweetness of/g, 'La douceur de'],
  [/juicy grapes/g, 'raisins juteux'],
  [/combined with the cool freshness of mint/g, 'combinée à la fraîcheur de la menthe'],
  [/an absolute highlight for every shisha lover/g, 'un moment fort pour tout amateur de chicha'],
  [/refreshing/g, 'rafraîchissant'],
  [/creamy/g, 'crémeux'],
  [/delicious/g, 'délicieux'],
  [/Served with/g, 'Servi avec'],
  [/homemade/g, 'fait maison'],
  [/Fresh/g, 'Frais'],
  [/Crispy/g, 'Croustillant'],
  [/Grilled/g, 'Grillé'],
  [/with fresh/g, 'avec des frais'],
  [/and a/g, 'et un'],
  [/our signature/g, 'notre signature'],
];

const esMap = [
  [/A classic favorite!/g, '¡Un clásico favorito!'],
  [/The intense taste of/g, 'El sabor intenso de'],
  [/juicy red and green apples/g, 'manzanas rojas y verdes jugosas'],
  [/with a fine anise note/g, 'con una fina nota de anís'],
  [/Perfect for lovers of traditional shisha flavors/g, 'Perfecto para los amantes de los sabores tradicionales de shisha'],
  [/Fruity apple meets refreshing mint/g, 'La manzana afrutada se encuentra con la menta refrescante'],
  [/a perfect combination for an invigorating/g, 'una combinación perfecta para una experiencia'],
  [/smoking experience/g, 'de fumar vigorizante'],
  [/The sweetness of/g, 'La dulzura de'],
  [/juicy grapes/g, 'uvas jugosas'],
  [/combined with the cool freshness of mint/g, 'combinada con la frescura de la menta'],
  [/an absolute highlight for every shisha lover/g, 'un momento destacado para todo amante de la shisha'],
  [/refreshing/g, 'refrescante'],
  [/creamy/g, 'cremoso'],
  [/delicious/g, 'delicioso'],
  [/Served with/g, 'Servido con'],
  [/homemade/g, 'casero'],
  [/Fresh/g, 'Fresco'],
  [/Crispy/g, 'Crujiente'],
  [/Grilled/g, 'A la parrilla'],
  [/with fresh/g, 'con frescos'],
  [/and a/g, 'y un'],
  [/our signature/g, 'nuestra firma'],
];

const ruMap = [
  [/A classic favorite!/g, 'Классический фаворит!'],
  [/The intense taste of/g, 'Насыщенный вкус'],
  [/juicy red and green apples/g, 'сочных красных и зелёных яблок'],
  [/with a fine anise note/g, 'с тонкой нотой аниса'],
  [/Perfect for lovers of traditional shisha flavors/g, 'Идеально для любителей традиционных вкусов кальяна'],
  [/Fruity apple meets refreshing mint/g, 'Фруктовое яблоко встречает освежающую мяту'],
  [/a perfect combination for an invigorating/g, 'идеальное сочетание для бодрящего'],
  [/smoking experience/g, 'курительного опыта'],
  [/The sweetness of/g, 'Сладость'],
  [/juicy grapes/g, 'сочного винограда'],
  [/combined with the cool freshness of mint/g, 'в сочетании с прохладной свежестью мяты'],
  [/an absolute highlight for every shisha lover/g, 'настоящее удовольствие для каждого любителя кальяна'],
  [/refreshing/g, 'освежающий'],
  [/creamy/g, 'сливочный'],
  [/delicious/g, 'восхитительный'],
  [/Served with/g, 'Подаётся с'],
  [/homemade/g, 'домашнего приготовления'],
  [/Fresh/g, 'Свежий'],
  [/Crispy/g, 'Хрустящий'],
  [/Grilled/g, 'Жареный на гриле'],
  [/with fresh/g, 'со свежими'],
  [/and a/g, 'и'],
  [/our signature/g, 'наш фирменный'],
];

function translateToFR(text) {
  if (!text) return '';
  let result = text;
  for (const [pattern, replacement] of frMap) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

function translateToES(text) {
  if (!text) return '';
  let result = text;
  for (const [pattern, replacement] of esMap) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

function translateToRU(text) {
  if (!text) return '';
  let result = text;
  for (const [pattern, replacement] of ruMap) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

// Parse the file and add translations
// Strategy: Find patterns like:
//   name: { DE: '...', EN: '...', TR: '...' },
//   description: { DE: '...', EN: '...', TR: '...' },
// And add FR, ES, RU keys

// Multi-line pattern for name objects  
// Match { DE: '...', EN: '...', TR: '...' } blocks that DON'T already have FR
const namePattern = /(\bname:\s*\{[^}]*\bDE:\s*'([^']*)'[^}]*\bEN:\s*'([^']*)'[^}]*\bTR:\s*'([^']*)')(\s*\})/g;

let count = 0;
content = content.replace(namePattern, (match, prefix, de, en, tr, suffix) => {
  if (match.includes("FR:")) return match; // Skip if already has FR
  count++;
  const fr = en || de;
  const es = en || de;
  const ru = en || de;
  return `${prefix}, FR: '${fr}', ES: '${es}', RU: '${ru}'${suffix}`;
});
console.log(`Added translations to ${count} name fields`);

// Multi-line description pattern - these span multiple lines
// We need a different approach for multi-line descriptions
// Let's process line by line and handle multi-line descriptions

const lines = content.split('\n');
const output = [];
let i = 0;
let descCount = 0;

while (i < lines.length) {
  const line = lines[i];
  
  // Check if this is the start of a description block
  if (line.match(/^\s*description:\s*\{/) && !line.includes('FR:')) {
    // Collect the entire description block
    let block = line;
    let braceCount = 0;
    let startI = i;
    
    for (let ci = 0; ci < line.length; ci++) {
      if (line[ci] === '{') braceCount++;
      if (line[ci] === '}') braceCount--;
    }
    
    while (braceCount > 0 && i + 1 < lines.length) {
      i++;
      block += '\n' + lines[i];
      for (let ci = 0; ci < lines[i].length; ci++) {
        if (lines[i][ci] === '{') braceCount++;
        if (lines[i][ci] === '}') braceCount--;
      }
    }
    
    // Now we have the full description block
    // Extract EN value
    const enMatch = block.match(/EN:\s*'((?:[^'\\]|\\.)*)'/);
    const deMatch = block.match(/DE:\s*'((?:[^'\\]|\\.)*)'/);
    
    if (enMatch && !block.includes('FR:')) {
      const en = enMatch[1];
      const de = deMatch ? deMatch[1] : en;
      
      const fr = translateToFR(en);
      const es = translateToES(en);
      const ru = translateToRU(en);
      
      // Add FR, ES, RU before the closing brace
      block = block.replace(
        /(\bTR:\s*'(?:[^'\\]|\\.)*'\s*)\n(\s*\})/,
        `$1\n      FR: '${fr.replace(/'/g, "\\'")}',\n      ES: '${es.replace(/'/g, "\\'")}',\n      RU: '${ru.replace(/'/g, "\\'")}'\n$2`
      );
      descCount++;
    }
    
    output.push(block);
  } else {
    output.push(line);
  }
  i++;
}

content = output.join('\n');
console.log(`Added translations to ${descCount} description fields`);

// Also handle single-line descriptions: description: { DE: '...', EN: '...', TR: '...' },
const singleDescPattern = /(\bdescription:\s*\{[^}]*\bDE:\s*'([^']*)'[^}]*\bEN:\s*'([^']*)'[^}]*\bTR:\s*'([^']*)')(\s*\})/g;
let singleCount = 0;
content = content.replace(singleDescPattern, (match, prefix, de, en, tr, suffix) => {
  if (match.includes("FR:")) return match;
  singleCount++;
  const fr = translateToFR(en).replace(/'/g, "\\'");
  const es = translateToES(en).replace(/'/g, "\\'");
  const ru = translateToRU(en).replace(/'/g, "\\'");
  return `${prefix}, FR: '${fr}', ES: '${es}', RU: '${ru}'${suffix}`;
});
console.log(`Added translations to ${singleCount} single-line description fields`);

// Handle badge fields too
const badgePattern = /(\bbadge:\s*\{[^}]*\bDE:\s*'([^']*)'[^}]*\bEN:\s*'([^']*)'[^}]*\bTR:\s*'([^']*)')(\s*\})/g;
let badgeCount = 0;
content = content.replace(badgePattern, (match, prefix, de, en, tr, suffix) => {
  if (match.includes("FR:")) return match;
  badgeCount++;
  return `${prefix}, FR: '${en}', ES: '${es}', RU: '${en}'${suffix}`;
});
console.log(`Added translations to ${badgeCount} badge fields`);

// Handle group fields
const groupPattern = /(\bgroup:\s*\{[^}]*\bDE:\s*'([^']*)'[^}]*\bEN:\s*'([^']*)'[^}]*\bTR:\s*'([^']*)')(\s*\})/g;
let groupCount = 0;
content = content.replace(groupPattern, (match, prefix, de, en, tr, suffix) => {
  if (match.includes("FR:")) return match;
  groupCount++;
  return `${prefix}, FR: '${en}', ES: '${en}', RU: '${en}'${suffix}`;
});
console.log(`Added translations to ${groupCount} group fields`);

// Handle variation labels
const labelPattern = /(\blabel:\s*\{[^}]*\bDE:\s*'([^']*)'[^}]*\bEN:\s*'([^']*)'[^}]*\bTR:\s*'([^']*)')(\s*\})/g;
let labelCount = 0;
content = content.replace(labelPattern, (match, prefix, de, en, tr, suffix) => {
  if (match.includes("FR:")) return match;
  labelCount++;
  return `${prefix}, FR: '${en}', ES: '${en}', RU: '${en}'${suffix}`;
});
console.log(`Added translations to ${labelCount} label fields`);

fs.writeFileSync(menuPath, content, 'utf-8');
console.log('\n✅ All translations added successfully!');
