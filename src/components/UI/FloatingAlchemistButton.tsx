import { FlaskConical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingAlchemistButtonProps {
  onClick: () => void;
  isVisible: boolean;
}

export default function FloatingAlchemistButton({ onClick, isVisible }: FloatingAlchemistButtonProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          className="fixed bottom-[110px] right-4 z-40 w-14 h-14 rounded-full theme-card shadow-[0_0_20px_rgba(197,165,90,0.5)] flex items-center justify-center border border-gold-500/50 hover:bg-gold-500/10 transition-colors group overflow-hidden backdrop-blur-xl"
          aria-label="Alchemist Mix"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <FlaskConical className="w-6 h-6 theme-accent-text group-hover:scale-110 transition-transform relative z-10 drop-shadow-[0_0_8px_rgba(197,165,90,0.8)]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
