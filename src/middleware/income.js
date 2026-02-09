/*This middleware is used for validating the request for expense.*/

//This function validates expense data and raise appropriate errors.
module.exports = function validateIncome(req, res, next) {
  const {
    userid,
    wages,
    secondaryIncome,
    interest,
    supportPayment,
    others
  } = req.body;

  const errors = [];
  const ALLOWED_CATEGORIES = [
    "wages",
    "secondaryIncome",
    "interest",
    "supportPayment",
    "others"
  ];
  // Fields that should be ignored during category validation
  const IGNORE_FIELDS = ["userid", "createdAt", "updatedAt"];

  // Extract keys from the request body
  const sentCategories = Object.keys(req.body);

  for (const category of sentCategories) {
     // Skip ignored fields
    if (IGNORE_FIELDS.includes(category)) {
      continue;
    }

    if (!ALLOWED_CATEGORIES.includes(category)) {
      errors.push(`Invalid category: ${category}. Allowed categories are: ${ALLOWED_CATEGORIES.join(", ")}`);
    }
  }

  // userid validation
  if (!userid || typeof userid !== "string") {
    errors.push("userid is required and must be a valid Firestore document ID.");
  }

  // check if value is a valid number
  const validateNumber = (value, field) => {
    // If the category is missing or null, skip validation entirely
    if (!value) {
      return;
    }

    if (isNaN(value)) {
      errors.push(`${field} must be a valid number.`);
    }
  };

  //Check each category of the income has valid numerical value.
  validateNumber(wages, "wages");
  validateNumber(secondaryIncome, "secondaryIncome");
  validateNumber(interest, "interest");
  validateNumber(supportPayment, "supportPayment");
  validateNumber(others, "others");

  // If any validation errors exist, return a 400 Bad Request response
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }

// If everything is valid, continue to the next process
next();

};