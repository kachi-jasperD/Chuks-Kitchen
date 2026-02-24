const foodRepo = require("../repositories/food.repository");

const createFood = async (data) => {
  return await foodRepo.createFood(data);
};

const getFoods = async () => {
  return await foodRepo.getAvailableFoods();
};

const getFoodById = async (id) => {
  return await foodRepo.getFoodById(id);
};

const updateFood = async (id, data) => {
  return await foodRepo.updateFood(id, data);
};

const deleteFood = async (id) => {
  return await foodRepo.deleteFood(id);
};

const updateFoodStatus = async (id, available) => {
  return await foodRepo.updateFood(id, { available });
};

module.exports = {
  createFood,
  getFoods,
  getFoodById,
  updateFood,
  deleteFood,
  updateFoodStatus,
};
