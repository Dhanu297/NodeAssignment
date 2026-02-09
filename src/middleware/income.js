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

  // numeric validator
  const validateNumber = (value, field) => {
    if (isNaN(value)) {
      errors.push(`${field} must be a valid number.`);
    }
  };

  validateNumber(wages, "wages");
  validateNumber(secondaryIncome, "secondaryIncome");
  validateNumber(interest, "interest");
  validateNumber(supportPayment, "supportPayment");
  validateNumber(others, "others");

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }

  next();
};