const Product = require("../models/productSchema");

// CREATE PRODUCT
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
      supplier: req.user?.id,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// GET BY ID
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

// UPDATE
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).json({ message: "Not found" });

  Object.assign(product, req.body);

  if (req.file) product.image = req.file.path;

  await product.save();

  res.json(product);
};

// DELETE
const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// SEARCH
const searchProducts = async (req, res) => {
  try {
    const { search } = req.query;

    const products = await Product.find({
      name: { $regex: search || "", $options: "i" },
    });

    res.json(products);
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
  searchProducts,
};