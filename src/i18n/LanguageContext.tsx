import { createContext, useContext, useState, type ReactNode } from 'react';
import { translations, type Language, type TranslationKey } from './translations';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey | string) => string;
  tSub: (sub: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('DE');

  const t = (key: TranslationKey | string): string => {
    const langDict = translations[lang] as Record<string, string | Record<string, string>> | undefined;
    const enDict = translations['EN'] as Record<string, string | Record<string, string>> | undefined;
    const deDict = translations['DE'] as Record<string, string | Record<string, string>> | undefined;

    return (langDict?.[key] as string) || (enDict?.[key] as string) || (deDict?.[key] as string) || key;
  };
  
  const tSub = (sub: string): string => {
    const langDict = translations[lang] as { subcategories?: Record<string, string> } | undefined;
    const enDict = translations['EN'] as { subcategories?: Record<string, string> } | undefined;
    const deDict = translations['DE'] as { subcategories?: Record<string, string> } | undefined;
    
    return langDict?.subcategories?.[sub] || enDict?.subcategories?.[sub] || deDict?.subcategories?.[sub] || sub;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, tSub }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
