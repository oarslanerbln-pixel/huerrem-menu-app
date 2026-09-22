const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  console.log("Navigating...");
  await page.goto('https://menury.com/r/acf150c429/Berlin/H%C3%BCrremLounge/de', { waitUntil: 'networkidle2' });
  
  // Wait a few seconds for Vue to render the list
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  console.log("Extracting data...");
  const data = await page.evaluate(() => {
    const cards = document.querySelectorAll('.menuItemCard');
    const items = [];
    cards.forEach(card => {
        const nameEl = card.querySelector('.menuItemCardTitle, h2, h3, .v-card__title, .font-weight-bold, .subMenuListHeadline');
        const priceEl = card.querySelector('.menuItemCardPrice, .price, .v-chip__content');
        
        let name = nameEl ? nameEl.innerText.trim() : '';
        let price = priceEl ? priceEl.innerText.trim() : '';
        
        if (name) {
            items.push({name, price});
        }
    });
    
    const categoryTabs = document.querySelectorAll('.v-tab, .category-title, .subMenuListHeadline, h1, h2, .v-btn__content');
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
