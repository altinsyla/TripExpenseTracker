const express = require('express');
const expensesController = require("../Controllers/expenses");
const router = express.Router();

// Use the /api/expenses prefix for all routes related to expenses
router.get('/', expensesController.getAllExpenses);
router.get('/:id', expensesController.getSingleExpense); // Added /api/expenses prefix
router.post('/', expensesController.createExpense);
router.patch('/:id', expensesController.updateExpense); // Added /api/expenses prefix
router.delete('/:id', expensesController.deleteExpense); // Added /api/expenses prefix

module.exports = router;
