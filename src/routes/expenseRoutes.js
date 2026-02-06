const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expenseController");
const validateExpense = require("../middleware/expense");

// GET all expenses
router.get("/", expenseController.getExpenses);

// GET expense by ID
router.get("/:id", expenseController.getExpenseById);

// ADD expense
router.post("/", validateExpense, expenseController.addExpense);

// UPDATE expense
router.put("/:id", validateExpense, expenseController.updateExpense);

// DELETE expense
router.delete("/:id", expenseController.deleteExpense);

module.exports = router;