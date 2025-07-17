const httpStatus = require("http-status");
const categoryService = require("../Services/category.service"); // büyük harf ile yazılmış olabilir
const catchAsync = require("../utils/catchAsync");

/**
 *  @function getAllCategories
 * @desc Get all categories with products
 * @route GET /api/categories
 */
exports.getAllCategories = catchAsync(async (req, res) => {
  const result = await categoryService.getAllCategories();
  res.status(result.statusCode).json(result);
});

/**
 * @function getCategoryById
 * @desc Get category by ID
 * @route GET /api/categories/:id
 */
exports.getCategoryById = catchAsync(async (req, res) => {
  const result = await categoryService.getCategoryById(req.params.id);
  res.status(result.statusCode).json(result);
});

/**
 * @function createCategory
 * @desc Create new category
 * @route POST /api/categories
 */
exports.createCategory = catchAsync(async (req, res) => {
  const result = await categoryService.createCategory(req.body);

  res.status(result.statusCode).json(result);
});

/**
 *  @function updateCategory
 * @desc Update existing category
 * @route PUT /api/categories/:id
 */
exports.updateCategory = catchAsync(async (req, res) => {
  const result = await categoryService.updateCategory(req.params.id, req.body);

  res.status(result.statusCode).json(result);
});

/**
 *  @function deleteCategory
 * @desc Delete a category by ID
 * @route DELETE /api/categories/:id
 */
exports.deleteCategory = catchAsync(async (req, res) => {
  const result = await categoryService.deleteCategory(req.params.id);
  res.status(result.statusCode).json(result);
});
