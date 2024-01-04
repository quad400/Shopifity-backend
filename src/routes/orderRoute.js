const express = require("express");
const isAuthenticated = require("../middlewares/authMiddleware");
const {
  createOrder,
  updatePaymentStatus,
  getOrders,
} = require("../controllers/orderCtrl");

const router = express.Router();

router.use(isAuthenticated);
router.post("/", createOrder);
router.get("/", getOrders);
router.patch("/:id/update-payment-status", updatePaymentStatus);

module.exports = router;
