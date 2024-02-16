const User = require("../models/userModel");
const {ColorModel: Color} = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const validateId = require("../utils/validateId");

const createColor = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const findAdmin = await User.findById(user?._id);
    if (findAdmin?.role === "admin") {
      const newCategory = await Color.create(req.body);
      res.status(201).json(newCategory);
      return;
    }
    throw new Error("User not authorized");
  } catch (error) {
    throw new Error(error);
  }
});


const updateColor = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    validateId(id);
    const updateCategory = await Color.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json(updateCategory);
  } catch (error) {
    throw new Error(error);
  }
});


const getColor = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    validateId(id);
    const getCategory = await Color.findById(id);
    res.json(getCategory);
  } catch (error) {
    throw new Error(error);
  }
});


const getAllColor = asyncHandler(async (req, res) => {
  try {

    const getCategories = await Color.find();
    res.json(getCategories);
  } catch (error) {
    throw new Error(error);
  }
});


const deleteColor = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
  
      validateId(id);
      await Color.findByIdAndDelete(id);
      res.json({
        status: "successful",
        message: "color successfully deleted"
      });

    } catch (error) {
      throw new Error(error);
    }
  });
  

module.exports = {
  createColor,
  getAllColor,
  updateColor,
  getColor,
  deleteColor
};
