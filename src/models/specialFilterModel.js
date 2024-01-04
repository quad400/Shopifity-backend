const { default: mongoose } = require("mongoose");

const specialFilterSchema = new mongoose.Schema({
  featureCollection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  specialOfferProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  popularProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("SpecialFilter", specialFilterSchema);
