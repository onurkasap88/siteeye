# SiteEye

Mikrolink İSG saha faaliyet takip uygulaması: aktivite, kaza/ramak kala, DÖF, ceza girişi; fotoğraf klasörleri; tarih aralığına göre rapor ve Excel çıktıları.

## Yapı
- `index.html` — tek dosyalık uygulama (HTML + CSS + JS).
- Veri, kullanıcı ve fotoğraf depolama claude.ai Artifact çalışma ortamının `window.claude` yeteneklerini (`db`, `user`, `assets`, `downloads`) kullanır. Dosya bu ortamın dışında açıldığında giriş ve kayıt çalışmaz.
- Harici kütüphaneler (SRI ile): SheetJS 0.18.5, JSZip 3.10.1, qrcodejs 1.0.0.

## Öne çıkanlar
- Admin/kullanıcı rolleri, PBKDF2 şifre, kullanıcı bazlı TOTP (authenticator), oturum zaman aşımı.
- Admin tarafından tanımlanan aktivite formu; başka bir liste alanına bağlı koşullu alanlar.
- Rapor: aktivite kayıtları, uzman performansı, lokasyon denetimleri, İSG performans, sayısal alan özetleri, kaza ve ceza raporları — her tablo ayrı Excel.
