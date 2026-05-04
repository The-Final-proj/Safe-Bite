const router = require("express").Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const upload = require("../middleware/upload");
const authentication = require("../middleware/auth");
const authorization = require("../middleware/authorizeRole");

// CREATE PRODUCT
router.post(
  "/",
  authentication,
  authorization("supplier", "admin"),
  upload.single("image"),
  createProduct
);

// GET ALL + SEARCH
router.get("/", getProducts);

// GET ONE
router.get("/:id", getProductById);

// UPDATE
router.put(
  "/:id",
  authentication,
  authorization("supplier", "admin"),
  upload.single("image"),
  updateProduct
);

// DELETE
router.delete(
  "/:id",
  authentication,
  authorization("supplier", "admin"),
  deleteProduct
);

module.exports = router;