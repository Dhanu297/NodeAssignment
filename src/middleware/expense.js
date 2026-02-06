// Helper: check if value is a valid number
function validateNumber(value, field, errors) {
  if (value === undefined || value === null || isNaN(value)) {
    errors.push(`${field} must be a valid number.`);
  }
}

// Helper: validate nested objects
function validateCategory(obj, categoryName, errors) {
  if (!obj || typeof obj !== "object") {
    errors.push(`${categoryName} must be an object.`);
    return;
  }

  Object.entries(obj).forEach(([key, value]) => {
    validateNumber(value, `${categoryName}.${key}`, errors);
  });
}

module.exports = function validateExpense(req, res, next) {
  const {
    userid,
    savings,
    paymentObligations,
    insurance,
    housing,
    utilities,
    personal
  } = req.body;

  const errors = [];

  // userid validation
  if (!userid || typeof userid !== "string") {
    errors.push("userid is required and must be a valid Firestore document ID.");
  }

  // Validate each category
  validateCategory(savings, "savings", errors);
  validateCategory(paymentObligations, "paymentObligations", errors);
  validateCategory(insurance, "insurance", errors);
  validateCategory(housing, "housing", errors);
  validateCategory(utilities, "utilities", errors);
  validateCategory(personal, "personal", errors);

  // Return errors if any
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }

  next();
};