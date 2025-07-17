const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// Veritabanı bağlantısını test et ve senkronize et (models/index.js içinde)
require("./src/models/index");

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Route dosyaları
const authRoutes = require("./src/Routers/auth.routes");
const userRoutes = require("./src/Routers/user.routes");
const categoryRoutes = require("./src/Routers/category.routes");
const producRoutes = require("./src/Routers/product.routes");
const commentRoutes = require("./src/Routers/comment.routes");
//image
app.use("/uploads", express.static("public/uploads"));

// Route kullanımları

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/product", producRoutes);
app.use("/api/comment", commentRoutes);

// Test endpoint
app.get("/", (req, res) => {
  res.send(" Server is up and running!");
});

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

// Swagger UI ile API dokümantasyonu
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
