const express = require("express");
const {
  register,
  login,
  getUserById,
  getUser,
  deleteUser,
  updateUser,
  verifyUser,
  regenerateOtp,
  forgetPassword,
} = require("../controllers/userCtrl");
const isAuthenticated = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUserById);
router.get("", isAuthenticated, getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/verify", isAuthenticated, verifyUser);
router.post("/regenerate-otp", isAuthenticated, regenerateOtp);
router.get("/forgot-password", forgetPassword);

module.exports = router;
