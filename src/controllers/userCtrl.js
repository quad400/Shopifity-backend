const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/tokens");
const validateId = require("../utils/validateId");

const register = asyncHandler(async (req, res) => {
  const username = req.body.username;
  const findUser = await User.findOne({ username: username });

  if (!findUser) {
    const newUser = await User.create(req.body);

    const { password: userPassword, ...savedDetails } = newUser.toObject();

    res.status(201).json(savedDetails);
  } else {
    throw new Error("User Already exists");
  }
});

const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });
  if (user && (await user.isPasswordMatched(password))) {
    // const refreshToken = ;
    // await User.findByIdAndUpdate(s
    //   user?._id,
    //   { refreshToken: refreshToken },
    //   { new: true }
    // );
    res.json({
      _id: user?._id,
      username: user?.username,
      email: user?.email,
      role: user?.role,
      token: generateToken(user?._id),
    });
  } else {
    throw new Error("Invalid login credentials");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  try {
    const getUser = await User.findById(id);
    const { password: userPassword, ...savedDetails } = getUser.toObject();
    res.json(savedDetails);
  } catch (err) {
    throw new Error(err);
  }
});

const getUser = asyncHandler(async (req, res) => {
  const user = req.user;
  res.json({ user });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    if(!deleteUser){
      throw new Error("User does not exist")
    }
    res.json({ message: "successfully deleted" });
  } catch (err) {
    throw new Error(err?.message);
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateId(id);
  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateUser);
  } catch (err) {
    throw new Error(err?.message);
  }
});



module.exports = {
  register,
  login,
  getUserById,
  getUser,
  deleteUser,
  updateUser
};
