const express = require("express");
const router = express.Router();
const commentController = require("../Controller/comment.controller");
const { protect } = require("../middlewares/auth");
// @route   POST /api/comments
// @desc    Create a new comment
router.post("/Create", protect, commentController.createComment);

// @route   GET /api/comments/product/:productId
// @desc    Get all comments for a specific product
router.get(
  "/getCommentsByProduct/:Id",
  protect,
  commentController.getCommentsByProductId
);

// @route   GET /api/comments/:id
// @desc    Get a single comment by ID
router.get("/GetComentsbyid/:id", protect, commentController.getCommentById);

// @route   PUT /api/comments/:id
// @desc    Update a comment by ID
router.put("/Update/:id", protect, commentController.updateComment);

// @route   DELETE /api/comments/:id
// @desc    Delete a comment by ID
router.delete("/delete/:id", protect, commentController.deleteComment);

module.exports = router;
