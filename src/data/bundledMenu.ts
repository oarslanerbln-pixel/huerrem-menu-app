import { menuData } from './menu';
import { applyAllUpdates } from './menuUpdates';

/** Bundled menu with all curated updates applied (fallback + first import). */
export const bundledMenu = applyAllUpdates(menuData);
