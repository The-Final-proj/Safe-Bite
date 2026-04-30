const Product = require("../models/productSchema");

// ========================= CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      allergens,
      freeFrom,
      customAllergens,
    } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      allergens: allergens ? JSON.parse(allergens) : [],
      freeFrom: freeFrom ? JSON.parse(freeFrom) : [],
      customAllergens: customAllergens ? JSON.parse(customAllergens) : [],
      image: req.file ? req.file.path : "",
      supplier: req.user._id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ========================= GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const { search } = req.query;

    const filter = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const products = await Product.find(filter);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ========================= GET PRODUCT BY ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ========================= UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.path;
    }

    if (updateData.allergens) {
      updateData.allergens = JSON.parse(updateData.allergens);
    }

    if (updateData.freeFrom) {
      updateData.freeFrom = JSON.parse(updateData.freeFrom);
    }

    if (updateData.customAllergens) {
      updateData.customAllergens = JSON.parse(updateData.customAllergens);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ========================= DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};