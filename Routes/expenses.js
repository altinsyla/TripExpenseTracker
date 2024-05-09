const express = require('express');
const expensesController = require("../Controllers/expenses");
const router = express.Router();

// Use the /api/expenses prefix for all routes related to expenses
router.get('/api/expenses', expensesController.getAllExpenses);
router.get('/api/expenses/:id', expensesController.getSingleExpense); // Added /api/expenses prefix
router.post('/api/expenses', expensesController.createExpense);
router.patch('/api/expenses/:id', expensesController.updateExpense); // Added /api/expenses prefix
router.delete('/api/expenses/:id', expensesController.deleteExpense); // Added /api/expenses prefix

module.exports = router;
