const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateId = require("../utils/validateId");
const Cart = require("../models/cartModel");

const createOrder = asyncHandler(async (req, res) => {
  const user = req.user;

  const cart = await Cart.findById(user.cart);

  
});
