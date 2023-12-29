const User = require("../models/userModel");
const ProductCategory = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const validateId = require("../utils/validateId");

const createProductCategory = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const findAdmin = await User.findById(user?._id);
    if (findAdmin?.role === "admin") {
      const newCategory = await ProductCategory.create(req.body);
      res.status(201).json(newCategory);
      return;
    }
    throw new Error("User not authorized");
  } catch (error) {
    throw new Error(error);
  }
});


const updateProductCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    validateId(id);
    const updateCategory = await ProductCategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(updateCategory);
  } catch (error) {
    throw new Error(error);
  }
});


const getProductCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    validateId(id);
    const getCategory = await ProductCategory.findById(id);
    res.json(getCategory);
  } catch (error) {
    throw new Error(error);
  }
});


const getAllProductCategory = asyncHandler(async (req, res) => {
  try {

    const getCategories = await ProductCategory.find();
    res.json(getCategories);
  } catch (error) {
    throw new Error(error);
  }
});


const deleteProductCategory = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
  
      validateId(id);
      await ProductCategory.findByIdAndDelete(id);
      res.json({
        status: "successful",
        message: "category successfully deleted"
      });

    } catch (error) {
      throw new Error(error);
    }
  });
  

module.exports = {
  createProductCategory,
  getAllProductCategory,
  updateProductCategory,
  getProductCategory,
  deleteProductCategory
};
