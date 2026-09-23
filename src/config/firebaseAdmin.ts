// Auth & Storage are only needed by the admin panel; kept out of the guest bundle.
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth';
import { connectStorageEmulator, getStorage, type FirebaseStorage } from 'firebase/storage';
import { app, useEmulators } from './firebase';

let auth: Auth | undefined;
let storage: FirebaseStorage | undefined;

export function adminAuth(): Auth {
  if (!app) throw new Error('Firebase not configured');
  if (!auth) {
    auth = getAuth(app);
    if (useEmulators) connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
  }
  return auth;
}

export function adminStorage(): FirebaseStorage {
  if (!app) throw new Error('Firebase not configured');
  if (!storage) {
    storage = getStorage(app);
    if (useEmulators) connectStorageEmulator(storage, '127.0.0.1', 9199);
  }
  return storage;
}
