const logger = require("../utils/logger");

exports.getSomething = async (req, res, next) => {
  try {
    logger.info("Fetching item...");
    const item = await Item.findByPk(req.params.id);

    if (!item) {
      logger.warn(`Item not found with ID: ${req.params.id}`);
      return res.status(404).json({ message: "Not found" });
    }

    logger.debug("Item found:", item);
    res.status(200).json(item);
  } catch (err) {
    logger.error("Error fetching item:", err);
    next(err);
  }
};
