const { default: mongoose } = require("mongoose");

const productCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  }
);

module.exports = mongoose.model("ProductCategory", productCategorySchema);
