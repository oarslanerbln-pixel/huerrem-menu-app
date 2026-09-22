const fs = require('fs');

const map = JSON.parse(fs.readFileSync('scripts/translation_map.json', 'utf-8'));
let deleted = 0;

for (const key of Object.keys(map)) {
  const trans = map[key];
  if (trans['FR'] === key || trans['ES'] === key || trans['RU'] === key) {
    // Some words like "Lemon Chill" are naturally the same, but let's just delete the whole entry to force re-translate
    // Actually, "Raffaello" is the same in all languages, but things like "Pfirsich Minze" definitely aren't.
    // Let's just delete if it contains German words or is longer than 15 chars (sentences).
    // Better yet, just delete all where FR === DE.
    // Except very short ones like "Shisha".
    if (key.length > 5) {
       console.log(`Deleting cache for: ${key}`);
       delete map[key];
       deleted++;
    }
  }
}

console.log(`Deleted ${deleted} stale translations.`);
fs.writeFileSync('scripts/translation_map.json', JSON.stringify(map, null, 2));
