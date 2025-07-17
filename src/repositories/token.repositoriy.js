const { Token } = require("../models");

module.exports = {
  /**
   *  Save a new token for a user
   * @param {Object} data - Token data
   * @param {number} data.userId - Associated user's ID
   * @param {string} data.token - The refresh token string
   * @param {Date} [data.expiresAt] - Optional expiration date
   * @returns {Promise<Token>}
   */
  createToken: async ({ userId, token, expiresAt }) => {
    return await Token.create({ userId, token, expiresAt });
  },

  /**
   *  Find token by its string value
   * @param {string} token - Token string
   * @returns {Promise<Token|null>}
   */
  findByToken: async (token) => {
    return await Token.findOne({ where: { token } });
  },

  /**
   *  Delete a token by its string value
   * @param {string} token - Token string
   * @returns {Promise<number>} - Number of deleted rows
   */
  deleteToken: async (token) => {
    return await Token.destroy({ where: { token } });
  },

  /**
   *  Delete all tokens for a specific user (optional)
   * @param {number} userId - User ID
   * @returns {Promise<number>}
   */
  deleteAllTokensForUser: async (userId) => {
    return await Token.destroy({ where: { userId } });
  },
};
