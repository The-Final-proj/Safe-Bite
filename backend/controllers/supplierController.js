const Product = require("../models/productSchema");

const getMyProducts = async (req, res) => {
  const products = await Product.find({ supplier: req.user.id });
  res.json(products);
};

const supplierProfile = async (req, res) => {
  res.json({
    userId: req.user.id,
    role: req.user.role,
  });
};

const supplierStats = async (req, res) => {
  const totalProducts = await Product.countDocuments({
    supplier: req.user.id,
  });

  res.json({ totalProducts });
};

module.exports = {
  getMyProducts,
  supplierProfile,
  supplierStats,
};