const httpStatus = require("http-status");
const authService = require("../Services/auth.service");
const catchAsync = require("../utils/catchAsync");

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = catchAsync(async (req, res) => {
  const result = await authService.registerUser(req.body);

  res.status(result.statusCode).json(result);
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body);

  res.status(result.statusCode).json(result);
});

/**
 * @desc    Refresh access token
 * @route   POST /api/auth/refresh-token
 * @access  Private (token in body or header)
 */
exports.refreshToken = catchAsync(async (req, res) => {
  const oldToken = req.body.token || req.headers["authorization"];
  const result = await authService.refreshAccessToken(oldToken);

  res.status(result.statusCode).json(result);
});

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
exports.logout = catchAsync(async (req, res) => {
  const token = req.body.token || req.headers["authorization"];
  const result = await authService.logoutUser(token);

  res.status(result.statusCode).json(result);
});

/**
 * @desc    Toggle admin status
 * @route   PATCH /api/auth/toggle-admin/:id
 * @access  Admin only
 */
exports.toggleAdminStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await authService.toggleAdminStatus(id);

  res.status(result.statusCode).json(result);
});
