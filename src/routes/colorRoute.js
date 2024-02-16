const {
    createColor,
    updateColor,
    getAllColor,
    getColor,
    deleteColor,
  } = require("../controllers/colorCtrl");
  const isAuthenticated = require("../middlewares/authMiddleware");
  const express = require("express");
  
  const router = express.Router();
  
  router.post("/", isAuthenticated, createColor);
  router.patch("/:id", isAuthenticated,  updateColor);
  router.delete("/:id", isAuthenticated, deleteColor);
  router.get("/", getAllColor)
  router.get("/:id", getColor)
  
  module.exports = router;
  