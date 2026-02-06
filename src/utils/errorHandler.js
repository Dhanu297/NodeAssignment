module.exports = (res, error) => {
  console.error(error);
  res.status(500).json({
    success: false,
    id:error.id,
    message: error.message || "Server Error"
  });
};
