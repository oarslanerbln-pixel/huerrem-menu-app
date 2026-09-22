const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, '..', 'src', 'data', 'menu.ts');
let content = fs.readFileSync(menuPath, 'utf8');

const endOfMenuDataRegex = /\];\s*\/\/\s*Quiz Questions mapped for tags/;
let match = endOfMenuDataRegex.exec(content);
if (!match) {
    console.log('Cannot find the end of menuData');
    process.exit(1);
}

const indexOfEndOfMenuData = match.index;

// The end of the last quiz question (which has `tag: 'creamy'` in it)
const endOfQuizQuestionsRegex = /tag:\s*'creamy'\s*\}\s*,\s*\]\s*\}/;
let match2 = endOfQuizQuestionsRegex.exec(content);
if (!match2) {
    // Wait, let's try without the trailing comma in the options array
    const endOfQuizQuestionsRegex2 = /tag:\s*'creamy'\s*\}\s*\]\s*\}/;
    match2 = endOfQuizQuestionsRegex2.exec(content);
    if (!match2) {
        console.log('Cannot find the end of the last quiz question');
        process.exit(1);
    }
}

const startOfStrayItems = match2.index + match2[0].length;

const endOfQuizArrayRegex = /\];\s*export const allergenLegend/;
let match3 = endOfQuizArrayRegex.exec(content);
if (!match3) {
    console.log('Cannot find the end of the quiz array');
    process.exit(1);
}

const endOfStrayItems = match3.index;

const strayItems = content.substring(startOfStrayItems, endOfStrayItems);

const part1 = content.substring(0, indexOfEndOfMenuData);
const part2 = content.substring(indexOfEndOfMenuData, startOfStrayItems);
const part3 = content.substring(endOfStrayItems);

// We need to add a comma before stray items if part1 doesn't end with one,
// but the stray items start with `,` or `{`. Let's just append it.
const newContent = part1 + (strayItems.trim().startsWith(',') ? '' : ',\n') + strayItems.trim() + '\n' + part2 + part3;

fs.writeFileSync(menuPath, newContent, 'utf8');
console.log('Successfully moved stray items from quizQuestions to menuData!');
