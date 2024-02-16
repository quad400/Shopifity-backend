const User = require("../models/userModel");
const {SizeModel: Size} = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const validateId = require("../utils/validateId");

const createSize = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const findAdmin = await User.findById(user?._id);
    if (findAdmin?.role === "admin") {
      const newCategory = await Size.create(req.body);
      res.status(201).json(newCategory);
      return;
    }
    throw new Error("User not authorized");
  } catch (error) {
    throw new Error(error);
  }
});


const updateSize = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    validateId(id);
    const updateCategory = await Size.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(updateCategory);
  } catch (error) {
    throw new Error(error);
  }
});


const getSize = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    validateId(id);
    const getCategory = await Size.findById(id);
    res.json(getCategory);
  } catch (error) {
    throw new Error(error);
  }
});


const getAllSize = asyncHandler(async (req, res) => {
  try {

    const getCategories = await Size.find();
    res.json(getCategories);
  } catch (error) {
    throw new Error(error);
  }
});


const deleteSize = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
  
      validateId(id);
      await Size.findByIdAndDelete(id);
      res.json({
        status: "successful",
        message: "size successfully deleted"
      });

    } catch (error) {
      throw new Error(error);
    }
  });
  

module.exports = {
  createSize,
  getAllSize,
  updateSize,
  getSize,
  deleteSize
};
