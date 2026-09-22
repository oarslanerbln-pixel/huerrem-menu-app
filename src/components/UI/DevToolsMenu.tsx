import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, X, LayoutTemplate, LayoutList, Layers } from 'lucide-react';
import { useConcept, type UICardConcept } from '../../context/ConceptContext';

const DevToolsMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cardConcept, setCardConcept } = useConcept();

  // Only render on localhost
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    return null;
  }

  const concepts: { id: UICardConcept; label: string; icon: React.ReactNode }[] = [
    { id: 'layout-default', label: 'Default', icon: <Layers className="w-4 h-4" /> },
    { id: 'layout-minimal', label: 'Minimal', icon: <LayoutTemplate className="w-4 h-4" /> },
    { id: 'layout-compact', label: 'Compact', icon: <LayoutList className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed bottom-32 right-4 z-[9999] font-body">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 bg-black/90 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-2xl flex flex-col gap-2 min-w-[160px]"
          >
            <div className="text-[10px] font-bold tracking-widest uppercase text-white/50 mb-2 px-2">
              Card Concept
            </div>
            {concepts.map((c) => (
              <button
                key={c.id}
                onClick={() => setCardConcept(c.id)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs transition-all ${
                  cardConcept === c.id
                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                    : 'text-white/70 hover:bg-white/10 border border-transparent'
                }`}
              >
                {c.icon}
                {c.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-black/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-lg text-white/80 hover:text-white hover:scale-105 transition-all"
        aria-label="Toggle DevTools"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Wrench className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default DevToolsMenu;
