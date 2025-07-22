const express = require("express");
const router = express.Router();
const ProductController = require("../Controller/product.controller");
const { protect } = require("../Middlewares/AuthMiddlewares/auth");
const isAdmin = require("../Middlewares/AuthMiddlewares/isAdmin");

/**
 * @route   GET /api/products/getAll
 * @desc    Get all products with comments
 * @access  Protected
 */
router.get("/getAll", protect, ProductController.getAllProducts);

/**
 * @route   GET /api/products/getbyId/:id
 * @desc    Get a product by ID with comments
 * @access  Protected
 */
router.get("/getbyId/:id", protect, ProductController.getProductById);

/**
 * @route   POST /api/products/createProd
 * @desc    Create a new product
 * @access  Protected + isAdmin
 */
router.post("/createProd", protect, isAdmin, ProductController.createProduct);

/**
 * @route   PUT /api/products/updateProd/:id
 * @desc    Update a product by ID
 * @access  Protected + isAdmin
 */
router.put(
  "/updateProd/:id",
  protect,

  ProductController.updateProduct
);

/**
 * @route   DELETE /api/products/deletebyid/:id
 * @desc    Delete a product by ID
 * @access  Protected + isAdmin
 */
router.delete(
  "/deletebyid/:id",
  protect,
  isAdmin,
  ProductController.deleteProduct
);

module.exports = router;
