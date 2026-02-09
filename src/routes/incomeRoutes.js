// Import Express and using that create a modular router instance
const express = require("express");
const router = express.Router();

// Import the controller & middleware used for validating data related to income
const incomeController = require("../controllers/incomeController");
const validateIncome = require("../middleware/income");

// GET all income records
router.get("/", incomeController.getIncome);

// GET income by ID
router.get("/:id", incomeController.getIncomeById);

// ADD income
router.post("/", validateIncome, incomeController.addIncome);// only add & update income requires validation of income data

// UPDATE income by id
router.put("/:id", validateIncome, incomeController.updateIncome);// only add & update income requires validation of income data

// DELETE income by id
router.delete("/:id", incomeController.deleteIncome);

// Export the router so it can be mounted in app.js
module.exports = router;