const ExpenseType = require("../Models/ExpenseType");

const getAllExpenseTypes = async (req, res) => {
  try {
    const expensetypes = await ExpenseType.find();
    res.status(200).json(expensetypes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSingleExpenseType = async (req, res) => {
  const id = req.params.id;
  try {
    const expenseType = await ExpenseType.findOne({ _id: id });
    res.status(200).json(expenseType);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createExpenseType = async (req, res) => {
  const { typeID, typeName } = req.body;

  console.log(req.body);

  if (!typeID || !typeName) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    const existingExpenseTypeByRoll = await ExpenseType.findOne({ typeID });
    if (existingExpenseTypeByRoll) {
      return res
        .status(409)
        .json({ message: "Expense type with this typeID already exists" });
    }

    const newExpenseType = await ExpenseType.create({
      typeID,
      typeName,
    });

    res.status(201).json(newExpenseType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExpenseType = async (req, res) => {
  const id = req.params.id;
  try {
    const updateExpenseType = await ExpenseType.findOneAndUpdate(
      { typeID: id },
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updateExpenseType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteExpenseType = async (req, res) => {
  const id = req.params.id;
  try {
    await ExpenseType.findOneAndDelete({ typeID: id });
    res.status(204).json({ message: "Expense Type deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllExpenseTypes,
  getSingleExpenseType,
  createExpenseType,
  updateExpenseType,
  deleteExpenseType,
};
