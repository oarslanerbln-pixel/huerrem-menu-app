const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'src', 'index.css');
let content = fs.readFileSync(cssPath, 'utf8');

// Replace the entire html.silver block with a true light-metallic silver theme
const newSilverTheme = `html.silver {
  /* Backgrounds & Surfaces - Metallic Light */
  --marble-base: #EBECEF; /* Light Silver */
  --surface-100: #F4F5F7;
  --surface-200: #FFFFFF;
  
  /* Text Colors - High Contrast */
  --text-primary: #1A1C20;
  --text-secondary: #4A4D55;
  --text-tertiary: #757985;

  /* Theme Overrides */
  --theme-bg: #EBECEF;
  --theme-card-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(235, 238, 242, 0.85)); /* Silver glass */
  --theme-modal-bg: rgba(240, 242, 245, 0.98);
  --theme-text-primary: #1A1C20; /* Very prominent dark text */
  --theme-text-secondary: #4A4D55;
  --theme-modal-text: #1A1C20;
  --theme-card-border: rgba(180, 185, 195, 0.4);
  --theme-accent: #6C7282; /* Deep silver accent */
  --theme-radius: 2px;
  --theme-shadow: 0 10px 30px rgba(0, 0, 0, 0.05), inset 0 1px 1px rgba(255, 255, 255, 1);
  
  /* Borders */
  --border-light: rgba(180, 185, 195, 0.3);
  --border-gold: rgba(180, 185, 195, 0.6);
}

html.silver .theme-card {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8);
}

/* Fix for Special Event Icon and Gold utilities in Silver Theme */
html.silver [class*="text-gold-"] {
  color: var(--theme-accent) !important;
}
html.silver [class*="bg-gold-"] {
  background-color: rgba(108, 114, 130, 0.1) !important;
}
html.silver [class*="border-gold-"] {
  border-color: rgba(108, 114, 130, 0.25) !important;
}
html.silver .bg-gradient-to-r.from-gold-500\\/0 {
  background-image: linear-gradient(to right, transparent, rgba(108, 114, 130, 0.1), transparent) !important;
}
`;

content = content.replace(/html\.silver\s*\{[\s\S]*?html\.silver \[class\*="border-gold"\] \{[\s\S]*?\}/, newSilverTheme);

fs.writeFileSync(cssPath, content, 'utf8');
console.log('Silver theme updated to be light-metallic and fixed gold overrides.');
