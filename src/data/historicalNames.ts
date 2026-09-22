export const historicalNames = [
  "HÜRREM SULTAN",
  "ROXELANA",
  "ROKSOLANA",
  "ROXELANE",
  "SÜLEYMAN",
  "SULEIMAN",
  "СУЛЕЙМАН",
  "MIHRIMAH",
  "МИХРИМАХ",
  "RÜSTEM",
  "RUSTEM",
  "IBRAHIM",
  "ИБРАГИМ",
  "SINAN",
  "СИНАН",
  "VALIDE HAFSA",
  "MAHIDEVRAN",
  "GÜLFEM",
  "BAYEZID",
  "БАЯЗИД",
  "SELIM",
  "СЕЛИМ",
  "CIHANGIR"
];

// No Arabic characters. Using Latin, Cyrillic, Greek, and Astrolabe/Geometric symbols.
export const mysticChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯΔΘΛΞΠΣΦΨΩ✧⚝☾☼♄☿∾∞⊗⊚⧫⨀100101";

// Helper to get a random character
export const getRandomMysticChar = () => {
  return mysticChars[Math.floor(Math.random() * mysticChars.length)];
};
