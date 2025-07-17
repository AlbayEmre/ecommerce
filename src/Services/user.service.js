const bcrypt = require("bcryptjs");

const userRepo = require("../repositories/user.repository");

module.exports = {
  /**
   * Delete a user by their unique ID.
   *
   * @param {number} id - The ID of the user to be deleted.
   * @returns {Object} - Status and message
   * @throws {ApiError} - If user not found
   */
  deleteUserById: async (id) => {
    const user = await userRepo.findById(id);

    if (!user) {
      return {
        statusCode: 404,
        message: "User not found",
      };
    }

    await userRepo.deleteUser(user);

    return {
      statusCode: 200,
      message: "User deleted successfully",
    };
  },

  /**
   * Update user details by their ID
   *
   * @param {number} id - User's ID
   * @param {Object} data - Data to update (fullName, email, password, isAdmin)
   * @returns {Object} - Updated user info and status
   * @throws {ApiError} - If user not found
   */
  updateUserById: async (id, data) => {
    const user = await userRepo.findById(id);

    if (!user) {
      return {
        statusCode: 404,
        message: "User not found",
      };
    }

    // Only update provided fields
    user.fullName = data.fullName ?? user.fullName;
    user.email = data.email ?? user.email;

    if (data.password) {
      user.password = await bcrypt.hash(data.password, 12);
    }

    if (typeof data.isAdmin !== "undefined") {
      user.isAdmin = data.isAdmin;
    }

    const updatedUser = await userRepo.updateUser(user);

    return {
      statusCode: 200,
      message: "User updated successfully",
      user: {
        id: updatedUser.id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      },
    };
  },
};
