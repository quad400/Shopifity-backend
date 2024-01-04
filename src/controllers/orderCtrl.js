const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateId = require("../utils/validateId");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const { products, total, ...address } = req.body;

    const productExists = await Product.find({
      _id: {
        $in: products.map((p) => p.product),
      },
    });

    if (productExists.length !== products.length)
      throw new Error("One or more products do not exist");
    const order = await Order.create({
      order_by: _id,
      products,
      total,
      paymentStatus: "pending", // Default to 'pending'
      ...address,
    });

    await order.save();
    res.json(order);
  } catch (error) {
    throw new Error(error);
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const orders = await Order.find({ order_by: _id }).populate("products.product");
    res.json(orders);
  } catch (error) {
    throw new Error(error);
  }
});

const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { paymentStatus } = req.body;
  try {
    // Check if the proovided status is valid
    if (!["cancel", "successful", "pending"].includes(paymentStatus)) {
      throw new Error("Invalid payment status");
    }

    const order = await Order.findById(id);
    if (!order) throw new Error("Order not found");

    order.paymentStatus = paymentStatus;
    await order.save();
    res.json(order);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createOrder,
  getOrders,
  updatePaymentStatus
};
