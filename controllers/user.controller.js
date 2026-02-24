const User = require("../db/models/User");

const getCurrentUser = async (req, res) => {
  res.json(req.user);
};

const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

module.exports = {
  getCurrentUser,
  getAllUsers,
};
