const { User } = require("../models");

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
   * @param {string} [data.fullName]
   * @param {string} [data.email]
   * @param {string} [data.password] - Must be hashed before calling
   * @param {boolean} [data.isAdmin]
   * @returns {Promise<User>}
   */
  updateUser: async (user, data) => {
    user.fullName = data.fullName || user.fullName;
    user.email = data.email || user.email;
    user.password = data.password || user.password;
    user.isAdmin =
      typeof data.isAdmin !== "undefined" ? data.isAdmin : user.isAdmin;

    return await user.save();
  },
};
