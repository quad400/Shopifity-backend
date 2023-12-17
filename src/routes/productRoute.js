const express = require("express");
const isAuthenticated = require("../middlewares/authMiddleware");
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
} = require("../controllers/productCtrl");

const router = express.Router();

router.get("/:id", getProduct);

router.use(isAuthenticated)

router.route("/").post(createProduct).get(getAllProduct);
router.route("/:id").patch(updateProduct).delete(deleteProduct);

module.exports = router;
