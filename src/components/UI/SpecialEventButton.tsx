import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, MessageSquare, X, ChevronRight, Crown } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const SpecialEventButton: React.FC = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isOpen, setIsOpen] = useState(false);
  
  // Form State
  const [eventType, setEventType] = useState('Doğum Günü');
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Spezielle Wünsche / Rezervasyon Talebi: ${eventType}`;
    const body = `Merhaba, özel bir etkinlik için rezervasyon talebim var:\n\nEtkinlik Tipi: ${eventType}\nKişi Sayısı: ${guests}\nTarih: ${date || 'Belirtilmedi'}\nÖzel İstekler: ${notes || 'Yok'}\n\nLütfen benimle iletişime geçin.`;
    window.location.href = `mailto:info@huerremsultan.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button — theme-aware */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="relative w-full p-[1px] group overflow-hidden"
      >
        {/* Animated glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/40 to-gold-500/0 opacity-0 group-hover:opacity-100 animate-sweep transition-opacity duration-700" />
        
        {/* Button Inner — theme-card handles bg/border/shadow */}
        <div className="relative theme-card py-4 px-5 flex items-center justify-between transition-all group-hover:opacity-90">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border theme-border flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: 'color-mix(in srgb, var(--theme-accent) 8%, transparent)' }}>
              <Crown className="w-4 h-4 theme-accent-text" />
            </div>
            <div className="text-left">
              <h4 className="font-display text-[12px] sm:text-[14px] uppercase tracking-[0.25em] theme-accent-text group-hover:opacity-80 transition-colors">
                {t('specialEvent')}
              </h4>
              <p className="font-body text-[8px] sm:text-[9px] tracking-[0.2em] uppercase theme-text-muted mt-1 opacity-70">
                {t('specialEventDesc')}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 theme-accent-text opacity-40 group-hover:opacity-80 group-hover:translate-x-1 transition-all" />
        </div>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 backdrop-blur-3xl"
              style={{ background: isDark ? 'rgba(6,5,4,0.90)' : 'rgba(0,0,0,0.45)' }}
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm rounded-t-[32px] sm:rounded-[32px] overflow-hidden pb-[env(safe-area-inset-bottom)] theme-modal"
              style={{ boxShadow: '0 0 60px rgba(0,0,0,0.3)' }}
            >
              {/* Header */}
              <div className="px-6 pt-8 pb-6 border-b theme-border text-center relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 theme-text-muted hover:theme-accent-text rounded-full transition-colors"
                  style={{ background: 'color-mix(in srgb, var(--theme-accent) 6%, transparent)' }}
                  aria-label={t('close')}
                  title={t('close')}
                >
                  <X className="w-5 h-5" />
                </button>
                <div
                  className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-4 border theme-border"
                  style={{ background: 'color-mix(in srgb, var(--theme-accent) 10%, transparent)' }}
                >
                  <Crown className="w-6 h-6 theme-accent-text drop-shadow-sm" />
                </div>
                <h3 className="font-display text-2xl theme-text mb-1 drop-shadow-sm">{t('specialEvent')}</h3>
                <p className="font-body text-[10px] theme-accent-text opacity-70 tracking-widest uppercase">
                  {t('specialEventDesc')}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-5">
                
                {/* Event Type */}
                <div>
                  <label className="block font-body text-[10px] tracking-widest uppercase theme-accent-text opacity-80 mb-2">
                    {t('eventType')}
                  </label>
                  <div className="relative">
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full appearance-none border theme-border rounded-lg px-4 py-3 font-body text-sm theme-text focus:outline-none transition-all"
                      style={{
                        background: 'color-mix(in srgb, var(--theme-accent) 5%, var(--theme-modal-bg))',
                        colorScheme: isDark ? 'dark' : 'light',
                      }}
                      aria-label={t('eventType')}
                    >
                      <option value="Doğum Günü">🎂 {t('eventBirthday')}</option>
                      <option value="İş Yemeği">💼 {t('eventBusiness')}</option>
                      <option value="Yıl Dönümü">🥂 {t('eventAnniversary')}</option>
                      <option value="Özel Kapatma">🎪 {t('eventVIP')}</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <ChevronRight className="w-4 h-4 theme-accent-text opacity-50 rotate-90" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  {/* Date */}
                  <div className="flex-1">
                    <label className="block font-body text-[10px] tracking-widest uppercase theme-accent-text opacity-80 mb-2">
                      {t('date')}
                    </label>
                    <div className="relative flex items-center">
                      <Calendar className="absolute left-3 w-4 h-4 theme-accent-text opacity-60" />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border theme-border rounded-lg pl-9 pr-3 py-3 font-body text-sm theme-text focus:outline-none transition-all"
                        style={{
                          background: 'color-mix(in srgb, var(--theme-accent) 5%, var(--theme-modal-bg))',
                          colorScheme: isDark ? 'dark' : 'light',
                        }}
                        required
                        aria-label={t('date')}
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="w-24">
                    <label className="block font-body text-[10px] tracking-widest uppercase theme-accent-text opacity-80 mb-2">
                      {t('guests')}
                    </label>
                    <div className="relative flex items-center">
                      <Users className="absolute left-3 w-4 h-4 theme-accent-text opacity-60" />
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full border theme-border rounded-lg pl-9 pr-3 py-3 font-body text-sm theme-text focus:outline-none transition-all"
                        style={{
                          background: 'color-mix(in srgb, var(--theme-accent) 5%, var(--theme-modal-bg))',
                        }}
                        aria-label={t('guests')}
                        placeholder="2"
                      />
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block font-body text-[10px] tracking-widest uppercase theme-accent-text opacity-80 mb-2">
                    {t('detailsReq')}
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 theme-accent-text opacity-60" />
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="..."
                      rows={3}
                      className="w-full border theme-border rounded-lg pl-9 pr-3 py-3 font-body text-sm theme-text focus:outline-none transition-all resize-none placeholder:opacity-30"
                      style={{
                        background: 'color-mix(in srgb, var(--theme-accent) 5%, var(--theme-modal-bg))',
                      }}
                      aria-label={t('detailsReq')}
                    />
                  </div>
                </div>

                {/* Submit — always solid accent-colored, readable in all themes */}
                <button
                  type="submit"
                  className="w-full mt-2 py-4 rounded-xl font-body text-[11px] tracking-[0.2em] uppercase font-bold transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                  style={{
                    background: 'var(--theme-accent)',
                    color: theme === 'dark' ? '#000' : '#fff',
                    boxShadow: '0 8px 20px color-mix(in srgb, var(--theme-accent) 30%, transparent)',
                  }}
                >
                  {t('submitReq')}
                </button>

                <div className="mt-4 pt-4 border-t theme-border text-center flex flex-col gap-1.5">
                  <p className="font-body text-[10px] leading-relaxed theme-text-muted opacity-70">
                    Reservierungen nehmen wir gerne telefonisch oder per Instagram auf.
                  </p>
                  <div className="flex flex-col gap-0.5 mt-1">
                    <p className="font-body text-[10px] theme-text-muted opacity-50">Oranienstraße 52-53, 10969 Berlin</p>
                    <p className="font-body text-[10px] theme-text-muted opacity-50">
                      Tel: <a href="tel:+493054615959" className="theme-accent-text hover:opacity-80">+49 30 546 159 59</a>
                    </p>
                    <p className="font-body text-[10px] theme-text-muted opacity-50">
                      Mail: <a href="mailto:info@huerremsultan.de" className="theme-accent-text hover:opacity-80">info@huerremsultan.de</a>
                    </p>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SpecialEventButton;
