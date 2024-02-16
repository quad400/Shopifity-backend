const {
    createSize,
    updateSize,
    getAllSize,
    getSize,
    deleteSize,
  } = require("../controllers/sizeCtrl");
  const isAuthenticated = require("../middlewares/authMiddleware");
  const express = require("express");
  
  const router = express.Router();
  
  router.post("/", isAuthenticated, createSize);
  router.patch("/:id", isAuthenticated,  updateSize);
  router.delete("/:id", isAuthenticated, deleteSize);
  router.get("/", getAllSize)
  router.get("/:id", getSize)
  
  module.exports = router;
  