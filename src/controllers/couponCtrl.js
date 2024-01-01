const User = require("../models/userModel");
const Coupon = require("../models/couponModel");
const asyncHandler = require("express-async-handler");
const validateId = require("../utils/validateId");

const createCoupon = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const findAdmin = await User.findById(user?._id);
    if (findAdmin?.role === "admin") {
      
      const newCoupon = await Coupon.create(req.body);
      newCoupon?.createExpiryDate(newCoupon?.daysExpire);
      await newCoupon.save();
      
      res.status(201).json(newCoupon);
      return;
    }
    throw new Error("User not authorized");
  } catch (error) {
    throw new Error(error);
  }
});

const updateCoupon = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    validateId(id);
    const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

const getCoupon = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    validateId(id);
    const getCoupon = await Coupon.findById(id);
    res.json(getCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCoupon = asyncHandler(async (req, res) => {
  try {
    const getCoupon = await Coupon.find();
    res.json(getCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteCoupon = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    validateId(id);
    await Coupon.findByIdAndDelete(id);
    res.json({
      status: "successful",
      message: "Coupon successfully deleted",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCoupon,
  getAllCoupon,
  updateCoupon,
  getCoupon,
  deleteCoupon,
};
