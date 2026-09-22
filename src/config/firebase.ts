import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, where, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

// LÜTFEN DİKKAT: firebase.google.com üzerinden bir proje oluşturup
// oradaki "firebaseConfig" bilgilerinizi aşağıya kopyalayın.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Helper Functions
export const sendOrderToBar = async (orderData: Record<string, unknown>) => {
  if (firebaseConfig.apiKey === "YOUR_API_KEY_HERE") {
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
  if (firebaseConfig.apiKey === "YOUR_API_KEY_HERE") return;
  const orderRef = doc(db, "alchemist_orders", orderId);
  await updateDoc(orderRef, {
    status: 'completed'
  });
};

export const subscribeToOrders = (callback: (orders: Record<string, unknown>[]) => void) => {
  if (firebaseConfig.apiKey === "YOUR_API_KEY_HERE") {
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
