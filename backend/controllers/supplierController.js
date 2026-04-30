const Product = require("../models/productSchema");

// ========================= GET MY PRODUCTS
const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ supplier: req.user._id });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ========================= SUPPLIER PROFILE
const supplierProfile = async (req, res) => {
  try {
    res.status(200).json({
      userId: req.user._id,
      role: req.user.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ========================= SUPPLIER STATS
const supplierStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({
      supplier: req.user._id,
    });

    res.status(200).json({
      totalProducts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getMyProducts,
  supplierProfile,
  supplierStats,
};