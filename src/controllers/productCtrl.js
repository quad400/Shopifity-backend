const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const validateId = require("../utils/validateId");

const createProduct = asyncHandler(async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    throw new Error(err);
  }
});

const getProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateId(id);
    const getProduct = await Product.findById(id).populate("brand");

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
    if (user._id.toString() === findProduct?.brand?._id.toString()) {
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
    console.log(findProduct);
    // check if the user is the one that created the product
    if (user._id.toString() === findProduct?.brand?._id.toString()) {
      await Product.findByIdAndDelete(id);

      res.json({
        status: "successful",
        message: "Product successfully deleted",
      });
      return;
    } else if (user._id.toString() === findProduct?.brand?._id.toString()) {
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


const getAllProduct = asyncHandler(async (req, res)=> {

  try {
    const product = await Product.find()

    return res.json({
      status: "successful",
      product
    })
  } catch (error) {
    
  }
})

module.exports = {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProduct
};
