// Ehtiyars Game — marka dosyalarını oyunlara dağıtır.
//
// Tek doğru kaynak bu depodur (brand/). Oyunlar kopyayla çalışır, çünkü her biri
// ayrı bir depo ve çevrimdışı açılmak zorunda. Kopya elle düzenlenmez:
//
//   node tools/sync-brand.mjs          kopyaları yeniler
//   node tools/sync-brand.mjs --check  farklı olanı listeler, hiçbir şey yazmaz (CI)
//
// Oyun depolarının bu deponun yanında klonlu olmasını bekler.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const check = process.argv.includes('--check');

// Her oyunun kendi klasörü: kaynak yol → oyun içindeki yol
const SHARED = {
  'brand/intro/ehtiyars-brand.css': 'brand/ehtiyars-brand.css',
  'brand/intro/ehtiyars-intro.js': 'brand/ehtiyars-intro.js',
  'brand/intro/ehtiyars-cross-promo.js': 'brand/ehtiyars-cross-promo.js',
  'brand/ehtiyars-mark.svg': 'brand/ehtiyars-mark.svg',
  'brand/ehtiyars-wordmark-dark.svg': 'brand/ehtiyars-wordmark.svg',
  'brand/games/galaxypaws.png': 'brand/games/galaxypaws.png',
  'brand/games/lifetide.png': 'brand/games/lifetide.png',
  'brand/games/dunefall.svg': 'brand/games/dunefall.svg',
};

const TARGETS = [
  { name: 'Dunefall', dir: '../dunefall/www' },
  { name: 'Lifetide', dir: '../mylife' },
];

let differ = 0, copied = 0, missing = [];
for (const t of TARGETS) {
  const base = resolve(root, t.dir);
  if (!existsSync(base)) { missing.push(`${t.name} (${t.dir})`); continue; }
  for (const [from, to] of Object.entries(SHARED)) {
    const src = readFileSync(join(root, from));
    const dst = join(base, to);
    const same = existsSync(dst) && Buffer.compare(src, readFileSync(dst)) === 0;
    if (same) continue;
    if (check) { console.log(`FARKLI  ${t.name}: ${to}`); differ++; continue; }
    mkdirSync(dirname(dst), { recursive: true });
    writeFileSync(dst, src);
    console.log(`yazıldı ${t.name}: ${to}`);
    copied++;
  }
}

if (missing.length) console.log(`atlandı (klonlu değil): ${missing.join(', ')}`);
if (check && differ) { console.error(`${differ} dosya kaynaktan farklı — node tools/sync-brand.mjs`); process.exit(1); }
console.log(check ? 'marka kopyaları kaynakla aynı' : `${copied} dosya güncellendi`);
