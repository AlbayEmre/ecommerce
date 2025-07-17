const commentRepo = require("../repositories/comment.repository");
const productRepo = require("../repositories/product.repositories");

module.exports = {
  /**
   * Create a new comment
   * @param {Object} data - { text, username, productId }
   * @returns {Object|null}
   */
  createComment: async (data) => {
    const product = await productRepo.findById(data.productId);
    if (!comment) return { statusCode: 404, message: "Comment filed false " };

    const newcomment = await commentRepo.createComment({
      text: data.text,
      username: data.username,
      date: new Date(),
      productId: data.productId,
    });

    return { statusCode: 201, message: "Succsess comment Update" };
  },

  /**
   * Get all comments for a product
   * @param {number} productId
   * @returns {Array}
   */
  getCommentsByProductId: async (productId) => {
    const comments = await commentRepo.getCommentsByProductId(productId);

    return { statusCode: 200, message: "Succsess", comments: comments };
  },

  /**
   * Get a comment by ID
   * @param {number} id
   * @returns {Object}
   */
  getCommentById: async (id) => {
    const comment = await commentRepo.getCommentById(id);

    return { statusCode: 200, message: "Sucsess", comment: comment };
  },

  /**
   * Update a comment by ID
   * @param {number} id
   * @param {Object} data - { text?, date? }
   * @returns {Object|null}
   */
  updateComment: async (id, data) => {
    const comment = await commentRepo.updateComment(id, data);

    return {
      statusCode: 200,
      message: "Successs",
    };
  },

  /**
   * Delete a comment by ID
   * @param {number} id
   * @returns {boolean}
   */
  deleteComment: async (id) => {
    await commentRepo.deleteComment(id);
    return { statusCode: 204, message: "Comment deleted successfully" };
  },
};
