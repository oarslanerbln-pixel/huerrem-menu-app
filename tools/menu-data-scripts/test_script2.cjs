const fs = require('fs');

const content = fs.readFileSync('menu.ts', 'utf-8');
const lines = content.split('\n');

let currentName = '';
let currentPrice = 0;
let currentIsSignature = false;
let currentCategory = '';
let currentSubcategory = '';

let result = [];

for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('"name": {') || lines[i].includes('name: {')) {
        // Look ahead for EN
        for (let j = i + 1; j < i + 10; j++) {
            if (lines[j] && (lines[j].includes('"EN":') || lines[j].includes('EN:'))) {
                const match = lines[j].match(/(?:"EN"|EN):\s*"(.*?)"/);
                if (match) currentName = match[1];
                else {
                    const match2 = lines[j].match(/(?:"EN"|EN):\s*'(.*?)'/);
                    if (match2) currentName = match2[1];
                }
                break;
            }
        }
    }
    if (lines[i].includes('"price":')) {
        const match = lines[i].match(/"price":\s*([\d\.]+)/);
        if (match) currentPrice = match[1];
    }
    if (lines[i].includes('"category":')) {
        const match = lines[i].match(/"category":\s*"(.*?)"/);
        if (match) currentCategory = match[1];
    }
    if (lines[i].includes('"subcategory":')) {
        const match = lines[i].match(/"subcategory":\s*"(.*?)"/);
        if (match) currentSubcategory = match[1];
        
        if (currentCategory === 'drinks') {
            result.push({
                name: currentName,
                price: currentPrice,
                subcategory: currentSubcategory
            });
        }
    }
}

console.log(JSON.stringify(result, null, 2));
