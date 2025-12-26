// GET ALL CART ITEMS
const getCart = (req, res) => {
  const { db } = req.app;
  const { userId } = req.query;

  const cart = db.get("cart").value();

  if (!cart || cart.length === 0) {
    return res.status(200).json([]);
  }

  // 🔥 userId অনুযায়ী filter
  const userCart = userId
    ? cart.filter((item) => item.userId === userId)
    : cart;

  res.status(200).json(userCart);
};

// ADD TO CART
const addToCart = (req, res) => {
  const { db } = req.app;
  const { productId, userId, title, price, cover } = req.body;

  const cart = db.get("cart").value();

  const existingItem = cart.find(
    (item) => item.productId === productId && item.userId === userId
  );

  if (existingItem) {
    existingItem.quantity += 1;

    db.get("cart")
      .find({ id: existingItem.id })
      .assign({ quantity: existingItem.quantity })
      .write();

    return res.status(200).json(existingItem);
  }

  const lastId = cart.at(-1)?.id || 0;

  const newItem = {
    id: lastId + 1,
    productId,
    userId,
    title,
    price,
    cover,
    quantity: 1,
  };

  db.get("cart").push(newItem).write();

  res.status(201).json(newItem);
};

const updateQuantity = (req, res) => {
  const { db } = req.app;
  const { id } = req.params;
  const { type } = req.body;

  if (!["inc", "dec"].includes(type)) {
    return res.status(400).json({ message: "Invalid update type" });
  }

  const cartCollection = db.get("cart");

  const item = cartCollection.find({ id: Number(id) }).value();

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  let newQuantity = item.quantity;

  if (type === "inc") {
    newQuantity += 1;
  } else if (type === "dec") {
    if (item.quantity <= 1) {
      return res.status(400).json({ message: "Minimum quantity is 1" });
    }
    newQuantity -= 1;
  }

  // নতুন updated item object বানাও
  const updatedItem = { ...item, quantity: newQuantity };

  // chain দিয়ে assign করে write করো
  cartCollection
    .find({ id: Number(id) })
    .assign(updatedItem)
    .write();

  // updated item টা return করো (200 status সাথে)
  res.status(200).json(updatedItem);
};

// REMOVE ITEM
const removeItem = (req, res) => {
  const { db } = req.app;
  const { id } = req.params;

  db.get("cart")
    .remove({ id: Number(id) })
    .write();

  res.status(200).json({ message: "Item removed" });
};

// CLEAR CART
const clearCart = (req, res) => {
  const { db } = req.app;

  db.set("cart", []).write();

  res.status(200).json({ message: "Cart cleared" });
};

//checkoutData
const checkoutData = (req, res) => {
  const { db } = req.app;
  const { userId } = req.params;

  const cartItems = db.get("cart").filter({ userId }).value();

  if (!cartItems.length) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const SHIPPING_COST = 5;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const total = subtotal + SHIPPING_COST;

  res.status(200).json({
    items: cartItems,
    subtotal,
    shipping: SHIPPING_COST,
    total,
  });
};

// GET USER-SPECIFIC ORDERS
const getUserOrders = (req, res) => {
  const { db } = req.app;
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  const orders = db.get("orders").filter({ userId }).value() || [];

  res.status(200).json({ orders });
};
const getAllOrders = (req, res) => {
  const { db } = req.app;

  const orders = db.get("orders").value() || [];

  res.status(200).json({ orders });
};

// POST /orders
const createOrder = (req, res) => {
  const { db } = req.app;
  const { userId, customer, paymentMethod } = req.body;

  if (!userId) return res.status(400).json({ message: "User ID required" });

  const cartItems = db.get("cart").filter({ userId }).value();
  if (!cartItems.length) return res.status(400).json({ message: "Cart empty" });

  // 1️⃣ check stock
  for (let item of cartItems) {
    const product = db.get("products").find({ id: item.productId }).value();
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.stock < item.quantity)
      return res
        .status(400)
        .json({ message: `${product.title} stock not enough` });
  }

  // 2️⃣ create order
  const orderItems = cartItems.map((item) => ({
    productId: item.productId,
    title: item.title,
    price: item.price,
    quantity: item.quantity,
    totalPrice: item.price * item.quantity,
    cover: item.cover,
  }));

  const subtotal = orderItems.reduce((sum, i) => sum + i.totalPrice, 0);
  const totalAmount = subtotal + 5; 

  const order = {
    id: "ORD-" + Date.now(),
    userId,
    items: orderItems,
    subtotal,
    shipping: 5,
    totalAmount,
    paymentMethod,
    customer,
    status: "pending", // initially pending
    createdAt: new Date().toISOString(),
  };

  db.get("orders").push(order).write();
  db.get("cart").remove({ userId }).write();

  res.status(201).json({ message: "Order placed", order });
};

// PUT /orders/:orderId/status
const updateOrderStatus = (req, res) => {
  const { db } = req.app;
  const { orderId } = req.params;
  let { status } = req.body;

  status = status.toLowerCase().trim();
  const allowedStatus = ["pending", "complete", "cancelled"];
  if (!allowedStatus.includes(status))
    return res.status(400).json({ message: "Invalid status" });

  const order = db.get("orders").find({ id: orderId }).value();
  if (!order) return res.status(404).json({ message: "Order not found" });

  // 🔥 handle stock
  if (order.status !== "complete" && status === "complete") {
    // deduct stock
    order.items.forEach((item) => {
      const product = db.get("products").find({ id: item.productId }).value();
      if (product) {
        product.stock -= item.quantity;
        db.get("products").find({ id: item.productId }).assign(product).write();
      }
    });
  } else if (order.status !== "cancelled" && status === "cancelled") {
    // return stock
    order.items.forEach((item) => {
      const product = db.get("products").find({ id: item.productId }).value();
      if (product) {
        product.stock += item.quantity;
        db.get("products").find({ id: item.productId }).assign(product).write();
      }
    });
  }

  // update order status
  db.get("orders")
    .find({ id: orderId })
    .assign({ status, updatedAt: new Date().toISOString() })
    .write();

  res.json({ message: "Order status updated", orderId, status });
};


module.exports.CartController = {
  getCart,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
  checkoutData,
  getUserOrders,
  createOrder,
  getAllOrders,
  updateOrderStatus,
};
