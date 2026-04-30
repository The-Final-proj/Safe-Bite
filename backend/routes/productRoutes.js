const router = require("express").Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const upload = require("../middleware/upload");

// CREATE PRODUCT
router.post("/", upload.single("image"), createProduct);

// GET ALL + SEARCH (/?search=milk)
router.get("/", getProducts);

// GET ONE
router.get("/:id", getProductById);

// UPDATE
router.put("/:id", upload.single("image"), updateProduct);

// DELETE
router.delete("/:id", deleteProduct);

module.exports = router;