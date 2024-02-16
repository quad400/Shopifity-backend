const { default: mongoose } = require("mongoose");

const productCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  category_sizes: {
    type: [String],
  },
});

const CategoryModel = mongoose.model("ProductCategory", productCategorySchema);

const productColorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const ColorModel = mongoose.model("ProductColor", productColorSchema);

const productSizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const SizeModel = mongoose.model("ProductSize", productSizeSchema);

module.exports = {
  CategoryModel,
  ColorModel,
  SizeModel,
};
