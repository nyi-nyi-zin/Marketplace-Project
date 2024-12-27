const { Router } = require("express");
const { body } = require("express-validator");
const router = Router();

const authController = require("../controllers/auth");

router.post(
  "/register",
  [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 letters"),
    body("password").trim().isEmpty().withMessage("Password is required"),
    body("email").trim().isEmail().withMessage("Please enter valid email"),
  ],
  authController.register
);

router.post(
  "/login",
  [
    body("password").trim().isEmpty().withMessage("Password is required"),
    body("email").trim().isEmail().withMessage("Please enter valid email"),
  ],
  authController.login
);

module.exports = router;
