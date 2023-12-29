const express = require("express");
const isAuthenticated = require("../middlewares/authMiddleware");
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  addProductToCart,
} = require("../controllers/productCtrl");

const router = express.Router();

router.get("/:id", getProduct);
router.get("/",getAllProduct)

router.use(isAuthenticated)
router.post("/add-to-cart", addProductToCart)
router.route("/").post(createProduct);
router.route("/:id").patch(updateProduct).delete(deleteProduct);

module.exports = router;
