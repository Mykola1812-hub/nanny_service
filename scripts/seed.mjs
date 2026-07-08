import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function loadEnv() {
  try {
    const raw = readFileSync(resolve(root, '.env.local'), 'utf-8');
    for (const line of raw.split('\n')) {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        process.env[match[1].trim()] = match[2].trim();
      }
    }
  } catch {
    console.error('Could not read .env.local — copy .env.local.example first.');
    process.exit(1);
  }
}

async function seed() {
  loadEnv();

  const databaseURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;
  if (!databaseURL) {
    console.error('NEXT_PUBLIC_FIREBASE_DATABASE_URL is missing.');
    process.exit(1);
  }

  const babysitters = JSON.parse(
    readFileSync(resolve(root, 'babysitters.json'), 'utf-8'),
  );

  const nannies = {};
  babysitters.forEach((nanny, index) => {
    const key = `nanny_${String(index + 1).padStart(2, '0')}`;
    nannies[key] = nanny;
  });

  const response = await fetch(`${databaseURL}/nannies.json`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nannies),
  });

  if (!response.ok) {
    console.error('Seed failed:', response.status, await response.text());
    console.error(
      'Make sure the Realtime Database rules allow writes (test mode).',
    );
    process.exit(1);
  }

  console.log(`Seeded ${babysitters.length} nannies to ${databaseURL}/nannies`);
}

seed();
