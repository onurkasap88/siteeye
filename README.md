# SiteEye

Mikrolink İSG saha faaliyet takip uygulaması. Personel buradan aktivite, kaza / ramak kala, DÖF ve ceza kaydı girer. Fotoğraflar klasörlere ayrılır. Raporlar tarih aralığına göre alınır ve Excel'e aktarılır.

- `index.html`: uygulamanın tamamı (tek dosya)
- `config.js`: Firebase proje bilgileri (kurulumda doldurulur)
- `firestore.rules`, `storage.rules`: sunucu tarafı güvenlik kuralları (Firebase konsoluna yapıştırılır)
- `cors.json`: fotoğrafların ZIP indirmesi için Storage CORS ayarı
- `KURULUM.md`: adım adım kurulum

Altyapı: Firebase Authentication (e-posta/şifre + TOTP authenticator), Cloud Firestore, Cloud Storage. Barındırma: GitHub Pages.
