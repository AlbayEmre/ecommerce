# 🛒 Ecommerce Backend API

Bu proje, bir e-ticaret platformu için geliştirilmiş Node.js tabanlı RESTful bir backend API'dir. Kullanıcı yönetimi, ürünler, kategoriler, yorumlar ve kimlik doğrulama gibi özellikler içerir.

## 🚀 Özellikler

- JWT ile kullanıcı kimlik doğrulama
- Admin yetkilendirmesi
- Ürün, kategori ve yorum CRUD işlemleri
- Sequelize ORM ile MySQL veritabanı bağlantısı
- Swagger ile API dokümantasyonu
- Gelişmiş hata yönetimi ve logger sistemi

## 🧱 Proje Yapısı

```
ecommerce/
├── app.js
├── startUp.js
├── .env
├── package.json
├── swagger.json
├── Config/
├── Controller/
├── db/
├── log/
├── Middlewares/
└── models/
```

## 🔧 Kurulum

1. Bu depoyu klonlayın veya ZIP olarak indirin:
   ```bash
   git clone <repo-url>
   cd ecommerce
   ```

2. Gerekli bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. `.env` dosyasını oluşturun ve aşağıdaki ortam değişkenlerini doldurun:

   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=ecommerce
   JWT_SECRET=your_jwt_secret
   ```

4. Sequelize ile veritabanı tablolarını oluşturun (otomatik sync kullanılıyorsa bu adım otomatik yapılır).

## ▶️ Çalıştırma

```bash
npm start
```

API varsayılan olarak `http://localhost:3000` adresinde çalışır.

## 📘 API Dokümantasyonu

Swagger arayüzü üzerinden API'yi test etmek için aşağıdaki URL'yi ziyaret edin:

```
http://localhost:3000/api-docs
```

## 📦 Bağımlılıklar

- express
- bcryptjs
- cookie-parser
- dotenv
- joi
- jsonwebtoken
- mysql2
- sequelize
- swagger-jsdoc
- swagger-ui-express
- http-status

## 👨‍💻 Geliştirici

Şu anda `package.json` içinde geliştirici bilgisi bulunmuyor. Lütfen `package.json` dosyasına `author` alanını eklemeyi unutmayın.
