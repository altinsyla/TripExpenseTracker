const express = require("express");
const expenseType = require("../Controllers/expenseType");
const router = express.Router();

router.get("/", expenseType.getAllExpenseTypes);
router.get("/:id", expenseType.getSingleExpenseType);
router.post("/", expenseType.createExpenseType);
router.patch("/:id", expenseType.updateExpenseType);
router.delete("/:id", expenseType.deleteExpenseType);

module.exports = router;
