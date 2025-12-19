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

// UPDATE QUANTITY
const updateQuantity = (req, res) => {
  const { db } = req.app;
  const { id } = req.params;
  const { quantity } = req.body;

  const item = db
    .get("cart")
    .find({ id: Number(id) })
    .value();

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  const updatedItem = db
    .get("cart")
    .find({ id: Number(id) })
    .assign({ quantity })
    .write();

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

module.exports.CartController = {
  getCart,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
};
