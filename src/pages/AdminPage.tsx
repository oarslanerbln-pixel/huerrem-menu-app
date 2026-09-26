import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { ChevronDown, Crown, ExternalLink, ImageOff, Loader2, LogOut, Plus, Search, ShieldAlert, Sparkles, Star, Upload } from 'lucide-react';
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

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="adm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">{children}</div>
    </div>
  );
}

function Brand({ subtitle = 'Menü-Verwaltung' }: { subtitle?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl grid place-items-center border adm-divider bg-[var(--adm-surface-2)]">
        <Crown size={20} className="adm-gold" />
      </div>
      <div className="leading-tight">
        <p className="adm-brand text-base sm:text-lg adm-gold whitespace-nowrap">Hürrem Sultan</p>
        <p className="text-xs adm-muted tracking-wide">{subtitle}</p>
      </div>
    </div>
  );
}

function Spinner() {
  return <div className="py-24 grid place-items-center"><Loader2 className="animate-spin adm-gold" /></div>;
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
    <div className="min-h-[80vh] grid place-items-center">
      <form onSubmit={submit} className="adm-card adm-rise w-full max-w-sm p-7 space-y-5">
        <Brand />
        <div>
          <h1 className="adm-serif text-3xl">Willkommen</h1>
          <p className="text-sm adm-muted mt-1">Melden Sie sich an, um die Speisekarte zu bearbeiten.</p>
        </div>
        <div className="space-y-3">
          <div>
            <label className="adm-label">E-Mail</label>
            <input className="adm-input" type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="adm-label">Passwort</label>
            <input className="adm-input" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
        </div>
        {error && <p className="text-sm text-[var(--adm-danger)]">{error}</p>}
        {info && <p className="text-sm text-[var(--adm-success)]">{info}</p>}
        <button disabled={busy} className="adm-btn adm-btn-primary w-full">
          {busy && <Loader2 size={16} className="animate-spin" />} Anmelden
        </button>
        <button type="button" onClick={reset} className="w-full text-xs adm-muted hover:text-[var(--adm-text)]">Passwort vergessen?</button>
      </form>
    </div>
  );
}

function StatTile({ label, value, icon, active, onClick }: { label: string; value: number; icon: ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="adm-card adm-stat" data-active={active}>
      <div className="flex items-center justify-between adm-muted text-xs uppercase tracking-wider">{label}{icon}</div>
      <p className="adm-serif text-3xl mt-1 tabular-nums">{value}</p>
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
    <div className="adm-card adm-rise p-5 mb-6 border-[var(--adm-border-strong)]">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div className="flex gap-3">
          <Sparkles size={20} className="adm-gold shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Aktualisierung verfügbar: {update.title}</p>
            <p className="text-sm adm-muted mt-0.5">{changes.length} Artikel betroffen. Eigene Änderungen bleiben erhalten – es wird nur ergänzt bzw. korrigiert.</p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => setOpen(o => !o)} className="adm-btn adm-btn-ghost">
            Details <ChevronDown size={15} className={open ? 'rotate-180 transition-transform' : 'transition-transform'} />
          </button>
          <button onClick={apply} disabled={busy} className="adm-btn adm-btn-primary">
            {busy && <Loader2 size={16} className="animate-spin" />} Übernehmen
          </button>
        </div>
      </div>
      {open && (
        <ul className="mt-4 max-h-80 overflow-y-auto adm-scroll divide-y divide-[var(--adm-border)] text-sm">
          {changes.map(c => (
            <li key={c.item.id} className="py-2 flex gap-3">
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
    <li className={`adm-row flex items-center gap-4 px-4 py-3 ${hidden ? 'opacity-55' : ''}`}>
      <button onClick={onOpen} className="flex items-center gap-4 flex-1 min-w-0 text-left">
        {item.imageUrl
          ? <img src={item.imageUrl} alt="" className="adm-thumb" loading="lazy" />
          : <div className="adm-thumb grid place-items-center adm-faint"><ImageOff size={18} /></div>}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-medium truncate">{nameOf(item)}</p>
            {item.isSignature && <span className="adm-badge adm-badge-gold inline-flex items-center gap-1"><Star size={10} /> Signature</span>}
            {hidden && <span className="adm-badge adm-badge-off">Ausgeblendet</span>}
            {!item.imageUrl && <span className="adm-badge">Ohne Foto</span>}
            {item.category === 'food' && !item.allergens?.length && <span className="adm-badge adm-badge-warn">Allergene fehlen</span>}
          </div>
          {codes.length > 0 && (
            <div className="flex gap-1 mt-1.5 flex-wrap">{codes.map(c => <span key={c} className="adm-code">{c}</span>)}</div>
          )}
        </div>
      </button>
      <span className="adm-gold tabular-nums font-medium whitespace-nowrap">{formatPrice(item.price)}</span>
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
    <>
      <header className="flex items-center justify-between gap-3 mb-8">
        <Brand />
        <div className="flex items-center gap-2 text-sm">
          <span className="hidden sm:block"><a href="/" target="_blank" rel="noopener" className="adm-btn adm-btn-ghost !py-2"><ExternalLink size={15} /> Speisekarte</a></span>
          <span className="hidden md:inline adm-faint px-2">{user.email}</span>
          <button onClick={() => signOut(adminAuth())} className="adm-btn adm-btn-ghost !py-2" title="Abmelden"><LogOut size={15} /><span className="hidden sm:inline">Abmelden</span></button>
        </div>
      </header>

      {loadError && <p className="mb-4 text-sm text-[var(--adm-danger)]">Menü konnte nicht geladen werden: {loadError}</p>}
      {items === null && !loadError && <Spinner />}

      {items !== null && items.length === 0 && (
        <div className="adm-card adm-rise p-6 mb-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <h2 className="adm-serif text-2xl">Die Datenbank ist noch leer</h2>
            <p className="text-sm adm-muted mt-1">Übernehmen Sie einmalig die aktuelle Karte – danach bearbeiten Sie alles hier.</p>
          </div>
          <button onClick={handleImport} disabled={importing} className="adm-btn adm-btn-primary">
            {importing ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />} Aktuelle Karte importieren
          </button>
        </div>
      )}

      {items !== null && items.length > 0 && (
        <>
          <UpdateBanner items={all} notify={notify} />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <StatTile label="Artikel" value={all.length} icon={<Crown size={14} />} active={quick === null} onClick={() => setQuick(null)} />
            <StatTile label="Ausgeblendet" value={stats.hidden} icon={<span className="w-2 h-2 rounded-full bg-[var(--adm-faint)]" />} active={quick === 'hidden'} onClick={() => toggleQuick('hidden')} />
            <StatTile label="Ohne Foto" value={stats.noPhoto} icon={<ImageOff size={14} />} active={quick === 'noPhoto'} onClick={() => toggleQuick('noPhoto')} />
            <StatTile label="Allergene fehlen" value={stats.noAllergens} icon={<ShieldAlert size={14} />} active={quick === 'noAllergens'} onClick={() => toggleQuick('noAllergens')} />
          </div>

          <div className="flex flex-col md:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 adm-faint" />
              <input className="adm-input !pl-10" placeholder="Artikel suchen…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button onClick={startNew} className="adm-btn adm-btn-primary"><Plus size={16} /> Neuer Artikel</button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1">
            <button className="adm-chip" data-active={category === 'all'} onClick={() => setCategory('all')}>
              Alle <span className="adm-chip-count">{all.length}</span>
            </button>
            {(Object.keys(CATEGORY_LABELS) as MenuCategory[]).filter(c => categoryCounts[c]).map(c => (
              <button key={c} className="adm-chip" data-active={category === c} onClick={() => setCategory(c)}>
                {CATEGORY_LABELS[c]} <span className="adm-chip-count">{categoryCounts[c]}</span>
              </button>
            ))}
          </div>

          <p className="text-xs adm-faint mb-3">{groups.count} Artikel</p>

          {groups.list.length === 0 && (
            <div className="adm-card p-10 text-center adm-muted">Keine Artikel gefunden.</div>
          )}

          <div className="space-y-6">
            {groups.list.map(([title, list]) => (
              <section key={title}>
                <h2 className="adm-section-title uppercase mb-2 px-1 flex items-center gap-3">
                  {title}<span className="adm-faint font-sans text-xs tracking-normal">{list.length}</span>
                  <span className="flex-1 h-px bg-[var(--adm-border)]" />
                </h2>
                <ul className="adm-card overflow-hidden divide-y divide-[var(--adm-border)]">
                  {list.map(item => (
                    <ItemRow key={item.id} item={item} onOpen={() => setEditing({ item, isNew: false })} onToggle={v => toggle(item, v)} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </>
      )}

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
        <div className="fixed bottom-6 inset-x-0 flex justify-center z-[60] pointer-events-none">
          <div className="adm-toast adm-rise text-sm" role="status">{toast}</div>
        </div>
      )}
    </>
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
    return <Shell><p className="mt-16 text-center adm-muted">Firebase ist nicht konfiguriert (siehe <code>.env.example</code>).</p></Shell>;
  }
  if (user === undefined) return <Shell><Spinner /></Shell>;
  if (!user) return <Shell><LoginForm /></Shell>;
  if (isAdmin === undefined) return <Shell><Spinner /></Shell>;
  if (!isAdmin) {
    return (
      <Shell>
        <div className="min-h-[70vh] grid place-items-center">
          <div className="adm-card max-w-sm p-7 text-center space-y-4">
            <Brand />
            <p className="adm-muted">Dieses Konto ({user.email}) hat keine Berechtigung, die Karte zu bearbeiten.</p>
            <button onClick={() => signOut(adminAuth())} className="adm-btn adm-btn-ghost">Abmelden</button>
          </div>
        </div>
      </Shell>
    );
  }
  return <Shell><MenuManager user={user} /></Shell>;
}
