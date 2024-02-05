const asyncHandler = require("express-async-handler");
const validateId = require("../utils/validateId");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const SpecialFilter = require("../models/specialFilterModel");

const createSpecialFilter = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const findUser = await User.findById(_id);

    if (findUser.role !== "admin") throw new Error("User not authorized");

    const special = await SpecialFilter.create(req.body);

    res.json(special);
  } catch (error) {
    throw new Error(error);
  }
});

const getSpecialFilter = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const special = await SpecialFilter.findById(id).populate("products");
    res.json(special);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllSpecialFilter = asyncHandler(async (req, res) => {
  try {
    const special = await SpecialFilter.find().populate("products");
    res.json(special);
  } catch (error) {
    throw new Error(error);
  }
});

const addSpecialFilter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;
  validateId(productId);
  try {
    const findProduct = await Product.findById(productId);
    const findSpecial = await SpecialFilter.findById(id);

    if (!findSpecial) throw new Error("Special not found");

    const alreadyExist = findSpecial.products.findIndex((prod) =>
      prod.equals(productId)
    );
    if (alreadyExist !== -1) {
      throw new Error("Special cant have duplicate product");
    } else {
      const prodId = findProduct._id;
      findSpecial.products.push(prodId);
    }

    await findSpecial.save();

    res.json(findSpecial);
  } catch (error) {
    throw new Error(error);
  }
});

const removeSpecialFilter = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;
  validateId(productId);
  try {
    const findSpecial = await SpecialFilter.findById(id);

    if (!findSpecial) throw new Error("Special not found");

    const alreadyExist = findSpecial.products.findIndex((prod) =>
      prod.equals(productId)
    );

    console.log(alreadyExist)

    if (alreadyExist === 0) {
      findSpecial.products.filter((prod) => prod.toString()===productId);
      // console.log(findSpecial)
      await findSpecial.save();
    } else {
      throw new Error("Product not found in special");
    }

    res.json({ message: "Successfull remove product" });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteSpecialFilter = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const special = await SpecialFilter.findByIdAndDelete(id);

    res.json({
      message: "successfully deleted",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteOneProductFromSpecialFilter = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { productId } = req.body;

  try {
    const special = await SpecialFilter.findById(id);

    special.products.filter((prod) => !prod._id.equals(productId));

    await special.save();

    res.json(special);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createSpecialFilter,
  getSpecialFilter,
  deleteOneProductFromSpecialFilter,
  deleteSpecialFilter,
  addSpecialFilter,
  removeSpecialFilter,
  getAllSpecialFilter,
};
