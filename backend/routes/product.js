const { Router } = require("express");
const { body } = require("express-validator");
const router = Router();

const productController = require("../controllers/product");
const authMiddleware = require("../middleware/auth");

// add product
// POST/create
router.post(
  "/create-product",
  authMiddleware,
  [
    body("product_name")
      .trim()
      .notEmpty()
      .withMessage("Product name is required"),
    body("product_description")
      .trim()
      .notEmpty()
      .withMessage("Product description is required"),
    body("product_price")
      .trim()
      .notEmpty()
      .withMessage("Product price is required"),
    body("product_category")
      .trim()
      .notEmpty()
      .withMessage("Product category is required"),
    body("product_used_for")
      .trim()
      .notEmpty()
      .withMessage("Product usedFor is required"),
    body("product_details")
      .isArray()
      .withMessage("Product details must be array"),
  ],
  productController.addNewProduct
);

module.exports = router;
