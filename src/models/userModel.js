const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
    },
    password: {
      type: String,
      require: true,
    },
    email_verified: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
    },
    wishlist: {
      type: Array,
      default: [],
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
    },
    registrationCode: {
      type: String,
      default: null
    },
    registrationCodeExpires:  {
      type: Date,
      default: null
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateRegisterationCode = function () {
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  this.registrationCode = code;
  this.registrationCodeExpires = Date.now() + 10 * 60 * 1000;
  return code;
};

module.exports = mongoose.model("User", userSchema);
