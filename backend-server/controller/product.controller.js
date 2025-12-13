
// GET all products
const getProducts = (req, res) => {
  const { db } = req.app;
  const products = db.get("products").value();

  if (!products || products.length === 0) {
    return res.status(200).json({ message: "No products found", products: [] });
  }

  res.status(200).json({ products });
};

// GET single product
const getSingleProducts = (req, res) => {
  const { db } = req.app;
  const { productsId } = req.params;

  const product = db.get("products").find({ id: Number(productsId) }).value();
  if (!product) return res.status(404).json({ message: "Product not found" });

  res.status(200).json(product);
};

// CREATE new product
const createNewProducts = (req, res) => {
  try {
    const { db } = req.app;

    const lastId = db.get("products").value().at(-1)?.id || 0;

    const product = {
      id: lastId + 1,
      title: req.body.title || "",
      cover: req.file ? `uploads/products/${req.file.filename}` : null,
      rating: Number(req.body.rating) || 0,
      stock: Number(req.body.stock) || 0,
      price: Number(req.body.price) || 0,
      productsType: req.file ? "cover" : "text",
      createdAt: new Date(),
    };

    db.get("products").push(product).write();

    return res.status(201).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error while creating product" });
  }
};


// UPDATE product
const updateProducts = (req, res) => {
  const { db } = req.app;
  const { productsId } = req.params;

  const product = db.get("products").find({ id: Number(productsId) }).value();
  if (!product) return res.status(404).json({ message: "Product not found" });

  const updatedProduct = db
    .get("products")
    .find({ id: Number(productsId) })
    .assign(req.body)
    .write();

  res.status(200).json(updatedProduct);
};

// DELETE product
const deleteProducts = (req, res) => {
  const { db } = req.app;
  const { productsId } = req.params;

  const product = db.get("products").find({ id: Number(productsId) }).value();
  if (!product) return res.status(404).json({ message: "Product not found" });

  db.get("products").remove({ id: Number(productsId) }).write();

  res.status(200).json({ message: "Product deleted successfully" });
};

module.exports.ProductController = {
  getProducts,
  getSingleProducts,
  createNewProducts,
  updateProducts,
  deleteProducts,
};
