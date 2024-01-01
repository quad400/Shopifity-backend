const express = require("express");

const { getCart, emptyCart, removeProductFromCart } = require("../controllers/productCtrl");
const isAuthenticated = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/", isAuthenticated).get(getCart).delete(emptyCart);


module.exports = router;
