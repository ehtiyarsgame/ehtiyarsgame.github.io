// Instagram açılış ızgarası: 9 kare görsel (1080×1080), her oyundan üç tane.
// Izgara üç satır: her satır bir oyun — logo, oynanış, çengel.
//
//   node tools/instagram-kit.mjs
//
// Oyun depolarının bu deponun yanında klonlu olmasını bekler; Chrome'u
// dunefall deposundaki puppeteer'dan alır.
import { mkdirSync, readFileSync, existsSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, resolve, dirname } from 'node:path';
import puppeteer from 'puppeteer';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(root, 'instagram');
mkdirSync(OUT, { recursive: true });

const b64 = (p) => readFileSync(p).toString('base64');
const png = (p) => 'data:image/png;base64,' + b64(p);
const svg = (p) => 'data:image/svg+xml;base64,' + b64(p);
const font = (p) => 'data:font/ttf;base64,' + b64(p);

const NUNITO = font(join(root, 'brand/fonts/Nunito-Black.ttf'));
const NUNITO_X = font(join(root, 'brand/fonts/Nunito-ExtraBold.ttf'));
const MARK = svg(join(root, 'brand/ehtiyars-mark.svg'));
const WORD = svg(join(root, 'brand/ehtiyars-wordmark-dark.svg'));

const GAMES = [
  {
    id: 'galaxypaws', name: 'Galaxy Paws', glow: '#6a3fb0', bg: '#17102b',
    icon: png(join(root, '../galaxypaws/docs/store/graphics/icon-512.png')),
    shot: join(root, '../galaxypaws/docs/store/graphics/shot-2-t045.png'),
    tag: 'Pofuduk pilotlar, şeker canavarlar, sonsuz galaksi.',
    hook: 'Tek parmak. Yüzlerce mermi.\nVe bir tavşan.',
    caption: [
      'Galaxy Paws — pofuduk pilotlar, şeker canavarlar, sonsuz bir galaksi. 🐰🚀',
      '',
      'Tek parmakla uçuyorsun; silahlar birleşiyor, filoya yeni pilotlar katılıyor,',
      'şeker canavarları dalga dalga geliyor. Ehtiyars Game’in ilk oyunu.',
      '',
      'Yakında Google Play’de.',
      '',
      '#indiegame #mobilegame #bulletheaven #roguelite #unity #indiedev #mobiloyun #türkoyun #ehtiyarsgame',
    ].join('\n'),
  },
  {
    id: 'lifetide', name: 'Lifetide', glow: '#3d3ca8', bg: '#0d1020',
    icon: png(join(root, '../mylife/store/icon-512.png')),
    shot: join(root, '../mylife/store/screenshots/tr/2-life.png'),
    tag: 'Bir ömür, binlerce karar.',
    hook: 'Sınava gerçekten\nçalışıyorsun.',
    caption: [
      'Lifetide — bir ömür, binlerce karar. 👶→👴',
      '',
      'Hayatını sadece tıklayarak değil, gerçekten oynayarak yaşıyorsun: sınavda soru',
      'çözüyorsun, maçta kafa vuruyorsun, hastaya teşhis koyuyorsun, pazarlık ediyorsun.',
      '500’den fazla mini oyun.',
      '',
      'Yakında Google Play’de.',
      '',
      '#indiegame #mobilegame #lifesim #simulation #indiedev #mobiloyun #türkoyun #hayatsimülasyonu #ehtiyarsgame',
    ].join('\n'),
  },
  {
    id: 'dunefall', name: 'Dunefall', glow: '#8a5a2a', bg: '#120d0a',
    icon: svg(join(root, 'brand/games/dunefall.svg')),
    shot: join(root, '../dunefall/store/graphics/shot-2-layers.png'),
    tag: 'Kumu elinle dök, duvardan duvara.',
    hook: 'Yukarıdan blok düşmüyor.\nKum senin elinde.',
    caption: [
      'Dunefall — kumu elinle dökersin. 🏜️',
      '',
      'Alttaki tepsiden bir cam tüp al, kutuya bas: tüp devrilir, kum parmağının altına',
      'akar. Parmağını gezdir, çizgi çizer gibi dök. Aynı renk duvardan duvara uzanınca',
      'bütün şerit erir.',
      '',
      'Reklamsız, internetsiz, sakin. Yakında Google Play’de.',
      '',
      '#indiegame #mobilegame #fallingsand #sandbox #puzzlegame #indiedev #mobiloyun #türkoyun #ehtiyarsgame',
    ].join('\n'),
  },
];

const BASE = [
  '@font-face { font-family: "N"; src: url(' + NUNITO + ') format("truetype"); font-weight: 900; }',
  '@font-face { font-family: "N"; src: url(' + NUNITO_X + ') format("truetype"); font-weight: 800; }',
  '* { box-sizing: border-box; }',
  'html, body { margin: 0; width: 1080px; height: 1080px; overflow: hidden; }',
  'body { font-family: "N", system-ui, sans-serif; color: #fff3e8; display: grid; place-items: center; }',
  '.foot { position: absolute; left: 0; right: 0; bottom: 44px; display: flex; align-items: center;',
  '        justify-content: center; gap: 14px; opacity: .72; }',
  '.foot img.m { width: 46px; height: 46px; }',
  '.foot img.w { height: 24px; }',
].join('\n');

const FOOT = '<div class="foot"><img class="m" src="' + MARK + '"><img class="w" src="' + WORD + '"></div>';

function card(g, kind) {
  const sky = 'radial-gradient(760px 620px at 50% 38%, ' + g.glow + ', ' + g.bg + ' 72%)';
  if (kind === 'logo') {
    return '<style>' + BASE + `
      body { background: ${sky}; }
      .wrap { text-align: center; }
      img.icon { width: 430px; height: 430px; border-radius: 108px;
                 filter: drop-shadow(0 26px 70px rgba(0,0,0,.55)); }
      h1 { font-size: 96px; font-weight: 900; margin: 40px 0 12px; letter-spacing: -1px; }
      p { font-size: 38px; font-weight: 800; margin: 0; opacity: .78; }
      </style>
      <div class="wrap"><img class="icon" src="${g.icon}"><h1>${g.name}</h1><p>${g.tag}</p></div>` + FOOT;
  }
  if (kind === 'hook') {
    return '<style>' + BASE + `
      body { background: ${sky}; }
      .wrap { text-align: center; padding: 0 96px; }
      h2 { font-size: 84px; line-height: 1.16; font-weight: 900; margin: 0 0 34px; white-space: pre-line; }
      .name { font-size: 34px; font-weight: 800; letter-spacing: 7px; text-transform: uppercase; opacity: .62; }
      </style>
      <div class="wrap"><h2>${g.hook}</h2><div class="name">${g.name}</div></div>` + FOOT;
  }
  // oynanış: dikey ekran görüntüsü kareye yerleşir, arkası oyunun kendi rengi
  return '<style>' + BASE + `
    body { background: ${sky}; }
    img.shot { height: 980px; border-radius: 30px; box-shadow: 0 30px 80px rgba(0,0,0,.6); }
    </style>
    <img class="shot" src="${png(g.shot)}">`;
}

const browser = await puppeteer.launch({ args: ['--no-sandbox', '--force-device-scale-factor=1'] });
const made = [];
for (const g of GAMES) {
  if (!existsSync(g.shot)) { console.log('atlandı: ' + g.shot + ' yok'); continue; }
  for (const kind of ['logo', 'shot', 'hook']) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
    await page.setContent(card(g, kind));
    await page.evaluate('document.fonts.ready');
    await new Promise((r) => setTimeout(r, 350));
    const name = (GAMES.indexOf(g) + 1) + '-' + g.id + '-' + kind + '.png';
    await page.screenshot({ path: join(OUT, name) });
    made.push(name);
    console.log(name);
    await page.close();
  }
}
await browser.close();

const rows = GAMES.map((g, i) => [
  '### ' + (i + 1) + '. satır — ' + g.name,
  '',
  'Görseller: `' + (i + 1) + '-' + g.id + '-logo.png`, `' + (i + 1) + '-' + g.id + '-shot.png`, `'
    + (i + 1) + '-' + g.id + '-hook.png`',
  '',
  'Açıklama (ilk gönderiye tam metin, diğer ikisine kısaltılmışı):',
  '',
  '```',
  g.caption,
  '```',
  '',
].join('\n')).join('\n');

writeFileSync(join(OUT, 'README.md'), [
  '# Instagram açılış kiti — @ehtiyarsgame',
  '',
  '`node tools/instagram-kit.mjs` ile üretildi. Dokuz kare, 1080×1080.',
  'Izgarada üç satır: **her satır bir oyun** — logo, oynanış, çengel.',
  '',
  '## Profil',
  '',
  '- **Profil fotoğrafı:** `brand/png/ehtiyars-avatar-1024.png`',
  '- **Paylaşım/kapak görseli:** `brand/png/ehtiyars-banner-1500x500.png`',
  '- **Bağlantı:** https://ehtiyarsgame.github.io',
  '- **Kategori:** Video oyun geliştirici / Video game developer',
  '',
  '**Bio (TR):**',
  '',
  '```',
  'Ehtiyars Game 🎮',
  'Bağımsız mobil oyun stüdyosu',
  'Galaxy Paws · Lifetide · Dunefall',
  'Üçü de aşağıda 👇',
  '```',
  '',
  '**Bio (EN):**',
  '',
  '```',
  'Ehtiyars Game 🎮',
  'Independent mobile game studio',
  'Galaxy Paws · Lifetide · Dunefall',
  'All three below 👇',
  '```',
  '',
  '## Paylaşım sırası',
  '',
  'Instagram ızgarası sondan başa dizilir: **9’dan 1’e doğru** paylaşırsan',
  'ızgarada birinci satır Galaxy Paws olur.',
  '',
  rows,
  '## Video',
  '',
  'Hareketli içerik en iyi telefondan çekilir: oyunu aç, Android’in ekran kaydını',
  'başlat, 15–20 saniye oyna. Dunefall’da kumun parmağı takip etmesi, Lifetide’da',
  'bir mini oyun, Galaxy Paws’ta bir dalga. Dikey 1080×1920 kayıt Reels için',
  'olduğu gibi kullanılabilir.',
  '',
  '## Hesabı kim açacak',
  '',
  'Instagram hesabı açmak şartları kabul etmeyi ve telefon doğrulaması gerektiriyor;',
  'bunu senin yapman gerek. Hesap açıldıktan sonra gönderiler bu klasörden sırayla',
  'paylaşılabilir.',
  '',
].join('\n'));

console.log('\n' + made.length + ' görsel + README → instagram/');
