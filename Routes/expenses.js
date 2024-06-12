const express = require("express");
const expensesController = require("../Controllers/expenses");
const router = express.Router();

router.get("/", expensesController.getAllExpenses);
router.get("/:id", expensesController.getSingleExpense);
router.post("/", expensesController.createExpense);
router.patch("/:id", expensesController.updateExpense);
router.delete("/:id", expensesController.deleteExpense);

module.exports = router;
