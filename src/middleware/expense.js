//This middleware is used for validating the request for expense.


// check if value is a valid number
function validateNumber(value, field, errors) {
  if (isNaN(value)) {
    errors.push(`${field} must be a valid number.`);
  }
}

// validate nested objects
function validateCategory(obj, categoryName, errors) {
 
  Object.entries(obj).forEach(([key, value]) => {
    validateNumber(value, `${categoryName}.${key}`, errors);
  });
}
//Function to check if the category is from allowed categories
function validateExpenseCategories(body) {
  const ALLOWED_CATEGORIES = [
  "savings",
  "paymentObligations",
  "insurance",
  "housing",
  "utilities",
  "personal"
];

  const sentCategories = Object.keys(body);

  for (const category of sentCategories) {
    if (!ALLOWED_CATEGORIES.includes(category)) {
      throw new Error(
        `Invalid category: ${category}. Allowed categories are: ${ALLOWED_CATEGORIES.join(", ")}`
      );
    }
  }
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
  // Category of expendse should be from predefined properties. 
 validateExpenseCategories(req.body);

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