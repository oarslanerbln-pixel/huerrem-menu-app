// Read-only menu access for the guest app (no Auth/Storage SDKs in this chunk).
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { MenuItem } from '../data/menu';

export const MENU_COLLECTION = 'menuItems';

/** Live subscription to the menu. Calls onError if Firestore is unreachable or denies access. */
export function subscribeMenu(onItems: (items: MenuItem[]) => void, onError?: (err: Error) => void) {
  if (!db) {
    onError?.(new Error('Firebase not configured'));
    return () => {};
  }
  return onSnapshot(
    collection(db, MENU_COLLECTION),
    snap => onItems(snap.docs.map(d => ({ ...(d.data() as MenuItem), id: d.id }))),
    err => onError?.(err),
  );
}
