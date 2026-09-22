import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Crown, Eye, EyeOff, Loader2, LogOut, Plus, Search, Upload } from 'lucide-react';
import { db, isFirebaseConfigured } from '../config/firebase';
import { adminAuth } from '../config/firebaseAdmin';
import { menuData as bundledMenu, type MenuCategory, type MenuItem } from '../data/menu';
import { deleteMenuItem, importMenu, saveMenuItem } from '../services/menuStore';
import { subscribeMenu } from '../services/menuFeed';
import ItemEditor from '../components/Admin/ItemEditor';
import { CATEGORY_LABELS } from '../components/Admin/constants';

const nameOf = (item: MenuItem) => (typeof item.name === 'string' ? item.name : item.name?.DE || item.name?.EN || item.id);

const newItemId = (name: string) =>
  `${name.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 30) || 'item'}_${Date.now().toString(36)}`;

function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white font-body">
      <div className="max-w-5xl mx-auto px-4 py-6">{children}</div>
    </div>
  );
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
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch {
      setError('Anmeldung fehlgeschlagen. E-Mail oder Passwort prüfen.');
    } finally {
      setBusy(false);
    }
  };

  const reset = async () => {
    if (!email.trim()) return setError('Bitte zuerst die E-Mail-Adresse eingeben.');
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setInfo('E-Mail zum Zurücksetzen des Passworts wurde gesendet.');
    } catch {
      setError('E-Mail konnte nicht gesendet werden.');
    }
  };

  const input = 'w-full rounded-lg bg-black/40 border border-white/15 px-3 py-2 outline-none focus:border-gold-400';
  return (
    <form onSubmit={submit} className="max-w-sm mx-auto mt-16 space-y-4 bg-neutral-900 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-2 text-gold-300"><Crown size={20} /><h1 className="font-brand text-xl">Menü-Verwaltung</h1></div>
      <input className={input} type="email" placeholder="E-Mail" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} />
      <input className={input} type="password" placeholder="Passwort" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
      {error && <p className="text-sm text-red-400">{error}</p>}
      {info && <p className="text-sm text-green-400">{info}</p>}
      <button disabled={busy} className="w-full py-2 rounded-lg bg-gold-500 text-black font-semibold disabled:opacity-50 inline-flex justify-center items-center gap-2">
        {busy && <Loader2 size={16} className="animate-spin" />} Anmelden
      </button>
      <button type="button" onClick={reset} className="w-full text-xs text-white/50 hover:text-white">Passwort vergessen?</button>
    </form>
  );
}

function MenuManager({ user }: { user: User }) {
  const [items, setItems] = useState<MenuItem[] | null>(null);
  const [loadError, setLoadError] = useState('');
  const [category, setCategory] = useState<MenuCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<{ item: MenuItem; isNew: boolean } | null>(null);
  const [importing, setImporting] = useState(false);

  useEffect(() => subscribeMenu(setItems, err => setLoadError(err.message)), []);

  const subcategories = useMemo(
    () => Array.from(new Set((items || []).map(i => i.subcategory).filter((s): s is string => Boolean(s)))).sort(),
    [items],
  );

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (items || [])
      .filter(i => category === 'all' || i.category === category)
      .filter(i => !q || nameOf(i).toLowerCase().includes(q) || (i.subcategory || '').toLowerCase().includes(q))
      .sort((a, b) =>
        a.category.localeCompare(b.category) ||
        (a.subcategory || '').localeCompare(b.subcategory || '') ||
        nameOf(a).localeCompare(nameOf(b)));
  }, [items, category, search]);

  const handleImport = async () => {
    if (!window.confirm(`Aktuelle Karte (${bundledMenu.length} Artikel) in die Datenbank übernehmen?`)) return;
    setImporting(true);
    try {
      await importMenu(bundledMenu);
    } catch (e) {
      alert(`Import fehlgeschlagen: ${e instanceof Error ? e.message : e}`);
    } finally {
      setImporting(false);
    }
  };

  const startNew = () => setEditing({
    isNew: true,
    item: {
      id: '',
      name: { DE: '' },
      description: { DE: '' },
      price: 0,
      category: category === 'all' ? 'drinks' : category,
      available: true,
    },
  });

  const save = async (item: MenuItem) => {
    const id = item.id || newItemId(nameOf(item));
    await saveMenuItem({ ...item, id });
    setEditing(null);
  };

  const remove = async (id: string) => {
    await deleteMenuItem(id);
    setEditing(null);
  };

  return (
    <>
      <header className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2 text-gold-300"><Crown size={20} /><h1 className="font-brand text-xl">Menü-Verwaltung</h1></div>
        <div className="flex items-center gap-3 text-sm">
          <span className="hidden sm:inline text-white/50">{user.email}</span>
          <button onClick={() => signOut(adminAuth())} className="inline-flex items-center gap-1 text-white/70 hover:text-white"><LogOut size={16} /> Abmelden</button>
        </div>
      </header>

      {loadError && <p className="mb-4 text-sm text-red-400">Menü konnte nicht geladen werden: {loadError}</p>}

      {items === null && !loadError && <div className="py-20 grid place-items-center"><Loader2 className="animate-spin text-gold-400" /></div>}

      {items !== null && items.length === 0 && (
        <div className="mb-6 p-5 rounded-2xl border border-gold-500/40 bg-gold-500/5">
          <p className="mb-3 text-white/80">Die Datenbank ist noch leer. Übernehmen Sie einmalig die aktuelle Karte, danach können Sie alles hier bearbeiten.</p>
          <button onClick={handleImport} disabled={importing} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold-500 text-black font-semibold disabled:opacity-50">
            {importing ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />} Aktuelle Karte importieren
          </button>
        </div>
      )}

      {items !== null && (
        <>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                className="w-full rounded-lg bg-black/40 border border-white/15 pl-9 pr-3 py-2 outline-none focus:border-gold-400"
                placeholder="Artikel suchen…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select
              className="rounded-lg bg-black/40 border border-white/15 px-3 py-2"
              value={category}
              onChange={e => setCategory(e.target.value as MenuCategory | 'all')}
            >
              <option value="all">Alle Kategorien</option>
              {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <button onClick={startNew} className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gold-500 text-black font-semibold">
              <Plus size={16} /> Neuer Artikel
            </button>
          </div>

          <p className="text-xs text-white/40 mb-2">{visible.length} Artikel</p>
          <ul className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-neutral-900/60">
            {visible.map(item => (
              <li key={item.id} className={`flex items-center gap-3 p-3 ${item.available === false ? 'opacity-50' : ''}`}>
                {item.imageUrl
                  ? <img src={item.imageUrl} alt="" className="w-12 h-12 rounded-lg object-cover flex-shrink-0" loading="lazy" />
                  : <div className="w-12 h-12 rounded-lg bg-white/5 flex-shrink-0" />}
                <button onClick={() => setEditing({ item, isNew: false })} className="flex-1 min-w-0 text-left">
                  <p className="truncate font-medium">{nameOf(item)}</p>
                  <p className="text-xs text-white/50 truncate">
                    {CATEGORY_LABELS[item.category]}{item.subcategory ? ` · ${item.subcategory}` : ''}
                    {!item.allergens?.length && item.category === 'food' ? ' · ⚠ keine Allergene' : ''}
                  </p>
                </button>
                <span className="text-gold-300 tabular-nums">{item.price.toFixed(2).replace('.', ',')} €</span>
                <button
                  onClick={() => saveMenuItem({ ...item, available: item.available === false })}
                  className="p-2 text-white/60 hover:text-white"
                  title={item.available === false ? 'Wieder anzeigen' : 'Ausblenden (z. B. ausverkauft)'}
                >
                  {item.available === false ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </li>
            ))}
          </ul>
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
    return <Shell><p className="mt-16 text-center text-white/70">Firebase ist nicht konfiguriert (siehe <code>.env.example</code>).</p></Shell>;
  }
  if (user === undefined) {
    return <Shell><div className="py-20 grid place-items-center"><Loader2 className="animate-spin text-gold-400" /></div></Shell>;
  }
  if (!user) return <Shell><LoginForm /></Shell>;
  if (isAdmin === undefined) {
    return <Shell><div className="py-20 grid place-items-center"><Loader2 className="animate-spin text-gold-400" /></div></Shell>;
  }
  if (!isAdmin) {
    return (
      <Shell>
        <div className="max-w-sm mx-auto mt-16 text-center space-y-4">
          <p className="text-white/80">Dieses Konto ({user.email}) hat keine Berechtigung, die Karte zu bearbeiten.</p>
          <button onClick={() => signOut(adminAuth())} className="text-gold-300 underline">Abmelden</button>
        </div>
      </Shell>
    );
  }
  return <Shell><MenuManager user={user} /></Shell>;
}
