const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'src', 'index.css');
let content = fs.readFileSync(cssPath, 'utf8');

const silverTheme = `
  /* ============================================
     SILVER MODE — .silver class on <html>
     ============================================ */
  
  html.silver {
    /* Backgrounds & Surfaces (Metallic / Gunmetal) */
    --marble-base: #1A1A1C; /* Dark Platinum */
    --surface-100: #232326;
    --surface-200: #2D2D31;
    
    /* Text Colors */
    --text-primary: #F0F0F5; /* Crisp Silver/White */
    --text-secondary: #C0C0C8; /* Soft Silver */
    --text-tertiary: #909099; /* Steel Gray */
  
    /* Theme Overrides */
    --theme-bg: #151517;
    --theme-card-bg: #222226;
    --theme-modal-bg: rgba(30, 30, 34, 0.98);
    --theme-text-primary: #F0F0F5;
    --theme-text-secondary: #C0C0C8;
    --theme-modal-text: #F0F0F5;
    --theme-card-border: rgba(192, 192, 200, 0.16);
    --theme-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(192, 192, 200, 0.1);
    --theme-title-shadow: none !important;
  
    /* Borders */
    --border-light: rgba(192, 192, 200, 0.2);
    --border-gold: rgba(192, 192, 200, 0.45); /* Override gold to silver */
  
    /* Shadows */
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 6px 18px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 12px 30px rgba(0, 0, 0, 0.5);
    --shadow-glow: 0 0 20px rgba(192, 192, 200, 0.15);

    /* Accents - Map gold colors to silver */
    --gold-300: #DCDCE6;
    --gold-400: #B4B4C0;
    --gold-500: #A0A0B0; /* The main accent color becomes a cool silver */
    --gold-600: #808090;
    --gold-glow: hsla(240, 5%, 70%, 0.25);
  }
  
  html.silver .glass-panel {
    background: rgba(30, 30, 34, 0.95);
    border-bottom: 1px solid rgba(192, 192, 200, 0.15);
  }
  
  html.silver .glass-card {
    background: rgba(35, 35, 40, 0.95);
    border-bottom: 1px solid rgba(192, 192, 200, 0.12);
  }
  
  html.silver .glass-card:hover {
    border-color: rgba(192, 192, 200, 0.5);
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.3);
  }
  
  html.silver .nav-dock {
    background: rgba(25, 25, 28, 0.98) !important;
    border: 1px solid rgba(192, 192, 200, 0.25);
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.4);
  }
  
  html.silver [class*="bg-black"] {
    background-color: rgba(25, 25, 28, 0.98) !important;
    backdrop-filter: blur(12px);
  }
  
  html.silver ::-webkit-scrollbar-thumb {
    background: rgba(192, 192, 200, 0.2);
  }
`;

// Insert just before `*, *::before, *::after`
content = content.replace('  *, *::before, *::after {', silverTheme + '\n  *, *::before, *::after {');

fs.writeFileSync(cssPath, content, 'utf8');
console.log('Successfully injected Silver theme CSS!');
