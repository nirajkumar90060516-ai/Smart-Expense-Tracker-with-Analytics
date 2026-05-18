const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
      unique: true,
    },
    category: String,
    name: String,
    code: String,
    status: String,
    price: Number,
    oldPrice: Number,
    rating: Number,
    reviews: Number,
    stock: Number,
    image: String,
    performance: String,
    useCase: String,
    warranty: String,
    delivery: String,
    support: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
