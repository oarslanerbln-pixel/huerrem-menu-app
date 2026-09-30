import { useState, type DragEvent, type ReactNode } from 'react';
import { ImagePlus, Loader2, Trash2, X } from 'lucide-react';
import { additiveLegend, allergenLegend, type MenuCategory, type MenuItem } from '../../data/menu';
import { uploadMenuImage } from '../../services/menuStore';
import { CATEGORY_LABELS, LANGS } from './constants';
import Switch from './Switch';

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

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h3 className="adm-section-title">{title}</h3>
      {children}
    </section>
  );
}

export default function ItemEditor({ item, isNew, subcategories, onSave, onDelete, onClose }: Props) {
  const [initial] = useState(() => JSON.stringify(item));
  const [draft, setDraft] = useState<MenuItem>({ ...item, name: toTexts(item.name), description: toTexts(item.description) });
  const [lang, setLang] = useState<(typeof LANGS)[number]>('DE');
  const [busy, setBusy] = useState<'save' | 'delete' | 'upload' | null>(null);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [dirty, setDirty] = useState(false);

  const names = draft.name as Texts;
  const descriptions = draft.description as Texts;
  const set = (patch: Partial<MenuItem>) => {
    setDraft(d => ({ ...d, ...patch }));
    setDirty(true);
  };
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

  const close = () => {
    if (dirty && JSON.stringify(draft) !== initial && !window.confirm('Ungespeicherte Änderungen verwerfen?')) return;
    onClose();
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

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleImage(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end adm-overlay" onClick={close}>
      <aside
        className="adm-sheet adm-scroll w-full sm:max-w-[560px] h-full overflow-y-auto flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-label={isNew ? 'Neuer Artikel' : 'Artikel bearbeiten'}
        onClick={e => e.stopPropagation()}
      >
        <header className="adm-sheet-bar sticky top-0 z-10 flex items-center justify-between gap-4 px-6 sm:px-8 py-4 border-b">
          <div className="min-w-0">
            <p className="adm-eyebrow">{isNew ? 'Neuer Artikel' : 'Artikel bearbeiten'}</p>
            <h2 className="text-[22px] font-semibold tracking-[-0.02em] leading-tight truncate mt-1">{names.DE || 'Ohne Namen'}</h2>
          </div>
          <button onClick={close} className="adm-btn adm-btn-ghost adm-btn-icon shrink-0" aria-label="Schließen"><X size={18} strokeWidth={1.75} /></button>
        </header>

        <div className="flex-1 px-6 sm:px-8 py-8 space-y-10">
          <Section title="Texte">
            <div className="adm-seg">
              {LANGS.map(l => (
                <button key={l} onClick={() => setLang(l)} className="adm-seg-btn" data-active={lang === l}>
                  {l}
                  <span
                    className="adm-dot"
                    style={{ background: names[l]?.trim() ? 'var(--adm-success)' : 'var(--adm-faint)' }}
                    title={names[l]?.trim() ? 'Übersetzt' : 'Fehlt'}
                  />
                </button>
              ))}
            </div>
            <div>
              <label className="adm-label">Name ({lang}){lang === 'DE' && ' *'}</label>
              <input className="adm-input" value={names[lang] || ''} onChange={e => set({ name: { ...names, [lang]: e.target.value } })} />
            </div>
            <div>
              <label className="adm-label">Beschreibung ({lang})</label>
              <textarea
                className="adm-input min-h-[110px] leading-relaxed"
                value={descriptions[lang] || ''}
                onChange={e => set({ description: { ...descriptions, [lang]: e.target.value } })}
              />
              {lang !== 'DE' && <p className="text-xs adm-faint mt-1.5">Leer lassen = deutscher bzw. englischer Text wird angezeigt.</p>}
            </div>
          </Section>

          <Section title="Preis & Kategorie">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="adm-label">Preis</label>
                <div className="relative">
                  <input
                    className="adm-input pr-9 tabular-nums"
                    type="number"
                    step="0.01"
                    min="0"
                    value={Number.isFinite(draft.price) ? draft.price : ''}
                    onChange={e => set({ price: parseFloat(e.target.value) })}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 adm-muted pointer-events-none">€</span>
                </div>
              </div>
              <div>
                <label className="adm-label">Kategorie</label>
                <select className="adm-input" value={draft.category} onChange={e => set({ category: e.target.value as MenuCategory })}>
                  {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="adm-label">Unterkategorie</label>
                <input className="adm-input" list="admin-subcategories" value={draft.subcategory || ''} onChange={e => set({ subcategory: e.target.value })} />
                <datalist id="admin-subcategories">
                  {subcategories.map(s => <option key={s} value={s} />)}
                </datalist>
              </div>
            </div>
          </Section>

          <Section title="Foto">
            <label
              className="adm-drop flex items-center gap-5 p-4 cursor-pointer"
              data-over={dragOver}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
            >
              {draft.imageUrl
                ? <img src={draft.imageUrl} alt="" className="w-24 h-24 object-cover shrink-0" />
                : <div className="w-24 h-24 shrink-0 grid place-items-center bg-[var(--adm-surface-3)] adm-faint"><ImagePlus size={24} strokeWidth={1.5} /></div>}
              <div className="flex-1">
                <p className="font-medium inline-flex items-center gap-2">
                  {busy === 'upload' && <Loader2 size={16} className="animate-spin" />}
                  {draft.imageUrl ? 'Foto ersetzen' : 'Foto hochladen'}
                </p>
                <p className="text-[13px] adm-muted mt-1">Hierher ziehen oder tippen. Wird automatisch verkleinert.</p>
                {draft.imageUrl && (
                  <button type="button" onClick={e => { e.preventDefault(); set({ imageUrl: '' }); }} className="text-xs adm-faint hover:text-[var(--adm-danger)] mt-2">
                    Foto entfernen
                  </button>
                )}
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={e => handleImage(e.target.files?.[0])} />
            </label>
          </Section>

          <Section title="Allergene">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(allergenLegend).map(([code, text]) => (
                <button key={code} type="button" className="adm-toggle-chip" aria-pressed={draft.allergens?.includes(code) || false} onClick={() => toggleCode('allergens', code)}>
                  <span className="adm-code">{code}</span>{text}
                </button>
              ))}
            </div>
          </Section>

          <Section title="Zusatzstoffe">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(additiveLegend).map(([code, text]) => (
                <button key={code} type="button" className="adm-toggle-chip" aria-pressed={draft.additives?.includes(code) || false} onClick={() => toggleCode('additives', code)}>
                  <span className="adm-code">{code}</span>{text}
                </button>
              ))}
            </div>
          </Section>

          <Section title="Anzeige">
            <div className="adm-panel divide-y divide-[var(--adm-hair)]">
              <div className="flex items-center justify-between gap-4 px-4 py-4">
                <div>
                  <p className="text-sm font-medium">Auf der Karte sichtbar</p>
                  <p className="text-[13px] adm-muted mt-0.5">Ausschalten, wenn der Artikel ausverkauft ist.</p>
                </div>
                <Switch checked={draft.available !== false} onChange={v => set({ available: v })} label="Auf der Karte sichtbar" />
              </div>
              <div className="flex items-center justify-between gap-4 px-4 py-4">
                <div>
                  <p className="text-sm font-medium">Signature / Empfehlung</p>
                  <p className="text-[13px] adm-muted mt-0.5">Wird auf der Karte hervorgehoben.</p>
                </div>
                <Switch checked={draft.isSignature || false} onChange={v => set({ isSignature: v })} label="Signature" />
              </div>
            </div>
          </Section>
        </div>

        <footer className="adm-sheet-bar sticky bottom-0 px-6 sm:px-8 py-4 border-t space-y-3">
          {error && <p className="text-sm text-[var(--adm-danger)]" role="alert">{error}</p>}
          <div className="flex items-center justify-between gap-2">
            {!isNew
              ? (
                <button onClick={handleDelete} disabled={!!busy} className="adm-btn adm-btn-danger shrink-0" aria-label="Löschen">
                  {busy === 'delete' ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} strokeWidth={1.75} />}
                  <span className="hidden sm:inline">Löschen</span>
                </button>
              )
              : <span />}
            <div className="flex gap-2 flex-1 sm:flex-none">
              <button onClick={close} className="adm-btn adm-btn-ghost flex-1 sm:flex-none">Abbrechen</button>
              <button onClick={handleSave} disabled={!!busy} className="adm-btn adm-btn-primary flex-1 sm:flex-none sm:min-w-[128px]">
                {busy === 'save' && <Loader2 size={16} className="animate-spin" />} Speichern
              </button>
            </div>
          </div>
        </footer>
      </aside>
    </div>
  );
}
