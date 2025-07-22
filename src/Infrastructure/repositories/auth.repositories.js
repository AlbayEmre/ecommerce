const { User } = require("../../Domain/index");

module.exports = {
  /**
   *  Find a user by their email address.
   * @param {string} email - The user's email.
   * @returns {Promise<User|null>} - Returns the user if found, otherwise null.
   */
  findByEmail: async (email) => {
    return await User.findOne({ where: { email } });
  },

  /**
   *  Find a user by their unique database ID.
   * @param {number} id - The user's primary key (ID).
   * @returns {Promise<User|null>} - Returns the user if found, otherwise null.
   */
  findById: async (id) => {
    return await User.findByPk(id);
  },

  /**
   *  Create a new user in the database.
   * This function expects pre-validated and hashed input.
   * @param {Object} userData - Includes fullName, email, and hashed password.
   * @returns {Promise<User>} - Returns the newly created user.
   */
  createUser: async ({ fullName, email, password }) => {
    return await User.create({ fullName, email, password });
  },

  /**
   *  Toggle the user's admin status.
   * Useful for promoting or demoting users.
   * @param {User} user - Sequelize user instance.
   * @returns {Promise<User>} - Returns the updated user object.
   */
  toggleAdmin: async (user) => {
    user.isAdmin = !user.isAdmin;
    await user.save();
    return user;
  },
};
