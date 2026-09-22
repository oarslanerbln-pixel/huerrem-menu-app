import React, { createContext, useContext, useState, useEffect } from 'react';

export type UIConcept = 'neo-classic' | 'brutalist' | 'skeuomorphic' | 'azure-cream' | 'cyber-gold' | 'ottoman-palace' | 'monolithic-matte' | 'world-cup';

export type UICardConcept = 'layout-default' | 'layout-minimal' | 'layout-compact';

interface ConceptContextType {
  concept: UIConcept;
  setConcept: (concept: UIConcept) => void;
  cardConcept: UICardConcept;
  setCardConcept: (concept: UICardConcept) => void;
}

const ConceptContext = createContext<ConceptContextType>({
  concept: 'neo-classic',
  setConcept: () => {},
  cardConcept: 'layout-minimal',
  setCardConcept: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useConcept = () => useContext(ConceptContext);

const getInitialConcept = (): UIConcept => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('huerrem_ui_concept') as UIConcept;
    if (saved && ['neo-classic', 'brutalist', 'skeuomorphic', 'azure-cream', 'cyber-gold', 'ottoman-palace', 'monolithic-matte', 'world-cup'].includes(saved)) {
      return saved;
    }
  }
  return 'neo-classic';
};

const getInitialCardConcept = (): UICardConcept => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('huerrem_card_concept') as UICardConcept;
    if (saved && ['layout-default', 'layout-minimal', 'layout-compact'].includes(saved)) {
      return saved;
    }
  }
  return 'layout-minimal';
};

export const ConceptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [concept, setConcept] = useState<UIConcept>(getInitialConcept);
  const [cardConcept, setCardConcept] = useState<UICardConcept>(getInitialCardConcept);

  useEffect(() => {
    document.documentElement.setAttribute('data-concept', concept);
  }, [concept]);

  const handleSetConcept = (c: UIConcept) => {
    setConcept(c);
    localStorage.setItem('huerrem_ui_concept', c);
    document.documentElement.setAttribute('data-concept', c);
  };

  const handleSetCardConcept = (c: UICardConcept) => {
    setCardConcept(c);
    localStorage.setItem('huerrem_card_concept', c);
  };

  return (
    <ConceptContext.Provider value={{ concept, setConcept: handleSetConcept, cardConcept, setCardConcept: handleSetCardConcept }}>
      {children}
    </ConceptContext.Provider>
  );
};
