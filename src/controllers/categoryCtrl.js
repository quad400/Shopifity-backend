const User = require("../models/userModel");
const { CategoryModel: Category } = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const validateId = require("../utils/validateId");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const findAdmin = await User.findById(user?._id);
    if (findAdmin?.role === "admin") {
      const newCategory = await Category.create(req.body);
      res.status(201).json(newCategory);
      return;
    }
    throw new Error("User not authorized");
  } catch (error) {
    throw new Error(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    validateId(id);
    const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    validateId(id);
    const getCategory = await Category.findById(id);
    res.json(getCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const getCategories = await Category.find();
    res.json(getCategories);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    validateId(id);
    await Category.findByIdAndDelete(id);
    res.json({
      status: "successful",
      message: "category successfully deleted",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCategory,
  getAllCategory,
  updateCategory,
  getCategory,
  deleteCategory,
};
