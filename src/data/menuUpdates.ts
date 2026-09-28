import type { MenuItem } from './menu';

/**
 * Curated data updates for the live menu (Firestore). Every operation is idempotent:
 * allergens/additives are only added or removed when needed, text replacements only
 * apply while the old text is still present, and new items are only created if missing.
 * The admin panel lists pending changes and applies them with one click.
 */

type Field = 'name' | 'description';

export interface ItemPatch {
  itemId: string;
  note: string;
  addAllergens?: string[];
  removeAllergens?: string[];
  addAdditives?: string[];
  /** Text replacement in all languages (or only `lang`) of a field. */
  replace?: { field: Field; from: string; to: string; lang?: string }[];
  /** New price – only applied while the item still has the old price `from`. */
  price?: { from: number; to: number };
  /** Line appended to the description in every language the item already has (once). */
  appendDescription?: Record<string, string>;
}

export interface MenuUpdate {
  id: string;
  title: string;
  patches: ItemPatch[];
  newItems: MenuItem[];
}

const L = (DE: string, EN: string, TR: string, FR: string, ES: string, RU: string) => ({ DE, EN, TR, FR, ES, RU });
const NEW_BADGE = L('NEU', 'NEW', 'YENİ', 'NOUVEAU', 'NUEVO', 'НОВИНКА');

const milk = (itemId: string, what: string): ItemPatch => ({ itemId, note: `${what}: Milch (G) ergänzt`, addAllergens: ['G'] });
const priceComma = (itemId: string, prices: string[]): ItemPatch => ({
  itemId,
  note: 'Preisangabe im Text: Komma statt Punkt',
  replace: prices.map(p => ({ field: 'description' as const, from: `${p} €`, to: `${p.replace('.', ',')} €`, lang: 'DE' })),
});

const euro = (n: number) => `${n.toFixed(2).replace('.', ',')} €`;
const priceUpdate = ([itemId, from, to]: [string, number, number]): ItemPatch => ({
  itemId,
  note: `Preis laut Originalkarte: ${euro(from)} → ${euro(to)}`,
  price: { from, to },
});
/** Variant price inside the description, in every spelling used across the languages. */
const variantPrice = (itemId: string, pairs: [string, string][]): ItemPatch => {
  const spellings = (v: string) => {
    const [a, b] = v.split(',');
    return [`${a},${b} €`, `${a}.${b} €`, `${a},${b}€`, `€${a}.${b}`, `${a},${b} евро`];
  };
  return {
    itemId,
    note: `Variantenpreis im Text: ${pairs.map(([f, t]) => `${f} € → ${t} €`).join(', ')}`,
    replace: pairs.flatMap(([from, to]) => {
      const t = spellings(to);
      return spellings(from).map((f, i) => ({ field: 'description' as const, from: f, to: t[i] }));
    }),
  };
};

export const MENU_UPDATES: MenuUpdate[] = [
  {
    id: '2026-09-27-lmiv-neu-im-sortiment',
    title: 'Allergen-Prüfung (LMIV) & „Neu im Sortiment“',
    patches: [
      // Crustaceans (B) were missing – scampi/shrimps are not fish (D).
      { itemId: 'f_pasta_7', note: 'Scampi: Krebstiere (B) ergänzt', addAllergens: ['B'] },
      { itemId: 'f_pasta_8', note: 'Scampi: Krebstiere (B) ergänzt', addAllergens: ['B'] },
      { itemId: 'food_snack_2', note: 'Shrimps: Krebstiere (B) ergänzt', addAllergens: ['B'] },
      { itemId: 'food_snack_6', note: 'Shrimps: Krebstiere (B) ergänzt', addAllergens: ['B'] },
      // Peanuts (E)
      { itemId: 'food_snack_1', note: 'Erdnüsse: Erdnüsse (E) ergänzt', addAllergens: ['E'] },
      { itemId: 'food_snack_3', note: 'Erdnüsse/Flips (E) und Salzstangen (A) ergänzt', addAllergens: ['A', 'E'] },
      { itemId: 'd_shake_5', note: 'Erdnussbutter: Erdnüsse (E) ergänzt', addAllergens: ['E'] },
      // Hummus = tahini (sesame, N); honey-mustard dressing (M)
      { itemId: 'food_starter_3', note: 'Hummus/Tahin: Sesam (N), Fladenbrot: Gluten (A) ergänzt', addAllergens: ['A', 'N'] },
      { itemId: 'f_haupt_1', note: 'Hummus-Dip: Sesam (N) ergänzt', addAllergens: ['N'] },
      { itemId: 'f_haupt_3', note: 'Hummus: Sesam (N) ergänzt', addAllergens: ['N'] },
      { itemId: 'f_bowl_1', note: 'Hummus: Sesam (N), Honig-Senf-Dressing: Senf (M) ergänzt', addAllergens: ['M', 'N'] },
      { itemId: 'f_bowl_2', note: 'Hummus: Sesam (N) ergänzt; Schreibweise „Hummus“', addAllergens: ['N'], replace: [{ field: 'description', from: 'Humus', to: 'Hummus', lang: 'DE' }] },
      { itemId: 'f_bowl_3', note: 'Hummus: Sesam (N), Honig-Senf-Dressing: Senf (M) ergänzt; Schreibweise „Hummus“', addAllergens: ['M', 'N'], replace: [{ field: 'description', from: 'Humus', to: 'Hummus', lang: 'DE' }] },
      // Eggs (C)
      { itemId: 'f_burger_1', note: 'Trüffel-Mayonnaise: Eier (C) ergänzt', addAllergens: ['C'] },
      { itemId: 'f_bowl_4', note: 'Caesar-Dressing: Eier (C) ergänzt', addAllergens: ['C'] },
      { itemId: 'f_haupt_4', note: 'Panade: Eier (C) ergänzt', addAllergens: ['C'] },
      { itemId: 'f_pasta_3', note: 'Panierte Hähnchenstücke: Eier (C) ergänzt', addAllergens: ['C'] },
      { itemId: 'food_dessert_2', note: 'Brownie: Eier (C) ergänzt', addAllergens: ['C'] },
      { itemId: 'food_dessert_5', note: 'Kaiserschmarrn: Eier (C) ergänzt; Preis mit Komma', addAllergens: ['C'], replace: [{ field: 'description', from: '+2.00 €', to: '+2,00 €', lang: 'DE' }] },
      // Gluten (A), nuts (H)
      { itemId: 'f_pasta_6', note: 'Rigatoni: Gluten (A) ergänzt', addAllergens: ['A'] },
      { itemId: 'food_dessert_3', note: 'Nutella-Sauce: Schalenfrüchte (H) ergänzt', addAllergens: ['H'] },
      // Milk (G) in milk drinks
      milk('d_coffee_cappuccino', 'Cappuccino'),
      milk('d_coffee_latte', 'Latte Macchiato'),
      milk('d_coffee_milchkaffee', 'Milchkaffee'),
      milk('d_hs_1', 'Chai Latte'),
      milk('d_hs_2', 'Matcha Latte'),
      milk('d_hs_5', 'Sahlep'),
      milk('d_hot_choco', 'Heiße Schokolade'),
      milk('d_heisse_schokolade', 'Dunkle Schokolade'),
      { itemId: 'd_white_chocolate', note: 'Weiße Schokolade: Milch (G), Spekulatius: Gluten (A) ergänzt', addAllergens: ['A', 'G'] },
      milk('d5', 'Strawberry Matcha Chill (Matcha-Milch)'),
      // Lupin (P) is not listed on the Menury source card for this drink
      { itemId: 'd1', note: 'Lupine (P) entfernt (laut Menury-Karte nicht enthalten); Schreibweise „Macchiato“', removeAllergens: ['P'], replace: [{ field: 'name', from: 'MACCHIATTO', to: 'MACCHIATO' }] },
      // Confirmed by the restaurant (2026-09-26)
      milk('d3', 'Mango Matcha Fusion'),
      milk('d4', 'Lila Mango Traum'),
      milk('ss_iced_matcha', 'Iced Matcha'),
      { itemId: 'food_dessert_1', note: 'Cheesecake: Eier (C) ergänzt (vom Restaurant bestätigt)', addAllergens: ['C'] },
      { itemId: 'food_dessert_6', note: 'Apfelstrudel: Eier (C) ergänzt (vom Restaurant bestätigt)', addAllergens: ['C'] },
      { itemId: 'd_sm_1', note: 'Keine Schalenfrüchte (H) – vom Restaurant bestätigt (Kokos ist kein LMIV-Allergen)', removeAllergens: ['H'] },
      { itemId: 'd_sm_3', note: 'Keine Schalenfrüchte (H) – vom Restaurant bestätigt (Kokos ist kein LMIV-Allergen)', removeAllergens: ['H'] },
      // Burger sauce may contain egg (unconfirmed) – declared as a precaution
      { itemId: 'f_burger_2', note: 'Burger-Sauce: Eier (C) vorsorglich ergänzt', addAllergens: ['C'] },
      { itemId: 'f_burger_3', note: 'Burger-Sauce: Eier (C) vorsorglich ergänzt', addAllergens: ['C'] },
      // Happy Hour ends at 18:00
      ...['hh_angebot_1', 'hh_angebot_2'].map(itemId => ({
        itemId,
        note: 'Happy Hour bis 18:00 Uhr',
        replace: [{ field: 'description' as const, from: '19:00', to: '18:00' }, { field: 'description' as const, from: '19h00', to: '18h00' }, { field: 'description' as const, from: '16:00. -', to: '16:00 -' }],
      })),
      // Additives: caffeine (13), colour (1), sweeteners (8), phenylalanine (9), taurine (17), quinine (14)
      { itemId: 'd9', note: 'Cola: Farbstoff (1), koffeinhaltig (13)', addAdditives: ['1', '13'] },
      { itemId: 'd10', note: 'Cola Zero: Farbstoff (1), Süßungsmittel (8), Phenylalaninquelle (9), koffeinhaltig (13)', addAdditives: ['1', '8', '9', '13'] },
      { itemId: 'd7', note: 'Fritz-Kola: Farbstoff (1), koffeinhaltig (13)', addAdditives: ['1', '13'] },
      { itemId: 'd8', note: 'Fritz-Kola Zero: Farbstoff (1), Süßungsmittel (8), koffeinhaltig (13)', addAdditives: ['1', '8', '13'] },
      { itemId: 'd19', note: 'Club-Mate: koffeinhaltig (13)', addAdditives: ['13'] },
      { itemId: 'd_sd_redbull', note: 'Red Bull: koffeinhaltig (13), mit Taurin (17)', addAdditives: ['13', '17'] },
      { itemId: 'd_sd_28black', note: '28 Black: koffeinhaltig (13)', addAdditives: ['13'] },
      { itemId: 'd_sig_1', note: 'Tonic Water: chininhaltig (14)', addAdditives: ['14'] },
      // Text polish
      { itemId: 'd_coffee_crema', note: 'Schreibweise „Caffè Crema“', replace: [{ field: 'name', from: 'Cafe Crema', to: 'Caffè Crema' }] },
      { itemId: 'hh_angebot_2', note: 'Schreibweise „BOWLS“', replace: [{ field: 'name', from: "BOWL'S", to: 'BOWLS' }, { field: 'name', from: "БОУЛ'С", to: 'БОУЛЫ' }] },
      priceComma('d13', ['3.20', '8.20']),
      ...['d_juice_1', 'd_juice_2', 'd_juice_3', 'd_juice_4', 'd_juice_5', 'd_juice_6', 'd_juice_7', 'd_juice_8', 'd_juice_9'].map(id => priceComma(id, ['3.20', '4.90'])),
      priceComma('food_dessert_8', ['6.90', '8.90']),
    ],
    newItems: [
      {
        id: 'new_coffee_frappe',
        name: L('Coffee Frappé', 'Coffee Frappé', 'Coffee Frappé', 'Café Frappé', 'Café Frappé', 'Кофе-фраппе'),
        price: 8.9,
        description: L(
          'Cremiger, eisgekühlter Kaffee-Frappé mit luftiger Sahne.\nMit Vanille oder Karamell: 9,50 €',
          'Creamy iced coffee frappé topped with fluffy whipped cream.\nWith vanilla or caramel: €9.50',
          'Çırpılmış krema ile kremalı, buz gibi kahve frappé.\nVanilyalı veya karamelli: 9,50 €',
          'Frappé au café crémeux et glacé, surmonté de crème fouettée.\nVanille ou caramel : 9,50 €',
          'Frappé de café cremoso y helado con nata montada.\nCon vainilla o caramelo: 9,50 €',
          'Сливочный охлаждённый кофе-фраппе со взбитыми сливками.\nС ванилью или карамелью: 9,50 €',
        ),
        category: 'drinks',
        subcategory: 'Neu im Sortiment',
        badge: NEW_BADGE,
        allergens: ['G'],
        additives: ['13'],
        tags: ['coffee', 'creamy', 'cold'],
        available: true,
      },
      {
        id: 'new_strawberry_shake',
        name: L('Strawberry Shake', 'Strawberry Shake', 'Çilekli Shake', 'Shake à la fraise', 'Batido de fresa', 'Клубничный шейк'),
        price: 8.5,
        description: L(
          'Cremiger Shake aus Erdbeeren, gekrönt mit luftiger Sahne und fruchtiger Erdbeersauce.',
          'Creamy strawberry shake crowned with whipped cream and a fruity strawberry sauce.',
          'Çırpılmış krema ve meyveli çilek sosuyla taçlandırılmış kremalı çilekli shake.',
          'Shake crémeux à la fraise, couronné de crème fouettée et d’un coulis de fraise.',
          'Batido cremoso de fresa coronado con nata montada y salsa de fresa.',
          'Сливочный клубничный шейк со взбитыми сливками и клубничным соусом.',
        ),
        category: 'drinks',
        subcategory: 'Neu im Sortiment',
        badge: NEW_BADGE,
        allergens: ['G'],
        tags: ['sweet', 'creamy', 'fruity'],
        available: true,
      },
      {
        id: 'new_huerrem_vibe',
        name: L('Hürrem Vibe – Choose your Bull', 'Hürrem Vibe – Choose your Bull', 'Hürrem Vibe – Choose your Bull', 'Hürrem Vibe – Choose your Bull', 'Hürrem Vibe – Choose your Bull', 'Hürrem Vibe – Choose your Bull'),
        price: 10.9,
        description: L(
          'Wähle deine Red-Bull-Sorte – wir kreieren dazu den passenden fruchtig-erfrischenden Signature-Drink.',
          'Choose your Red Bull flavour – we create a matching fruity, refreshing signature drink.',
          'Red Bull çeşidini seç – sana uygun meyveli ve ferahlatıcı bir signature içecek hazırlayalım.',
          'Choisis ta saveur de Red Bull – nous créons la boisson signature fruitée et rafraîchissante assortie.',
          'Elige tu sabor de Red Bull: creamos la bebida signature afrutada y refrescante a juego.',
          'Выбери вкус Red Bull – мы приготовим к нему фруктовый освежающий фирменный напиток.',
        ),
        category: 'drinks',
        subcategory: 'Neu im Sortiment',
        badge: NEW_BADGE,
        isSignature: true,
        additives: ['13', '17'],
        tags: ['fresh', 'fruity', 'intense'],
        available: true,
      },
    ],
  },
  {
    id: '2026-09-28-preise-originalkarte',
    title: 'Preise laut Originalkarte (Menury) & fehlende Artikel',
    patches: [
      ...([
      ['food_soup_1', 6, 6.5], // Linsensuppe
      ['food_soup_2', 6, 6.5], // Tomatensuppe
      ['d9', 3.6, 3.9], // Coca-Cola
      ['d10', 3.6, 3.9], // Coca-Cola Zero
      ['d11', 3.6, 3.9], // Fanta
      ['d12', 3.6, 3.9], // Sprite
      ['d14', 3.8, 3.9], // Churchill 0,2l
      ['d13', 3.2, 3.4], // Stilles & Mineral Wasser
      ['d16', 3.6, 3.9], // Schweppes Ginger Ale
      ['d17', 3.6, 3.9], // Schweppes Wild Berry
      ['d18', 4.2, 4.8], // Rixdorfer Fassbrause
      ['d19', 4.6, 4.8], // Club-Mate
      ['d20', 4.6, 4.9], // Elephant Bay
      ['d_sd_moloko', 4.6, 4.9], // Moloko
      ['d_sd_redbull', 4.9, 5.2], // RedBull
      ['d_tea_cay', 3.2, 3.5], // Türkischer Cay groß
      ['t_huerrem', 5.2, 5.6], // Hürrem Tee
      ['d_tea_kamille', 4.5, 4.9], // BIO Kamille Tee mit Honig
      ['d_tea_salbei', 4.5, 4.9], // BIO Salbei Tee mit Honig
      ['t_ingwer_minze', 4.5, 4.9], // Ingwer Minze Tee
      ['d_tea_sencha', 4.5, 4.9], // BIO Japanischer Sencha Tee mit Honig
      ['d_tea_hotbeauty', 5.2, 5.6], // BIO Hot Beauty Tee mit Honig
      ['d_tea_fourseason', 5.2, 5.6], // BIO Four Season Tee mit Honig
      ['d_tea_bluedream', 5.2, 5.6], // Blue Dream Tee mit Honig
      ['d_tea_mango', 5.2, 5.6], // Sweet Mango Tee mit Honig
      ['d_tea_apple', 5.2, 5.6], // Orient Apple Tee mit Honig
      ['d_tea_blossom', 5.2, 5.6], // BIO Blossom Tee mit Honig
      ['d_coffee_espresso', 2.8, 3.3], // Espresso
      ['d_coffee_crema', 3.4, 3.6], // Caffè Crema
      ['d_coffee_cappuccino', 3.9, 4.6], // Cappuccino
      ['d_coffee_latte', 4.6, 4.8], // Latte Macchiato
      ['d_coffee_mokka', 3.6, 3.9], // Türkischer Kaffee
      ['d_hs_5', 6.03, 4.8], // Sahlep
      ['d_hs_1', 4.5, 4.8], // Chai Latte
      ['d_hs_2', 5.5, 6.9], // Matcha Latte
      ['d_juice_1', 3.2, 3.8], // Orangensaft
      ['d_juice_2', 3.2, 3.8], // Apfelsaft
      ['d_juice_3', 3.2, 3.8], // Maracujasaft
      ['d_juice_4', 3.2, 3.8], // Mangosaft
      ['d_juice_5', 3.2, 3.8], // KiBa (Kirsch-Bananen-Saft)
      ['d_juice_6', 3.2, 3.8], // Kirschnektar
      ['d_juice_7', 3.2, 3.8], // Bananennektar
      ['d_juice_8', 3.2, 3.8], // Cranberrysaft
      ['d_juice_9', 3.2, 3.8], // Ananassaft
      ['d_hit_1', 6.9, 8.5], // Yuzu
      ['d_hit_2', 6.9, 8.5], // Peach
      ['d_hit_3', 6.9, 8.5], // Wildberry
      ['d_hit_4', 6.9, 8.5], // Sweet Melon
      ['d_hit_5', 6.9, 8.5], // Acai Strawberry
      ['d_hit_6', 6.9, 8.5], // Cotton Candy
      ['d_hit_7', 6.9, 8.5], // Kaktus Feige
      ['d_fh_1', 6.9, 7.5], // Hibiscus Orange Limo
      ['d_fh_2', 6.9, 7.5], // 53
      ['d_fh_3', 6.9, 7.5], // Blue Wonder
      ['d_fh_4', 6.9, 7.5], // Softy Gold
      ['d_fh_5', 6.9, 7.5], // Aloe Vera
      ['d_fh_6', 7.4, 7.5], // Berry Yakult Peach Limo
      ['d_fh_7', 7.4, 7.5], // Pink Lover
      ['d_sig_2', 8.9, 9.4], // Coconut Kiss
      ['d_sig_6', 8.9, 9.4], // Solero
      ['d_fh_8', 7.4, 7.5], // Rosé
      ['d_sm_1', 7.9, 8.5], // Very Berry
      ['d_sm_2', 7.9, 8.5], // Green Goddess
      ['d_sm_3', 7.9, 8.5], // Pink Punch
      ['d_sm_4', 7.9, 8.5], // Orange Glow
      ['d_sm_5', 7.9, 8.5], // Pina Colada
      ['d_shake_2', 7.9, 8.5], // Midnight Cravings
      ['d_shake_3', 7.9, 8.5], // Hazelnut Bliss
      ['d_shake_4', 7.9, 8.5], // Tropical Escape
      ['d_shake_5', 7.9, 8.5], // Banana Boost
      ['d_sd_28black', 4.9, 5.2], // 28 Black (Schwarze Dose)
      ['food_starter_1', 5.5, 5.9], // Edamame
      ['food_starter_2', 5.5, 5.9], // Acılı Ezme
      ['food_starter_4', 5.5, 5.9], // Frühlingsrollen
      ['food_starter_3', 5.5, 5.9], // Hummus
      ['f_haupt_3', 16.9, 18.9], // Türkische Grillköfte
      ['f_haupt_4', 16.9, 17.9], // Goldenes Hähnchenschnitzel
      ['f_haupt_1', 16.9, 17.9], // Mexican Style Fajitas
      ['food_snack_5', 4.9, 5.9], // Classic Fries
      ['f_ff_2', 4.9, 5.9], // Curly Fries
      ['f_ff_3', 4.9, 5.9], // Sweet Potato Fries
      ['food_snack_6', 4.9, 5.9], // Extra Finger Food
      ['food_dessert_5', 12.9, 12.5], // Austrian Kaiserschmarrn
      ['c_butterfly', 8.9, 9.4], // Butterfly Pea Flower Tea
      ['food_snack_1', 5.9, 6.9], // Hürrem Nuss Deluxe
      ['d7', 3.6, 3.9], // Fritz Cola
      ['d8', 3.6, 3.9], // Fritz Cola Zero
      ['ss_iced_americano', 6.9, 5.5], // Iced Americano
      ['t_linden', 4.5, 4.9], // Lindenblüten Tee
      ['d_white_chocolate', 4.9, 5.2], // Weiße Schokolade
      ['d_heisse_schokolade', 4.9, 5.2], // Dunkle Schokolade
      ['d_shake_1', 7.9, 8.5], // Royal Delight
      ['f_haupt_5', 16.9, 17.9], // Pfefferhähnchen-Traum
      ['f_haupt_2', 16.9, 18.9], // Grillspieß Oriental
      ['t_cay_klein', 1.9, 2.5], // Kleiner Türkischer Tee
      ['c_espresso_doppio', 3.9, 4.3], // Espresso Doppio
      ] as [string, number, number][]).map(priceUpdate),
      // Size/extra prices written in the descriptions
      variantPrice('d13', [['3,20', '3,40'], ['8,20', '8,90']]),
      ...['d_juice_1', 'd_juice_2', 'd_juice_3', 'd_juice_4', 'd_juice_5', 'd_juice_6', 'd_juice_7', 'd_juice_8', 'd_juice_9']
        .map(id => variantPrice(id, [['3,20', '3,80'], ['4,90', '5,60']])),
      variantPrice('f_haupt_3', [['18,90', '19,90']]),
      variantPrice('f_haupt_2', [['18,90', '19,90']]),
      variantPrice('food_dessert_8', [['8,90', '8,50']]),
      {
        itemId: 'd6',
        note: 'Variante laut Originalkarte: mit Vanille- oder Karamellsirup 7,40 €',
        appendDescription: L(
          'Mit Vanille- oder Karamellsirup: 7,40 €',
          'With vanilla or caramel syrup: €7.40',
          'Vanilya veya karamel şuruplu: 7,40 €',
          'Avec sirop vanille ou caramel : 7,40 €',
          'Con sirope de vainilla o caramelo: 7,40 €',
          'С ванильным или карамельным сиропом: 7,40 €',
        ),
      },
      {
        itemId: 't_ingwer_minze',
        note: 'Variante laut Originalkarte: mit Zitrone 5,20 €',
        appendDescription: L('Mit Zitrone: 5,20 €', 'With lemon: €5.20', 'Limonlu: 5,20 €', 'Avec citron : 5,20 €', 'Con limón: 5,20 €', 'С лимоном: 5,20 €'),
      },
    ],
    newItems: [
      {
        id: 'food_soup_kuerbis',
        name: L('Cremige Kürbissuppe', 'Creamy Pumpkin Soup', 'Kremalı Balkabağı Çorbası', 'Velouté de potiron', 'Crema de calabaza', 'Сливочный тыквенный суп'),
        price: 7.5,
        description: L(
          'Samtig, aromatisch und hausgemacht – serviert mit einer Scheibe knusprigem Kürbiskernbrot.',
          'Velvety, aromatic and homemade – served with a slice of crispy pumpkin seed bread.',
          'Kadifemsi, aromatik ve ev yapımı – bir dilim çıtır kabak çekirdekli ekmekle servis edilir.',
          'Onctueux, aromatique et fait maison – servi avec une tranche de pain croustillant aux graines de courge.',
          'Aterciopelada, aromática y casera, servida con una rebanada de pan crujiente de pipas de calabaza.',
          'Бархатистый, ароматный, домашний – подаётся с ломтиком хрустящего хлеба с тыквенными семечками.',
        ),
        category: 'food',
        subcategory: 'Suppen',
        allergens: ['A', 'G'],
        available: true,
      },
      {
        id: 'f_haupt_oriental',
        name: L('Hähnchenbrust Oriental Style', 'Chicken Breast Oriental Style', 'Oryantal Usulü Tavuk Göğsü', 'Blanc de poulet à l’orientale', 'Pechuga de pollo al estilo oriental', 'Куриная грудка по-восточному'),
        price: 18.9,
        description: L(
          'Saftig gegarte, würzig marinierte Hähnchenbrust, serviert mit Basmati-Reis, frischem Beilagensalat, cremigem Hummus und scharfer Paprikapaste.',
          'Juicy, spicy-marinated chicken breast, served with basmati rice, fresh side salad, creamy hummus and hot pepper paste.',
          'Sulu, baharatlı marine edilmiş tavuk göğsü; basmati pirinci, taze yan salata, kremalı humus ve acı biber ezmesi ile servis edilir.',
          'Blanc de poulet juteux, mariné et épicé, servi avec du riz basmati, une salade fraîche, un houmous crémeux et une pâte de piment relevée.',
          'Jugosa pechuga de pollo marinada con especias, servida con arroz basmati, ensalada fresca, hummus cremoso y pasta de pimiento picante.',
          'Сочная пряно-маринованная куриная грудка с рисом басмати, свежим салатом, нежным хумусом и острой перечной пастой.',
        ),
        category: 'food',
        subcategory: 'Hauptgerichte',
        allergens: ['N'],
        tags: ['meat', 'spicy'],
        available: true,
      },
      {
        id: 'd_hc_dreamy_breeze',
        name: L('Dreamy Breeze Bubble Tea', 'Dreamy Breeze Bubble Tea', 'Dreamy Breeze Bubble Tea', 'Dreamy Breeze Bubble Tea', 'Dreamy Breeze Bubble Tea', 'Баббл-чай Dreamy Breeze'),
        price: 10.9,
        description: L(
          'Ube-Flavour, brauner Zuckersirup, Kokosmilch, Blaubeerperlen, Heavy Cream\nEin cremiger, exotischer Genuss mit überraschendem Look.',
          'Ube flavour, brown sugar syrup, coconut milk, blueberry pearls, heavy cream\nA creamy, exotic treat with a surprising look.',
          'Ube aroması, esmer şeker şurubu, hindistan cevizi sütü, yaban mersini incileri, krema\nŞaşırtıcı görünümüyle kremalı, egzotik bir lezzet.',
          'Arôme ube, sirop de sucre brun, lait de coco, perles de myrtille, crème épaisse\nUn délice crémeux et exotique au look surprenant.',
          'Sabor ube, sirope de azúcar moreno, leche de coco, perlas de arándano, nata espesa\nUn placer cremoso y exótico con un aspecto sorprendente.',
          'Вкус убе, сироп из коричневого сахара, кокосовое молоко, черничные жемчужины, жирные сливки\nСливочное экзотическое удовольствие с неожиданным видом.',
        ),
        category: 'drinks',
        subcategory: 'High-Class Cocktails',
        allergens: ['G'],
        available: true,
      },
    ],
  },
];

const ALLERGEN_ORDER = 'ABCDEFGHLMNOPR';
const sortAllergens = (codes: string[]) => [...new Set(codes)].sort((a, b) => ALLERGEN_ORDER.indexOf(a) - ALLERGEN_ORDER.indexOf(b));
const sortAdditives = (codes: string[]) => [...new Set(codes)].sort((a, b) => Number(a) - Number(b));

function replaceText(value: MenuItem['name'], from: string, to: string, lang?: string): MenuItem['name'] {
  if (typeof value === 'string') return !lang || lang === 'DE' ? value.split(from).join(to) : value;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(value || {})) out[k] = !lang || lang === k ? v.split(from).join(to) : v;
  return out;
}

function appendLine(value: MenuItem['description'], lines: Record<string, string>): MenuItem['description'] {
  if (!value) return value;
  const add = (v: string, line?: string) => (!line || v.includes(line) ? v : `${v}\n${line}`);
  if (typeof value === 'string') return add(value, lines.DE);
  return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, add(v, lines[k])]));
}

/** Returns the patched item, or null if the patch changes nothing. */
export function applyPatch(item: MenuItem, patch: ItemPatch): MenuItem | null {
  const next: MenuItem = { ...item };
  if (patch.addAllergens || patch.removeAllergens) {
    const set = new Set([...(item.allergens || []), ...(patch.addAllergens || [])]);
    patch.removeAllergens?.forEach(c => set.delete(c));
    next.allergens = sortAllergens([...set]);
  }
  if (patch.addAdditives) next.additives = sortAdditives([...(item.additives || []), ...patch.addAdditives]);
  patch.replace?.forEach(r => { next[r.field] = replaceText(next[r.field], r.from, r.to, r.lang); });
  if (patch.price && item.price === patch.price.from) next.price = patch.price.to;
  if (patch.appendDescription) next.description = appendLine(next.description, patch.appendDescription);
  return JSON.stringify(next) === JSON.stringify(item) ? null : next;
}

export interface PendingChange { item: MenuItem; notes: string[]; isNew: boolean }

/** Items that would change (or be created) if the update were applied to `items`. */
export function pendingChanges(items: MenuItem[], update: MenuUpdate): PendingChange[] {
  const byId = new Map(items.map(i => [i.id, i]));
  const changed = new Map<string, PendingChange>();
  for (const patch of update.patches) {
    const current = changed.get(patch.itemId)?.item || byId.get(patch.itemId);
    if (!current) continue; // deleted by the restaurant – leave it alone
    const next = applyPatch(current, patch);
    if (next) changed.set(patch.itemId, { item: next, notes: [...(changed.get(patch.itemId)?.notes || []), patch.note], isNew: false });
  }
  for (const item of update.newItems) {
    if (!byId.has(item.id)) changed.set(item.id, { item, notes: [`Neuer Artikel${item.subcategory ? ` in „${item.subcategory}“` : ''}`], isNew: true });
  }
  return [...changed.values()];
}

/** Applies all updates to a list of items (used for the bundled fallback menu and the first import). */
export function applyAllUpdates(items: MenuItem[]): MenuItem[] {
  return MENU_UPDATES.reduce((acc, update) => {
    const changes = new Map(pendingChanges(acc, update).map(c => [c.item.id, c.item]));
    const merged = acc.map(i => changes.get(i.id) || i);
    return [...merged, ...update.newItems.filter(n => !acc.some(i => i.id === n.id))];
  }, items);
}
