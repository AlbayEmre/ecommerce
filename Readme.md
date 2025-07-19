# 🛒 E-Commerce Backend API

Bu proje, Node.js + Express kullanılarak geliştirilmiş, MySQL veritabanı ile çalışan bir e-ticaret platformu için hazırlanmış RESTful API altyapısıdır. Kullanıcı kimlik doğrulama, ürün/kategori/yorum işlemleri, admin kontrolü ve Swagger tabanlı dökümantasyon içerir.

---

## 🚀 Özellikler

- JWT ile kullanıcı kimlik doğrulama  
- Rol tabanlı erişim kontrolü (Admin/Kullanıcı)  
- Ürün, kategori ve yorum işlemleri (CRUD)  
- Sequelize ORM ile MySQL bağlantısı  
- Swagger UI ile detaylı API dökümantasyonu  
- Joi ile input doğrulama  
- Winston loglama sistemi  
- Modüler dosya yapısı ile sürdürülebilir geliştirme  

---

## ⚙️ Kurulum

1. Depoyu klonlayın:
   ```bash
   git clone <repo-url>
   cd ecommerce-backend
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. `.env` dosyasını oluşturun:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=ecommerce
   JWT_SECRET=your_jwt_secret
   ```

4. Veritabanını hazırlayın:
   ```bash
   npx sequelize-cli db:migrate
   ```

5. Uygulamayı başlatın:
   ```bash
   npm start
   ```

---

## 🔗 Swagger Dokümantasyonu

Swagger UI arayüzü ile API endpoint'lerini test etmek için:  
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 📦 Ortam Değişkenleri

| Değişken      | Açıklama                         |
|---------------|----------------------------------|
| `PORT`        | Sunucu portu                     |
| `DB_HOST`     | MySQL host adresi                |
| `DB_USER`     | Veritabanı kullanıcı adı         |
| `DB_PASSWORD` | Veritabanı şifresi               |
| `DB_NAME`     | Veritabanı adı                   |
| `JWT_SECRET`  | JWT için gizli anahtar           |

---

## 📂 Proje Yapısı

```
ecommerce-backend/
├── app.js
├── startUp.js
├── .env
├── package.json
├── package-lock.json
├── swagger.json
├── Readme.md
├── node_modules/
└── src/
    ├── Config/              # Konfigürasyon ayarları
    ├── Controller/          # API route handler fonksiyonları
    ├── Middlewares/         # JWT, error, validation middleware'leri
    ├── Routers/             # Route tanımları
    ├── Services/            # İş mantığı katmanı
    ├── db/                  # Veritabanı bağlantısı
    ├── log/                 # Logger ayarları ve çıktıları
    ├── models/              # Sequelize model tanımları
    ├── public/
    │   └── uploads/         # Yüklenen dosyalar
    ├── repositories/        # DB erişim soyutlamaları
    ├── utils/               # Yardımcı fonksiyonlar
    └── validation/          # Joi ile input doğrulama şemaları
```

---

## 🤝 Katkı Sağlama

1. Projeyi fork’layın  
2. Yeni bir feature branch oluşturun  
3. Değişiklikleri commit edin  
4. Pull request gönderin

---

## 📄 Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Detaylar için `LICENSE` dosyasına göz atabilirsiniz.

---

## 📬 İletişim

Geri bildirim, öneri ve katkılar için iletişime geçebilirsiniz.  
Bu proje öğrenme ve geliştirme amacıyla herkese açıktır.
