css_content = """

/* --- Custom Concept Button Styles --- */

/* 1. Neo-Classic */
.concept-btn-neo-classic {
  background: linear-gradient(135deg, rgba(200,195,188,0.1) 0%, rgba(10,10,10,0.8) 100%);
  border: 1px solid rgba(197, 165, 90, 0.3);
  box-shadow: inset 0 0 10px rgba(197, 165, 90, 0.05);
  font-family: var(--font-display);
}
.concept-btn-neo-classic.active {
  border-color: rgba(197, 165, 90, 0.8);
  box-shadow: 0 0 15px rgba(197, 165, 90, 0.2), inset 0 0 20px rgba(197, 165, 90, 0.1);
}

/* 2. Brutalist */
.concept-btn-brutalist {
  background: #000;
  border: 2px solid #fff;
  box-shadow: 4px 4px 0px #fff;
  border-radius: 0 !important;
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: -0.05em;
  transition: all 0.1s ease;
}
.concept-btn-brutalist.active {
  background: #fff;
  color: #000;
  box-shadow: 2px 2px 0px #c5a55a;
  transform: translate(2px, 2px);
}

/* 3. Skeuomorphic Velvet */
.concept-btn-skeuomorphic {
  background: linear-gradient(to bottom, #4a0d15, #2a050a);
  border: 2px ridge #c5a55a;
  box-shadow: inset 0 5px 10px rgba(0,0,0,0.8), 0 2px 4px rgba(0,0,0,0.5);
  text-shadow: 0 -1px 1px rgba(0,0,0,0.8);
  border-radius: 8px;
}
.concept-btn-skeuomorphic.active {
  background: linear-gradient(to bottom, #6a1320, #3a0810);
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.9), 0 0 15px rgba(197, 165, 90, 0.4);
  border: 2px groove #e5c57a;
}

/* 4. Avant-Garde Mesh */
.concept-btn-avant-garde {
  background: radial-gradient(circle at 0% 0%, rgba(197, 165, 90, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 100% 100%, rgba(100, 100, 100, 0.2) 0%, transparent 50%);
  border-radius: 20px 0px 20px 0px !important;
  border: 1px dashed rgba(255,255,255,0.3);
}
.concept-btn-avant-garde.active {
  border: 1px solid #c5a55a;
  animation: bg-shift 3s infinite alternate;
}
@keyframes bg-shift {
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
}

/* 5. Cyber-Gold (Neon Rotating) */
.concept-btn-cyber-gold {
  position: relative;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  border: none !important;
  z-index: 1;
}
.concept-btn-cyber-gold::before {
  content: '';
  position: absolute;
  top: -50%; left: -50%; right: -50%; bottom: -50%;
  background: conic-gradient(from var(--angle), transparent 70%, #ffdf00 100%);
  z-index: -2;
  opacity: 0;
  transition: opacity 0.3s;
}
.concept-btn-cyber-gold::after {
  content: '';
  position: absolute;
  inset: 2px;
  background: #111;
  border-radius: 10px;
  z-index: -1;
}
.concept-btn-cyber-gold.active::before,
.concept-btn-cyber-gold:hover::before {
  opacity: 1;
  animation: rotate-border 2s linear infinite;
}

/* 6. Ottoman Palace */
.concept-btn-ottoman {
  background-image: repeating-linear-gradient(45deg, rgba(197,165,90,0.05) 0px, rgba(197,165,90,0.05) 2px, transparent 2px, transparent 8px);
  border: 3px double rgba(197, 165, 90, 0.4);
  border-radius: 16px 0 16px 0;
}
.concept-btn-ottoman.active {
  border-color: rgba(197, 165, 90, 1);
  box-shadow: 0 0 20px rgba(197, 165, 90, 0.3);
  animation: pulse-glow 2s infinite alternate;
}
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 10px rgba(197, 165, 90, 0.2); }
  50% { box-shadow: 0 0 25px rgba(197, 165, 90, 0.6); }
}

/* 7. Monolithic Matte */
.concept-btn-monolithic {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  box-shadow: inset 2px 2px 5px rgba(255,255,255,0.02), inset -2px -2px 5px rgba(0,0,0,0.5);
  border-radius: 4px;
}
.concept-btn-monolithic.active {
  background: #222;
  border-color: #333;
}

/* 8. World Cup VIP */
.concept-btn-world-cup {
  background: linear-gradient(180deg, #0a3a1a 0%, #05200d 100%);
  border: 1px solid #c5a55a;
  box-shadow: inset 0 10px 20px rgba(197, 165, 90, 0.1);
}
.concept-btn-world-cup.active {
  background: linear-gradient(180deg, #0d4a22 0%, #0a3a1a 100%);
  border: 2px solid #ffd700;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.3), inset 0 0 20px rgba(255, 215, 0, 0.2);
}
"""

with open(r'c:\Users\oarsl\Desktop\Is Dosyasi\huerrem-menu-concept\webapp\src\index.css', 'a', encoding='utf-8') as f:
    f.write(css_content)

print("CSS appended successfully.")
