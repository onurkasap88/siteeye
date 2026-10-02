/* ============================================================
   FIREBASE AYARLARI
   Firebase konsolu → Proje ayarları → Genel → Uygulamalarınız → Web
   bölümündeki firebaseConfig değerlerini aşağıya yapıştırın.
   Bu dosya (config.js) index.html ile aynı klasörde durmalı; uygulama
   güncellendiğinde yalnızca index.html değişir, bu dosya kalır.
   Bu değerler gizli değildir; güvenliği firestore.rules ve
   storage.rules dosyalarındaki kurallar sağlar.
   ============================================================ */
window.SITEEYE_CONFIG = {
  firebase: {
    apiKey: "AIzaSyAdqjYN9K4hmcR28LsTJNYhC_8nJdpx4jA",
    authDomain: "siteeye-3doa.firebaseapp.com",
    projectId: "siteeye-3doa",
    storageBucket: "siteeye-3doa.firebasestorage.app",
    messagingSenderId: "1022062006685",
    appId: "1:1022062006685:web:1c40c6aef91feb83e81f74"
  },
  /* İlk yönetici hesabını yalnızca bu e-posta oluşturabilir (firestore.rules ile aynı olmalı) */
  ilkYonetici: "onurkasap88@gmail.com"
};
