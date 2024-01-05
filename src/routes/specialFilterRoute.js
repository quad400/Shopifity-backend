const express = require("express");
const isAuthenticated = require("../middlewares/authMiddleware");
const {
  deleteOneProductFromSpecialFilter,
  createSpecialFilter,
  getSpecialFilter,
  getAllSpecialFilter,
  addSpecialFilter,
  deleteSpecialFilter,
  removeSpecialFilter,
} = require("../controllers/specialFilterCtrl");

const router = express.Router();
router.post("/", isAuthenticated, createSpecialFilter);
router.get("/", getAllSpecialFilter);
router.get("/:id", getSpecialFilter);
router.patch("/:id", isAuthenticated, addSpecialFilter);
router.delete("/:id", isAuthenticated, removeSpecialFilter);
router.delete("/:id", isAuthenticated, deleteSpecialFilter);
router.delete("/:id/one-product", isAuthenticated, deleteOneProductFromSpecialFilter);

module.exports = router;
