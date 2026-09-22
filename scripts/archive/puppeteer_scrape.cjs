const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    const url = 'https://menury.com/r/acf150c429/Berlin/H%C3%BCrremLounge/de/6af3dd0';
    console.log(`Navigating to ${url}...`);
    
    await page.goto(url, { waitUntil: 'networkidle2' });
    
    // Wait for menu items to render
    try {
        await page.waitForSelector('.menuItemCard', { timeout: 10000 });
    } catch (e) {
        console.log("Could not find .menuItemCard within 10s. Trying to extract body text.");
    }

    const items = await page.evaluate(() => {
        const cards = document.querySelectorAll('.menuItemCard');
        const result = [];
        
        cards.forEach(card => {
            const nameEl = card.querySelector('.menuItemCardHeadline') || card.querySelector('h2, h3, h4');
            const priceEl = card.querySelector('.menuItemCardPrice') || card.querySelector('.price, [class*="price"], [class*="Price"]');
            
            if (nameEl && priceEl) {
                result.push({
                    name: nameEl.innerText.trim(),
                    price: priceEl.innerText.trim()
                });
            } else {
                // Try finding any text matching a price format (e.g. "5,90", "12,00")
                const text = card.innerText;
                const match = text.match(/(\d+[,.]\d{2})/);
                if (nameEl && match) {
                    result.push({
                        name: nameEl.innerText.trim(),
                        price: match[1]
                    });
                }
            }
        });
        
        return result;
    });
    
    console.log(`Found ${items.length} items with .menuItemCard logic.`);
    
    // Fallback: Just get all text
    const allText = await page.evaluate(() => document.body.innerText);
    
    fs.writeFileSync('menury_scraped.json', JSON.stringify({ items, text: allText }, null, 2));
    console.log('Saved to menury_scraped.json');
    
    await browser.close();
})();
