const router = require("express").Router();

const {
  getMyProducts,
  supplierProfile,
  supplierStats,
} = require("../controllers/supplierController");

// MY PRODUCTS
router.get("/my-products", getMyProducts);

// PROFILE
router.get("/profile", supplierProfile);

// STATS
router.get("/stats", supplierStats);

module.exports = router;