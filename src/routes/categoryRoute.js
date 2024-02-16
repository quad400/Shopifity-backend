const {
  createCategory,
  updateCategory,
  getAllCategory,
  getCategory,
  deleteCategory,
} = require("../controllers/categoryCtrl");
const isAuthenticated = require("../middlewares/authMiddleware");
const express = require("express");

const router = express.Router();

router.post("/", isAuthenticated, createCategory);
router.patch("/:id", isAuthenticated,  updateCategory);
router.delete("/:id", isAuthenticated, deleteCategory);
router.get("/", getAllCategory)
router.get("/:id", getCategory)

module.exports = router;
