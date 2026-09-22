const fs = require('fs');
const src = 'C:\\Users\\oarsl\\.gemini\\antigravity-ide\\brain\\cd740e31-f6e6-4b7f-8e36-3b5f5db3127d\\shisha_concept_led_turquoise_1784133601039.png';
const dest = 'c:\\Users\\oarsl\\Desktop\\Is Dosyasi\\huerrem-menu-concept\\webapp\\public\\images\\shisha\\shisha_concept_led_turquoise.png';
fs.copyFileSync(src, dest);
console.log('Image copied successfully!');
