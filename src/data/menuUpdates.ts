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
      { itemId: 'hh_angebot_2', note: 'Schreibweise „BOWLS“', replace: [{ field: 'name', from: "BOWL'S", to: 'BOWLS' }] },
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
    if (!byId.has(item.id)) changed.set(item.id, { item, notes: ['Neuer Artikel in „Neu im Sortiment“'], isNew: true });
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
