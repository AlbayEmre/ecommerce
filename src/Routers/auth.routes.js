const express = require("express");
const router = express.Router();

const { protect } = require("../Middlewares/AuthMiddlewares/auth"); // Auth middleware
const authController = require("../Controller/auth.controller");
// @route   POST /api/auth/register
// @desc    Register new user
router.post("/register", authController.register);

// @route   POST /api/auth/login
// @desc    Login user
router.post("/login", authController.login);

// @route   POST /api/auth/refreshToken
// @desc    Generate new access token from old token
router.post("/refreshToken", authController.refreshToken);

// @route   POST /api/auth/logout
// @desc    Logout user (token silinir)
// @access  Private
router.post("/logout", protect, authController.logout);

// @route   PUT /api/auth/make-admin/:id
// @desc    Toggle user admin status
// @access  Private
router.put("/make-admin/:id", protect, authController.toggleAdminStatus);

// @route   POST /api/auth/forgot-password
// @desc    Send password reset link
// @access  Public
router.post("/forgot-password", authController.forgotPassword);

// @route   POST /api/auth/reset-password/:resetToken
// @desc    Reset password with token
// @access  Public
router.post("/reset-password/:resetToken", authController.resetPassword);

module.exports = router;
