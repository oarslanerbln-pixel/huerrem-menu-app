import { useState } from 'react';
import { ImagePlus, Loader2, Trash2, X } from 'lucide-react';
import { additiveLegend, allergenLegend, type MenuCategory, type MenuItem } from '../../data/menu';
import { CATEGORY_LABELS, LANGS } from './constants';
import { uploadMenuImage } from '../../services/menuStore';

type Texts = Record<string, string>;

const toTexts = (v: MenuItem['name'] | undefined): Texts =>
  typeof v === 'string' ? { DE: v } : { ...(v || {}) };

interface Props {
  item: MenuItem;
  isNew: boolean;
  subcategories: string[];
  onSave: (item: MenuItem) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onClose: () => void;
}

export default function ItemEditor({ item, isNew, subcategories, onSave, onDelete, onClose }: Props) {
  const [draft, setDraft] = useState<MenuItem>({ ...item, name: toTexts(item.name), description: toTexts(item.description) });
  const [lang, setLang] = useState<(typeof LANGS)[number]>('DE');
  const [busy, setBusy] = useState<'save' | 'delete' | 'upload' | null>(null);
  const [error, setError] = useState('');

  const names = draft.name as Texts;
  const descriptions = draft.description as Texts;
  const set = (patch: Partial<MenuItem>) => setDraft(d => ({ ...d, ...patch }));
  const toggleCode = (field: 'allergens' | 'additives', code: string) => {
    const current = draft[field] || [];
    set({ [field]: current.includes(code) ? current.filter(c => c !== code) : [...current, code] });
  };

  const run = async (kind: 'save' | 'delete' | 'upload', fn: () => Promise<void>) => {
    setBusy(kind);
    setError('');
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(null);
    }
  };

  const handleSave = () => {
    if (!names.DE?.trim()) return setError('Bitte einen deutschen Namen eingeben.');
    if (!(draft.price >= 0)) return setError('Bitte einen gültigen Preis eingeben.');
    run('save', () => onSave(draft));
  };

  const handleDelete = () => {
    if (!window.confirm(`„${names.DE}“ endgültig löschen?`)) return;
    run('delete', () => onDelete(draft.id));
  };

  const handleImage = (file: File | undefined) => {
    if (!file) return;
    run('upload', async () => set({ imageUrl: await uploadMenuImage(file, draft.id || 'neu') }));
  };

  const input = 'w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 text-white focus:border-gold-400 outline-none';
  const label = 'block text-xs uppercase tracking-wider text-white/60 mb-1';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div
        className="w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-neutral-900 border border-white/10 rounded-t-2xl sm:rounded-2xl p-5 space-y-5"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gold-300">{isNew ? 'Neuer Artikel' : 'Artikel bearbeiten'}</h2>
          <button onClick={onClose} className="p-2 text-white/60 hover:text-white" aria-label="Schließen"><X size={20} /></button>
        </div>

        {/* Name & description per language */}
        <div>
          <div className="flex gap-1 mb-3 flex-wrap">
            {LANGS.map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded-full text-sm border ${lang === l ? 'bg-gold-500 text-black border-gold-500' : 'border-white/20 text-white/70'}`}
              >
                {l}{l === 'DE' && ' *'}
              </button>
            ))}
          </div>
          <label className={label}>Name ({lang})</label>
          <input className={input} value={names[lang] || ''} onChange={e => set({ name: { ...names, [lang]: e.target.value } })} />
          <label className={`${label} mt-3`}>Beschreibung ({lang})</label>
          <textarea
            className={`${input} min-h-[96px]`}
            value={descriptions[lang] || ''}
            onChange={e => set({ description: { ...descriptions, [lang]: e.target.value } })}
          />
          {lang !== 'DE' && <p className="text-xs text-white/40 mt-1">Leer lassen = deutscher/englischer Text wird angezeigt.</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label}>Preis (€)</label>
            <input
              className={input}
              type="number"
              step="0.01"
              min="0"
              value={Number.isFinite(draft.price) ? draft.price : ''}
              onChange={e => set({ price: parseFloat(e.target.value) })}
            />
          </div>
          <div>
            <label className={label}>Kategorie</label>
            <select className={input} value={draft.category} onChange={e => set({ category: e.target.value as MenuCategory })}>
              {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className={label}>Unterkategorie</label>
            <input className={input} list="admin-subcategories" value={draft.subcategory || ''} onChange={e => set({ subcategory: e.target.value })} />
            <datalist id="admin-subcategories">
              {subcategories.map(s => <option key={s} value={s} />)}
            </datalist>
          </div>
        </div>

        {/* Photo */}
        <div>
          <label className={label}>Foto</label>
          <div className="flex items-center gap-3">
            {draft.imageUrl
              ? <img src={draft.imageUrl} alt="" className="w-24 h-24 object-cover rounded-lg border border-white/10" />
              : <div className="w-24 h-24 rounded-lg border border-dashed border-white/20 grid place-items-center text-white/30 text-xs">Kein Foto</div>}
            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 cursor-pointer text-sm">
                {busy === 'upload' ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
                Foto hochladen
                <input type="file" accept="image/*" className="hidden" onChange={e => handleImage(e.target.files?.[0])} />
              </label>
              {draft.imageUrl && (
                <button onClick={() => set({ imageUrl: '' })} className="text-xs text-white/50 hover:text-red-400 text-left">Foto entfernen</button>
              )}
            </div>
          </div>
        </div>

        {/* Allergens & additives (LMIV) */}
        <div>
          <label className={label}>Allergene</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {Object.entries(allergenLegend).map(([code, text]) => (
              <label key={code} className="flex items-center gap-2 text-sm text-white/80">
                <input type="checkbox" checked={draft.allergens?.includes(code) || false} onChange={() => toggleCode('allergens', code)} />
                <span className="text-gold-300 w-5">{code}</span>{text}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className={label}>Zusatzstoffe</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {Object.entries(additiveLegend).map(([code, text]) => (
              <label key={code} className="flex items-center gap-2 text-sm text-white/80">
                <input type="checkbox" checked={draft.additives?.includes(code) || false} onChange={() => toggleCode('additives', code)} />
                <span className="text-gold-300 w-5">{code}</span>{text}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-5">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={draft.available !== false} onChange={e => set({ available: e.target.checked })} />
            Auf der Karte sichtbar
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={draft.isSignature || false} onChange={e => set({ isSignature: e.target.checked })} />
            Signature / Empfehlung
          </label>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          {!isNew
            ? (
              <button onClick={handleDelete} disabled={!!busy} className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 text-sm disabled:opacity-50">
                {busy === 'delete' ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />} Löschen
              </button>
            )
            : <span />}
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded-lg text-white/70 hover:text-white">Abbrechen</button>
            <button
              onClick={handleSave}
              disabled={!!busy}
              className="px-5 py-2 rounded-lg bg-gold-500 text-black font-semibold hover:bg-gold-400 disabled:opacity-50 inline-flex items-center gap-2"
            >
              {busy === 'save' && <Loader2 size={16} className="animate-spin" />} Speichern
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
