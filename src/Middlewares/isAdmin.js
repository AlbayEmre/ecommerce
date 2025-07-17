// middlewares/isAdmin.js
module.exports = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    // Kullanıcının admin olup olmadığını kontrol et
    return next(); // Eğer adminse işlemi gerçekleştirmesine izin ver
  } else {
    return res.status(403).json({ message: "Erişim yetkiniz yok." }); // Eğer admin değilse 403 döndür
  }
};
