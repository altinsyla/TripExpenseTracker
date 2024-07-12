const Expenses = require("../Models/Expenses");
const Budget = require("../Models/Budget");
const mongoose = require('mongoose');

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expenses.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSingleExpense = async (req, res) => {
  const id = req.params.id;
  try {
    const expense = await Expenses.findOne({ _id: id });
    res.status(200).json(expense);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createExpense = async (req, res) => {
  const {
    userID,
    tripID,
    registeredDate,
    type,
    description,
    quantity,
    price,
  } = req.body;

  console.log(req.body);

  if (
    !userID ||
    !tripID ||
    !type ||
    !description ||
    !quantity ||
    !price
  ) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    const totalBudget = await Budget.aggregate([
      { $match: { tripID: new mongoose.Types.ObjectId(tripID)} },
      { $group: { _id: null, total: { $sum: "$budget" } } }
    ]);
    const totalExpenses = await Expenses.aggregate([
      { $match: { tripID: new mongoose.Types.ObjectId(tripID)  } },
      { $group: { _id: null, total: { $sum: "$price" } } }
    ]);

    console.log(totalBudget);
    console.log(totalExpenses);

    const budget = totalBudget[0] ? totalBudget[0].total : 0;
    const expenses = totalExpenses[0] ? totalExpenses[0].total : 0;

    if (expenses + price > budget) {
      return res.status(400).json({ message: "Expense exceeds the total budget" });
    }
    
    const newExpense = await Expenses.create({
      userID,
      tripID,
      registeredDate: registeredDate || new Date(),
      type,
      description,
      quantity,
      price,
    });
    
    res.status(201).json(newExpense);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const updateExpense = await Expenses.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    await Expenses.findOneAndDelete({ _id: id });
    res.status(204).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllExpenses,
  getSingleExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
