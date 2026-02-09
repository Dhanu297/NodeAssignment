// This is reusable error handler function for all API responses.
//This error handling mechanism helps centralizing error hanling whenever error comes

module.exports = (res, error) => {
  console.error(error);
  res.status(500).json({
    success: false,
    id:error.id,
    message: error.message || "Server Error"
  });
};
