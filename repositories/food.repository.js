const Food = require("../db/models/Food");

const createFood = async (data) => {
  return await Food.create(data);
};

const getAllFoods = async () => {
  return await Food.find();
};

const getAvailableFoods = async () => {
  return await Food.find({ available: true });
};

const getFoodById = async (id) => {
  return await Food.findById(id);
};

const updateFood = async (id, data) => {
  return await Food.findByIdAndUpdate(id, data, { new: true });
};

const deleteFood = async (id) => {
  return await Food.findByIdAndDelete(id);
};

module.exports = {
  createFood,
  getAllFoods,
  getAvailableFoods,
  getFoodById,
  updateFood,
  deleteFood,
};
