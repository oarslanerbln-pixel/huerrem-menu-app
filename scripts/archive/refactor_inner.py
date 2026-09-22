import re

with open('src/index.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Add new theme-specific classes inside the THEME ENGINE block
theme_classes = """

/* Component Specific Variables */
[data-concept="neo-classic"] {
  --theme-title-font: var(--font-display);
  --theme-title-size: 1.15rem;
  --theme-title-weight: normal;
  --theme-title-transform: none;
  --theme-title-shadow: drop-shadow(0 2px 4px rgba(0,0,0,0.5));
  --theme-price-bg: transparent;
  --theme-price-color: var(--gold-400);
  --theme-price-shadow: drop-shadow(0 0 8px rgba(197,165,90,0.6));
  --theme-price-border: none;
  --theme-price-padding: 0;
  --theme-badge-bg: rgba(197, 165, 90, 0.2);
  --theme-badge-color: var(--gold-400);
  --theme-badge-border: 1px solid rgba(197, 165, 90, 0.3);
  --theme-img-gradient: linear-gradient(to top, rgba(15, 12, 10, 1), transparent);
}

[data-concept="brutalist"] {
  --theme-title-font: var(--font-display);
  --theme-title-size: 1.5rem;
  --theme-title-weight: 900;
  --theme-title-transform: uppercase;
  --theme-title-shadow: none;
  --theme-price-bg: var(--gold-500);
  --theme-price-color: #000;
  --theme-price-shadow: 3px 3px 0 0 #000;
  --theme-price-border: 2px solid #000;
  --theme-price-padding: 0.25rem 0.75rem;
  --theme-badge-bg: #000;
  --theme-badge-color: #fff;
  --theme-badge-border: 1px solid #000;
  --theme-img-gradient: linear-gradient(to top, #fff, transparent);
}

[data-concept="skeuomorphic"] {
  --theme-title-font: var(--font-display);
  --theme-title-size: 1.15rem;
  --theme-title-weight: normal;
  --theme-title-transform: none;
  --theme-title-shadow: drop-shadow(0 2px 4px rgba(0,0,0,0.8));
  --theme-price-bg: #0c0a09;
  --theme-price-color: var(--gold-400);
  --theme-price-shadow: inset 0 2px 8px rgba(0,0,0,0.9);
  --theme-price-border: 1px solid rgba(197, 165, 90, 0.3);
  --theme-price-padding: 0.25rem 0.75rem;
  --theme-badge-bg: rgba(197, 165, 90, 0.2);
  --theme-badge-color: var(--gold-400);
  --theme-badge-border: 1px solid rgba(197, 165, 90, 0.3);
  --theme-img-gradient: linear-gradient(to top, #0c0a09, transparent);
}

[data-concept="cyber-gold"] {
  --theme-title-font: var(--font-display);
  --theme-title-size: 1.2rem;
  --theme-title-weight: bold;
  --theme-title-transform: uppercase;
  --theme-title-shadow: 0 0 10px rgba(197, 165, 90, 0.5);
  --theme-price-bg: transparent;
  --theme-price-color: #FFD700;
  --theme-price-shadow: 0 0 10px rgba(255, 215, 0, 0.8);
  --theme-price-border: 1px solid rgba(255, 215, 0, 0.4);
  --theme-price-padding: 0.15rem 0.5rem;
  --theme-badge-bg: rgba(255, 215, 0, 0.2);
  --theme-badge-color: #FFD700;
  --theme-badge-border: 1px solid rgba(255, 215, 0, 0.5);
  --theme-img-gradient: linear-gradient(to top, rgba(0,0,0,1), transparent);
}

[data-concept="avant-garde"] {
  --theme-title-font: var(--font-body);
  --theme-title-size: 1.25rem;
  --theme-title-weight: 300;
  --theme-title-transform: uppercase;
  --theme-title-shadow: none;
  --theme-price-bg: transparent;
  --theme-price-color: #e53935;
  --theme-price-shadow: none;
  --theme-price-border: none;
  --theme-price-padding: 0;
  --theme-badge-bg: transparent;
  --theme-badge-color: #e53935;
  --theme-badge-border: 1px solid #e53935;
  --theme-img-gradient: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
}

[data-concept="monolithic-matte"] {
  --theme-title-font: var(--font-body);
  --theme-title-size: 1.1rem;
  --theme-title-weight: 500;
  --theme-title-transform: none;
  --theme-title-shadow: none;
  --theme-price-bg: transparent;
  --theme-price-color: #a8a29e;
  --theme-price-shadow: none;
  --theme-price-border: none;
  --theme-price-padding: 0;
  --theme-badge-bg: rgba(0,0,0,0.2);
  --theme-badge-color: #a8a29e;
  --theme-badge-border: none;
  --theme-img-gradient: linear-gradient(to top, #3C3A39, transparent);
}

[data-concept="ottoman-palace"] {
  --theme-title-font: serif;
  --theme-title-size: 1.3rem;
  --theme-title-weight: normal;
  --theme-title-transform: none;
  --theme-title-shadow: drop-shadow(0 2px 4px rgba(0,0,0,0.8));
  --theme-price-bg: transparent;
  --theme-price-color: #C8B568;
  --theme-price-shadow: drop-shadow(0 0 8px rgba(197,165,90,0.5));
  --theme-price-border: none;
  --theme-price-padding: 0;
  --theme-badge-bg: #8B0000;
  --theme-badge-color: #F3E5AB;
  --theme-badge-border: 1px solid rgba(212, 175, 55, 0.4);
  --theme-img-gradient: linear-gradient(to top, rgba(43, 20, 27, 1), transparent);
}

.theme-card-title {
  font-family: var(--theme-title-font);
  font-size: var(--theme-title-size);
  font-weight: var(--theme-title-weight);
  text-transform: var(--theme-title-transform);
  filter: var(--theme-title-shadow);
  color: var(--theme-text-primary);
  transition: color 0.3s ease;
}
.theme-card-title:hover {
  color: var(--theme-accent);
}

.theme-price-pill {
  background: var(--theme-price-bg);
  color: var(--theme-price-color);
  box-shadow: var(--theme-price-shadow);
  border: var(--theme-price-border);
  padding: var(--theme-price-padding);
  border-radius: 8px;
  font-weight: bold;
}

.theme-badge {
  background: var(--theme-badge-bg);
  color: var(--theme-badge-color);
  border: var(--theme-badge-border);
  padding: 2px 8px;
  border-radius: 4px;
}

.theme-image-gradient {
  background: var(--theme-img-gradient);
}
"""

if '/* Component Specific Variables */' not in css:
    css += theme_classes
    with open('src/index.css', 'w', encoding='utf-8') as f:
        f.write(css)

import os
file_path = 'src/components/UI/MenuItemCard.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace image gradient
gradient_pattern = re.compile(r'className=\{`absolute inset-0 z-10 pointer-events-none \$\{[\s\S]*?\}\`\}')
content = gradient_pattern.sub('className="absolute inset-0 z-10 pointer-events-none theme-image-gradient"', content)

# 2. Replace badge
badge_pattern = re.compile(r'className=\{`inline-block mb-2 px-2 py-0\.5 text-\[10px\] uppercase tracking-widest font-bold \$\{[\s\S]*?\}\`\}')
content = badge_pattern.sub('className="inline-block mb-2 text-[10px] uppercase tracking-widest font-bold theme-badge"', content)

# 3. Replace title
title_pattern = re.compile(r'className=\{`transition-colors \$\{[\s\S]*?\}\`\}')
content = title_pattern.sub('className="theme-card-title"', content)

# 4. Replace price
price_pattern = re.compile(r'className=\{`font-display tracking-wider \$\{[\s\S]*?\}\`\}')
content = price_pattern.sub('className="font-display tracking-wider theme-price-pill"', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated index.css and MenuItemCard.tsx completely.")
