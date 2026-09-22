const fs = require('fs');
const path = require('path');

const transPath = path.join(__dirname, '..', 'src', 'i18n', 'translations.ts');
let content = fs.readFileSync(transPath, 'utf8');

// Fix Spanish Subcategories
const esSubcategories = `"Classic": "Clásico",
        "Premium Blends": "Mezclas Premium",
        "Signature Blends": "Mezclas de Autor",
        "Sommer-Specials": "Especiales de Verano",
        "Softdrinks": "Refrescos",
        "Kaffeespezialitäten": "Cafés",
        "Säfte": "Zumos",
        "Homemade Iced Tea": "Té Helado Casero",
        "Fresh Homemade": "Caseros Frescos",
        "Burger Gerichte": "Hamburguesas",
        "Hauptgerichte": "Platos Principales",
        "Bowls & Salate": "Bowls y Ensaladas",
        "Pasta Gerichte": "Pastas",
        "Desserts": "Postres",
        "Teespezialitäten": "Tés",
        "Smoothies": "Batidos",
        "Finger Food": "Aperitivos",
        "Suppen": "Sopas",
        "Vorspeisen": "Entrantes",
        "Cocktails": "Cócteles",
        "Heiße Specials": "Especiales Calientes",
        "Shakes": "Batidos",
        "Happy Hour": "Happy Hour"`;

// Fix French Subcategories
const frSubcategories = `"Classic": "Classique",
        "Premium Blends": "Mélanges Premium",
        "Signature Blends": "Mélanges Signature",
        "Sommer-Specials": "Spécialités d'Été",
        "Softdrinks": "Boissons Sans Alcool",
        "Kaffeespezialitäten": "Cafés",
        "Säfte": "Jus",
        "Homemade Iced Tea": "Thé Glacé Maison",
        "Fresh Homemade": "Fait Maison",
        "Burger Gerichte": "Burgers",
        "Hauptgerichte": "Plats Principaux",
        "Bowls & Salate": "Bols & Salades",
        "Pasta Gerichte": "Pâtes",
        "Desserts": "Desserts",
        "Teespezialitäten": "Thés",
        "Smoothies": "Smoothies",
        "Finger Food": "Amuse-gueules",
        "Suppen": "Soupes",
        "Vorspeisen": "Entrées",
        "Cocktails": "Cocktails",
        "Heiße Specials": "Spécialités Chaudes",
        "Shakes": "Milkshakes",
        "Happy Hour": "Happy Hour"`;

// Replace ES
content = content.replace(
  /ES: \{\s*subcategories: \{[\s\S]*?\},\s*tagline:/,
  `ES: {\n    subcategories: {\n        ${esSubcategories}\n    },\n    tagline:`
);

// Replace FR
content = content.replace(
  /FR: \{\s*subcategories: \{[\s\S]*?\},\s*tagline:/,
  `FR: {\n    subcategories: {\n        ${frSubcategories}\n    },\n    tagline:`
);

fs.writeFileSync(transPath, content, 'utf8');
console.log('Translations updated.');
