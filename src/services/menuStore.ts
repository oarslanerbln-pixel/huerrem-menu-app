import { deleteDoc, doc, setDoc, writeBatch } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db } from '../config/firebase';
import { adminStorage } from '../config/firebaseAdmin';
import type { MenuItem } from '../data/menu';
import { MENU_COLLECTION } from './menuFeed';

// Firestore rejects `undefined` values; a JSON round-trip drops them.
const clean = (item: MenuItem): MenuItem => JSON.parse(JSON.stringify(item));

export async function saveMenuItem(item: MenuItem) {
  if (!db) throw new Error('Firebase not configured');
  await setDoc(doc(db, MENU_COLLECTION, item.id), clean(item));
}

export async function deleteMenuItem(id: string) {
  if (!db) throw new Error('Firebase not configured');
  await deleteDoc(doc(db, MENU_COLLECTION, id));
}

/** One-time import of the bundled menu (src/data/menu.ts) into Firestore. */
export async function importMenu(items: MenuItem[]) {
  if (!db) throw new Error('Firebase not configured');
  // Firestore batches are limited to 500 writes.
  for (let i = 0; i < items.length; i += 400) {
    const batch = writeBatch(db);
    items.slice(i, i + 400).forEach(item => batch.set(doc(db!, MENU_COLLECTION, item.id), clean(item)));
    await batch.commit();
  }
}

/** Downscales a photo to max 1200px WebP in the browser, uploads it and returns its public URL. */
export async function uploadMenuImage(file: File, itemId: string): Promise<string> {
  const bitmap = await createImageBitmap(file).catch(() => {
    throw new Error('Bild konnte nicht gelesen werden. Bitte ein JPG-, PNG- oder WebP-Foto wählen.');
  });
  const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(b => (b ? resolve(b) : reject(new Error('Bild konnte nicht verarbeitet werden'))), 'image/webp', 0.85),
  );
  const fileRef = ref(adminStorage(), `menu-images/${itemId}-${Date.now()}.webp`);
  await uploadBytes(fileRef, blob, { contentType: 'image/webp' });
  return getDownloadURL(fileRef);
}
