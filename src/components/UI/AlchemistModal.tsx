import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FlaskConical, Check, Plus, Wind, Martini } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { sendOrderToBar } from '../../config/firebase';

interface AlchemistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SHISHA_FLAVORS = ['Apfel', 'Minze', 'Traube', 'Pfirsich', 'Wassermelone', 'Zitrone', 'Blaubeere', 'Kirsche', 'Honigmelone', 'Ice'];
const COCKTAIL_FRUITS = ['Erdbeere', 'Maracuja', 'Minze', 'Limette', 'Mango', 'Himbeere', 'Wassermelone', 'Orange', 'Kokos', 'Ananas'];

export default function AlchemistModal({ isOpen, onClose }: AlchemistModalProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [type, setType] = useState<'shisha' | 'cocktail' | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [creationName, setCreationName] = useState('');
  const [tableNo, setTableNo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const reset = () => {
    setStep(1);
    setType(null);
    setIngredients([]);
    setCreationName('');
    setTableNo('');
    setIsSubmitting(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  const handleTypeSelect = (selected: 'shisha' | 'cocktail') => {
    setType(selected);
    setStep(2);
  };

  const toggleIngredient = (item: string) => {
    if (ingredients.includes(item)) {
      setIngredients(ingredients.filter(i => i !== item));
    } else {
      if (ingredients.length < 3) {
        setIngredients([...ingredients, item]);
      }
    }
  };

  const handleFinish = async () => {
    if (creationName.trim().length === 0 || tableNo.trim().length === 0) return;
    setIsSubmitting(true);
    
    try {
      await sendOrderToBar({
        type,
        ingredients,
        customName: creationName,
        tableNo
      });
      alert(`Siparişiniz Bar'a başarıyla iletildi!`);
      handleClose();
    } catch {
      alert("Bir hata oluştu, lütfen garsona bildiriniz.");
      setIsSubmitting(false);
    }
  };

  const options = type === 'shisha' ? SHISHA_FLAVORS : COCKTAIL_FRUITS;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-black/90 border border-gold-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: '90vh' }}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-gold-500/10 text-center">
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 theme-text-muted" />
              </button>
              
              <div className="w-12 h-12 rounded-full mx-auto bg-gradient-to-br from-gold-500/20 to-transparent flex items-center justify-center mb-3 border border-gold-500/20">
                <FlaskConical className="w-6 h-6 theme-accent-text" />
              </div>
              <h2 className="font-brand text-2xl theme-accent-text tracking-wider">{t('alchemist_title')}</h2>
              <p className="font-display text-[10px] uppercase tracking-[0.2em] theme-text-muted mt-1">
                {t('alchemist_subtitle')}
              </p>
            </div>

            {/* Content Area */}
            <div className="p-6 overflow-y-auto no-scrollbar flex-1">
              
              {/* Step 1: Type Selection */}
              {step === 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col gap-4"
                >
                  <button
                    onClick={() => handleTypeSelect('shisha')}
                    className="w-full flex items-center gap-4 p-5 rounded-2xl border border-gold-500/20 bg-white/5 hover:bg-gold-500/10 transition-colors text-left"
                  >
                    <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center border border-gold-500/10">
                      <Wind className="w-5 h-5 theme-accent-text" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold theme-text text-lg">Custom LED Shisha</h3>
                      <p className="text-xs theme-text-muted font-body mt-1">Kreiere deine eigene Mischung</p>
                    </div>
                    <span className="font-display font-bold theme-accent-text">22.90€</span>
                  </button>

                  <button
                    onClick={() => handleTypeSelect('cocktail')}
                    className="w-full flex items-center gap-4 p-5 rounded-2xl border border-gold-500/20 bg-white/5 hover:bg-gold-500/10 transition-colors text-left"
                  >
                    <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center border border-gold-500/10">
                      <Martini className="w-5 h-5 theme-accent-text" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold theme-text text-lg">Signature Cocktail</h3>
                      <p className="text-xs theme-text-muted font-body mt-1">Wähle bis zu 3 Aromen/Früchte</p>
                    </div>
                    <span className="font-display font-bold theme-accent-text">15.90€</span>
                  </button>
                </motion.div>
              )}

              {/* Step 2: Ingredients Selection */}
              {step === 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display font-bold theme-text text-lg">
                      {t('labor_flavor_title')}
                    </h3>
                    <span className="text-xs font-display theme-text-muted bg-white/10 px-2 py-1 rounded-full">
                      {ingredients.length}/3 MAX
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {options.map((item) => {
                      const isSelected = ingredients.includes(item);
                      return (
                        <button
                          key={item}
                          onClick={() => toggleIngredient(item)}
                          className={`relative p-3 rounded-xl border flex items-center gap-2 transition-all ${
                            isSelected 
                              ? 'border-gold-500 bg-gold-500/20' 
                              : 'border-white/10 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                            isSelected ? 'bg-gold-500 border-gold-500' : 'border-white/20'
                          }`}>
                            {isSelected ? <Check className="w-3 h-3 text-black" /> : <Plus className="w-3 h-3 theme-text-muted" />}
                          </div>
                          <span className={`text-sm font-display font-medium ${isSelected ? 'theme-accent-text' : 'theme-text'}`}>
                            {item}
                          </span>
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={() => setStep(3)}
                    disabled={ingredients.length === 0}
                    className="w-full py-4 rounded-xl font-display font-bold text-sm tracking-widest uppercase transition-all bg-gradient-to-r from-gold-300 to-gold-500 text-black disabled:opacity-50 disabled:grayscale"
                  >
                    {t('alchemist_continue')}
                  </button>
                </motion.div>
              )}

              {/* Step 3: Name & Confirm */}
              {step === 3 && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col gap-5"
                >
                  <div className="text-center">
                    <h3 className="font-display font-bold theme-text text-xl mb-1">
                      Son Rötuşlar
                    </h3>
                    <p className="text-sm theme-text-muted font-body mb-5">
                      Karışımına bir isim ver ve masanı seç.
                    </p>
                    
                    <div className="flex flex-col gap-3">
                      <input
                        type="text"
                        value={creationName}
                        onChange={(e) => setCreationName(e.target.value)}
                        placeholder="Karışımın İsmi (Örn. Sultan's Dream)"
                        className="w-full bg-white/5 border border-gold-500/30 rounded-xl px-4 py-4 text-center font-display text-lg theme-text placeholder:text-white/20 focus:outline-none focus:border-gold-500 transition-colors"
                        autoFocus
                      />
                      
                      <input
                        type="number"
                        value={tableNo}
                        onChange={(e) => setTableNo(e.target.value)}
                        placeholder="Masa Numarası (Örn. 12)"
                        className="w-full bg-white/5 border border-gold-500/30 rounded-xl px-4 py-4 text-center font-display text-lg theme-text placeholder:text-white/20 focus:outline-none focus:border-gold-500 transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                    <h4 className="text-xs uppercase tracking-widest theme-text-muted mb-2 font-body text-center">Zusammenfassung</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {ingredients.map(ing => (
                        <span key={ing} className="px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-xs font-display theme-accent-text">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleFinish}
                    disabled={creationName.trim().length === 0 || tableNo.trim().length === 0 || isSubmitting}
                    className="w-full py-4 rounded-xl font-display font-bold text-sm tracking-widest uppercase transition-all bg-gradient-to-r from-gold-300 to-gold-500 text-black disabled:opacity-50 disabled:grayscale mt-2 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Gönderiliyor...' : 'BAR\'A GÖNDER'}
                  </button>
                </motion.div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
