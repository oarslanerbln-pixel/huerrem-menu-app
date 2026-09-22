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

## Kurzanleitung für das Team

- **Preis/Text ändern:** Artikel antippen → ändern → *Speichern*. Texte je Sprache über DE/EN/TR/… umschalten.
- **Ausverkauft:** Augen-Symbol in der Liste antippen – der Artikel verschwindet von der Karte, bleibt aber gespeichert.
- **Foto:** *Foto hochladen* – wird automatisch verkleinert (max. 1200 px, WebP).
- **Allergene/Zusatzstoffe:** pro Artikel ankreuzen (Pflichtangabe nach LMIV). Speisen ohne Allergene sind in der Liste mit ⚠ markiert.
- **Neuer Artikel / Löschen:** *Neuer Artikel* oben, *Löschen* unten im Bearbeiten-Fenster.

## Lokale Entwicklung mit Emulatoren

```
firebase emulators:start --only auth,firestore,storage --project demo-huerrem
```
In `.env.local`: `VITE_FIREBASE_PROJECT_ID=demo-huerrem`, beliebiger `VITE_FIREBASE_API_KEY`,
`VITE_USE_FIREBASE_EMULATORS=true`, dann `npm run dev`.
