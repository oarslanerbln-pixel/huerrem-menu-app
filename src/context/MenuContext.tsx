import { createContext, useContext, useState, useMemo, useEffect, type ReactNode } from 'react';
import { menuData as localMenuData, type MenuCategory, type MenuItem } from '../data/menu';
import { useLanguage } from '../i18n/LanguageContext';
import { isFirebaseConfigured } from '../config/firebase';

declare global {
  interface Window {
    wpApiSettings?: {
      root: string;
      nonce?: string;
    };
  }
}

interface MenuContextType {
  allItems: MenuItem[];
  filteredItems: MenuItem[];
  activeCategory: MenuCategory;
  setCategory: (cat: MenuCategory) => void;
  activeSubcategory: string;
  setSubcategory: (sub: string) => void;
  searchQuery: string;
  setSearch: (q: string) => void;
  activeTags: string[];
  toggleTag: (tag: string) => void;
  subcategories: string[];
  isLoading: boolean;
}

const MenuContext = createContext<MenuContextType | null>(null);

const SUBCATEGORY_ORDER: Record<string, number> = {
  // Deals & Seasonal
  'Happy Hour': 1,
  'Sommer-Specials': 2,

  // Drinks (Cold & Refreshing)
  'Signature Cocktails': 10,
  'High-Class Cocktails': 11,
  'Cocktails': 12,
  'Mocktails': 13,
  'Homemade Iced Tea': 14,
  'Fresh Homemade': 15,
  'Smoothies': 16,
  'Säfte': 17,
  'Softdrinks': 18,
  'Energydrink': 19,

  // Drinks (Warm & Caffeinated)
  'Kaffeespezialitäten': 20,
  'Teespezialitäten': 21,
  'Heiße Specials': 22,

  // Shisha
  'Signature Blends': 30,
  'Premium Blends': 31,
  'Classic': 32,
  'Pfeifen': 33,
  'HMD (Aufsätze)': 34,
  'Shisha Extras': 35,
  
  // Food (Starters & Light)
  'Vorspeisen': 40,
  'Suppen': 41,
  'Snacks': 42,
  'Finger Food': 43,
  'Bowls & Salate': 44,
  
  // Food (Mains)
  'Burger Gerichte': 50,
  'Pasta Gerichte': 51,
  'Hauptgerichte': 52,
  
  // Desserts & Sweets
  'Desserts': 60,
  'Shakes': 61,
  
  // Combos
  'Hürrem Kombis': 70,
  'Kombis': 71,
};

export function MenuProvider({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();
  const [allItems, setAllItems] = useState<MenuItem[]>(localMenuData);
  const [isLoading, setIsLoading] = useState(() => isFirebaseConfigured || !!(typeof window !== 'undefined' && window.wpApiSettings?.root));
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('shisha');
  const [activeSubcategory, setActiveSubcategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTags, setActiveTags] = useState<string[]>([]);

  useEffect(() => {
    // Live menu from Firestore (edited via /admin). The bundled menu stays as
    // fallback while loading, if the collection is empty, or on error.
    if (!isFirebaseConfigured) return;
    let unsubscribe = () => {};
    let cancelled = false;
    import('../services/menuFeed').then(({ subscribeMenu }) => {
      if (cancelled) return;
      unsubscribe = subscribeMenu(
        items => {
          if (items.length > 0) setAllItems(items);
          setIsLoading(false);
        },
        err => {
          console.error('Failed to load menu from Firestore:', err);
          setIsLoading(false);
        },
      );
    });
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Check if we are running inside WordPress
    if (window.wpApiSettings && window.wpApiSettings.root) {
      // Use our custom REST endpoint which perfectly maps MotoPress data
      const apiUrl = `${window.wpApiSettings.root}huerrem/v1/menu`;
      
      fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            // Data is already mapped correctly by our custom PHP endpoint
            setAllItems(data as MenuItem[]);
          }
        })
        .catch(err => {
          console.error("Failed to fetch menu from WordPress:", err);
          // Fallback to local data on error
          setAllItems(localMenuData);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const setCategory = (cat: MenuCategory) => {
    setActiveCategory(cat);
    setActiveSubcategory('All');
    setSearchQuery('');
    setActiveTags([]);
  };

  const setSubcategory = (sub: string) => {
    setActiveSubcategory(sub);
  };

  const setSearch = (q: string) => {
    setSearchQuery(q);
  };

  const toggleTag = (tag: string) => {
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const subcategories = useMemo(() => {
    const subs = Array.from(new Set(
      allItems
        .filter(item => item.category === activeCategory && item.available !== false)
        .map(item => item.subcategory)
        .filter((sub): sub is string => Boolean(sub))
    ));

    subs.sort((a, b) => {
      const indexA = SUBCATEGORY_ORDER[a] !== undefined ? SUBCATEGORY_ORDER[a] : -1;
      const indexB = SUBCATEGORY_ORDER[b] !== undefined ? SUBCATEGORY_ORDER[b] : -1;
      
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    });

    return ['All', ...subs];
  }, [allItems, activeCategory]);

  const filteredItems = useMemo(() => {
    const isSearching = searchQuery.trim().length > 0;
    const items = allItems.filter(item => {
      if (item.available === false) return false;
      const catMatch = isSearching ? true : item.category === activeCategory;
      const subMatch = isSearching ? true : (activeSubcategory === 'All' || item.subcategory === activeSubcategory);
      // Search in active language first, fall back to DE and EN
      const itemName = typeof item.name === 'string' ? item.name : (item.name?.[lang] || item.name?.EN || item.name?.DE || '');
      const itemDesc = typeof item.description === 'string' ? item.description : (item.description?.[lang] || item.description?.EN || item.description?.DE || '');
      // Also search in other languages for convenience
      const itemNameDE = typeof item.name === 'string' ? item.name : (item.name?.DE || '');
      const itemNameEN = typeof item.name === 'string' ? item.name : (item.name?.EN || '');
      
      const searchMatch = !isSearching ||
        itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        itemDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        itemNameDE.toLowerCase().includes(searchQuery.toLowerCase()) ||
        itemNameEN.toLowerCase().includes(searchQuery.toLowerCase());
      const tagMatch = activeTags.length === 0 ||
        activeTags.every(tag => {
          if (tag === 'signature') return item.isSignature;
          return item.tags?.includes(tag);
        });
      return catMatch && subMatch && searchMatch && tagMatch;
    });

    // Logical item sorting:
    // 1. Group by subcategory according to SUBCATEGORY_ORDER (consumer habits logic)
    // 2. Signature items first within subcategory
    // 3. By price descending
    // 4. Alphabetical
    return items.sort((a, b) => {
      const subA = a.subcategory || '';
      const subB = b.subcategory || '';
      
      const orderA = SUBCATEGORY_ORDER[subA] !== undefined ? SUBCATEGORY_ORDER[subA] : 999;
      const orderB = SUBCATEGORY_ORDER[subB] !== undefined ? SUBCATEGORY_ORDER[subB] : 999;
      
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      
      if (a.isSignature && !b.isSignature) return -1;
      if (!a.isSignature && b.isSignature) return 1;
      
      if (b.price !== a.price) {
        return b.price - a.price;
      }
      
      const nameA = typeof a.name === 'string' ? a.name : (a.name[lang] || a.name.DE || '');
      const nameB = typeof b.name === 'string' ? b.name : (b.name[lang] || b.name.DE || '');
      return nameA.localeCompare(nameB);
    });
  }, [allItems, activeCategory, activeSubcategory, searchQuery, activeTags, lang]);

  return (
    <MenuContext.Provider value={{
      allItems,
      filteredItems,
      activeCategory,
      setCategory,
      activeSubcategory,
      setSubcategory,
      searchQuery,
      setSearch,
      activeTags,
      toggleTag,
      subcategories,
      isLoading,
    }}>
      {children}
    </MenuContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used within MenuProvider');
  return ctx;
}
