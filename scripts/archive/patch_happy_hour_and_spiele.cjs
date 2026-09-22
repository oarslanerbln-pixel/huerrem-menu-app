const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, '..', 'src', 'data', 'menu.ts');
let content = fs.readFileSync(menuPath, 'utf8');

// The Happy Hour item to replace
const happyHourRegex = /\{\s*id:\s*'hh_angebot_1'[\s\S]*?subcategory:\s*'Happy Hour'\s*\}/;

const newHappyHour = `{
    id: 'hh_angebot_1',
    name: { DE: 'SHISHA + SOFTDRINK', EN: 'SHISHA + SOFTDRINK', TR: 'NARGİLE + MEŞRUBAT' },
    price: 13.90,
    description: { DE: 'Shisha + Softdrink Nachwahl\\nMontag-Freitag 14:00 - 19:00 Uhr', EN: 'Shisha + Softdrink of choice\\nMonday-Friday 2:00 PM - 7:00 PM', TR: 'Nargile + Seçmeli Meşrubat\\nPazartesi-Cuma 14:00 - 19:00' },
    imageUrl: '',
    category: 'happy_hour',
    subcategory: 'Happy Hour'
  },
  {
    id: 'hh_angebot_2',
    name: { DE: "PASTA, BURGER, SALAT, BOWL'S", EN: "PASTA, BURGER, SALAD, BOWL'S", TR: "MAKARNA, BURGER, SALATA, BOWL" },
    price: 9.90,
    description: { DE: 'Montag-Freitag | 16:00-19:00 Uhr\\nGenieße unsere Happy Hour und wähle dein Lieblingsgericht aus den Kategorien Pasta, Burger, Salat oder Bowl.\\nAusgenommen: Beef & Broccoli Penne sowie Beef Balance Bowl.', EN: 'Monday-Friday | 4:00 PM - 7:00 PM\\nEnjoy our Happy Hour and choose your favorite dish from the categories Pasta, Burger, Salad, or Bowl.\\nExcluded: Beef & Broccoli Penne and Beef Balance Bowl.', TR: 'Pazartesi-Cuma | 16:00-19:00\\nHappy Hour fırsatımızın tadını çıkarın ve Makarna, Burger, Salata veya Bowl kategorilerinden favori yemeğinizi seçin.\\nHariç olanlar: Beef & Broccoli Penne ve Beef Balance Bowl.' },
    imageUrl: '',
    category: 'happy_hour',
    subcategory: 'Happy Hour'
  }`;

content = content.replace(happyHourRegex, newHappyHour);

// Insert Spiele item at the end of the menuData array
// Search for `];\s*\/\/\s*Quiz Questions mapped for tags`
const endOfMenuDataRegex = /(\];\s*\/\/\s*Quiz Questions mapped for tags)/;
const spieleItem = `  {
    id: 'sp_1',
    name: { DE: 'Spiele & Spaß', EN: 'Games & Fun', TR: 'Oyun & Eğlence' },
    price: 0,
    description: { DE: 'Fragen Sie bitte unser Team für die Spiele.', EN: 'Please ask our team for the games.', TR: 'Oyunlar için lütfen ekibimize danışın.' },
    imageUrl: '',
    category: 'spiele',
    subcategory: 'Spiele'
  }
`;

content = content.replace(endOfMenuDataRegex, spieleItem + '$1');

fs.writeFileSync(menuPath, content, 'utf8');
console.log('Successfully updated Happy Hour and added Spiele category!');
