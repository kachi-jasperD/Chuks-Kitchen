const User = require("../db/models/User");

const createUser = async (data) => {
  return await User.create(data);
};

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findById = async (id) => {
  return await User.findById(id);
};

const verifyUser = async (id) => {
  return await User.findByIdAndUpdate(id, { isVerified: true }, { new: true });
};

const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  createUser,
  findByEmail,
  findById,
  verifyUser,
  updateUser,
};
