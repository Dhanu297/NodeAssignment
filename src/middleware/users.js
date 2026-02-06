function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidZip(zip) {
  const zipRegex = /^[0-9\-]{4,10}$/; // flexible for US/CA formats
  return zipRegex.test(zip);
}

module.exports = function validateUser(req, res, next) {
  const { name, username, email, address } = req.body;

  const errors = [];

  // name validation
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("Name is required and must be at least 2 characters long.");
  }

  // username validation
  if (!username || typeof username !== "string" || username.trim().length < 3) {
    errors.push("Username is required and must be at least 3 characters long.");
  }

  // email validation
  if (!email || !isValidEmail(email)) {
    errors.push("Invalid email format. Expected format: example@domain.com");
  }

  // address validation
  if (!address || typeof address !== "object") {
    errors.push("Address is required and must be an object.");
  } else {
    if (!address.street || address.street.trim().length < 2) {
      errors.push("Address.street is required and must be at least 2 characters.");
    }
    if (!address.suite || address.suite.trim().length < 1) {
      errors.push("Address.suite is required.");
    }
    if (!address.city || address.city.trim().length < 2) {
      errors.push("Address.city is required and must be at least 2 characters.");
    }
    if (!address.zipcode || !isValidZip(address.zipcode)) {
      errors.push(
        "Address.zipcode is required and must be a valid zipcode. Example: 92998-3874"
      );
    }
  }

  // return errors if any
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors
    });
  }

  next();
};