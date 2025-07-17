const { createLogger, format, transports } = require("winston");
const { Log } = require("./Model/log.moldel"); // Sequelize log modeli
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const logger = createLogger({
  level: "error",
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/errors.log", level: "error" }),
  ],
});

//  SQL'e log yazma (manuel)
logger.logToDB = async (level, message) => {
  try {
    await Log.create({ level, message });
  } catch (err) {
    console.error("SQL log yazılamadı:", err.message);
  }
};

module.exports = logger;
