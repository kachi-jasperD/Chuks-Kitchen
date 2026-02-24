const foodService = require("../services/food.service");

const createFood = async (req, res) => {
  const food = await foodService.createFood(req.body);
  res.status(201).json(food);
};

const getFoods = async (req, res) => {
  const foods = await foodService.getFoods();
  res.json(foods);
};

const updateFoodStatus = async (req, res) => {
  const food = await foodService.updateFoodStatus(
    req.params.id,
    req.body.available,
  );
  res.json(food);
};

const getFoodById = async (req, res) => {
  try {
    const food = await foodService.getFoodById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateFood = async (req, res) => {
  try {
    const updatedFood = await foodService.updateFood(req.params.id, req.body);
    res.json(updatedFood);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    await foodService.deleteFood(req.params.id);
    res.json({ message: "Food deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createFood,
  getFoods,
  updateFoodStatus,
  getFoodById,
  updateFood,
  deleteFood,
};
