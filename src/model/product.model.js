const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: [
        "mobiles",
        "television",
        "laptops",
        "headphones & earphones",
        "kitchen appliances",
      ],
      required: true,
    }, // Enum for predefined categories
    stock: { type: Number, default: 0 },
    imageUrl: { type: String }, // Optional
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
