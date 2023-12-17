const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    detail: {
      type: String,
    },
    quantity: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    color: [],
    ratings: [
      {
        star: Number,
        comment: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    images: [
      {
        id: String,
        url: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Product", productSchema)