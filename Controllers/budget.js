const Budget = require("../Models/Budget");

const getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSingleBudget = async (req, res) => {
  const id = req.params.id;
  try {
    const budget = await Budget.findOne({ _id: id });
    res.status(200).json(budget);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createBudget = async (req, res) => {
  const { budgetID, tripID, userID, budget } = req.body;

  console.log(req.body);

  if (!budgetID || !tripID || !userID || !budget) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    const existingBudgetByRoll = await Budget.findOne({ budgetID });
    if (existingBudgetByRoll) {
      return res
        .status(409)
        .json({ message: "Budget with this id number already exists" });
    }

    const newBudget = await Budget.create({
      budgetID,
      tripID,
      userID,
      budget,
    });

    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBudget = async (req, res) => {
  const id = req.params.id;
  try {
    const updateBudget = await Budget.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(updateBudget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBudget = async (req, res) => {
  const id = req.params.id;
  try {
    await Budget.findOneAndDelete({ _id: id });
    res.status(204).json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllBudgets,
  getSingleBudget,
  createBudget,
  updateBudget,
  deleteBudget,
};
