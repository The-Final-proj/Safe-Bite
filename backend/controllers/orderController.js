const Order = require("../models/orderSchema");
const Product = require("../models/productSchema");

// =====================
// CREATE ORDER
// =====================
exports.createOrder = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { products, dependent } = req.body;

    let totalPrice = 0;
    let supplierId = null;

    const orderProducts = [];

    for (let item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (!supplierId) supplierId = product.supplier;

      totalPrice += product.price * item.quantity;

      orderProducts.push({
        product: product._id,
        quantity: item.quantity,
      });
    }

    const order = await Order.create({
      user: userId,
      dependent: dependent || null,
      supplier: supplierId,
      products: orderProducts,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// =====================
// GET USER ORDERS
// =====================
exports.getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }) // ✅ FIXED
    .populate("products.product")
    .sort({ createdAt: -1 });

  res.json(orders);
};

// =====================
// GET ORDER BY ID
// =====================
exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("products.product")
    .populate("user");

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
};

// =====================
// UPDATE ORDER STATUS
// =====================
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(order);
};