const express = require("express");
const {
  registerUser,
  verifyEmail,
  loginAdmin,
} = require("./controllers/authController");

const router = express.Router();

router.post("/register/customer", (req, res) =>
  registerUser(req, res, "customer")
);
router.post("/register/admin", (req, res) => registerUser(req, res, "admin"));
router.get("/verify-email/:token", verifyEmail);
router.post("/login/admin", loginAdmin);

module.exports = router;
