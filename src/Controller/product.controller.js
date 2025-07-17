const catchAsync = require("../utils/catchAsync");
const productService = require("../Services/product.service");

/**
 * @desc    Get product by ID
 * @route   GET /api/products/:id
 */
exports.getProductById = catchAsync(async (req, res) => {
  const result = await productService.getProductById(req.params.id);
  res.status(result.statusCode).json(result);
});

/**
 * @desc    Get all products
 * @route   GET /api/products
 */
exports.getAllProducts = catchAsync(async (req, res) => {
  const result = await productService.getAllProducts();
  res.status(result.statusCode).json(result);
});

/**
 * @desc    Create a new product
 * @route   POST /api/products
 */
exports.createProduct = catchAsync(async (req, res) => {
  const result = await productService.createProduct(req.body);
  res.status(result.statusCode).json(result);
});

/**
 * @desc    Update product by ID
 * @route   PUT /api/products/:id
 */
exports.updateProduct = catchAsync(async (req, res) => {
  const result = await productService.updateProductById(
    req.params.id,
    req.body
  );
  res.status(result.statusCode).json(result);
});

/**
 * @desc    Delete product by ID
 * @route   DELETE /api/products/:id
 */
exports.deleteProduct = catchAsync(async (req, res) => {
  const result = await productService.deleteProductById(req.params.id);

  if (result.statusCode === 204) {
    return res.status(204).send();
  }

  res.status(result.statusCode).json({ message: result.message });
});
