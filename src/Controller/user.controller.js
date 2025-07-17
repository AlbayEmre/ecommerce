const httpStatus = require("http-status");
const userService = require("../Services/user.service");
const catchAsync = require("../utils/catchAsync");

/**
 * @desc    Delete a user by ID
 * @route   DELETE /api/user/:id
 * @access  Admin (or authorized roles)
 */
exports.deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await userService.deleteUserById(id);

  res.status(result.statusCode).json(result);
});

/**
 * @desc    Update a user by ID
 * @route   PUT /api/user/:id
 * @access  Admin or Self
 */
exports.updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedUser = await userService.updateUserById(id, req.body);
  res.status(updatedUser.statusCode).json(updatedUser);
});
