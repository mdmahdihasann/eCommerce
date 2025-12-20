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

module.exports.CartController = {
  getCart,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
};
