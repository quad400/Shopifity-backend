const {
  createProductCategory,
  updateProductCategory,
  getAllProductCategory,
  getProductCategory,
  deleteProductCategory,
} = require("../controllers/productCategoryCtrl");
const isAuthenticated = require("../middlewares/authMiddleware");
const express = require("express");

const router = express.Router();

router.post("/", isAuthenticated, createProductCategory);
router.patch("/:id", isAuthenticated, updateProductCategory);
router.delete("/:id", isAuthenticated, deleteProductCategory);
router.get("/", getAllProductCategory)
router.get("/:id", getProductCategory)

module.exports = router;
