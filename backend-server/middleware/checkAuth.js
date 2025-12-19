const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  if (
    req.path === "/auth/refresh-token" ||
    req.path === "/auth/login" ||
    req.path === "/auth/register" ||
    // ✅ Product GET public
    (req.path === "/products" && req.method === "GET") ||
    (req.path.startsWith("/products/") && req.method === "GET") ||
    // ✅ Cart public (ADD THIS)
    req.path === "/cart" || // POST, GET, DELETE
    req.path.startsWith("/cart/")
  ) {
    return next();
  }

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Please Provide Valid Token" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid Token" });
    }

    if (decoded.type !== "access") {
      return res.status(403).json({ error: "Invalid Token Type" });
    }

    req.claims = decoded;
    next();
  });
};

module.exports = checkAuth;
