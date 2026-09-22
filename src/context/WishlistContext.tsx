import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import type { MenuItem } from '../data/menu';

interface WishlistContextType {
  items: MenuItem[];
  toggle: (item: MenuItem) => void;
  has: (id: string) => boolean;
  clear: () => void;
  total: number;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<MenuItem[]>([]);

  const toggle = (item: MenuItem) => {
    setItems(prev =>
      prev.some(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item]
    );
    if (navigator.vibrate) navigator.vibrate(12);
  };

  const has = (id: string) => items.some(i => i.id === id);

  const clear = () => setItems([]);

  const total = useMemo(() => items.reduce((sum, i) => sum + i.price, 0), [items]);

  return (
    <WishlistContext.Provider value={{ items, toggle, has, clear, total, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}
