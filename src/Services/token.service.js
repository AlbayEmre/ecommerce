const jwt = require("jsonwebtoken");
const config = require("../Config/index"); // doğru path ile
const tokenRepo = require("../repositories/token.repositoriy");

module.exports = {
  /**
   * @desc     Generate a JWT and optionally store in DB
   * @param    {Object} payload - JWT payload (e.g. userId, isAdmin)
   * @param    {Object} options - { saveToDb: boolean, userId: number }
   * @returns  {Promise<Object>} - { statusCode, message, token }
   */
  generateToken: async (payload, { saveToDb = false, userId = null } = {}) => {
    const token = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });

    if (saveToDb && userId) {
      await tokenRepo.createToken({
        userId,
        token,
        expiresAt: new Date(Date.now() + parseJwtExp(config.jwt.expiresIn)),
      });
    }
    console.log(token);
    return {
      token,
    };
  },

  /**
   * @desc     Verify a token
   * @param    {string} token
   * @returns  {Object} - Decoded payload
   * @throws   {ApiError}
   */
  verifyToken: (token) => {
    try {
      return jwt.verify(token, config.jwt.secret);
    } catch (err) {
      throw new Error("Invalid refresh token");
    }
  },

  /**
   * @desc     Invalidate token by removing from DB
   * @param    {string} token
   * @returns  {Object}
   */
  invalidateToken: async (token) => {
    await tokenRepo.deleteToken(token);
    return {
      statusCode: 200,
      message: "Token invalidated successfully",
    };
  },

  /**
   * @desc     Refresh a new token from valid old one
   * @param    {string} oldToken
   * @returns  {Object} - { statusCode, token }
   * @throws   {ApiError}
   */
  refreshToken: async (oldToken) => {
    let decoded;
    try {
      decoded = jwt.verify(oldToken, config.jwt.secret);
    } catch (err) {
      throw new Error("Invalid refresh token");
    }

    const token = jwt.sign(
      { id: decoded.id, isAdmin: decoded.isAdmin },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    return {
      statusCode: 200,
      message: "Token refreshed successfully",
      token,
    };
  },
};

/**
 * Utility: Converts JWT time formats (e.g. "7d") to milliseconds
 * @param {string} exp
 * @returns {number}
 */
function parseJwtExp(exp) {
  const match = /^(\d+)([smhd])$/.exec(exp);
  if (!match) return 0;

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case "s":
      return value * 1000;
    case "m":
      return value * 60 * 1000;
    case "h":
      return value * 60 * 60 * 1000;
    case "d":
      return value * 24 * 60 * 60 * 1000;
    default:
      return 0;
  }
}
