const express = require("express");

const { getCart, addToCart, removeFromCart, deductFromCart } = require("../controllers/productCtrl");
const isAuthenticated = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", isAuthenticated, getCart)
router.post("/add",isAuthenticated, addToCart)
router.post("/remove",isAuthenticated, deductFromCart)
router.delete("/remove/:id", isAuthenticated,removeFromCart)

module.exports = router;
