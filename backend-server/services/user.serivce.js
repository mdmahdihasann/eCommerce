const bcrypt = require("bcrypt");
const getNewTokens = require("../util/getNewTokens");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

/* ================= LOGIN ================= */
const login = async (email, password, db) => {
  const user = db.get("users").find({ email }).value();

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid password");
  }

  const tokens = getNewTokens(user);

  let userObj = { ...user };
  delete userObj.password;

  return {
    user: userObj,
    token: tokens,
  };
};

/* ================= REGISTER ================= */
const register = (reqBody, db) => {
  const { email, password, firstName, lastName } = reqBody;

  const user = db.get("users").find({ email }).value();
  if (user) {
    throw new Error("User already exists");
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  const newUser = {
    id: crypto.randomUUID({ disableEntropyCache: true }),
    firstName,
    lastName,
    email,
    password: hashedPassword,
    avatar: null,
    role: "user", // 🔥 DEFAULT ROLE
    createdAt: new Date().toISOString(),
  };

  db.get("users").push(newUser).write();

  const token = getNewTokens(newUser);

  delete newUser.password;

  return {
    user: newUser,
    token,
  };
};

/* ================= REFRESH TOKEN ================= */
const refreshToken = async (refreshToken, db) => {
  const decoded = jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET_KEY
  );

  if (!decoded) {
    throw new Error("Invalid refresh token");
  }

  const user = db.get("users").find({ id: decoded.id }).value();
  if (!user) {
    throw new Error("User not found");
  }

  return getNewTokens(user);
};

/* ================= ADMIN: GET ALL USERS ================= */
const getAllUsers = (db) => {
  const users = db.get("users").value();

  return {
    total: users.length,
    users: users.map((u) => ({
      id: u.id,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      role: u.role,
      createdAt: u.createdAt,
    })),
  };
};

module.exports.UserService = {
  login,
  register,
  refreshToken,
  getAllUsers, // 🔥 NEW
};
