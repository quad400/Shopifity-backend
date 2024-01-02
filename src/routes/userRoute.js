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
  addFavouriteToWishList,
  getWishlist,
  applyCoupon,
} = require("../controllers/userCtrl");
const isAuthenticated = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/forgot-password", forgetPassword);
router.get("", isAuthenticated, getUser);
router.post("/regenerate-otp", isAuthenticated, regenerateOtp);
router.post("/verify", isAuthenticated, verifyUser);
router.get("/wishlist", isAuthenticated, getWishlist);
router.post("/applycoupon", isAuthenticated, applyCoupon);

router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/wishlist/:id", isAuthenticated, addFavouriteToWishList);

module.exports = router;
