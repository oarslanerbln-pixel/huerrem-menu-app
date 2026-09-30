// Writes the Firebase web config to .env.production.local before `vite build`.
// The web config is public (it ships in every browser bundle), so a host without our
// .env.local (e.g. Vercel) reads it from the project's own Hosting endpoint.
// Values already present in the environment win. Fails the build instead of producing
// an app that runs unconfigured ("Firebase ist nicht konfiguriert").
import { writeFileSync } from 'node:fs';

const PROJECT = 'huerrem-menu-app-1';
const INIT_URL = `https://${PROJECT}.web.app/__/firebase/init.json`;

const FIELDS = {
  VITE_FIREBASE_API_KEY: 'apiKey',
  VITE_FIREBASE_AUTH_DOMAIN: 'authDomain',
  VITE_FIREBASE_PROJECT_ID: 'projectId',
  VITE_FIREBASE_STORAGE_BUCKET: 'storageBucket',
  VITE_FIREBASE_MESSAGING_SENDER_ID: 'messagingSenderId',
  VITE_FIREBASE_APP_ID: 'appId',
};

let init;
const lines = [];
for (const [name, field] of Object.entries(FIELDS)) {
  let value = process.env[name];
  if (!value) {
    if (!init) {
      const res = await fetch(INIT_URL);
      if (!res.ok) throw new Error(`${INIT_URL}: HTTP ${res.status}`);
      init = await res.json();
    }
    value = init[field];
  }
  if (!/^[A-Za-z0-9:_.-]+$/.test(value ?? '')) throw new Error(`${name} missing or invalid`);
  lines.push(`${name}=${value}`);
}

if (!lines.includes(`VITE_FIREBASE_PROJECT_ID=${PROJECT}`)) throw new Error(`web config is not for project ${PROJECT}`);

writeFileSync('.env.production.local', `${lines.join('\n')}\n`);
console.log(`Firebase web config for ${PROJECT} written to .env.production.local (${init ? 'from Hosting init.json' : 'from environment'})`);
