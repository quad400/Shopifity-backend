const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const ProductCategory = require("../models/categoryModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const validateId = require("../utils/validateId");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const user = req.user;

    if (user.role === "admin") {
      const newProduct = await Product.create(req.body);
      return res.json(newProduct);
    }

    return res.status(400).json({
      status: "fail",
      message: "User must have a brand name to create product",
    });
  } catch (err) {
    throw new Error(err);
  }
});

const getProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateId(id);
    const getProduct = await Product.findById(id)
      .populate("brand")
      .populate("category");

    if (!getProduct) {
      throw new Error("Product with this id not found");
    }
    res.json(getProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateId(id);

    const user = req.user;
    const findProduct = await Product.findById(id);

    // check if the user is the one that created the product
    if (user.role === "admin") {
      const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updateProduct);
      return;
    }
    throw new Error("User does not have permission to update this product");
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateId(id);
    const user = req.user;
    const findProduct = await Product.findById(id);
    // check if the user is the one that created the product
    if (user.role === "admin") {
      await Product.findByIdAndDelete(id);

      res.json({
        status: "successful",
        message: "Product successfully deleted",
      });
      return;
    } else if (user.role !== "admin") {
      res.status(401).json({
        status: "fail",
        message: "User does not have permission to update this product",
      });
      return;
    }

    return res.status(404).json({
      status: "fail",
      message: "Product does not exist",
    });
  } catch (err) {
    throw new Error(err);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  // Filtering
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }
    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const addProductToCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { cart } = req.body;

  validateId(_id);

  try {
    let products = [];

    const user = User.findById(_id);

    // check if product is aready in cart
    const productInCart = await Cart.findOne({ order_by: user._id });

    if (productInCart) {
      productInCart.deleteOne();
    }

    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;
      let getPrice = await Product.findById(cart[i]._id).select("price").exec();
      object.price = getPrice.price;
      products.push(object);
    }

    console.log(products);

    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].count;
      // console.log(cartTotal)
    }

    let newCart = await new Cart({
      products,
      cartTotal,
      order_by: _id,
    }).save();

    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

const getCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateId(_id);

  try {
    const getCart = await Cart.findOne({ order_by: _id }).populate(
      "products.product"
    );
    res.json(getCart);
  } catch (error) {
    throw new Error(error);
  }
});

const emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateId(_id);

  try {
    const getCart = await Cart.findOneAndDelete({ order_by: _id });
    res.json(getCart);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  addProductToCart,
  getCart,
  emptyCart,
};
