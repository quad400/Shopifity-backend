const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    paymentIntent: {},
    paymentStatus: {
      type: String,
      default: "Not Processed",
      enum: ["Not Processed", "Pending", "Successed", "Cancelled"],
    },
    order_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
