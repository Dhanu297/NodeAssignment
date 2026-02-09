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

  // userid validation
  if (!userid || typeof userid !== "string") {
    errors.push("userid is required and must be a valid Firestore document ID.");
  }

  // check if value is a valid number
  const validateNumber = (value, field) => {
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