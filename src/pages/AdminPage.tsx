import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { ChevronDown, ExternalLink, ImageOff, Loader2, LogOut, Plus, Search, Sparkles, Star, Upload } from 'lucide-react';
import { db, isFirebaseConfigured } from '../config/firebase';
import { adminAuth } from '../config/firebaseAdmin';
import { type MenuCategory, type MenuItem } from '../data/menu';
import { bundledMenu } from '../data/bundledMenu';
import { MENU_UPDATES, pendingChanges } from '../data/menuUpdates';
import { deleteMenuItem, importMenu, saveMenuItem, saveMenuItems } from '../services/menuStore';
import { subscribeMenu } from '../services/menuFeed';
import ItemEditor from '../components/Admin/ItemEditor';
import Switch from '../components/Admin/Switch';
import { CATEGORY_LABELS } from '../components/Admin/constants';
import '../components/Admin/admin.css';

const nameOf = (item: MenuItem) => (typeof item.name === 'string' ? item.name : item.name?.DE || item.name?.EN || item.id);

const newItemId = (name: string) =>
  `${name.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 30) || 'item'}_${Date.now().toString(36)}`;

const formatPrice = (p: number) => `${p.toFixed(2).replace('.', ',')} €`;

// Firebase Auth error codes → message the restaurant staff can act on.
const LOGIN_ERRORS: Record<string, string> = {
  'auth/invalid-credential': 'E-Mail oder Passwort ist falsch.',
  'auth/wrong-password': 'E-Mail oder Passwort ist falsch.',
  'auth/user-not-found': 'E-Mail oder Passwort ist falsch.',
  'auth/invalid-email': 'Bitte eine gültige E-Mail-Adresse eingeben.',
  'auth/user-disabled': 'Dieses Konto wurde deaktiviert.',
  'auth/too-many-requests': 'Zu viele Versuche. Bitte in ein paar Minuten erneut versuchen.',
  'auth/network-request-failed': 'Keine Internetverbindung.',
  'auth/api-key-not-valid': 'Konfigurationsfehler (API-Key). Bitte den Administrator informieren.',
  'auth/operation-not-allowed': 'E-Mail-Anmeldung ist in Firebase nicht aktiviert.',
};
const loginError = (e: unknown) => {
  const code = (e as { code?: string })?.code || '';
  return LOGIN_ERRORS[code] || `Anmeldung fehlgeschlagen${code ? ` (${code})` : ''}.`;
};

type QuickFilter = 'hidden' | 'noPhoto' | 'noAllergens' | null;

function Wordmark() {
  return (
    <div className="adm-wordmark">
      <span className="adm-wordmark-name">Hürrem Sultan</span>
      <span className="adm-wordmark-rule hidden sm:block" />
      <span className="adm-wordmark-sub hidden sm:block">Menü-Verwaltung</span>
    </div>
  );
}

function Shell({ children, actions }: { children: ReactNode; actions?: ReactNode }) {
  return (
    <div className="adm">
      <header className="adm-bar">
        <div className="adm-container adm-bar-inner">
          <Wordmark />
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </header>
      <main className="adm-container">{children}</main>
    </div>
  );
}

function Spinner() {
  return <div className="min-h-[60vh] grid place-items-center"><Loader2 size={20} className="animate-spin adm-muted" /></div>;
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [busy, setBusy] = useState(false);
  const auth = adminAuth();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    setInfo('');
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (err) {
      setError(loginError(err));
    } finally {
      setBusy(false);
    }
  };

  const reset = async () => {
    setError('');
    if (!email.trim()) return setError('Bitte zuerst die E-Mail-Adresse eingeben.');
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setInfo('Falls ein Konto existiert, wurde eine E-Mail zum Zurücksetzen gesendet.');
    } catch (err) {
      setError(loginError(err));
    }
  };

  return (
    <div className="min-h-[calc(100vh-57px)] flex items-center justify-center py-16">
      <form onSubmit={submit} className="adm-rise w-full max-w-[380px]">
        <p className="adm-eyebrow mb-4">Menü-Verwaltung</p>
        <h1 className="adm-title">Anmelden</h1>
        <p className="adm-subtitle">Melden Sie sich an, um die Speisekarte zu bearbeiten.</p>
        <div className="mt-10 space-y-5">
          <div>
            <label className="adm-label" htmlFor="adm-email">E-Mail</label>
            <input id="adm-email" className="adm-input" type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="adm-label" htmlFor="adm-password">Passwort</label>
            <input id="adm-password" className="adm-input" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
        </div>
        {error && <p className="mt-5 text-sm text-[var(--adm-danger)]" role="alert">{error}</p>}
        {info && <p className="mt-5 text-sm text-[var(--adm-success)]" role="status">{info}</p>}
        <button disabled={busy} className="adm-btn adm-btn-primary adm-btn-block mt-8">
          {busy && <Loader2 size={16} className="animate-spin" />} Anmelden
        </button>
        <div className="mt-6 text-center">
          <button type="button" onClick={reset} className="adm-link">Passwort vergessen?</button>
        </div>
      </form>
    </div>
  );
}

function StatTile({ label, value, active, warn, onClick }: { label: string; value: number; active: boolean; warn?: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="adm-stat" data-active={active} aria-pressed={active}>
      <p className="adm-stat-value">{value}</p>
      <p className="adm-stat-label flex items-center gap-2">
        {warn && value > 0 && <span className="adm-dot bg-[var(--adm-warn)]" />}
        {label}
      </p>
    </button>
  );
}

function UpdateBanner({ items, notify }: { items: MenuItem[]; notify: (m: string) => void }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const updates = useMemo(
    () => MENU_UPDATES.map(u => ({ update: u, changes: pendingChanges(items, u) })).filter(u => u.changes.length > 0),
    [items],
  );
  if (updates.length === 0) return null;
  const { update, changes } = updates[0];

  const apply = async () => {
    if (!window.confirm(`${changes.length} Artikel aktualisieren bzw. anlegen?`)) return;
    setBusy(true);
    try {
      await saveMenuItems(changes.map(c => c.item));
      notify(`Aktualisierung übernommen (${changes.length} Artikel)`);
    } catch (e) {
      notify(`Fehler: ${e instanceof Error ? e.message : e}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="adm-notice adm-rise p-5 sm:p-6 mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
        <div className="flex gap-4">
          <Sparkles size={18} strokeWidth={1.75} className="text-[var(--adm-gold)] shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Aktualisierung verfügbar: {update.title}</p>
            <p className="text-sm adm-muted mt-1">{changes.length} Artikel betroffen. Eigene Änderungen bleiben erhalten – es wird nur ergänzt bzw. korrigiert.</p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => setOpen(o => !o)} className="adm-btn adm-btn-ghost adm-btn-sm">
            Details <ChevronDown size={15} strokeWidth={1.75} className={open ? 'rotate-180 transition-transform' : 'transition-transform'} />
          </button>
          <button onClick={apply} disabled={busy} className="adm-btn adm-btn-primary adm-btn-sm">
            {busy && <Loader2 size={15} className="animate-spin" />} Übernehmen
          </button>
        </div>
      </div>
      {open && (
        <ul className="mt-5 max-h-80 overflow-y-auto adm-scroll border-t border-[var(--adm-hair)] divide-y divide-[var(--adm-hair)] text-sm">
          {changes.map(c => (
            <li key={c.item.id} className="py-3 flex gap-3">
              <span className={`adm-badge shrink-0 self-start ${c.isNew ? 'adm-badge-gold' : ''}`}>{c.isNew ? 'Neu' : 'Update'}</span>
              <div>
                <p className="font-medium">{nameOf(c.item)}</p>
                <p className="adm-muted">{c.notes.join(' · ')}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ItemRow({ item, onOpen, onToggle }: { item: MenuItem; onOpen: () => void; onToggle: (v: boolean) => void }) {
  const hidden = item.available === false;
  const codes = [...(item.allergens || []), ...(item.additives || [])];
  return (
    <li className={`adm-row ${hidden ? 'opacity-50' : ''}`}>
      <button onClick={onOpen} className="flex items-center gap-4 flex-1 min-w-0 text-left">
        {item.imageUrl
          ? <img src={item.imageUrl} alt="" className="adm-thumb" loading="lazy" />
          : <div className="adm-thumb grid place-items-center adm-faint"><ImageOff size={16} strokeWidth={1.5} /></div>}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="adm-row-name truncate">{nameOf(item)}</p>
            {item.isSignature && <span className="adm-badge adm-badge-gold"><Star size={9} strokeWidth={2.5} /> Signature</span>}
            {hidden && <span className="adm-badge adm-badge-off">Ausgeblendet</span>}
            {!item.imageUrl && <span className="adm-badge">Ohne Foto</span>}
            {item.category === 'food' && !item.allergens?.length && <span className="adm-badge adm-badge-warn">Allergene fehlen</span>}
          </div>
          {codes.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">{codes.map(c => <span key={c} className="adm-code">{c}</span>)}</div>
          )}
        </div>
      </button>
      <span className="adm-price whitespace-nowrap">{formatPrice(item.price)}</span>
      <Switch checked={!hidden} onChange={onToggle} label={hidden ? 'Wieder anzeigen' : 'Ausblenden (z. B. ausverkauft)'} />
    </li>
  );
}

function MenuManager({ user }: { user: User }) {
  const [items, setItems] = useState<MenuItem[] | null>(null);
  const [loadError, setLoadError] = useState('');
  const [category, setCategory] = useState<MenuCategory | 'all'>('all');
  const [quick, setQuick] = useState<QuickFilter>(null);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<{ item: MenuItem; isNew: boolean } | null>(null);
  const [importing, setImporting] = useState(false);
  const [toast, setToast] = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => subscribeMenu(setItems, err => setLoadError(err.message)), []);

  const notify = (msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2500);
  };

  const all = useMemo(() => items || [], [items]);
  const subcategories = useMemo(
    () => Array.from(new Set(all.map(i => i.subcategory).filter((s): s is string => Boolean(s)))).sort(),
    [all],
  );

  const stats = useMemo(() => ({
    hidden: all.filter(i => i.available === false).length,
    noPhoto: all.filter(i => !i.imageUrl).length,
    noAllergens: all.filter(i => i.category === 'food' && !i.allergens?.length).length,
  }), [all]);

  const categoryCounts = useMemo(() => {
    const counts: Partial<Record<MenuCategory, number>> = {};
    all.forEach(i => { counts[i.category] = (counts[i.category] || 0) + 1; });
    return counts;
  }, [all]);

  // Visible items grouped by "Kategorie · Unterkategorie", in a stable order.
  const groups = useMemo(() => {
    const q = search.trim().toLowerCase();
    const filtered = all
      .filter(i => category === 'all' || i.category === category)
      .filter(i => quick !== 'hidden' || i.available === false)
      .filter(i => quick !== 'noPhoto' || !i.imageUrl)
      .filter(i => quick !== 'noAllergens' || (i.category === 'food' && !i.allergens?.length))
      .filter(i => !q || nameOf(i).toLowerCase().includes(q) || (i.subcategory || '').toLowerCase().includes(q));
    const map = new Map<string, MenuItem[]>();
    filtered
      .sort((a, b) =>
        a.category.localeCompare(b.category) ||
        (a.subcategory || '').localeCompare(b.subcategory || '') ||
        nameOf(a).localeCompare(nameOf(b)))
      .forEach(i => {
        const key = `${CATEGORY_LABELS[i.category]}${i.subcategory ? ` · ${i.subcategory}` : ''}`;
        map.set(key, [...(map.get(key) || []), i]);
      });
    return { list: Array.from(map.entries()), count: filtered.length };
  }, [all, category, quick, search]);

  const handleImport = async () => {
    if (!window.confirm(`Aktuelle Karte (${bundledMenu.length} Artikel) in die Datenbank übernehmen?`)) return;
    setImporting(true);
    try {
      await importMenu(bundledMenu);
      notify(`${bundledMenu.length} Artikel importiert`);
    } catch (e) {
      alert(`Import fehlgeschlagen: ${e instanceof Error ? e.message : e}`);
    } finally {
      setImporting(false);
    }
  };

  const startNew = () => setEditing({
    isNew: true,
    item: { id: '', name: { DE: '' }, description: { DE: '' }, price: 0, category: category === 'all' ? 'drinks' : category, available: true },
  });

  const save = async (item: MenuItem) => {
    const id = item.id || newItemId(nameOf(item));
    await saveMenuItem({ ...item, id });
    setEditing(null);
    notify('Gespeichert');
  };

  const remove = async (id: string) => {
    await deleteMenuItem(id);
    setEditing(null);
    notify('Artikel gelöscht');
  };

  const toggle = async (item: MenuItem, visible: boolean) => {
    try {
      await saveMenuItem({ ...item, available: visible });
      notify(visible ? `„${nameOf(item)}“ wieder sichtbar` : `„${nameOf(item)}“ ausgeblendet`);
    } catch (e) {
      notify(`Fehler: ${e instanceof Error ? e.message : e}`);
    }
  };

  const toggleQuick = (f: QuickFilter) => setQuick(q => (q === f ? null : f));

  return (
    <Shell
      actions={
        <>
          <a href="/" target="_blank" rel="noopener" className="adm-btn adm-btn-ghost adm-btn-sm" title="Speisekarte öffnen">
            <ExternalLink size={15} strokeWidth={1.75} /><span className="hidden sm:inline">Speisekarte</span>
          </a>
          <span className="hidden lg:inline text-[13px] adm-faint px-2">{user.email}</span>
          <button onClick={() => signOut(adminAuth())} className="adm-btn adm-btn-ghost adm-btn-sm" title="Abmelden">
            <LogOut size={15} strokeWidth={1.75} /><span className="hidden sm:inline">Abmelden</span>
          </button>
        </>
      }
    >
      <div className="pb-24">
        <div className="adm-rise pt-12 sm:pt-16 pb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h1 className="adm-title">Speisekarte</h1>
            <p className="adm-subtitle">Artikel, Preise und Verfügbarkeit – Änderungen sind sofort live.</p>
          </div>
          {items !== null && items.length > 0 && (
            <button onClick={startNew} className="adm-btn adm-btn-primary shrink-0"><Plus size={16} strokeWidth={2} /> Neuer Artikel</button>
          )}
        </div>

        {loadError && <p className="mb-6 text-sm text-[var(--adm-danger)]" role="alert">Menü konnte nicht geladen werden: {loadError}</p>}
        {items === null && !loadError && <Spinner />}

        {items !== null && items.length === 0 && (
          <div className="adm-panel adm-rise p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-[-0.02em]">Die Datenbank ist noch leer</h2>
              <p className="text-sm adm-muted mt-2">Übernehmen Sie einmalig die aktuelle Karte – danach bearbeiten Sie alles hier.</p>
            </div>
            <button onClick={handleImport} disabled={importing} className="adm-btn adm-btn-primary">
              {importing ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} strokeWidth={1.75} />} Aktuelle Karte importieren
            </button>
          </div>
        )}

        {items !== null && items.length > 0 && (
          <>
            <UpdateBanner items={all} notify={notify} />
            <div className="adm-stats adm-rise mb-12">
              <StatTile label="Artikel gesamt" value={all.length} active={quick === null} onClick={() => setQuick(null)} />
              <StatTile label="Ausgeblendet" value={stats.hidden} active={quick === 'hidden'} onClick={() => toggleQuick('hidden')} />
              <StatTile label="Ohne Foto" value={stats.noPhoto} active={quick === 'noPhoto'} onClick={() => toggleQuick('noPhoto')} />
              <StatTile label="Allergene fehlen" value={stats.noAllergens} warn active={quick === 'noAllergens'} onClick={() => toggleQuick('noAllergens')} />
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 border-b border-[var(--adm-hair)]">
              <nav className="adm-tabs flex-1 order-2 md:order-1" aria-label="Kategorien">
                <button className="adm-tab" data-active={category === 'all'} onClick={() => setCategory('all')}>
                  Alle<span className="adm-tab-count">{all.length}</span>
                </button>
                {(Object.keys(CATEGORY_LABELS) as MenuCategory[]).filter(c => categoryCounts[c]).map(c => (
                  <button key={c} className="adm-tab" data-active={category === c} onClick={() => setCategory(c)}>
                    {CATEGORY_LABELS[c]}<span className="adm-tab-count">{categoryCounts[c]}</span>
                  </button>
                ))}
              </nav>
              <div className="relative md:w-72 order-1 md:order-2">
                <Search size={16} strokeWidth={1.75} className="absolute left-4 top-1/2 -translate-y-1/2 adm-faint pointer-events-none" />
                <input className="adm-input md:!h-10 !pl-11" placeholder="Artikel suchen" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
            </div>

            {(quick !== null || search.trim() !== '') && (
              <p className="text-[13px] adm-faint mt-4">{groups.count} Artikel gefunden</p>
            )}

            {groups.list.length === 0 && (
              <div className="py-24 text-center adm-muted">Keine Artikel gefunden.</div>
            )}

            {groups.list.map(([title, list]) => (
              <section key={title}>
                <div className="adm-group-head">
                  <h2 className="adm-section-title">{title}</h2>
                  <span className="text-xs adm-faint tabular-nums">{list.length}</span>
                </div>
                <ul>
                  {list.map(item => (
                    <ItemRow key={item.id} item={item} onOpen={() => setEditing({ item, isNew: false })} onToggle={v => toggle(item, v)} />
                  ))}
                </ul>
              </section>
            ))}
          </>
        )}
      </div>

      {editing && (
        <ItemEditor
          item={editing.item}
          isNew={editing.isNew}
          subcategories={subcategories}
          onSave={save}
          onDelete={remove}
          onClose={() => setEditing(null)}
        />
      )}

      {toast && (
        <div className="fixed bottom-8 inset-x-0 flex justify-center z-[60] pointer-events-none px-4">
          <div className="adm-toast adm-rise" role="status">{toast}</div>
        </div>
      )}
    </Shell>
  );
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [adminCheck, setAdminCheck] = useState<{ uid: string; ok: boolean } | null>(null);
  const isAdmin = user && adminCheck?.uid === user.uid ? adminCheck.ok : undefined;

  useEffect(() => {
    if (!isFirebaseConfigured) return;
    return onAuthStateChanged(adminAuth(), setUser);
  }, []);

  useEffect(() => {
    if (!user || !db) return;
    // Write access is enforced by firestore.rules; this only drives the UI message.
    getDoc(doc(db, 'admins', user.uid))
      .then(snap => setAdminCheck({ uid: user.uid, ok: snap.exists() }))
      .catch(() => setAdminCheck({ uid: user.uid, ok: false }));
  }, [user]);

  if (!isFirebaseConfigured) {
    return <Shell><p className="pt-24 text-center adm-muted">Firebase ist nicht konfiguriert (siehe <code>.env.example</code>).</p></Shell>;
  }
  if (user === undefined) return <Shell><Spinner /></Shell>;
  if (!user) return <Shell><LoginForm /></Shell>;
  if (isAdmin === undefined) return <Shell><Spinner /></Shell>;
  if (!isAdmin) {
    return (
      <Shell>
        <div className="min-h-[calc(100vh-57px)] flex items-center justify-center py-16">
          <div className="adm-rise max-w-[420px] text-center">
            <h1 className="adm-title">Kein Zugriff</h1>
            <p className="adm-subtitle">Dieses Konto ({user.email}) hat keine Berechtigung, die Karte zu bearbeiten.</p>
            <button onClick={() => signOut(adminAuth())} className="adm-btn adm-btn-ghost mt-10">Abmelden</button>
          </div>
        </div>
      </Shell>
    );
  }
  return <MenuManager user={user} />;
}
