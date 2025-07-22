const express = require("express");
const router = express.Router();
const CategoryController = require("../Controller/categories.controller");
const { protect } = require("../Middlewares/AuthMiddlewares/auth");

/**
 * @route   GET /api/categories
 * @desc    Get all categories with their products
 * @access  Protected
 */
router.get("/GetAll", protect, CategoryController.getAllCategories);

/**
 * @route   GET /api/categories/:id
 * @desc    Get a category by ID
 * @access  Protected
 */
router.get("/GetCategoryById/:id", protect, CategoryController.getCategoryById);

/**
 * @route   POST /api/categories
 * @desc    Create a new category
 * @access  Protected
 */
router.post("/CreateCategory", protect, CategoryController.createCategory);

/**
 * @route   PUT /api/categories/:id
 * @desc    Update an existing category
 * @access  Protected
 */
router.put("/UpdateCategory/:id", protect, CategoryController.updateCategory);

/**
 * @route   DELETE /api/categories/:id
 * @desc    Delete a category by ID
 * @access  Protected
 */
router.delete("/DelCategory/:id", protect, CategoryController.deleteCategory);

module.exports = router;
