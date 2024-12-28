const { Router } = require("express");
const { body } = require("express-validator");
const router = Router();

const authController = require("../controllers/auth");

router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 3 })
      .withMessage("Name must have 3 letters"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 5 })
      .withMessage("password must have at least 5 letters"),
    body("email").trim().isEmail().withMessage("Please enter valid email"),
  ],
  authController.register
);

router.post(
  "/login",
  [
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 5 })
      .withMessage("password must have at least 5 letters"),
    body("email").trim().isEmail().withMessage("Please enter valid email"),
  ],
  authController.login
);

module.exports = router;
