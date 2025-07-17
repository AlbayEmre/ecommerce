
const productRepo = require("../repositories/product.repositories");

module.exports = {
  /**
   * Get product by ID (with comments)
   */
  getProductById: async (id) => {
    const product = await productRepo.findByIdWithComments(id, [
      "text",
      "username",
      "date",
    ]);

    if (!product) {
      return {
        statusCode: 404,
        message: "Product not found",
      };
    }

    return {
      statusCode: 200,
      message: "Product retrieved successfully",
      product,
    };
  },

  /**
   * Get all products with their comments
   */
  getAllProducts: async () => {
    const products = await productRepo.findAllWithComments([
      "text",
      "username",
      "date",
    ]);

    return {
      statusCode: 200,
      message: "Products retrieved successfully",
      products,
    };
  },

  /**
   * Create a new product
   */
  createProduct: async (data) => {
    const exists = await productRepo.findByName(data.name);
    if (exists) {
      return {
        statusCode: 409,
        message: "Product already exists",
      };
    }

    const product = await productRepo.create(data);

    return {
      statusCode: 201,
      message: "Product created successfully",
      product,
    };
  },

  /**
   * Update product by ID
   */
  updateProductById: async (id, data) => {
    const product = await productRepo.findById(id);
    if (!product) {
      return {
        statusCode: 404,
        message: "Product not found",
      };
    }

    const updatedProduct = await productRepo.updateProduct(product, data);

    return {
      statusCode: 200,
      message: "Product updated successfully",
      product: updatedProduct,
    };
  },

  /**
   * Delete product by ID
   */
  deleteProductById: async (id) => {
    const product = await productRepo.findById(id);
    if (!product) {
      return {
        statusCode: 404,
        message: "Product not found",
      };
    }

    await productRepo.delete(product);

    return {
      statusCode: 204,
      message: "Product deleted successfully",
    };
  },
};
