const express = require("express");
const { cloudinary, upload } = require("../utils/cloudinaryConfig");
const Product = require("../model/product.model"); // Assuming the product schema is in models/product.js

const router = express.Router();

// Add Product Endpoint
router.post("/addProduct", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    console.log(req.body)

    // Validate required fields
    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ message: "Name, price, and category are required." });
    }

    // Upload image to Cloudinary
    let imageUrl = null;
    if (req.file) {
      // console.log(res.file);
      const fileUpload = await cloudinary.uploader.upload(req.file.path);
      imageUrl = fileUpload.secure_url;
      // console.log(imageUrl);
    }

    // Create new product
    const product = new Product({
      name,
      price,
      description,
      category,
      stock: stock || 0,
      imageUrl,
    });

    // Save product to database
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
});

module.exports = router;
