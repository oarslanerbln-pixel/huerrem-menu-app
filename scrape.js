const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Navigate to the original menu
  console.log("Navigating...");
  await page.goto('https://menury.com/r/acf150c429/Berlin/H%C3%BCrremLounge/de', { waitUntil: 'networkidle2' });
  
  console.log("Extracting data...");
  const data = await page.evaluate(() => {
    const results = [];
    
    // First, let's find the categories (usually in a horizontal scroll or tabs)
    // Actually, Menury often displays everything in a long list with headers, or we can just grab all items and their nearest category header
    
    // We'll try to find all categories. Menury usually uses specific classes.
    // Let's just grab all text and look for a pattern, or try to find .menuItemCard elements
    
    const cards = document.querySelectorAll('.menuItemCard');
    const items = [];
    cards.forEach(card => {
        const nameEl = card.querySelector('.menuItemCardTitle, h2, h3, .v-card__title, .font-weight-bold');
        const priceEl = card.querySelector('.menuItemCardPrice, .price, .v-chip__content');
        const descEl = card.querySelector('.menuItemCardDescription, p');
        
        // Find closest category header
        // This can be tricky in the DOM, let's just extract the raw items for now
        let name = nameEl ? nameEl.innerText.trim() : '';
        let price = priceEl ? priceEl.innerText.trim() : '';
        let desc = descEl ? descEl.innerText.trim() : '';
        
        if (name) {
            items.push({name, price, desc});
        }
    });
    
    // Let's also extract category names from the sidebar or top bar
    const categoryTabs = document.querySelectorAll('.v-tab, .category-title, .subMenuListHeadline, h1, h2');
    const categories = [];
    categoryTabs.forEach(tab => {
        const t = tab.innerText.trim();
        if(t && !categories.includes(t)) categories.push(t);
    });
    
    return { categories, items };
  });
  
  fs.writeFileSync('original_menu_scraped.json', JSON.stringify(data, null, 2));
  console.log("Saved to original_menu_scraped.json");
  console.log(`Found ${data.categories.length} categories and ${data.items.length} items.`);
  
  await browser.close();
})();
