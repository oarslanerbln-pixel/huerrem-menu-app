# Menü-Verwaltung (`/admin`) – Einrichtung

Die Karte wird in **Firestore** gespeichert und unter `/admin` gepflegt. Die Gästekarte
lädt die Daten live; Änderungen sind sofort sichtbar, ohne neues Deployment.
Schreibrechte haben nur Konten, die in der Collection `admins` eingetragen sind
(durchgesetzt über `firestore.rules` / `storage.rules`).

## Einmalige Einrichtung (Firebase Console, Projekt `huerrem-menu-app-1`)

1. **Authentication** → *Jetzt starten* → Anbieter **E-Mail/Passwort** aktivieren.
   Unter *Einstellungen → Nutzeraktionen* „Erstellen (Registrierung) aktivieren“ ausschalten.
2. **Firestore Database** → *Datenbank erstellen* → Produktionsmodus, Region `europe-west3` (Frankfurt).
3. **Storage** → *Jetzt starten*.
4. **Projekteinstellungen → Allgemein → Meine Apps**: Web-App anlegen (falls keine existiert)
   und die Werte aus `firebaseConfig` in `.env.local` eintragen (Vorlage: `.env.example`).
5. **Authentication → Nutzer → Nutzer hinzufügen**: E-Mail + Passwort für das Restaurant.
   Die angezeigte **Nutzer-UID** kopieren.
6. **Firestore → Sammlung starten**: Name `admins`, Dokument-ID = kopierte UID,
   ein Feld `email` (string) mit der E-Mail-Adresse.
7. Deployen (im Projektordner):
   ```
   npm run build
   firebase deploy --only hosting,firestore:rules,storage
   ```
8. `https://huerrem-menu-app-1.web.app/admin` öffnen, anmelden und einmalig
   **„Aktuelle Karte importieren“** klicken.

Weitere Admins: Schritt 5 + 6 wiederholen. Zugang entziehen: Dokument in `admins` löschen.

## Automatisches Deployment (GitHub Actions)

`.github/workflows/deploy.yml`: Pull Requests werden geprüft (Lint + Build), jeder Merge nach `main`
wird gebaut und auf Firebase Hosting veröffentlicht. Firestore-/Storage-Regeln werden weiterhin
manuell deployt (`firebase deploy --only firestore:rules,storage`).

Einmalig einrichten:

1. **Dienstkonto:** Google Cloud Console → Projekt `huerrem-menu-app-1` → *IAM & Verwaltung → Dienstkonten*
   → *Dienstkonto erstellen* (z. B. `github-deploy`) mit den Rollen **Firebase Hosting Admin**,
   **API Keys Viewer** und **Cloud Run Viewer** → *Schlüssel → Schlüssel hinzufügen → JSON*.
2. **GitHub → Repository → Settings → Secrets and variables → Actions → New repository secret:**

   | Secret | Wert |
   |---|---|
   | `FIREBASE_SERVICE_ACCOUNT` | kompletter Inhalt der JSON-Datei aus Schritt 1 (Datei danach löschen) |
   | `VITE_FIREBASE_API_KEY` | aus `.env.local` |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | aus `.env.local` |
   | `VITE_FIREBASE_APP_ID` | aus `.env.local` |

3. **Actions → „Build & Deploy“ → Run workflow** startet das erste Deployment ohne neuen Commit.

Fehlt ein Secret, bricht der Deploy-Job vor dem Veröffentlichen ab; die Live-Seite bleibt unverändert.

## Kurzanleitung für das Team

- **Preis/Text ändern:** Artikel antippen → ändern → *Speichern*. Texte je Sprache über DE/EN/TR/… umschalten.
- **Ausverkauft:** Schalter rechts in der Liste ausschalten – der Artikel verschwindet von der Karte, bleibt aber gespeichert.
- **Foto:** Im Bearbeiten-Fenster antippen oder Bild hineinziehen – wird automatisch verkleinert (max. 1200 px, WebP).
- **Allergene/Zusatzstoffe:** pro Artikel antippen (Pflichtangabe nach LMIV).
- **Offene Aufgaben finden:** Die Kacheln oben (*Ohne Foto*, *Allergene fehlen*, *Ausgeblendet*) filtern die Liste mit einem Klick.
- **Neuer Artikel / Löschen:** *Neuer Artikel* oben, *Löschen* unten im Bearbeiten-Fenster.

## WordPress-Plugin (Speisekarte auf der eigenen Domain)

Das Plugin in `wordpress-plugin/huerrem-menu/` bindet die Karte in die Restaurant-Website ein:

- **Vollbild-Karte** unter `https://<domain>/speisekarte/` – diese Adresse für die QR-Codes verwenden.
- **Dashboard → Speisekarte → Bearbeiten**: die Menü-Verwaltung direkt in WordPress.
- **Shortcode** `[huerrem_menu]` zum Einbinden in beliebige Seiten.

Installation: Ordner `huerrem-menu` als ZIP packen → WordPress → *Plugins → Installieren → Plugin hochladen* →
aktivieren → *Speisekarte → Einstellungen* prüfen (Adresse, App-URL). Bei Permalinks „Einfach“ lautet die Adresse `/?huerrem_menu=1`.

## Lokale Entwicklung mit Emulatoren

```
firebase emulators:start --only auth,firestore,storage --project demo-huerrem
```
In `.env.local`: `VITE_FIREBASE_PROJECT_ID=demo-huerrem`, beliebiger `VITE_FIREBASE_API_KEY`,
`VITE_USE_FIREBASE_EMULATORS=true`, dann `npm run dev`.
