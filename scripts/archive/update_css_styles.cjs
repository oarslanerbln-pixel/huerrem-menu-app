const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'src', 'index.css');
let content = fs.readFileSync(cssPath, 'utf8');

// 1. Update theme radius to sharp corners (2px)
content = content.replace(/--theme-radius: 8px;/g, '--theme-radius: 2px;');

// 2. Add Silver Theme
if (!content.includes('html.silver')) {
  const silverTheme = `
/* ============================================
   SILVER MODE — .silver class on <html>
   ============================================ */
html.silver {
  /* Backgrounds & Surfaces */
  --marble-base: #1A1A1A; /* Dark Metallic */
  --surface-100: #242424;
  --surface-200: #2E2E2E;
  
  /* Text Colors */
  --text-primary: #F0F0F0;
  --text-secondary: #B0B0B0;
  --text-tertiary: #808080;

  /* Theme Overrides */
  --theme-bg: #121212;
  --theme-card-bg: rgba(30, 30, 30, 0.7);
  --theme-modal-bg: rgba(20, 20, 20, 0.95);
  --theme-text-primary: #F0F0F0;
  --theme-text-secondary: #B0B0B0;
  --theme-modal-text: #F0F0F0;
  --theme-card-border: rgba(200, 200, 200, 0.15);
  --theme-accent: #E0E0E0; /* Silver Accent */
  --theme-radius: 2px;
  --theme-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
  
  /* Borders */
  --border-light: rgba(255, 255, 255, 0.1);
  --border-gold: rgba(200, 200, 200, 0.3);
}

html.silver .theme-card {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

html.silver [class*="text-gold"] {
  color: #E0E0E0 !important;
}
html.silver [class*="bg-gold"] {
  background-color: #E0E0E0 !important;
}
html.silver [class*="border-gold"] {
  border-color: rgba(200, 200, 200, 0.3) !important;
}
`;
  
  // Insert before html.light
  content = content.replace(/\/\* ============================================\s*LIGHT MODE/, silverTheme + '\n/* ============================================\n   LIGHT MODE');
}

// 3. Apple/Tesla style animation on theme-card
if (!content.includes('theme-card-glare')) {
  content = content.replace(
    /\.theme-card \{[\s\S]*?transition: all 0\.4s cubic-bezier\(0\.16, 1, 0\.3, 1\);\s*\}/,
    `$&
.theme-card {
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
.theme-card::after {
  content: '';
  position: absolute;
  top: 0; left: -100%; width: 50%; height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
  transform: skewX(-20deg);
  transition: none;
}
.theme-card:hover::after {
  left: 200%;
  transition: left 0.8s ease-in-out;
}
.theme-card:hover {
  border-color: var(--theme-accent);
  box-shadow: 0 12px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1);
  transform: translateY(-2px);
}`
  );
}

fs.writeFileSync(cssPath, content, 'utf8');
console.log('CSS updated with Silver theme and Tesla/Apple styles.');
