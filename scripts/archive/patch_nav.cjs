const fs = require('fs');
const path = require('path');

// 1. Patch FilterBar.tsx
const filterBarPath = path.join(__dirname, '..', 'src', 'components', 'Layout', 'FilterBar.tsx');
let filterBarContent = fs.readFileSync(filterBarPath, 'utf8');

filterBarContent = filterBarContent.replace(
  /className=\{`sticky top-0 z-30 pt-3 pb-1.5 transition-all duration-500 \$\{isCompact \? 'bg-black\/50 backdrop-blur-2xl border-b border-white\/5 shadow-2xl' : 'bg-transparent'\}`\}/,
  'className={`sticky top-0 z-30 pt-3 pb-1.5 transition-all duration-500 ${isCompact ? \'backdrop-blur-2xl border-b theme-border shadow-2xl\' : \'bg-transparent\'}`} style={isCompact ? { backgroundColor: \'var(--theme-modal-bg)\' } : {}}'
);

filterBarContent = filterBarContent.replace(
  /bg-\[\#060504\]\/98 backdrop-blur-3xl z-40 px-4 pt-6 pb-32 overflow-y-auto no-scrollbar shadow-\[0_-20px_60px_rgba\(0,0,0,0\.8\)\] border-t border-gold-500\/10/g,
  'theme-bg backdrop-blur-3xl z-40 px-4 pt-6 pb-32 overflow-y-auto no-scrollbar shadow-[0_-20px_60px_rgba(0,0,0,0.8)] border-t theme-border'
);

filterBarContent = filterBarContent.replace(
  /text-white\/70 hover:text-white/g,
  'theme-text-muted hover:theme-text'
);

filterBarContent = filterBarContent.replace(
  /text-white font-medium/g,
  'theme-text font-medium'
);

filterBarContent = filterBarContent.replace(
  /bg-white z-0"[\s\S]*?transition=\{\{ type: 'spring', stiffness: 400, damping: 30 \}\}[\s\S]*?style=\{\{[\s\S]*?boxShadow: '0 0 8px rgba\(197, 165, 90, 0\.6\)'[\s\S]*?\}\}/m,
  'theme-accent-bg z-0"\n                      transition={{ type: \'spring\', stiffness: 400, damping: 30 }}\n                      style={{ boxShadow: \'0 0 10px var(--theme-accent)\' }}'
);

fs.writeFileSync(filterBarPath, filterBarContent, 'utf8');
console.log('Successfully updated FilterBar.tsx!');


// 2. Patch BottomNav.tsx
const bottomNavPath = path.join(__dirname, '..', 'src', 'components', 'Layout', 'BottomNav.tsx');
let bottomNavContent = fs.readFileSync(bottomNavPath, 'utf8');

bottomNavContent = bottomNavContent.replace(
  /className=\{`fixed bottom-0 left-0 w-full z-40 pb-\[env\(safe-area-inset-bottom\)\] transition-all duration-500 pointer-events-none \$\{[\s\S]*?isCompact[\s\S]*?\? 'bg-black\/55 border-t border-white\/5 shadow-\[0_-8px_40px_rgba\(0,0,0,0\.6\)\] backdrop-blur-2xl'[\s\S]*?: 'bg-black\/20 border-t border-white\/5 backdrop-blur-xl'[\s\S]*?\}`\}/,
  'className={`fixed bottom-0 left-0 w-full z-40 pb-[env(safe-area-inset-bottom)] transition-all duration-500 pointer-events-none theme-border border-t ${isCompact ? \'shadow-[0_-8px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl\' : \'backdrop-blur-xl\'}`} style={{ backgroundColor: isCompact ? \'var(--theme-modal-bg)\' : \'var(--theme-modal-bg)\' }}'
);

// Remove the glowing background pill
bottomNavContent = bottomNavContent.replace(
  /\{\/\* Active glow background â€” gold only \*\/\}[\s\S]*?\{isActive && \([\s\S]*?<motion\.div[\s\S]*?layoutId="nav-category-glow"[\s\S]*?className="absolute inset-0 m-auto w-12 h-12 rounded-full pointer-events-none z-0 opacity-70"[\s\S]*?style=\{\{ background: 'radial-gradient\(circle, rgba\(197,165,90,0\.18\) 0%, transparent 70%\)' \}\}[\s\S]*?transition=\{\{ type: 'spring', stiffness: 350, damping: 30 \}\}[\s\S]*?\/>[\s\S]*?\)\}/m,
  ''
);

// Update icon classes to be theme aware
bottomNavContent = bottomNavContent.replace(
  /'text-white dark:text-gold-300 scale-110'/g,
  '\'theme-accent-text scale-110\''
);
bottomNavContent = bottomNavContent.replace(
  /'text-white\/70 dark:text-white\/35 group-hover:text-white'/g,
  '\'theme-text-muted group-hover:theme-accent-text\''
);
bottomNavContent = bottomNavContent.replace(
  /style=\{isActive \? \{ filter: 'drop-shadow\(0 0 10px rgba\(197,165,90,0\.7\)\)' \} : \{\}\}/g,
  'style={isActive ? { filter: \'drop-shadow(0 0 8px var(--theme-accent))\' } : {}}'
);

// Update label classes
bottomNavContent = bottomNavContent.replace(
  /'text-white dark:text-gold-400\/90 font-bold'/g,
  '\'theme-accent-text font-bold\''
);

// Update active indicator (top line) to be theme aware
bottomNavContent = bottomNavContent.replace(
  /\{\/\* Active indicator â€” top gold hairline \*\/\}[\s\S]*?\{isActive && \([\s\S]*?<motion\.div[\s\S]*?layoutId="active-dock-indicator"[\s\S]*?className="absolute top-0 left-1\/2 -translate-x-1\/2 w-10 h-\[1\.5px\] rounded-b-full"[\s\S]*?style=\{\{[\s\S]*?background: 'linear-gradient\(90deg, transparent, rgba\(197,165,90,0\.9\), rgba\(255,255,255,0\.5\), rgba\(197,165,90,0\.9\), transparent\)',[\s\S]*?boxShadow: '0 0 6px rgba\(197,165,90,0\.5\)',[\s\S]*?\}\}[\s\S]*?transition=\{\{ type: 'spring', stiffness: 300, damping: 25 \}\}[\s\S]*?\/>[\s\S]*?\)\}/m,
  `{/* Active indicator — theme colored top line */}
              {isActive && (
                <motion.div
                  layoutId="active-dock-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-b-full theme-accent-bg"
                  style={{
                    boxShadow: '0 0 10px var(--theme-accent)',
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}`
);

fs.writeFileSync(bottomNavPath, bottomNavContent, 'utf8');
console.log('Successfully updated BottomNav.tsx!');
