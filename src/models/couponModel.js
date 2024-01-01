const { default: mongoose } = require("mongoose");

const couponSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.Mixed,
    unique: true,
  },
  expire: {
    type: Date,
  },
  discount: {
    type: Number,
    required: true,
  },
  applied: {
    type: Boolean,
    default: false,
  },
  daysExpire: {
    type: Number,
    required: true,
  },
});

couponSchema.methods.createExpiryDate = function (days) {
  const name = Math.round(Math.pow(36, 7) - Math.random() * Math.pow(36, 6))
    .toString(36)
    .slice(1);

  const dateExpire = Date.now() + 24 * 60 * 60 * 1000 * days;
  this.expire = dateExpire;
  this.name = name;
};

module.exports = mongoose.model("Coupon", couponSchema);
