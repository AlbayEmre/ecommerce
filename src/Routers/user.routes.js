const express = require("express");
const router = express.Router();
const userController = require("../Controller/user.controller");
const { protect } = require("../middlewares/auth");

/**
 * @route   DELETE /api/user/delete/:id
 * @desc    Delete a user by ID
 * @access  Protected (Requires authentication)
 */
router.delete("/delete/:id", protect, userController.deleteUser);

/**
 * @route   PUT /api/user/update/:id
 * @desc    Update a user by ID
 * @access  Protected (Requires authentication)
 */
router.put("/update/:id", protect, userController.updateUser);

/**
 * @route   PUT /api/user/delete/:id
 * @desc    Delete a user by ID
 * @access  Protected (Requires authentication)
 */
router.delete("/delete/:id", protect, userController.deleteUser);

module.exports = router;
