import fs from 'fs';
import path from 'path';
import { menuData, quizQuestions, allergenLegend, additiveLegend } from '../src/data/menu';
import type { MenuItem } from '../src/types';

// Extract actual quiz questions (they have 'question' and 'options')
const actualQuizQuestions = quizQuestions.filter(q => q.question && q.options);
// Extract the menu items that were accidentally placed in quizQuestions
const menuItemsFromQuiz = quizQuestions.filter(q => !q.question && !q.options) as unknown as MenuItem[];

const combinedMenuData = [...menuData, ...menuItemsFromQuiz];

// Deduplicate combinedMenuData based on name.DE
const uniqueMenuData: MenuItem[] = [];
const seenNames = new Set<string>();

for (const item of combinedMenuData) {
    if (!item.id) {
        item.id = `generated_id_${Math.random().toString(36).substring(2, 9)}`;
    }
    
    let nameStr = '';
    if (typeof item.name === 'string') {
        nameStr = item.name;
    } else if (item.name && typeof item.name === 'object') {
        nameStr = item.name.DE || item.name.EN || item.name.TR || Object.values(item.name)[0] || '';
    }

    if (!nameStr) {
        uniqueMenuData.push(item);
        continue;
    }

    if (!seenNames.has(nameStr)) {
        seenNames.add(nameStr);
        uniqueMenuData.push(item);
    } else {
        console.log(`Removed duplicate: ${nameStr} (ID: ${item.id})`);
    }
}

// Ensure the code uses valid JS object syntax but matches TS format
function stringifyObject(obj: unknown): string {
    return JSON.stringify(obj, null, 2);
}

const output = `import type { MenuItem } from '../types';

export const menuData: MenuItem[] = ${stringifyObject(uniqueMenuData)};

export const quizQuestions = ${stringifyObject(actualQuizQuestions)};

export const allergenLegend: Record<string, string> = ${stringifyObject(allergenLegend)};

export const additiveLegend: Record<string, string> = ${stringifyObject(additiveLegend)};
`;

fs.writeFileSync(path.resolve(__dirname, '../src/data/menu.ts'), output, 'utf-8');
console.log('Successfully cleaned menu.ts');
console.log('Unique menu items:', uniqueMenuData.length);
console.log('Actual quiz questions:', actualQuizQuestions.length);
