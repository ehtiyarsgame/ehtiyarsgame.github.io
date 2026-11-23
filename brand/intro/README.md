# Ehtiyars Game — ortak açılış

Üç oyunun hepsi aynı açılışla başlar: **stüdyo amblemi + "EHTIYARS GAME" + sunar**,
sonra oyunun kendi logosu. Toplam 3,3 saniye; ekrana dokunmak atlar.

| Oyun | Nasıl |
|---|---|
| Lifetide, Dunefall (HTML/Capacitor) | bu klasördeki `ehtiyars-brand.css` + `ehtiyars-intro.js` |
| Galaxy Paws (Unity) | `Assets/_Project/Scripts/UI/StudioIntro.cs` — aynı sıra, aynı süre, motoru kendi çizer |

Bu klasör **tek doğru kaynaktır**. Oyunlara kopyalanır, kopya elle düzenlenmez:
`node tools/sync-brand.mjs` kopyaları yeniler ve farklıysa uyarır.

## Oyuna ekleme

`<head>` içine:

```html
<link rel="stylesheet" href="brand/ehtiyars-brand.css">
```

`<body>`'nin **en başına** (JS yüklenmeden görünmesi için gövdede durur):

```html
<div id="eg-intro" class="eg-intro">
  <div class="eg-studio">
    <img class="eg-mark" src="brand/ehtiyars-mark.svg" alt="">
    <img class="eg-word" src="brand/ehtiyars-wordmark.svg" alt="Ehtiyars Game">
    <div class="eg-sub" data-eg-sub>sunar</div>
  </div>
  <div class="eg-game">
    <img class="eg-icon" src="icon.svg" alt="">
    <div class="eg-name">Oyunun Adı</div>
    <div class="eg-tag" data-eg-tag></div>
  </div>
</div>
```

Oyun hazır olduğunda, bir kez:

```js
EhtiyarsIntro.run({ lang: 'tr', tagline: 'Oyunun sloganı', since: t0 });
```

`since` sayfanın açıldığı an (`performance.now()` başlangıcı): oyun yüklenirken
geçen süre açılıştan düşülür, böylece yavaş telefonda açılış uzamaz.

## Oyuna özel yazı tipi

Oyun adı oyunun kendi tipografisiyle yazılır; şu üç değişken dışında hiçbir şey
değiştirilmez:

```css
#eg-intro { --eg-name-font: 900 44px/1.1 'Oyunun Fontu', system-ui, sans-serif;
            --eg-name-spacing: -1px;
            --eg-name-fill: linear-gradient(135deg, #fff, #b9b0ff 40%, #ffcf4d); }
```

## Künye ve çapraz tanıtım

Her oyunun ana menüsünün dibinde aynı künye durur (`.eg-foot`), altında
diğer iki oyuna giden iki simge (`cross-promo.js`).

## Kabul ölçütleri

1. Soğuk açılışta amblem → oyun logosu → oyun; toplam 3,3 ± 0,3 sn.
2. Açılış sırasında dokunma 0,6 sn içinde oyuna geçirir.
3. `prefers-reduced-motion` açıkken ölçek animasyonu yok, toplam 1,4 sn.
4. Açılış katmanı DOM'dan silinir (geride görünmez bir katman kalmaz).
5. Üç oyunun açılış ekran görüntüsü yan yana aynı amblemi, aynı yazıyı gösterir.
