// Import Express and using that create a modular router instance
const express = require("express");
const router = express.Router();

// Import the controller & middleware used for validating data related to expense
const expenseController = require("../controllers/expenseController");
const validateExpense = require("../middleware/expense");

// GET all expenses
router.get("/", expenseController.getExpenses);

// GET expense by ID
router.get("/:id", expenseController.getExpenseById);

// ADD expense
router.post("/", validateExpense, expenseController.addExpense);// only add & update expense requires validation of expense data

// UPDATE expense by id
router.put("/:id", validateExpense, expenseController.updateExpense);// only add & update expense requires validation of expense data

// DELETE expense by id
router.delete("/:id", expenseController.deleteExpense);

// Export the router so it can be mounted in app.js
module.exports = router;