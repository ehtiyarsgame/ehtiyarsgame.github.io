# Ehtiyars Game — üç oyunu teste çıkarma

Bu dosya üç oyunun Play Console'a nasıl yükleneceğini adım adım anlatır.
Her sorunun cevabı önceden hazır; hiçbirini tahmin etmen gerekmiyor.

Paketler hazır ve imzalı:

| Oyun | Paket | Dosya | Sürüm |
|---|---|---|---|
| Galaxy Paws | `com.ehtiyarsgame.galaxypaws` | [pofuduk-filo → Releases → **play**](https://github.com/ehtiyarsgame/pofuduk-filo/releases/tag/play) → `PofudukFilo.aab` — 37 MB, 23.11.2026 | CI derler |
| Lifetide | `com.ehtiyarsgame.lifetide` | `mylife/apk/Lifetide-1.0.1.aab` — 13,5 MB | 1.0.1 (23) |
| Dunefall | `com.ehtiyarsgame.dunefall` | `dunefall/apk/Dunefall-1.0.aab` — 3,8 MB | 1.0 (1) |

Üçünün imzası da `apksigner` / `keytool` ile anahtarın parmak iziyle
karşılaştırılıp doğrulandı (parmak izleri `keystore/README.md`'de).

Telefonda elle denemek için `.apk` dosyaları: Lifetide ve Dunefall yukarıdaki
klasörlerde, Galaxy Paws'ınki [**apk** release'inde](https://github.com/ehtiyarsgame/pofuduk-filo/releases/tag/apk)
(o APK hata ayıklama imzalıdır — yalnızca elle kurmak için, Play'e gitmez).

---

## 0. Önce şunu yap: anahtarı yedekle

`EhtiyarsGame/keystore/` klasöründeki `ehtiyars-upload.jks` ve `.password`
şifre yöneticine ve harici bir diske gitsin. **Bu anahtar giderse Lifetide ve
Dunefall'a bir daha güncelleme yayınlayamazsın.** Galaxy Paws'ın anahtarı ayrı
ve `pofuduk-filo` deposunda secret olarak duruyor; onun da bir kopyası sende olsun.

---

## 1. Her oyun için Play Console'da uygulama oluştur

**Tüm uygulamalar → Uygulama oluştur.**

| Alan | Galaxy Paws | Lifetide | Dunefall |
|---|---|---|---|
| Uygulama adı | Galaxy Paws | Lifetide: Play Your Life | Dunefall — Sand by Hand |
| Varsayılan dil | English (United States) | English (United States) | English (United States) |
| Uygulama mı oyun mu | Oyun | Oyun | Oyun |
| Ücretsiz mi ücretli mi | Ücretsiz | Ücretsiz | Ücretsiz |

> Ücretsiz seçimi **sonradan geri alınamaz** — ücretliye çeviremezsin. Üçü de ücretsiz.

---

## 2. Mağaza girişi (Store listing)

Metinler hazır:

| Oyun | Dosya |
|---|---|
| Galaxy Paws | `pofuduk-filo/docs/store/listing.md` |
| Lifetide | `mylife/store/listing.md` |
| Dunefall | `dunefall/store/listing.md` |

Görseller:

| Oyun | İkon 512² | Öne çıkan 1024×500 | Ekran görüntüleri |
|---|---|---|---|
| Galaxy Paws | `docs/store/graphics/icon-512.png` | `feature-1024x500.png` | `shot-1..6` |
| Lifetide | `store/icon-512.png` | `feature-1024x500-en.png` / `-tr.png` | `store/screenshots/en`, `/tr` |
| Dunefall | `store/graphics/icon-512.png` | `feature-1024x500.png` | `shot-1..4` |

Gizlilik politikası adresleri (hepsi yayında, 404 vermez):

- https://ehtiyarsgame.github.io/privacy/ — Galaxy Paws
- https://ehtiyarsgame.github.io/lifetide/privacy.html — Lifetide
- https://ehtiyarsgame.github.io/dunefall/privacy.html — Dunefall

Web sitesi: https://ehtiyarsgame.github.io · E-posta: ehtiyarsgame@gmail.com

---

## 3. Uygulama içeriği (App content) — her oyun için ayrı

Her oyunun `listing.md` dosyasındaki **"Play Console yanıtları"** bölümü bu
formların cevabıdır. Özet:

| Soru | Galaxy Paws | Lifetide | Dunefall |
|---|---|---|---|
| Reklam var mı | **Evet** (AdMob) | **Evet** (AdMob) | **Hayır** |
| Uygulama içi satın alma | Hayır | Hayır | Hayır |
| Uygulama erişimi | Giriş gerekmiyor | Giriş gerekmiyor | Giriş gerekmiyor |
| Hedef kitle | 13+ | 13+ | 13+ |
| Reklam kimliği (AD_ID) | Evet | Evet | **Hayır** |
| Veri toplama | Yok (AdMob hariç) | Yok (AdMob hariç) | **Hiç yok** |
| Devlet / finans / sağlık | Hayır | Hayır | Hayır |

İçerik derecelendirme anketinde üçü de aynı: şiddet yok, korku yok, cinsellik
yok, kumar yok, kullanıcılar arası etkileşim yok, konum paylaşımı yok.
Beklenen sonuç PEGI 3 / ESRB Everyone.

---

## 4. İç test (Internal testing) — ilk durak

**Test → İç test → Yeni sürüm oluştur.**

1. `.aab` dosyasını yükle.
2. Sürüm notuna kısa bir satır yaz (ör. "İlk iç test sürümü").
3. **Test kullanıcıları** sekmesinde bir e-posta listesi oluştur; kendi
   Gmail adresini ekle.
4. Kaydet → İncele → Yayınla.

İç test birkaç dakikada yayına girer. Listedeki adresle Play'e giren telefon
uygulamayı mağazadan indirebilir.

**Üç oyunu da burada dene.** Bakılacaklar:

- Açılışta amblem → oyun logosu → oyun geliyor mu, üçünde de aynı mı?
- Menüdeki "Diğer oyunlarımız" satırı doğru oyunlara gidiyor mu?
  (Galaxy Paws'ta Ayarlar'ın dibindeki stüdyo satırı siteyi açıyor mu?)
- Dunefall'da kum parmağı takip ediyor mu, tüp yarıda bırakılabiliyor mu?

---

## 5. Kapalı test (Closed testing) — zorunlu adım

Yeni bir kişisel geliştirici hesabı için Google **kapalı testte 14 gün boyunca
en az 12 test kullanıcısı** şartı koyuyor. Üretime çıkmadan önce bu tamamlanmalı.

- Kapalı test kanalı aç, 12 kişinin Gmail adresini ekle.
- 14 günlük sayaç, 12 kişi *katıldıktan* sonra işlemeye başlar.
- Bu süre üç oyun için ayrı ayrı işler; üçünü aynı gün başlatmak en hızlısı.

---

## 6. Üretim

Kapalı test şartı dolunca **Üretim → Yeni sürüm**. İlk incelemesi birkaç gün sürebilir.

Yayına girdiği gün:

1. `ehtiyarsgame.github.io/index.html` içinde o oyunun `.soon` satırını sil,
   yerine Play düğmesini koy (dosyada yorum olarak duruyor).
2. Oyunların içindeki "Diğer oyunlarımız" bağlantıları zaten Play adresine
   gidiyor; ayrıca bir şey yapmana gerek yok.
3. Instagram'da o oyunun satırını paylaş (`instagram/README.md`).

---

## Sende kalanlar

- [ ] İmza anahtarının yedeği
- [ ] Play Console'da üç uygulamanın oluşturulması ve formların doldurulması
- [ ] Kapalı test için 12 kişi
- [ ] Instagram hesabının açılması (telefon doğrulaması gerekiyor)
- [ ] Dunefall için reklam kararı — şimdilik reklamsız; tutunma ölçüldükten sonra
      `dunefall/README.md`'deki reklam politikasına göre AdMob açılabilir
