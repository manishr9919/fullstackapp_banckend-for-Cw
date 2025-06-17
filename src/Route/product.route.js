const express = require("express");
const { cloudinary, upload } = require("../utils/cloudinaryConfig");
const Product = require("../model/product.model");

const router = express.Router();
// Add a new product

router.post("/addProduct", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    console.log("Body:", req.body);

    // Validate required fields
    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ message: "Name, price, and category are required." });
    }

    let imageUrl = null;

    if (req.file) {
      console.log("File:", req.file); // ✅ Corrected from res.file to req.file

      const fileUpload = await cloudinary.uploader.upload(req.file.path);
      imageUrl = fileUpload.secure_url;
      console.log("Image URL:", imageUrl);
    } else {
      return res.status(400).json({ message: "Image is required." });
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

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Upload error:", error);
    res
      .status(500)
      .json({ message: "Error adding product", error: error.message });
  }
});



//////Get all products
router.get("/getAllProducts",async(req,res)=>{
  try {
    let products= await Product.find();
    if(!products){
      return res.status(404).json({message:"no products founds"})
    }
    res.status(200).json({message:"products found ",products})
    // res.send(products)

    
  } catch (error) {
    console.log("error getting products ",error)
    
  }
})
module.exports = router;
