const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/tokens");
const validateId = require("../utils/validateId");
const handlebars = require("handlebars");
const sendEmail = require("../utils/email");
const {
  emailTemplateSourceRegisteration,
  emailTemplateSourceResendOTP,
  emailTemplateSourceForgotPassword,
} = require("../utils/emailTemplates");

const register = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    const newUser = await User.create(req.body);

    const { password: userPassword, ...savedDetails } = newUser.toObject();

    res.status(201).json(savedDetails);
  } else {
    throw new Error("User Already exists");
  }
});

const login = asyncHandler(async (req, res) => {
  const emailTemplate = handlebars.compile(emailTemplateSourceRegisteration);
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (user && (await user.isPasswordMatched(password))) {
    // const refreshToken = ;
    // await User.findByIdAndUpdate(s
    //   user?._id,
    //   { refreshToken: refreshToken },
    //   { new: true }
    // );
    const code = user?.generateRegisterationCode();
    await user.save();
    if (!user?.email_verified) {
      const templateData = {
        subject: "Welcome to shopifity, Please verify your email",
        code,
      };

      const emailHtml = emailTemplate(templateData);
      await sendEmail({
        subject: "Welcome to shopifity, Please verify your email",
        email: email,
        emailHtml,
      });
    }

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

const verifyUser = asyncHandler(async (req, res) => {
  const { code } = req.body;
  const user = req.user;

  try {
    if (user?.registrationCode === code) {
      user.email_verified = true;
      await user.save();
      return res.json({
        message: "Account verified",
      });
    } else if (user?.registrationCodeDate > Date.now()) {
      return res.status(400).json({
        message: "Otp code has already expire",
      });
    } else {
      return res.status(400).json({
        message: "Invalid otp code",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const regenerateOtp = asyncHandler(async (req, res) => {
  const user = req.user;
  try {
    const emailTemplate = handlebars.compile(emailTemplateSourceResendOTP);

    if (user?.email_verified === true)
      return res.json({
        message: "Account has been verified",
      });
    const code = user.generateRegisterationCode();

    await user.save();
    const templateData = {
      subject: "OTP code regenerated",
      code,
    };

    const emailHtml = emailTemplate(templateData);

    await sendEmail({
      subject: "OTP code regenerated",
      email: user?.email,
      emailHtml,
    });

    res.json({
      message: "OTP regenrated, check your mail for code",
    });
  } catch (error) {
    throw new Error(error);
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
  res.json(user);
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateId(id);
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      throw new Error("User does not exist");
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

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const emailTemplate = handlebars.compile(emailTemplateSourceForgotPassword);

    const user = await User.findOne(email);
    const code = user.generateRegisterationCode();

    await user.save();
    const templateData = {
      subject: "Forgot Password",
      code,
    };

    const emailHtml = emailTemplate(templateData);

    await sendEmail({
      subject: "Forgot password",
      email: email,
      emailHtml,
    });

    res.json({
      message:
        "Forgot password, otp has been send to your mail to retrieve your account",
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  register,
  login,
  getUserById,
  getUser,
  deleteUser,
  updateUser,
  verifyUser,
  regenerateOtp,
  forgetPassword
};
