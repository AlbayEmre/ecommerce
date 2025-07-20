const logger = require("../log/logger");
const ApiError = require("../../utils/ApiError");

module.exports = async function (err, req, res, next) {
  logger.error(err.message, err);

  try {
    await logger.logToDB("error", err.stack || err.message);
  } catch (logErr) {
    console.error("Failed to write log to database:", logErr.message);
  }

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error ",
  });
};
