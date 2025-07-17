const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const commentService = require("../Services/comment.service");

/**
 * @function createComment
 * @description Create a new comment
 * @route POST /api/comments
 * @access Public
 */
exports.createComment = catchAsync(async (req, res) => {
  const newComment = await commentService.createComment(req.body);
  res.status(newComment.statusCode).json(newComment);
});

/**
 * @function getCommentsByProductId
 * @description Get all comments for a specific product
 * @route GET /api/comments/product/:productId
 * @access Public
 */
exports.getCommentsByProductId = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const comments = await commentService.getCommentsByProductId(productId);
  res.status(comments.statusCode).json(comments);
});

/**
 * @function getCommentById
 * @description Get a single comment by ID
 * @route GET /api/comments/:id
 * @access Public
 */
exports.getCommentById = catchAsync(async (req, res) => {
  const { id: commentId } = req.params;
  const comment = await commentService.getCommentById(commentId);
  res.status(comment.statusCode).json(comment);
});

/**
 * @function updateComment
 * @description Update a comment by its ID
 * @route PUT /api/comments/:id
 * @access Public
 */
exports.updateComment = catchAsync(async (req, res) => {
  const { id: commentId } = req.params;
  const updated = await commentService.updateComment(commentId, req.body);
  res.status(updated.statusCode).json(updated);
});

/**
 * @function deleteComment
 * @description Delete a comment by its ID
 * @route DELETE /api/comments/:id
 * @access Public
 */
exports.deleteComment = catchAsync(async (req, res) => {
  const { id: commentId } = req.params;
  const result = await commentService.deleteComment(commentId);
  res.status(result.statusCode).send(result);
});
