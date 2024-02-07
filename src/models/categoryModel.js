const { default: mongoose } = require("mongoose");

const productCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    category_sizes: {
      type: [String],
    }
  }
);

module.exports = mongoose.model("ProductCategory", productCategorySchema);
