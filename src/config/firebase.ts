import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator, collection, addDoc, onSnapshot, query, orderBy, where, updateDoc, doc, serverTimestamp, type Firestore } from 'firebase/firestore';

// Web-Konfiguration aus Firebase Console → Projekteinstellungen → Meine Apps.
// Werte kommen aus .env.local (siehe .env.example); sie sind nicht geheim,
// der Schutz der Daten erfolgt über firestore.rules / storage.rules.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBPoYsQ4OxEG4t6TIvpSQWGO8grtoTWp2s',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'huerrem-menu-app-1.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'huerrem-menu-app-1',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'huerrem-menu-app-1.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '723722038109',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:723722038109:web:eb5384611f98ab21dcd6b4',
};

export const isFirebaseConfigured = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

export const app: FirebaseApp | null = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
export const db: Firestore | null = app ? getFirestore(app) : null;

// Local development against `firebase emulators:start` (see ADMIN_SETUP.md).
export const useEmulators = import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true';
if (db && useEmulators) connectFirestoreEmulator(db, '127.0.0.1', 8080);

// Helper Functions
export const sendOrderToBar = async (orderData: Record<string, unknown>) => {
  if (!db) {
    console.warn("Firebase yapılandırılmamış. Sipariş mock olarak konsola yazdırıldı:", orderData);
    return Promise.resolve({ id: "mock-id-123" });
  }

  return await addDoc(collection(db, "alchemist_orders"), {
    ...orderData,
    status: 'pending',
    createdAt: serverTimestamp()
  });
};

export const completeOrder = async (orderId: string) => {
  if (!db) return;
  const orderRef = doc(db, "alchemist_orders", orderId);
  await updateDoc(orderRef, {
    status: 'completed'
  });
};

export const subscribeToOrders = (callback: (orders: Record<string, unknown>[]) => void) => {
  if (!db) {
    console.warn("Firebase yapılandırılmamış. Canlı dinleme çalışmıyor.");
    return () => {};
  }

  const q = query(
    collection(db, "alchemist_orders"),
    where("status", "==", "pending"),
    orderBy("createdAt", "asc")
  );

  return onSnapshot(q, (snapshot) => {
    const orders: Record<string, unknown>[] = [];
    snapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });
    callback(orders);
  });
};
