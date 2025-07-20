# 🛒 E-Commerce Backend API

Bu proje; **Node.js + Express.js** kullanılarak geliştirilmiş, **MySQL** veritabanı üzerinde çalışan modüler bir e-ticaret RESTful API’sidir. JWT tabanlı kimlik doğrulama, rol bazlı erişim kontrolü, ürün–kategori–yorum yönetimi, input validasyonu, Swagger dokümantasyonu ve Winston loglama gibi özellikler içerir.

---

## 🚀 Özellikler
- **JWT** ile kullanıcı kimlik doğrulama  
- **Rol tabanlı** erişim kontrolü (Admin / Kullanıcı)  
- Ürün, kategori ve yorum işlemleri (**CRUD**)  
- **Sequelize ORM** ile MySQL bağlantısı  
- **Joi** ile güvenli input doğrulama  
- **Swagger UI** ile otomatik API dökümantasyonu  
- **Winston** loglama sistemi  
- Katmanlı & modüler dosya yapısı  

---

## ⚙️ Kurulum

### 1️⃣ Repo’yu klonlayın
```bash
git clone https://github.com/AlbayEmre/ecommerce.git
cd ecommerce
```

### 2️⃣ Bağımlılıkları yükleyin
```bash
npm install
```

### 3️⃣ Ortam değişkenlerini ayarlayın
Proje kök dizininde **.env** dosyası oluşturun:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecommerce
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Veritabanı migrasyonlarını çalıştırın
```bash
npx sequelize-cli db:migrate
```

### 5️⃣ Uygulamayı başlatın
```bash
npm start
```

> **Not:** Geliştirme modunda otomatik yeniden başlatma için `npm run dev` (nodemon) kullanabilirsiniz.

---

## 🔗 API Dökümantasyonu (Swagger)
Sunucu ayakta iken Swagger UI arayüzüne erişmek için:  
[`http://localhost:3000/api-docs`](http://localhost:3000/api-docs)

Swagger şeması dosyası: **`swagger.json`**

---

## 📂 Proje Yapısı
```text
ecommerce/
├── .env
├── app.js
├── startUp.js
├── swagger.json
├── package.json
├── package-lock.json
├── README.md
│
└── src/
    ├── Config/                # Uygulama konfigürasyonları
    │   └── index.js
    │
    ├── Controller/            # HTTP controller dosyaları
    │   └── ...
    │
    ├── Domain/                # Sequelize modelleri & ilişkiler
    │   ├── associations/
    │   ├── Category.model.js
    │   ├── Comment.model.js
    │   ├── Product.model.js
    │   ├── Token.model.js
    │   ├── User.model.js
    │   └── index.js
    │
    ├── Infrastructure/        # DB, log ve repository katmanı
    │   ├── db/
    │   ├── log/
    │   └── repositories/
    │
    ├── Middlewares/           # Auth & hata yakalama middleware’leri
    │   ├── AuthMiddlewares/
    │   └── ErrorMiddlewares/
    │
    ├── public/                # Statik dosyalar (ör. uploads/)
    │
    ├── Routers/               # Express router tanımları
    │   └── ...
    │
    ├── Services/              # İş mantığı katmanı
    │   └── ...
    │
    ├── utils/                 # Yardımcı (utility) fonksiyonlar
    │
    └── validation/            # Joi şema tanımları
```

---

## 🌐 Ortam Değişkenleri

| Değişken      | Açıklama                         |
| ------------- | -------------------------------- |
| `PORT`        | Sunucunun dinleyeceği port       |
| `DB_HOST`     | MySQL sunucusunun adresi         |
| `DB_USER`     | MySQL kullanıcı adı              |
| `DB_PASSWORD` | MySQL parolası                   |
| `DB_NAME`     | Kullanılacak veritabanı adı      |
| `JWT_SECRET`  | JWT oluşturmak için gizli anahtar|

---

## 🤝 Katkıda Bulunma

1. Bu repoyu **fork**’layın  
2. Yeni bir branch açın: `feature/ozellik-adi`  
3. Değişikliklerinizi commit edin  
4. **Pull Request** gönderin  

---

## 📬 İletişim
Her türlü soru, hata bildirimi veya geliştirme önerisi için issue oluşturabilir veya doğrudan iletişime geçebilirsiniz.  
Bu proje öğrenme ve katkı amacıyla tamamen **açık kaynak**tır.
