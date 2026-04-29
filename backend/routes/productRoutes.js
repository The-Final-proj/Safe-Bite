const router = require("express").Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts,
} = require("../controllers/productController");

const upload = require("../middleware/upload");

// CREATE PRODUCT
router.post("/", upload.single("image"), createProduct);

// GET ALL PRODUCTS
router.get("/", getProducts);

// SEARCH
router.get("/search", searchProducts);

// GET ONE
router.get("/:id", getProductById);

// UPDATE
router.put("/:id", upload.single("image"), updateProduct);

// DELETE
router.delete("/:id", deleteProduct);

module.exports = router;