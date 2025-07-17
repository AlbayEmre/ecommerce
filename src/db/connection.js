const { Sequelize } = require("sequelize");
const config = require("../Config/index"); // config dosyasını dahil ettik

// Sequelize bağlantısını oluştur
const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.pass,
  {
    host: config.db.host,
    port: config.db.port || 3306,
    dialect: "mysql",
    logging: false, // SQL sorgularının loglanmaması için false yapıldı
  }
);

// DB bağlantısını test et
const testConnection = async () => {
  try {
    await sequelize.authenticate(); // Veritabanı bağlantısını doğrulama
    console.log("MySQL bağlantısı başarılı.");
  } catch (error) {
    console.error("MySQL bağlantısı başarısız:", error);
  }
};

// Veritabanını senkronize et
const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true }); // Veritabanındaki tüm tabloları sıfırlar
    console.log("Veritabanı başarıyla senkronize edildi!");
  } catch (error) {
    console.error("Veritabanı senkronizasyon hatası:", error);
  }
};

// Export et
module.exports = {
  sequelize,
  testConnection,
  syncDB,
};
