const { User } = require("../../Domain/index");
const { Op } = require("sequelize");

module.exports = {
  /**
   *  Find a user by ID
   * @param {number} id - User's primary key
   * @returns {Promise<User|null>}
   */
  findById: async (id) => {
    return await User.findByPk(id);
  },

  /**
   *  Find a user by email
   * @param {string} email - Email address
   * @returns {Promise<User|null>}
   */
  findByEmail: async (email) => {
    return await User.findOne({ where: { email } });
  },

  /**
   *  Delete a user by instance
   * @param {User} user - Sequelize user instance
   * @returns {Promise<void>}
   */
  deleteUser: async (user) => {
    await user.destroy();
  },

  /**
   *  Update user details
   * @param {User} user - Sequelize user instance
   * @param {Object} data - Fields to update
   * @returns {Promise<User>}
   */
  updateUser: async (user, data) => {
    user.fullName = data.fullName ?? user.fullName;
    user.email = data.email ?? user.email;
    user.password = data.password ?? user.password;
    user.isAdmin =
      typeof data.isAdmin !== "undefined" ? data.isAdmin : user.isAdmin;

    return await user.save();
  },

  /**
   *  Save password reset token and expiry
   * @param {User} user
   * @param {string} token
   * @param {Date} expireTime
   * @returns {Promise<void>}
   */
  saveResetToken: async (user, token, expireTime) => {
    user.resetPasswordToken = token;
    user.resetPasswordExpire = expireTime;
    await user.save();
  },

  /**
   *  Find user by hashed reset token
   * @param {string} hashedToken
   * @returns {Promise<User|null>}
   */
  findByResetToken: async (hashedToken) => {
    return await User.findOne({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { [Op.gt]: Date.now() },
      },
    });
  },

  /**
   *  Update user password and clear token fields
   * @param {User} user
   * @param {string} hashedPassword
   * @returns {Promise<void>}
   */
  updatePasswordAndClearToken: async (user, hashedPassword) => {
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;
    await user.save();
  },
};
