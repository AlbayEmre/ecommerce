const categoryRepo = require("../repositories/category.repositories");

module.exports = {
  /**
   * Get all categories with their products
   * @returns {Object}
   */
  getAllCategories: async () => {
    const categories = await categoryRepo.findAllWithProducts([
      "name",
      "price",
    ]);

    return {
      statusCode: 200,
      message: "Success",
      categories,
    };
  },

  /**
   * Get a single category by ID
   * @param {number} id
   * @returns {Object|null}
   */
  getCategoryById: async (id) => {
    const category = await categoryRepo.findByIdWithProducts(id, [
      "name",
      "price",
    ]);

    if (!category)
      return {
        statusCode: 404,
        message: "Product not found",
      };

    return {
      statusCode: 200,
      message: "Success",
      category,
    };
  },

  /**
   * Create a new category
   * @param {Object} data
   * @returns {Object|null}
   */
  createCategory: async (data) => {
    const existing = await categoryRepo.findByName(data.name);
    if (existing) {
      return {
        statusCode: 409,
        message: "Category already exists",
      };
    }

    const category = await categoryRepo.createCategory(data);

    return {
      statusCode: 201,
      message: "Success",

      category,
    };
  },

  /**
   * Update a category
   * @param {number} id
   * @param {Object} data
   * @returns {Object|null}
   */
  updateCategory: async (id, data) => {
    const category = await categoryRepo.findById(id);
    if (!category)
      return {
        statusCode: 404,
        message: "Failed",
        message: "Category not found",
      };

    await categoryRepo.updateCategory(category, data);

    return {
      statusCode: 200,
      message: "Success",
      message: "Category updated successfully",
    };
  },

  /**
   * Delete a category
   * @param {number} id
   * @returns {Object|null}
   */
  deleteCategory: async (id) => {
    const category = await categoryRepo.findById(id);
    if (!category)
      return {
        statusCode: 404,
        message: "Failed",
        message: "Category not found",
      };

    await categoryRepo.deleteCategory(category);

    return {
      statusCode: 200,
      message: "Success",
      message: "Category deleted successfully",
    };
  },
};
