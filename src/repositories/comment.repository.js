const { Comment, Product } = require("../models");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

module.exports = {
  /**
   * Create a new comment
   * @param {Object} commentBody - text, username, productId
   * @returns {Promise<Comment>}
   */
  createComment: async (commentBody) => {
    // Optional: check if product exists
    const product = await Product.findByPk(commentBody.productId);
    if (!product) {
      throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    }

    const comment = await Comment.create({
      text: commentBody.text,
      username: commentBody.username,
      date: new Date(),
      productId: commentBody.productId,
    });

    return comment;
  },

  /**
   * Get all comments for a product
   * @param {number} productId
   * @returns {Promise<Array<Comment>>}
   */
  getCommentsByProductId: async (productId) => {
    const comments = await Comment.findAll({
      where: { productId },
      include: {
        model: Product,
        as: "product",
        attributes: ["id", "name", "price"],
      },
    });

    return comments;
  },

  /**
   * Get comment by ID
   * @param {number} id
   * @returns {Promise<Comment>}
   */
  getCommentById: async (id) => {
    const comment = await Comment.findByPk(id, {
      include: {
        model: Product,
        as: "product",
        attributes: ["id", "name", "price"],
      },
    });

    if (!comment) {
      throw new ApiError(httpStatus.NOT_FOUND, "Comment not found");
    }

    return comment;
  },

  /**
   * Update a comment
   * @param {number} id
   * @param {Object} updateData - { text, date }
   * @returns {Promise<Comment>}
   */
  updateComment: async (id, updateData) => {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new ApiError(httpStatus.NOT_FOUND, "Comment not found");
    }

    comment.text = updateData.text ?? comment.text;
    comment.date = updateData.date ?? comment.date;

    await comment.save();
    return comment;
  },

  /**
   * Delete comment by ID
   * @param {number} id
   * @returns {Promise<void>}
   */
  deleteComment: async (id) => {
    const comment = await Comment.findByPk(id);
    if (!comment) {
      throw new ApiError(httpStatus.NOT_FOUND, "Comment not found");
    }

    await comment.destroy();
  },
};
