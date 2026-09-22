const fs = require('fs');

const content = fs.readFileSync('menu.ts', 'utf-8');
const lines = content.split('\n');

let currentName = '';
let currentPrice = 0;
let currentIsSignature = false;
let currentLine = 0;

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('"EN":')) {
        const match = lines[i].match(/"EN": "(.*?)"/);
        if (match) currentName = match[1];
    }
    if (lines[i].includes('"price":')) {
        const match = lines[i].match(/"price": ([\d\.]+)/);
        if (match) currentPrice = match[1];
    }
    if (lines[i].includes('isSignature:')) {
        currentIsSignature = lines[i].includes('true');
    }
    if (lines[i].includes('"subcategory": "Cocktails"')) {
        console.log(`Cocktail: ${currentName} - Price: ${currentPrice} - Signature: ${currentIsSignature}`);
    }
}
