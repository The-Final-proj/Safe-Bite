const router = require("express").Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth");
const authorizeRole = require("../middleware/authorizeRole");

// =====================
// CREATE ORDER
// =====================
router.post("/", auth, orderController.createOrder);

// =====================
// GET ALL USER ORDERS
// =====================
router.get("/", auth, orderController.getUserOrders);

// =====================
// GET SINGLE ORDER
// =====================
router.get("/:id", auth, orderController.getOrderById);

// =====================
// UPDATE STATUS (supplier/admin)
// =====================
router.patch(
  "/:id/status",
  auth,
  orderController.updateOrderStatus
);

module.exports = router;