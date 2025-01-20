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

//get all products
// GET/products

router.get("/products", authMiddleware, productController.getAllProducts);

//get single product
router.get("/products/:id", authMiddleware, productController.getOldProduct);

//update product
// POST/update-product
router.post(
  "/update-product",
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

  productController.updateProduct
);

//delete product
// DELETE/product/:id
router.delete("/products/:id", authMiddleware, productController.deleteProduct);

//upload product images
// POST / upload
router.post("/upload", authMiddleware, productController.uploadProductImages);

//get saved product images
// GET  /product-images/:id
router.get(
  "/product-images/:id",
  authMiddleware,
  productController.getSavedImages
);

//delete product image
// DELETE /products/images/destroy/:productId/:imgToDelete
router.delete(
  "/products/images/destroy/:productId/:imgToDelete",
  authMiddleware,
  productController.deleteProductImages
);
module.exports = router;
