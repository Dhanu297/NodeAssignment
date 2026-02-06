const express = require("express");
const router = express.Router();

const incomeController = require("../controllers/incomeController");
const validateIncome = require("../middleware/income");

// GET all income records
router.get("/", incomeController.getIncome);

// GET income by ID
router.get("/:id", incomeController.getIncomeById);

// ADD income
router.post("/", validateIncome, incomeController.addIncome);

// UPDATE income
router.put("/:id", validateIncome, incomeController.updateIncome);

// DELETE income
router.delete("/:id", incomeController.deleteIncome);

module.exports = router;