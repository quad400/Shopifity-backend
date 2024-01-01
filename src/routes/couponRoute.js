const {
    createCoupon,
    updateCoupon,
    getAllCoupon,
    getCoupon,
    deleteCoupon,
  } = require("../controllers/couponCtrl");
  const isAuthenticated = require("../middlewares/authMiddleware");
  const express = require("express");
  
  const router = express.Router();
  
  router.post("/", isAuthenticated, createCoupon);
  router.patch("/:id", isAuthenticated, updateCoupon);
  router.delete("/:id", isAuthenticated, deleteCoupon);
  router.get("/", getAllCoupon)
  router.get("/:id", getCoupon)
  
  module.exports = router;