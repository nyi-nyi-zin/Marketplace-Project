const { Router } = require("express");

const router = Router();
const adminController = require("../controllers/admin");
const authMiddleware = require("../middleware/auth");
const adminMiddleware = require("../middleware/isAdmin");

// get all products
// GET /admin/products
router.get(
  "/products",
  authMiddleware,
  adminMiddleware,
  adminController.getAllProducts
);

// approve product
// POST /admin/product-approve/:id
router.post(
  "/product-approve/:id",
  authMiddleware,
  adminMiddleware,
  adminController.approveProduct
);

//reject product
router.post(
  "/product-reject/:id",
  authMiddleware,
  adminMiddleware,
  adminController.rejectProduct
);

//roll back product
router.post(
  "/product-rollback/:id",
  authMiddleware,
  adminMiddleware,
  adminController.rollbackProduct
);

//get user list
//GET //admin/users
router.get("/users", authMiddleware, adminMiddleware, adminController.getUsers);

//ban user
//POST /admin/user-ban/:id
router.post(
  "/user-ban/:id",
  authMiddleware,
  adminMiddleware,
  adminController.banUser
);

//unban user
//POST /admin/user-unban/:id
router.post(
  "/user-unban/:id",
  authMiddleware,
  adminMiddleware,
  adminController.unbanUser
);
module.exports = router;
