const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const env = process.env;

// Database Configuration
const db = {
  host: env.DB_HOST,
  port: env.DB_PORT,
  name: env.DB_NAME,
  user: env.DB_USER,
  pass: env.DB_PASS,
};

// JWT Configuration
const jwt = {
  secret: env.JWT_SECRET,
  expiresIn: env.JWT_EXPIRES_IN || "15m", // Default 15 dakika
  refreshSecret: env.JWT_REFRESH_SECRET,
  refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN || "7d",
  accessExpirationMinutes: parseInt(env.JWT_ACCESS_EXP_MIN || "15", 10),
  refreshExpirationDays: parseInt(env.JWT_REFRESH_EXP_DAYS || "7", 10),
};

// Token Types (Kullanıcı işlemleri için gerekli enum değerleri)
const tokenTypes = {
  ACCESS: "access",
  REFRESH: "refresh",
  RESET_PASSWORD: "resetPassword",
  VERIFY_EMAIL: "verifyEmail",
};

// Application Config
const config = {
  env: env.NODE_ENV || "development",
  port: env.PORT || 3000,
  db,
  jwt,
  tokenTypes,
};

module.exports = config;
