// start.js
const app = require("./startUp");
const { sequelize } = require("./src/db/connection");

const hostname = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

// Veritabanı senkronizasyonu ve ardından sunucu başlatma
sequelize
  .sync()
  .then(() => {
    app.listen(port, hostname, () => {
      console.log(` Server running at http://${hostname}:${port}`);
    });
  })
  .catch((error) => {
    console.error("Veritabanı senkronizasyon hatası:", error);
    process.exit(1); // Eğer veritabanı senkronize edilemezse uygulama sonlansın
  });
