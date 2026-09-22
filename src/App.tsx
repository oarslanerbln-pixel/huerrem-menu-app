import { useState, useEffect } from 'react';
import { Crown } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLanguage } from './i18n/LanguageContext';

// Contexts
import { LanguageProvider } from './i18n/LanguageContext';
import { MenuProvider } from './context/MenuContext';
import { ThemeProvider } from './context/ThemeContext';

// Core Components
import IntroScreen from './components/UI/IntroScreen';
import SpecialEventButton from './components/UI/SpecialEventButton';
// import AmbientBackground from './components/UI/AmbientBackground';



// Layout Components
import TopActionBar from './components/Layout/TopActionBar';
import BrandHeader from './components/Layout/BrandHeader';
import FilterBar from './components/Layout/FilterBar';
import MainContent from './components/Layout/MainContent';
import BottomNav from './components/Layout/BottomNav';
import DevToolsMenu from './components/UI/DevToolsMenu';

// Pages
import BarDashboard from './pages/BarDashboard';

// Removed CrypticBackground

// Main App inner — uses context hooks
function AppInner() {
  const { t } = useLanguage();
  const [isCompact, setIsCompact] = useState(false);
  const [showIntro, setShowIntro] = useState(true);


  // Intro timer kaldırıldı, çünkü IntroScreen kendi "Press & Hold" veya Fallback ile onSkip tetikliyor.

  // Scroll detection — with compact mode
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsCompact(y > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
        <div className="min-h-screen pb-44 relative bg-transparent selection:bg-gold-500/30 selection:text-gold-900 w-full max-w-full">
          {/* AmbientBackground removed due to visual glitches, falling back to clean CSS radial gradients */}
          <DevToolsMenu />
          <IntroScreen isVisible={showIntro} onSkip={() => setShowIntro(false)} />

          {/* Main UI */}
          <div
            className={`transition-opacity duration-[2000ms] ease-in-out z-10 relative ${
              showIntro ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
            }`}
          >
            <TopActionBar />
            <BrandHeader />

            <div className="container-mobile flex flex-col gap-3 mt-6 pb-4">
              <SpecialEventButton />
            </div>

            <FilterBar isCompact={isCompact} />
            <MainContent />

            {/* Footer */}
            <footer className="pt-20 pb-[calc(8rem+env(safe-area-inset-bottom))] text-center container-mobile border-t border-[#2A241A] mt-16">
              <div className="w-10 h-px bg-gold-500/50 mx-auto mb-6" />
              <p className="font-body text-[8px] font-semibold tracking-[0.25em] uppercase text-text-tertiary leading-relaxed">
                {t('estLine')}
              </p>
              <p className="font-body text-[8px] font-light tracking-widest uppercase text-text-tertiary mt-2">
                {t('vatLine')}
              </p>
              <Crown className="w-4 h-4 text-gold-500/20 mx-auto mt-6" />
            </footer>

            <BottomNav isCompact={isCompact} />
          </div>


        </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MenuProvider>
          <Router>
            <Routes>
              <Route path="/" element={<AppInner />} />
              <Route path="/bar" element={<BarDashboard />} />
            </Routes>
          </Router>
        </MenuProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
