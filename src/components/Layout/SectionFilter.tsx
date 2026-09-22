
interface SectionFilterProps {
  sections: string[];
  activeSection: string | null;
  onSectionSelect: (section: string | null) => void;
}

export function SectionFilter({ sections, activeSection, onSectionSelect }: SectionFilterProps) {
  if (sections.length === 0) return null;

  return (
    <div className="mb-6 -mx-4 px-4 overflow-x-auto pb-4 hide-scrollbar">
      <div className="flex gap-3 min-w-max">
        <button
          onClick={() => onSectionSelect(null)}
          className={`px-4 py-2 rounded-xl text-xs font-display tracking-widest uppercase transition-all duration-300 ${
            activeSection === null
              ? 'bg-gold-500/20 text-gold-200 border border-gold-500/30 shadow-[0_0_15px_rgba(197,165,90,0.15)]'
              : 'bg-black/20 text-white/50 border border-white/5 hover:bg-white/5 hover:text-white/80'
          }`}
        >
          Alle
        </button>
        {sections.map(sec => (
          <button
            key={sec}
            onClick={() => onSectionSelect(sec)}
            className={`px-4 py-2 rounded-xl text-xs font-display tracking-widest uppercase transition-all duration-300 ${
              activeSection === sec
                ? 'bg-gold-500/20 text-gold-200 border border-gold-500/30 shadow-[0_0_15px_rgba(197,165,90,0.15)]'
                : 'bg-black/20 text-white/50 border border-white/5 hover:bg-white/5 hover:text-white/80'
            }`}
          >
            {sec}
          </button>
        ))}
      </div>
    </div>
  );
}
