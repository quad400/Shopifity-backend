const express = require("express");

const { getCart, addToCart, removeFromCart } = require("../controllers/productCtrl");
const isAuthenticated = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", isAuthenticated, getCart)
router.post("/add",isAuthenticated, addToCart)
router.delete("/remove/:id", isAuthenticated,removeFromCart)

module.exports = router;
