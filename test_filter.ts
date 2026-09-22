import { menuData } from './src/data/menu.ts';

const activeCategory = 'drinks';
const activeSubcategory = 'Cocktails';

const allItems = menuData.filter(item => item.active !== false);

const filteredItems = allItems.filter(item => {
    const catMatch = item.category === activeCategory;
    const subMatch = (activeSubcategory === 'All' || item.subcategory === activeSubcategory);
    return catMatch && subMatch;
});

console.log("Total matched items:", filteredItems.length);
filteredItems.forEach(item => {
    console.log(` - ${item.name.DE || item.name}`);
});
