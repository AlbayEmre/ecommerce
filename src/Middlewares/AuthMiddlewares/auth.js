const jwt = require("jsonwebtoken"); // JWT işlemleri için
const config = require("../../Infrastructure/Config/index"); // JWT secret alınacak

// Express middleware: Giriş yapmış kullanıcıyı doğrular
function protect(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    // Token var mı? Bearer ile başlıyor mu?
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Yetkisiz. Token eksik." });
    }

    // "Bearer <token>" → sadece token kısmını al
    const token = authHeader.split(" ")[1];

    // Token'ı doğrula
    const decoded = jwt.verify(token, config.jwt.secret);

    // decoded içindeki kullanıcıyı req.user'a yerleştir
    req.user = decoded;

    // Her şey yolundaysa devam et
    next();
  } catch (err) {
    console.error("JWT doğrulama hatası:", err);
    res.status(401).json({ message: "Geçersiz token." });
  }
}

module.exports = { protect };
