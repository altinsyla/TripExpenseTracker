const express = require("express");
const budgetController = require("../Controllers/budget");
const router = express.Router();

router.get("/", budgetController.getAllBudgets);
router.get("/:id", budgetController.getSingleBudget);
router.post("/", budgetController.createBudget);
router.patch("/:id", budgetController.updateBudget);
router.delete("/:id", budgetController.deleteBudget);

module.exports = router;
