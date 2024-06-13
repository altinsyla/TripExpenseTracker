const Expenses = require("../Models/Expenses");

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

// const createStudent = async (req, res) => {
//     const student = req.body;
//     const { firstname, lastname, idcard, subjects } = req.body;

//     const newStudent = new Student(student);
//     try {
//         await newStudent.save();
//         res.status(201).json(newStudent);
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// };

const createExpense = async (req, res) => {
  const {
    expenseID,
    userID,
    tripID,
    registeredDate,
    type,
    description,
    quantity,
    price,
  } = req.body;

  console.log(req.body);

  // Check for required fields
  if (
    !expenseID ||
    !userID ||
    !tripID ||
    !registeredDate ||
    !type ||
    !description ||
    !quantity ||
    !price
  ) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    // Check for duplicate registration ID
    const existingExpenseByRoll = await Expenses.findOne({ expenseID });
    if (existingExpenseByRoll) {
      return res
        .status(409)
        .json({ message: "Expense with this idcard number already exists" });
    }

    // Create a new student object with the provided data
    const newExpense = await Expenses.create({
        expenseID,
        userID,
        tripID,
        registeredDate: new Date(),
        type,
        description,
        quantity,
        price,
    });

    // Respond with the created student object
    res.status(201).json(newExpense);
  } catch (error) {
    // Handle internal server errors
    res.status(500).json({ message: error.message });
  }
};

const updateExpense = async (req, res) => {
  const id = req.params.id;
  try {
    const updateExpense = await Users.findOneAndUpdate({ expenseID: id }, req.body, {
      new: true,
    });
    res.status(200).json(updateExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteExpense = async (req, res) => {
  const id = req.params.id;
  try {
    await Expenses.findOneAndDelete({ expenseID: id });
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
