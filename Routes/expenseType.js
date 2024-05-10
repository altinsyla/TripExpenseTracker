const express = require('express');
const expenseType = require('../Controllers/expenseType');
const router = express.Router();

// Use the /api/expenses prefix for all routes related to expenses
router.get('/', expenseType.getAllExpenseTypes);
router.get('/:id', expenseType.getSingleExpenseType); // Added /api/expenses prefix
router.post('/', expenseType.createExpenseType);
router.patch('/:id', expenseType.updateExpenseType); // Added /api/expenses prefix
router.delete('/:id', expenseType.deleteExpenseType); // Added /api/expenses prefix

module.exports = router;
