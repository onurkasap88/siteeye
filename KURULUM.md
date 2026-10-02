# SiteEye: Firebase kurulumu

Bu kurulum bir kez yapılır, yaklaşık 30 dakika sürer. Bittiğinde uygulama `https://onurkasap88.github.io/siteeye/` adresinden açılır. Personel bu adrese telefondan ya da bilgisayardan kendi e-postası, şifresi ve authenticator koduyla girer.

Gerekenler: Google hesabı (tercihen onurkasap88@gmail.com), GitHub'daki `siteeye` deposu ve bir banka kartı. Kart Blaze planı için isteniyor. Bu ölçekte (birkaç kullanıcı, birkaç GB fotoğraf) aylık maliyet genellikle 0–1 $ arasında kalır. 4. adımda bütçe uyarısı koyacağız.

---

## 1. Firebase projesini açın
1. https://console.firebase.google.com → **Proje ekle** → ad: `siteeye`. Google Analytics gerekmiyor, kapatabilirsiniz.
2. Proje açılınca sol alttaki **Spark** yazısına tıklayın → **Blaze planına yükseltin**. Fotoğraf deposu için Google bunu şart koşuyor.
3. Yükseltme ekranında **bütçe uyarısı** koyun, örneğin 5 $.

## 2. Giriş sistemini açın (Authentication)
1. Sol menü **Build → Authentication → Başlayın**.
2. **Sign-in method** sekmesi → **E-posta/Şifre** → *Etkinleştir* → Kaydet. "E-posta bağlantısı (şifresiz)" seçeneğini kapalı bırakın.
3. **Settings** sekmesi → **Identity Platform'a yükseltin**. Authenticator (TOTP) bunun için gerekli; bu ölçekte ücretsizdir.
4. Yine **Settings → Authorized domains** → **Alan ekle** → `onurkasap88.github.io`.
5. **Settings → User actions** bölümünde **"Enable create (sign-up)"** açık kalmalı. Yönetici yeni kullanıcıları uygulamanın içinden bu yolla açıyor. Kendi kendine hesap açan biri hiçbir kayda erişemez; buna kurallar izin vermiyor.
6. İsteğe bağlı: **Templates** sekmesinde e-posta dilini Türkçe yapın.

## 3. Authenticator'ı (TOTP) açın
Bu ayar Firebase ekranında yok, tek bir komutla açılıyor:
1. https://console.cloud.google.com → üstten `siteeye` projesini seçin → sağ üstteki **>_ (Cloud Shell)** simgesine tıklayın.
2. Açılan terminale aşağıdakini yapıştırın. Proje kimliği (`siteeye-3doa`) komuta zaten yazılı.
```bash
PROJE=siteeye-3doa
curl -X PATCH "https://identitytoolkit.googleapis.com/admin/v2/projects/$PROJE/config?updateMask=mfa" \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  -H "Content-Type: application/json" \
  -H "X-Goog-User-Project: $PROJE" \
  -d '{"mfa":{"providerConfigs":[{"state":"ENABLED","totpProviderConfig":{"adjacentIntervals":5}}]}}'
```
Yanıtta `"totpProviderConfig"` görüyorsanız tamamdır.

## 4. Veritabanı ve fotoğraf deposunu oluşturun
1. **Build → Firestore Database → Veritabanı oluştur** → konum: **europe-west1 (Belçika)** → **Production mode**.
2. Firestore'da **Rules** sekmesi → içeriği silin, bu paketteki **`firestore.rules`** dosyasının tamamını yapıştırın → **Yayınla**.
3. **Build → Storage → Başlayın** → konum: **europe-west1** → **Production mode**.
4. Storage'da **Rules** sekmesi → **`storage.rules`** dosyasının tamamını yapıştırın → **Yayınla**. Firebase "Storage'ın Firestore'u okumasına izin verilsin mi?" diye sorarsa **İzin ver** deyin.
5. Fotoğrafların ZIP olarak indirilebilmesi için Cloud Shell'e şunu yapıştırın. Kova adı (`siteeye-3doa.firebasestorage.app`) komuta zaten yazılı.
```bash
echo '[{"origin":["https://onurkasap88.github.io"],"method":["GET"],"maxAgeSeconds":3600}]' > cors.json
gcloud storage buckets update gs://siteeye-3doa.firebasestorage.app --cors-file=cors.json
```

## 5. Firebase bilgilerini uygulamaya girin
1. Firebase → ⚙️ **Proje ayarları → Genel → Uygulamalarınız → Web (`</>`)** → takma ad: `siteeye` → *Kaydet*. Firebase Hosting kutusunu işaretlemeyin.
2. **Bu adım tamam:** `config.js` sizin `siteeye-3doa` projenizin bilgileriyle dolduruldu.
3. `ilkYonetici` satırı ile `firestore.rules` içindeki `ilkYonetici()` aynı e-posta olmalı. Şu an ikisi de `onurkasap88@gmail.com`.

Bu değerler gizli değildir; sitenin kaynağında herkes görebilir, bu normaldir. Güvenliği 4. adımdaki kurallar sağlar.

## 6. GitHub Pages'te yayınlayın
1. github.com/onurkasap88/siteeye → **Add file → Upload files** → **`index.html`** ve 5. adımda düzenlediğiniz **`config.js`** dosyalarını birlikte yükleyin → *Commit changes*. Diğer dosyaların (kurallar, KURULUM, yedek) yüklenmesi gerekmez; `siteeye-veri.json`'u depoya **yüklemeyin**, kişisel veri içeriyor.
2. Depoda **Settings → Pages** → *Source*: **Deploy from a branch** → Branch: **main**, klasör: **/ (root)** → *Save*.
3. 1–2 dakika sonra uygulama **https://onurkasap88.github.io/siteeye/** adresinde açılır.

## 7. İlk yönetici hesabı ve eski verilerin aktarımı
1. Tarayıcıda **https://onurkasap88.github.io/siteeye/#kurulum** adresini açın (sondaki `#kurulum` önemli).
2. Ad soyad ve şifre belirleyin → e-postanıza gelen doğrulama bağlantısına tıklayın → **Doğruladım** → authenticator QR kodunu okutun → çıkıp şifre ve kodla yeniden girin.
3. **Ayarlar → Yedek → Yedekten yükle** → **`siteeye-veri.json`** dosyasını seçin → *Yedekten yükle*. Eski sürümdeki tüm aktivite, DÖF, kaza, ceza kayıtları, ayarlar ve fotoğraflar aktarılır.
4. **Kullanıcılar** sekmesinden personeli ekleyin. Ekranda çıkan adres, e-posta ve geçici şifreyi kişiye iletin. Kişinin e-postasına doğrulama bağlantısı da gider. İlk girişte kişi bu bağlantıya tıklar, şifresini değiştirir ve kendi authenticator'ını tanımlar.

---

## Güvenlik özeti
- Şifreleri Google (Firebase Authentication) saklar. Uygulama şifre görmez, saklamaz.
- Her girişte **şifre + authenticator kodu** istenir. Firestore ve Storage kuralları, authenticator ile yapılmamış girişlere hiçbir kaydı ve fotoğrafı açmaz. Bu kontrol sunucu tarafında yapılır, tarayıcıdan atlatılamaz.
- Pasifleştirilen kullanıcı anında erişimini kaybeder.
- Kullanıcı yalnızca kendi kaydını silebilir, kaydın sahibini değiştiremez. Ayarları ve kullanıcıları yalnızca yönetici değiştirir.
- Yüklenen fotoğraf ve PDF'ler değiştirilemez, silinemez. Yalnızca resim/PDF kabul edilir, en fazla 20 MB.
- Oturum tarayıcı sekmesi kapanınca biter. 30 dakika işlem yapılmazsa otomatik çıkış yapılır.

## Sık işlemler
- **Personel şifresini unuttu:** Giriş ekranındaki *Şifremi unuttum*'u kullanır, ya da yönetici Kullanıcılar'da *Şifre yenileme e-postası*'na basar.
- **Personel telefonunu kaybetti (authenticator yok):** Firebase konsolu → Authentication → Users → kişiyi bulun → ⋮ → **Hesabı sil**. Sonra SiteEye → Kullanıcılar'da kişiyi silip aynı e-postayla yeniden ekleyin. Eski kayıtları silinmez.
- **İşten ayrılan personel:** Kullanıcılar → *Pasifleştir*.
- **Uygulama güncellemesi:** GitHub'a yalnızca yeni `index.html`'i yükleyin; `config.js` olduğu gibi kalır.
