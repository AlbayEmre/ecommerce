const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenService = require("./token.service");


const authRepo = require("../repositories/auth.repositories");
module.exports = {
  /**
   * Register a new user
   * @param {Object} userData - Contains fullName, email, password
   * @returns {Object} Created user data with token
   * @throws {ApiError}
   */
  registerUser: async ({ fullName, email, password }) => {
    const existingUser = await authRepo.findByEmail(email);

    if (existingUser) {
      return {
        statusCode: 409,
        message: "Email already registered",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await authRepo.createUser({
      fullName,
      email,
      password: hashedPassword,
    });

    const payload = { id: user.id, isAdmin: user.isAdmin };
    const accessToken = await tokenService.generateToken(payload, {
      saveToDb: true,
      userId: user.id,
    });

    return {
      statusCode: 201,
      accessToken,
      expiresAt: 7,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    };
  },

  /**
   * Login user and return access token
   * @param {Object} credentials - Contains email and password
   * @returns {Object} Authenticated user and token
   * @throws {ApiError}
   */
  loginUser: async ({ email, password }) => {
    const user = await authRepo.findByEmail(email);

    if (!user) {
      return { statusCode: 404, success: false, reason: "User not found" };
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return {
        statusCode: 404,
        success: false,
        reason: "Invalid email or password",
      };
    }

    const payload = { id: user.id, isAdmin: user.isAdmin };
    const accessToken = await tokenService.generateToken(payload, {
      saveToDb: true,
      userId: user.id,
    });

    return {
      statusCode: 200,
      success: true,
      accessToken,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    };
  },
  /**
   * Refresh access token using old one
   * @param {string} oldToken
   * @returns {Object} New token
   * @throws {ApiError}
   */
  refreshAccessToken: async (oldToken) => {
    const decoded = tokenService.verifyToken(oldToken);

    const newToken = await tokenService.generateToken(
      { id: decoded.id, isAdmin: decoded.isAdmin },
      { saveToDb: true, userId: decoded.id }
    );

    return {
      statusCode: 200,
      message: "Token refreshed successfully",
      accessToken: newToken,
    };
  },

  /**
   * Logout user by invalidating token
   * @param {string} token
   * @returns {Object} Success message
   */
  logoutUser: async (token) => {
    await tokenService.invalidateToken(token);
    return {
      statusCode: 200,
      message: "Logout successful",
    };
  },

  /**
   * Toggle user's admin role
   * @param {number} id - User ID
   * @returns {Object} Result with new admin status
   * @throws {ApiError}
   */
  toggleAdminStatus: async (id) => {
    const user = await authRepo.findById(id);

    if (!user) {
      return {
        statusCode: 404,
        message: "User not found",
      };
    }

    user.isAdmin = !user.isAdmin;
    await authRepo.toggleAdmin(user);

    return {
      statusCode: 200,
      message: "Success",
      isAdmin: user.isAdmin,
      message: `User admin status changed to: ${user.isAdmin}`,
    };
  },
};
