const router = require("express").Router();

const authentication = require("../middleware/auth");
const authorization = require("../middleware/authorizeRole");

const {
  getMyProducts,
  supplierProfile,
  supplierStats,
} = require("../controllers/supplierController");

// MY PRODUCTS
router.get(
  "/my-products",
  authentication,
  authorization("supplier", "admin"),
  getMyProducts
);

// PROFILE
router.get(
  "/profile",
  authentication,
  authorization("supplier", "admin"),
  supplierProfile
);

// STATS
router.get(
  "/stats",
  authentication,
  authorization("supplier", "admin"),
  supplierStats
);

module.exports = router;