const { default: mongoose } = require("mongoose");

const specialFilterSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    trim :true,
    required: true
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("SpecialFilter", specialFilterSchema);
