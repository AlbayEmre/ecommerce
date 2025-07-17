const { Category, Product } = require("../models");

module.exports = {
  /**
   *  Get all categories with their associated products
   * @returns {Promise<Array<Category>>}
   */
  findAllWithProducts: async () => {
    return await Category.findAll({
      include: {
        model: Product,
        as: "products",
        attributes: ["name", "price"],
      },
    });
  },

  /**
   *  Get category by ID (with products)
   * @param {number} id - Category ID
   * @returns {Promise<Category|null>}
   */
  findByIdWithProducts: async (id) => {
    return await Category.findByPk(id, {
      include: {
        model: Product,
        as: "products",
        attributes: ["name", "price"],
      },
    });
  },

  /**
   *  Find a category by name
   * @param {string} name
   * @returns {Promise<Category|null>}
   */
  findByName: async (name) => {
    return await Category.findOne({ where: { name } });
  },

  /**
   *  Create a new category
   * @param {Object} data
   * @returns {Promise<Category>}
   */
  createCategory: async (data) => {
    return await Category.create(data);
  },

  /**
   *  Update an existing category
   * @param {Category} category - Sequelize instance
   * @param {Object} data - name, description
   * @returns {Promise<Category>}
   */
  updateCategory: async (category, data) => {
    category.name = data.name;
    category.description = data.description;
    return await category.save();
  },

  /**
   *  Delete a category by instance
   * @param {Category} category
   * @returns {Promise<void>}
   */
  deleteCategory: async (category) => {
    await category.destroy();
  },

  /**
   *  Find by ID without include
   * @param {number} id
   * @returns {Promise<Category|null>}
   */
  findById: async (id) => {
    return await Category.findByPk(id);
  },
};
