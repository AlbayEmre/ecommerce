const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const userRepo = require("../Infrastructure/repositories/user.repository");
const sendEmail = require("../utils/sentEmail");

module.exports = {
  /**
   * Delete a user by their unique ID.
   *
   * @param {number} id - The ID of the user to be deleted.
   * @returns {Object} - Status and message
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
   */
  updateUserById: async (id, data) => {
    const user = await userRepo.findById(id);

    if (!user) {
      return {
        statusCode: 404,
        message: "User not found",
      };
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }

    const updatedUser = await userRepo.updateUser(user, data);

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

  /**
   * Forgot password - generates a token and sends email
   *
   * @param {string} email - User's email
   * @returns {Object} - Status and message
   */
  forgotPassword: async (email) => {
    const user = await userRepo.findByEmail(email);

    if (!user) {
      return {
        statusCode: 404,
        success: false,
        message: "Kullanıcı bulunamadı",
      };
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const expireTime = Date.now() + 1000 * 60 * 60;

    await userRepo.saveResetToken(user, hashedToken, expireTime);

    const resetURL = `https://seninsiten.com/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Şifre Sıfırlama Bağlantısı",
      text: `Şifreni sıfırlamak için şu linke tıkla:\n\n${resetURL}`,
    });

    return {
      statusCode: 200,
      success: true,
      message: "Sıfırlama bağlantısı e-posta ile gönderildi",
    };
  },

  /**
   * Reset password using valid token
   *
   * @param {string} token - Reset token from URL
   * @param {string} newPassword - New password to set
   * @returns {Object} - Status and message
   */
  resetPassword: async (token, newPassword) => {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await userRepo.findByResetToken(hashedToken);

    if (!user) {
      return {
        statusCode: 400,
        success: false,
        message: "Token geçersiz veya süresi dolmuş",
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await userRepo.updatePasswordAndClearToken(user, hashedPassword);

    return {
      statusCode: 200,
      success: true,
      message: "Şifre başarıyla sıfırlandı",
    };
  },
};
