const { Product, Comment } = require("../models");

module.exports = {
  /**
   *  Get all products with their comments
   * @returns {Promise<Array<Product>>}
   */
  findAllWithComments: async () => {
    return await Product.findAll({
      include: {
        model: Comment,
        as: "comments",
        attributes: ["text", "username", "date"],
      },
    });
  },

  /**
   *  Get single product by ID (with comments)
   * @param {number} id - Product ID
   * @returns {Promise<Product|null>}
   */
  findByIdWithComments: async (id) => {
    return await Product.findByPk(id, {
      include: {
        model: Comment,
        as: "comments",
        attributes: ["text", "username", "date"],
      },
    });
  },

  /**
   *  Get product by ID (no includes)
   * @param {number} id
   * @returns {Promise<Product|null>}
   */
  findById: async (id) => {
    return await Product.findByPk(id);
  },

  /**
   *  Find product by name
   * @param {string} name
   * @returns {Promise<Product|null>}
   */
  findByName: async (name) => {
    return await Product.findOne({ where: { name } });
  },

  /**
   *  Create a new product
   * @param {Object} data - Product data
   * @returns {Promise<Product>}
   */
  createProduct: async (data) => {
    return await Product.create(data);
  },

  /**
   *  Update an existing product
   * @param {Product} product - Sequelize instance
   * @param {Object} data - Updated fields
   * @returns {Promise<Product>}
   */
  updateProduct: async (product, data) => {
    return await product.update(data);
  },

  /**
   *  Delete a product
   * @param {Product} product
   * @returns {Promise<void>}
   */
  deleteProduct: async (product) => {
    await product.destroy();
  },
};
