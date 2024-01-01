const { default: mongoose } = require("mongoose");

const productCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true
    }
  }
);

module.exports = mongoose.model("ProductCategory", productCategorySchema);
